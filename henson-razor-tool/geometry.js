/**
 * Henson AL13 / Ti22 blade-change cradle + optional handle grip.
 * Head defaults come from the published handle specs and from slicing existing
 * Henson-fit prints on Printables (guard #523295, unscrew tool #1561273).
 */

export const APP_VERSION = "1 · Oct 5, 2026";
export const APP_VERSION_TAG = "v1";
export const APP_NAME = "Henson razor tool";

export const HANDLE_LENGTH = 96;
export const BLADE_WIDTH = 22;
export const BLADE_LENGTH = 43;

export const DEFAULT_PARAMS = Object.freeze({
  clearance: 0.3,
  headLength: 43.0,
  headWidth: 23.5,
  capTopWidth: 17.5,
  capDepth: 4.0,
  headCornerR: 3.0,
  bladeRelief: 1.5,
  upperDepth: 5.5,
  puckD: 62,
  floor: 2.4,
  pushHoleD: 12,
  gripRibs: 20,
  ribDepth: 1.2,
  edgeRound: 1.5,
  notchW: 14,
  handleTailD: 12.25,
  handleHeadD: 9.75,
  gripLen: 40,
  gripOD: 24,
  gripClear: 0.1,
  gripFlutes: 10,
});

export const SLIDERS = [
  { key: "clearance", min: 0.05, max: 0.8, step: 0.05, unit: "mm" },
  { key: "headLength", min: 38, max: 50, step: 0.1, unit: "mm" },
  { key: "headWidth", min: 20, max: 28, step: 0.1, unit: "mm" },
  { key: "capTopWidth", min: 12, max: 26, step: 0.1, unit: "mm" },
  { key: "capDepth", min: 2, max: 7, step: 0.1, unit: "mm" },
  { key: "headCornerR", min: 0.5, max: 6, step: 0.1, unit: "mm" },
  { key: "bladeRelief", min: 0.5, max: 3, step: 0.1, unit: "mm" },
  { key: "upperDepth", min: 2, max: 10, step: 0.1, unit: "mm" },
  { key: "puckD", min: 52, max: 90, step: 1, unit: "mm" },
  { key: "floor", min: 1.6, max: 5, step: 0.1, unit: "mm" },
  { key: "pushHoleD", min: 0, max: 18, step: 0.5, unit: "mm" },
  { key: "gripRibs", min: 0, max: 36, step: 1, unit: "" },
  { key: "ribDepth", min: 0, max: 2.5, step: 0.1, unit: "mm" },
  { key: "edgeRound", min: 0, max: 3, step: 0.1, unit: "mm" },
  { key: "notchW", min: 0, max: 20, step: 0.5, unit: "mm" },
  { key: "handleTailD", min: 10, max: 15, step: 0.05, unit: "mm" },
  { key: "handleHeadD", min: 8, max: 13, step: 0.05, unit: "mm" },
  { key: "gripLen", min: 20, max: 70, step: 1, unit: "mm" },
  { key: "gripOD", min: 18, max: 34, step: 0.5, unit: "mm" },
  { key: "gripClear", min: 0, max: 0.8, step: 0.05, unit: "mm" },
  { key: "gripFlutes", min: 0, max: 16, step: 1, unit: "" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function clampParams(raw = {}) {
  const p = { ...DEFAULT_PARAMS, ...raw };
  for (const s of SLIDERS) {
    let v = Number(p[s.key]);
    if (!Number.isFinite(v)) v = DEFAULT_PARAMS[s.key];
    v = clamp(v, s.min, s.max);
    const decimals = s.step >= 1 ? 0 : (String(s.step).split(".")[1] || "").length;
    p[s.key] = Number(v.toFixed(decimals));
  }
  p.capTopWidth = Math.min(p.capTopWidth, p.headWidth);
  p.handleHeadD = Math.min(p.handleHeadD, p.handleTailD);
  return p;
}

export function mergeParams(overrides = {}) {
  return clampParams({ ...DEFAULT_PARAMS, ...overrides });
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const c = p.clearance;
  const pocketL = p.headLength + 2 * c;
  const pocketWTop = p.headWidth + 2 * c;
  const pocketWBottom = p.capTopWidth + 2 * c;
  const pocketR = Math.min(p.headCornerR + c, pocketWBottom / 2 - 0.1);
  const upperL = pocketL + 2 * p.bladeRelief;
  const upperW = pocketWTop + 2 * p.bladeRelief;
  const upperR = Math.min(p.headCornerR + c + p.bladeRelief, upperW / 2 - 0.1);
  const height = p.floor + p.capDepth + p.upperDepth;
  const puckR = p.puckD / 2;
  const leadIn = Math.min(0.8, p.upperDepth / 3);
  const edgeRound = Math.min(p.edgeRound, height / 3);

  const cornerX = upperL / 2 - upperR;
  const cornerY = upperW / 2 - upperR;
  const pocketReach = Math.hypot(cornerX, cornerY) + upperR + leadIn;
  const minWall = puckR - p.ribDepth - pocketReach;

  const taper = (p.handleTailD - p.handleHeadD) / HANDLE_LENGTH;
  const gripBoreBottom = p.handleTailD + 2 * p.gripClear;
  const gripBoreTop = Math.max(4, p.handleTailD - taper * p.gripLen + 2 * p.gripClear);
  const gripWall = (p.gripOD - gripBoreBottom) / 2;

  return {
    p,
    pocketL,
    pocketWTop,
    pocketWBottom,
    pocketR,
    upperL,
    upperW,
    upperR,
    height,
    puckR,
    leadIn,
    edgeRound,
    minWall,
    notchFloor: p.floor + p.capDepth * 0.5,
    taper,
    gripBoreBottom,
    gripBoreTop,
    gripWall,
    gripOffsetX: puckR + 14 + p.gripOD / 2,
  };
}

export function warnings(raw = {}) {
  const d = derive(raw);
  const p = d.p;
  const notes = [];
  if (p.clearance < 0.15) notes.push("Pocket is very tight — the head may not drop in. Try 0.25–0.35 mm.");
  if (p.clearance > 0.5) notes.push("Pocket is loose — the head can rock; torque still works but feels sloppy.");
  if (p.headWidth - p.capTopWidth < 1) notes.push("Cap taper is almost flat — measure the cap top width with calipers.");
  if (d.minWall < 3) notes.push(`Thin wall around the pocket corners (${d.minWall.toFixed(1)} mm) — raise puck diameter.`);
  if (p.capDepth < 3) notes.push("Shallow cap grip — the cap may climb out when you twist hard.");
  if (p.gripClear > 0.3) notes.push("Grip bore is loose — the sleeve will wedge past the tail and overhang it.");
  if (d.gripWall < 2) notes.push("Handle grip wall is thin — raise grip outer diameter.");
  if (p.notchW > p.headWidth - 4) notes.push("Finger notches are nearly as wide as the head — the cap ends lose grip.");
  return notes;
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const d = Number.isInteger(v) ? 0 : digits;
  return `${v.toFixed(d)} mm`;
}
