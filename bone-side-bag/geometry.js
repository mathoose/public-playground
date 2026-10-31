/**
 * Original skeleton side bag and phone cage.
 * Inspired by the idea of a ribcage purse on a bone-link strap — the shapes,
 * joints, and cage are drawn here, not taken from those files.
 *
 * Printer axes: Z up, bed at z = 0. The cup opens upward. The chain is a row
 * of separate snap links lying flat beside it.
 */

export const APP_VERSION = "2 · Oct 31, 2026";
export const APP_VERSION_TAG = "v2";
export const APP_NAME = "Bone side bag";

export const DEFAULT_PARAMS = Object.freeze({
  mode: "bag",
  bagWidth: 72,
  bagHeight: 90,
  bagDepth: 34,
  phoneWidth: 71.6,
  phoneHeight: 147.6,
  phoneDepth: 7.8,
  links: 12,
  linkLength: 44,
});

export const SLIDERS = [
  { key: "bagWidth", min: 50, max: 120, step: 1, unit: "mm", group: "bag" },
  { key: "bagHeight", min: 64, max: 140, step: 1, unit: "mm", group: "bag" },
  { key: "bagDepth", min: 24, max: 56, step: 1, unit: "mm", group: "bag" },
  { key: "phoneWidth", min: 58, max: 102, step: 0.1, unit: "mm", group: "phone" },
  { key: "phoneHeight", min: 120, max: 190, step: 0.1, unit: "mm", group: "phone" },
  { key: "phoneDepth", min: 6, max: 22, step: 0.1, unit: "mm", group: "phone" },
  { key: "links", min: 6, max: 36, step: 1, unit: "", group: "chain" },
  { key: "linkLength", min: 40, max: 56, step: 1, unit: "mm", group: "chain" },
];

const WALL = 2.4;
const FLOOR = 2.6;
const RIM = 3.6;
const PHONE_CLEAR_X = 1.2;
const PHONE_CLEAR_Y = 0.8;
const PHONE_CLEAR_Z = 1.6;
const BACK_T = 2.5;
const LIP = 3.2;
const LIP_T = 2.3;
const SIDE_WALL = 2.6;

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function snap(value, step) {
  const digits = step >= 1 ? 0 : (String(step).split(".")[1] || "").length;
  return Number(value.toFixed(digits));
}

export function clampParams(raw) {
  const mode = raw?.mode === "phone" ? "phone" : "bag";
  const spec = Object.fromEntries(SLIDERS.map((s) => [s.key, s]));
  const num = (key) => {
    const s = spec[key];
    const v = Number(raw?.[key]);
    const n = clamp(Number.isFinite(v) ? v : DEFAULT_PARAMS[key], s.min, s.max);
    return snap(n, s.step);
  };
  const out = { mode };
  for (const s of SLIDERS) out[s.key] = num(s.key);
  return out;
}

export function mergeParams(raw) {
  return clampParams({ ...DEFAULT_PARAMS, ...raw });
}

export function applySliderChange(prev, key, value) {
  return clampParams({ ...prev, [key]: value });
}

/**
 * Snap-together bone link. The hook's inner hole clears the next eye.
 * A narrow neck leaves through the gate; the eye itself is wider than the
 * gate, so the link stays on after you flex it closed.
 */
export function linkMetrics(linkLength) {
  const L = clamp(Number(linkLength) || 44, 40, 56);
  const wall = 2.7;
  const thick = 3.6;
  const clearance = 0.6;
  const gate = 3.5;
  const neckW = 2.2;
  const boneW = 5.1;
  const eyeR = snap(clamp(5.5 + (L - 40) * 0.07, 5.5, 6.8), 0.01);
  const eyeRi = eyeR - wall;
  const hookRi = eyeR + clearance;
  const hookR = hookRi + wall;
  const boneShaft = snap(clamp(L - 4 * eyeR - 3 * (clearance + wall), 8, 18), 0.01);
  const pitch = boneShaft + 2 * hookR;
  const overall = eyeR + pitch + hookR;
  return {
    eyeR,
    eyeRi,
    hookR,
    hookRi,
    pitch,
    thick,
    gate,
    neckW,
    boneW,
    boneShaft,
    wall,
    clearance,
    overall,
    fuse: 1.15,
  };
}

export function latticePlan(outerW, z0, z1) {
  const margin = 8.5;
  const sternum = 7.4;
  const slotW = 6.2;
  const ribW = 4.8;
  const band = 3.8;
  const span = z1 - z0;
  if (span < 11 || outerW < 40) return { xs: [], rows: [], slotW, slotH: 0, band, sternum, ribW };
  const xs = [];
  let x = sternum / 2 + ribW + slotW / 2;
  const limit = outerW / 2 - margin;
  while (x + slotW / 2 <= limit + 0.01 && xs.length < 6) {
    xs.push(Number(x.toFixed(3)));
    x += slotW + ribW;
  }
  const n = Math.max(1, Math.min(4, Math.floor(span / 13)));
  const slotH = (span - (n - 1) * band) / n;
  const rows = [];
  for (let i = 0; i < n; i++) rows.push(z0 + i * (slotH + band));
  return { xs, rows, slotW, slotH, band, sternum, ribW };
}

export function derive(raw) {
  const p = clampParams(raw);
  const link = linkMetrics(p.linkLength);
  const strap = p.links * link.pitch;
  if (p.mode === "phone") {
    const cavityW = p.phoneWidth + PHONE_CLEAR_X;
    const cavityD = p.phoneDepth + PHONE_CLEAR_Y;
    const cavityH = p.phoneHeight + PHONE_CLEAR_Z;
    const outerW = cavityW + 2 * SIDE_WALL;
    const outerD = BACK_T + cavityD + LIP_T;
    const outerH = FLOOR + cavityH;
    const lattice = latticePlan(outerW - 1, FLOOR + 3.2, outerH - RIM);
    return {
      p,
      link,
      strap,
      mode: "phone",
      wall: SIDE_WALL,
      floor: FLOOR,
      rim: RIM,
      backT: BACK_T,
      lip: LIP,
      lipT: LIP_T,
      outerW,
      outerD,
      outerH,
      cavityW,
      cavityD,
      cavityH,
      bowlTop: FLOOR + 3.2,
      rimBottom: outerH - RIM,
      lattice,
      corner: 3.5,
    };
  }
  const innerW = p.bagWidth;
  const innerD = p.bagDepth;
  const innerH = p.bagHeight;
  const outerW = innerW + 2 * WALL;
  const outerD = innerD + 2 * WALL;
  const outerH = innerH + FLOOR;
  const bowlTop = FLOOR + clamp(innerH * 0.4, 24, innerH - 26);
  const rimBottom = outerH - RIM;
  const lattice = latticePlan(outerW, bowlTop, rimBottom);
  return {
    p,
    link,
    strap,
    mode: "bag",
    wall: WALL,
    floor: FLOOR,
    rim: RIM,
    outerW,
    outerD,
    outerH,
    innerW,
    innerD,
    innerH,
    bowlTop,
    rimBottom,
    lattice,
    corner: Math.min(8, outerD / 2 - 1.2, outerW / 2 - 1.2),
  };
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  if (d.mode === "phone" && d.p.phoneDepth < 7) {
    notes.push("That depth is thinner than most phones. Measure the phone, not the screen protector.");
  }
  if (d.mode === "phone" && d.p.phoneDepth > 16) {
    notes.push("A thick case needs the depth slider on the case, lips included, or the phone will not slide in.");
  }
  if (d.strap > 240) {
    notes.push(`The chain row is about ${Math.round(d.strap)} mm long. Split to objects in the slicer if it hangs off the bed.`);
  }
  if (d.mode === "bag" && d.lattice.xs.length === 0) {
    notes.push("This size is too small for open ribs. The cup stays solid so it still holds keys.");
  }
  return notes;
}

export function eyeletCenter(d, side) {
  const { link } = d;
  return {
    x: side * (d.outerW / 2 - 2.2 + link.eyeR),
    y: 0,
    z: d.outerH - link.eyeR * 0.62,
  };
}
