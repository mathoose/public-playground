import assert from "node:assert/strict";
import {
  DEFAULT_PARAMS,
  applyPreset,
  applySliderChange,
  clampParams,
  derive,
  warnings,
} from "./geometry.js";

const d0 = derive();
assert.ok(Math.abs(d0.p.bankW - 68) < 1e-6);
assert.ok(Math.abs(d0.p.bankH - 16) < 1e-6);
assert.equal(d0.innerW0.toFixed(2), "68.80");
assert.equal(d0.innerH0.toFixed(2), "16.70");
assert.ok(d0.innerW1 < d0.innerW0);
assert.ok(d0.innerH1 < d0.innerH0);
assert.equal(d0.p.taper, 0.4);
assert.equal(d0.p.sleeveLen, 72);
assert.equal(d0.p.wrapLane, 17);
assert.equal(d0.p.wrapGap, 12);
assert.equal(d0.p.cordD, 3.6);
assert.equal(d0.p.clipCount, 4);
assert.equal(d0.p.clipFillet, 2.4);
assert.ok(d0.outerH > d0.bodyH, "wrap belts add height around the band");
assert.ok(d0.outerW > d0.bodyW);
assert.ok(d0.wrapX2 > d0.wrapX1, "two wrap lanes along X");
assert.ok(d0.bankX0 < 0, "USB end sticks out of the sleeve");
assert.ok(d0.grip < d0.p.cordD * 0.7, "elastic mouth much tighter than the cord");
assert.ok(Math.abs(d0.grip - d0.p.cordD * 0.58) < 0.05, "mouth ~58% of cord");
assert.equal(d0.clips.length, 4);
assert.equal(d0.clips.filter((c) => c.side === "L").length, 2);
assert.equal(d0.clips.filter((c) => c.side === "R").length, 2);
assert.ok(d0.clipXB - d0.clipXA > 20, "clips on a side are spaced apart");
for (const c of d0.clips) {
  const inLaneA = c.x > d0.wrapX0 + 1.2 && c.x < d0.wrapX1 - 1.2;
  const inLaneB = c.x > d0.wrapX2 + 1.2 && c.x < d0.wrapX3 - 1.2;
  assert.ok(!inLaneA && !inLaneB, `clip X ${c.x} sits in a wrap lane`);
}
assert.ok(d0.clipRootR > d0.clipOuterR, "flared root is wider than the omega");
assert.ok(d0.clipFillet >= 2, "default fillet is generous");

const pair = derive({ clipCount: 2 });
assert.equal(pair.clips.length, 2);

const off = derive({ clipCount: 0 });
assert.equal(off.clips.length, 0);

const j159 = applyPreset("j159");
assert.ok(j159.clearXY > DEFAULT_PARAMS.clearXY);
assert.equal(j159.clipCount, 4);

const grown = applySliderChange(DEFAULT_PARAMS, "sleeveLen", 100);
assert.equal(grown.sleeveLen, 100);

const same = clampParams(DEFAULT_PARAMS);
assert.equal(same.wrapLane, 17);
assert.equal(same.clipCount, 4);

const fatLanes = clampParams({ ...DEFAULT_PARAMS, wrapLane: 28, wrapGap: 12, wrapInset: 6 });
assert.ok(fatLanes.sleeveLen >= 2 * 28 + 12 + 2 * 6 - 0.05, "sleeve grows so wide lanes still fit");

const notes = warnings({ ...DEFAULT_PARAMS, taper: 0.05 });
assert.ok(notes.some((n) => /taper/i.test(n)));

let manifoldOk = false;
try {
  const { buildCase, buildCaseStl, stlTriangleCount } = await import("./stl.js");
  const preview = await buildCase(DEFAULT_PARAMS, { quality: "preview" });
  assert.ok(preview.volume > 2_000, `volume ${preview.volume}`);
  assert.ok(preview.tris > 200, `tris ${preview.tris}`);
  assert.equal(preview.d.clips.length, 4);
  assert.ok(preview.d.clipXA < preview.d.wrapX0 + 1);
  assert.ok(preview.d.clipXB > preview.d.wrapX3 - 1);

  const stl = await buildCaseStl(DEFAULT_PARAMS);
  assert.ok(stlTriangleCount(stl.stl) > 200);
  assert.ok(stl.stl.byteLength > 84);

  const fat = await buildCase(applySliderChange(DEFAULT_PARAMS, "wrapStick", 12), {
    quality: "preview",
  });
  assert.ok(fat.d.outerW > d0.outerW);
  assert.ok(fat.d.outerH > d0.outerH);
  manifoldOk = true;
} catch (err) {
  if (String(err).includes("Cannot find package 'manifold-3d'")) {
    console.log("skip mesh tests (manifold-3d not installed)");
  } else {
    throw err;
  }
}

console.log(
  `ok v7 sleeve ${d0.innerW0.toFixed(1)}×${d0.innerH0.toFixed(1)}→${d0.innerW1.toFixed(1)}×${d0.innerH1.toFixed(1)} outer ${d0.p.sleeveLen.toFixed(1)}×${d0.bboxW.toFixed(1)}×${d0.bboxH.toFixed(1)} lanes ${d0.p.wrapLane} clips ${d0.clips.length} X ${d0.clipXA}/${d0.clipXB}${manifoldOk ? " + manifold" : ""}`
);
