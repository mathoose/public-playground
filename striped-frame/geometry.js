/** Layout math for a flat-backed striped picture frame. Units are millimeters. */

export const APP_VERSION = "1 · Sep 20, 2026";
export const APP_VERSION_TAG = "v1";

export const IN = 25.4;
export const PLA_G_PER_CM3 = 1.24;

export const PRESETS = [
  { id: "4x6", name: "4 × 6 in", w: 4 * IN, h: 6 * IN },
  { id: "5x7", name: "5 × 7 in", w: 5 * IN, h: 7 * IN },
  { id: "8x10", name: "8 × 10 in", w: 8 * IN, h: 10 * IN },
  { id: "wallet", name: "Wallet 2.5 × 3.5 in", w: 2.5 * IN, h: 3.5 * IN },
];

export function mmToDisplay(mm, units) {
  return units === "in" ? mm / IN : mm;
}

export function displayToMm(value, units) {
  return units === "in" ? value * IN : value;
}

function resizeHeights(heights, count, fill) {
  const next = [];
  for (let i = 0; i < count; i++) {
    next.push(i < heights.length ? heights[i] : fill);
  }
  return next;
}

export function defaultParams() {
  const photoW = 4 * IN;
  const photoH = 6 * IN;
  const stripeCount = 4;
  const sharedHeight = 8;
  return {
    units: "in",
    photoW,
    photoH,
    lip: 6,
    stripeCount,
    stripeWidth: 6,
    equalHeights: true,
    sharedHeight,
    stripeHeights: Array(stripeCount).fill(sharedHeight),
    bedThickness: 1.2,
    plateThickness: 1.2,
    hangHoles: true,
    hangHoleCount: 2,
    hangHoleDiameter: 5,
    hangInsetTop: 12,
    hangInsetSide: 18,
    standEnabled: true,
    standAngleDeg: 18,
    standThickness: 4,
  };
}

export function clampParams(p) {
  const next = { ...p };
  next.photoW = Math.max(8, Number(p.photoW) || 0);
  next.photoH = Math.max(8, Number(p.photoH) || 0);
  next.stripeCount = Math.min(12, Math.max(1, Math.round(Number(p.stripeCount) || 1)));
  next.stripeWidth = Math.min(40, Math.max(1.5, Number(p.stripeWidth) || 6));
  next.sharedHeight = Math.min(40, Math.max(1, Number(p.sharedHeight) || 8));
  next.equalHeights = p.equalHeights !== false;
  const maxLip = Math.min(next.photoW, next.photoH) / 2 - 1;
  next.lip = Math.min(Math.max(0, Number(p.lip) || 0), Math.max(0, maxLip));
  next.bedThickness = Math.min(5, Math.max(0, Number(p.bedThickness) || 0));
  next.plateThickness = Math.min(8, Math.max(0.4, Number(p.plateThickness) || 0));
  next.hangHoles = p.hangHoles !== false;
  next.hangHoleCount = Number(p.hangHoleCount) >= 2 ? 2 : 1;
  next.hangHoleDiameter = Math.min(16, Math.max(2.5, Number(p.hangHoleDiameter) || 5));
  const holeR = next.hangHoleDiameter / 2;
  const minInset = holeR + 2.5;
  next.hangInsetTop = Math.min(
    next.photoH / 2 - minInset,
    Math.max(minInset, Number(p.hangInsetTop) || 12)
  );
  next.hangInsetSide = Math.min(
    next.photoW / 2 - minInset,
    Math.max(minInset, Number(p.hangInsetSide) || 18)
  );
  next.standEnabled = p.standEnabled !== false;
  next.standAngleDeg = Math.min(32, Math.max(8, Number(p.standAngleDeg) || 18));
  next.standThickness = Math.min(10, Math.max(2.4, Number(p.standThickness) || 4));
  next.standHeight = Math.min(120, Math.max(28, 0.4 * next.photoH));
  next.standWidth = Math.min(60, Math.max(22, 0.32 * next.photoW));

  const src = Array.isArray(p.stripeHeights) ? p.stripeHeights.map(Number) : [];
  let heights = resizeHeights(src, next.stripeCount, next.sharedHeight).map((h) =>
    Math.min(40, Math.max(1, Number.isFinite(h) ? h : next.sharedHeight))
  );
  if (next.equalHeights) {
    heights = heights.map(() => next.sharedHeight);
  } else {
    next.sharedHeight = heights[0] ?? next.sharedHeight;
  }
  next.stripeHeights = heights;
  return next;
}

export function setSharedHeight(p, height) {
  const next = clampParams({ ...p, sharedHeight: height, equalHeights: true });
  next.stripeHeights = Array(next.stripeCount).fill(next.sharedHeight);
  return next;
}

export function setStripeHeight(p, index, height) {
  const next = clampParams({ ...p, equalHeights: false });
  const heights = [...next.stripeHeights];
  if (index < 0 || index >= heights.length) return next;
  heights[index] = Math.min(40, Math.max(1, Number(height) || 1));
  next.stripeHeights = heights;
  next.sharedHeight = heights[0];
  return next;
}

export function setStripeCount(p, count) {
  const next = clampParams({ ...p, stripeCount: count });
  if (next.equalHeights) {
    next.stripeHeights = Array(next.stripeCount).fill(next.sharedHeight);
  }
  return next;
}

/**
 * Photo centered at origin. X right, Y up. Stripes are concentric rectangular
 * rings from the lip opening outward. Stripe 0 is innermost.
 */
export function layoutStripes(p) {
  const params = clampParams(p);
  const opening = {
    w: params.photoW - 2 * params.lip,
    h: params.photoH - 2 * params.lip,
  };
  const stripes = [];
  for (let i = 0; i < params.stripeCount; i++) {
    const innerW = opening.w + 2 * i * params.stripeWidth;
    const innerH = opening.h + 2 * i * params.stripeWidth;
    const outerW = opening.w + 2 * (i + 1) * params.stripeWidth;
    const outerH = opening.h + 2 * (i + 1) * params.stripeWidth;
    stripes.push({
      id: `stripe-${i}`,
      index: i,
      innerW,
      innerH,
      outerW,
      outerH,
      height: params.stripeHeights[i],
      // Alternating preview tones for readability
      tone: i % 2 === 0 ? "dark" : "mid",
    });
  }
  const outer = stripes.length
    ? { w: stripes[stripes.length - 1].outerW, h: stripes[stripes.length - 1].outerH }
    : { w: opening.w, h: opening.h };
  const maxHeight = Math.max(params.bedThickness, ...params.stripeHeights);
  const frameRadial = params.stripeCount * params.stripeWidth;
  const warnings = [];
  if (opening.w <= 2 || opening.h <= 2) {
    warnings.push("Lip is so large the photo window is almost closed.");
  }
  if (params.stripeWidth < 2) {
    warnings.push("Very thin stripes may be fragile — consider 3 mm+.");
  }
  if (maxHeight < 2) {
    warnings.push("Stripe height is very low — the frame may feel flimsy.");
  }

  return {
    params,
    stripes,
    opening,
    outer,
    photo: { w: params.photoW, h: params.photoH },
    maxHeight,
    frameRadial,
    warnings,
  };
}

export function estimateVolumeMm3(layout) {
  let vol = 0;
  for (const s of layout.stripes) {
    const ringArea = s.outerW * s.outerH - s.innerW * s.innerH;
    vol += ringArea * s.height;
  }
  if (layout.params.bedThickness > 0) {
    const bedArea =
      layout.outer.w * layout.outer.h - layout.opening.w * layout.opening.h;
    vol += bedArea * layout.params.bedThickness * 0.35;
  }
  return vol;
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

/** Round hanging holes in photo-centered coordinates. */
export function hangHoleLayout(p) {
  const params = clampParams(p);
  if (!params.hangHoles) return [];
  const r = params.hangHoleDiameter / 2;
  const y = params.photoH / 2 - params.hangInsetTop;
  if (params.hangHoleCount <= 1) {
    return [{ x: 0, y, r }];
  }
  const x = params.photoW / 2 - params.hangInsetSide;
  return [
    { x: -x, y, r },
    { x, y, r },
  ];
}

export function polygonArea(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p0 = poly[i];
    const p1 = poly[(i + 1) % poly.length];
    a += p0[0] * p1[1] - p1[0] * p0[1];
  }
  return a / 2;
}

export function ensureCcw(poly) {
  return polygonArea(poly) >= 0 ? poly : poly.slice().reverse();
}

/**
 * Back-plate pocket the stand tab slides into. Open at the bottom and the
 * back; the front of the plate stays solid so the frame hides the joint.
 */
export function standSlotLayout(p) {
  const params = clampParams(p);
  if (!params.standEnabled) return null;
  const wall = 2.4;
  const clearance = 0.4;
  const insertH = Math.min(24, Math.max(12, 0.12 * params.photoH));
  const slotW = params.standWidth + clearance;
  const slotD = params.standThickness + clearance;
  const bossW = slotW + 2 * wall;
  const bossH = insertH + 3.5;
  const bossD = slotD + wall;
  // Radial protrusion of the frame below the photo edge.
  const lift = Math.max(2.5, params.stripeCount * params.stripeWidth - params.lip);
  return {
    wall,
    clearance,
    insertH,
    slotW,
    slotD,
    bossW,
    bossH,
    bossD,
    lift,
  };
}

/**
 * Easel stand side profile. Print this polygon on the bed and extrude
 * `standWidth` in Z. After printing, stand it on the y=0 edge.
 */
export function standPolygon(p) {
  const params = clampParams(p);
  const slot = standSlotLayout({ ...params, standEnabled: true });
  const tabT = params.standThickness;
  const insertH = slot.insertH - 0.7;
  const lift = slot.lift;
  const join = Math.min(2.4, lift);
  const tabBottom = lift - join;
  const thick = params.standThickness;
  const θ = (params.standAngleDeg * Math.PI) / 180;
  const heelX = -params.standHeight * Math.tan(θ) - 10;
  const poly = [
    [tabT, tabBottom],
    [tabT, lift + insertH],
    [0, lift + insertH],
    [0, lift],
    [-thick, tabBottom],
    [heelX - thick, 0],
    [heelX, 0],
    [0, tabBottom],
  ];
  return ensureCcw(poly);
}

export function standBounds(poly) {
  const xs = poly.map((p) => p[0]);
  const ys = poly.map((p) => p[1]);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    w: Math.max(...xs) - Math.min(...xs),
    h: Math.max(...ys) - Math.min(...ys),
  };
}
