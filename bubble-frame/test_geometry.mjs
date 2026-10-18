#!/usr/bin/env node
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  IN,
  APP_VERSION,
  actualOverlap,
  applyTargetOverlap,
  centerLineSize,
  clampParams,
  countFromOverlap,
  defaultParams,
  hangHoleLayout,
  layoutBeads,
  outerPerimeterPoly,
  polygonArea,
  frameClipFor,
  standBounds,
  standPolygon,
  standSlotLayout,
  toggleDisabled,
} from "./geometry.js";
import { aabbOverlapVolume, frameClipLayout } from "../shared/frame-clip.js";
import { boxStl, stlTriangleCount } from "./stl.js";

let failed = 0;
function assert(cond, msg) {
  if (!cond) {
    failed += 1;
    console.error("FAIL:", msg);
  }
}
function almost(a, b, eps, msg) {
  assert(Math.abs(a - b) <= eps, `${msg}: ${a} vs ${b}`);
}

const photoW = 4 * IN;
const photoH = 6 * IN;
const D = 20;
const r = 10;
const lip = 5;

const cl = centerLineSize(photoW, photoH, r, lip);
almost(cl.w, photoW + 2 * (r - lip), 1e-9, "center line width");
almost(cl.h, photoH + 2 * (r - lip), 1e-9, "center line height");
almost(cl.w, 111.6, 1e-9, "4x6 center width");
almost(cl.h, 162.4, 1e-9, "4x6 center height");

assert(countFromOverlap(cl.w, D, 5) === 8, "horizontal count from 5 mm overlap");
assert(countFromOverlap(cl.h, D, 5) === 12, "vertical count from 5 mm overlap");
assert(countFromOverlap(100, D, 5) >= 2, "count is at least 2");

almost(actualOverlap(cl.w, D, 8), D - cl.w / 7, 1e-9, "top overlap from count");

const p = applyTargetOverlap({
  ...defaultParams(),
  photoW,
  photoH,
  ballDiameter: D,
  imageOverlap: lip,
  targetBallOverlap: 5,
  linkH: true,
  linkV: true,
});
assert(p.countTop === 8 && p.countBottom === 8, "linked horizontal counts");
assert(p.countLeft === 12 && p.countRight === 12, "linked vertical counts");

const layout = layoutBeads(p);
assert(layout.uniqueTotal === 2 * (8 - 2) + 2 * (12 - 2) + 4, "unique bead count");
assert(layout.uniqueTotal === 36, "36 beads on default 4x6");
assert(layout.enabledCount === 36, "all enabled by default");

const tl = layout.beads.find((b) => b.id === "corner-tl");
almost(tl.x, -cl.w / 2, 1e-9, "top-left x");
almost(tl.y, cl.h / 2, 1e-9, "top-left y");

const bottom = layout.beads.filter((b) => b.y === -cl.h / 2 || Math.abs(b.y + cl.h / 2) < 1e-9);
const innermost = Math.max(...bottom.map((b) => b.y + r));
almost(innermost, -photoH / 2 + lip, 1e-9, "image overlap of bottom beads");

almost(layout.outer.w, photoW + 2 * D - 2 * lip, 1e-9, "outer width");
almost(layout.opening.w, photoW - 2 * lip, 1e-9, "opening width");
almost(layout.opening.h, photoH - 2 * lip, 1e-9, "opening height");

assert(defaultParams().outerCornerRadius === 1.5, "default outer corner radius");
const roundedP = clampParams({ ...p, outerCornerRadius: 8 });
assert(roundedP.outerCornerRadius === 8, "corner radius clamp keeps value");
const roundedLayout = layoutBeads(roundedP);
assert(roundedLayout.outerCornerRadius === 8, "layout exposes corner radius");
const poly = outerPerimeterPoly(roundedLayout.outer.w, roundedLayout.outer.h, 8, 8);
assert(poly.length > 8, "rounded outer perimeter has arc points");
assert(APP_VERSION.includes("Oct 18, 2026"), "version date");

const topEdge = layout.beads.filter((b) => b.id.startsWith("top-") || b.id === "corner-tl" || b.id === "corner-tr");
assert(topEdge.length === 8, "top side includes corners");

const toggled = layoutBeads(toggleDisabled(p, "top-1"));
assert(toggled.enabledCount === 35, "disabling a bead leaves a gap");
assert(toggled.beads.find((b) => b.id === "top-1").enabled === false, "disabled flag");

const unlinked = layoutBeads({
  ...p,
  linkH: false,
  linkV: false,
  countTop: 6,
  countBottom: 9,
  countLeft: 10,
  countRight: 11,
});
assert(unlinked.params.countTop === 6, "independent top count");
assert(unlinked.params.countBottom === 9, "independent bottom count");
assert(unlinked.beads.filter((b) => b.side === "top").length === 4, "top edge beads exclude corners");

const clamped = clampParams({ ...p, countTop: 1, imageOverlap: 999, ballDiameter: 1 });
assert(clamped.countTop >= 2, "count clamped to >= 2");
assert(clamped.imageOverlap <= clamped.ballDiameter, "lip not larger than diameter");
assert(clamped.ballDiameter >= 4, "diameter minimum");

const gappy = layoutBeads({ ...p, countTop: 3, countBottom: 3, linkH: true });
assert(gappy.warnings.some((w) => /do not touch/i.test(w)), "warns on gaps");

const plate = boxStl(photoW, photoH, 1.2, "back");
assert(stlTriangleCount(plate) === 12, "back plate is a 12-triangle box");
assert(plate.byteLength === 84 + 12 * 50, "binary STL size");

const holes2 = hangHoleLayout({ ...p, hangHoles: true, hangHoleCount: 2, hangHoleDiameter: 5, hangInsetTop: 12, hangInsetSide: 18 });
assert(holes2.length === 2, "two hanging holes");
almost(holes2[0].x, -holes2[1].x, 1e-9, "holes are mirrored");
almost(holes2[0].y, photoH / 2 - 12, 1e-6, "holes sit inset from the top");
assert(holes2.every((h) => Math.abs(h.x) + h.r < photoW / 2 - 0.2), "holes stay inside the plate width");
assert(holes2.every((h) => h.y + h.r < photoH / 2 - 0.2), "holes stay inside the plate height");
assert(Math.hypot(holes2[0].x - holes2[1].x, holes2[0].y - holes2[1].y) > 10, "holes do not overlap");

const holes1 = hangHoleLayout({ ...p, hangHoles: true, hangHoleCount: 1 });
assert(holes1.length === 1 && holes1[0].x === 0, "single centered hole");
assert(hangHoleLayout({ ...p, hangHoles: false }).length === 0, "holes can be turned off");

const stand = standPolygon(p);
assert(stand.length >= 4, "stand has a tab and a foot");
assert(polygonArea(stand) > 50, "stand profile has positive area");
const sb = standBounds(stand);
assert(sb.minY >= -1e-6, "stand sits on y=0 for a flat print");
assert(sb.maxX <= p.standThickness + 0.05, "tab faces the cover");
assert(sb.minX < 0, "foot stays behind the plate");
assert(sb.h > 20, "stand is tall enough to prop the frame");
const slot = standSlotLayout(p);
assert(slot && slot.insertH >= 8, "back plate has a stand cleat");
assert(slot.slotW > p.standWidth, "cleat is wider than the tab for clearance");
assert(aabbOverlapVolume(slot.housing, frameClipFor(layout).slab) > 0, "cleat is fused into the plate");
assert(slot.void.z0 >= frameClipFor(layout).plate.t - 1e-6, "cleat slot does not cut the plate in half");
const steeper = standBounds(standPolygon({ ...p, standAngleDeg: 28 }));
assert(steeper.minX < sb.minX, "a steeper lean makes a deeper back foot");

function assertMate(label, spec) {
  const clip = frameClipLayout(spec);
  const tongue = clip.tongues[0];
  assert(tongue.y1 - tongue.y0 > 10, `${label} tongue is long enough to grip`);
  const lip = clip.rails[0].lips[clip.rails[0].lips.length - 1];
  const covered = clip.xTip - (clip.outerW / 2 + clip.clearance - clip.lip);
  assert(covered > 1.1, `${label} lip still hooks the tongue (${covered.toFixed(2)} mm)`);
  assert(Math.abs(clip.xWallIn - clip.xTip - clip.clearance) < 1e-6, `${label} wall clearance stays fixed`);
  assert(clip.stopY1 <= clip.y0 - clip.clearance + 1e-6, `${label} stop sits under the tongue`);
  assert(aabbOverlapVolume(clip.rails[0].wall, clip.slab) > 0, `${label} rail is fused to the plate`);
  assert(aabbOverlapVolume(clip.rails[0].lips[0], clip.rails[0].wall) > 0, `${label} lip is fused to the wall`);
}
assertMate("default", {
  outerW: layout.outer.w,
  outerH: layout.outer.h,
  border: (layout.outer.w - layout.photo.w) / 2,
  plateT: p.plateThickness,
  cornerRadius: p.outerCornerRadius,
  standWidth: p.standWidth,
  standThickness: p.standThickness,
  standEnabled: true,
  standAngleDeg: p.standAngleDeg,
  standHeight: p.standHeight,
});
assertMate("wallet thin border", {
  outerW: 70,
  outerH: 90,
  border: 2,
  plateT: 0.8,
  cornerRadius: 0,
  standWidth: 22,
  standThickness: 3,
  standEnabled: true,
  standAngleDeg: 12,
  standHeight: 36,
});
assertMate("large thick border", {
  outerW: 280,
  outerH: 340,
  border: 22,
  plateT: 4,
  cornerRadius: 8,
  standWidth: 50,
  standThickness: 6,
  standEnabled: true,
  standAngleDeg: 24,
  standHeight: 90,
});
const thin = frameClipLayout({
  outerW: 70,
  outerH: 90,
  border: 2,
  plateT: 0.8,
  cornerRadius: 0,
  standEnabled: true,
  standWidth: 22,
  standThickness: 3,
  standAngleDeg: 12,
  standHeight: 36,
});
const thick = frameClipLayout({
  outerW: 70,
  outerH: 90,
  border: 22,
  plateT: 0.8,
  cornerRadius: 0,
  standEnabled: true,
  standWidth: 22,
  standThickness: 3,
  standAngleDeg: 12,
  standHeight: 36,
});
assert(thick.tongueW > thin.tongueW, "a thicker border gets a deeper tongue");
assert(thick.lip === thin.lip, "lip angle reach stays printable when the border changes");

const here = dirname(fileURLToPath(import.meta.url));
for (const [name, minTris] of [
  ["bubble-frame-4x6in-frame.stl", 1000],
  ["bubble-frame-4x6in-back.stl", 12],
  ["bubble-frame-4x6in-stand.stl", 12],
]) {
  const path = join(here, name);
  assert(existsSync(path), `${name} is in the folder so Finder can open it`);
  const buf = readFileSync(path);
  const ab = buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
  assert(stlTriangleCount(ab) >= minTris, `${name} is a real STL`);
}

if (failed) {
  console.error(`${failed} assertion(s) failed`);
  process.exit(1);
}
console.log("ok — geometry tests passed");
