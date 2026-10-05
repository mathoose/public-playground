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

function placedRounded(CrossSection, sizeX, sizeY, h, r, ox, oy, oz, temps) {
  const solid = extrudedRounded(CrossSection, sizeX, sizeY, h, r, temps);
  const placed = solid.translate(ox + sizeX / 2, oy + sizeY / 2, oz);
  temps.push(placed);
  return placed;
}

function stadiumY(Manifold, w, h, len, segs, temps) {
  const r = Math.min(w, h) / 2;
  const extra = Math.max(0, Math.max(w, h) - 2 * r);
  const alongW = w >= h;
  const c1 = Manifold.cylinder(len, r, r, segs, false).rotate(90, 0, 0);
  temps.push(c1);
  if (extra < 0.05) return c1;
  const dx = alongW ? extra / 2 : 0;
  const dz = alongW ? 0 : extra / 2;
  const a = c1.translate(-dx, 0, -dz);
  temps.push(a);
  const b = c1.translate(dx, 0, dz);
  temps.push(b);
  return hull2(Manifold, a, b, temps);
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

function hull2(Manifold, a, b, temps) {
  const h = Manifold.hull([a, b]);
  temps.push(h);
  return h;
}

function wrapPost(Manifold, d, x, y, segs, temps) {
  const p = d.p;
  const stemR = p.postStemD / 2;
  const headR = p.postHeadD / 2;
  const stem = Manifold.cylinder(d.stemH + 0.4, stemR, stemR, segs, false).translate(
    x,
    y,
    d.p.floor - 0.2
  );
  temps.push(stem);
  const flare = Manifold.cylinder(d.flareH, stemR, headR, segs, false).translate(
    x,
    y,
    d.p.floor + d.stemH
  );
  temps.push(flare);
  return unionAll(Manifold, [stem, flare], temps);
}

function plugClip(Manifold, d, segs, temps) {
  const p = d.p;
  const wall = 1.8;
  const ox = d.deckX0 + p.wrapDeck - p.clipDepth - 1.2;
  const oy = d.nestOuterW / 2 - (p.clipW + 2 * wall) / 2;
  const outerH = p.clipOpening + 2.4;
  const body = Manifold.cube([p.clipDepth + 1.2, p.clipW + 2 * wall, outerH], false).translate(
    ox,
    oy,
    d.p.floor
  );
  temps.push(body);
  const slot = Manifold.cube([p.clipDepth + 4, p.clipW, p.clipOpening], false).translate(
    ox + 1.4,
    oy + wall,
    d.p.floor + 1.1
  );
  temps.push(slot);
  const mouth = Manifold.cube([3.2, p.clipW + 0.6, p.clipOpening + 0.4], false).translate(
    ox + p.clipDepth - 0.6,
    oy + wall - 0.3,
    d.p.floor + 0.9
  );
  temps.push(mouth);
  let clip = body.subtract(slot);
  temps.push(clip);
  clip = clip.subtract(mouth);
  temps.push(clip);
  const keepFloor = Manifold.cube([p.clipDepth + 1.2, p.clipW + 2 * wall, 1.1], false).translate(
    ox,
    oy,
    d.p.floor
  );
  temps.push(keepFloor);
  clip = clip.add(keepFloor);
  temps.push(clip);
  return clip;
}

export function buildCaseSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  const d = derive(raw);
  const p = d.p;

  const outer = placedRounded(
    CrossSection,
    d.nestOuterL,
    d.nestOuterW,
    d.baseZ,
    d.outerR,
    0,
    0,
    0,
    temps
  );
  const cavity = placedRounded(
    CrossSection,
    d.innerL,
    d.innerW,
    d.cavityZ + 6,
    d.innerR,
    p.wall,
    p.wall,
    p.floor,
    temps
  );
  let solid = outer.subtract(cavity);
  temps.push(solid);

  const deck = placedRounded(
    CrossSection,
    p.wrapDeck + 2.4,
    d.nestOuterW,
    p.floor,
    Math.min(d.outerR, 6),
    d.deckX0 - 2.4,
    0,
    0,
    temps
  );
  solid = solid.add(deck);
  temps.push(solid);

  if (p.lip >= 0.15) {
    const lipH = Math.max(0.8, p.lip);
    const ring = placedRounded(
      CrossSection,
      d.innerL,
      d.innerW,
      lipH,
      d.innerR,
      p.wall,
      p.wall,
      d.baseZ - lipH,
      temps
    );
    const hole = placedRounded(
      CrossSection,
      Math.max(8, d.innerL - 2 * p.lip),
      Math.max(8, d.innerW - 2 * p.lip),
      lipH + 0.8,
      Math.max(0.4, d.innerR - p.lip),
      p.wall + p.lip,
      p.wall + p.lip,
      d.baseZ - lipH - 0.2,
      temps
    );
    let lip = ring.subtract(hole);
    temps.push(lip);
    const usbClear = Manifold.cube([p.wall + p.lip * 2 + 8, d.innerW + 4, lipH + 2], false).translate(
      -2,
      p.wall - 2,
      d.baseZ - lipH - 0.6
    );
    temps.push(usbClear);
    lip = lip.subtract(usbClear);
    temps.push(lip);
    solid = solid.add(lip);
    temps.push(solid);
  }

  const cutters = [];
  const usb = Manifold.cube([p.wall + 5, p.usbWindowW, p.usbWindowH], false).translate(
    -2.2,
    d.usbY0,
    d.zMid - p.usbWindowH / 2
  );
  temps.push(usb);
  cutters.push(usb);

  const btn = stadiumY(Manifold, p.buttonW, p.buttonH, p.wall + 5, segs, temps).translate(
    d.buttonX,
    -2,
    d.zMid
  );
  temps.push(btn);
  cutters.push(btn);

  const micro = stadiumY(Manifold, p.microW, p.microH, p.wall + 5, segs, temps).translate(
    d.microX,
    d.nestOuterW - p.wall - 3,
    d.zMid
  );
  temps.push(micro);
  cutters.push(micro);

  const cutter = unionAll(Manifold, cutters, temps);
  if (cutter) {
    solid = solid.subtract(cutter);
    temps.push(solid);
  }

  const postA = wrapPost(Manifold, d, d.deckMidX, d.postY0, segs, temps);
  const postB = wrapPost(Manifold, d, d.deckMidX, d.postY1, segs, temps);
  solid = solid.add(postA);
  temps.push(solid);
  solid = solid.add(postB);
  temps.push(solid);

  if (p.clipOn) {
    const clip = plugClip(Manifold, d, segs, temps);
    solid = solid.add(clip);
    temps.push(solid);
  }

  return assertOk(solid, "case");
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
