#!/usr/bin/env node
import {
  IN,
  APP_VERSION,
  APP_VERSION_TAG,
  clampParams,
  defaultParams,
  hangHoleLayout,
  layoutStripes,
  polygonArea,
  setSharedHeight,
  setStripeCount,
  setStripeHeight,
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

assert(APP_VERSION_TAG === "v1", "version tag");
assert(APP_VERSION.includes("Sep 20, 2026"), "version date");

const p = defaultParams();
assert(p.stripeCount === 4, "default stripe count");
assert(p.equalHeights === true, "equal heights by default");
assert(p.stripeHeights.every((h) => h === p.sharedHeight), "all heights equal by default");

const layout = layoutStripes(p);
assert(layout.stripes.length === 4, "layout has 4 stripes");
almost(layout.opening.w, p.photoW - 2 * p.lip, 1e-9, "opening width");
almost(layout.opening.h, p.photoH - 2 * p.lip, 1e-9, "opening height");
almost(layout.outer.w, layout.opening.w + 2 * p.stripeCount * p.stripeWidth, 1e-9, "outer width");
almost(layout.stripes[0].innerW, layout.opening.w, 1e-9, "innermost inner = opening");
almost(layout.stripes[0].height, p.sharedHeight, 1e-9, "stripe 0 height");

const shared = setSharedHeight(p, 12);
assert(shared.equalHeights, "shared keeps equal");
assert(shared.stripeHeights.every((h) => h === 12), "shared updates all");

const one = setStripeHeight(shared, 2, 5);
assert(one.equalHeights === false, "per-stripe unlocks equal");
almost(one.stripeHeights[2], 5, 1e-9, "stripe 2 set");
almost(one.stripeHeights[0], 12, 1e-9, "other stripes unchanged");

const more = setStripeCount(one, 6);
assert(more.stripeCount === 6, "stripe count 6");
assert(more.stripeHeights.length === 6, "heights resized");

const clamped = clampParams({ ...defaultParams(), stripeCount: 99, sharedHeight: 100 });
assert(clamped.stripeCount === 12, "count clamp");
assert(clamped.sharedHeight === 40, "height clamp");

const holes = hangHoleLayout(p);
assert(holes.length === 2, "two hang holes");
const slot = standSlotLayout(p);
assert(slot && slot.lift > 0, "stand slot");
const poly = standPolygon(p);
assert(poly.length >= 4, "stand polygon");
assert(Math.abs(polygonArea(poly)) > 0, "stand area");
const bounds = standBounds(poly);
assert(bounds.w > 0 && bounds.h > 0, "stand bounds");

const buf = boxStl(10, 10, 2, "test");
assert(stlTriangleCount(buf) === 12, "box tris");

const fourBySix = layoutStripes({
  ...defaultParams(),
  photoW: 4 * IN,
  photoH: 6 * IN,
});
assert(fourBySix.photo.w === 4 * IN, "4x6 photo");

if (failed) {
  console.error(`${failed} failed`);
  process.exit(1);
}
console.log("ok — striped-frame geometry tests passed");
