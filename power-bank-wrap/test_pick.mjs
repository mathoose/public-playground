import assert from "node:assert/strict";
import { derive } from "./geometry.js";
import { inspectPowerBank, measurePowerBank } from "./pick-map.js";

const d = derive();
const pt = (x, y, z, partId, normal = { x: 0, y: 0, z: 1 }) => ({
  point: { x, y, z },
  partId,
  normal,
});

const lane = inspectPowerBank(
  pt(d.beltMidA, d.outerW / 2, d.outerH - 0.2, "sleeve", { x: 0, y: 0, z: 1 }),
  d
);
assert.equal(lane.title, "USB-end wrap lane");
assert.deepEqual(lane.params, ["wrapStick", "bankH", "wall"]);

const gap = measurePowerBank(
  pt(d.wrapX1, d.cy, d.cz, "sleeve"),
  pt(d.wrapX2, d.cy, d.cz, "sleeve"),
  d
);
assert.ok(gap.params.includes("wrapGap"), JSON.stringify(gap));
assert.equal(gap.params.includes("bankL"), false);

const length = measurePowerBank(
  pt(0, d.cy, d.cz, "sleeve"),
  pt(d.p.sleeveLen, d.cy, d.cz, "sleeve"),
  d
);
assert.deepEqual(length.params, ["sleeveLen"]);

const bankLen = measurePowerBank(
  pt(d.bankX0, d.bankY0 + d.p.bankW / 2, d.bankZ0 + d.p.bankH / 2, "bank"),
  pt(d.bankX0 + d.p.bankL, d.bankY0 + d.p.bankW / 2, d.bankZ0 + d.p.bankH / 2, "bank"),
  d
);
assert.deepEqual(bankLen.params, ["bankL"]);

const width = measurePowerBank(
  pt(d.p.sleeveLen / 2, 0, d.outerH / 2, "sleeve"),
  pt(d.p.sleeveLen / 2, d.outerW, d.outerH / 2, "sleeve"),
  d
);
for (const key of ["bankW", "clearXY", "wall", "wrapStick"]) {
  assert.ok(width.params.includes(key), key);
}

const nearGap = measurePowerBank(
  pt(28.32, d.cy, d.outerH, "sleeve"),
  pt(d.wrapX2, d.cy, d.outerH - 0.3, "sleeve"),
  d
);
assert.ok(nearGap.params.includes("wrapGap"), JSON.stringify(nearGap));

const stray = measurePowerBank(
  pt(10, 12, 8, "sleeve"),
  pt(18, 20, 11, "sleeve"),
  d
);
assert.deepEqual(stray.params, []);
assert.match(stray.detail, /No slider/);

const hiddenBank = inspectPowerBank(
  pt(d.bankX0 + 20, d.bankY0 + 4, d.bankZ0 + d.p.bankH / 2, "bank", { x: 0, y: 1, z: 0 }),
  d
);
assert.equal(hiddenBank.title, "Power bank");
assert.ok(hiddenBank.params.includes("bankW"));

console.log("power-bank pick map ok");
