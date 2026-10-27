/**
 * Flat turn-lock for the yellow Costco tote lid.
 *
 * The caliper spanned the long axis of the oblong slot: 32.2 mm.
 * The short axis is estimated from that same photo (about 11.4 mm) and is editable.
 *
 * Installed, the hook is under the rim and the pad is on top. You drop the hook
 * through the long way of the slot, then turn 90° so the tabs swing under the
 * short sides. Engagement is how far those tabs reach past the slot edge.
 * The shelf they land on is flat, so an outward push from a full bin seats
 * the clip instead of camming it back out.
 */

export const APP_VERSION = "1 · Oct 27, 2026";
export const APP_VERSION_TAG = "v1";
export const APP_NAME = "Costco bin lock";

/** Vertical room between the hook shelf and the underside of the pad. */
export const THROAT_MM = 4;

/** Caliper reading: jaws on the rounded ends of the oblong slot. */
export const CALIPER_SLOT_LENGTH = 32.2;

/** Short side of the same slot, scaled from the photo. Type over it if you measure it. */
export const ESTIMATED_SLOT_WIDTH = 11.4;

export const DEFAULT_PARAMS = Object.freeze({
  slotWidth: ESTIMATED_SLOT_WIDTH,
  slotLength: CALIPER_SLOT_LENGTH,
  clipThickness: 4.2,
  engagement: 8,
});

export const SLIDERS = [
  { key: "slotWidth", min: 8, max: 24, step: 0.1, unit: "mm" },
  { key: "slotLength", min: 18, max: 70, step: 0.1, unit: "mm" },
  { key: "clipThickness", min: 2.8, max: 7, step: 0.1, unit: "mm" },
  { key: "engagement", min: 3, max: 14, step: 0.1, unit: "mm" },
];

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
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
  return p;
}

export function mergeParams(overrides = {}) {
  return clampParams({ ...DEFAULT_PARAMS, ...overrides });
}

export function derive(raw = {}) {
  const p = mergeParams(raw);
  const throat = THROAT_MM;
  const thickness = p.clipThickness;

  // Short side of the hook has to drop through the short side of the slot.
  const hookX = Math.max(5, p.slotWidth - 1.4);
  const hookY = p.slotWidth + 2 * p.engagement;

  const neckD = Math.min(hookX - 0.7, p.slotWidth - 1.1);
  const neckR = Math.max(2.2, neckD / 2);

  // Flat shelf covers the rim. Only the outer couple of millimetres ramp down,
  // so a twist can climb on and a straight pull cannot slide off.
  const rampRun = Math.min(2.4, Math.max(0, p.engagement - 1.4));
  let shelfY = hookY / 2 - rampRun;
  shelfY = Math.max(shelfY, neckR + 0.45);
  const coreY = Math.min(hookY - 0.2, shelfY * 2);
  const actualRamp = Math.max(0, hookY / 2 - coreY / 2);

  const headLand = 2.6;
  const headY = p.slotWidth + 2 * headLand;
  const headX = Math.max(neckD + 5.2, p.slotWidth + 3.6);

  const cornerR = Math.min(1.8, hookX / 2 - 0.3, coreY / 2 - 0.3, hookY / 2 - 0.3);
  const headR = Math.min(2.4, headX / 2 - 0.3, headY / 2 - 0.3);
  const tipH = Math.min(thickness - 0.9, Math.max(1.8, thickness * 0.52));

  const totalZ = thickness + throat + thickness;
  const insertGap = p.slotLength - hookY;
  const shift = Math.max(0, (p.slotWidth - neckD) / 2);

  return {
    p,
    throat,
    thickness,
    hookX,
    hookY,
    neckD,
    neckR,
    shelfY: coreY / 2,
    coreY,
    rampRun: actualRamp,
    headLand,
    headX,
    headY,
    cornerR: Math.max(0.4, cornerR),
    headR: Math.max(0.6, headR),
    tipH,
    totalZ,
    insertGap,
    shift,
    // Bearing left on the flat shelf if the neck rattles to one side.
    seatLeft: p.engagement - actualRamp - shift,
  };
}

export function warnings(raw = {}) {
  const d = raw.hookY ? raw : derive(raw);
  const notes = [];
  if (d.insertGap < 0.8) {
    notes.push(
      `Hook is ${d.hookY.toFixed(1)} mm across and the slot is only ${d.p.slotLength.toFixed(1)} mm long, so it cannot drop through. Reduce engagement.`
    );
  }
  if (d.hookX > d.p.slotWidth - 0.35) {
    notes.push("Hook is too wide for the short side of the slot.");
  }
  if (d.p.engagement < 5) {
    notes.push("Under 5 mm of engagement is close to the clip that fell out. Deeper stays seated.");
  }
  if (d.seatLeft < 1.2 && d.insertGap >= 0.8) {
    notes.push("The flat shelf is short. Add engagement so a shove still lands on the flat, not the ramp.");
  }
  return notes;
}

export function formatMm(n) {
  return `${Number(n).toFixed(1)} mm`;
}
