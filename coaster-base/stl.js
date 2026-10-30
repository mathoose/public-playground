import {
  ARM_CENTERS_DEG,
  DEFAULT_PARAMS,
  derive,
  mergeParams,
} from "./geometry.js";

const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";
const CORE_URL = "./coaster-core.stl";
const REFERENCE_URL = "./coaster-base-v1.stl";
let wasmPromise = null;
let coreMeshPromise = null;

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
            : {},
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

function keep(temps, item) {
  temps.push(item);
  return item;
}

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function copyMesh(mesh) {
  return {
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
    numProp: mesh.numProp || 3,
  };
}

export function parseBinaryStl(buffer) {
  const view = new DataView(buffer);
  const triCount = view.getUint32(80, true);
  const vertMap = new Map();
  const vertProperties = [];
  const triVerts = [];

  const key = (x, y, z) => `${x.toFixed(4)},${y.toFixed(4)},${z.toFixed(4)}`;
  const addVert = (x, y, z) => {
    const k = key(x, y, z);
    let idx = vertMap.get(k);
    if (idx === undefined) {
      idx = vertProperties.length / 3;
      vertProperties.push(x, y, z);
      vertMap.set(k, idx);
    }
    return idx;
  };

  let o = 84;
  for (let t = 0; t < triCount; t++) {
    o += 12;
    const i0 = addVert(view.getFloat32(o, true), view.getFloat32(o + 4, true), view.getFloat32(o + 8, true));
    o += 12;
    const i1 = addVert(view.getFloat32(o, true), view.getFloat32(o + 4, true), view.getFloat32(o + 8, true));
    o += 12;
    const i2 = addVert(view.getFloat32(o, true), view.getFloat32(o + 4, true), view.getFloat32(o + 8, true));
    o += 14;
    triVerts.push(i0, i1, i2);
  }

  return {
    numProp: 3,
    vertProperties: new Float32Array(vertProperties),
    triVerts: new Uint32Array(triVerts),
  };
}

async function fetchAsset(relativePath) {
  if (typeof window === "undefined") {
    const { readFileSync } = await import("node:fs");
    const { join, dirname } = await import("node:path");
    const { fileURLToPath } = await import("node:url");
    const here = dirname(fileURLToPath(import.meta.url));
    return readFileSync(join(here, relativePath.replace(/^\.\//, ""))).buffer;
  }
  const res = await fetch(relativePath);
  if (!res.ok) throw new Error(`Could not load ${relativePath}`);
  return res.arrayBuffer();
}

async function loadCoreBuffer() {
  return fetchAsset(CORE_URL);
}

async function loadCoreMesh() {
  if (!coreMeshPromise) {
    coreMeshPromise = loadCoreBuffer().then((buf) => copyMesh(parseBinaryStl(buf)));
  }
  return coreMeshPromise;
}

function mergeMeshes(a, b) {
  const stride = a.numProp || 3;
  const vertCount = a.vertProperties.length / stride;
  const vertProperties = new Float32Array(a.vertProperties.length + b.vertProperties.length);
  vertProperties.set(a.vertProperties);
  vertProperties.set(b.vertProperties, a.vertProperties.length);
  const triVerts = new Uint32Array(a.triVerts.length + b.triVerts.length);
  triVerts.set(a.triVerts);
  for (let i = 0; i < b.triVerts.length; i++) {
    triVerts[a.triVerts.length + i] = b.triVerts[i] + vertCount;
  }
  return { numProp: stride, vertProperties, triVerts };
}

function meshVolume(mesh) {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  let vol = 0;
  for (let t = 0; t < triVerts.length; t += 3) {
    const ia = triVerts[t] * stride;
    const ib = triVerts[t + 1] * stride;
    const ic = triVerts[t + 2] * stride;
    const ax = vertProperties[ia];
    const ay = vertProperties[ia + 1];
    const az = vertProperties[ia + 2];
    const bx = vertProperties[ib];
    const by = vertProperties[ib + 1];
    const bz = vertProperties[ib + 2];
    const cx = vertProperties[ic];
    const cy = vertProperties[ic + 1];
    const cz = vertProperties[ic + 2];
    vol += ax * (by * cz - bz * cy) + bx * (cy * az - ay * cz) + cx * (ay * bz - by * az);
  }
  return Math.abs(vol / 6);
}

function annularSectorPoints(innerR, outerR, a0, a1, segs) {
  const span = Math.max(0.05, a1 - a0);
  const steps = Math.max(10, Math.ceil(segs * (span / (Math.PI * 2))));
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + (span * i) / steps;
    pts.push([outerR * Math.cos(a), outerR * Math.sin(a)]);
  }
  for (let i = steps; i >= 0; i--) {
    const a = a0 + (span * i) / steps;
    pts.push([innerR * Math.cos(a), innerR * Math.sin(a)]);
  }
  return pts;
}

function buildArm(wasm, d, centerDeg, segs, temps) {
  const { Manifold, CrossSection } = wasm;
  const centerRad = (centerDeg * Math.PI) / 180;
  const a0 = centerRad - d.armHalfRad;
  const a1 = centerRad + d.armHalfRad;
  const pts = annularSectorPoints(d.innerR, d.outerR, a0, a1, segs);
  const section = keep(temps, CrossSection.ofPolygons([pts], "NonZero"));
  const overlap = 0.08;
  const height = d.p.armHeight + overlap;
  let wall = keep(temps, section.extrude(height));
  wall = keep(temps, wall.translate([0, 0, d.deckT - overlap]));

  const ox = d.outerR * Math.cos(centerRad);
  const oy = d.outerR * Math.sin(centerRad);
  const fillet = keep(
    temps,
    Manifold.sphere(d.topFilletR, segs).translate([ox, oy, d.totalZ - d.topFilletR * 0.55]),
  );
  return keep(temps, Manifold.hull([wall, fillet]));
}

function buildArmsSolid(wasm, raw, temps, segs) {
  const d = derive(raw);
  let solid = buildArm(wasm, d, ARM_CENTERS_DEG[0], segs, temps);
  for (let i = 1; i < ARM_CENTERS_DEG.length; i++) {
    const arm = buildArm(wasm, d, ARM_CENTERS_DEG[i], segs, temps);
    solid = keep(temps, solid.add(arm));
    assertOk(solid, "union arm");
  }
  return { solid, d };
}

function isDefaultParams(raw) {
  const p = mergeParams(raw);
  return p.armHeight === DEFAULT_PARAMS.armHeight && p.armWidth === DEFAULT_PARAMS.armWidth;
}

async function loadReferenceMesh() {
  const buf = await fetchAsset(REFERENCE_URL);
  return copyMesh(parseBinaryStl(buf));
}

export async function buildCoaster(raw, { quality = "preview" } = {}) {
  if (isDefaultParams(raw)) {
    const mesh = await loadReferenceMesh();
    const d = derive(raw);
    return {
      d,
      mesh,
      volume: meshVolume(mesh),
      genus: null,
      tris: mesh.triVerts.length / 3,
    };
  }

  const wasm = await loadManifold();
  const segs = quality === "export" ? 72 : 48;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const temps = [];
  try {
    const core = await loadCoreMesh();
    const { solid, d } = buildArmsSolid(wasm, raw, temps, segs);
    const armMesh = copyMesh(solid.getMesh());
    const mesh = mergeMeshes(core, armMesh);
    const volume = meshVolume(mesh);
    return { d, mesh, volume, genus: 0, tris: mesh.triVerts.length / 3 };
  } finally {
    deleteAll(temps);
  }
}

export async function buildCoasterStl(raw) {
  const { mesh, volume, d } = await buildCoaster(raw, { quality: "export" });
  return { stl: meshToStl(mesh, "coaster-base"), volume, mesh, d };
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `${name}`.slice(0, 79);
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
