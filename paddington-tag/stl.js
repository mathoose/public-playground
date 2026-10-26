import { derive, outlinePoints, scaledLetters } from "./geometry.js";

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
          inBrowser
            ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) }
            : {}
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

function polygonsToSection(CrossSection, polys, temps) {
  const cs = CrossSection.ofPolygons(polys, "NonZero");
  temps.push(cs);
  return cs;
}

function tagFace(CrossSection, d, segs, temps) {
  const outline = polygonsToSection(CrossSection, [outlinePoints(d, 12)], temps);
  const hole = CrossSection.circle(d.p.hole / 2, segs).translate([d.holeX, d.holeY]);
  temps.push(hole);
  const face = outline.subtract(hole);
  temps.push(face);
  return face;
}

/**
 * One solid: tag plate on the bed, letters raised on the top face.
 * Letters are clipped to the plate (and out of the hole) so nothing floats.
 */
export function buildTagSolid(wasm, raw, temps, segs) {
  const { CrossSection } = wasm;
  const d = derive(raw);
  const face = tagFace(CrossSection, d, segs, temps);
  const tag = face.extrude(d.p.thickness);
  temps.push(tag);
  if (d.p.letterH <= 0) return assertOk(tag, "tag");

  const letters = polygonsToSection(CrossSection, scaledLetters(d.p.height), temps);
  const clipped = letters.intersect(face);
  temps.push(clipped);
  // 0.15 mm sunk into the plate so the union is one body, not two shells touching.
  const sunk = clipped.extrude(d.p.letterH + 0.15).translate([0, 0, d.p.thickness - 0.15]);
  temps.push(sunk);
  const solid = tag.add(sunk);
  temps.push(solid);
  return assertOk(solid, "tag");
}

export function buildPreviewParts(wasm, raw, temps, segs) {
  const { CrossSection } = wasm;
  const d = derive(raw);
  const face = tagFace(CrossSection, d, segs, temps);
  const tag = assertOk(face.extrude(d.p.thickness), "plate");
  temps.push(tag);
  let letters = null;
  if (d.p.letterH > 0) {
    const section = polygonsToSection(CrossSection, scaledLetters(d.p.height), temps);
    const clipped = section.intersect(face);
    temps.push(clipped);
    letters = clipped.extrude(d.p.letterH + 0.04).translate([0, 0, d.p.thickness - 0.04]);
    temps.push(letters);
    assertOk(letters, "letters");
  }
  return { tag, letters, d };
}

export async function buildTag(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 64 : 28;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const temps = [];
  try {
    const { tag, letters, d } = buildPreviewParts(wasm, raw, temps, segs);
    const tagPos = manifoldMeshToPositions(tag.getMesh());
    const letterPos = letters ? manifoldMeshToPositions(letters.getMesh()) : new Float32Array();
    const solid = buildTagSolid(wasm, raw, temps, segs);
    const volume = solid.volume();
    const mesh = solid.getMesh();
    return {
      d,
      tagPos,
      letterPos,
      volume,
      tris: (mesh.triVerts.length || 0) / 3,
      genus: typeof solid.genus === "function" ? solid.genus() : null,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildTagStl(raw) {
  const wasm = await loadManifold();
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(64);
  const temps = [];
  try {
    const solid = buildTagSolid(wasm, raw, temps, 64);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    const genus = typeof solid.genus === "function" ? solid.genus() : null;
    return {
      stl: meshToStl(mesh, "paddington-tag"),
      volume,
      genus,
      tris: mesh.triVerts.length / 3,
      d: derive(raw),
      positions: manifoldMeshToPositions(mesh),
    };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `paddington-tag ${name}`.slice(0, 79);
  for (let i = 0; i < label.length; i++) header[i] = label.charCodeAt(i);

  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  new Uint8Array(buf, 0, 80).set(header);
  view.setUint32(80, triCount, true);

  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const i0 = triVerts[t * 3] * stride;
    const i1 = triVerts[t * 3 + 1] * stride;
    const i2 = triVerts[t * 3 + 2] * stride;
    const ax = vertProperties[i0];
    const ay = vertProperties[i0 + 1];
    const az = vertProperties[i0 + 2];
    const bx = vertProperties[i1];
    const by = vertProperties[i1 + 1];
    const bz = vertProperties[i1 + 2];
    const cx = vertProperties[i2];
    const cy = vertProperties[i2 + 1];
    const cz = vertProperties[i2 + 2];
    const e1x = bx - ax;
    const e1y = by - ay;
    const e1z = bz - az;
    const e2x = cx - ax;
    const e2y = cy - ay;
    const e2z = cz - az;
    let nx = e1y * e2z - e1z * e2y;
    let ny = e1z * e2x - e1x * e2z;
    let nz = e1x * e2y - e1y * e2x;
    const nl = Math.hypot(nx, ny, nz) || 1;
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
    view.setFloat32(o + 12, ax, true);
    view.setFloat32(o + 16, ay, true);
    view.setFloat32(o + 20, az, true);
    view.setFloat32(o + 24, bx, true);
    view.setFloat32(o + 28, by, true);
    view.setFloat32(o + 32, bz, true);
    view.setFloat32(o + 36, cx, true);
    view.setFloat32(o + 40, cy, true);
    view.setFloat32(o + 44, cz, true);
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

export function boundsOf(positions) {
  const b = {
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
  };
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = positions[i + k];
      if (v < b.min[k]) b.min[k] = v;
      if (v > b.max[k]) b.max[k] = v;
    }
  }
  return b;
}
