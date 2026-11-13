import { derive, sideWallPoint } from "./geometry.js";

const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";

let wasmPromise = null;

export async function loadManifold() {
  if (!wasmPromise) {
    const spec = typeof window !== "undefined" ? MANIFOLD_JS : "manifold-3d";
    wasmPromise = import(/* @vite-ignore */ spec)
      .catch(() => import(/* @vite-ignore */ MANIFOLD_JS))
      .then((mod) => {
        const Module = mod.default || mod;
        const inBrowser = typeof window !== "undefined";
        return Module(
          inBrowser ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) } : {}
        );
      })
      .then((wasm) => {
        wasm.setup();
        return wasm;
      });
  }
  return wasmPromise;
}

function deleteAll(items) {
  for (const item of items) {
    if (item && typeof item.delete === "function") {
      try {
        item.delete();
      } catch {
        /* already freed */
      }
    }
  }
}

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function keep(temps, item) {
  temps.push(item);
  return item;
}

function box(Manifold, x0, x1, y0, y1, z0, z1, temps) {
  const size = [x1 - x0, y1 - y0, z1 - z0];
  const at = [(x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2];
  return keep(temps, Manifold.cube(size, true).translate(at));
}

/** Cylinder centered on the origin, axis along Y. */
function cylinderY(Manifold, length, radius, segs, temps) {
  const cyl = keep(temps, Manifold.cylinder(length, radius, radius, segs, true));
  return keep(temps, cyl.rotate([90, 0, 0]));
}

function buildPins(Manifold, d, segs, temps) {
  const tip = Math.min(1.5, d.pinLength * 0.22);
  const embed = Math.min(0.9, d.wall * 0.45);
  const pinSegs = Math.max(24, Math.round(segs * 0.65));
  const pins = [];
  for (const x of d.pinXs) {
    const tipCyl = keep(
      temps,
      Manifold.cylinder(tip + 0.02, d.pinR * 0.62, d.pinR, pinSegs, false).translate([x, 0, 0])
    );
    const shaft = keep(
      temps,
      Manifold.cylinder(d.pinLength - tip + embed, d.pinR, d.pinR, pinSegs, false).translate([x, 0, tip])
    );
    pins.push(tipCyl, shaft);
  }
  return pins;
}

function buildClip(Manifold, d, segs, temps) {
  const { pinLength, width, outerR: Ro, innerR: Ri, zRim, zCut } = d;
  const halfY = width / 2;
  let outer = keep(temps, cylinderY(Manifold, width, Ro, segs, temps).translate([0, 0, zRim]));
  const half = box(Manifold, -Ro - 2, Ro + 2, -halfY - 2, halfY + 2, pinLength - 2, zRim, temps);
  outer = keep(temps, outer.intersect(half));

  const plate = box(Manifold, -d.plateHalfX, d.plateHalfX, -halfY, halfY, pinLength, zCut, temps);
  const pocket = keep(temps, cylinderY(Manifold, width + 6, Ri, segs, temps).translate([0, 0, zRim]));

  let body = keep(temps, plate.add(outer));
  body = keep(temps, body.subtract(pocket));
  return body;
}

function buildBin(Manifold, d, temps) {
  const { pinLength, width, wall, binDepth } = d;
  const half = width / 2;
  const z0 = pinLength;
  const top = z0 + wall + binDepth;
  const plate = box(Manifold, -d.plateHalfX, d.plateHalfX, -half, half, z0, z0 + wall, temps);
  const cup = box(Manifold, -half, half, -half, half, z0, top, temps);
  const inner = d.binInner;
  const hole = box(Manifold, -inner / 2, inner / 2, -inner / 2, inner / 2, z0 + wall - 0.05, top + 2, temps);
  let body = keep(temps, plate.add(cup));
  body = keep(temps, body.subtract(hole));
  return body;
}

export function buildSolid(wasm, raw, segs, temps) {
  const { Manifold } = wasm;
  const d = derive(raw);
  const body = d.mode === "bin" ? buildBin(Manifold, d, temps) : buildClip(Manifold, d, segs, temps);
  let solid = body;
  for (const pin of buildPins(Manifold, d, segs, temps)) {
    solid = keep(temps, solid.add(pin));
  }
  return assertOk(solid, "belt holder");
}

function occupies(Manifold, solid, point, temps, span = 0.7) {
  const probe = keep(temps, Manifold.cube([span, span, span], true).translate([point.x, point.y, point.z]));
  const hit = keep(temps, solid.intersect(probe));
  return hit.volume() > 0.02;
}

export function meshBounds(mesh) {
  const stride = mesh.numProp || 3;
  const v = mesh.vertProperties;
  const min = [Infinity, Infinity, Infinity];
  const max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < v.length; i += stride) {
    for (let k = 0; k < 3; k++) {
      const n = v[i + k];
      if (n < min[k]) min[k] = n;
      if (n > max[k]) max[k] = n;
    }
  }
  return { min, max };
}

/** Pin centers from the shaft surface. Spacing is center-to-center. */
export function measurePins(mesh, d) {
  const stride = mesh.numProp || 3;
  const v = mesh.vertProperties;
  // A cylinder only has rings at its ends. The full-diameter ring sits at the
  // top of the tapered tip, still below the back plate.
  const z0 = 0.4;
  const z1 = Math.min(4.5, d.pinLength - 0.5);
  const left = [];
  const right = [];
  for (let i = 0; i < v.length; i += stride) {
    const x = v[i];
    const y = v[i + 1];
    const z = v[i + 2];
    if (z < z0 || z > z1) continue;
    if (Math.abs(y) > d.pinR + 0.8) continue;
    if (x < -0.2) left.push(x);
    else if (x > 0.2) right.push(x);
  }
  const summarize = (xs) => {
    if (xs.length < 8) throw new Error(`pin mesh missing (${xs.length} verts)`);
    let min = Infinity;
    let max = -Infinity;
    for (const x of xs) {
      if (x < min) min = x;
      if (x > max) max = x;
    }
    return { center: (min + max) / 2, diameter: max - min, n: xs.length };
  };
  const L = summarize(left);
  const R = summarize(right);
  return { spacing: R.center - L.center, left: L, right: R };
}

export async function inspectHolder(raw, segs = 48) {
  const wasm = await loadManifold();
  const temps = [];
  try {
    const solid = buildSolid(wasm, raw, segs, temps);
    const d = derive(raw);
    const mesh = solid.getMesh();
    const pins = measurePins(mesh, d);
    const side = sideWallPoint(d);
    const { Manifold } = wasm;
    const sideHit = occupies(Manifold, solid, side, temps);
    const interiorHit = occupies(Manifold, solid, { x: 0, y: 0, z: side.z }, temps);
    const above = occupies(Manifold, solid, { x: 0, y: 0, z: d.maxZ + 3 }, temps);
    const between = occupies(Manifold, solid, { x: 0, y: 0, z: d.pinLength * 0.45 }, temps);
    const rimHit =
      d.mode === "clip"
        ? occupies(Manifold, solid, { x: d.outerR - d.wall / 2, y: 0, z: d.zRim - 1.2 }, temps, 0.6)
        : null;
    const lipHit =
      d.mode === "bin"
        ? occupies(
            Manifold,
            solid,
            { x: 0, y: d.width / 2 - d.wall / 2, z: d.pinLength + d.wall + d.binDepth - 1.4 },
            temps,
            0.6
          )
        : null;
    const xWallHit =
      d.mode === "bin"
        ? occupies(Manifold, solid, { x: d.width / 2 - d.wall / 2, y: 0, z: side.z }, temps)
        : null;
    let pieces = null;
    if (typeof solid.decompose === "function") {
      const parts = solid.decompose();
      pieces = parts.length;
      for (const part of parts) temps.push(part);
    }
    return {
      d,
      volume: solid.volume(),
      genus: typeof solid.genus === "function" ? solid.genus() : null,
      tris: mesh.triVerts.length / 3,
      pins,
      sideHit,
      interiorHit,
      above,
      between,
      rimHit,
      lipHit,
      xWallHit,
      pieces,
      bounds: meshBounds(mesh),
      status: solid.status ? solid.status() : "NoError",
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildHolder(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 96 : 56;
  const temps = [];
  try {
    const solid = buildSolid(wasm, raw, segs, temps);
    const mesh = solid.getMesh();
    return {
      mesh,
      volume: solid.volume(),
      d: derive(raw),
      tris: mesh.triVerts.length / 3,
    };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "belt-holder") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  const label = `belt-holder ${name}`.slice(0, 79);
  for (let i = 0; i < label.length; i++) view.setUint8(i, label.charCodeAt(i));
  view.setUint32(80, triCount, true);

  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const v = [0, 1, 2].map((k) => triVerts[t * 3 + k] * stride);
    const [a, b, c] = v.map((i) => [vertProperties[i], vertProperties[i + 1], vertProperties[i + 2]]);
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    const nl = Math.hypot(n[0], n[1], n[2]) || 1;
    for (let k = 0; k < 3; k++) view.setFloat32(o + k * 4, n[k] / nl, true);
    [a, b, c].forEach((pt, j) => {
      for (let k = 0; k < 3; k++) view.setFloat32(o + 12 + j * 12 + k * 4, pt[k], true);
    });
    view.setUint16(o + 48, 0, true);
    o += 50;
  }
  return buf;
}

export function manifoldMeshToPositions(mesh) {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const pos = new Float32Array(triVerts.length * 3);
  let i = 0;
  for (let t = 0; t < triVerts.length; t++) {
    const v = triVerts[t] * stride;
    pos[i++] = vertProperties[v];
    pos[i++] = vertProperties[v + 1];
    pos[i++] = vertProperties[v + 2];
  }
  return pos;
}

export async function buildHolderStl(raw) {
  const built = await buildHolder(raw, { quality: "export" });
  const name = built.d.mode === "bin" ? "square-bin" : "belt-clip";
  return { stl: meshToStl(built.mesh, name), ...built };
}

export function downloadArrayBuffer(filename, buffer) {
  const blob = new Blob([buffer], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function stlTriangleCount(buffer) {
  if (buffer.byteLength < 84) return 0;
  return new DataView(buffer).getUint32(80, true);
}
