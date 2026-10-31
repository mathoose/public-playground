/** Polaroid-style caption bar, embossed text, and snap peg layout. Millimeters. */

import { layoutCaptionText } from "./caption-glyphs.js";

export const CAPTION_DEFAULTS = {
  captionEnabled: true,
  captionText: "@username",
  captionFontScale: 100,
  captionTextInFront: false,
  captionPegPlate: false,
  chinExtra: 0,
  frameStyle: "standard",
};

export const FRAME_STYLES = [
  { id: "standard", label: "Standard" },
  { id: "polaroid", label: "Polaroid chin" },
];

export function polaroidChinForPhoto(photoH) {
  return Math.min(55, Math.max(18, photoH * 0.22));
}

export function mergeCaptionParams(p) {
  const next = { ...CAPTION_DEFAULTS, ...p };
  next.captionEnabled = p.captionEnabled !== false;
  next.captionText = String(p.captionText ?? CAPTION_DEFAULTS.captionText).slice(0, 48);
  next.captionFontScale = Math.min(160, Math.max(40, Number(p.captionFontScale) || 100));
  next.captionTextInFront = Boolean(p.captionTextInFront);
  next.captionPegPlate = Boolean(p.captionPegPlate);
  next.chinExtra = Math.min(60, Math.max(0, Number(p.chinExtra) || 0));
  const style = p.frameStyle === "polaroid" ? "polaroid" : "standard";
  next.frameStyle = style;
  return next;
}

export function applyFrameStylePreset(p, styleId, photoH) {
  const next = mergeCaptionParams(p);
  next.frameStyle = styleId === "polaroid" ? "polaroid" : "standard";
  if (next.frameStyle === "polaroid") {
    next.chinExtra = polaroidChinForPhoto(photoH);
  } else {
    next.chinExtra = 0;
  }
  return next;
}

/** Snap peg dimensions scale with frame width. */
export function snapPegSpec(outerW) {
  const w = Math.max(40, outerW);
  const socketR = Math.min(3.2, Math.max(2.2, w * 0.018));
  const pegR = socketR - 0.15;
  const pegH = Math.min(4.5, Math.max(2.8, w * 0.024));
  const plateT = Math.min(2.4, Math.max(1.2, w * 0.012));
  return { socketR, pegR, pegH, plateT, barbR: pegR + 0.35 };
}

/**
 * Caption bar on the bottom of the frame (photo coords, Y up).
 * @param {object} layout - bead layout with photo, outer, radius, params
 */
export function captionLayout(layout) {
  const params = mergeCaptionParams(layout.params);
  if (!params.captionEnabled) {
    return { enabled: false, params, polys: [], warnings: [] };
  }
  const photo = layout.photo;
  const outerW = layout.outer.w;
  const chinExtra = params.chinExtra;
  const bottomY = -photo.h / 2 - chinExtra;
  const chinTop = -photo.h / 2;
  const chinMidY = (bottomY + chinTop) / 2;
  const barH = Math.max(chinExtra, 6);
  const peg = snapPegSpec(outerW);
  const letterH = Math.min(barH * 0.55, outerW * 0.09) * (params.captionFontScale / 100);
  const maxTextW = outerW * 0.82;
  const text = layoutCaptionText(params.captionText, { letterHeight: letterH, maxWidth: maxTextW });
  const textY = params.captionTextInFront
    ? -photo.h / 2 + layout.params.imageOverlap + text.letterHeight * 0.65
    : chinMidY;
  const polys = layoutCaptionText(params.captionText, {
    letterHeight: letterH,
    maxWidth: maxTextW,
  }).polys.map((poly) => poly.map(([x, y]) => [x, y + textY]));

  const socket = {
    x: 0,
    y: chinMidY,
    r: peg.socketR,
    depth: peg.pegH + 0.5,
    zTop: layout.radius * 0.15,
  };

  const warnings = [];
  if (!text.text.trim()) warnings.push("Caption is empty — type something or turn caption off.");
  if (chinExtra < 8 && !params.captionTextInFront) {
    warnings.push("Chin bar is short — try Polaroid preset or raise chin height for reel-style captions.");
  }

  return {
    enabled: true,
    params,
    chinExtra,
    bottomY,
    chinTop,
    chinMidY,
    barH,
    peg,
    text: { ...text, y: textY },
    polys,
    socket,
    embossOnFrame: !params.captionPegPlate && !params.captionTextInFront,
    frontOverlay: params.captionTextInFront,
    pegPlate: params.captionPegPlate,
    plateBox: {
      w: Math.min(outerW * 0.88, text.width + 16),
      h: Math.max(barH * 0.85, text.letterHeight + 6),
      t: peg.plateT,
      y: chinMidY,
    },
    warnings,
  };
}
