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
  preview: { segs: 40, arcSteps: 28, twistStep: 12, flankStep: 0.14 },
  export: { segs: 72, arcSteps: 42, twistStep: 6, flankStep: 0.07 },
};

function roundRect(CS, w, h, r, segs, temps) {
  const rr = Math.max(0.6, Math.min(r, w / 2 - 0.3, h / 2 - 0.3));
  const core = keep(temps, CS.square([Math.max(0.4, w - 2 * rr), Math.max(0.4, h - 2 * rr)], true));
  return keep(temps, core.offset(rr, "Round", 2, segs));
}

/** Constant-width circular hook. sign = 1 is the upper-left bowl; -1 is the lower-right bowl. */
function hookPolygon(d, sign, steps) {
  const { R, cux, cuy, half, a0, a1 } = d.hook;
  const Ro = R + half;
  const Ri = Math.max(1.2, R - half);
  const cx = sign * cux;
  const cy = sign * cuy;
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const a = a0 + ((a1 - a0) * i) / steps;
    const aa = sign === 1 ? a : a + Math.PI;
    pts.push([cx + Ro * Math.cos(aa), cy + Ro * Math.sin(aa) + d.barCenterZ]);
  }
  for (let i = steps; i >= 0; i--) {
    const a = a0 + ((a1 - a0) * i) / steps;
    const aa = sign === 1 ? a : a + Math.PI;
    pts.push([cx + Ri * Math.cos(aa), cy + Ri * Math.sin(aa) + d.barCenterZ]);
  }
  return pts;
}

/** Sliding dovetail. Narrow at yRoot, wide at yTip. Extruded along Z. */
function dovetailRail(CrossSection, { neck, tip, yRoot, yTip, z0, len }, temps) {
  const poly = [
    [-neck / 2, yRoot],
    [neck / 2, yRoot],
    [tip / 2, yTip],
    [-tip / 2, yTip],
  ];
  if (polygonArea(poly) < 0) poly.reverse();
  const cs = keep(temps, new CrossSection([poly]));
  return keep(temps, cs.extrude(Math.max(0.4, len)).translate([0, 0, z0]));
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

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

export function buildShells(wasm, raw, temps, quality = "preview") {
  const { CrossSection, Manifold } = wasm;
  const q = QUALITY[quality] || QUALITY.preview;
  const d = derive(raw);

  const upperPts = hookPolygon(d, 1, q.arcSteps);
  const lowerPts = hookPolygon(d, -1, q.arcSteps);
  if (polygonArea(upperPts) < 0) upperPts.reverse();
  if (polygonArea(lowerPts) < 0) lowerPts.reverse();
  const upper = keep(temps, new CrossSection([upperPts]));
  const lower = keep(temps, new CrossSection([lowerPts]));
  const bar2d = keep(temps, roundRect(CrossSection, d.barW, d.barH, d.barR, q.segs, temps).translate([0, d.barCenterZ]));
  const profile = keep(temps, CrossSection.union([upper, lower, bar2d]));
  const extruded = keep(temps, profile.extrude(d.signT));
  let sign = standUp(extruded, d.signBackY, temps);

  const slot = dovetailRail(
    CrossSection,
    {
      neck: d.neck + 2 * d.tailClear,
      tip: d.tip + 2 * d.tailClear,
      yRoot: d.signFrontY + 0.45,
      yTip: d.signFrontY - d.tailDepth - 0.35,
      z0: d.slotZ0,
      len: d.slotLen,
    },
    temps
  );
  sign = keep(temps, sign.subtract(slot));

  const caseEx = keep(temps, roundRect(CrossSection, d.caseW, d.caseH, d.caseR, q.segs, temps).translate([0, d.barCenterZ]).extrude(d.backFloor + d.pocketD + d.frontT));
  const caseSolid = standUp(caseEx, d.yCaseBack, temps);
  const backSpace = keep(temps, Manifold.cube([500, 400, 700], false).translate([-250, -400, -20]));
  const frontSpace = keep(temps, Manifold.cube([500, 400, 700], false).translate([-250, 0, -20]));
  let back = keep(temps, caseSolid.intersect(backSpace));
  let front = keep(temps, caseSolid.intersect(frontSpace));

  const pocket = roundedBoxY(
    CrossSection,
    Manifold,
    d.pocketW,
    d.pocketD + 0.08,
    d.pocketH,
    d.pocketR,
    q.segs,
    -(d.pocketD - 0.02),
    d.barCenterZ,
    temps
  );
  back = keep(temps, back.subtract(pocket));

  const male = dovetailRail(
    CrossSection,
    {
      neck: d.neck,
      tip: d.tip,
      yRoot: d.yCaseBack + 0.4,
      yTip: d.signFrontY - d.tailDepth,
      z0: d.tailZ0,
      len: d.tailLen,
    },
    temps
  );
  back = keep(temps, back.add(male));

  const headH = 1.25;
  const shaftLen = d.frontT - headH + 0.15;
  for (const snap of d.snaps) {
    const shaft = keep(
      temps,
      Manifold.cylinder(shaftLen + 0.35, d.snapShaftR, d.snapShaftR, 28, false)
        .rotate([-90, 0, 0])
        .translate([snap.x, -0.35, snap.z])
    );
    const head = keep(
      temps,
      Manifold.cylinder(headH, d.snapHeadR, d.snapHeadR * 0.72, 28, false)
        .rotate([-90, 0, 0])
        .translate([snap.x, shaftLen - 0.2, snap.z])
    );
    const post = keep(temps, Manifold.union([shaft, head]));
    back = keep(temps, back.add(post));

    const through = keep(
      temps,
      Manifold.cylinder(d.frontT - headH + 0.45, d.snapHoleR, d.snapHoleR, 28, false)
        .rotate([-90, 0, 0])
        .translate([snap.x, -0.2, snap.z])
    );
    const counter = keep(
      temps,
      Manifold.cylinder(headH + 0.45, d.snapHeadR + 0.28, d.snapHeadR + 0.28, 28, false)
        .rotate([-90, 0, 0])
        .translate([snap.x, d.frontT - headH - 0.05, snap.z])
    );
    front = keep(temps, front.subtract(keep(temps, Manifold.union([through, counter]))));
  }

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

  const disk = cylZ(Manifold, 2.2, d.socketR, q.segs, [0, d.yCenter, d.socketTop - 1.2], temps);
  const stemW = Math.max(d.barW * 0.92, 16);
  const foot = keep(
    temps,
    Manifold.cube([stemW, d.signT * 0.92, 8], true).translate([0, d.yCenter, d.barBottomZ + 2.4])
  );
  const neck = keep(temps, Manifold.hull([disk, foot]));
  socket = keep(temps, Manifold.union([socket, neck]));
  sign = keep(temps, sign.add(socket));

  assertOk(front, "case front");
  assertOk(back, "case back");
  assertOk(sign, "dollar sign");
  return { front, back, sign, d };
}

function clamp01(t) {
  return Math.min(1, Math.max(0, t));
}

/** Real ID-1 card, centered in the pocket. For fit checks — not part of the print. */
export function cardSolid(wasm, raw, temps) {
  const { CrossSection, Manifold } = wasm;
  const d = derive(raw);
  return roundedBoxY(
    CrossSection,
    Manifold,
    CARD.h,
    CARD.t,
    CARD.w,
    CARD.corner,
    24,
    d.cardCenterY - CARD.t / 2,
    d.barCenterZ,
    temps
  );
}

export function copyMesh(mesh) {
  return {
    numProp: mesh.numProp || 3,
    vertProperties: new Float32Array(mesh.vertProperties),
    triVerts: new Uint32Array(mesh.triVerts),
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
    const { front, back, sign, d } = buildShells(wasm, raw, temps, quality);
    return {
      d,
      frontMesh: copyMesh(front.getMesh()),
      backMesh: copyMesh(back.getMesh()),
      signMesh: copyMesh(sign.getMesh()),
      frontPositions: meshPositions(front.getMesh()),
      backPositions: meshPositions(back.getMesh()),
      signPositions: meshPositions(sign.getMesh()),
      frontVolume: front.volume(),
      backVolume: back.volume(),
      signVolume: sign.volume(),
      frontTris: front.getMesh().triVerts.length / 3,
      backTris: back.getMesh().triVerts.length / 3,
      signTris: sign.getMesh().triVerts.length / 3,
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
      { name: "Dollar sign", mesh: signMesh, color: SIGN_COLOR },
    ],
    "Dollar staff"
  );
}

export async function buildExports(raw) {
  const built = await buildDollar(raw, { quality: "export" });
  return {
    ...built,
    frontStl: meshToStl(built.frontMesh, "dollar-staff-case-front"),
    backStl: meshToStl(built.backMesh, "dollar-staff-case-back"),
    signStl: meshToStl(built.signMesh, "dollar-staff-sign"),
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
