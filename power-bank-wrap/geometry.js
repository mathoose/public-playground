/** SYJ-F37F slide-on sleeve — wrap around the band, not toward USB. */

export const APP_VERSION = "7.1 · Oct 6, 2026";
export const APP_VERSION_TAG = "v7.1";
export const APP_NAME = "Power bank wrap";

export const PRESETS = {
  syj: {
    label: "SYJ-F37F",
    bankW: 68,
    bankH: 16,
    bankR: 8,
    clearXY: 0.4,
    clearZ: 0.35,
  },
  j159: {
    label: "HOCO J159",
    bankW: 68,
    bankH: 16,
    bankR: 8,
    clearXY: 0.5,
    clearZ: 0.4,
  },
  loose: {
    label: "Loose fit",
    bankW: 68,
    bankH: 16,
    bankR: 8,
    clearXY: 0.7,
    clearZ: 0.55,
    taper: 0.25,
  },
};

export const DEFAULT_PARAMS = Object.freeze({
  bankL: 143,
  bankW: 68,
  bankH: 16,
  bankR: 8,
  clearXY: 0.4,
  clearZ: 0.35,
  taper: 0.4,
  sleeveLen: 72,
  wall: 2.2,
  wrapStick: 7,
  wrapLane: 17,
  wrapGap: 12,
  wrapFlange: 2.2,
  wrapInset: 6,
  slotOn: 0,
  slotH: 9,
  cordD: 3.6,
  clipCount: 4,
  clipSpacing: 58,
  clipFillet: 2.4,
});

export const SLIDERS = [
  { key: "bankL", min: 90, max: 180, step: 0.5, unit: "mm" },
  { key: "bankW", min: 48, max: 90, step: 0.1, unit: "mm" },
  { key: "bankH", min: 12, max: 28, step: 0.1, unit: "mm" },
  { key: "bankR", min: 2, max: 14, step: 0.1, unit: "mm" },
  { key: "clearXY", min: 0.1, max: 1.2, step: 0.05, unit: "mm" },
  { key: "clearZ", min: 0.1, max: 1.2, step: 0.05, unit: "mm" },
  { key: "taper", min: 0, max: 1.2, step: 0.05, unit: "mm" },
  { key: "sleeveLen", min: 28, max: 140, step: 0.5, unit: "mm" },
  { key: "wall", min: 1.6, max: 3.6, step: 0.1, unit: "mm" },
  { key: "wrapStick", min: 4, max: 14, step: 0.1, unit: "mm" },
  { key: "wrapLane", min: 8, max: 28, step: 0.1, unit: "mm" },
  { key: "wrapGap", min: 6, max: 40, step: 0.5, unit: "mm" },
  { key: "wrapFlange", min: 1.4, max: 4.5, step: 0.1, unit: "mm" },
  { key: "wrapInset", min: 2, max: 24, step: 0.5, unit: "mm" },
  { key: "slotOn", min: 0, max: 1, step: 1, unit: "" },
  { key: "slotH", min: 5, max: 14, step: 0.1, unit: "mm" },
  { key: "cordD", min: 2.4, max: 6, step: 0.1, unit: "mm" },
  { key: "clipCount", min: 0, max: 4, step: 2, unit: "" },
  { key: "clipSpacing", min: 14, max: 70, step: 0.5, unit: "mm" },
  { key: "clipFillet", min: 0.8, max: 5, step: 0.1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function mergeParams(overrides = {}) {
  return clampParams({ ...DEFAULT_PARAMS, ...overrides });
}

export function applyPreset(name) {
  const preset = PRESETS[name];
  if (!preset) return mergeParams();
  const next = { ...DEFAULT_PARAMS };
  for (const [k, v] of Object.entries(preset)) {
    if (k === "label") continue;
    next[k] = v;
  }
  return clampParams(next);
}

export function applySliderChange(prev, key, value) {
  return clampParams({ ...prev, [key]: value });
}

export function clampParams(raw = {}) {
  const p = { ...DEFAULT_PARAMS, ...raw };
  for (const s of SLIDERS) {
    let v = Number(p[s.key]);
    if (!Number.isFinite(v)) v = DEFAULT_PARAMS[s.key];
    v = clamp(v, s.min, s.max);
    const decimals = s.step >= 1 ? 0 : (String(s.step).split(".")[1] || "").length;
    p[s.key] = Number(v.toFixed(decimals));
  }
  p.slotOn = p.slotOn >= 0.5 ? 1 : 0;
  p.clipCount = p.clipCount >= 3 ? 4 : p.clipCount >= 1 ? 2 : 0;
  const minSpace = Number((2 * (p.cordD / 2 + 1.3 + p.clipFillet) + 2.4).toFixed(1));
  if (p.clipSpacing < minSpace) p.clipSpacing = Number(clamp(minSpace, 14, 70).toFixed(1));
  const maxTaper = Math.min(p.clearXY + 0.35, p.clearZ + 0.35, p.bankW / 8, p.bankH / 4);
  if (p.taper > maxTaper) p.taper = Number(Math.max(0, maxTaper).toFixed(2));
  const maxSlot = p.bankH + 2 * p.clearZ - 1.2;
  if (p.slotH > maxSlot) p.slotH = Number(Math.max(5, maxSlot).toFixed(1));
  const need = 2 * p.wrapLane + p.wrapGap + 2 * p.wrapInset;
  if (need > p.sleeveLen) {
    p.sleeveLen = Number(clamp(need, 28, 140).toFixed(1));
  }
  if (2 * p.wrapLane + p.wrapGap + 2 * p.wrapInset > p.sleeveLen) {
    p.wrapGap = Number(Math.max(6, p.sleeveLen - 2 * p.wrapLane - 2 * p.wrapInset).toFixed(1));
  }
  if (p.wrapFlange * 2 + 3.2 > p.wrapLane) {
    p.wrapFlange = Number(Math.max(1.4, (p.wrapLane - 3.2) / 2).toFixed(1));
  }
  return p;
}

function minClipSpan(rootR) {
  return 2 * rootR + 2.4;
}

function snapXToInsets(x, wrapX0, wrapX3, pad, sleeveLen, fallback) {
  const bands = [
    [pad, wrapX0 - pad],
    [wrapX3 + pad, sleeveLen - pad],
  ].filter(([a, b]) => b - a >= 0.2);
  if (!bands.length) return Number(fallback.toFixed(2));
  let best = fallback;
  let bestDist = Infinity;
  for (const [a, b] of bands) {
    const c = clamp(x, a, b);
    const dist = Math.abs(c - x);
    if (dist < bestDist) {
      bestDist = dist;
      best = c;
    }
  }
  return Number(best.toFixed(2));
}

function buildClipPlacements({ count, clipXA, clipXB, clipMidX, y, zWallB, zWallT, zHoleB, zHoleT }) {
  if (count <= 0) return [];
  const xs = count >= 4 ? [clipXA, clipXB] : [clipMidX];
  const out = [];
  for (const x of xs) {
    out.push({
      x,
      y,
      face: "bottom",
      outward: -1,
      zWall: zWallB,
      zHole: zHoleB,
    });
    out.push({
      x,
      y,
      face: "top",
      outward: 1,
      zWall: zWallT,
      zHole: zHoleT,
    });
  }
  return out;
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const innerW0 = p.bankW + 2 * p.clearXY;
  const innerH0 = p.bankH + 2 * p.clearZ;
  const innerW1 = Math.max(8, innerW0 - 2 * p.taper);
  const innerH1 = Math.max(6, innerH0 - 2 * p.taper);
  const bodyW = innerW0 + 2 * p.wall;
  const bodyH = innerH0 + 2 * p.wall;
  const outerW = bodyW + 2 * p.wrapStick;
  const outerH = bodyH + 2 * p.wrapStick;
  const innerR0 = Math.min(p.bankR, innerW0 / 2 - 0.4, innerH0 / 2 - 0.4);
  const innerR1 = Math.min(p.bankR - p.taper * 0.3, innerW1 / 2 - 0.4, innerH1 / 2 - 0.4);
  const outerR = Math.max(innerR0 + p.wall * 0.7, 1.2);
  const wrapSpan = 2 * p.wrapLane + p.wrapGap;
  const wrapX0 = Math.max(p.wrapInset, (p.sleeveLen - wrapSpan) / 2);
  const wrapX1 = wrapX0 + p.wrapLane;
  const wrapX2 = wrapX1 + p.wrapGap;
  const wrapX3 = wrapX2 + p.wrapLane;
  const wrapSpacing = p.wrapLane + p.wrapGap;
  const holeY0 = p.wrapStick + p.wall;
  const holeZ0 = p.wrapStick + p.wall;
  const bankX0 = p.sleeveLen - p.bankL;
  const bankY0 = holeY0 + p.clearXY;
  const bankZ0 = holeZ0 + p.clearZ;
  const zMid = holeZ0 + innerH0 / 2;
  const cy = outerW / 2;
  const cz = outerH / 2;
  const clipWall = 1.3;
  const clipHoleR = p.cordD / 2;
  const clipOuterR = clipHoleR + clipWall;
  const clipFillet = p.clipFillet;
  const clipRootR = clipOuterR + clipFillet;
  const clipWidth = clipRootR * 2;
  const clipLen = Math.max(6.4, p.cordD + 4.8);
  const clipH = clipOuterR * 2;
  const clipOverlap = 1.2;
  const clipHang = clipOuterR + 0.35;
  const zWallB = p.wrapStick;
  const zWallT = p.wrapStick + bodyH;
  const zHoleB = zWallB - clipHang;
  const zHoleT = zWallT + clipHang;
  const mouthExtra = 2.2;
  const zMin = p.clipCount ? zHoleB - clipOuterR - mouthExtra : 0;
  const zMax = p.clipCount ? zHoleT + clipOuterR + mouthExtra : outerH;
  const clipDepth = p.clipCount ? Math.max(0, -zMin, zMax - outerH) : 0;
  const bboxW = outerW;
  const bboxH = outerH + 2 * clipDepth;
  const lanePad = clipOuterR + 0.8;
  const insetA = Number(clamp(wrapX0 / 2, lanePad, Math.max(lanePad, wrapX0 - lanePad)).toFixed(2));
  const insetB = Number(
    clamp((wrapX3 + p.sleeveLen) / 2, wrapX3 + lanePad, p.sleeveLen - lanePad).toFixed(2)
  );
  const midX = p.sleeveLen / 2;
  let clipXA = Number((midX - p.clipSpacing / 2).toFixed(2));
  let clipXB = Number((midX + p.clipSpacing / 2).toFixed(2));
  clipXA = snapXToInsets(clipXA, wrapX0, wrapX3, lanePad, p.sleeveLen, insetA);
  clipXB = snapXToInsets(clipXB, wrapX0, wrapX3, lanePad, p.sleeveLen, insetB);
  if (p.clipCount >= 4 && clipXB - clipXA < minClipSpan(clipRootR)) {
    clipXA = insetA;
    clipXB = insetB;
  }
  const clipMidX = Number(((clipXA + clipXB) / 2).toFixed(2));
  const clips = buildClipPlacements({
    count: p.clipCount,
    clipXA,
    clipXB,
    clipMidX,
    y: cy,
    zWallB,
    zWallT,
    zHoleB,
    zHoleT,
  });
  const beltMidA = wrapX0 + p.wrapLane / 2;
  const beltMidB = wrapX2 + p.wrapLane / 2;
  const grip = Math.max(1.15, p.cordD * 0.58);
  return {
    p,
    innerW0,
    innerH0,
    innerW1,
    innerH1,
    bodyW,
    bodyH,
    outerW,
    outerH,
    innerR0: Math.max(0.4, innerR0),
    innerR1: Math.max(0.4, innerR1),
    outerR,
    wrapX0,
    wrapX1,
    wrapX2,
    wrapX3,
    wrapSpacing,
    holeY0,
    holeZ0,
    bankX0,
    bankY0,
    bankZ0,
    zMid,
    cy,
    cz,
    clipXA,
    clipXB,
    clipMidX,
    clipLen,
    clipWidth,
    clipH,
    clipWall,
    clipHoleR,
    clipOuterR,
    clipFillet,
    clipRootR,
    clipOverlap,
    clipHang,
    zWallB,
    zWallT,
    zHoleB,
    zHoleT,
    clips,
    beltMidA,
    beltMidB,
    grip,
    clipDepth,
    bboxW,
    bboxH,
    totalL: p.sleeveLen,
  };
}

export function warnings(raw = {}) {
  const d = derive(raw);
  const p = d.p;
  const notes = [];
  if (d.innerW1 < p.bankW - 0.15) {
    notes.push("Tight end is narrower than the bank — PETG will flex; PLA may crack or not slide on.");
  }
  if (d.innerH1 < p.bankH - 0.15) {
    notes.push("Tight end is thinner than the bank — ease the taper if it won’t start.");
  }
  if (p.taper < 0.15) notes.push("Taper is almost none — the sleeve may slide off.");
  if (p.sleeveLen > p.bankL - 28) {
    notes.push("Sleeve is long — USB-end LEDs/button may sit under the band.");
  }
  if (p.wrapStick < 5) notes.push("Wrap channels are shallow — cable may slip out.");
  if (p.cordD > 5.2) notes.push("Cord clips are sized for a fat cable — check they still snap.");
  if (d.outerW > 160 || d.outerH > 160) notes.push("Overall size is over 160 mm — check the A150 bed.");
  return notes;
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const d = Number.isInteger(v) ? 0 : digits;
  return `${v.toFixed(d)} mm`;
}
