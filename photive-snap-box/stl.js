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

  // Snap grooves on the OUTER faces of the long walls (the lid skirt wraps outside).
  const xs = [d.outerL * 0.28, d.outerL * 0.72];
  const pz = d.baseZ - d.beadDrop;
  const pw = p.beadLen + 1.2;
  const ph = p.beadR * 2 + 1.0;
  const gd = d.grooveDepth;
  for (const px of xs) {
    const a = Manifold.cube([pw, gd + 0.5, ph], false).translate(px - pw / 2, -0.5, pz - ph / 2);
    temps.push(a);
    cutters.push(a);
    const b = Manifold.cube([pw, gd + 0.5, ph], false).translate(px - pw / 2, d.outerW - gd, pz - ph / 2);
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
  const off = -d.lidOff;
  const skirtTop = p.lidThickness + p.lipDepth;

  const plate = placedRounded(CrossSection, d.lidL, d.lidW, p.lidThickness, d.lidR, off, off, 0, temps);
  const skirtOuter = placedRounded(
    CrossSection,
    d.lidL,
    d.lidW,
    p.lipDepth + 0.2,
    d.lidR,
    off,
    off,
    p.lidThickness - 0.2,
    temps
  );
  const skirtInner = placedRounded(
    CrossSection,
    d.skirtInL,
    d.skirtInW,
    p.lipDepth + 1,
    d.skirtInR,
    -p.lipClear,
    -p.lipClear,
    p.lidThickness,
    temps
  );
  let skirt = skirtOuter.subtract(skirtInner);
  temps.push(skirt);

  // Lead-in chamfer on the skirt mouth so it self-centres over the rim.
  const lead = Math.min(0.6, p.lipThick * 0.4);
  const leadLo = placedRounded(
    CrossSection,
    d.skirtInL,
    d.skirtInW,
    0.02,
    d.skirtInR,
    -p.lipClear,
    -p.lipClear,
    skirtTop - lead,
    temps
  );
  const leadHi = placedRounded(
    CrossSection,
    d.skirtInL + 2 * lead,
    d.skirtInW + 2 * lead,
    0.02,
    d.skirtInR + lead,
    -p.lipClear - lead,
    -p.lipClear - lead,
    skirtTop + 0.01,
    temps
  );
  skirt = skirt.subtract(hull2(Manifold, leadLo, leadHi, temps));
  temps.push(skirt);

  const beads = [];
  const beadXs = [d.outerL * 0.28, d.outerL * 0.72];
  const oz = p.lidThickness + d.beadDrop;
  for (const px of beadXs) {
    for (const by of [-p.lipClear, d.outerW + p.lipClear]) {
      const s0 = Manifold.sphere(p.beadR, segs);
      temps.push(s0);
      const s1 = s0.translate(-p.beadLen / 2 + p.beadR, 0, 0);
      temps.push(s1);
      const s2 = s0.translate(p.beadLen / 2 - p.beadR, 0, 0);
      temps.push(s2);
      const placed = hull2(Manifold, s1, s2, temps).translate(px, by, oz);
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

  // Thumb scallops in the skirt mouth, middle of each long side.
  const nicks = [];
  const nz = skirtTop + p.lidNickR - p.lidNickDepth;
  for (const y of [-d.lidOff + p.lipThick / 2, d.outerW + d.lidOff - p.lipThick / 2]) {
    const nick = Manifold.cylinder(p.lipThick + 2, p.lidNickR, p.lidNickR, segs, true)
      .rotate(90, 0, 0)
      .translate(d.outerL / 2, y, nz);
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

/**
 * USB spacer comb. Drops in over the cables against the front wall; each tooth fills the gap
 * between the wall and that port's plug body. Local coords match derive(): x from the front
 * wall's inner face, y from the side wall, z from the floor (print as-is, no supports).
 */
export function buildSpacerSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  const d = derive(raw);
  const p = d.p;
  const c = p.spacerFit;
  const W = d.innerW;
  const H = d.spacerH;

  const parts = [Manifold.cube([p.spacerSpine, W, H], false)];
  if (d.stopH > 0) parts.push(Manifold.cube([d.stopDepth, W, d.stopH], false));
  for (const t of d.teeth) {
    parts.push(Manifold.cube([t.depth, d.toothW, H], false).translate(0, t.y - d.toothW / 2, 0));
  }
  temps.push(...parts);
  let solid = unionAll(Manifold, parts, temps);

  const clip = placedRounded(CrossSection, d.innerL, W - 2 * c, H, d.innerR, 0, c, 0, temps);
  solid = solid.intersect(clip);
  temps.push(solid);

  const slots = [];
  const len = d.stopDepth + 2;
  for (const t of d.teeth) {
    const round = Manifold.cylinder(len, d.slotR, d.slotR, segs, false)
      .rotate(0, 90, 0)
      .translate(-1, t.y, d.usbZc);
    temps.push(round);
    const up = Manifold.cube([len, 2 * d.slotR, H - d.usbZc + 1], false).translate(-1, t.y - d.slotR, d.usbZc);
    temps.push(up);
    slots.push(round, up);
  }
  const notch = Manifold.cube([p.spacerSpine + 2, 3, 3], false).translate(-1, c - 0.5, H - 2.5);
  temps.push(notch);
  slots.push(notch);
  const slotU = unionAll(Manifold, slots, temps);
  if (slotU) {
    solid = solid.subtract(slotU);
    temps.push(solid);
  }
  return assertOk(solid, "spacer");
}

export function lidToPreview(solid, d, gap = 12, temps = []) {
  const a = solid.translate(0, -d.outerW, 0);
  temps.push(a);
  const b = a.rotate(180, 0, 0);
  temps.push(b);
  const c = b.translate(0, 0, d.baseZ + d.p.lidThickness + gap);
  temps.push(c);
  return c;
}

export function spacerToBase(solid, d, temps = []) {
  const placed = solid.translate(d.wall, d.wall, d.floor);
  temps.push(placed);
  return placed;
}

export async function buildBox(raw, { quality = "preview", previewLid = true, lidGap = 12 } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 32 : 20;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const d = derive(raw);
  const temps = [];
  try {
    const base = buildBaseSolid(wasm, raw, temps, segs);
    const lidPrint = buildLidSolid(wasm, raw, temps, segs);
    const spacerPrint = buildSpacerSolid(wasm, raw, temps, segs);
    const lid = previewLid ? lidToPreview(lidPrint, d, lidGap, temps) : lidPrint;
    const spacer = spacerToBase(spacerPrint, d, temps);
    const baseMesh = base.getMesh();
    const lidMesh = lid.getMesh();
    const spacerMesh = spacer.getMesh();
    return {
      d,
      baseMesh,
      lidMesh,
      spacerMesh,
      baseVolume: base.volume(),
      lidVolume: lidPrint.volume(),
      spacerVolume: spacerPrint.volume(),
      baseTris: (baseMesh.triVerts.length || 0) / 3,
      lidTris: (lidMesh.triVerts.length || 0) / 3,
      spacerTris: (spacerMesh.triVerts.length || 0) / 3,
    };
  } finally {
    deleteAll(temps);
  }
}

const PART_NAMES = {
  base: "photive-snap-box-base",
  lid: "photive-snap-box-lid",
  spacer: "photive-snap-box-usb-spacer",
};

export async function buildPartStl(raw, part) {
  const wasm = await loadManifold();
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(32);
  const temps = [];
  try {
    const build =
      part === "lid" ? buildLidSolid : part === "spacer" ? buildSpacerSolid : buildBaseSolid;
    const solid = build(wasm, raw, temps, 32);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    const name = PART_NAMES[part] || PART_NAMES.base;
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
