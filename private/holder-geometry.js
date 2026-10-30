/**
 * Two-phone wall holder — personal-use remix of MakerWorld #3024216 by Jonesman
 * (Standard Digital File License: not for sharing). The source mesh is only ever
 * shipped encrypted; this file holds the measurements and the stretch.
 *
 * The pocket is deepened by splitting the mesh at Y = CUT_Y (a plane that only
 * passes through the floor and the two side walls, both straight along Y there)
 * and moving everything in front of it forward. The gap gets filled by the same
 * straight wall/floor stretched — wall thickness, slot, cable clip, screw holes
 * and the support-free profile are untouched. Width works the same at X = ±CUT_X.
 */
export const APP_NAME = "Private models";
export const APP_VERSION = "2 · Oct 19, 2026";
export const APP_VERSION_TAG = "v1";

export const HOLDER = Object.freeze({
  ORIG_DEPTH: 17.2, // inner front-to-back gap at the floor (Z = 0), measured on V2
  ORIG_WIDTH: 85.0, // inner side-to-side gap, measured
  CUT_Y: 1.0,
  CUT_X: 13.0,
  WALL: 2.0,
  OUTER: [89.0, 45.26, 97.29],
  LIP_EXTRA: 1.3, // gap at the front-lip top (Z ≈ 14) is ~1.3 mm more than at the floor
  BACK_Y: 8.5, // inner face of the leaning back wall at the floor
  FLOOR_Z: -2.5,
  LEAN_DEG: 6.0, // how far that wall leans back
  HOLE_SPACING: 50,
});

export const BASES = {
  screw: { label: "Screw (V2)", item: "holder-src-screw", defaultItem: "holder-default-screw" },
  glue: { label: "Glue / tape (V2 closed)", item: "holder-src-glue", defaultItem: "holder-default-glue" },
};

export const SLIDERS = [
  { key: "depth", min: 17.2, max: 45, step: 0.1, unit: "mm" },
  { key: "width", min: 85, max: 105, step: 0.5, unit: "mm" },
  { key: "phoneT", min: 7, max: 16, step: 0.1, unit: "mm" },
  { key: "phones", min: 1, max: 3, step: 1, unit: "" },
  { key: "phoneW", min: 60, max: 90, step: 0.5, unit: "mm" },
];

export const DEFAULT_PARAMS = Object.freeze({
  base: "screw",
  depth: 27.0,
  width: 85.0,
  phoneT: 12.0,
  phones: 2,
  phoneW: 81.5,
});

export const PRESETS = {
  two: { label: "2 iPhones in cases", depth: 27.0, width: 85.0, phoneT: 12.0, phones: 2, phoneW: 81.5 },
  thick: { label: "2 thick cases", depth: 31.0, width: 87.0, phoneT: 14.0, phones: 2, phoneW: 83.0 },
  original: { label: "Original (1 phone)", depth: 17.2, width: 85.0, phoneT: 12.0, phones: 1, phoneW: 81.5 },
};

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));

export function mergeParams(p = {}) {
  const out = { ...DEFAULT_PARAMS, ...p };
  for (const s of SLIDERS) out[s.key] = clamp(Number(out[s.key]), s.min, s.max);
  out.phones = Math.round(out.phones);
  if (!BASES[out.base]) out.base = DEFAULT_PARAMS.base;
  return out;
}

export function applyPreset(name, current = DEFAULT_PARAMS) {
  const { label, ...rest } = PRESETS[name] || {};
  return mergeParams({ ...current, ...rest });
}

/** Depth that fits `phones` phones of thickness `phoneT` with ~3 mm slack. */
export function fitDepth(p) {
  return Math.round((p.phones * p.phoneT + 3) * 10) / 10;
}

/** Stretch positions (Float32Array xyz) from src into out. Pure vertex move. */
export function stretchPositions(src, out, p) {
  const dy = p.depth - HOLDER.ORIG_DEPTH;
  const dx = (p.width - HOLDER.ORIG_WIDTH) / 2;
  const { CUT_X, CUT_Y } = HOLDER;
  for (let i = 0; i < src.length; i += 3) {
    const x = src[i];
    const y = src[i + 1];
    out[i] = x < -CUT_X ? x - dx : x > CUT_X ? x + dx : x;
    out[i + 1] = y < CUT_Y ? y - dy : y;
    out[i + 2] = src[i + 2];
  }
  return out;
}

export function derive(p) {
  const dy = p.depth - HOLDER.ORIG_DEPTH;
  const dx = p.width - HOLDER.ORIG_WIDTH;
  return {
    p,
    dy,
    dx,
    outer: [HOLDER.OUTER[0] + dx, HOLDER.OUTER[1] + dy, HOLDER.OUTER[2]],
    lipGap: p.depth + HOLDER.LIP_EXTRA,
    stack: p.phones * p.phoneT,
    slack: p.depth - p.phones * p.phoneT,
    sideSlack: (p.width - p.phoneW) / 2,
  };
}

export function warnings(p) {
  const d = derive(p);
  const out = [];
  if (d.slack < 1.5) out.push(`Tight: ${p.phones} × ${p.phoneT.toFixed(1)} mm = ${d.stack.toFixed(1)} mm leaves only ${d.slack.toFixed(1)} mm. Add depth or tap “Fit depth to phones”.`);
  if (d.sideSlack < 0.75) out.push(`Phone width ${p.phoneW.toFixed(1)} mm barely fits the ${p.width.toFixed(1)} mm pocket. Add width.`);
  if (d.outer[0] > 256 || d.outer[1] > 256) out.push("Bigger than a 256 mm bed.");
  return out;
}

export function formatMm(n) {
  return `${Number(n).toFixed(1)} mm`;
}
