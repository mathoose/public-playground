/** Path-stripe picture frame: alternating bands along the moulding loop. Units mm. */

export const APP_VERSION = "2 · Sep 20, 2026";
export const APP_VERSION_TAG = "v2";

export const IN = 25.4;
export const PLA_G_PER_CM3 = 1.24;

export const PRESETS = [
  { id: "4x6", name: "4 × 6 in", w: 4 * IN, h: 6 * IN },
  { id: "5x7", name: "5 × 7 in", w: 5 * IN, h: 7 * IN },
  { id: "8x10", name: "8 × 10 in", w: 8 * IN, h: 10 * IN },
  { id: "wallet", name: "Wallet 2.5 × 3.5 in", w: 2.5 * IN, h: 3.5 * IN },
];

/** Preview / UI swatches for pattern colors (print is still one material unless split STLs). */
export const COLOR_SWATCHES = [
  { id: "charcoal", hex: 0x292524, label: "Charcoal" },
  { id: "amber", hex: 0xb45309, label: "Amber" },
  { id: "teal", hex: 0x0f766e, label: "Teal" },
  { id: "cream", hex: 0xd6d3d1, label: "Cream" },
];

export function mmToDisplay(mm, units) {
  return units === "in" ? mm / IN : mm;
}

export function displayToMm(value, units) {
  return units === "in" ? value * IN : value;
}

function defaultColor(index, height) {
  const sw = COLOR_SWATCHES[index % COLOR_SWATCHES.length];
  return {
    thickness: 14,
    height,
    swatch: sw.id,
    hex: sw.hex,
  };
}

export function defaultParams() {
  const sharedHeight = 8;
  return {
    units: "in",
    photoW: 4 * IN,
    photoH: 6 * IN,
    lip: 6,
    mouldingWidth: 14,
    colorCount: 2,
    equalHeights: true,
    sharedHeight,
    colors: [defaultColor(0, sharedHeight), defaultColor(1, sharedHeight)],
    bedThickness: 1.0,
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

function resizeColors(colors, count, sharedHeight) {
  const next = [];
  for (let i = 0; i < count; i++) {
    if (i < colors.length) {
      next.push({ ...colors[i] });
    } else {
      next.push(defaultColor(i, sharedHeight));
    }
  }
  return next;
}

export function clampParams(p) {
  const next = { ...p };
  next.photoW = Math.max(8, Number(p.photoW) || 0);
  next.photoH = Math.max(8, Number(p.photoH) || 0);
  next.colorCount = Math.min(4, Math.max(2, Math.round(Number(p.colorCount) || 2)));
  next.mouldingWidth = Math.min(40, Math.max(4, Number(p.mouldingWidth) || 14));
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

  const src = Array.isArray(p.colors) ? p.colors : [];
  let colors = resizeColors(src, next.colorCount, next.sharedHeight).map((c, i) => {
    const sw =
      COLOR_SWATCHES.find((s) => s.id === c.swatch) || COLOR_SWATCHES[i % COLOR_SWATCHES.length];
    return {
      thickness: Math.min(80, Math.max(2, Number(c.thickness) || 14)),
      height: Math.min(40, Math.max(1, Number(c.height) || next.sharedHeight)),
      swatch: sw.id,
      hex: sw.hex,
    };
  });
  if (next.equalHeights) {
    colors = colors.map((c) => ({ ...c, height: next.sharedHeight }));
  } else {
    next.sharedHeight = colors[0]?.height ?? next.sharedHeight;
  }
  next.colors = colors;
  return next;
}

export function setSharedHeight(p, height) {
  const next = clampParams({ ...p, sharedHeight: height, equalHeights: true });
  next.colors = next.colors.map((c) => ({ ...c, height: next.sharedHeight }));
  return next;
}

export function setColorHeight(p, index, height) {
  const next = clampParams({ ...p, equalHeights: false });
  if (index < 0 || index >= next.colors.length) return next;
  const colors = next.colors.map((c, i) =>
    i === index ? { ...c, height: Math.min(40, Math.max(1, Number(height) || 1)) } : c
  );
  next.colors = colors;
  next.sharedHeight = colors[0].height;
  return next;
}

export function setColorThickness(p, index, thickness) {
  const next = clampParams(p);
  if (index < 0 || index >= next.colors.length) return next;
  next.colors = next.colors.map((c, i) =>
    i === index ? { ...c, thickness: Math.min(80, Math.max(2, Number(thickness) || 2)) } : c
  );
  return next;
}

export function setColorCount(p, count) {
  return clampParams({ ...p, colorCount: count });
}

export function setColorSwatch(p, index, swatchId) {
  const next = clampParams(p);
  if (index < 0 || index >= next.colors.length) return next;
  const sw = COLOR_SWATCHES.find((s) => s.id === swatchId) || COLOR_SWATCHES[0];
  next.colors = next.colors.map((c, i) =>
    i === index ? { ...c, swatch: sw.id, hex: sw.hex } : c
  );
  return next;
}

/**
 * Path around the frame: top (full outer width, includes corners) → right (inner height) →
 * bottom (full) → left (inner height). Matches a rectangular ring without double-counting corners.
 */
export function pathSides(opening, mouldingWidth) {
  const mw = mouldingWidth;
  const innerW = opening.w;
  const innerH = opening.h;
  const outerW = innerW + 2 * mw;
  const outerH = innerH + 2 * mw;
  return [
    {
      id: "top",
      len: outerW,
      box(u0, u1) {
        return {
          minX: -outerW / 2 + u0,
          maxX: -outerW / 2 + u1,
          minY: innerH / 2,
          maxY: outerH / 2,
        };
      },
    },
    {
      id: "right",
      len: innerH,
      box(u0, u1) {
        return {
          minX: innerW / 2,
          maxX: outerW / 2,
          minY: innerH / 2 - u1,
          maxY: innerH / 2 - u0,
        };
      },
    },
    {
      id: "bottom",
      len: outerW,
      box(u0, u1) {
        return {
          minX: outerW / 2 - u1,
          maxX: outerW / 2 - u0,
          minY: -outerH / 2,
          maxY: -innerH / 2,
        };
      },
    },
    {
      id: "left",
      len: innerH,
      box(u0, u1) {
        return {
          minX: -outerW / 2,
          maxX: -innerW / 2,
          minY: -innerH / 2 + u0,
          maxY: -innerH / 2 + u1,
        };
      },
    },
  ];
}

export function pathLength(opening, mouldingWidth) {
  return pathSides(opening, mouldingWidth).reduce((a, s) => a + s.len, 0);
}

/** Axis-aligned boxes covering moulding for arc range [s0, s1) along the path. */
export function boxesForArc(s0, s1, opening, mouldingWidth) {
  const sides = pathSides(opening, mouldingWidth);
  const boxes = [];
  let cursor = 0;
  for (const side of sides) {
    const side0 = cursor;
    const side1 = cursor + side.len;
    const a = Math.max(s0, side0);
    const b = Math.min(s1, side1);
    if (b - a > 1e-6) {
      const u0 = a - side0;
      const u1 = b - side0;
      const r = side.box(u0, u1);
      const w = r.maxX - r.minX;
      const h = r.maxY - r.minY;
      if (w > 1e-6 && h > 1e-6) {
        boxes.push({
          side: side.id,
          minX: r.minX,
          maxX: r.maxX,
          minY: r.minY,
          maxY: r.maxY,
          cx: (r.minX + r.maxX) / 2,
          cy: (r.minY + r.maxY) / 2,
          w,
          h,
        });
      }
    }
    cursor = side1;
  }
  return boxes;
}

/**
 * Layout alternating path stripes. Pattern thicknesses are scaled slightly so an
 * integer number of repeats closes exactly around the frame loop.
 */
export function layoutStripes(p) {
  const params = clampParams(p);
  const opening = {
    w: params.photoW - 2 * params.lip,
    h: params.photoH - 2 * params.lip,
  };
  const mw = params.mouldingWidth;
  const outer = { w: opening.w + 2 * mw, h: opening.h + 2 * mw };
  const L = pathLength(opening, mw);
  const patternLen = params.colors.reduce((a, c) => a + c.thickness, 0);
  const repeats = Math.max(1, Math.round(L / Math.max(patternLen, 1e-6)));
  const scale = L / (repeats * patternLen);

  const segments = [];
  let s = 0;
  for (let r = 0; r < repeats; r++) {
    for (let ci = 0; ci < params.colors.length; ci++) {
      const c = params.colors[ci];
      const len = c.thickness * scale;
      const s0 = s;
      const s1 = s + len;
      const boxes = boxesForArc(s0, s1, opening, mw).map((b) => ({
        ...b,
        height: c.height,
        colorIndex: ci,
        hex: c.hex,
      }));
      segments.push({
        id: `seg-${r}-${ci}`,
        repeat: r,
        colorIndex: ci,
        s0,
        s1,
        length: len,
        height: c.height,
        hex: c.hex,
        swatch: c.swatch,
        boxes,
      });
      s = s1;
    }
  }

  const maxHeight = Math.max(params.bedThickness, ...params.colors.map((c) => c.height));
  const warnings = [];
  if (opening.w <= 2 || opening.h <= 2) {
    warnings.push("Lip is so large the photo window is almost closed.");
  }
  if (mw < 6) {
    warnings.push("Narrow moulding may be fragile — try 8 mm+.");
  }
  if (params.colors.some((c) => c.thickness < 4)) {
    warnings.push("Very thin color bands may be hard to print cleanly.");
  }

  return {
    params,
    opening,
    outer,
    mouldingWidth: mw,
    pathLength: L,
    patternLen: patternLen * scale,
    repeats,
    scale,
    segments,
    colors: params.colors,
    photo: { w: params.photoW, h: params.photoH },
    maxHeight,
    warnings,
  };
}

export function estimateVolumeMm3(layout) {
  let vol = 0;
  for (const seg of layout.segments) {
    for (const b of seg.boxes) {
      vol += b.w * b.h * seg.height;
    }
  }
  if (layout.params.bedThickness > 0) {
    const bedArea = layout.outer.w * layout.outer.h - layout.opening.w * layout.opening.h;
    vol += bedArea * layout.params.bedThickness * 0.25;
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
  const lift = Math.max(2.5, params.mouldingWidth - params.lip);
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
  const xs = poly.map((pt) => pt[0]);
  const ys = poly.map((pt) => pt[1]);
  return {
    minX: Math.min(...xs),
    maxX: Math.max(...xs),
    minY: Math.min(...ys),
    maxY: Math.max(...ys),
    w: Math.max(...xs) - Math.min(...xs),
    h: Math.max(...ys) - Math.min(...ys),
  };
}
