/**
 * Merry Christmas coaster: fixed deck + lettering mesh, four parametric corner arms.
 */

export const APP_VERSION = "3 · Oct 30, 2026";
export const APP_VERSION_TAG = "v2";
export const APP_NAME = "Coaster base";

/** Outer radius of the 112 mm square-ish rim (bbox 112 × 112). */
export const OUTER_R = 56;
export const DECK_T = 5;
/** Half angular width of each arm (full span ≈ 57.7°). */
export const ARM_HALF_DEG = 28.833284635549546;
export const ARM_CENTERS_DEG = [0, 90, 180, 270];
/** Rounded top outer corner on each arm. */
export const TOP_FILLET_R = 2.5;

export const DEFAULT_PARAMS = Object.freeze({
  armHeight: 26,
  armWidth: 10,
});

export const SLIDERS = [
  { key: "armHeight", min: 8, max: 45, step: 0.5, unit: "mm" },
  { key: "armWidth", min: 4, max: 18, step: 0.5, unit: "mm" },
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
  return p;
}

export function mergeParams(overrides = {}) {
  return clampParams({ ...DEFAULT_PARAMS, ...overrides });
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const innerR = OUTER_R - p.armWidth;
  return {
    p,
    outerR: OUTER_R,
    innerR,
    deckT: DECK_T,
    armHalfRad: (ARM_HALF_DEG * Math.PI) / 180,
    topFilletR: TOP_FILLET_R,
    totalZ: DECK_T + p.armHeight,
    outerSize: OUTER_R * 2,
    gapDeg: 360 / ARM_CENTERS_DEG.length - 2 * ARM_HALF_DEG,
  };
}

export function formatMm(n, digits = 1) {
  return `${Number(n).toFixed(digits)} mm`;
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  if (d.innerR < 38) {
    notes.push("Very thick arms crowd the lettering. Width above ~14 mm may clip the rim text.");
  }
  if (d.p.armHeight > 38) {
    notes.push("Tall arms stick up far above the Merry Christmas line — check your mug height.");
  }
  if (d.p.armHeight < 12) {
    notes.push("Short arms may not catch drips as well around the rim.");
  }
  return notes;
}
