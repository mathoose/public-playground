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

const SINK = 0.08;

function circleAt(CrossSection, d, radius, segs, temps) {
  const disk = CrossSection.circle(radius, segs).translate([d.holeX, d.holeY]);
  temps.push(disk);
  return disk;
}

/**
 * Three parts in one coordinate system: body on the bed, letters and the
 * brown hole ring raised on the face. Separate meshes so each can be a color.
 */
export function buildParts(wasm, raw, temps, segs) {
  const { CrossSection } = wasm;
  const d = derive(raw);
  const face = tagFace(CrossSection, d, segs, temps);
  const body = assertOk(face.extrude(d.p.thickness), "body");
  temps.push(body);

  const ringOuter = circleAt(CrossSection, d, d.ringOuter, segs, temps);
  const ringBand = ringOuter.intersect(face);
  temps.push(ringBand);
  const raise = Math.max(0.2, d.p.letterH);
  const ring = assertOk(
    ringBand.extrude(raise + SINK).translate([0, 0, d.p.thickness - SINK]),
    "ring"
  );
  temps.push(ring);

  let letters = null;
  if (d.p.letterH > 0) {
    const section = polygonsToSection(CrossSection, scaledLetters(d.p.height), temps);
    const onFace = section.intersect(face);
    temps.push(onFace);
    const clearOfRing = onFace.subtract(ringOuter);
    temps.push(clearOfRing);
    letters = assertOk(
      clearOfRing.extrude(d.p.letterH + SINK).translate([0, 0, d.p.thickness - SINK]),
      "letters"
    );
    temps.push(letters);
  }
  return { body, letters, ring, d };
}

function pack(solid, name) {
  const mesh = solid.getMesh();
  return {
    stl: meshToStl(mesh, name),
    volume: solid.volume(),
    genus: typeof solid.genus === "function" ? solid.genus() : null,
    tris: mesh.triVerts.length / 3,
    positions: manifoldMeshToPositions(mesh),
  };
}

export async function buildTag(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 64 : 28;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const temps = [];
  try {
    const { body, letters, ring, d } = buildParts(wasm, raw, temps, segs);
    const parts = {
      body: pack(body, "body"),
      letters: letters ? pack(letters, "letters") : null,
      ring: pack(ring, "ring"),
    };
    const volume = parts.body.volume + (parts.letters?.volume || 0) + parts.ring.volume;
    const tris = parts.body.tris + (parts.letters?.tris || 0) + parts.ring.tris;
    return {
      d,
      tagPos: parts.body.positions,
      letterPos: parts.letters?.positions || new Float32Array(),
      ringPos: parts.ring.positions,
      parts,
      volume,
      tris,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildTagStls(raw) {
  const built = await buildTag(raw, { quality: "export" });
  return built;
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
