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
 * Holes sit on a honeycomb: one center spacing, so every wall is the same
 * thickness and the points do not pinch.
 */

export const APP_VERSION = "3 · Nov 16, 2026";
export const APP_VERSION_TAG = "v3";
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
  hexFlat: 24,
  wall: 4,
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
  { key: "wall", min: 3.2, max: 12, step: 0.1, unit: "mm" },
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

const SQRT3 = Math.sqrt(3);

/** Flat-to-flat distance to center-to-vertex radius. */
export function hexRadius(flat) {
  return flat / SQRT3;
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

/**
 * Pointy-top honeycomb. Every neighbor sits at distance flat+wall,
 * which is the flat-to-flat gap plus the wall, so the six walls match.
 * Odd rows are shifted half a pitch and hold one fewer hex, so the
 * outline stays symmetric inside the ring.
 */
function pointyLattice(outerFlat, wall, innerW, innerH) {
  const D = outerFlat + wall;
  const R = outerFlat / SQRT3;
  const rowPitch = (D * SQRT3) / 2;
  if (outerFlat > innerW + 1e-6 || 2 * R > innerH + 1e-6 || D <= outerFlat) return null;
  const cols = Math.floor((innerW - outerFlat) / D + 1e-9) + 1;
  const rows = Math.floor((innerH - 2 * R) / rowPitch + 1e-9) + 1;
  if (cols < 2 || rows < 2) return null;
  return { cols, rows, D, rowPitch, R, pointy: true };
}

/** One column, flats facing, used only when two honeycomb columns will not fit. */
function columnLattice(outerFlat, wall, innerW, innerH) {
  const D = outerFlat + wall;
  const R = outerFlat / SQRT3;
  if (2 * R > innerW + 1e-6 || outerFlat > innerH + 1e-6) return null;
  const rows = Math.floor((innerH - outerFlat) / D + 1e-9) + 1;
  if (rows < 1) return null;
  return { cols: 1, rows, D, rowPitch: D, R, pointy: false };
}

function placeCenters(layout, outerFlat, width, height) {
  const { cols, rows, D, rowPitch, R, pointy } = layout;
  const hexW = pointy ? outerFlat : 2 * R;
  const hexH = pointy ? 2 * R : outerFlat;
  const patternW = pointy ? (cols - 1) * D + outerFlat : hexW;
  const patternH = pointy ? (rows - 1) * rowPitch + hexH : (rows - 1) * D + outerFlat;
  const originX = (width - patternW) / 2 + hexW / 2;
  const originY = (height - patternH) / 2 + hexH / 2;
  const centers = [];
  for (let r = 0; r < rows; r++) {
    const odd = pointy && r % 2 === 1;
    const n = odd ? cols - 1 : cols;
    const x0 = originX + (odd ? D / 2 : 0);
    for (let c = 0; c < n; c++) {
      centers.push({ x: x0 + c * (pointy ? D : 0), y: originY + r * rowPitch });
    }
  }
  return {
    centers,
    hexW,
    hexH,
    patternW,
    patternH,
    marginX: (width - patternW) / 2,
    marginY: (height - patternH) / 2,
  };
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const innerW = p.width - 2 * p.ring;
  const innerH = p.height - 2 * p.ring;
  const wall = Math.max(p.wall, MIN_WEB);
  let through = p.hexFlat;
  let chamfer = p.chamfer;
  let hexClamped = wall > p.wall + 0.05;
  let layout = null;
  let outer = through;

  for (let guard = 0; guard < 500; guard++) {
    chamfer = Math.min(chamfer, through * 0.3, p.plate * 0.4);
    outer = through + 2 * chamfer;
    layout = pointyLattice(outer, wall, innerW, innerH) || columnLattice(outer, wall, innerW, innerH);
    if (layout) break;
    if (chamfer > 0.05) {
      chamfer = Math.max(0, chamfer - 0.1);
      hexClamped = true;
      continue;
    }
    if (through > 8) {
      through = Math.max(8, Number((through - 0.25).toFixed(2)));
      hexClamped = true;
      continue;
    }
    break;
  }
  if (!layout) {
    through = 8;
    chamfer = 0;
    outer = 8;
    layout = columnLattice(outer, wall, Math.max(innerW, 8), Math.max(innerH, 8));
    hexClamped = true;
  }
  if (through < p.hexFlat - 0.05 || chamfer < p.chamfer - 0.05) hexClamped = true;

  const placed = placeCenters(layout, outer, p.width, p.height);
  const R = hexRadius(through);
  const outerR = hexRadius(outer);
  let droppedForArms = 0;
  const kept = [];
  for (const c of placed.centers) {
    if (hitsArm(c.x, c.y, placed.hexW, placed.hexH, p.armThick, p.width, p.height)) {
      droppedForArms += 1;
      continue;
    }
    kept.push(c);
  }
  if (p.skipCenter && kept.length > 1) {
    let best = 0;
    let bestD = Infinity;
    const mx = p.width / 2;
    const my = p.height / 2;
    for (let i = 0; i < kept.length; i++) {
      const d2 = (kept[i].x - mx) ** 2 + (kept[i].y - my) ** 2;
      if (d2 < bestD) {
        bestD = d2;
        best = i;
      }
    }
    kept.splice(best, 1);
  }

  const corner = Math.min(p.corner, p.ring, p.armThick / 2 - 0.4, p.width / 4, p.height / 4);
  return {
    p,
    flat: through,
    hexClamped,
    R,
    outerR,
    outerFlat: outer,
    wall,
    pitch: layout.D,
    pointy: layout.pointy,
    cols: layout.cols,
    rows: layout.rows,
    hexW: placed.hexW,
    hexH: placed.hexH,
    marginX: placed.marginX,
    marginY: placed.marginY,
    centers: kept,
    droppedForArms,
    holeCount: kept.length,
    chamfer,
    corner: Math.max(0, corner),
    totalZ: p.plate + p.armLength,
    minWeb: wall,
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
      `Hex size was reduced to ${formatMm(d.flat)} so the ${formatMm(d.p.ring, 1)} outer ring stays intact and every wall stays ${formatMm(d.wall)}.`,
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
