import { derive, profilePoints } from "./geometry.js";
import { meshesTo3mf } from "../shared/threemf.js";

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
        return Module(inBrowser ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) } : {});
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

function unionAll(items, temps) {
  let acc = items[0];
  for (let i = 1; i < items.length; i++) acc = keep(temps, acc.add(items[i]));
  return acc;
}

function roundedRect(CS, w, h, r, segs, temps) {
  const rr = Math.max(0, Math.min(r, w / 2 - 0.3, h / 2 - 0.3));
  if (rr < 0.4) return keep(temps, CS.square([w, h], true));
  const core = keep(temps, CS.square([Math.max(0.4, w - 2 * rr), Math.max(0.4, h - 2 * rr)], true));
  return keep(temps, core.offset(rr, "Round", 2, segs));
}

function shiftedProfile(pattern, flat, x, y) {
  return profilePoints(pattern, flat).map(([px, py]) => [px + x, py + y]);
}

function prism(CS, pattern, flat, height, x, y, z, temps) {
  const section = keep(temps, CS.ofPolygons([shiftedProfile(pattern, flat, x, y)]));
  return keep(temps, section.extrude(Math.max(0.2, height)).translate([0, 0, z]));
}

function taperedHex(CS, startFlat, endFlat, height, x, y, z, temps) {
  const scale = endFlat / Math.max(0.4, startFlat);
  const section = keep(temps, CS.ofPolygons([profilePoints(LEG_PATTERN, startFlat)]));
  const solid = section.extrude(Math.max(0.2, height), 0, 0, [scale, scale]);
  return keep(temps, solid.translate([x, y, z]));
}

function socketCutters(CS, d, x, y, temps, side, depth = d.socketDepth) {
  const mouth = d.mouthFlat;
  const floor = d.floorFlat;
  const thick = d.p.thickness;
  if (side === "bottom") {
    return [
      prism(CS, LEG_PATTERN, mouth, 0.32, x, y, -0.26, temps),
      taperedHex(CS, mouth, floor, depth + 0.08, x, y, 0, temps),
    ];
  }
  return [
    taperedHex(CS, floor, mouth, depth + 0.08, x, y, thick - depth - 0.02, temps),
    prism(CS, LEG_PATTERN, mouth, 0.32, x, y, thick - 0.06, temps),
  ];
}

function capture(solid) {
  assertOk(solid, "shelf");
  const mesh = solid.getMesh();
  return {
    numProp: mesh.numProp,
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
    volume: solid.volume(),
    genus: solid.genus(),
  };
}

function layOnFace(solid, temps) {
  let laid = keep(temps, solid.rotate([0, 90, 0]));
  const box = laid.boundingBox();
  laid = keep(temps, laid.translate([-box.min[0], -box.min[1], -box.min[2]]));
  return laid;
}

const LEG_PATTERN = "hex";

function annulus(r0, r1, a0, a1, steps) {
  const n = Math.max(2, steps);
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    pts.push([r1 * Math.cos(a), r1 * Math.sin(a)]);
  }
  for (let i = n; i >= 0; i--) {
    const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
    pts.push([r0 * Math.cos(a), r0 * Math.sin(a)]);
  }
  return pts;
}

function place(poly, x, y) {
  return poly.map(([px, py]) => [px + x, py + y]);
}

function extrudeAt(CS, poly, z0, z1, temps) {
  const h = z1 - z0;
  if (h <= 0.04) return null;
  const section = keep(temps, CS.ofPolygons([poly]));
  return keep(temps, section.extrude(h).translate([0, 0, z0]));
}

function twistLevels(d) {
  const t = d.twist;
  const thick = d.p.thickness;
  const ceiling = thick - t.land;
  const hookTop = ceiling - t.gap;
  const hookBottom = hookTop - t.hookHeight;
  const pocketFloor = hookBottom - t.floorGap;
  const socketFloor = thick - t.depth;
  return { ceiling, hookTop, hookBottom, pocketFloor, socketFloor };
}

function twistSocket(CS, d, x, y, temps) {
  const t = d.twist;
  const thick = d.p.thickness;
  const { ceiling, pocketFloor, socketFloor } = twistLevels(d);
  const cuts = [];
  const bumps = [];
  const bore = keep(temps, CS.circle(t.holeR, 64).translate([x, y]));
  cuts.push(keep(temps, bore.extrude(thick - socketFloor + 0.3).translate([0, 0, socketFloor - 0.04])));
  const add = (list, solid) => {
    if (solid) list.push(solid);
  };
  for (const base of [t.hookAngle, t.hookAngle + 180]) {
    const shift = base - t.hookAngle;
    const slot = place(annulus(t.holeR - 0.3, t.pocketOuter, base - t.slotHalf, base + t.slotHalf, 6), x, y);
    add(cuts, extrudeAt(CS, slot, pocketFloor, thick + 0.35, temps));
    const land = place(annulus(t.holeR - 0.2, t.pocketOuter, t.stop + shift, t.landEnd + shift, 8), x, y);
    add(cuts, extrudeAt(CS, land, pocketFloor, ceiling, temps));
    const slices = 6;
    const overlap = 0.55;
    for (let i = 0; i < slices; i++) {
      const a0 = t.landEnd + shift + ((t.slotNear - t.landEnd) * i) / slices - overlap;
      const a1 = t.landEnd + shift + ((t.slotNear - t.landEnd) * (i + 1)) / slices + overlap;
      let top = ceiling + (t.land * (i + 1)) / slices;
      if (top >= thick - 0.08) top = thick + 0.3;
      const poly = place(annulus(t.holeR - 0.2, t.pocketOuter, a0, a1, 3), x, y);
      add(cuts, extrudeAt(CS, poly, pocketFloor, top, temps));
    }
    const bumpA = t.trail + shift + 3.5;
    const bump = place(annulus(t.holeR + 0.05, t.hookTipR - 0.08, bumpA, bumpA + 4.5, 3), x, y);
    add(bumps, extrudeAt(CS, bump, pocketFloor - 0.04, pocketFloor + t.floorGap + 0.18, temps));
  }
  return { cuts, bumps };
}

function clipStrip(poly, limit) {
  const clip = (pts, keepSide, at) => {
    if (!pts.length) return [];
    const out = [];
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i];
      const b = pts[(i + 1) % pts.length];
      const ka = keepSide(a);
      const kb = keepSide(b);
      if (ka && kb) out.push(b);
      else if (ka && !kb) out.push(at(a, b));
      else if (!ka && kb) {
        out.push(at(a, b));
        out.push(b);
      }
    }
    return out;
  };
  const cross = (a, b, x) => {
    const t = (x - a[0]) / (b[0] - a[0] || 1e-9);
    return [x, a[1] + (b[1] - a[1]) * t];
  };
  let pts = clip(poly, (p) => p[0] <= limit, (a, b) => cross(a, b, limit));
  pts = clip(pts, (p) => p[0] >= -limit, (a, b) => cross(a, b, -limit));
  return pts;
}

function hookSection(t, angle) {
  const a = (angle * Math.PI) / 180;
  const ca = Math.cos(a);
  const sa = Math.sin(a);
  const x0 = t.apothem - 0.16;
  const x1 = t.apothem + t.hookRadial;
  const w = t.hookHalfWidth;
  const raw = [
    [x0, -w],
    [x1, -w],
    [x1, w],
    [x0, w],
  ].map(([px, py]) => [px * ca - py * sa, px * sa + py * ca]);
  // The bed flats are the ±X faces. Clip the ear flush with them so the
  // doubled ear still prints on a face.
  return clipStrip(raw, t.apothem);
}

function buildFlat(wasm, d, temps) {
  const { CrossSection: CS } = wasm;
  const plate2d = roundedRect(CS, d.p.shelfLength, d.p.shelfWidth, d.cornerR, 16, temps);
  let plate = keep(temps, plate2d.extrude(d.p.thickness));
  const cutters = [];
  for (const cell of d.cells) {
    cutters.push(prism(CS, d.p.pattern, d.cellFlat, d.p.thickness + 1, cell.x, cell.y, -0.5, temps));
  }
  const bumps = [];
  for (const socket of d.sockets) {
    if (d.twist) {
      const twist = twistSocket(CS, d, socket.x, socket.y, temps);
      cutters.push(...twist.cuts);
      bumps.push(...twist.bumps);
      cutters.push(...socketCutters(CS, d, socket.x, socket.y, temps, "bottom", d.bottomDepth));
    } else {
      cutters.push(...socketCutters(CS, d, socket.x, socket.y, temps, "bottom"));
      cutters.push(...socketCutters(CS, d, socket.x, socket.y, temps, "top"));
    }
  }
  if (cutters.length) plate = keep(temps, plate.subtract(unionAll(cutters, temps)));
  if (bumps.length) plate = keep(temps, plate.add(unionAll(bumps, temps)));
  return plate;
}

function buildLeg(wasm, d, temps) {
  const { CrossSection: CS } = wasm;
  let leg = prism(CS, LEG_PATTERN, d.legFlat, d.printedLeg, 0, 0, 0, temps);
  if (!d.twist) return leg;
  const t = d.twist;
  const hooks = [t.hookAngle, t.hookAngle + 180].map((angle) => {
    const section = keep(temps, CS.ofPolygons([hookSection(t, angle)]));
    return keep(temps, section.extrude(t.hookHeight).translate([0, 0, t.tip]));
  });
  leg = keep(temps, leg.add(unionAll(hooks, temps)));
  return leg;
}

function buildLegsFlat(wasm, d, temps) {
  const one = layOnFace(buildLeg(wasm, d, temps), temps);
  const box = one.boundingBox();
  const span = box.max[1] - box.min[1] + 4;
  const copies = [];
  for (let i = 0; i < d.sockets.length; i++) {
    copies.push(keep(temps, one.translate([0, i * span, 0])));
  }
  return unionAll(copies, temps);
}

function buildLegsStanding(wasm, d, temps) {
  let one = buildLeg(wasm, d, temps);
  if (d.twist) one = keep(temps, one.rotate([0, 0, -d.twist.twist]));
  const z = d.p.thickness - d.socketDepth;
  const copies = d.sockets.map((socket) => keep(temps, one.translate([socket.x, socket.y, z])));
  return copies;
}

function buildSocketLeg(wasm, d, temps) {
  const { CrossSection: CS } = wasm;
  let leg = buildLeg(wasm, d, temps);
  const stub = d.socketDepth + 9;
  const box = keep(temps, CS.square([48, 48], true).extrude(stub));
  leg = keep(temps, leg.intersect(box));
  const z = d.p.thickness - d.socketDepth;
  return keep(temps, leg.translate([d.coupon.holeX, d.coupon.holeY, z]));
}

const DIGIT_SEGS = {
  0: "abcedf",
  1: "bc",
  2: "abged",
  3: "abgcd",
  4: "fgbc",
  5: "afgcd",
  6: "afgedc",
  7: "abc",
  8: "abcdefg",
  9: "abfgcd",
};

function glyphBoxes(ch, u0, v0, scale) {
  const w = 2.2 * scale;
  const h = 3.2 * scale;
  const t = Math.max(0.28, 0.46 * scale);
  const depth = 0.4;
  const seg = {
    a: [w / 2, h - t / 2, w, t],
    b: [w - t / 2, h * 0.75, t, h / 2],
    c: [w - t / 2, h * 0.25, t, h / 2],
    d: [w / 2, t / 2, w, t],
    e: [t / 2, h * 0.25, t, h / 2],
    f: [t / 2, h * 0.75, t, h / 2],
    g: [w / 2, h / 2, w - t, t],
  };
  const boxes = [];
  const push = (cu, cv, su, sv) => {
    boxes.push({ size: [su, depth, sv], at: [u0 + cu, depth / 2, v0 + cv] });
  };
  if (ch === "-") {
    push(w / 2, h / 2, w * 0.7, t);
    return boxes;
  }
  if (ch === ".") {
    push(w / 2, t / 2, t, t);
    return boxes;
  }
  const on = DIGIT_SEGS[ch] || "";
  for (const name of on) {
    const [cu, cv, su, sv] = seg[name];
    push(cu, cv, su, sv);
  }
  return boxes;
}

export function socketMarkLines(d) {
  const offset = d.p.holeOffset.toFixed(2);
  if (d.twist) return [offset, d.p.finThickness.toFixed(2)];
  return [offset, d.socketDepth.toFixed(1)];
}

function engraveLines(wasm, solid, d, lines, temps) {
  const { Manifold } = wasm;
  const size = d.coupon.size;
  const flat = Math.max(3, size - 2 * d.cornerR - 0.8);
  const tall = Math.max(1.6, d.p.thickness - 0.8);
  const longest = Math.max(...lines.map((line) => line.length), 1);
  const scale = Math.min(0.72, flat / (longest * 2.7), tall / (lines.length * 3.5 + 0.3));
  const advance = 2.7 * scale;
  const glyphH = 3.2 * scale;
  const gap = 0.35 * scale;
  const blockH = lines.length * glyphH + (lines.length - 1) * gap;
  let v = (d.p.thickness - blockH) / 2;
  let cut = null;
  for (const line of lines) {
    let u = -(line.length * advance) / 2;
    for (const ch of line) {
      if (ch !== " ") {
        for (const box of glyphBoxes(ch, u, v, scale)) {
          const piece = keep(
            temps,
            Manifold.cube([box.size[0], box.size[1] + 0.08, box.size[2]], true).translate([
              box.at[0],
              -size / 2 + box.at[1] - 0.04,
              box.at[2],
            ])
          );
          cut = cut ? keep(temps, cut.add(piece)) : piece;
        }
      }
      u += advance;
    }
    v += glyphH + gap;
  }
  if (!cut) return solid;
  return assertOk(keep(temps, solid.subtract(cut)), "Test marking");
}

function buildTest(wasm, d, temps, lines = null) {
  const { CrossSection: CS } = wasm;
  const size = d.coupon.size;
  const plate2d = roundedRect(CS, size, size, d.cornerR, 16, temps);
  let plate = keep(temps, plate2d.extrude(d.p.thickness));
  if (d.twist) {
    const twist = twistSocket(CS, d, d.coupon.holeX, d.coupon.holeY, temps);
    let cutter = unionAll(twist.cuts, temps);
    plate = keep(temps, plate.subtract(cutter));
    if (twist.bumps.length) plate = keep(temps, plate.add(unionAll(twist.bumps, temps)));
  } else {
    const cutter = unionAll(socketCutters(CS, d, d.coupon.holeX, d.coupon.holeY, temps, "top"), temps);
    plate = keep(temps, plate.subtract(cutter));
  }
  if (lines?.length) plate = engraveLines(wasm, plate, d, lines, temps);
  return plate;
}

export async function buildSocketTest(raw) {
  const d = derive(raw);
  const lines = socketMarkLines(d);
  const wasm = await loadManifold();
  const temps = [];
  try {
    const solid = buildTest(wasm, d, temps, lines);
    const mesh = capture(solid);
    return { d, lines, ...mesh, stl: meshToStl(mesh, "hole-test") };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `stackable-shelf ${name}`.slice(0, 79);
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
    let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
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

export function meshToPositions(mesh) {
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

export function boundsOf(positions) {
  const b = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = positions[i + k];
      if (v < b.min[k]) b.min[k] = v;
      if (v > b.max[k]) b.max[k] = v;
    }
  }
  return b;
}

export async function buildShelf(raw) {
  const d = derive(raw);
  const wasm = await loadManifold();
  const temps = [];
  try {
    const flatSolid = buildFlat(wasm, d, temps);
    const legsSolid = buildLegsFlat(wasm, d, temps);
    const standing = buildLegsStanding(wasm, d, temps);
    const standingSolid = unionAll(standing, temps);
    const testSolid = buildTest(wasm, d, temps);
    const socketLegSolid = buildSocketLeg(wasm, d, temps);

    const flat = capture(flatSolid);
    const legs = capture(legsSolid);
    const legsStanding = capture(standingSolid);
    const test = capture(testSolid);
    const socketLeg = capture(socketLegSolid);
    const legMeshes = standing.map((solid, index) => ({
      name: `Leg ${index + 1}`,
      color: "#C4A574FF",
      mesh: capture(solid),
    }));

    const threemf = meshesTo3mf(
      [
        { name: "Flat piece", color: "#E7D3B0FF", mesh: flat },
        ...legMeshes,
      ],
      "Stackable shelf"
    );

    return {
      d,
      flat,
      legs,
      legsStanding,
      test,
      socketLeg,
      threemf,
      stl: {
        flat: meshToStl(flat, "flat"),
        legs: meshToStl(legs, "legs"),
        test: meshToStl(test, "hole-test"),
      },
    };
  } finally {
    deleteAll(temps);
  }
}

export async function measureTwist(raw) {
  const d = derive({ ...raw, fit: "twist" });
  if (!d.twist) return null;
  const wasm = await loadManifold();
  const { CrossSection: CS } = wasm;
  const temps = [];
  try {
    const plate = buildTest(wasm, d, temps);
    const leg = buildLeg(wasm, d, temps);
    const z = d.p.thickness - d.socketDepth;
    const at = (solid) => keep(temps, solid.translate([d.coupon.holeX, d.coupon.holeY, z]));
    const dropped = at(leg);
    const locked = at(keep(temps, leg.rotate([0, 0, -d.twist.twist])));
    const dropHit = keep(temps, plate.intersect(dropped)).volume();
    const lockHit = keep(temps, plate.intersect(locked)).volume();
    const t = d.twist;
    const ceiling = d.p.thickness - t.land;
    const ang = (t.locked * Math.PI) / 180;
    const radius = (t.holeR + t.hookTipR) / 2;
    const px = d.coupon.holeX + radius * Math.cos(ang);
    const py = d.coupon.holeY + radius * Math.sin(ang);
    const probe = (z0, h) => {
      const box = keep(temps, CS.square([0.35, 0.35], true).translate([px, py]));
      return keep(temps, box.extrude(h).translate([0, 0, z0]));
    };
    const gapProbe = probe(ceiling - t.gap + 0.12, Math.max(0.2, t.gap - 0.22));
    const catchProbe = probe(ceiling + 0.2, 0.35);
    const gapHit = keep(temps, plate.intersect(gapProbe)).volume();
    const catchHit = keep(temps, plate.intersect(catchProbe)).volume();
    return { d, dropHit, lockHit, gapHit, catchHit, gap: t.gap };
  } finally {
    deleteAll(temps);
  }
}

export function downloadArrayBuffer(filename, buffer, mime = "model/stl") {
  const blob = new Blob([buffer], { type: mime });
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
