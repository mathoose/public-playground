/**
 * The baroque frame is one sculpture. Width and height move the outer size.
 * The moulding stays the same width: corners and the center ornaments stay
 * put, and only the plain stretches between them change length.
 * Thickness scales that moulding and the depth together.
 *
 * Mesh axes, before we lay it on the bed: X width, Z height, Y depth.
 */

export const APP_VERSION = "1 · Oct 27, 2026";
export const APP_VERSION_TAG = "v1";
export const APP_NAME = "Baroque frame";

export const FRAME = Object.freeze({
  halfX: 39.0870705,
  halfZ: 50,
  pinX: 22.86,
  pinZ: 33.6,
  crestX: 12,
  crestZ: 10,
  yMin: -3.0112505,
  yMax: 3.0112505,
});

export const BORDER_X = FRAME.halfX - FRAME.pinX;
export const BORDER_Z = FRAME.halfZ - FRAME.pinZ;
export const DEPTH = FRAME.yMax - FRAME.yMin;

const MIN_HALF_X = FRAME.crestX + BORDER_X;
const MIN_HALF_Z = FRAME.crestZ + BORDER_Z;

export const DEFAULT_PARAMS = Object.freeze({
  width: FRAME.halfX * 2,
  height: FRAME.halfZ * 2,
  thickness: 100,
});

export const SLIDERS = [
  { key: "width", min: 56, max: 400, step: 0.5, unit: "mm" },
  { key: "height", min: 54, max: 500, step: 0.5, unit: "mm" },
  { key: "thickness", min: 60, max: 160, step: 1, unit: "%" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function alignMin(specMin, step, needed) {
  if (needed <= specMin + 1e-6) return specMin;
  const n = Math.ceil((needed - specMin) / step - 1e-6);
  return specMin + n * step;
}

export function clampParams(raw) {
  const spec = Object.fromEntries(SLIDERS.map((s) => [s.key, s]));
  const num = (key, fallback) => {
    const s = spec[key];
    const v = Number(raw?.[key]);
    return clamp(Number.isFinite(v) ? v : fallback, s.min, s.max);
  };
  const thickness = num("thickness", DEFAULT_PARAMS.thickness);
  const scale = thickness / 100;
  const minW = alignMin(spec.width.min, spec.width.step, 2 * MIN_HALF_X * scale);
  const minH = alignMin(spec.height.min, spec.height.step, 2 * MIN_HALF_Z * scale);
  const askedW = num("width", DEFAULT_PARAMS.width);
  const askedH = num("height", DEFAULT_PARAMS.height);
  const width = clamp(askedW, minW, spec.width.max);
  const height = clamp(askedH, minH, spec.height.max);
  return {
    width,
    height,
    thickness,
    _bumped: width > askedW + 0.001 || height > askedH + 0.001,
    _minW: minW,
    _minH: minH,
  };
}

export function mergeParams(raw) {
  const p = clampParams({ ...DEFAULT_PARAMS, ...raw });
  return { width: p.width, height: p.height, thickness: p.thickness };
}

export function applySliderChange(prev, key, value) {
  return mergeParams({ ...prev, [key]: value });
}

export function derive(raw) {
  const p = clampParams(raw);
  const scale = p.thickness / 100;
  const borderX = BORDER_X * scale;
  const borderZ = BORDER_Z * scale;
  const openingW = p.width - 2 * borderX;
  const openingH = p.height - 2 * borderZ;
  return {
    p: { width: p.width, height: p.height, thickness: p.thickness },
    scale,
    borderX,
    borderZ,
    openingW,
    openingH,
    depth: DEPTH * scale,
    minWidth: p._minW,
    minHeight: p._minH,
    bumped: Boolean(p._bumped),
    halfX: FRAME.halfX,
    halfZ: FRAME.halfZ,
    pinX: FRAME.pinX,
    pinZ: FRAME.pinZ,
    crestX: FRAME.crestX,
    crestZ: FRAME.crestZ,
  };
}

function map1d(p, half, pin, crest, newHalf, scale) {
  const sign = p < 0 ? -1 : 1;
  const a = Math.abs(p);
  let m;
  if (a <= crest) m = a * scale;
  else if (a >= pin) m = newHalf - (half - a) * scale;
  else {
    const a0 = crest * scale;
    const a1 = newHalf - (half - pin) * scale;
    const t = (a - crest) / (pin - crest);
    m = a0 + (a1 - a0) * t;
  }
  return sign * m;
}

/** Original mesh vertex -> [x, height, depth] with the back on z = 0. */
export function mapVertex(x, y, z, raw) {
  const d = derive(raw);
  return [
    map1d(x, d.halfX, d.pinX, d.crestX, d.p.width / 2, d.scale),
    map1d(z, d.halfZ, d.pinZ, d.crestZ, d.p.height / 2, d.scale),
    (y - FRAME.yMin) * d.scale,
  ];
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  const widthPinned = Math.abs(d.p.width - d.minWidth) < 0.05;
  const heightPinned = Math.abs(d.p.height - d.minHeight) < 0.05;
  if (d.scale > 1.001 && (widthPinned || heightPinned)) {
    notes.push("That thickness needs more room, so the outer size opened up enough for the moulding.");
  }
  if (d.openingW < 20 || d.openingH < 20) {
    notes.push("The opening is getting tight. Raise width or height if a picture still has to fit.");
  }
  return notes;
}
