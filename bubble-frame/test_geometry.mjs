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
  frameClipFor,
  standRows,
  standVolume,
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
assert(APP_VERSION.includes("Oct 19, 2026"), "version date");

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

const peg = frameClipFor(layout).pegStand;
assert(peg.cut, "stand holes are cut when the easel is on");
assert(peg.holes.length === 6, "three rows of two peg holes");
assert(peg.holeIndex === 1, "middle holes are the default lean");
assert(peg.rows[0].angleDeg < peg.rows[1].angleDeg, "a higher hole leans more");
assert(peg.rows[1].angleDeg < peg.rows[2].angleDeg, "the top hole leans the most");
assert(peg.pegLen < peg.holes[0].box.z1 - 0.2, "pegs stop inside the plate");
assert(peg.pegW + 0.2 < peg.holeW, "pegs are narrower than the holes");
assert(peg.sheetT + 0.2 < peg.holeH, "the sheet is thinner than the holes");
assert(standVolume(p) > 1000, "stand has volume");
assert(standVolume({ ...p, standEnabled: false }) === 0, "stand volume is off with the easel");
for (const hole of peg.holes) {
  assert(hole.box.y0 >= -layout.outer.h / 2, "peg holes stay inside the front silhouette");
  assert(Math.abs(hole.x) + hole.w / 2 < peg.halfSpan + peg.legW, "holes sit on the leg span");
}
const placed = peg.boxes;
assert(placed[0].y0 >= -1e-6, "stand prints flat from the foot");
const low = frameClipFor(layoutBeads({ ...p, standHole: 0 })).pegStand;
const high = frameClipFor(layoutBeads({ ...p, standHole: 2 })).pegStand;
assert(high.angleDeg > low.angleDeg + 2, "choosing a higher hole changes the lean");
assert(Math.abs(standRows(p)[1].angleDeg - peg.angleDeg) < 1e-6, "stand rows match the active lean");
const bigger = frameClipFor(layoutBeads({ ...p, photoW: 8 * IN, photoH: 10 * IN })).pegStand;
assert(bigger.legReach > peg.legReach + 5, "a taller photo gets longer legs");
assert(bigger.halfSpan > peg.halfSpan + 2, "a wider photo spreads the pegs");

function assertMate(label, spec) {
  const clip = frameClipLayout(spec);
  const tongue = clip.tongues.find((t) => t.x1 > 0);
  assert(tongue.y1 - tongue.y0 > 8, `${label} tongue is long enough to grip`);
  const hook = clip.lip - clip.clearance;
  if ((spec.border || 0) >= 6 || spec.beadRadius) {
    assert(hook > 1.05, `${label} lip still hooks the tongue (${hook.toFixed(2)} mm)`);
  } else {
    assert(hook > 0.4, `${label} lip still overlaps the tongue on a thin border`);
  }
  assert(Math.abs(clip.xWallIn - clip.xTip - clip.clearance) < 1e-6, `${label} wall clearance stays fixed`);
  assert(clip.xWallOut < clip.outerW / 2 - 0.3, `${label} rail stays inside the front`);
  assert(clip.plate.w < clip.outerW - 0.6, `${label} plate is narrower than the front`);
  assert(clip.plate.h < clip.outerH - 0.6, `${label} plate is shorter than the front`);
  assert(clip.stopY1 <= clip.y0 - clip.clearance + 1e-6, `${label} stop sits under the tongue`);
  assert(aabbOverlapVolume(clip.rails[0].wall, clip.slab) > 0, `${label} rail is fused to the plate`);
  assert(aabbOverlapVolume(clip.rails[0].lips[0], clip.rails[0].wall) > 0, `${label} lip is fused to the wall`);
  if (spec.beadRadius) {
    const r = spec.beadRadius;
    const dx = clip.plate.w / 2 - (clip.outerW / 2 - r);
    const dy = clip.plate.h / 2 - (clip.outerH / 2 - r);
    assert(Math.hypot(dx, dy) < r - 0.15, `${label} plate corner hides behind the corner bead`);
  }
}
assertMate("default", {
  outerW: layout.outer.w,
  outerH: layout.outer.h,
  border: (layout.outer.w - layout.photo.w) / 2,
  beadRadius: layout.radius,
  coverHeight: layout.radius,
  plateT: p.plateThickness,
  cornerRadius: p.outerCornerRadius,
  standThickness: p.standThickness,
  standEnabled: true,
  standHole: p.standHole,
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
const roomy = frameClipLayout({
  outerW: 180,
  outerH: 220,
  border: 8,
  plateT: 1.2,
  cornerRadius: 0,
  standEnabled: false,
});
const roomier = frameClipLayout({ ...{
  outerW: 180,
  outerH: 220,
  border: 22,
  plateT: 1.2,
  cornerRadius: 0,
  standEnabled: false,
} });
assert(roomy.lip === roomier.lip, "lip reach stays printable when the border still has room");

const ordered = layout.beads.slice().sort((a, b) => a.pathIndex - b.pathIndex);
assert(ordered.length === layout.beads.length, "every bead is on the path");
assert(layout.params.alternate === true, "colors alternate by default");
for (let i = 0; i < ordered.length; i++) {
  assert(ordered[i].colorIndex === i % 2, `bead ${i} follows the path`);
  if (i > 0) {
    const d = Math.hypot(ordered[i].x - ordered[i - 1].x, ordered[i].y - ordered[i - 1].y);
    assert(d < layout.radius * 2.15, "path steps to the next bead");
  }
}
const grown = layoutBeads({ ...p, countTop: p.countTop + 1 });
assert(grown.beads.length === layout.beads.length + 2, "linked sides grow together");
const grownPath = grown.beads.slice().sort((a, b) => a.pathIndex - b.pathIndex);
assert(grownPath.every((b, i) => b.colorIndex === i % 2), "a new bead count still alternates");
const single = layoutBeads({ ...p, alternate: false });
assert(single.beads.every((b) => b.colorIndex === 0), "one color when alternate is off");

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
