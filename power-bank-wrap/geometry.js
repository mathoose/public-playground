/** SYJ-F37F / HOCO J159 open tray + storage well + figure-8 wrap posts. */

export const APP_VERSION = "2 · Oct 5, 2026";
export const APP_VERSION_TAG = "v2";
export const APP_NAME = "Power bank wrap";

export const PRESETS = {
  syj: {
    label: "SYJ-F37F",
    bankL: 143,
    bankW: 68,
    bankH: 16,
    bankR: 8,
    clearXY: 0.45,
    clearZ: 0.35,
  },
  j159: {
    label: "HOCO J159",
    bankL: 143.5,
    bankW: 68,
    bankH: 16,
    bankR: 8,
    clearXY: 0.5,
    clearZ: 0.4,
  },
  loose: {
    label: "Loose fit",
    bankL: 143,
    bankW: 68,
    bankH: 16,
    bankR: 8,
    clearXY: 0.75,
    clearZ: 0.55,
    lip: 0.6,
  },
};

export const DEFAULT_PARAMS = Object.freeze({
  bankL: 143,
  bankW: 68,
  bankH: 16,
  bankR: 8,
  clearXY: 0.45,
  clearZ: 0.35,
  wall: 2.0,
  floor: 1.8,
  lip: 0.9,
  usbWindowW: 62,
  usbWindowH: 14,
  usbWindowR: 3.5,
  buttonFromUsb: 22,
  buttonW: 16,
  buttonH: 10,
  microFromUsb: 22,
  microW: 14,
  microH: 9,
  storeL: 45,
  storeW: 40,
  storeH: 30,
  wrapDeck: 48,
  postSpacing: 38,
  postStemD: 8,
  postHeadD: 14.5,
  postH: 12,
  postHeadH: 3.4,
  clipOn: 1,
  clipW: 13.2,
  clipOpening: 5.8,
  clipDepth: 14,
});

export const SLIDERS = [
  { key: "bankL", min: 120, max: 170, step: 0.1, unit: "mm" },
  { key: "bankW", min: 50, max: 90, step: 0.1, unit: "mm" },
  { key: "bankH", min: 12, max: 28, step: 0.1, unit: "mm" },
  { key: "bankR", min: 2, max: 14, step: 0.1, unit: "mm" },
  { key: "clearXY", min: 0.15, max: 1.2, step: 0.05, unit: "mm" },
  { key: "clearZ", min: 0.1, max: 1.2, step: 0.05, unit: "mm" },
  { key: "wall", min: 1.6, max: 3.6, step: 0.1, unit: "mm" },
  { key: "floor", min: 1.2, max: 3.2, step: 0.1, unit: "mm" },
  { key: "lip", min: 0, max: 1.8, step: 0.05, unit: "mm" },
  { key: "usbWindowW", min: 36, max: 80, step: 0.5, unit: "mm" },
  { key: "usbWindowH", min: 8, max: 22, step: 0.1, unit: "mm" },
  { key: "usbWindowR", min: 0.5, max: 8, step: 0.1, unit: "mm" },
  { key: "buttonFromUsb", min: 10, max: 50, step: 0.5, unit: "mm" },
  { key: "buttonW", min: 8, max: 24, step: 0.5, unit: "mm" },
  { key: "buttonH", min: 6, max: 14, step: 0.1, unit: "mm" },
  { key: "microFromUsb", min: 10, max: 50, step: 0.5, unit: "mm" },
  { key: "microW", min: 8, max: 22, step: 0.5, unit: "mm" },
  { key: "microH", min: 5, max: 14, step: 0.1, unit: "mm" },
  { key: "storeL", min: 20, max: 90, step: 0.5, unit: "mm" },
  { key: "storeW", min: 24, max: 80, step: 0.5, unit: "mm" },
  { key: "storeH", min: 16, max: 50, step: 0.5, unit: "mm" },
  { key: "wrapDeck", min: 28, max: 80, step: 0.5, unit: "mm" },
  { key: "postSpacing", min: 22, max: 58, step: 0.5, unit: "mm" },
  { key: "postStemD", min: 5, max: 12, step: 0.1, unit: "mm" },
  { key: "postHeadD", min: 8, max: 20, step: 0.1, unit: "mm" },
  { key: "postH", min: 8, max: 20, step: 0.1, unit: "mm" },
  { key: "postHeadH", min: 2, max: 6, step: 0.1, unit: "mm" },
  { key: "clipOn", min: 0, max: 1, step: 1, unit: "" },
  { key: "clipW", min: 10, max: 18, step: 0.1, unit: "mm" },
  { key: "clipOpening", min: 3.5, max: 8, step: 0.1, unit: "mm" },
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
  p.clipOn = p.clipOn >= 0.5 ? 1 : 0;
  if (p.postHeadD < p.postStemD + 1.5) p.postHeadD = Number((p.postStemD + 1.5).toFixed(1));
  const innerW = p.bankW + 2 * p.clearXY;
  const maxSpace = innerW - p.postHeadD - 2;
  if (p.postSpacing > maxSpace) p.postSpacing = Number(Math.max(22, maxSpace).toFixed(1));
  const maxUsbW = innerW - 1.2;
  if (p.usbWindowW > maxUsbW) p.usbWindowW = Number(Math.max(36, maxUsbW).toFixed(1));
  const maxUsbH = p.bankH + p.clearZ - 0.4;
  if (p.usbWindowH > maxUsbH) p.usbWindowH = Number(Math.max(8, maxUsbH).toFixed(1));
  const maxR = Math.min(p.usbWindowW, p.usbWindowH) / 2 - 0.2;
  if (p.usbWindowR > maxR) p.usbWindowR = Number(Math.max(0.5, maxR).toFixed(1));
  if (p.storeW > innerW - 1) p.storeW = Number(Math.max(24, innerW - 1).toFixed(1));
  return p;
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const innerL = p.bankL + 2 * p.clearXY;
  const innerW = p.bankW + 2 * p.clearXY;
  const cavityZ = p.bankH + p.clearZ;
  const nestOuterL = innerL + 2 * p.wall;
  const nestOuterW = innerW + 2 * p.wall;
  const baseZ = p.floor + cavityZ;
  const storeCavityZ = p.storeH;
  const storeBaseZ = p.floor + storeCavityZ;
  const storeX0 = nestOuterL;
  const storeY0 = (nestOuterW - p.storeW) / 2;
  const storeOuterEnd = storeX0 + p.storeL + p.wall;
  const deckX0 = storeOuterEnd;
  const totalL = deckX0 + p.wrapDeck;
  const innerR = Math.min(p.bankR, innerW / 2 - 0.4, innerL / 2 - 0.4);
  const outerR = Math.max(innerR, innerR + p.wall * 0.85);
  const bankX0 = p.wall + p.clearXY;
  const bankY0 = p.wall + p.clearXY;
  const zMid = p.floor + p.bankH / 2;
  const usbY0 = (nestOuterW - p.usbWindowW) / 2;
  const buttonX = bankX0 + p.buttonFromUsb;
  const microX = bankX0 + p.microFromUsb;
  const deckMidX = deckX0 + p.wrapDeck * 0.45;
  const postY0 = nestOuterW / 2 - p.postSpacing / 2;
  const postY1 = nestOuterW / 2 + p.postSpacing / 2;
  const flareH = Math.max(p.postHeadH, (p.postHeadD - p.postStemD) / 2);
  const stemH = Math.max(4, p.postH - flareH);
  const postTop = p.floor + stemH + flareH;
  const outerH = Math.max(baseZ, storeBaseZ, postTop);
  return {
    p,
    innerL,
    innerW,
    cavityZ,
    nestOuterL,
    nestOuterW,
    baseZ,
    storeCavityZ,
    storeBaseZ,
    storeX0,
    storeY0,
    storeOuterEnd,
    totalL,
    outerH,
    innerR: Math.max(0.4, innerR),
    outerR,
    bankX0,
    bankY0,
    zMid,
    usbY0,
    buttonX,
    microX,
    deckX0,
    deckMidX,
    postY0,
    postY1,
    flareH,
    stemH,
    postTop,
  };
}

export function warnings(raw = {}) {
  const d = derive(raw);
  const p = d.p;
  const notes = [];
  if (p.lip > p.clearXY + 0.3) notes.push("Lip is tighter than XY clearance — PETG will flex; PLA may crack.");
  if (p.clearXY < 0.3) notes.push("Fit is tight — sand or raise XY clearance if the bank won’t drop in.");
  if (p.postSpacing < 28) notes.push("Posts are close — figure-8 wraps will stack tall.");
  if (p.wrapDeck < 36) notes.push("Wrap porch is short — leave room for the plug clip.");
  if (p.clipOn && p.clipOpening > 7) notes.push("Plug clip opening is wide — the USB body may slip out.");
  if (p.storeH < 22) notes.push("Storage is shorter than a typical 20 W USB-C wall plug (~28–30 mm).");
  if (d.totalL > 250) notes.push("Overall length is over 250 mm — check bed size (Snapmaker 350 is 320×350; 250 bed is 230×250).");
  return notes;
}

export function formatMm(n, digits = 1) {
  const v = Number(n);
  const d = Number.isInteger(v) ? 0 : digits;
  return `${v.toFixed(d)} mm`;
}
