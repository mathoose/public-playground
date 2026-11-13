/** Dollar-sign staff top. Card sits in the bar; two shells snap around it; the back screws onto a broom. */

export const APP_VERSION = "2 · Nov 13, 2026";
export const APP_VERSION_TAG = "v2";
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
  dollarW: 156,
  stroke: 13,
  clearance: 0.4,
  lineGap: 10,
  engage: 28,
});

export const SLIDERS = [
  { key: "dollarW", group: "dollar", label: "Dollar width", min: 120, max: 210, step: 1, unit: "mm" },
  { key: "stroke", group: "dollar", label: "S stroke", min: 11, max: 20, step: 0.5, unit: "mm" },
  { key: "clearance", group: "card", label: "Card clearance (per side)", min: 0.2, max: 1.2, step: 0.05, unit: "mm" },
  { key: "lineGap", group: "dollar", label: "Gap between the lines", min: 6, max: 16, step: 0.5, unit: "mm" },
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

/** Point on the S centerline. t = 0 is the top terminal, t = 1 the bottom. */
export function sPoint(ax, ay, t) {
  return [ax * Math.cos(3 * Math.PI * t), ay * (1 - 2 * t)];
}

/**
 * Layout in millimeters. Z up, socket mouth on z = 0, thickness along Y, width along X.
 * The visible head is an S plus two narrow vertical strokes with a gap between them.
 * The card sits in a pocket behind that face.
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

  const lineW = clamp(p.stroke * 0.52, 6.2, 9);
  const lineGap = p.lineGap;
  const lineSpan = 2 * lineW + lineGap;
  const loopW = Math.max(p.dollarW, lineSpan + p.stroke * 5.2, CARD.w + p.stroke * 4);
  const loopH = Math.max(loopW * 1.12, CARD.h + p.stroke * 2.6);
  const poke = Math.max(9, p.stroke * 0.7);
  const lineH = loopH + 2 * poke;
  const half = p.stroke / 2;
  const ax = (loopW - p.stroke) / 2;
  const ay = (loopH - p.stroke) / 2;
  const lineX = lineGap / 2 + lineW / 2;

  const socketR = 17;
  const threadStart = 1.8;
  const lead = 3.4;
  const boreEnd = threadStart + p.engage + 2;
  const socketTop = boreEnd + 3.6;
  const neckH = 12;
  const barBottomZ = socketTop + neckH;
  const barCenterZ = barBottomZ + lineH / 2;
  const totalH = barCenterZ + lineH / 2;
  const barH = lineH;

  const snapHeadR = Math.min(2.7, lineW * 0.36, p.stroke * 0.28);
  const snapShaftR = snapHeadR * 0.7;
  const snapHoleR = snapShaftR + 0.2;

  const topSnapZ = Math.min(barCenterZ + pocketH / 2 + 7, barCenterZ + lineH / 2 - lineW * 0.7);
  const botSnapZ = Math.max(barCenterZ - pocketH / 2 - 7, barCenterZ - lineH / 2 + lineW * 0.7);
  const [leftX, leftY] = sPoint(ax, ay, 1 / 3);
  const [rightX, rightY] = sPoint(ax, ay, 2 / 3);

  const snaps = [
    { x: -lineX, z: topSnapZ },
    { x: lineX, z: botSnapZ },
    { x: leftX, z: barCenterZ + leftY },
    { x: rightX, z: barCenterZ + rightY },
  ];

  const widthRaised = loopW - p.dollarW > 0.05;
  const lip = 2.6;
  const rim = 2.2;

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
    barW: lineSpan,
    barH,
    lineW,
    lineGap,
    lineSpan,
    lineX,
    lineH,
    loopW,
    loopH,
    ax,
    ay,
    half,
    lip,
    rim,
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
  if (d.widthRaised) out.push(`Dollar width raised to ${d.loopW.toFixed(0)} mm so the S stays larger than the two lines and the card.`);
  if (d.totalH > 240) out.push(`Assembled height is ${d.totalH.toFixed(0)} mm. A 256 mm printer may not have room with the socket on the bed.`);
  if (d.lineGap < d.lineW * 0.7) out.push("The gap between the two lines is narrow — they can fuse into one bar.");
  return out;
}
