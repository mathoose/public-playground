#!/usr/bin/env node
import {
  IN,
  actualOverlap,
  applyTargetOverlap,
  centerLineSize,
  clampParams,
  countFromOverlap,
  defaultParams,
  hangHoleLayout,
  layoutBeads,
  polygonArea,
  standBounds,
  standPolygon,
  standSlotLayout,
  toggleDisabled,
} from "./geometry.js";
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
assert(sb.maxX <= p.standThickness + 0.05, "tab does not stick in front of the plate");
assert(sb.minX < 0, "foot stays behind the beads");
assert(sb.h > 20, "stand is tall enough to prop the frame");
const slot = standSlotLayout(p);
assert(slot && slot.insertH >= 12, "back plate has an insert pocket");
assert(slot.bossH > slot.insertH, "pocket is taller than the tab");
assert(slot.slotW > p.standWidth, "slot is wider than the tab for clearance");
const steeper = standBounds(standPolygon({ ...p, standAngleDeg: 28 }));
assert(steeper.minX < sb.minX, "a steeper lean makes a deeper back foot");

if (failed) {
  console.error(`${failed} assertion(s) failed`);
  process.exit(1);
}
console.log("ok — geometry tests passed");
