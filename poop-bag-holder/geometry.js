/** Dog poop bag holder — screw-cap tube with an S-slot that splits the rim so the top flexes. */

export const APP_VERSION = "1 · Oct 6, 2026";
export const APP_VERSION_TAG = "v1";
export const APP_NAME = "Poop bag holder";

export const SLOT_SHAPES = ["s", "straight"];
export const KNURL_STYLES = ["ribs", "diamond", "smooth"];

export const DEFAULT_PARAMS = Object.freeze({
  rollD: 30,
  rollLen: 50,
  rollClear: 0.8,
  endClear: 1.5,
  wall: 1.8,
  floor: 1.6,
  threadPitch: 3,
  threadDepth: 0.9,
  threadLen: 9,
  threadClear: 0.3,
  capWall: 1.8,
  capTop: 2,
  slotShape: "s",
  slotW: 2.4,
  slotSweep: 12,
  winD: 14,
  winZ: 30,
  winTeardrop: true,
  squareW: 6,
  rimNotches: 2,
  notchW: 2,
  notchD: 2.5,
  tabAngle: 100,
  tabZ: 26,
  tabHole: 5,
  tabRim: 2.4,
  tabT: 4,
  knurlStyle: "ribs",
  knurlCount: 30,
  knurlDepth: 0.6,
});

/** Slider specs. `group` places the row in the settings panel. */
export const SLIDERS = [
  { key: "rollD", group: "roll", label: "Roll diameter", min: 15, max: 60, step: 0.5, unit: "mm" },
  { key: "rollLen", group: "roll", label: "Roll length", min: 20, max: 120, step: 0.5, unit: "mm" },
  { key: "rollClear", group: "roll", label: "Roll clearance (per side)", min: 0.2, max: 4, step: 0.1, unit: "mm" },
  { key: "endClear", group: "roll", label: "Headroom above roll", min: 0, max: 15, step: 0.5, unit: "mm" },

  { key: "slotW", group: "slot", label: "Slot width", min: 1, max: 6, step: 0.1, unit: "mm" },
  { key: "slotSweep", group: "slot", label: "Slot sweep (sideways travel)", min: 0, max: 40, step: 0.5, unit: "mm" },
  { key: "winD", group: "slot", label: "Pull window diameter", min: 6, max: 30, step: 0.5, unit: "mm" },
  { key: "winZ", group: "slot", label: "Window height (center)", min: 8, max: 120, step: 0.5, unit: "mm" },
  { key: "squareW", group: "slot", label: "Square peek window (0 = off)", min: 0, max: 14, step: 0.5, unit: "mm" },
  { key: "rimNotches", group: "slot", label: "Rim notches", min: 0, max: 8, step: 1, unit: "" },
  { key: "notchW", group: "slot", label: "Notch width", min: 1, max: 5, step: 0.1, unit: "mm" },
  { key: "notchD", group: "slot", label: "Notch depth", min: 1, max: 8, step: 0.1, unit: "mm" },

  { key: "tabAngle", group: "tab", label: "Tab angle from window", min: 0, max: 359, step: 1, unit: "°" },
  { key: "tabZ", group: "tab", label: "Tab height (hole center)", min: 6, max: 120, step: 0.5, unit: "mm" },
  { key: "tabHole", group: "tab", label: "Ring hole diameter", min: 2, max: 12, step: 0.1, unit: "mm" },
  { key: "tabRim", group: "tab", label: "Material around hole", min: 1.2, max: 6, step: 0.1, unit: "mm" },
  { key: "tabT", group: "tab", label: "Tab thickness", min: 2, max: 10, step: 0.1, unit: "mm" },

  { key: "threadClear", group: "thread", label: "Thread clearance", min: 0.1, max: 0.8, step: 0.01, unit: "mm" },
  { key: "threadPitch", group: "thread", label: "Thread pitch", min: 2, max: 5, step: 0.1, unit: "mm" },
  { key: "threadDepth", group: "thread", label: "Thread depth", min: 0.5, max: 1.6, step: 0.05, unit: "mm" },
  { key: "threadLen", group: "thread", label: "Thread length", min: 5, max: 20, step: 0.5, unit: "mm" },
  { key: "capWall", group: "thread", label: "Cap wall", min: 1.2, max: 4, step: 0.1, unit: "mm" },
  { key: "capTop", group: "thread", label: "Cap top thickness", min: 1.2, max: 5, step: 0.1, unit: "mm" },
  { key: "knurlCount", group: "thread", label: "Knurl ribs", min: 8, max: 72, step: 1, unit: "" },
  { key: "knurlDepth", group: "thread", label: "Knurl depth", min: 0.2, max: 1.5, step: 0.05, unit: "mm" },

  { key: "wall", group: "body", label: "Body wall", min: 1.2, max: 4, step: 0.1, unit: "mm" },
  { key: "floor", group: "body", label: "Floor thickness", min: 1, max: 4, step: 0.1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

export function mergeParams(overrides = {}) {
  const p = { ...DEFAULT_PARAMS, ...overrides };
  for (const s of SLIDERS) {
    let v = Number(p[s.key]);
    if (!Number.isFinite(v)) v = DEFAULT_PARAMS[s.key];
    v = clamp(v, s.min, s.max);
    const decimals = s.step >= 1 ? 0 : (String(s.step).split(".")[1] || "").length;
    p[s.key] = Number(v.toFixed(decimals));
  }
  if (!SLOT_SHAPES.includes(p.slotShape)) p.slotShape = DEFAULT_PARAMS.slotShape;
  if (!KNURL_STYLES.includes(p.knurlStyle)) p.knurlStyle = DEFAULT_PARAMS.knurlStyle;
  p.winTeardrop = Boolean(p.winTeardrop);
  return p;
}

/** All derived dimensions (mm). Body axis = Z, floor on z = 0, pull window centered at angle 0 (+X). */
export function derive(raw) {
  const p = mergeParams(raw);
  const ri = p.rollD / 2 + p.rollClear;
  const Rb = ri + p.wall;
  const bodyH = p.floor + p.rollLen + p.endClear;
  const threadLen = Math.min(p.threadLen, bodyH - p.floor - 4);
  const threadTop = bodyH - 0.6;
  const threadBot = bodyH - threadLen;
  const skirt = threadLen + 1;
  const capBore = Rb + p.threadDepth + p.threadClear;
  const capR = capBore + p.capWall;
  const capH = p.capTop + skirt;
  const capBottomZ = bodyH - skirt;

  const winR = p.winD / 2;
  const winZ = clamp(p.winZ, p.floor + winR + 1.5, capBottomZ - winR - 1);

  const holeR = p.tabHole / 2;
  const tabOuterR = holeR + p.tabRim;
  const tabCenterR = Rb + 1 + holeR;
  const tabZ = clamp(p.tabZ, tabOuterR + 0.5, capBottomZ - tabOuterR - 1);
  const tabReach = tabCenterR + tabOuterR - Rb;

  const squareZ = capBottomZ - p.squareW / 2 - 2.5;
  const circumference = 2 * Math.PI * Rb;
  const slotSweep = Math.min(p.slotSweep, circumference * 0.4);

  const totalH = bodyH + p.capTop;
  return {
    p,
    ri,
    Rb,
    bodyH,
    threadLen,
    threadTop,
    threadBot,
    skirt,
    capBore,
    capR,
    capH,
    capBottomZ,
    winR,
    winZ,
    holeR,
    tabOuterR,
    tabCenterR,
    tabZ,
    tabReach,
    squareZ,
    slotSweep,
    totalH,
    bodyOD: 2 * Rb,
    capOD: 2 * capR,
  };
}

/** Slot centerline in unwrapped coordinates: u = arc length (mm) around the body at radius Rb, z = height. */
export function slotPath(d, samples = 24) {
  const z0 = d.bodyH + 1.5;
  const z1 = d.winZ;
  const u0 = d.slotSweep;
  const pts = [];
  for (let i = 0; i <= samples; i++) {
    const t = i / samples;
    if (d.p.slotShape === "straight") {
      pts.push([u0 * (1 - t), z0 + (z1 - z0) * t]);
      continue;
    }
    const k = (z0 - z1) * 0.55;
    const P = [
      [u0, z0],
      [u0, z0 - k],
      [0, z1 + k],
      [0, z1],
    ];
    const a = (1 - t) ** 3;
    const b = 3 * (1 - t) ** 2 * t;
    const c = 3 * (1 - t) * t * t;
    const e = t ** 3;
    pts.push([
      a * P[0][0] + b * P[1][0] + c * P[2][0] + e * P[3][0],
      a * P[0][1] + b * P[1][1] + c * P[2][1] + e * P[3][1],
    ]);
  }
  return pts;
}

export function warnings(raw) {
  const d = derive(raw);
  const p = d.p;
  const out = [];
  if (p.threadDepth * 2 >= p.threadPitch * 0.75) {
    out.push("Thread depth is large for this pitch — ridges get pointy. Try depth ≤ 0.3 × pitch.");
  }
  if (p.capWall - p.knurlDepth < 1 && p.knurlStyle !== "smooth") {
    out.push("Knurl grooves leave under 1 mm of cap wall — raise cap wall or lower knurl depth.");
  }
  if (p.slotW < 1.6) out.push("Slot under 1.6 mm may fuse shut on a 0.4 mm nozzle.");
  if (Math.abs(p.winZ - d.winZ) > 0.01) out.push(`Window height clamped to ${d.winZ.toFixed(1)} mm (must clear the floor and the cap).`);
  if (Math.abs(p.tabZ - d.tabZ) > 0.01) out.push(`Tab height clamped to ${d.tabZ.toFixed(1)} mm (must sit below the cap).`);
  if (p.wall < 1.6) out.push("Body wall under 1.6 mm — fine in PETG, brittle in PLA.");
  return out;
}

export function formatMm(n) {
  return `${Number(n).toFixed(1)} mm`;
}
