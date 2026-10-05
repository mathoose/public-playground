import { derive, usbY } from "./geometry.js";

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

/** Stadium through-hole along +X, centered on YZ at the origin. */
function stadiumX(Manifold, d, h, len, segs, temps) {
  const r = d / 2;
  const dh = Math.max(0, h - d);
  const c1 = Manifold.cylinder(len, r, r, segs, false).rotate(0, 90, 0).translate(0, 0, dh / 2);
  temps.push(c1);
  if (dh < 0.05) return c1;
  const c2 = Manifold.cylinder(len, r, r, segs, false).rotate(0, 90, 0).translate(0, 0, -dh / 2);
  temps.push(c2);
  return hull2(Manifold, c1, c2, temps);
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

export function buildBaseSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  const d = derive(raw);
  const p = d.p;

  const outer = placedRounded(CrossSection, d.outerL, d.outerW, d.baseZ, d.outerR, 0, 0, 0, temps);
  const cavity = placedRounded(
    CrossSection,
    d.innerL,
    d.innerW,
    d.cavityZ + 4,
    d.innerR,
    d.wall,
    d.wall,
    d.floor,
    temps
  );
  let solid = outer.subtract(cavity);
  temps.push(solid);

  const cutters = [];
  for (let i = 0; i < p.usbCount; i++) {
    const py = usbY(d, i);
    const hole = stadiumX(Manifold, p.usbHoleW, p.usbHoleH, d.wall + 3, segs, temps);
    cutters.push(hole.translate(-1, py, d.zUsb));
    temps.push(cutters[cutters.length - 1]);
    const mouth = stadiumX(Manifold, p.usbHoleW + 1.2, p.usbHoleH + 1.2, 1.4, segs, temps);
    cutters.push(mouth.translate(-0.6, py, d.zUsb));
    temps.push(cutters[cutters.length - 1]);
  }

  const x0 = d.outerL - d.wall - 1.2;
  const py = d.outerW / 2;
  const cord = Manifold.cylinder(d.wall + 4, p.c8HoleD / 2, p.c8HoleD / 2, segs, false)
    .rotate(0, 90, 0)
    .translate(x0, py, d.zC8);
  temps.push(cord);
  cutters.push(cord);
  const slot = Manifold.cube([d.wall + 4, p.c8HoleD, d.baseZ - d.zC8 + 4], false).translate(
    x0,
    py - p.c8HoleD / 2,
    d.zC8
  );
  temps.push(slot);
  cutters.push(slot);

  const xs = [d.outerL * 0.28, d.outerL * 0.72];
  const pz = d.baseZ - p.beadDrop;
  const pw = p.beadLen + 1.2;
  const ph = p.beadR * 2 + 1.0;
  const pd = p.beadR + p.lipClear + p.pocketExtra + 0.15;
  for (const px of xs) {
    const a = Manifold.cube([pw, pd + 0.25, ph], false).translate(px - pw / 2, d.wall - pd, pz - ph / 2);
    temps.push(a);
    cutters.push(a);
    const b = Manifold.cube([pw, pd + 0.25, ph], false).translate(
      px - pw / 2,
      d.outerW - d.wall - 0.25,
      pz - ph / 2
    );
    temps.push(b);
    cutters.push(b);
  }

  const ch = p.edgeFillet;
  if (ch >= 0.05) {
    const blank = placedRounded(
      CrossSection,
      d.outerL + 4,
      d.outerW + 4,
      ch + 1.2,
      d.outerR,
      -2,
      -2,
      d.baseZ - ch,
      temps
    );
    const a = placedRounded(CrossSection, d.outerL, d.outerW, 0.02, d.outerR, 0, 0, d.baseZ - ch, temps);
    const insetR = Math.max(0.4, d.outerR - ch);
    const b = placedRounded(
      CrossSection,
      d.outerL - 2 * ch,
      d.outerW - 2 * ch,
      0.02,
      insetR,
      ch,
      ch,
      d.baseZ + 0.02,
      temps
    );
    const keep = hull2(Manifold, a, b, temps);
    const chamfer = blank.subtract(keep);
    temps.push(chamfer);
    cutters.push(chamfer);
  }

  const cutter = unionAll(Manifold, cutters, temps);
  if (cutter) {
    solid = solid.subtract(cutter);
    temps.push(solid);
  }
  return assertOk(solid, "base");
}

export function buildLidSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  const d = derive(raw);
  const p = d.p;

  const plate = placedRounded(
    CrossSection,
    d.outerL,
    d.outerW,
    p.lidThickness,
    d.outerR,
    0,
    0,
    0,
    temps
  );

  const ox = d.skirtOx;
  const oy = d.skirtOy;
  const skirtOuter = placedRounded(
    CrossSection,
    ox,
    oy,
    p.lipDepth,
    Math.max(0.6, d.innerR - p.lipClear),
    (d.outerL - ox) / 2,
    (d.outerW - oy) / 2,
    p.lidThickness,
    temps
  );
  const ix = ox - 2 * p.lipThick;
  const iy = oy - 2 * p.lipThick;
  const skirtInner = placedRounded(
    CrossSection,
    ix,
    iy,
    p.lipDepth + 0.6,
    Math.max(0.4, d.innerR - p.lipClear - p.lipThick),
    (d.outerL - ix) / 2,
    (d.outerW - iy) / 2,
    p.lidThickness - 0.2,
    temps
  );
  let skirt = skirtOuter.subtract(skirtInner);
  temps.push(skirt);
  const gap = Manifold.cube([d.wall * 2 + 4, p.c8HoleD + 1.2, p.lipDepth + 2], true).translate(
    d.outerL / 2 + ox / 2 - d.wall,
    d.outerW / 2,
    p.lidThickness + p.lipDepth / 2
  );
  temps.push(gap);
  skirt = skirt.subtract(gap);
  temps.push(skirt);

  const beads = [];
  const beadXs = [d.outerL * 0.28, d.outerL * 0.72];
  const oz = p.lidThickness + p.beadDrop;
  const oyOut = (d.innerW - 2 * p.lipClear) / 2;
  for (const px of beadXs) {
    for (const side of [-1, 1]) {
      const s0 = Manifold.sphere(p.beadR, segs);
      temps.push(s0);
      const s1 = s0.translate(0, 0, -p.beadLen / 2 + p.beadR);
      temps.push(s1);
      const s2 = s0.translate(0, 0, p.beadLen / 2 - p.beadR);
      temps.push(s2);
      const hull = hull2(Manifold, s1, s2, temps).rotate(0, 90, 0);
      temps.push(hull);
      const placed = hull.translate(px, d.outerW / 2 + side * oyOut, oz);
      temps.push(placed);
      beads.push(placed);
    }
  }

  const thick = d.wall - 0.5;
  const cap = Manifold.cube([thick, d.keeperW, 0.4], true).translate(0, 0, p.keeperH - 1.2);
  temps.push(cap);
  const tip = Manifold.cylinder(thick, d.keeperW / 2, d.keeperW / 2, segs, true)
    .rotate(0, 90, 0)
    .translate(0, 0, 1.2);
  temps.push(tip);
  const keeper = hull2(Manifold, cap, tip, temps).translate(
    d.outerL - d.wall / 2 - 0.15,
    d.outerW / 2,
    p.lidThickness
  );
  temps.push(keeper);

  let solid = plate.add(skirt);
  temps.push(solid);
  const beadU = unionAll(Manifold, beads, temps);
  if (beadU) {
    solid = solid.add(beadU);
    temps.push(solid);
  }
  solid = solid.add(keeper);
  temps.push(solid);

  const nicks = [];
  for (const y of [0, d.outerW]) {
    const nick = Manifold.cylinder(20, p.lidNickD / 2, p.lidNickD / 2, segs, true)
      .rotate(0, 90, 0)
      .translate(d.outerL / 2, y, p.lidThickness / 2);
    temps.push(nick);
    nicks.push(nick);
  }
  const nickU = unionAll(Manifold, nicks, temps);
  if (nickU) {
    solid = solid.subtract(nickU);
    temps.push(solid);
  }
  return assertOk(solid, "lid");
}

export function lidToPreview(solid, d, gap = 12, temps = []) {
  const a = solid.translate(0, -d.outerW, 0);
  temps.push(a);
  const b = a.rotate(180, 0, 0);
  temps.push(b);
  const c = b.translate(0, 0, d.p.lidThickness + d.baseZ + d.p.lidThickness + gap);
  temps.push(c);
  return c;
}

export async function buildBox(raw, { quality = "preview", previewLid = true } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 32 : 20;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const d = derive(raw);
  const temps = [];
  try {
    const base = buildBaseSolid(wasm, raw, temps, segs);
    const lidPrint = buildLidSolid(wasm, raw, temps, segs);
    const lid = previewLid ? lidToPreview(lidPrint, d, 12, temps) : lidPrint;
    const baseMesh = base.getMesh();
    const lidMesh = lid.getMesh();
    const baseVol = base.volume();
    const lidVol = lidPrint.volume();
    return {
      d,
      baseMesh,
      lidMesh,
      baseVolume: baseVol,
      lidVolume: lidVol,
      baseTris: (baseMesh.triVerts.length || 0) / 3,
      lidTris: (lidMesh.triVerts.length || 0) / 3,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildPartStl(raw, part) {
  const wasm = await loadManifold();
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(32);
  const temps = [];
  try {
    const solid =
      part === "lid" ? buildLidSolid(wasm, raw, temps, 32) : buildBaseSolid(wasm, raw, temps, 32);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    const name = part === "lid" ? "photive-snap-box-lid" : "photive-snap-box-base";
    return { stl: meshToStl(mesh, name), volume, mesh, d: derive(raw) };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `photive-snap-box ${name}`.slice(0, 79);
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
    view.setUint16(o, 0, true);
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
