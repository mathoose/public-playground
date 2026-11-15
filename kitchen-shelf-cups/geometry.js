/**
 * Kitchen shelf cups: a back plate with hex cutouts and four corner arms.
 *
 * Source mesh (kitchen-shelf-cups.stl), millimeters:
 *   plate 210 × 250 × 10, arms 200 long
 *   through-hole flat-to-flat 12.4 mm (back opening 15.4 mm)
 *   border 21.1 mm on the left and right, 25.2 mm on the top and bottom
 *   arms taper from about 20 mm at the plate to about 15 mm at the tip
 *
 * Defaults enlarge the through-holes and replace that border with one
 * even ring, thicker than the source's thin sides. Arms keep one thickness.
 */

export const APP_VERSION = "1 · Nov 15, 2026";
export const APP_VERSION_TAG = "v1";
export const APP_NAME = "Kitchen shelf cups";

/** Source through-hole flat-to-flat, for the readout. */
export const SOURCE_HEX_FLAT = 12.4;
/** Source border, short sides then long sides. */
export const SOURCE_RING = Object.freeze({ short: 21.1, long: 25.2 });
/** Thinnest wall left between hexes, mm. */
export const MIN_WEB = 3.2;

export const DEFAULT_PARAMS = Object.freeze({
  width: 210,
  height: 250,
  plate: 10,
  ring: 22,
  hexFlat: 18,
  cols: 7,
  rows: 7,
  skipCenter: true,
  chamfer: 1.2,
  armLength: 200,
  armThick: 18,
  corner: 3,
});

export const SLIDERS = [
  { key: "width", min: 120, max: 360, step: 1, unit: "mm" },
  { key: "height", min: 140, max: 420, step: 1, unit: "mm" },
  { key: "plate", min: 4, max: 18, step: 0.5, unit: "mm" },
  { key: "ring", min: 10, max: 48, step: 0.5, unit: "mm" },
  { key: "hexFlat", min: 8, max: 48, step: 0.5, unit: "mm" },
  { key: "cols", min: 3, max: 12, step: 1, unit: "" },
  { key: "rows", min: 3, max: 14, step: 1, unit: "" },
  { key: "chamfer", min: 0, max: 3, step: 0.1, unit: "mm" },
  { key: "armLength", min: 40, max: 280, step: 1, unit: "mm" },
  { key: "armThick", min: 8, max: 40, step: 0.5, unit: "mm" },
  { key: "corner", min: 0, max: 14, step: 0.5, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function clampParams(raw = {}) {
  const p = { ...DEFAULT_PARAMS, ...raw };
  p.skipCenter = Boolean(p.skipCenter);
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

/** Flat-to-flat F, points on the left and right. R is center-to-vertex. */
export function hexRadius(flat) {
  return flat / Math.sqrt(3);
}

function hitsArm(cx, cy, hexW, hexH, arm, width, height) {
  const pad = 0.8;
  const boxes = [
    [-pad, arm + pad, -pad, arm + pad],
    [width - arm - pad, width + pad, -pad, arm + pad],
    [-pad, arm + pad, height - arm - pad, height + pad],
    [width - arm - pad, width + pad, height - arm - pad, height + pad],
  ];
  const x0 = cx - hexW / 2;
  const x1 = cx + hexW / 2;
  const y0 = cy - hexH / 2;
  const y1 = cy + hexH / 2;
  return boxes.some(([ax0, ax1, ay0, ay1]) => x0 < ax1 && x1 > ax0 && y0 < ay1 && y1 > ay0);
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const cols = p.cols;
  const rows = p.rows;
  const innerW = p.width - 2 * p.ring;
  const innerH = p.height - 2 * p.ring;
  const maxHexW = cols <= 1 ? innerW : (innerW - (cols - 1) * MIN_WEB) / cols;
  const maxFlatW = (maxHexW * Math.sqrt(3)) / 2;
  const maxFlatH = rows <= 1 ? innerH : (innerH - (rows - 1) * MIN_WEB) / rows;
  const flat = Math.min(p.hexFlat, maxFlatW, maxFlatH);
  const hexClamped = flat < p.hexFlat - 0.05;
  const R = hexRadius(flat);
  const hexW = 2 * R;
  const hexH = flat;
  const webX = cols <= 1 ? innerW - hexW : (innerW - cols * hexW) / (cols - 1);
  const webY = rows <= 1 ? innerH - hexH : (innerH - rows * hexH) / (rows - 1);
  const pitchX = hexW + (cols <= 1 ? 0 : webX);
  const pitchY = hexH + (rows <= 1 ? 0 : webY);
  const originX = p.ring + hexW / 2;
  const originY = p.ring + hexH / 2;
  const midC = (cols - 1) / 2;
  const midR = (rows - 1) / 2;
  const centers = [];
  let droppedForArms = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isCenter =
        p.skipCenter && cols % 2 === 1 && rows % 2 === 1 && c === midC && r === midR;
      if (isCenter) continue;
      const x = originX + c * pitchX;
      const y = originY + r * pitchY;
      if (hitsArm(x, y, hexW, hexH, p.armThick, p.width, p.height)) {
        droppedForArms += 1;
        continue;
      }
      centers.push({ x, y });
    }
  }
  const chamfer = Math.min(
    p.chamfer,
    p.plate * 0.4,
    Math.max(0, webX / 2 - 0.5),
    Math.max(0, webY / 2 - 0.5),
    Math.max(0, p.ring - 12),
  );
  const corner = Math.min(p.corner, p.ring, p.armThick / 2 - 0.4, p.width / 4, p.height / 4);
  return {
    p,
    flat,
    hexClamped,
    R,
    hexW,
    hexH,
    webX,
    webY,
    pitchX,
    pitchY,
    centers,
    droppedForArms,
    holeCount: centers.length,
    chamfer,
    corner: Math.max(0, corner),
    totalZ: p.plate + p.armLength,
    minWeb: Math.min(webX, webY),
    backMargin: p.ring - chamfer,
  };
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  return `${v.toFixed(digits)} mm`;
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  if (d.hexClamped) {
    notes.push(
      `Hex size was reduced to ${formatMm(d.flat)} so the ${formatMm(d.p.ring, 1)} outer ring stays intact and the walls between holes stay at least ${formatMm(MIN_WEB)}.`,
    );
  }
  if (d.droppedForArms > 0) {
    notes.push(
      `${d.droppedForArms} hex${d.droppedForArms === 1 ? "" : "es"} would have cut into an arm, so those spots stay solid.`,
    );
  }
  if (d.p.armThick > d.p.ring) {
    notes.push("Arms are thicker than the outer ring, so the corners stay solid where a hex would have landed.");
  }
  if (d.p.armLength > 240) {
    notes.push("Long arms can wobble on the bed. A brim helps the corners stay put.");
  }
  return notes;
}
