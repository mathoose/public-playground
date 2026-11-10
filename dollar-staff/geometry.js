/** Dollar-sign staff top. Card sits in the bar; two shells snap around it; the back screws onto a broom. */

export const APP_VERSION = "1 · Nov 10, 2026";
export const APP_VERSION_TAG = "v1";
export const APP_NAME = "Dollar staff";

/** ISO/IEC 7810 ID-1. */
export const CARD = Object.freeze({
  w: 53.98,
  h: 85.6,
  t: 0.76,
  corner: 3.18,
});

/** 3/4"-5 general-purpose ACME (ASME B1.5). Female socket, right-hand. */
export const ACME_TPI = 5;
export const ACME_PITCH = 25.4 / ACME_TPI;
export const ACME_BASIC_MAJOR = 0.75 * 25.4;
export const ACME_BASIC_MINOR = ACME_BASIC_MAJOR - ACME_PITCH;
/** Printed crest-to-crest hole. A little over the basic minor so a wood thread starts. */
export const THREAD_ID = ACME_BASIC_MINOR + 0.5;
/** Internal major (groove). Clear of the 19.05 mm male crest. */
export const THREAD_ROOT = ACME_BASIC_MAJOR + 0.7;

export const DEFAULT_PARAMS = Object.freeze({
  dollarW: 132,
  stroke: 15,
  clearance: 0.4,
  barWall: 4.5,
  engage: 28,
});

export const SLIDERS = [
  { key: "dollarW", group: "dollar", label: "Dollar width", min: 110, max: 200, step: 1, unit: "mm" },
  { key: "stroke", group: "dollar", label: "S stroke", min: 12, max: 22, step: 0.5, unit: "mm" },
  { key: "clearance", group: "card", label: "Card clearance (per side)", min: 0.2, max: 1.2, step: 0.05, unit: "mm" },
  { key: "barWall", group: "card", label: "Plastic around the card", min: 3.2, max: 8, step: 0.1, unit: "mm" },
  { key: "engage", group: "thread", label: "Thread engagement", min: 16, max: 42, step: 1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function mergeParams(overrides = {}) {
  const p = { ...DEFAULT_PARAMS, ...overrides };
  for (const s of SLIDERS) {
    let v = Number(p[s.key]);
    if (!Number.isFinite(v)) v = DEFAULT_PARAMS[s.key];
    v = clamp(v, s.min, s.max);
    const decimals = s.step >= 1 ? 0 : (String(s.step).split(".")[1] || "").length;
    p[s.key] = Number(v.toFixed(decimals));
  }
  return p;
}

export function fileName(part) {
  if (part === "3mf") return `dollar-staff-${APP_VERSION_TAG}.3mf`;
  return `dollar-staff-${APP_VERSION_TAG}-${part}.stl`;
}

/**
 * Layout in millimeters. Z up, socket mouth on z = 0, thickness along Y, width along X.
 * The card is centered in the bar. The S hooks sit outside the bar, so the counters
 * do not open the pocket.
 */
export function derive(raw) {
  const p = mergeParams(raw);
  const pitch = ACME_PITCH;
  const threadID = THREAD_ID;
  const threadRoot = THREAD_ROOT;
  const minorR = threadID / 2;
  const majorR = threadRoot / 2;

  const pocketW = CARD.w + 2 * p.clearance;
  const pocketH = CARD.h + 2 * p.clearance;
  const pocketD = CARD.t + p.clearance;
  const pocketR = CARD.corner + p.clearance;

  const frontT = 3.2;
  const backFloor = 2.6;
  const yBack = -(backFloor + pocketD);
  const yFront = frontT;
  const totalT = yFront - yBack;
  const yCenter = (yFront + yBack) / 2;
  const cardCenterY = -pocketD / 2;

  const endPad = 12;
  const poke = 9;
  const barW = pocketW + 2 * p.barWall;
  const barHFloor = pocketH + 2 * p.barWall + 2 * endPad;
  const loopW = Math.max(p.dollarW, barW + p.stroke * 2.35);
  const loopH = Math.max(loopW * 1.04, pocketH + 2 * p.barWall + 10);
  const barH = Math.max(barHFloor, loopH + 2 * poke);
  const barR = Math.min(7, p.barWall * 0.85);

  const half = p.stroke / 2;
  const topCL = loopH / 2 - half;
  const R = topCL / 2;
  const cuy = R;
  const cux = -loopW / 2 + half + R;
  const barEdge = -barW / 2;
  const cosT = clamp((barEdge - cux) / R, -1, 1);
  const theta = Math.acos(cosT);
  const ext = Math.min(0.3, Math.max(0.05, theta - 0.45));

  const socketR = 17;
  const threadStart = 1.8;
  const lead = 3.4;
  const boreEnd = threadStart + p.engage + 2;
  const socketTop = boreEnd + 3.6;
  const neckH = 12;
  const barBottomZ = socketTop + neckH;
  const barCenterZ = barBottomZ + barH / 2;
  const totalH = barCenterZ + barH / 2;

  const hook = { R, cux, cuy, theta, ext, half, a0: theta - ext, a1: Math.PI * 2 - theta + ext };

  const snapHeadR = Math.min(3.15, p.stroke * 0.3);
  const snapShaftR = snapHeadR * 0.7;
  const snapHoleR = snapShaftR + 0.22;

  const topSnapZ = Math.min(barCenterZ + pocketH / 2 + 8, barCenterZ + barH / 2 - snapHeadR - 3);
  const botSnapZ = Math.max(barCenterZ - pocketH / 2 - 8, barCenterZ - barH / 2 + snapHeadR + 6);
  const midA = (hook.a0 + hook.a1) / 2;
  const sideA = hook.a0 <= Math.PI && Math.PI <= hook.a1 ? Math.PI : midA;
  const sideX = cux + R * Math.cos(sideA);
  const sideZ = barCenterZ + cuy + R * Math.sin(sideA);

  const snaps = [
    { x: 0, z: topSnapZ },
    { x: 0, z: botSnapZ },
    { x: sideX, z: sideZ },
    { x: -sideX, z: barCenterZ - (sideZ - barCenterZ) },
  ];

  const widthRaised = loopW - p.dollarW > 0.05;

  return {
    p,
    pitch,
    threadID,
    threadRoot,
    minorR,
    majorR,
    pocketW,
    pocketH,
    pocketD,
    pocketR,
    frontT,
    backFloor,
    yBack,
    yFront,
    totalT,
    yCenter,
    cardCenterY,
    barW,
    barH,
    barR,
    loopW,
    loopH,
    hook,
    socketR,
    threadStart,
    lead,
    boreEnd,
    socketTop,
    neckH,
    barBottomZ,
    barCenterZ,
    totalH,
    snapHeadR,
    snapShaftR,
    snapHoleR,
    snaps,
    widthRaised,
    socketOD: socketR * 2,
  };
}

export function warnings(raw) {
  const d = derive(raw);
  const p = d.p;
  const out = [];
  if (p.clearance < 0.3) out.push("Card clearance under 0.3 mm often fuses on a 0.4 mm nozzle. 0.4 mm per side is the intended fit.");
  if (p.engage < 22) out.push("Under 22 mm of thread is only a few turns — the staff can wobble off the broom.");
  if (d.widthRaised) out.push(`Dollar width raised to ${d.loopW.toFixed(0)} mm so the S still wraps the bar around the card.`);
  if (d.totalH > 230) out.push(`Assembled height is ${d.totalH.toFixed(0)} mm. A 256 mm printer may not have room with the socket on the bed.`);
  if (d.hook.R - d.hook.half < 8) out.push("The S stroke is thick for this width — the counters get small.");
  return out;
}
