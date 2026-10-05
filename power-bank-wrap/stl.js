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
  if (r < 0.08) {
    const sq = CrossSection.square([sizeX, sizeY], true);
    temps.push(sq);
    return sq;
  }
  const rr = Math.max(0.05, Math.min(r, sizeX / 2 - 0.05, sizeY / 2 - 0.05));
  const sq = CrossSection.square([sizeX - 2 * rr, sizeY - 2 * rr], true);
  temps.push(sq);
  const off = sq.offset(rr, "Round");
  temps.push(off);
  return off;
}

function extrudedRounded(CrossSection, sizeX, sizeY, h, r, temps) {
  const cs = roundedRect(CrossSection, sizeX, sizeY, r, temps);
  const solid = cs.extrude(h);
  temps.push(solid);
  return solid;
}

function alongX(solid, temps) {
  const rot = solid.rotate(0, 90, 0);
  temps.push(rot);
  return rot;
}

function taperedRoundedX(Manifold, CrossSection, w0, h0, r0, w1, h1, r1, len, temps) {
  const a = extrudedRounded(CrossSection, h0, w0, 0.55, r0, temps);
  const b = extrudedRounded(CrossSection, h1, w1, 0.55, r1, temps);
  const aX = alongX(a, temps);
  const bX = alongX(b, temps).translate(len - 0.55, 0, 0);
  temps.push(bX);
  const hull = Manifold.hull([aX, bX]);
  temps.push(hull);
  return hull;
}

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function unionAll(Manifold, parts, temps) {
  if (!parts.length) return null;
  if (parts.length === 1) return parts[0];
  const u = Manifold.union(parts);
  temps.push(u);
  return u;
}

function wrapPockets(Manifold, d, temps) {
  const p = d.p;
  const len = p.wrapLen;
  const x = d.wrapX0;
  const stick = p.wrapStick;
  const fl = p.wrapFlange;
  const web = Math.min(1.8, stick * 0.28);
  const overlap = 1.6;
  const h = d.outerH;
  const parts = [];

  const leftBody = Manifold.cube([len, stick + overlap, h], false).translate(
    x,
    -0.02,
    0
  );
  temps.push(leftBody);
  const leftCh = Manifold.cube([len + 2, stick - web + 1.2, h - 2 * fl], false).translate(
    x - 1,
    -1.1,
    fl
  );
  temps.push(leftCh);
  const left = leftBody.subtract(leftCh);
  temps.push(left);
  parts.push(left);

  const rightY = d.outerW - stick;
  const rightBody = Manifold.cube([len, stick + overlap, h], false).translate(
    x,
    rightY - overlap,
    0
  );
  temps.push(rightBody);
  const rightCh = Manifold.cube([len + 2, stick - web + 1.2, h - 2 * fl], false).translate(
    x - 1,
    rightY + web - 0.1,
    fl
  );
  temps.push(rightCh);
  const right = rightBody.subtract(rightCh);
  temps.push(right);
  parts.push(right);

  return unionAll(Manifold, parts, temps);
}

function sideSlots(Manifold, d, temps) {
  const p = d.p;
  if (!p.slotOn) return null;
  const slotLen = Math.min(22, Math.max(10, p.sleeveLen * 0.28));
  const x = (p.sleeveLen - slotLen) / 2;
  const h = p.slotH;
  const z = d.zMid - h / 2;
  const thick = p.wall + 2.4;
  const left = Manifold.cube([slotLen, thick, h], false).translate(
    x,
    p.wrapStick - 0.6,
    z
  );
  temps.push(left);
  const right = Manifold.cube([slotLen, thick, h], false).translate(
    x,
    d.outerW - p.wrapStick - p.wall - 1.8,
    z
  );
  temps.push(right);
  return unionAll(Manifold, [left, right], temps);
}

export function buildCaseSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const d = derive(raw);
  const p = d.p;

  const outer = extrudedRounded(CrossSection, d.outerH, d.bodyW, p.sleeveLen, d.outerR, temps);
  const outerX = alongX(outer, temps).translate(0, d.cy, d.outerH / 2);
  temps.push(outerX);

  const inner = taperedRoundedX(
    Manifold,
    CrossSection,
    d.innerW0,
    d.innerH0,
    d.innerR0,
    d.innerW1,
    d.innerH1,
    d.innerR1,
    p.sleeveLen + 2.4,
    temps
  ).translate(-1.2, d.cy, d.outerH / 2);
  temps.push(inner);

  let solid = outerX.subtract(inner);
  temps.push(solid);

  const pockets = wrapPockets(Manifold, d, temps);
  if (pockets) {
    solid = solid.add(pockets);
    temps.push(solid);
  }

  const slots = sideSlots(Manifold, d, temps);
  if (slots) {
    solid = solid.subtract(slots);
    temps.push(solid);
  }

  return assertOk(solid, "sleeve");
}

export async function buildCase(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 32 : 20;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const d = derive(raw);
  const temps = [];
  try {
    const solid = buildCaseSolid(wasm, raw, temps, segs);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    return {
      d,
      mesh,
      volume,
      tris: (mesh.triVerts.length || 0) / 3,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildCaseStl(raw) {
  const wasm = await loadManifold();
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(32);
  const temps = [];
  try {
    const solid = buildCaseSolid(wasm, raw, temps, 32);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    return { stl: meshToStl(mesh, "power-bank-wrap"), volume, mesh, d: derive(raw) };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `power-bank-wrap ${name}`.slice(0, 79);
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

export function parseBinaryStl(buffer) {
  const view = new DataView(buffer);
  const triCount = view.getUint32(80, true);
  const pos = new Float32Array(triCount * 9);
  let o = 84;
  let i = 0;
  for (let t = 0; t < triCount; t++) {
    o += 12;
    for (let k = 0; k < 9; k++) {
      pos[i++] = view.getFloat32(o, true);
      o += 4;
    }
    o += 2;
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
