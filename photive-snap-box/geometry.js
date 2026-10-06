/** Photive 6-port snap box — outside-cap lid + per-port USB spacer comb (v3). */

export const APP_VERSION = "3 · Oct 5, 2026";
export const APP_VERSION_TAG = "v3";
export const APP_NAME = "Photive snap box";

export const NEST_CLEAR_XY = 0.4;
export const MIN_BRICK_L = 80;
export const MAX_PORTS = 6;
export const PLUG_KEYS = ["plug1", "plug2", "plug3", "plug4", "plug5", "plug6"];

export const DEFAULT_PARAMS = Object.freeze({
  lipClear: 0.28,
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
  edgeFillet: 1.0,
  usbCount: 6,
  lidThickness: 2.6,
  lipDepth: 5.0,
  lipThick: 1.6,
  beadR: 0.55,
  usbZCenter: 13.0,
  c8ZCenter: 13.0,
  beadLen: 10,
  beadDrop: 3.0,
  pocketExtra: 0.25,
  keeperW: 5.4,
  keeperH: 8.0,
  outerCornerAdd: 0,
  lidNickR: 5,
  lidNickDepth: 2.2,
  spacerFit: 0.25,
  spacerSpine: 1.6,
  stopH: 4,
  plug1: 11,
  plug2: 11,
  plug3: 11,
  plug4: 11,
  plug5: 11,
  plug6: 11,
});

export const SLIDERS = [
  { key: "lipClear", min: 0.15, max: 0.6, step: 0.01, unit: "mm" },
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
  { key: "edgeFillet", min: 0, max: 2, step: 0.1, unit: "mm" },
  { key: "usbCount", min: 1, max: 6, step: 1, unit: "" },
  { key: "lidThickness", min: 1.6, max: 4, step: 0.1, unit: "mm" },
  { key: "lipDepth", min: 3, max: 10, step: 0.1, unit: "mm" },
  { key: "lipThick", min: 1.2, max: 2.4, step: 0.1, unit: "mm" },
  { key: "beadR", min: 0.3, max: 1.0, step: 0.05, unit: "mm" },
  { key: "spacerFit", min: 0.1, max: 0.6, step: 0.05, unit: "mm" },
  { key: "stopH", min: 0, max: 8, step: 0.5, unit: "mm" },
  ...PLUG_KEYS.map((key) => ({ key, min: 0, max: 35, step: 0.5, unit: "mm" })),
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
  p.usbCount = Math.round(clamp(p.usbCount, 1, MAX_PORTS));

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
  const usbZc = clamp(p.usbZCenter, p.usbHoleH / 2 + 0.6, cavityZ - p.usbHoleH / 2 - 0.4);
  const zUsb = floor + usbZc;
  const zC8 = floor + clamp(p.c8ZCenter, p.c8HoleD / 2 + 0.6, cavityZ - p.c8HoleD / 2 - 0.4);
  const span = (p.usbCount - 1) * p.usbPitch;
  const yUsb0 = wall + (innerW - span) / 2;
  const keeperW = Math.min(p.keeperW, Math.max(2.4, p.c8HoleD - 2.4));

  // Lid is an outside cap: the skirt wraps the base walls and never enters the cavity.
  const lidOff = p.lipClear + p.lipThick;
  const skirtInL = outerL + 2 * p.lipClear;
  const skirtInW = outerW + 2 * p.lipClear;
  const lidL = outerL + 2 * lidOff;
  const lidW = outerW + 2 * lidOff;
  const skirtInR = outerR + p.lipClear;
  const lidR = outerR + lidOff;
  const beadDrop = Math.min(p.beadDrop, p.lipDepth - p.beadR - 0.4);
  const beadBite = p.beadR - p.lipClear;
  const grooveDepth = Math.max(0.2, beadBite + p.pocketExtra);

  // Spacer comb, local coords: x from the front wall's inner face, y from the side wall, z from the floor.
  const spacerH = Math.max(4, cavityZ - 0.5);
  const slotR = p.usbHoleW / 2;
  const stopH = p.stopH > 0 ? Math.min(p.stopH, usbZc - slotR - 1) : 0;
  const stopDepth = p.usbExtra - p.spacerFit;
  const toothW = Math.max(2, p.usbPitch - 0.6);
  const teeth = [];
  for (let i = 0; i < p.usbCount; i++) {
    const plug = p[PLUG_KEYS[i]];
    const want = plug > 0 ? p.usbExtra - plug - p.spacerFit : p.spacerSpine;
    const depth = clamp(want, p.spacerSpine, stopDepth);
    teeth.push({
      i,
      plug,
      depth,
      gap: plug > 0 ? Math.max(0, p.usbExtra - plug) : null,
      tooLong: plug > 0 && want < p.spacerSpine - 1e-6,
      y: (innerW - span) / 2 + i * p.usbPitch,
    });
  }

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
    usbZc,
    zUsb,
    zC8,
    yUsb0,
    span,
    keeperW,
    lidOff,
    skirtInL,
    skirtInW,
    skirtInR,
    lidL,
    lidW,
    lidR,
    beadDrop,
    beadBite,
    grooveDepth,
    lidZ: p.lidThickness + p.lipDepth,
    spacerH,
    slotR,
    stopH,
    stopDepth,
    toothW,
    teeth,
  };
}

export function usbY(d, i) {
  return d.yUsb0 + i * d.p.usbPitch;
}

export function warnings(raw = {}) {
  const d = derive(raw);
  const notes = [];
  if (d.p.lipClear < 0.2) notes.push("Lid is tight — PETG helps; sand the nubs if it won’t close.");
  if (d.p.lipClear > 0.45) notes.push("Lid is loose — raise snap bead radius or it may pop off.");
  if (d.beadBite < 0.12) notes.push("Snap nubs barely grip — bead radius should be ≥ clearance + 0.15 mm.");
  if (d.p.c8HoleD > 12) notes.push("Rear hole may let the figure-8 plug pull through.");
  if (d.p.usbHoleW > 8) notes.push("USB holes are getting plug-sized; cables may not stay inside.");
  if (d.brickL < 90) notes.push("Inner length leaves a short nest for a 100 mm brick.");
  if (d.brickW < 68) notes.push("Inner width is tighter than the 70 mm Photive brick.");
  if (d.p.usbCount > 1 && d.span + d.p.usbHoleW > d.innerW - 2) {
    notes.push("USB holes are crowded — lower pitch or count.");
  }
  const skirtBottom = d.baseZ - d.p.lipDepth;
  if (d.zUsb + d.p.usbHoleH / 2 > skirtBottom - 0.5) {
    notes.push("Lid skirt reaches the USB holes — lower lid snap overlap.");
  }
  if (d.zC8 + d.p.c8HoleD / 2 > skirtBottom - 0.5) {
    notes.push("Lid skirt reaches the rear cord hole — lower lid snap overlap.");
  }
  const long = d.teeth.filter((t) => t.tooLong).map((t) => t.i + 1);
  if (long.length) {
    notes.push(
      `Port ${long.join(", ")} plug is too long to fit with the spacer — it pushes the brick off the stop; raise USB plug extra.`
    );
  }
  return notes;
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const d = Number.isInteger(v) ? 0 : digits;
  return `${v.toFixed(d)} mm`;
}
