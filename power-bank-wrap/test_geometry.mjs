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
assert.ok(d0.innerW1 < d0.innerW0, `taper W ${d0.innerW1} vs ${d0.innerW0}`);
assert.ok(d0.innerH1 < d0.innerH0, `taper H ${d0.innerH1} vs ${d0.innerH0}`);
assert.equal(d0.innerW1.toFixed(2), (68.8 - 0.8).toFixed(2));
assert.equal(d0.p.taper, 0.4);
assert.equal(d0.p.sleeveLen, 72);
assert.ok(d0.outerW > d0.innerW0 + 2 * d0.p.wall);
assert.ok(d0.wrapSpacing > 60);
assert.ok(d0.bankX0 < 0, "USB end sticks out of the sleeve");

const j159 = applyPreset("j159");
assert.ok(j159.clearXY > DEFAULT_PARAMS.clearXY);
const loose = applyPreset("loose");
assert.ok(loose.clearXY > j159.clearXY);

const grown = applySliderChange(DEFAULT_PARAMS, "sleeveLen", 100);
assert.equal(grown.sleeveLen, 100);
assert.ok(derive(grown).totalL > d0.totalL);

const same = clampParams(DEFAULT_PARAMS);
assert.equal(same.wrapStick, 9);
assert.equal(same.slotOn, 1);

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

  const wide = await buildCase(applySliderChange(DEFAULT_PARAMS, "wrapStick", 14), {
    quality: "preview",
  });
  assert.ok(wide.d.outerW > d0.outerW);
  manifoldOk = true;
} catch (err) {
  if (String(err).includes("Cannot find package 'manifold-3d'")) {
    console.log("skip mesh tests (manifold-3d not installed)");
  } else {
    throw err;
  }
}

console.log(
  `ok sleeve entry ${d0.innerW0.toFixed(1)}×${d0.innerH0.toFixed(1)} tight ${d0.innerW1.toFixed(1)}×${d0.innerH1.toFixed(1)} outer ${d0.p.sleeveLen.toFixed(1)}×${d0.outerW.toFixed(1)}×${d0.outerH.toFixed(1)}${manifoldOk ? " + manifold" : ""}`
);
