/** Dollar-sign staff top. A solid $ screws onto a broom. A snap case holds the card and slides on with a dovetail. */

export const APP_VERSION = "15 · Nov 16, 2026";
export const APP_VERSION_TAG = "v15";
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
  if (part === "socket") return `dollar-staff-${APP_VERSION_TAG}-socket-test.stl`;
  if (part === "hook") return `dollar-staff-${APP_VERSION_TAG}-lower-hook.stl`;
  return `dollar-staff-${APP_VERSION_TAG}-${part}.stl`;
}

/**
 * Layout in millimeters. Z up, socket mouth on z = 0. This replaces a screw-off broom
 * head: the 3/4"-5 socket is at the bottom, and the dollar sign and card sit up on a
 * neck, clear of the handle. The sign is one S with a single vertical stroke through
 * it. That stroke ends at the top of the S, even with the top of the card. The snap
 * case is only as thick as the stroke. The stroke is deepened perpendicular to the
 * S so it reaches the same depth as the case and the card box blends into the sign.
 * The card plane is YZ and the stroke passes through the middle of the card.
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

  const wall = 4.0;
  const topLip = 2.4;
  const bottomWall = wall;
  // The case is only as thick as the vertical stroke. Depth (Y) still holds the card.
  const barW = Math.max(p.barW, 20);
  const barRaised = barW - p.barW > 0.05;
  const caseX = barW;
  const caseY = pocketY + 2 * wall;
  const caseZ = pocketZ + topLip + bottomWall;
  const caseR = 3.2;
  const frontT = caseX / 2;
  const backFloor = caseX / 2;
  const xCaseBack = -caseX / 2;
  const cardCenterX = 0;

  const neck = Math.min(barW * 0.42, barW - 8);
  const flare = 3.2;
  const barR = Math.min(3.2, barW * 0.16);
  const loopW = Math.max(p.dollarW, barW + p.stroke * 2.8);
  const loopH = Math.max(loopW * 1.32, CARD.h + p.stroke);
  const half = p.stroke / 2;
  const hook = { R: (loopH - p.stroke) / 4, half };

  // Plate thickness along the card (its long axis runs in Z; the S depth is Y).
  // Four times the old 9.2 mm plate, so the S is closer to the case depth.
  const signT = 9.2 * 4;
  const signFrontY = signT / 2;
  const signBackY = -signT / 2;
  const yCenter = 0;
  const caseBackY = -caseY / 2;
  const cardCenterY = 0;

  // Tongue under the case. Narrower than the stroke so the lower bar can close around it.
  const tip = Math.min(neck + flare, barW - 5);
  const tailClear = 0.22;
  // Bite most of the sign thickness, and leave a printable wall on each face.
  const yCore = Math.min(14, signT / 2 - 3.6);

  const socketR = 17;
  const threadStart = 1.8;
  const threadLead = 3.4;
  const boreEnd = threadStart + p.engage + 2;
  const socketTop = boreEnd + 3.6;
  const neckH = 46;
  const barBottomZ = socketTop + neckH;
  const barH = loopH;
  const strokeTop = barBottomZ + barH;
  const barCenterZ = barBottomZ + barH / 2;
  const totalH = strokeTop;
  const cardTop = strokeTop;
  const cardCenterZ = cardTop - CARD.h / 2;
  const caseTop = cardTop + p.clearance + topLip;
  const caseCenterZ = caseTop - caseZ / 2;

  const caseBottom = caseCenterZ - caseZ / 2;
  // Tongue runs well down into the stroke so the case cannot rock off the staff.
  const tailDrop = 36;
  const tailZ0 = caseBottom - tailDrop;
  const tailLen = tailDrop + 2.4;
  const slotZ0 = tailZ0 - 0.35;
  const slotTop = caseBottom + 0.4;
  const slotLen = slotTop - slotZ0;

  const snapHeadR = Math.min(1.7, wall * 0.34);
  const snapShaftR = snapHeadR * 0.72;
  const snapHoleR = snapShaftR + 0.18;
  const snapY = pocketY / 2 + Math.min(2.05, wall * 0.48);
  const snapZ = pocketZ * 0.3;
  const snaps = [
    { y: cardCenterY - snapY, z: cardCenterZ + snapZ },
    { y: cardCenterY + snapY, z: cardCenterZ + snapZ },
    { y: cardCenterY - snapY, z: cardCenterZ - snapZ },
    { y: cardCenterY + snapY, z: cardCenterZ - snapZ },
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
    cardCenterZ,
    cardTop,
    caseCenterZ,
    caseBottom,
    strokeTop,
    topLip,
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
    tip,
    neck,
    tailClear,
    yCore,
    tailLen,
    lead: strokeTop - (tailZ0 + tailLen),
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
    barRaised,
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
  if (d.barRaised) out.push(`Center bar raised to ${d.barW.toFixed(0)} mm so the dovetail through the card still has a wall.`);
  if (d.barW > 28) out.push("A wider center bar starts to look like the old card-width block. The card is in the case, so the bar can stay narrow.");
  return out;
}
