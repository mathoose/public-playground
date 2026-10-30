import assert from "node:assert/strict";
import { calloutShift, faceGap, segmentHitsAabb } from "./measure.js";

const boxMin = [-8, -14, 0];
const boxMax = [8, 14, 12];
const bottom = { x: 0, y: 0, z: 0 };
const top = { x: 2, y: -1, z: 12 };
const gap = faceGap(
  { point: bottom, normal: { x: 0, y: 0, z: -1 } },
  { point: top, normal: { x: 0, y: 0, z: 1 } }
);
assert.equal(gap.parallel, true);
assert.ok(Math.abs(gap.face - 12) < 1e-6, `face ${gap.face}`);
assert.ok(gap.straight > gap.face);

const angled = faceGap(
  { point: { x: 0, y: 0, z: 0 }, normal: { x: 1, y: 0, z: 0 } },
  { point: { x: 4, y: 3, z: 0 }, normal: { x: 0, y: 1, z: 0 } }
);
assert.equal(angled.parallel, false);
assert.ok(Math.abs(angled.primary - 5) < 1e-6);

const callout = calloutShift(bottom, top, boxMin, boxMax, 6);
assert.ok(!segmentHitsAabb(callout.endA, callout.endB, boxMin, boxMax, 0.4), "dimension line still crosses the part");
for (const end of [callout.endA, callout.endB]) {
  const outside =
    end[0] < boxMin[0] ||
    end[0] > boxMax[0] ||
    end[1] < boxMin[1] ||
    end[1] > boxMax[1] ||
    end[2] < boxMin[2] ||
    end[2] > boxMax[2];
  assert.ok(outside, `end still inside ${end}`);
}

console.log(
  `ok  face ${gap.face.toFixed(1)} mm  callout shift ${callout.shift.map((n) => n.toFixed(1)).join(", ")}`
);
