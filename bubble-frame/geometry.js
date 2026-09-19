/** Layout math for a flat-backed bubble picture frame. Units are millimeters. */

export const IN = 25.4;
export const PLA_G_PER_CM3 = 1.24;

export const PRESETS = [
  { id: "4x6", name: "4 × 6 in", w: 4 * IN, h: 6 * IN },
  { id: "5x7", name: "5 × 7 in", w: 5 * IN, h: 7 * IN },
  { id: "8x10", name: "8 × 10 in", w: 8 * IN, h: 10 * IN },
  { id: "wallet", name: "Wallet 2.5 × 3.5 in", w: 2.5 * IN, h: 3.5 * IN },
];

export function centerLineSize(photoW, photoH, radius, lip) {
  return {
    w: photoW + 2 * (radius - lip),
    h: photoH + 2 * (radius - lip),
  };
}

export function countFromOverlap(length, diameter, overlap) {
  const spacing = diameter - overlap;
  if (!(spacing > 1e-6)) {
    const minSpacing = Math.max(diameter * 0.15, 1);
    return Math.max(2, 1 + Math.round(length / minSpacing));
  }
  return Math.max(2, 1 + Math.round(length / spacing));
}

export function actualOverlap(length, diameter, count) {
  if (count <= 1) return diameter;
  return diameter - length / (count - 1);
}

export function mmToDisplay(mm, units) {
  return units === "in" ? mm / IN : mm;
}

export function displayToMm(value, units) {
  return units === "in" ? value * IN : value;
}

export function defaultParams() {
  const photoW = 4 * IN;
  const photoH = 6 * IN;
  const ballDiameter = 20;
  const imageOverlap = 5;
  const targetBallOverlap = 5;
  const r = ballDiameter / 2;
  const cl = centerLineSize(photoW, photoH, r, imageOverlap);
  const countH = countFromOverlap(cl.w, ballDiameter, targetBallOverlap);
  const countV = countFromOverlap(cl.h, ballDiameter, targetBallOverlap);
  return {
    units: "in",
    photoW,
    photoH,
    ballDiameter,
    imageOverlap,
    targetBallOverlap,
    countTop: countH,
    countBottom: countH,
    countLeft: countV,
    countRight: countV,
    linkH: true,
    linkV: true,
    webThickness: 0.8,
    plateThickness: 1.2,
    segments: 32,
    disabled: [],
  };
}

export function clampParams(p) {
  const next = { ...p };
  next.photoW = Math.max(8, Number(p.photoW) || 0);
  next.photoH = Math.max(8, Number(p.photoH) || 0);
  next.ballDiameter = Math.min(80, Math.max(4, Number(p.ballDiameter) || 0));
  const maxLip = Math.min(
    next.ballDiameter,
    Math.min(next.photoW, next.photoH) / 2 - 0.5
  );
  next.imageOverlap = Math.min(Math.max(0, Number(p.imageOverlap) || 0), Math.max(0, maxLip));
  next.webThickness = Math.min(5, Math.max(0, Number(p.webThickness) || 0));
  next.plateThickness = Math.min(8, Math.max(0.4, Number(p.plateThickness) || 0));
  next.segments = Math.min(96, Math.max(12, Math.round(Number(p.segments) || 32)));
  for (const key of ["countTop", "countBottom", "countLeft", "countRight"]) {
    next[key] = Math.min(40, Math.max(2, Math.round(Number(p[key]) || 2)));
  }
  if (next.linkH) next.countBottom = next.countTop;
  if (next.linkV) next.countRight = next.countLeft;
  next.disabled = Array.isArray(p.disabled) ? [...p.disabled] : [];
  return next;
}

export function applyTargetOverlap(p) {
  const next = clampParams(p);
  const r = next.ballDiameter / 2;
  const cl = centerLineSize(next.photoW, next.photoH, r, next.imageOverlap);
  const nH = countFromOverlap(cl.w, next.ballDiameter, next.targetBallOverlap);
  const nV = countFromOverlap(cl.h, next.ballDiameter, next.targetBallOverlap);
  next.countTop = nH;
  next.countBottom = next.linkH ? nH : countFromOverlap(cl.w, next.ballDiameter, next.targetBallOverlap);
  next.countLeft = nV;
  next.countRight = next.linkV ? nV : countFromOverlap(cl.h, next.ballDiameter, next.targetBallOverlap);
  if (next.linkH) next.countBottom = next.countTop;
  if (next.linkV) next.countRight = next.countLeft;
  return pruneDisabled(next);
}

export function syncTargetOverlapFromCounts(p) {
  const next = clampParams(p);
  const layout = layoutBeads(next);
  const vals = [layout.overlap.top, layout.overlap.bottom, layout.overlap.left, layout.overlap.right];
  next.targetBallOverlap = vals.reduce((a, b) => a + b, 0) / vals.length;
  return next;
}

export function pruneDisabled(p) {
  const ids = new Set(layoutBeads({ ...p, disabled: [] }).beads.map((b) => b.id));
  return { ...p, disabled: (p.disabled || []).filter((id) => ids.has(id)) };
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

/**
 * Photo is centered at the origin. X right, Y up.
 * Ball centers sit on a rectangle offset from the photo by (radius - imageOverlap).
 */
export function layoutBeads(p) {
  const params = clampParams(p);
  const r = params.ballDiameter / 2;
  const lip = params.imageOverlap;
  const cl = centerLineSize(params.photoW, params.photoH, r, lip);
  const x0 = -cl.w / 2;
  const x1 = cl.w / 2;
  const y0 = -cl.h / 2;
  const y1 = cl.h / 2;
  const disabled = new Set(params.disabled);

  const beads = [];
  const seen = new Set();
  const add = (id, x, y, side, role) => {
    if (seen.has(id)) return;
    seen.add(id);
    beads.push({
      id,
      x,
      y,
      side,
      role,
      enabled: !disabled.has(id),
    });
  };

  add("corner-tl", x0, y1, "corner", "corner");
  add("corner-tr", x1, y1, "corner", "corner");
  add("corner-bl", x0, y0, "corner", "corner");
  add("corner-br", x1, y0, "corner", "corner");

  const nTop = params.countTop;
  const nBottom = params.countBottom;
  const nLeft = params.countLeft;
  const nRight = params.countRight;

  for (let i = 1; i < nTop - 1; i++) {
    add(`top-${i}`, lerp(x0, x1, i / (nTop - 1)), y1, "top", "edge");
  }
  for (let i = 1; i < nBottom - 1; i++) {
    add(`bottom-${i}`, lerp(x0, x1, i / (nBottom - 1)), y0, "bottom", "edge");
  }
  for (let i = 1; i < nLeft - 1; i++) {
    add(`left-${i}`, x0, lerp(y0, y1, i / (nLeft - 1)), "left", "edge");
  }
  for (let i = 1; i < nRight - 1; i++) {
    add(`right-${i}`, x1, lerp(y0, y1, i / (nRight - 1)), "right", "edge");
  }

  const overlap = {
    top: actualOverlap(cl.w, params.ballDiameter, nTop),
    bottom: actualOverlap(cl.w, params.ballDiameter, nBottom),
    left: actualOverlap(cl.h, params.ballDiameter, nLeft),
    right: actualOverlap(cl.h, params.ballDiameter, nRight),
  };

  const enabled = beads.filter((b) => b.enabled);
  const uniqueTotal = beads.length;
  const warnings = [];
  if (Object.values(overlap).some((v) => v < -0.05)) {
    warnings.push("Some beads do not touch — increase overlap or add circles so the frame stays one piece.");
  }
  if (lip <= 0.05) {
    warnings.push("Image overlap is ~0, so the beads barely cover the photo edge.");
  }
  if (params.photoW - 2 * lip <= 2 || params.photoH - 2 * lip <= 2) {
    warnings.push("Image overlap is so large the window is almost closed.");
  }
  if (enabled.length < 4) {
    warnings.push("Too many beads are turned off — the frame may fall apart.");
  }

  return {
    params,
    beads,
    enabled,
    radius: r,
    center: cl,
    overlap,
    outer: {
      w: cl.w + 2 * r,
      h: cl.h + 2 * r,
    },
    opening: {
      w: params.photoW - 2 * lip,
      h: params.photoH - 2 * lip,
    },
    photo: { w: params.photoW, h: params.photoH },
    uniqueTotal,
    enabledCount: enabled.length,
    warnings,
  };
}

export function estimateVolumeMm3(layout, webThickness) {
  const r = layout.radius;
  const n = layout.enabledCount;
  const hemi = n * (2 / 3) * Math.PI * r * r * r;
  // Thin bed web is mostly inside the hemispheres; count a small extra slab.
  const web = webThickness > 0 ? n * Math.PI * r * r * webThickness * 0.12 : 0;
  return hemi + web;
}

export function plaGrams(volumeMm3) {
  return (volumeMm3 / 1000) * PLA_G_PER_CM3;
}

export function sizeLabel(photoW, photoH, units) {
  const w = mmToDisplay(photoW, units);
  const h = mmToDisplay(photoH, units);
  const dec = units === "in" ? 2 : 1;
  const fmt = (v) => {
    const s = v.toFixed(dec).replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
    return s;
  };
  return `${fmt(w)}x${fmt(h)}${units}`;
}

export function toggleDisabled(p, id) {
  const next = clampParams(p);
  const set = new Set(next.disabled);
  if (set.has(id)) set.delete(id);
  else set.add(id);
  next.disabled = [...set];
  return next;
}
