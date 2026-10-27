import { LETTER_POLYS, REF_HEIGHT } from "./letters.js";

export const APP_VERSION = "4 · Oct 27, 2026";
export const APP_VERSION_TAG = "v4";
export const APP_NAME = "Paddington tag";

/**
 * Dark brown grommet in the photo: outer radius / inner radius.
 * The 5 mm cord hole is the inner edge; the band keeps this proportion.
 */
export const RING_OD_RATIO = 33.9 / 21.4;

/** Paper silhouette from the reference photo, in pixels (y down). Metal clip excluded. */
const PHOTO_TOP = 42;
const PHOTO_BOTTOM = 710;
const PHOTO_H = PHOTO_BOTTOM - PHOTO_TOP;
const BODY_HALF_PX = 236;
const TOP_HALF_PX = 139;
const CHAMFER_PX = 128;
const CORNER_PX = 38;
const HOLE_X_PX = 374 - 375;
const HOLE_Y_PX = 710 - 115;
const MIN_WALL = 1.6;
/** Parchment left outside the brown ring so it stays on the tag. */
const MIN_RIM = 1.2;

export const DEFAULT_PARAMS = Object.freeze({
  height: 55,
  hole: 5,
  letterSize: 100,
  letterH: 0.8,
  thickness: 2,
});

export const SLIDERS = [
  { key: "height", min: 40, max: 130, step: 0.5, unit: "mm" },
  { key: "hole", min: 2.5, max: 12, step: 0.1, unit: "mm" },
  { key: "letterSize", min: 55, max: 145, step: 1, unit: "%" },
  { key: "letterH", min: 0.2, max: 2.2, step: 0.05, unit: "mm" },
  { key: "thickness", min: 1.2, max: 5, step: 0.1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function snap(v, step) {
  const decimals = step >= 1 ? 0 : (String(step).split(".")[1] || "").length;
  return Number(v.toFixed(decimals));
}

export function outlinePoints(layout, arcSegs = 10) {
  const bw = layout.bodyHalf;
  const tw = layout.topHalf;
  const chamfer = layout.chamfer;
  const h = layout.height;
  const rr = Math.min(layout.cornerR, bw - 0.6, (h - chamfer) * 0.45);
  const pts = [];
  pts.push([-bw + rr, 0]);
  pts.push([bw - rr, 0]);
  for (let i = 1; i <= arcSegs; i++) {
    const a = -Math.PI / 2 + (i * (Math.PI / 2)) / arcSegs;
    pts.push([bw - rr + Math.cos(a) * rr, rr + Math.sin(a) * rr]);
  }
  pts.push([bw, h - chamfer]);
  pts.push([tw, h]);
  pts.push([-tw, h]);
  pts.push([-bw, h - chamfer]);
  pts.push([-bw, rr]);
  for (let i = 1; i < arcSegs; i++) {
    const a = Math.PI + (i * (Math.PI / 2)) / arcSegs;
    pts.push([-bw + rr + Math.cos(a) * rr, rr + Math.sin(a) * rr]);
  }
  return pts;
}

function distPointSeg(px, py, ax, ay, bx, by) {
  const dx = bx - ax;
  const dy = by - ay;
  const len2 = dx * dx + dy * dy || 1;
  let t = ((px - ax) * dx + (py - ay) * dy) / len2;
  t = clamp(t, 0, 1);
  const x = ax + t * dx;
  const y = ay + t * dy;
  return Math.hypot(px - x, py - y);
}

function clearance(layout) {
  const pts = outlinePoints(layout, 12);
  let best = Infinity;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    best = Math.min(best, distPointSeg(layout.holeX, layout.holeY, a[0], a[1], b[0], b[1]));
  }
  return best;
}

export function layoutFor(height) {
  const s = height / PHOTO_H;
  const layout = {
    height,
    bodyHalf: BODY_HALF_PX * s,
    topHalf: TOP_HALF_PX * s,
    chamfer: CHAMFER_PX * s,
    cornerR: CORNER_PX * s,
    holeX: HOLE_X_PX * s,
    holeY: HOLE_Y_PX * s,
  };
  layout.width = layout.bodyHalf * 2;
  const fit = Math.min(clearance(layout) - MIN_WALL, (clearance(layout) - MIN_RIM) / RING_OD_RATIO);
  layout.maxHole = snap(Math.max(2.5, 2 * fit), 0.1);
  return layout;
}

export function clampParams(raw = {}) {
  const p = { ...DEFAULT_PARAMS, ...raw };
  for (const s of SLIDERS) {
    let v = Number(p[s.key]);
    if (!Number.isFinite(v)) v = DEFAULT_PARAMS[s.key];
    p[s.key] = snap(clamp(v, s.min, s.max), s.step);
  }
  const layout = layoutFor(p.height);
  const holeCap = Math.min(p.hole, layout.maxHole);
  p.hole = snap(clamp(holeCap, SLIDERS.find((s) => s.key === "hole").min, layout.maxHole), 0.1);
  p._holeCapped = holeCap + 1e-6 < Number(raw.hole);
  return p;
}

export function mergeParams(overrides = {}) {
  return clampParams({ ...DEFAULT_PARAMS, ...overrides });
}

export function applySliderChange(prev, key, value) {
  return clampParams({ ...prev, [key]: value });
}

function refLetterCenter() {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  for (const poly of LETTER_POLYS) {
    for (const [x, y] of poly) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return { cx: (minX + maxX) / 2, cy: (minY + maxY) / 2 };
}

const REF_LETTER_CENTER = refLetterCenter();

/**
 * Traced strokes at a tag height. letterSize is how much of the tag they fill:
 * 100 keeps the photo layout; other values scale the block about its own center.
 */
export function scaledLetters(height, letterSize = 100) {
  const hs = height / REF_HEIGHT;
  const cover = letterSize / 100;
  const { cx, cy } = REF_LETTER_CENTER;
  return LETTER_POLYS.map((poly) =>
    poly.map(([x, y]) => [hs * (cx + (x - cx) * cover), hs * (cy + (y - cy) * cover)])
  );
}

export function derive(raw) {
  const p = clampParams(raw);
  const layout = layoutFor(p.height);
  return {
    p,
    ...layout,
    letterScale: (p.height / REF_HEIGHT) * (p.letterSize / 100),
    ringOuter: (p.hole / 2) * RING_OD_RATIO,
    totalH: p.thickness + p.letterH,
    holeCapped: Boolean(p._holeCapped) || p.hole + 0.05 < Number(raw.hole || p.hole),
  };
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  if (Number(raw.hole) > d.maxHole + 0.05) {
    notes.push(
      `Hole capped at ${d.p.hole.toFixed(1)} mm so the brown ring stays on the tag, with plastic left around the hole.`
    );
  }
  if (d.p.letterH < 0.4) {
    notes.push("Letter height under 0.4 mm is only a layer or two — easy to miss on the print.");
  }
  if (d.p.letterSize > 125) {
    notes.push("Letter size above 125% runs into the ring and the edge of the tag. The extra is trimmed.");
  }
  return notes;
}

export function formatMm(n) {
  return `${Number(n).toFixed(1)} mm`;
}
