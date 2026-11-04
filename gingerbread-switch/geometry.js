/**
 * US single- and double-gang toggle plates. The house is a relief on that plate:
 * thicker than the plate, and wider, so it stands off the wall and spills past the
 * rectangle. Screws stay on real switch spacing. Toggle(s) come out the door(s).
 */

export const APP_VERSION = "2 · Nov 4, 2026";
export const APP_VERSION_TAG = "v2";
export const APP_NAME = "Gingerbread switch";

/** Standard 1-gang device-mount plate (2.75" × 4.5"). */
export const PLATE_W = 69.85;
/** Standard height for 1- and 2-gang plates (4.5"). */
export const PLATE_H = 114.3;
/** Standard 2-gang device-mount plate width (4.5625"). */
export const PLATE_W_2G = 115.8875;
/** Horizontal center-to-center between gangs on multi-gang device-mount plates. */
export const DOUBLE_GANG = 46.0;
export const PLATE_R = 6.2;
export const TOGGLE_SCREW = 60.325;
export const ROCKER_SCREW = 96.825;
export const SCREW_D = 4.4;
export const SCREW_BORE = 9;
/** Plastic left under the screw head so a 1/2 in plate screw still reaches. */
export const SCREW_STOCK = 4;

/**
 * Reference decorative ghost toggle (Ginger_Bread_-_Toggle_ca39.stl), mm.
 * Used to keep double-gang width/overhang in the same proportions as the upload.
 */
export const REFERENCE_STL_BBOX = Object.freeze({
  minX: -37.974,
  minY: -33.281,
  minZ: 0,
  maxX: 109.126,
  maxY: 156.051,
  maxZ: 5.0,
  sizeX: 147.1,
  sizeY: 189.331,
  sizeZ: 5.0,
  centerX: 35.576,
  centerY: 61.385,
});

export const PRESETS = {
  toggle: { style: "toggle", openingW: 14, openingH: 32 },
  "double-toggle": { style: "double-toggle", openingW: 14, openingH: 32 },
  rocker: { style: "rocker", openingW: 33.4, openingH: 66.8 },
};

export const DEFAULT_PARAMS = Object.freeze({
  ...PRESETS.toggle,
  depth: 9.5,
  overhang: 16,
  plateT: 3.2,
});

export const SLIDERS = [
  { key: "openingW", min: 11, max: 40, step: 0.5, unit: "mm" },
  { key: "openingH", min: 24, max: 74, step: 0.5, unit: "mm" },
  { key: "depth", min: 6, max: 16, step: 0.5, unit: "mm" },
  { key: "overhang", min: 8, max: 26, step: 0.5, unit: "mm" },
  { key: "plateT", min: 2.6, max: 4.5, step: 0.1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function normalizeStyle(raw) {
  if (raw === "rocker") return "rocker";
  if (raw === "double-toggle") return "double-toggle";
  return "toggle";
}

export function plateDimensions(style) {
  if (style === "double-toggle") return { w: PLATE_W_2G, h: PLATE_H };
  return { w: PLATE_W, h: PLATE_H };
}

export function screwSpan(style) {
  return style === "rocker" ? ROCKER_SCREW : TOGGLE_SCREW;
}

export function screwPositions(p) {
  const screwY = screwSpan(p.style) / 2;
  if (p.style === "double-toggle") {
    const hx = DOUBLE_GANG / 2;
    return [
      [-hx, screwY],
      [-hx, -screwY],
      [hx, screwY],
      [hx, -screwY],
    ];
  }
  return [
    [0, screwY],
    [0, -screwY],
  ];
}

export function toggleCenters(p) {
  if (p.style === "double-toggle") return [-DOUBLE_GANG / 2, DOUBLE_GANG / 2];
  return [0];
}

export function clampParams(raw) {
  const style = normalizeStyle(raw?.style);
  const spec = Object.fromEntries(SLIDERS.map((s) => [s.key, s]));
  const num = (key, fallback) => {
    const s = spec[key];
    const v = Number(raw?.[key]);
    return clamp(Number.isFinite(v) ? v : fallback, s.min, s.max);
  };
  let openingW = num("openingW", DEFAULT_PARAMS.openingW);
  let openingH = num("openingH", DEFAULT_PARAMS.openingH);
  const screwY = screwSpan(style) / 2;
  const maxH = Math.max(openingW + 4, 2 * (screwY - 9));
  openingH = clamp(openingH, Math.min(openingW + 4, maxH), maxH);
  return {
    style,
    openingW,
    openingH,
    depth: num("depth", DEFAULT_PARAMS.depth),
    overhang: num("overhang", DEFAULT_PARAMS.overhang),
    plateT: num("plateT", DEFAULT_PARAMS.plateT),
  };
}

export function mergeParams(raw) {
  return clampParams({ ...DEFAULT_PARAMS, ...raw });
}

export function applySliderChange(prev, key, value) {
  return clampParams({ ...prev, [key]: value });
}

export function derive(raw) {
  const p = clampParams(raw);
  const { w: plateW, h: plateH } = plateDimensions(p.style);
  const plateHW = plateW / 2;
  const plateHH = plateH / 2;
  const screwY = screwSpan(p.style) / 2;
  const rocker = p.style === "rocker";
  const isDouble = p.style === "double-toggle";
  const toggles = toggleCenters(p);
  const screws = screwPositions(p);
  const eaveY = rocker ? p.openingH / 2 + 6 : 14;
  const wallBottom = rocker ? Math.max(-plateHH + 10, -p.openingH / 2 - 8) : -22;
  const peakY = Math.min(plateHH - 4, eaveY + (rocker ? 18 : 36));
  const eaveX = plateHW + p.overhang;
  const wallHW = plateHW - 3;
  const wallFront = p.depth;
  const roofExtra = Math.max(2.2, p.depth * 0.28);
  const roofFront = wallFront + roofExtra;
  const chimZ = wallFront + 4;
  const showWindows = !rocker && p.openingW < 22 && !isDouble;
  return {
    p,
    plateW,
    plateH,
    plateHW,
    plateHH,
    screwY,
    toggles,
    screws,
    eaveY,
    wallBottom,
    peakY,
    eaveX,
    wallHW,
    wallFront,
    roofFront,
    chimZ,
    showWindows,
    roof: [
      [-eaveX, eaveY],
      [eaveX, eaveY],
      [0, peakY],
    ],
    chimney: { x0: plateHW - 2, x1: plateHW + 12, y0: peakY - 30, y1: plateHH + 6 },
  };
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  const recess = Math.max(0, d.wallFront - SCREW_STOCK);
  if (recess > 6) {
    notes.push(
      `The upper screw sits in a ${recess.toFixed(0)} mm recess so a standard plate screw still reaches the switch. A longer bit helps if the well feels tight.`
    );
  }
  if (d.p.style === "toggle" && d.p.openingH < 28) {
    notes.push("A short door can pinch the toggle. 32 mm of height lets it travel.");
  }
  if (d.p.style === "double-toggle" && d.p.openingH < 28) {
    notes.push("Both toggle doors want about 32 mm of height so the levers travel freely.");
  }
  if (d.p.style === "double-toggle") {
    notes.push(
      `Double toggle plate ${d.plateW.toFixed(1)} × ${d.plateH.toFixed(1)} mm · gang centers ${DOUBLE_GANG.toFixed(1)} mm apart · four screw holes on ${TOGGLE_SCREW.toFixed(1)} mm vertical spacing per switch.`
    );
  }
  if (d.p.style === "rocker" && d.p.openingH < 64) {
    notes.push("A Decora rocker wants about 67 mm of opening, with screws 96.8 mm apart.");
  }
  return notes;
}
