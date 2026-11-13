/**
 * Closet belt holder. One solid, printed pins-down with the opening up.
 * On the upright, turn the pins into the holes so the opening faces you.
 *
 * Defaults follow System 32, a common closet-upright pitch: 5 mm pins
 * on 32 mm centers. Sliders override both.
 */

export const APP_VERSION = "1 · Nov 13, 2026";
export const APP_NAME = "Belt holder";

export const DEFAULT_PIN_DIAMETER = 5;
export const DEFAULT_HOLE_SPACING = 32;

export const DEFAULT_PARAMS = Object.freeze({
  mode: "clip",
  pinDiameter: DEFAULT_PIN_DIAMETER,
  holeSpacing: DEFAULT_HOLE_SPACING,
  pinLength: 10,
  width: 48,
  cradleDiameter: 80,
  binDepth: 42,
  wall: 2.4,
});

export const SLIDERS = [
  { key: "pinDiameter", min: 3, max: 8, step: 0.1, unit: "mm" },
  { key: "holeSpacing", min: 12, max: 100, step: 0.5, unit: "mm" },
  { key: "pinLength", min: 5, max: 30, step: 0.5, unit: "mm" },
  { key: "width", min: 24, max: 120, step: 1, unit: "mm" },
  { key: "cradleDiameter", min: 40, max: 140, step: 1, unit: "mm" },
  { key: "binDepth", min: 16, max: 120, step: 1, unit: "mm" },
  { key: "wall", min: 1.2, max: 6, step: 0.1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function snap(v, step) {
  const n = Math.round(v / step) * step;
  const decimals = (String(step).split(".")[1] || "").length;
  return Number(n.toFixed(decimals));
}

export function mergeParams(overrides = {}) {
  const raw = { ...DEFAULT_PARAMS, ...overrides };
  const p = { mode: raw.mode === "bin" ? "bin" : "clip" };
  for (const s of SLIDERS) {
    let v = Number(raw[s.key]);
    if (!Number.isFinite(v)) v = DEFAULT_PARAMS[s.key];
    p[s.key] = snap(clamp(v, s.min, s.max), s.step);
  }
  return p;
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const pinR = p.pinDiameter / 2;
  const pinXs = [-p.holeSpacing / 2, p.holeSpacing / 2];
  const innerR = p.cradleDiameter / 2;
  const outerR = innerR + p.wall;
  const zRim = p.pinLength + outerR;
  const zCut = zRim - outerR * Math.SQRT1_2;
  const pinReach = p.holeSpacing / 2 + pinR + 3.5;
  const plateHalfX = p.mode === "bin" ? Math.max(p.width / 2, pinReach) : Math.max(outerR * Math.SQRT1_2 + 0.8, pinReach);
  const binInner = p.width - 2 * p.wall;
  const maxZ = p.mode === "bin" ? p.pinLength + p.wall + p.binDepth : zRim;
  const sizeX = p.mode === "bin" ? plateHalfX * 2 : outerR * 2;
  return {
    p,
    mode: p.mode,
    pinR,
    pinXs,
    pinSpacing: p.holeSpacing,
    pinDiameter: p.pinDiameter,
    pinLength: p.pinLength,
    pinReach,
    width: p.width,
    wall: p.wall,
    binDepth: p.binDepth,
    innerR,
    outerR,
    zRim,
    zCut,
    plateHalfX,
    binInner,
    maxZ,
    sizeX,
    sizeY: p.width,
    sideWall: p.mode === "bin",
  };
}

/** Point inside the square bin's side wall (and inside the clip's open end). */
export function sideWallPoint(d) {
  return {
    x: 0,
    y: d.width / 2 - d.wall / 2,
    z: d.pinLength + d.wall + 8,
  };
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const text = digits === 0 || Math.abs(v - Math.round(v)) < 1e-6 ? String(Math.round(v)) : v.toFixed(digits);
  return `${text} mm`;
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  if (d.p.holeSpacing - d.p.pinDiameter < 6) {
    notes.push("Pins are close. Each one still needs its own hole in the upright.");
  }
  if (d.mode === "clip" && d.p.cradleDiameter < 60) {
    notes.push("A rolled belt is often about 70–90 mm across. Open the cradle if the roll will not sit in.");
  }
  if (d.mode === "bin" && d.binInner < 18) {
    notes.push("The bin opening is narrow. Widen it or use a thinner wall.");
  }
  return notes;
}
