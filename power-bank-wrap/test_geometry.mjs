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
assert.equal(d0.p.cordD, 3.6);
assert.equal(d0.p.clipOn, 1);
assert.ok(d0.outerH > d0.bodyH, "wrap belts add height around the band");
assert.ok(d0.outerW > d0.bodyW);
assert.ok(d0.wrapX2 > d0.wrapX1, "two wrap lanes along X");
assert.ok(d0.bankX0 < 0, "USB end sticks out of the sleeve");
assert.ok(d0.grip < d0.p.cordD, "clip mouth undersized to grip");

const j159 = applyPreset("j159");
assert.ok(j159.clearXY > DEFAULT_PARAMS.clearXY);

const grown = applySliderChange(DEFAULT_PARAMS, "sleeveLen", 100);
assert.equal(grown.sleeveLen, 100);

const same = clampParams(DEFAULT_PARAMS);
assert.equal(same.wrapLane, 11);
assert.equal(same.clipOn, 1);

const notes = warnings({ ...DEFAULT_PARAMS, taper: 0.05 });
assert.ok(notes.some((n) => /taper/i.test(n)));

let manifoldOk = false;
try {
  const { buildCase, buildCaseStl, stlTriangleCount } = await import("./stl.js");
  const preview = await buildCase(DEFAULT_PARAMS, { quality: "preview" });
  assert.ok(preview.volume > 2_000, `volume ${preview.volume}`);
  assert.ok(preview.tris > 200, `tris ${preview.tris}`);
  assert.equal(preview.d.outerW.toFixed(2), d0.outerW.toFixed(2));

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
  `ok v4 sleeve ${d0.innerW0.toFixed(1)}×${d0.innerH0.toFixed(1)}→${d0.innerW1.toFixed(1)}×${d0.innerH1.toFixed(1)} outer ${d0.p.sleeveLen.toFixed(1)}×${d0.outerW.toFixed(1)}×${d0.outerH.toFixed(1)}${manifoldOk ? " + manifold" : ""}`
);
