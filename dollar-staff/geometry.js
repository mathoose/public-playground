/** Dollar-sign staff top. A solid $ screws onto a broom. A snap case holds the card and slides on with a dovetail. */

export const APP_VERSION = "3 · Nov 13, 2026";
export const APP_VERSION_TAG = "v3";
export const APP_NAME = "Dollar staff";

/** ISO/IEC 7810 ID-1. Long side is h, short side is w, thickness is t. */
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
  dollarW: 128,
  stroke: 14,
  barW: 22,
  clearance: 0.4,
  engage: 28,
});

export const SLIDERS = [
  { key: "dollarW", group: "dollar", label: "Dollar width", min: 110, max: 190, step: 1, unit: "mm" },
  { key: "stroke", group: "dollar", label: "S stroke", min: 12, max: 20, step: 0.5, unit: "mm" },
  { key: "barW", group: "dollar", label: "Center bar", min: 16, max: 32, step: 0.5, unit: "mm" },
  { key: "clearance", group: "card", label: "Card clearance (per side)", min: 0.2, max: 1.2, step: 0.05, unit: "mm" },
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
  if (part === "sign") return `dollar-staff-${APP_VERSION_TAG}-sign.stl`;
  if (part === "front") return `dollar-staff-${APP_VERSION_TAG}-case-front.stl`;
  if (part === "back") return `dollar-staff-${APP_VERSION_TAG}-case-back.stl`;
  return `dollar-staff-${APP_VERSION_TAG}-${part}.stl`;
}

/**
 * Layout in millimeters. Z up, socket mouth on z = 0, thickness along Y, width along X.
 * The dollar is one solid bar with two S loops. The card is turned so its long side
 * is horizontal, inside a two-piece snap case that slides down a dovetail on that bar.
 */
export function derive(raw) {
  const p = mergeParams(raw);
  const pitch = ACME_PITCH;
  const threadID = THREAD_ID;
  const threadRoot = THREAD_ROOT;
  const minorR = threadID / 2;
  const majorR = threadRoot / 2;

  // Landscape pocket: long side along X, short side along Z.
  const pocketW = CARD.h + 2 * p.clearance;
  const pocketH = CARD.w + 2 * p.clearance;
  const pocketD = CARD.t + p.clearance;
  const pocketR = CARD.corner + p.clearance;

  const wall = 5;
  const caseW = pocketW + 2 * wall;
  const caseH = pocketH + 2 * wall;
  const caseR = 3.4;
  const frontT = 2.6;
  const backFloor = 2.4;
  const yCaseBack = -(backFloor + pocketD);
  const yFront = frontT;
  const cardCenterY = -pocketD / 2;

  const barW = p.barW;
  const barR = Math.min(5.5, barW * 0.28);
  const poke = 11;
  const loopW = Math.max(p.dollarW, barW + p.stroke * 3.4);
  const loopH = Math.max(loopW * 1.05, caseH + 26);
  const barH = Math.max(loopH + 2 * poke, caseH + 40);

  const half = p.stroke / 2;
  const topCL = loopH / 2 - half;
  const R = topCL / 2;
  const cuy = R;
  const cux = -loopW / 2 + half + R;
  const barEdge = -barW / 2;
  const cosT = clamp((barEdge - cux) / R, -1, 1);
  const theta = Math.acos(cosT);
  const ext = Math.min(0.3, Math.max(0.05, theta - 0.45));
  const hook = { R, cux, cuy, theta, ext, half, a0: theta - ext, a1: Math.PI * 2 - theta + ext };

  const signT = 9.2;
  const gap = 0.2;
  const signFrontY = yCaseBack - gap;
  const signBackY = signFrontY - signT;
  const yCenter = (signFrontY + signBackY) / 2;

  const tailDepth = 3.5;
  const tip = Math.min(14, barW - 7.5);
  const neck = Math.max(4.2, tip - 4.4);
  const tailClear = 0.25;
  const tailLen = caseH + 22;
  const lead = 14;

  const socketR = 17;
  const threadStart = 1.8;
  const threadLead = 3.4;
  const boreEnd = threadStart + p.engage + 2;
  const socketTop = boreEnd + 3.6;
  const neckH = 12;
  const barBottomZ = socketTop + neckH;
  const barCenterZ = barBottomZ + barH / 2;
  const totalH = barCenterZ + barH / 2;

  const tailZ0 = barCenterZ - tailLen / 2 + 0.3;
  const slotZ0 = tailZ0 - 0.15;
  const slotLen = tailLen + lead;

  const snapHeadR = Math.min(2.2, wall * 0.4);
  const snapShaftR = snapHeadR * 0.72;
  const snapHoleR = snapShaftR + 0.2;
  const rim = wall * 0.5;
  const snaps = [
    { x: 0, z: barCenterZ + pocketH / 2 + rim },
    { x: 0, z: barCenterZ - pocketH / 2 - rim },
    { x: pocketW / 2 + rim, z: barCenterZ },
    { x: -pocketW / 2 - rim, z: barCenterZ },
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
    wall,
    caseW,
    caseH,
    caseR,
    frontT,
    backFloor,
    yCaseBack,
    yFront,
    yBack: signBackY,
    totalT: signT,
    signT,
    signFrontY,
    signBackY,
    yCenter,
    cardCenterY,
    barW,
    barH,
    barR,
    loopW,
    loopH,
    hook,
    tailDepth,
    tip,
    neck,
    tailClear,
    tailLen,
    lead,
    tailZ0,
    slotZ0,
    slotLen,
    socketR,
    threadStart,
    leadIn: threadLead,
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
  if (d.widthRaised) out.push(`Dollar width raised to ${d.loopW.toFixed(0)} mm so the S loops still wrap the bar.`);
  if (d.totalH > 250) out.push(`Assembled height is ${d.totalH.toFixed(0)} mm. A 256 mm printer may not have room with the socket on the bed.`);
  if (d.hook.R - d.hook.half < 8) out.push("The S stroke is thick for this width — the counters get small.");
  if (d.barW > 28) out.push("A wider center bar starts to look like the old card-width block. The card is in the case, so the bar can stay narrow.");
  return out;
}
