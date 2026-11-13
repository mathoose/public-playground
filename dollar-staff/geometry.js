/** Dollar-sign staff top. A solid $ screws onto a broom. A snap case holds the card and slides on with a dovetail. */

export const APP_VERSION = "4 · Nov 13, 2026";
export const APP_VERSION_TAG = "v4";
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
 * Layout in millimeters. Z up, socket mouth on z = 0, the S lies in the XZ plane.
 * The card is rotated around that vertical axis, so its plane is YZ: edge-on to the
 * S, long side still vertical, short side sticking out of the sign. Two shells snap
 * around it and the closed case slides down a dovetail on the bar.
 */
export function derive(raw) {
  const p = mergeParams(raw);
  const pitch = ACME_PITCH;
  const threadID = THREAD_ID;
  const threadRoot = THREAD_ROOT;
  const minorR = threadID / 2;
  const majorR = threadRoot / 2;

  // Pocket after a 90° yaw: thin along X, short side along Y, long side along Z.
  const pocketX = CARD.t + p.clearance;
  const pocketY = CARD.w + 2 * p.clearance;
  const pocketZ = CARD.h + 2 * p.clearance;
  const pocketR = Math.min(CARD.corner + p.clearance * 0.5, pocketY / 2 - 0.8);

  const wall = 5;
  const caseX = pocketX + 2 * wall;
  const caseY = pocketY + 2 * wall;
  const caseZ = pocketZ + 2 * wall;
  const caseR = 3.2;
  const frontT = wall;
  const backFloor = wall;
  const xCaseBack = -(backFloor + pocketX);
  const cardCenterX = -pocketX / 2;

  const barW = p.barW;
  const barR = Math.min(5.5, barW * 0.28);
  const poke = 11;
  const loopW = Math.max(p.dollarW, barW + p.stroke * 3.4);
  const loopH = Math.max(loopW * 1.05, caseZ * 0.72);
  const barH = Math.max(loopH + 2 * poke, caseZ + 36);

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
  const signFrontY = signT / 2;
  const signBackY = -signT / 2;
  const yCenter = 0;
  const gap = 0.25;
  const caseBackY = signFrontY + gap;
  const cardCenterY = caseBackY + wall + pocketY / 2;

  const tailDepth = 3.4;
  const tip = Math.min(8.4, caseX - 2.6, barW - 8);
  const neck = Math.max(3.8, tip - 3.2);
  const tailClear = 0.22;
  const tailLen = caseZ + 16;
  const lead = 12;

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

  const snapHeadR = Math.min(1.7, wall * 0.34);
  const snapShaftR = snapHeadR * 0.72;
  const snapHoleR = snapShaftR + 0.18;
  const rim = wall * 0.5;
  const snaps = [
    { y: cardCenterY - pocketY * 0.28, z: barCenterZ + pocketZ / 2 + rim },
    { y: cardCenterY + pocketY * 0.28, z: barCenterZ + pocketZ / 2 + rim },
    { y: cardCenterY - pocketY * 0.28, z: barCenterZ - pocketZ / 2 - rim },
    { y: cardCenterY + pocketY * 0.28, z: barCenterZ - pocketZ / 2 - rim },
  ];

  const widthRaised = loopW - p.dollarW > 0.05;

  return {
    p,
    pitch,
    threadID,
    threadRoot,
    minorR,
    majorR,
    pocketX,
    pocketY,
    pocketZ,
    pocketW: pocketY,
    pocketH: pocketZ,
    pocketD: pocketX,
    pocketR,
    wall,
    caseX,
    caseY,
    caseZ,
    caseW: caseY,
    caseH: caseZ,
    caseR,
    frontT,
    backFloor,
    xCaseBack,
    caseBackY,
    cardCenterX,
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
