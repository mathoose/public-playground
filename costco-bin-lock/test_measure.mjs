import assert from "node:assert/strict";
import { DEFAULT_PARAMS, derive } from "./geometry.js";
import { calloutShift, faceGap, identifyFace, segmentHitsAabb, slidersAffecting } from "./measure.js";

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

const d = derive(DEFAULT_PARAMS);
const padZ = d.thickness + d.throat + d.thickness / 2;
const padRight = identifyFace(
  { x: d.headX / 2, y: 0, z: padZ },
  { x: 1, y: 0, z: 0 },
  "lock",
  d
);
const padLeft = identifyFace(
  { x: -d.headX / 2, y: 0, z: padZ },
  { x: -1, y: 0, z: 0 },
  "lock",
  d
);
assert.equal(padRight.id, "pad-x+");
assert.equal(padLeft.id, "pad-x-");
const padKeys = slidersAffecting(DEFAULT_PARAMS, padRight, padLeft);
assert.ok(padKeys.includes("squareEnd"), `square ${padKeys}`);
assert.ok(padKeys.includes("slotWidth"), `slot width can grow the pad ${padKeys}`);
assert.ok(!padKeys.includes("engagement"), `engagement ${padKeys}`);
assert.ok(!padKeys.includes("clipThickness"), `thickness ${padKeys}`);
assert.ok(!padKeys.includes("slotLength"), `length ${padKeys}`);

const hookTipZ = Math.min(1.2, d.tipH * 0.4);
const hookFront = identifyFace(
  { x: 0, y: d.hookY / 2, z: hookTipZ },
  { x: 0, y: 1, z: 0 },
  "lock",
  d
);
const hookBack = identifyFace(
  { x: 0, y: -d.hookY / 2, z: hookTipZ },
  { x: 0, y: -1, z: 0 },
  "lock",
  d
);
assert.equal(hookFront.id, "hook-y+");
const hookKeys = slidersAffecting(DEFAULT_PARAMS, hookFront, hookBack);
assert.ok(hookKeys.includes("engagement"), `engagement ${hookKeys}`);
assert.ok(hookKeys.includes("slotWidth"), `slot width ${hookKeys}`);
assert.ok(!hookKeys.includes("squareEnd"), `square ${hookKeys}`);

const padTop = identifyFace({ x: 0, y: 0, z: d.totalZ }, { x: 0, y: 0, z: 1 }, "lock", d);
const bottomFace = identifyFace({ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: -1 }, "lock", d);
assert.equal(padTop.id, "pad-z+");
assert.equal(bottomFace.id, "hook-z-");
const heightKeys = slidersAffecting(DEFAULT_PARAMS, padTop, bottomFace);
assert.deepEqual(heightKeys, ["clipThickness"]);

const shelfY = Math.min(d.headY / 2 - 1.2, d.coreY / 2 - 1);
const shelf = identifyFace(
  { x: 0, y: shelfY, z: d.thickness },
  { x: 0, y: 0, z: 1 },
  "lock",
  d
);
const underside = identifyFace(
  { x: 0, y: shelfY, z: d.thickness + d.throat },
  { x: 0, y: 0, z: -1 },
  "lock",
  d
);
assert.equal(shelf.id, "hook-z+");
assert.equal(underside.id, "pad-z-");
assert.deepEqual(slidersAffecting(DEFAULT_PARAMS, shelf, underside), []);

console.log(
  `ok  face ${gap.face.toFixed(1)} mm  callout shift ${callout.shift.map((n) => n.toFixed(1)).join(", ")}  pad [${padKeys}]  hook [${hookKeys}]`
);
