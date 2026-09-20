#!/usr/bin/env node
import {
  IN,
  APP_VERSION,
  APP_VERSION_TAG,
  boxesForArc,
  clampParams,
  defaultParams,
  hangHoleLayout,
  layoutStripes,
  pathLength,
  polygonArea,
  setColorCount,
  setColorHeight,
  setColorThickness,
  setSharedHeight,
  standBounds,
  standPolygon,
  standSlotLayout,
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

assert(APP_VERSION_TAG === "v2", "version tag");
assert(APP_VERSION.includes("Sep 20, 2026"), "version date");

const p = defaultParams();
assert(p.colorCount === 2, "default 2 colors");
assert(p.equalHeights === true, "equal heights by default");
assert(p.colors.every((c) => c.height === p.sharedHeight), "heights equal");

const layout = layoutStripes(p);
assert(layout.colors.length === 2, "layout colors");
assert(layout.segments.length >= 2, "has segments");
assert(layout.repeats >= 1, "has repeats");
almost(layout.pathLength, pathLength(layout.opening, layout.mouldingWidth), 1e-6, "path length");

// Segments tile the full path
const covered = layout.segments.reduce((a, s) => a + s.length, 0);
almost(covered, layout.pathLength, 0.05, "segments cover path");

// Alternating colors along path (not concentric): boxes sit on the ring, not nested rings
const first = layout.segments[0];
assert(first.boxes.length >= 1, "segment has boxes");
const onRing = first.boxes.every((b) => {
  const inOpening = Math.abs(b.cx) < layout.opening.w / 2 - 0.1 && Math.abs(b.cy) < layout.opening.h / 2 - 0.1;
  return !inOpening;
});
assert(onRing, "stripe boxes stay on moulding ring");

const three = setColorCount(p, 3);
assert(three.colorCount === 3 && three.colors.length === 3, "3 colors");
const four = setColorCount(p, 4);
assert(four.colorCount === 4 && four.colors.length === 4, "4 colors");

const thick = setColorThickness(p, 0, 30);
almost(thick.colors[0].thickness, 30, 1e-9, "thickness set");

const shared = setSharedHeight(p, 12);
assert(shared.colors.every((c) => c.height === 12), "shared height");

const oneH = setColorHeight(shared, 1, 5);
assert(oneH.equalHeights === false, "per-color unlocks");
almost(oneH.colors[1].height, 5, 1e-9, "color 1 height");

const opening = { w: 4 * IN - 12, h: 6 * IN - 12 };
const L = pathLength(opening, 14);
const boxes = boxesForArc(0, L / 8, opening, 14);
assert(boxes.length >= 1, "arc boxes");

const clamped = clampParams({ ...defaultParams(), colorCount: 9, sharedHeight: 100 });
assert(clamped.colorCount === 4, "color count clamp");
assert(clamped.sharedHeight === 40, "height clamp");

assert(hangHoleLayout(p).length === 2, "hang holes");
assert(standSlotLayout(p).lift > 0, "stand slot");
assert(Math.abs(polygonArea(standPolygon(p))) > 0, "stand area");
assert(standBounds(standPolygon(p)).w > 0, "stand bounds");
assert(stlTriangleCount(boxStl(10, 10, 2, "t")) === 12, "box tris");

// Adjacent segments alternate color index in the repeating pattern
const pattern = layout.segments.slice(0, layout.colors.length).map((s) => s.colorIndex);
assert(pattern.join(",") === "0,1", "alternating color indices in pattern");

if (failed) {
  console.error(`${failed} failed`);
  process.exit(1);
}
console.log("ok — path-stripe geometry tests passed");
