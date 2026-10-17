/** Mesh helpers: MSH1 indexed-mesh decode, binary STL writer, manifold-3d check. */
const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";

export function decodeMsh(bytes) {
  const u = new Uint8Array(bytes);
  const dv = new DataView(u.buffer, u.byteOffset, u.byteLength);
  const magic = String.fromCharCode(u[0], u[1], u[2], u[3]);
  if (magic !== "MSH1") throw new Error("bad mesh payload");
  const nv = dv.getUint32(4, true);
  const nt = dv.getUint32(8, true);
  const copy = u.slice(12, 12 + nv * 12 + nt * 12).buffer;
  return {
    positions: new Float32Array(copy, 0, nv * 3),
    indices: new Uint32Array(copy, nv * 12, nt * 3),
  };
}

export function stlFromIndexed(positions, indices) {
  const nt = indices.length / 3;
  const buf = new ArrayBuffer(84 + nt * 50);
  const dv = new DataView(buf);
  const header = "private remix - personal use only";
  for (let i = 0; i < header.length; i++) dv.setUint8(i, header.charCodeAt(i));
  dv.setUint32(80, nt, true);
  let o = 84;
  for (let t = 0; t < nt; t++) {
    const a = indices[t * 3] * 3, b = indices[t * 3 + 1] * 3, c = indices[t * 3 + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const l = Math.hypot(nx, ny, nz) || 1;
    nx /= l; ny /= l; nz /= l;
    dv.setFloat32(o, nx, true); dv.setFloat32(o + 4, ny, true); dv.setFloat32(o + 8, nz, true);
    o += 12;
    for (const k of [a, b, c]) {
      dv.setFloat32(o, positions[k], true);
      dv.setFloat32(o + 4, positions[k + 1], true);
      dv.setFloat32(o + 8, positions[k + 2], true);
      o += 12;
    }
    o += 2;
  }
  return buf;
}

export function bounds(positions) {
  const min = [Infinity, Infinity, Infinity], max = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = positions[i + k];
      if (v < min[k]) min[k] = v;
      if (v > max[k]) max[k] = v;
    }
  }
  return { min, max, size: max.map((v, k) => v - min[k]) };
}

let wasmPromise = null;
export function loadManifold() {
  if (!wasmPromise) {
    const inBrowser = typeof window !== "undefined";
    const spec = inBrowser ? MANIFOLD_JS : "manifold-3d";
    wasmPromise = import(/* @vite-ignore */ spec)
      .then((mod) => (mod.default || mod)(inBrowser ? { locateFile: (p) => (p.endsWith(".wasm") ? MANIFOLD_WASM : p) } : {}))
      .then((wasm) => {
        wasm.setup();
        return wasm;
      });
  }
  return wasmPromise;
}

/** Closed-solid check + volume (mm³) via manifold-3d. */
export async function manifoldCheck(positions, indices) {
  const wasm = await loadManifold();
  const mesh = new wasm.Mesh({ numProp: 3, vertProperties: positions, triVerts: indices });
  const solid = new wasm.Manifold(mesh);
  try {
    return { ok: solid.status() === "NoError", status: solid.status(), volume: solid.volume(), genus: solid.genus() };
  } finally {
    solid.delete();
  }
}

export function downloadArrayBuffer(name, buf, type = "model/stl") {
  const blob = new Blob([buf], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
