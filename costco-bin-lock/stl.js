import { derive } from "./geometry.js";

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

function roundedRect(CrossSection, sizeX, sizeY, r, temps) {
  const rr = Math.max(0.05, Math.min(r, sizeX / 2 - 0.05, sizeY / 2 - 0.05));
  const sq = CrossSection.square([Math.max(0.2, sizeX - 2 * rr), Math.max(0.2, sizeY - 2 * rr)], true);
  temps.push(sq);
  const off = sq.offset(rr, "Round");
  temps.push(off);
  return off;
}

function plate(CrossSection, sizeX, sizeY, h, r, z0, temps) {
  const cs = roundedRect(CrossSection, sizeX, sizeY, r, temps);
  let solid = cs.extrude(h);
  temps.push(solid);
  if (z0) {
    solid = solid.translate(0, 0, z0);
    temps.push(solid);
  }
  return solid;
}

function copyMesh(mesh) {
  return {
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
    numProp: mesh.numProp || 3,
  };
}

export function buildLockSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const d = derive(raw);

  const tips = plate(CrossSection, d.hookX, d.hookY, d.tipH, d.cornerR, 0, temps);
  let hook = tips;
  if (d.rampRun > 0.45 && d.thickness - d.tipH > 0.4) {
    const core = plate(CrossSection, d.hookX, d.coreY, d.thickness, d.cornerR, 0, temps);
    hook = Manifold.hull([core, tips]);
    temps.push(hook);
  } else if (d.thickness - d.tipH > 0.2) {
    hook = plate(CrossSection, d.hookX, d.hookY, d.thickness, d.cornerR, 0, temps);
  }

  const neck = Manifold.cylinder(d.totalZ, d.neckR, d.neckR, Math.max(24, segs), false);
  temps.push(neck);

  const head = plate(CrossSection, d.headX, d.headY, d.thickness, d.headR, d.thickness + d.throat, temps);

  const solid = Manifold.union([hook, neck, head]);
  temps.push(solid);
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`Lock manifold error: ${status}`);
  return solid;
}

export async function buildLock(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 64 : 40;
  const d = derive(raw);
  const temps = [];
  try {
    const solid = buildLockSolid(wasm, raw, temps, segs);
    const mesh = copyMesh(solid.getMesh());
    const volume = solid.volume();
    const genus = typeof solid.genus === "function" ? solid.genus() : null;
    return { d, mesh, volume, genus, tris: mesh.triVerts.length / 3 };
  } finally {
    deleteAll(temps);
  }
}

export async function buildLockStl(raw) {
  const wasm = await loadManifold();
  const d = derive(raw);
  const temps = [];
  try {
    const solid = buildLockSolid(wasm, raw, temps, 64);
    const mesh = copyMesh(solid.getMesh());
    const volume = solid.volume();
    return { stl: meshToStl(mesh, "costco-bin-lock"), volume, mesh, d };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `costco-bin-lock ${name}`.slice(0, 79);
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
