/** Seat measurement and cut plan for a pumpkin lantern's bottom opening. */

export const APP_NAME = "Pumpkin lantern";
export const APP_VERSION = "v1 · Nov 4, 2026";
export const APP_VERSION_TAG = "v1";

export const DEFAULT_PARAMS = Object.freeze({
  ledDiameter: 58.4,
  ledThickness: 7.6,
  clearance: 0.6,
  cordDiameter: 8,
  cordHeight: 3.8,
  cordAngle: 0,
});

export const SLIDERS = Object.freeze([
  { key: "ledDiameter", min: 20, max: 80, step: 0.1, unit: "mm" },
  { key: "ledThickness", min: 2, max: 30, step: 0.1, unit: "mm" },
  { key: "clearance", min: 0, max: 2, step: 0.1, unit: "mm" },
  { key: "cordDiameter", min: 0, max: 18, step: 0.5, unit: "mm" },
  { key: "cordHeight", min: 1, max: 24, step: 0.1, unit: "mm" },
  { key: "cordAngle", min: 0, max: 360, step: 1, unit: "°" },
]);

/** Common flat plug-in discs. Diameter is the whole disc, not the lit face. */
export const PRESETS = Object.freeze([
  { id: "tealight", label: "40 mm tea light", ledDiameter: 40, ledThickness: 10, cordHeight: 5 },
  { id: "puck23", label: "2.3 in puck", ledDiameter: 58.4, ledThickness: 7.6, cordHeight: 3.8 },
  { id: "puck275", label: "2.75 in puck", ledDiameter: 70, ledThickness: 15, cordHeight: 6 },
]);

function clamp(min, max, n) {
  const v = Number(n);
  if (!Number.isFinite(v)) return min;
  return Math.min(max, Math.max(min, v));
}

export function mergeParams(raw) {
  const src = raw && typeof raw === "object" ? raw : {};
  const out = { ...DEFAULT_PARAMS };
  for (const spec of SLIDERS) {
    if (src[spec.key] == null || src[spec.key] === "") continue;
    out[spec.key] = clamp(spec.min, spec.max, src[spec.key]);
  }
  return out;
}

export function formatMm(n, digits = 1) {
  if (!Number.isFinite(n)) return "—";
  return `${n.toFixed(digits)} mm`;
}

function median(values) {
  if (!values.length) return null;
  const s = values.slice().sort((a, b) => a - b);
  const mid = s.length >> 1;
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
}

/**
 * Horizontal slice. Returns packed [x, y, r] relative to (cx, cy), limited to rMax.
 * @param {Float32Array} positions
 * @param {Uint32Array} indices
 */
function slicePoints(positions, indices, z, cx, cy, rMax) {
  const out = [];
  const n = indices.length;
  for (let t = 0; t < n; t += 3) {
    const ia = indices[t] * 3;
    const ib = indices[t + 1] * 3;
    const ic = indices[t + 2] * 3;
    const za = positions[ia + 2];
    const zb = positions[ib + 2];
    const zc = positions[ic + 2];
    let lo = za;
    let hi = za;
    if (zb < lo) lo = zb;
    if (zc < lo) lo = zc;
    if (zb > hi) hi = zb;
    if (zc > hi) hi = zc;
    if (z < lo || z > hi) continue;
    edge(ia, ib);
    edge(ib, ic);
    edge(ic, ia);
  }
  return out;

  function edge(i, j) {
    const za = positions[i + 2];
    const zb = positions[j + 2];
    const dz = zb - za;
    if (dz > -1e-8 && dz < 1e-8) return;
    if ((za - z) * (zb - z) > 0) return;
    const t = (z - za) / dz;
    const x = positions[i] + t * (positions[j] - positions[i]) - cx;
    const y = positions[i + 1] + t * (positions[j + 1] - positions[i + 1]) - cy;
    const r = Math.hypot(x, y);
    if (r <= rMax) {
      out.push(x, y, r);
    }
  }
}

/** Median inner radius when the slice is a full circle. */
function fullCircleRadius(pts) {
  const bins = 72;
  const minR = new Array(bins).fill(Infinity);
  let filled = 0;
  for (let i = 2; i < pts.length; i += 3) {
    const x = pts[i - 2];
    const y = pts[i - 1];
    const r = pts[i];
    if (r > 45 || r < 1) continue;
    let k = Math.floor(((Math.atan2(y, x) + Math.PI) / (Math.PI * 2)) * bins);
    if (k < 0) k = 0;
    if (k >= bins) k = bins - 1;
    if (r < minR[k]) {
      if (minR[k] === Infinity) filled += 1;
      minR[k] = r;
    }
  }
  if (filled < 64) return null;
  const vals = minR.filter((r) => r < Infinity);
  const med = median(vals);
  let spread = 0;
  for (const r of vals) {
    const d = Math.abs(r - med);
    if (d > spread) spread = d;
  }
  if (spread > 0.8) return null;
  return med;
}

/** Smallest outer face of the ring that borders the hole. Ribs that keep going are ignored for the minimum. */
function collarOuterMin(pts, seatRadius) {
  const bins = 72;
  const lists = Array.from({ length: bins }, () => []);
  for (let i = 2; i < pts.length; i += 3) {
    const x = pts[i - 2];
    const y = pts[i - 1];
    const r = pts[i];
    let k = Math.floor(((Math.atan2(y, x) + Math.PI) / (Math.PI * 2)) * bins);
    if (k < 0) k = 0;
    if (k >= bins) k = bins - 1;
    lists[k].push(r);
  }
  let minOuter = Infinity;
  let samples = 0;
  for (const list of lists) {
    if (list.length < 2) continue;
    list.sort((a, b) => a - b);
    let prev = list[0];
    let outer = list[list.length - 1];
    for (let i = 1; i < list.length; i += 1) {
      const r = list[i];
      if (r - prev > 1.6 && prev > seatRadius + 1.2) {
        outer = prev;
        break;
      }
      prev = r;
    }
    if (outer > seatRadius + 0.4 && outer < minOuter) minOuter = outer;
    samples += 1;
  }
  if (samples < 24 || !Number.isFinite(minOuter)) return null;
  return minOuter;
}

/**
 * Find the round through-hole at the bottom of the lantern.
 * Coordinates are millimeters, Z up, the same frame as the mesh.
 */
export function measureSeat(positions, indices) {
  let xMin = Infinity;
  let xMax = -Infinity;
  let yMin = Infinity;
  let yMax = -Infinity;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];
    const z = positions[i + 2];
    if (x < xMin) xMin = x;
    if (x > xMax) xMax = x;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
    if (z < zMin) zMin = z;
    if (z > zMax) zMax = z;
  }
  const cx = (xMin + xMax) / 2;
  const cy = (yMin + yMax) / 2;
  const step = 0.4;
  const band = [];
  let anchor = null;
  for (let z = zMin + 0.35; z < zMin + 22; z += step) {
    const pts = slicePoints(positions, indices, z, cx, cy, 55);
    const r = fullCircleRadius(pts);
    if (r == null) {
      if (band.length) break;
      continue;
    }
    if (anchor == null) anchor = r;
    if (Math.abs(r - anchor) > 0.5) break;
    band.push({ z, r });
  }
  if (band.length < 3) {
    throw new Error("No round opening in the bottom of this mesh. Use the With Hole lantern.");
  }
  const seatRadius = median(band.map((s) => s.r));
  const seatTop = band[band.length - 1].z + step * 0.5;
  const midZ = (zMin + Math.min(seatTop, band[band.length - 1].z)) / 2;
  const midPts = slicePoints(positions, indices, midZ, cx, cy, 70);
  let ceiling = null;
  for (let i = 0; i < positions.length; i += 3) {
    const dx = positions[i] - cx;
    const dy = positions[i + 1] - cy;
    const z = positions[i + 2];
    if (z < zMin + 15) continue;
    if (dx * dx + dy * dy > 36) continue;
    if (ceiling == null || z < ceiling) ceiling = z;
  }
  return {
    xMin,
    xMax,
    yMin,
    yMax,
    zMin,
    zMax,
    cx,
    cy,
    seatRadius,
    seatTop,
    collarOuterMin: collarOuterMin(midPts, seatRadius),
    ceiling,
  };
}

export function planCut(params, seat) {
  const p = mergeParams(params);
  const opening = p.ledDiameter + p.clearance;
  const openingR = opening / 2;
  const seatHeight = seat.seatTop - seat.zMin;
  let boreTop = seat.zMin + Math.max(seatHeight, p.ledThickness + 0.5);
  let hitCeiling = false;
  if (seat.ceiling != null && boreTop > seat.ceiling - 1.5) {
    boreTop = seat.ceiling - 1.5;
    hitCeiling = true;
  }
  const boreBottom = seat.zMin - 1.5;
  const cordR = p.cordDiameter / 2;
  let cordZ = seat.zMin + p.cordHeight;
  let cordTallerThanRing = false;
  if (cordR > 0.2) {
    const margin = 0.35;
    if (cordR * 2 + margin * 2 < seatHeight) {
      const low = seat.zMin + cordR + margin;
      const high = seat.seatTop - cordR - margin;
      cordZ = Math.min(high, Math.max(low, cordZ));
    } else {
      cordZ = (seat.zMin + seat.seatTop) / 2;
      cordTallerThanRing = true;
    }
  }
  const mode =
    openingR < seat.seatRadius - 0.2 ? "shrink" : openingR > seat.seatRadius + 0.2 ? "enlarge" : "same";
  const reach =
    Math.max(seat.xMax - seat.cx, seat.cx - seat.xMin, seat.yMax - seat.cy, seat.cy - seat.yMin) + 12;
  return {
    p,
    opening,
    openingR,
    seatHeight,
    boreTop,
    boreBottom,
    hitCeiling,
    cordZ,
    cordR,
    cordTallerThanRing,
    mode,
    reach,
  };
}

export function warnings(params, seat) {
  if (!seat) return [];
  const plan = planCut(params, seat);
  const notes = [];
  if (
    plan.mode === "enlarge" &&
    seat.collarOuterMin != null &&
    plan.openingR > seat.collarOuterMin - 1.2
  ) {
    notes.push(
      "This disc is wider than the thin parts of the bottom ring, so the ring opens between the ribs. The ribs still join at the top.",
    );
  }
  if (plan.mode === "shrink" && seat.seatRadius - plan.openingR < 1.2) {
    notes.push("The new lip is under 1.2 mm thick. Use a smaller disc so the lip can print, or leave the opening at the size in the file.");
  }
  if (plan.cordTallerThanRing) {
    notes.push("The cord hole is taller than the bottom ring, so the circle runs out through the top of the ring.");
  }
  if (plan.hitCeiling) {
    notes.push("The LED is tall enough to reach the stem, so the opening stops short of it.");
  }
  return notes;
}

export function activePreset(params) {
  const p = mergeParams(params);
  return (
    PRESETS.find(
      (preset) =>
        Math.abs(preset.ledDiameter - p.ledDiameter) < 0.05 &&
        Math.abs(preset.ledThickness - p.ledThickness) < 0.05,
    )?.id || ""
  );
}
