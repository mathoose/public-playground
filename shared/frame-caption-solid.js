/** Manifold helpers for caption chin, embossed text, peg plate. */

import { captionLayout } from "./frame-caption.js";

function polygonsToSection(CrossSection, polys, temps) {
  if (!polys.length) return null;
  const sections = polys.map((poly) => {
    const cs = CrossSection.ofPolygons([poly], "NonZero");
    temps.push(cs);
    return cs;
  });
  let out = sections[0];
  for (let i = 1; i < sections.length; i++) {
    const u = out.union(sections[i]);
    if (u !== out) temps.push(u);
    out = u;
  }
  return out;
}

function extrudePolys(Manifold, CrossSection, polys, z0, height, segs, temps) {
  const sec = polygonsToSection(CrossSection, polys, temps);
  if (!sec) return null;
  const solid = sec.extrude(height).translate(0, 0, z0);
  temps.push(solid);
  return solid;
}

/** Flat chin pad under the bottom beads when chinExtra > 0. */
export function addChinPad(Manifold, solid, layout, temps) {
  const cap = captionLayout(layout);
  if (!cap.enabled || cap.chinExtra < 1) return solid;
  const outerW = layout.outer.w;
  const padW = outerW * 0.92;
  const padH = cap.chinExtra + layout.radius * 0.35;
  const y0 = cap.bottomY + layout.radius * 0.2;
  const t = Math.max(layout.params.webThickness, 1);
  const pad = Manifold.cube([padW, padH, t], true).translate(0, y0 + padH / 2, 0);
  temps.push(pad);
  const next = solid.add(pad);
  temps.push(next);
  return next;
}

export function embossCaptionOnSolid(Manifold, CrossSection, solid, layout, zBase, height, segs, temps) {
  const cap = captionLayout(layout);
  if (!cap.enabled || !cap.embossOnFrame || !cap.polys.length) return solid;
  const letters = extrudePolys(Manifold, CrossSection, cap.polys, zBase, height, segs, temps);
  if (!letters) return solid;
  const next = solid.add(letters);
  temps.push(next);
  return next;
}

export function cutCaptionSocket(Manifold, solid, layout, temps) {
  const cap = captionLayout(layout);
  if (!cap.enabled || !cap.pegPlate) return solid;
  const { socket } = cap;
  const cyl = Manifold.cylinder(socket.depth + 2, socket.r, socket.r, 32, true).translate(
    socket.x,
    socket.y,
    socket.zTop - 0.5
  );
  temps.push(cyl);
  const next = solid.subtract(cyl);
  temps.push(next);
  return next;
}

/** Separate caption name plate with snap peg (print flat, Z = thickness). */
export function buildCaptionPlateSolid(Manifold, CrossSection, layout, segs, temps) {
  const cap = captionLayout(layout);
  if (!cap.enabled || !cap.pegPlate) return null;
  const { plateBox, peg, polys } = cap;
  const plate = Manifold.cube([plateBox.w, plateBox.h, plateBox.t], true).translate(
    0,
    plateBox.y,
    plateBox.t / 2
  );
  temps.push(plate);
  let solid = plate;
  const letterH = Math.max(0.5, Math.min(2.2, plateBox.t * 0.85));
  const letterPolys = polys.map((poly) => poly.map(([x, y]) => [x, y]));
  const letters = extrudePolys(
    Manifold,
    CrossSection,
    letterPolys,
    plateBox.t - 0.04,
    letterH,
    segs,
    temps
  );
  if (letters) {
    solid = solid.add(letters);
    temps.push(solid);
  }
  const pegZ = plateBox.t;
  const pegCyl = Manifold.cylinder(peg.pegH, peg.pegR, peg.barbR, 32, true).translate(
    0,
    plateBox.y,
    pegZ + peg.pegH / 2
  );
  temps.push(pegCyl);
  solid = solid.add(pegCyl);
  temps.push(solid);
  return solid;
}

/** Raised text sitting on the photo plane (separate color print). */
export function buildFrontCaptionSolid(Manifold, CrossSection, layout, clip, segs, temps) {
  const cap = captionLayout(layout);
  if (!cap.enabled || !cap.frontOverlay || !cap.polys.length) return null;
  const z0 = clip.frameBackZ + layout.params.imageOverlap * 0.05;
  const h = Math.max(0.6, Math.min(2.4, cap.text.letterHeight * 0.35));
  return extrudePolys(Manifold, CrossSection, cap.polys, z0, h, segs, temps);
}
