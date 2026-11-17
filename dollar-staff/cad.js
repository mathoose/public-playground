import { CARD, derive } from "./geometry.js";
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

function keep(temps, item) {
  temps.push(item);
  return item;
}

const QUALITY = {
  preview: { segs: 40, arcSteps: 28, twistStep: 12, flankStep: 0.14, sSteps: 48, sSegs: 40 },
  export: { segs: 72, arcSteps: 42, twistStep: 6, flankStep: 0.07, sSteps: 80, sSegs: 64 },
};

function roundRect(CS, w, h, r, segs, temps) {
  const rr = Math.max(0.6, Math.min(r, w / 2 - 0.3, h / 2 - 0.3));
  const core = keep(temps, CS.square([Math.max(0.4, w - 2 * rr), Math.max(0.4, h - 2 * rr)], true));
  return keep(temps, core.offset(rr, "Round", 2, segs));
}

function cubic(p0, p1, p2, p3, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    pts.push([
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ]);
  }
  return pts;
}

function ellipsePoint(cx, cy, rx, ry, deg) {
  const a = (deg * Math.PI) / 180;
  return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
}

function ellipseTangent(rx, ry, deg, dir) {
  const a = (deg * Math.PI) / 180;
  const tx = -rx * Math.sin(a) * dir;
  const ty = ry * Math.cos(a) * dir;
  const len = Math.hypot(tx, ty) || 1;
  return [tx / len, ty / len];
}

function arcPoints(cx, cy, rx, ry, deg0, deg1, steps) {
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const deg = deg0 + ((deg1 - deg0) * i) / steps;
    pts.push(ellipsePoint(cx, cy, rx, ry, deg));
  }
  return pts;
}

/** One S centerline: top arch, waist, bottom arch. Angles run so the stroke does not close into a ring. */
function sSpine(rx, ry, steps) {
  const upper0 = 16;
  const upper1 = 196;
  const lower0 = 16;
  const lower1 = -164;
  const arcN = Math.max(24, steps);
  const upper = arcPoints(0, ry, rx, ry, upper0, upper1, arcN);
  const lower = arcPoints(0, -ry, rx, ry, lower0, lower1, arcN);
  const p0 = upper[upper.length - 1];
  const p3 = lower[0];
  const t0 = ellipseTangent(rx, ry, upper1, 1);
  const t3 = ellipseTangent(rx, ry, lower0, -1);
  const span = Math.hypot(p3[0] - p0[0], p3[1] - p0[1]);
  const handle = span * 0.46;
  const mid = cubic(
    p0,
    [p0[0] + t0[0] * handle, p0[1] + t0[1] * handle],
    [p3[0] - t3[0] * handle, p3[1] - t3[1] * handle],
    p3,
    Math.max(16, Math.round(arcN * 0.4))
  );
  mid.shift();
  mid.pop();
  return [...upper, ...mid, ...lower];
}

/** Spine in profile coordinates, shifted so the top of the stroke is strokeTop. */
function sLayout(d, steps) {
  const stroke = d.p.stroke;
  const rx = (d.loopW - stroke) / 2;
  const ry = (d.loopH - stroke) / 4;
  const spine = sSpine(rx, ry, steps);
  let maxY = -Infinity;
  let minY = Infinity;
  for (const p of spine) {
    maxY = Math.max(maxY, p[1]);
    minY = Math.min(minY, p[1]);
  }
  const half = stroke / 2;
  const shift = d.strokeTop - (maxY + half);
  return {
    pts: spine.map(([x, y]) => [x, y + shift]),
    half,
    top: d.strokeTop,
    bottom: minY + shift - half,
  };
}

/** Round stroke along the spine. Overlaps fuse, so a tight bend cannot notch the end. */
function strokeSection(CrossSection, pts, half, segs, temps) {
  const parts = [];
  const n = Math.max(24, segs);
  for (let i = 0; i < pts.length; i++) {
    parts.push(keep(temps, CrossSection.circle(half, n).translate(pts[i])));
    if (i === pts.length - 1) break;
    const a = pts[i];
    const b = pts[i + 1];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    if (len < 0.2) continue;
    const ang = (Math.atan2(dy, dx) * 180) / Math.PI;
    const core = keep(temps, CrossSection.square([len, half * 2], true));
    parts.push(keep(temps, core.rotate(ang).translate([(a[0] + b[0]) / 2, (a[1] + b[1]) / 2])));
  }
  let acc = parts[0];
  for (let i = 1; i < parts.length; i += 16) {
    acc = keep(temps, CrossSection.union([acc, ...parts.slice(i, i + 16)]));
  }
  return acc;
}

function polygonArea(pts) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    area += x0 * y1 - x1 * y0;
  }
  return area / 2;
}

/**
 * ACME ridge cross-section at z = 0. Axial width maps to angle so a twisted
 * extrusion becomes a helix. rTip is the crest (minor), rRoot is buried in the wall.
 */
function threadSection(CrossSection, { rRoot, rFlank, rTip, widthAt, pitch, flankStep }) {
  const ang = (w) => (w / pitch) * Math.PI;
  const pts = [];
  const arc = (r, a0, a1, n) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([r * Math.cos(a), r * Math.sin(a)]);
    }
  };
  const aRoot = ang(widthAt(rFlank));
  const flankN = Math.max(4, Math.ceil(Math.abs(aRoot - ang(widthAt(rTip))) / flankStep));
  arc(rRoot, -aRoot, aRoot, Math.max(6, Math.ceil(aRoot / 0.14)));
  for (let i = 0; i <= flankN; i++) {
    const r = rFlank + ((rTip - rFlank) * i) / flankN;
    pts.push([r * Math.cos(ang(widthAt(r))), r * Math.sin(ang(widthAt(r)))]);
  }
  const aTip = ang(widthAt(rTip));
  arc(rTip, aTip, -aTip, Math.max(2, Math.ceil((2 * aTip) / 0.1)));
  for (let i = flankN; i >= 0; i--) {
    const r = rFlank + ((rTip - rFlank) * i) / flankN;
    pts.push([r * Math.cos(-ang(widthAt(r))), r * Math.sin(-ang(widthAt(r)))]);
  }
  if (polygonArea(pts) < 0) pts.reverse();
  return new CrossSection([pts]);
}

function helix(cs, z0, length, pitch, twistStep, temps) {
  const twist = (length / pitch) * 360;
  const div = Math.max(8, Math.ceil(Math.abs(twist) / twistStep));
  const ex = keep(temps, cs.extrude(length, div, twist));
  return keep(temps, ex.translate([0, 0, z0]));
}

function revolveProfile(CrossSection, pts, segs, temps) {
  const cs = keep(temps, new CrossSection([pts]));
  return keep(temps, cs.revolve(segs));
}

/** Profile in XY (x = width, y = height), extruded, then stood up: thickness along Y, height along Z. */
function standUp(solid, yBack, temps) {
  const stood = keep(
    temps,
    solid.transform([1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, yBack, 0, 1])
  );
  return stood;
}

function cylZ(Manifold, h, r, segs, at, temps) {
  return keep(temps, Manifold.cylinder(h, r, r, segs, false).translate(at));
}

function roundedBoxY(CS, Manifold, w, depth, h, r, segs, originY, centerZ, temps) {
  const section = roundRect(CS, w, h, r, segs, temps);
  const ex = keep(temps, section.extrude(Math.max(0.2, depth)));
  const stood = standUp(ex, originY, temps);
  return keep(temps, stood.translate([0, 0, centerZ]));
}

/** 2D x becomes world Y, 2D y becomes world Z, extrusion becomes world X. */
function standAcross(solid, x0, temps) {
  return keep(temps, solid.transform([0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, x0, 0, 0, 1]));
}

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function boxAt(Manifold, size, at, temps) {
  return keep(temps, Manifold.cube(size, true).translate(at));
}

/** Capsule along Z. Same nub the other snap cases use: a short bead, not a hair pin. */
function beadZ(Manifold, r, len, at, temps) {
  const s0 = keep(temps, Manifold.sphere(Math.max(0.2, r), 18));
  const half = Math.max(0, len / 2 - r);
  const a = keep(temps, s0.translate([0, 0, -half]));
  const b = keep(temps, s0.translate([0, 0, half]));
  return keep(temps, Manifold.hull([a, b]).translate(at));
}


/**
 * Sandwich latch, sized like the Photive snap box: a lip at least 2.2 mm
 * thick and a 0.6 mm bead that bites 0.3 mm. The two case halves snap
 * around the card. No dovetail.
 */
function latchShells(Manifold, front, back, d, temps) {
  const proud = 2.2;
  const beadR = 0.6;
  const clear = 0.28;
  const caseBottom = d.caseBottom;
  const ribT = 2.6;
  const ribLen = 12;
  const yRib = d.pocketY / 2 + d.wall / 2;
  const zs = [caseBottom + d.wall + 9, d.cardCenterZ - d.pocketZ * 0.2];
  for (const z of zs) {
    if (z - ribLen / 2 < caseBottom + d.wall) continue;
    for (const side of [-1, 1]) {
      const rib = boxAt(Manifold, [proud, ribT, ribLen], [proud / 2, side * yRib, z], temps);
      const nub = beadZ(Manifold, beadR, 8, [proud, side * yRib, z], temps);
      back = keep(temps, back.add(rib).add(nub));
      const groove = boxAt(
        Manifold,
        [proud + beadR + 0.4, ribT + 2 * clear, ribLen + 2 * clear],
        [(proud + beadR) / 2 - 0.15, side * yRib, z],
        temps
      );
      const nubClear = beadZ(Manifold, beadR + clear, 8.6, [proud, side * yRib, z], temps);
      front = keep(temps, front.subtract(groove).subtract(nubClear));
    }
  }

  return { front, back };
}

export function buildShells(wasm, raw, temps, quality = "preview") {
  const { CrossSection, Manifold } = wasm;
  const q = QUALITY[quality] || QUALITY.preview;
  const d = derive(raw);

  const layout = sLayout(d, q.sSteps);
  const ess = strokeSection(CrossSection, layout.pts, layout.half, q.sSegs, temps);
  const fittedBarH = Math.max(4, layout.top - layout.bottom);
  const bar2d = keep(
    temps,
    CrossSection.square([d.barW, fittedBarH], true).translate([0, (layout.top + layout.bottom) / 2])
  );
  const profile = keep(temps, CrossSection.union([ess, bar2d]));
  const extruded = keep(temps, profile.extrude(d.signT));
  let sign = standUp(extruded, d.signBackY, temps);

  // The vertical stroke is deepened perpendicular to the S, out to the case faces,
  // so the card box is the top of that stroke instead of a block stuck on the sign.
  // Slightly inside the stroke so the union does not share a face with the S.
  // A shared face is what leaves zero-area triangles in the mesh.
  const deepH = Math.max(4, layout.top - layout.bottom - 0.6);
  const deep = keep(
    temps,
    Manifold.cube([Math.max(8, d.barW - 0.8), d.caseY, deepH], true).translate([0, 0, (layout.top + layout.bottom) / 2])
  );
  sign = keep(temps, sign.add(deep));

  const caseProfile = keep(
    temps,
    CrossSection.square([d.caseY, d.caseZ], true).translate([d.cardCenterY, d.caseCenterZ])
  );
  const caseEx = keep(temps, caseProfile.extrude(d.caseX));
  let caseSolid = standAcross(caseEx, d.xCaseBack, temps);

  const pocketProfile = keep(
    temps,
    roundRect(CrossSection, d.pocketY, d.pocketZ, d.pocketR, q.segs, temps).translate([d.cardCenterY, d.cardCenterZ])
  );
  const pocketEx = keep(temps, pocketProfile.extrude(d.pocketX + 0.04));
  const pocket = standAcross(pocketEx, d.cardCenterX - (d.pocketX + 0.04) / 2, temps);
  caseSolid = keep(temps, caseSolid.subtract(pocket));

  const backSpace = keep(temps, Manifold.cube([400, 500, 700], false).translate([-400, -250, -20]));
  const frontSpace = keep(temps, Manifold.cube([400, 500, 700], false).translate([0, -250, -20]));
  let back = keep(temps, caseSolid.intersect(backSpace));
  let front = keep(temps, caseSolid.intersect(frontSpace));

  const cup = threadedSocket(wasm, d, q, temps);

  const disk = cylZ(Manifold, 2.2, d.socketR, q.segs, [0, d.yCenter, d.socketTop - 1.2], temps);
  const foot = keep(
    temps,
    Manifold.cube([d.barW, d.caseY, 8], true).translate([0, d.yCenter, layout.bottom + 2.2])
  );
  const neck = keep(temps, Manifold.hull([disk, foot]));
  const socket = keep(temps, Manifold.union([cup, neck]));
  sign = keep(temps, sign.add(socket));

  // One plane cut, the way Meshy and Tripo cap a split. The case stays with the
  // two snap shells. The lower S and the broom screw stay one solid. A straight
  // cube key on each side of the card joins them. No dovetail.
  const splitZ = d.caseBottom;
  const span = d.loopW + 80;
  const low = keep(temps, Manifold.cube([span, d.caseY + 40, splitZ + 20], false).translate([-span / 2, -(d.caseY + 40) / 2, -20]));
  const high = keep(temps, Manifold.cube([span, d.caseY + 40, d.strokeTop + 80], false).translate([-span / 2, -(d.caseY + 40) / 2, splitZ]));
  const caseBox = keep(temps, Manifold.cube([d.caseX, d.caseY, d.caseZ], true).translate([0, 0, d.caseCenterZ]));
  let bottom = keep(temps, sign.intersect(low).subtract(caseBox));
  const upper = keep(temps, sign.intersect(high));
  const keys = [-1, 1].map((side) => cubeKey(Manifold, d, side, 0, temps));
  const sockets = [-1, 1].map((side) => cubeKey(Manifold, d, side, 0.35, temps));
  bottom = keep(temps, Manifold.union([bottom, ...keys]));
  const right = keep(temps, upper.intersect(frontSpace).subtract(pocket));
  const left = keep(temps, upper.intersect(backSpace).subtract(pocket));
  front = keep(temps, front.add(right).subtract(sockets[1]));
  back = keep(temps, back.add(left).subtract(sockets[0]));
  const latched = latchShells(Manifold, front, back, d, temps);
  front = latched.front;
  back = latched.back;

  assertOk(front, "case front");
  assertOk(back, "case back");
  assertOk(bottom, "bottom staff");
  assertOk(cup, "socket test");
  return { front, back, sign: bottom, socket: cup, d };
}

/** Cube connector on one side of the card slot. grow opens the matching socket. */
function cubeKey(Manifold, d, side, grow, temps) {
  const half = d.barW / 2;
  const pocketHalf = d.pocketX / 2;
  const available = half - pocketHalf;
  let wall = 3.2;
  if (available - 2 * wall < 3.4) wall = Math.max(2.6, (available - 3.4) / 2);
  const inner = pocketHalf + wall - grow;
  const outer = half - wall + grow;
  const x0 = side * inner;
  const x1 = side * outer;
  const xMin = Math.min(x0, x1);
  const xMax = Math.max(x0, x1);
  const z0 = d.caseBottom - 10 - grow;
  const z1 = d.caseBottom + 18 + grow;
  return boxAt(
    Manifold,
    [xMax - xMin, 18 + 2 * grow, z1 - z0],
    [(xMin + xMax) / 2, 0, (z0 + z1) / 2],
    temps
  );
}

/** The broom socket only: 3/4"-5 ACME female thread, no neck and no dollar sign. */
function threadedSocket(wasm, d, q, temps) {
  const { CrossSection, Manifold } = wasm;
  const { minorR, majorR, pitch } = d;
  const tan = Math.tan((14.5 * Math.PI) / 180);
  const wTip = 0.3707 * pitch;
  const wRoot = wTip + (majorR - minorR) * 2 * tan;
  const widthAt = (r) => {
    const t = clamp01((r - minorR) / Math.max(0.2, majorR - minorR));
    return wTip + (wRoot - wTip) * t;
  };
  const section = keep(
    temps,
    threadSection(CrossSection, {
      rRoot: majorR + 0.45,
      rFlank: majorR,
      rTip: minorR,
      widthAt,
      pitch,
      flankStep: q.flankStep,
    })
  );
  const threadLen = d.p.engage + pitch;
  const threadZ = d.threadStart - pitch * 0.35;
  let ridge = helix(section, threadZ, threadLen, pitch, q.twistStep, temps);
  const clip = revolveProfile(
    CrossSection,
    [
      [0, d.threadStart - 0.2],
      [minorR - 0.3, d.threadStart - 0.2],
      [majorR + 0.55, d.threadStart + d.leadIn],
      [majorR + 0.55, d.threadStart + d.p.engage - d.leadIn],
      [minorR - 0.3, d.threadStart + d.p.engage + 0.2],
      [0, d.threadStart + d.p.engage + 0.2],
    ],
    q.segs,
    temps
  );
  ridge = keep(temps, ridge.intersect(clip));
  ridge = keep(temps, ridge.translate([0, d.yCenter, 0]));

  const outer = cylZ(Manifold, d.socketTop, d.socketR, q.segs, [0, d.yCenter, 0], temps);
  const bore = cylZ(Manifold, d.boreEnd + 0.4, majorR, q.segs, [0, d.yCenter, -0.2], temps);
  const mouth = keep(
    temps,
    Manifold.cylinder(2.2, majorR + 1.4, majorR, q.segs, false).translate([0, d.yCenter, -0.2])
  );
  let socket = keep(temps, outer.subtract(bore).subtract(mouth));
  socket = keep(temps, socket.add(ridge));
  return socket;
}

function clamp01(t) {
  return Math.min(1, Math.max(0, t));
}

/** Real ID-1 card, centered in the pocket. For fit checks — not part of the print. */
export function cardSolid(wasm, raw, temps) {
  const { CrossSection, Manifold } = wasm;
  const d = derive(raw);
  const profile = keep(
    temps,
    roundRect(CrossSection, CARD.w, CARD.h, CARD.corner, 24, temps).translate([d.cardCenterY, d.cardCenterZ])
  );
  const ex = keep(temps, profile.extrude(CARD.t));
  return standAcross(ex, d.cardCenterX - CARD.t / 2, temps);
}

/** Drop zero-area triangles. A shared face from a boolean can leave a collapsed one. */
export function copyMesh(mesh) {
  const stride = mesh.numProp || 3;
  const src = mesh.vertProperties;
  const tris = mesh.triVerts;
  const kept = [];
  for (let t = 0; t < tris.length; t += 3) {
    const ia = tris[t] * stride;
    const ib = tris[t + 1] * stride;
    const ic = tris[t + 2] * stride;
    const ax = src[ib] - src[ia];
    const ay = src[ib + 1] - src[ia + 1];
    const az = src[ib + 2] - src[ia + 2];
    const bx = src[ic] - src[ia];
    const by = src[ic + 1] - src[ia + 1];
    const bz = src[ic + 2] - src[ia + 2];
    const area = Math.hypot(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx) * 0.5;
    if (area > 1e-6) kept.push(tris[t], tris[t + 1], tris[t + 2]);
  }
  return {
    numProp: stride,
    vertProperties: new Float32Array(src),
    triVerts: new Uint32Array(kept),
  };
}

export function meshPositions(mesh) {
  const stride = mesh.numProp || 3;
  const src = mesh.vertProperties;
  const tris = mesh.triVerts;
  const pos = new Float32Array(tris.length * 3);
  let i = 0;
  for (let t = 0; t < tris.length; t++) {
    const v = tris[t] * stride;
    pos[i++] = src[v];
    pos[i++] = src[v + 1];
    pos[i++] = src[v + 2];
  }
  return pos;
}

export async function buildDollar(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const temps = [];
  try {
    const { front, back, sign, socket, d } = buildShells(wasm, raw, temps, quality);
    const frontMesh = copyMesh(front.getMesh());
    const backMesh = copyMesh(back.getMesh());
    const signMesh = copyMesh(sign.getMesh());
    const socketMesh = copyMesh(socket.getMesh());
    return {
      d,
      frontMesh,
      backMesh,
      signMesh,
      socketMesh,
      frontPositions: meshPositions(frontMesh),
      backPositions: meshPositions(backMesh),
      signPositions: meshPositions(signMesh),
      frontVolume: front.volume(),
      backVolume: back.volume(),
      signVolume: sign.volume(),
      socketVolume: socket.volume(),
      frontTris: frontMesh.triVerts.length / 3,
      backTris: backMesh.triVerts.length / 3,
      signTris: signMesh.triVerts.length / 3,
      socketTris: socketMesh.triVerts.length / 3,
    };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const header = new Uint8Array(buf, 0, 80);
  const label = name.slice(0, 79);
  for (let i = 0; i < label.length; i++) header[i] = label.charCodeAt(i);
  const view = new DataView(buf);
  view.setUint32(80, triCount, true);
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const v = [0, 1, 2].map((k) => triVerts[t * 3 + k] * stride);
    const [a, b, c] = v.map((i) => [vertProperties[i], vertProperties[i + 1], vertProperties[i + 2]]);
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const nx = e1[1] * e2[2] - e1[2] * e2[1];
    const ny = e1[2] * e2[0] - e1[0] * e2[2];
    const nz = e1[0] * e2[1] - e1[1] * e2[0];
    const nl = Math.hypot(nx, ny, nz) || 1;
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
    for (let k = 0; k < 3; k++) {
      const pt = [a, b, c][k];
      view.setFloat32(o + 12 + k * 12, pt[0], true);
      view.setFloat32(o + 16 + k * 12, pt[1], true);
      view.setFloat32(o + 20 + k * 12, pt[2], true);
    }
    view.setUint16(o + 48, 0, true);
    o += 50;
  }
  return buf;
}

const FRONT_COLOR = "#3CB371FF";
const BACK_COLOR = "#1F8A4CFF";
const SIGN_COLOR = "#0E4D32FF";

export function assembly3mf(frontMesh, backMesh, signMesh) {
  return meshesTo3mf(
    [
      { name: "Case front", mesh: frontMesh, color: FRONT_COLOR },
      { name: "Case back", mesh: backMesh, color: BACK_COLOR },
      { name: "Bottom staff", mesh: signMesh, color: SIGN_COLOR },
    ],
    "Dollar staff"
  );
}

/** Export-quality STL of the broom socket alone. Does not build the dollar sign. */
export async function buildSocketTest(raw) {
  const wasm = await loadManifold();
  const temps = [];
  try {
    const d = derive(raw);
    const socket = threadedSocket(wasm, d, QUALITY.export, temps);
    assertOk(socket, "socket test");
    const socketMesh = copyMesh(socket.getMesh());
    return {
      d,
      socketMesh,
      socketVolume: socket.volume(),
      socketStl: meshToStl(socketMesh, "dollar-staff-socket-test"),
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildExports(raw) {
  const built = await buildDollar(raw, { quality: "export" });
  return {
    ...built,
    frontStl: meshToStl(built.frontMesh, "dollar-staff-case-front"),
    backStl: meshToStl(built.backMesh, "dollar-staff-case-back"),
    signStl: meshToStl(built.signMesh, "dollar-staff-bottom"),
    socketStl: meshToStl(built.socketMesh, "dollar-staff-socket-test"),
    threemf: assembly3mf(built.frontMesh, built.backMesh, built.signMesh),
  };
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
  const view = new DataView(buffer);
  return view.getUint32(80, true);
}
