/** Path-stripe picture frame: alternating bands along the moulding loop. Units mm. */

export const APP_VERSION = "3 · Sep 20, 2026";
export const APP_VERSION_TAG = "v3";

/** Front-face edge finish modes. */
export const EDGE_MODES = [
  { id: "none", label: "None" },
  { id: "round", label: "Round" },
  { id: "chamfer", label: "Chamfer" },
];

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
    outerCornerRadius: 0,
    insideEdgeMode: "none",
    insideEdgeSize: 1.5,
    outsideEdgeMode: "none",
    outsideEdgeSize: 1.5,
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

  const maxHeight = Math.max(next.sharedHeight, ...next.colors.map((c) => c.height));
  const maxCorner = Math.min(next.mouldingWidth, Math.min(next.photoW, next.photoH) / 2);
  next.outerCornerRadius = Math.min(maxCorner, Math.max(0, Number(p.outerCornerRadius) || 0));
  next.insideEdgeMode = normalizeEdgeMode(p.insideEdgeMode);
  next.outsideEdgeMode = normalizeEdgeMode(p.outsideEdgeMode);
  const maxEdge = Math.min(next.mouldingWidth * 0.45, maxHeight * 0.45, 12);
  next.insideEdgeSize =
    next.insideEdgeMode === "none"
      ? Math.min(maxEdge, Math.max(0, Number(p.insideEdgeSize) || 0))
      : Math.min(maxEdge, Math.max(0.4, Number(p.insideEdgeSize) || 1.5));
  next.outsideEdgeSize =
    next.outsideEdgeMode === "none"
      ? Math.min(maxEdge, Math.max(0, Number(p.outsideEdgeSize) || 0))
      : Math.min(maxEdge, Math.max(0.4, Number(p.outsideEdgeSize) || 1.5));
  if (next.insideEdgeMode !== "none" && next.outsideEdgeMode !== "none") {
    const sum = next.insideEdgeSize + next.outsideEdgeSize;
    if (sum > next.mouldingWidth - 1) {
      const scale = (next.mouldingWidth - 1) / sum;
      next.insideEdgeSize *= scale;
      next.outsideEdgeSize *= scale;
    }
  }
  return next;
}

function normalizeEdgeMode(mode) {
  const id = String(mode || "none").toLowerCase();
  if (id === "round" || id === "chamfer") return id;
  return "none";
}

/** Effective finish sizes (0 when mode is none). */
export function edgeFinishSizes(p) {
  const params = clampParams(p);
  return {
    outerCornerRadius: params.outerCornerRadius,
    inside:
      params.insideEdgeMode === "none"
        ? { mode: "none", size: 0 }
        : { mode: params.insideEdgeMode, size: params.insideEdgeSize },
    outside:
      params.outsideEdgeMode === "none"
        ? { mode: "none", size: 0 }
        : { mode: params.outsideEdgeMode, size: params.outsideEdgeSize },
  };
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
 * When outerCornerR > 0, horizontal ends are shortened by R and corner arcs are inserted so the
 * outer perimeter follows a rounded rectangle (inner opening stays sharp).
 */
export function pathSides(opening, mouldingWidth, outerCornerR = 0) {
  const mw = mouldingWidth;
  const innerW = opening.w;
  const innerH = opening.h;
  const outerW = innerW + 2 * mw;
  const outerH = innerH + 2 * mw;
  const R = Math.min(Math.max(0, outerCornerR), mw);

  if (R < 1e-6) {
    return [
      {
        id: "top",
        len: outerW,
        kind: "box",
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
        kind: "box",
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
        kind: "box",
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
        kind: "box",
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

  const arcLen = (Math.PI / 2) * R;
  const makeArc = (id, cx, cy, a0, a1) => ({
    id,
    len: arcLen,
    kind: "arc",
    cx,
    cy,
    rOuter: R,
    a0,
    a1,
    /** Approximate the arc sector with wedge AABBs for preview; export uses finish cutters. */
    box(u0, u1) {
      const t0 = u0 / arcLen;
      const t1 = u1 / arcLen;
      const mid = (t0 + t1) / 2;
      const a = a0 + (a1 - a0) * mid;
      const span = Math.abs(a1 - a0) * Math.max(t1 - t0, 0.02);
      const rMid = R * 0.55;
      const px = cx + rMid * Math.cos(a);
      const py = cy + rMid * Math.sin(a);
      const w = Math.max(mw * 0.85, R * span * 1.1);
      const h = Math.max(mw * 0.85, R * span * 1.1);
      return {
        minX: px - w / 2,
        maxX: px + w / 2,
        minY: py - h / 2,
        maxY: py + h / 2,
      };
    },
  });

  return [
    {
      id: "top",
      len: outerW - 2 * R,
      kind: "box",
      box(u0, u1) {
        return {
          minX: -outerW / 2 + R + u0,
          maxX: -outerW / 2 + R + u1,
          minY: innerH / 2,
          maxY: outerH / 2,
        };
      },
    },
    // Clockwise: top→right turns through TR outer arc (π/2 → 0)
    makeArc("tr", outerW / 2 - R, outerH / 2 - R, Math.PI / 2, 0),
    {
      id: "right",
      len: outerH - 2 * R,
      kind: "box",
      box(u0, u1) {
        return {
          minX: innerW / 2,
          maxX: outerW / 2,
          minY: outerH / 2 - R - u1,
          maxY: outerH / 2 - R - u0,
        };
      },
    },
    makeArc("br", outerW / 2 - R, -outerH / 2 + R, 0, -Math.PI / 2),
    {
      id: "bottom",
      len: outerW - 2 * R,
      kind: "box",
      box(u0, u1) {
        return {
          minX: outerW / 2 - R - u1,
          maxX: outerW / 2 - R - u0,
          minY: -outerH / 2,
          maxY: -innerH / 2,
        };
      },
    },
    makeArc("bl", -outerW / 2 + R, -outerH / 2 + R, -Math.PI / 2, -Math.PI),
    {
      id: "left",
      len: outerH - 2 * R,
      kind: "box",
      box(u0, u1) {
        return {
          minX: -outerW / 2,
          maxX: -innerW / 2,
          minY: -outerH / 2 + R + u0,
          maxY: -outerH / 2 + R + u1,
        };
      },
    },
    makeArc("tl", -outerW / 2 + R, outerH / 2 - R, Math.PI, Math.PI / 2),
  ];
}

export function pathLength(opening, mouldingWidth, outerCornerR = 0) {
  return pathSides(opening, mouldingWidth, outerCornerR).reduce((a, s) => a + s.len, 0);
}

/** Axis-aligned boxes covering moulding for arc range [s0, s1) along the path. */
export function boxesForArc(s0, s1, opening, mouldingWidth, outerCornerR = 0) {
  const sides = pathSides(opening, mouldingWidth, outerCornerR);
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
          kind: side.kind || "box",
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
  const cornerR = params.outerCornerRadius;
  const L = pathLength(opening, mw, cornerR);
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
      const boxes = boxesForArc(s0, s1, opening, mw, cornerR).map((b) => ({
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
  if (cornerR > mw * 0.85) {
    warnings.push("Large outer corner radius nearly fills the moulding width.");
  }
  const edgeSum =
    (params.insideEdgeMode === "none" ? 0 : params.insideEdgeSize) +
    (params.outsideEdgeMode === "none" ? 0 : params.outsideEdgeSize);
  if (edgeSum > mw * 0.7) {
    warnings.push("Inside + outside edge finishes are large relative to moulding width.");
  }

  return {
    params,
    opening,
    outer,
    mouldingWidth: mw,
    outerCornerRadius: cornerR,
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

/**
 * Outer perimeter as a closed polygon (CCW), with optional rounded corners.
 * `segmentsPerCorner` controls arc tessellation when radius > 0.
 */
export function outerPerimeterPoly(outerW, outerH, cornerRadius, segmentsPerCorner = 10) {
  const hw = outerW / 2;
  const hh = outerH / 2;
  const R = Math.min(Math.max(0, cornerRadius), hw, hh);
  if (R < 1e-6) {
    return ensureCcw([
      [-hw, -hh],
      [hw, -hh],
      [hw, hh],
      [-hw, hh],
    ]);
  }
  const pts = [];
  const corners = [
    { cx: hw - R, cy: hh - R, a0: 0, a1: Math.PI / 2 },
    { cx: -hw + R, cy: hh - R, a0: Math.PI / 2, a1: Math.PI },
    { cx: -hw + R, cy: -hh + R, a0: Math.PI, a1: (3 * Math.PI) / 2 },
    { cx: hw - R, cy: -hh + R, a0: (3 * Math.PI) / 2, a1: 2 * Math.PI },
  ];
  for (const c of corners) {
    for (let i = 0; i <= segmentsPerCorner; i++) {
      const t = i / segmentsPerCorner;
      const a = c.a0 + (c.a1 - c.a0) * t;
      pts.push([c.cx + R * Math.cos(a), c.cy + R * Math.sin(a)]);
    }
  }
  return ensureCcw(pts);
}

/** Straight edge runs used for front-face finish cutters / preview wedges. */
export function frontEdgeRuns(layout) {
  const { outer, opening, params } = layout;
  const R = params.outerCornerRadius;
  const ox = outer.w / 2;
  const oy = outer.h / 2;
  const ix = opening.w / 2;
  const iy = opening.h / 2;
  const trim = Math.max(R, 0);
  return {
    outside: [
      { id: "out-top", axis: "x", y: oy, x0: -ox + trim, x1: ox - trim },
      { id: "out-bottom", axis: "x", y: -oy, x0: -ox + trim, x1: ox - trim },
      { id: "out-right", axis: "y", x: ox, y0: -oy + trim, y1: oy - trim },
      { id: "out-left", axis: "y", x: -ox, y0: -oy + trim, y1: oy - trim },
    ],
    inside: [
      { id: "in-top", axis: "x", y: iy, x0: -ix, x1: ix },
      { id: "in-bottom", axis: "x", y: -iy, x0: -ix, x1: ix },
      { id: "in-right", axis: "y", x: ix, y0: -iy, y1: iy },
      { id: "in-left", axis: "y", x: -ix, y0: -iy, y1: iy },
    ],
  };
}
