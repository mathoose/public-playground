/** SYJ-F37F slide-on cord-wrap sleeve (Anker 733–style band). */

export const APP_VERSION = "3 · Oct 5, 2026";
export const APP_VERSION_TAG = "v3";
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
  wrapStick: 9,
  wrapLen: 64,
  wrapFlange: 2.4,
  wrapInset: 4,
  slotOn: 1,
  slotH: 9,
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
  { key: "wrapStick", min: 4, max: 16, step: 0.1, unit: "mm" },
  { key: "wrapLen", min: 18, max: 130, step: 0.5, unit: "mm" },
  { key: "wrapFlange", min: 1.4, max: 4.5, step: 0.1, unit: "mm" },
  { key: "wrapInset", min: 1, max: 20, step: 0.5, unit: "mm" },
  { key: "slotOn", min: 0, max: 1, step: 1, unit: "" },
  { key: "slotH", min: 5, max: 14, step: 0.1, unit: "mm" },
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
  const maxWrap = Math.max(18, p.sleeveLen - 2 * p.wrapInset);
  if (p.wrapLen > maxWrap) p.wrapLen = Number(maxWrap.toFixed(1));
  const maxTaper = Math.min(p.clearXY + 0.35, p.clearZ + 0.35, p.bankW / 8, p.bankH / 4);
  if (p.taper > maxTaper) p.taper = Number(Math.max(0, maxTaper).toFixed(2));
  const maxSlot = p.bankH + 2 * p.clearZ - 1.2;
  if (p.slotH > maxSlot) p.slotH = Number(Math.max(5, maxSlot).toFixed(1));
  return p;
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const innerW0 = p.bankW + 2 * p.clearXY;
  const innerH0 = p.bankH + 2 * p.clearZ;
  const innerW1 = Math.max(8, innerW0 - 2 * p.taper);
  const innerH1 = Math.max(6, innerH0 - 2 * p.taper);
  const bodyW = innerW0 + 2 * p.wall;
  const outerW = bodyW + 2 * p.wrapStick;
  const outerH = innerH0 + 2 * p.wall;
  const innerR0 = Math.min(p.bankR, innerW0 / 2 - 0.4, innerH0 / 2 - 0.4);
  const innerR1 = Math.min(p.bankR - p.taper * 0.3, innerW1 / 2 - 0.4, innerH1 / 2 - 0.4);
  const outerR = Math.max(innerR0 + p.wall * 0.7, 1.2);
  const wrapX0 = Math.max(0.8, (p.sleeveLen - p.wrapLen) / 2);
  const wrapX1 = wrapX0 + p.wrapLen;
  const wrapSpacing = bodyW;
  const holeY0 = p.wrapStick + p.wall;
  const holeZ0 = p.wall;
  const bankX0 = p.sleeveLen - p.bankL;
  const bankY0 = holeY0 + p.clearXY;
  const bankZ0 = holeZ0 + p.clearZ;
  const zMid = holeZ0 + innerH0 / 2;
  const cy = outerW / 2;
  return {
    p,
    innerW0,
    innerH0,
    innerW1,
    innerH1,
    bodyW,
    outerW,
    outerH,
    innerR0: Math.max(0.4, innerR0),
    innerR1: Math.max(0.4, innerR1),
    outerR,
    wrapX0,
    wrapX1,
    wrapSpacing,
    holeY0,
    holeZ0,
    bankX0,
    bankY0,
    bankZ0,
    zMid,
    cy,
    totalL: p.sleeveLen,
  };
}

export function warnings(raw = {}) {
  const d = derive(raw);
  const p = d.p;
  const notes = [];
  const tightW = d.innerW1;
  const tightH = d.innerH1;
  if (tightW < p.bankW - 0.15) {
    notes.push("Tight end is narrower than the bank — PETG will flex; PLA may crack or not slide on.");
  }
  if (tightH < p.bankH - 0.15) {
    notes.push("Tight end is thinner than the bank — ease the taper if it won’t start.");
  }
  if (p.taper < 0.15) notes.push("Taper is almost none — the sleeve may slide off.");
  if (p.sleeveLen > p.bankL - 28) {
    notes.push("Sleeve is long — USB-end LEDs/button may sit under the band. Shorten it or keep side slots on.");
  }
  if (p.wrapStick < 6) notes.push("Wrap pockets are shallow — cable may slip out.");
  if (d.outerW > 160) notes.push("Overall width is over 160 mm — check the A150 bed.");
  return notes;
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const d = Number.isInteger(v) ? 0 : digits;
  return `${v.toFixed(d)} mm`;
}
