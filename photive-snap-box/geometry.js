/** Photive 6-port snap box — param defaults match photive-snap-box.scad (v1). */

export const APP_VERSION = "2 · Oct 5, 2026";
export const APP_VERSION_TAG = "v2";
export const APP_NAME = "Photive snap box";

export const NEST_CLEAR_XY = 0.4;
export const MIN_BRICK_L = 80;

export const DEFAULT_PARAMS = Object.freeze({
  lipClear: 0.32,
  c8HoleD: 8.5,
  usbHoleW: 5.0,
  usbHoleH: 7.6,
  usbPitch: 10.0,
  innerWidth: 70.8,
  innerLength: 137.8,
  usbExtra: 15,
  innerHeight: 26.6,
  acExtra: 22,
  wall: 2.4,
  floor: 2.2,
  cornerRadius: 4,
  edgeFillet: 1.5,
  usbCount: 6,
  lidThickness: 2.6,
  lipDepth: 5.0,
  lipThick: 1.7,
  beadR: 0.55,
  usbZCenter: 13.0,
  c8ZCenter: 13.0,
  beadLen: 10,
  beadDrop: 3.8,
  pocketExtra: 0.25,
  keeperW: 5.4,
  keeperH: 8.0,
  outerCornerAdd: 0,
  lidNickD: 4.2,
});

export const SLIDERS = [
  { key: "lipClear", min: 0.1, max: 0.8, step: 0.02, unit: "mm" },
  { key: "c8HoleD", min: 5, max: 14, step: 0.1, unit: "mm" },
  { key: "usbHoleW", min: 3, max: 10, step: 0.1, unit: "mm" },
  { key: "usbHoleH", min: 4, max: 14, step: 0.1, unit: "mm" },
  { key: "usbPitch", min: 7, max: 16, step: 0.1, unit: "mm" },
  { key: "innerWidth", min: 50, max: 110, step: 0.2, unit: "mm" },
  { key: "innerLength", min: 110, max: 220, step: 0.2, unit: "mm" },
  { key: "usbExtra", min: 8, max: 35, step: 0.5, unit: "mm" },
  { key: "innerHeight", min: 20, max: 50, step: 0.2, unit: "mm" },
  { key: "acExtra", min: 10, max: 45, step: 0.5, unit: "mm" },
  { key: "wall", min: 1.6, max: 4, step: 0.1, unit: "mm" },
  { key: "floor", min: 1.2, max: 4, step: 0.1, unit: "mm" },
  { key: "cornerRadius", min: 0, max: 12, step: 0.1, unit: "mm" },
  { key: "edgeFillet", min: 0, max: 3, step: 0.1, unit: "mm" },
  { key: "usbCount", min: 1, max: 6, step: 1, unit: "" },
  { key: "lidThickness", min: 1.6, max: 4, step: 0.1, unit: "mm" },
  { key: "lipDepth", min: 3, max: 10, step: 0.1, unit: "mm" },
  { key: "lipThick", min: 1.2, max: 2.4, step: 0.1, unit: "mm" },
  { key: "beadR", min: 0.3, max: 1.0, step: 0.05, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function mergeParams(overrides = {}) {
  return clampParams({ ...DEFAULT_PARAMS, ...overrides });
}

/**
 * Keep extras + inner length consistent.
 * usbExtra/acExtra grow the cavity; dragging inner length dumps the delta into acExtra.
 */
export function applySliderChange(prev, key, value) {
  const next = { ...prev, [key]: value };
  if (key === "usbExtra") {
    next.innerLength = prev.innerLength + (value - prev.usbExtra);
  } else if (key === "acExtra") {
    next.innerLength = prev.innerLength + (value - prev.acExtra);
  } else if (key === "innerLength") {
    const brick = prev.innerLength - prev.usbExtra - prev.acExtra;
    next.acExtra = value - prev.usbExtra - brick;
  }
  return clampParams(next);
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
  p.usbCount = Math.round(clamp(p.usbCount, 1, 6));

  const brick = p.innerLength - p.usbExtra - p.acExtra;
  if (brick < MIN_BRICK_L) {
    p.innerLength = Number((p.usbExtra + p.acExtra + MIN_BRICK_L).toFixed(2));
  }

  const maxSpan = Math.max(0, p.innerWidth - p.usbHoleW - 6);
  if (p.usbCount > 1 && (p.usbCount - 1) * p.usbPitch > maxSpan) {
    p.usbPitch = Number(Math.max(7, maxSpan / (p.usbCount - 1)).toFixed(1));
  }
  return p;
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const innerL = p.innerLength;
  const innerW = p.innerWidth;
  const cavityZ = p.innerHeight;
  const wall = p.wall;
  const floor = p.floor;
  const outerL = innerL + 2 * wall;
  const outerW = innerW + 2 * wall;
  const baseZ = floor + cavityZ;
  const innerR = Math.min(p.cornerRadius, innerW / 2 - 0.2, innerL / 2 - 0.2);
  const outerR = Math.max(innerR, innerR + wall + p.outerCornerAdd);
  const brickL = innerL - p.usbExtra - p.acExtra - 2 * NEST_CLEAR_XY;
  const brickW = innerW - 2 * NEST_CLEAR_XY;
  const usbXBrick = wall + NEST_CLEAR_XY + p.usbExtra;
  const yBrick0 = wall + NEST_CLEAR_XY;
  const zUsb = floor + clamp(p.usbZCenter, p.usbHoleH / 2 + 0.6, cavityZ - p.usbHoleH / 2 - 0.4);
  const zC8 = floor + clamp(p.c8ZCenter, p.c8HoleD / 2 + 0.6, cavityZ - p.c8HoleD / 2 - 0.4);
  const span = (p.usbCount - 1) * p.usbPitch;
  const yUsb0 = wall + (innerW - span) / 2;
  const keeperW = Math.min(p.keeperW, Math.max(2.4, p.c8HoleD - 2.4));
  const ox = innerL - 2 * p.lipClear;
  const oy = innerW - 2 * p.lipClear;
  return {
    p,
    innerL,
    innerW,
    cavityZ,
    wall,
    floor,
    outerL,
    outerW,
    baseZ,
    innerR: Math.max(0, innerR),
    outerR,
    brickL,
    brickW,
    usbXBrick,
    yBrick0,
    zUsb,
    zC8,
    yUsb0,
    span,
    keeperW,
    skirtOx: ox,
    skirtOy: oy,
    lidZ: p.lidThickness + p.lipDepth,
  };
}

export function usbY(d, i) {
  return d.yUsb0 + i * d.p.usbPitch;
}

export function warnings(raw = {}) {
  const d = derive(raw);
  const notes = [];
  if (d.p.lipClear < 0.2) notes.push("Snap is tight — PETG helps; sand nubs if it won’t close.");
  if (d.p.lipClear > 0.5) notes.push("Snap is loose — lid may pop off.");
  if (d.p.c8HoleD > 12) notes.push("Rear hole may let the figure-8 plug pull through.");
  if (d.p.usbHoleW > 8) notes.push("USB holes are getting plug-sized; cables may not stay inside.");
  if (d.brickL < 90) notes.push("Inner length leaves a short nest for a 100 mm brick.");
  if (d.brickW < 68) notes.push("Inner width is tighter than the 70 mm Photive brick.");
  if (d.p.usbCount > 1 && d.span + d.p.usbHoleW > d.innerW - 2) {
    notes.push("USB holes are crowded — lower pitch or count.");
  }
  return notes;
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const d = Number.isInteger(v) ? 0 : digits;
  return `${v.toFixed(d)} mm`;
}
