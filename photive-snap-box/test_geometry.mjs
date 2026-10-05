import assert from "node:assert/strict";
import {
  DEFAULT_PARAMS,
  applySliderChange,
  clampParams,
  derive,
  mergeParams,
  warnings,
} from "./geometry.js";

const d0 = derive();
assert.equal(d0.outerL.toFixed(1), "142.6");
assert.equal(d0.outerW.toFixed(1), "75.6");
assert.equal(d0.baseZ.toFixed(1), "28.8");
assert.equal(d0.innerL.toFixed(1), "137.8");
assert.equal(d0.innerW.toFixed(1), "70.8");
assert.equal(d0.cavityZ.toFixed(1), "26.6");
assert.ok(Math.abs(d0.brickL - 100) < 1, `brickL ${d0.brickL}`);
assert.ok(Math.abs(d0.brickW - 70) < 0.05, `brickW ${d0.brickW}`);
assert.equal(d0.p.usbCount, 6);
assert.equal(usbSpan(d0), 50);

function usbSpan(d) {
  return (d.p.usbCount - 1) * d.p.usbPitch;
}

const same = clampParams(DEFAULT_PARAMS);
assert.equal(same.usbExtra, 15);
assert.equal(same.acExtra, 22);
assert.equal(same.innerLength, 137.8);
assert.equal(same.lipClear, 0.32);

const grown = applySliderChange(DEFAULT_PARAMS, "usbExtra", 20);
assert.equal(grown.usbExtra, 20);
assert.equal(grown.innerLength, 142.8);
assert.equal(grown.acExtra, 22);

const longer = applySliderChange(DEFAULT_PARAMS, "innerLength", 147.8);
assert.equal(longer.innerLength, 147.8);
assert.equal(longer.usbExtra, 15);
assert.equal(Number(longer.acExtra.toFixed(1)), 32);

const tight = warnings({ ...DEFAULT_PARAMS, lipClear: 0.12, innerWidth: 60 });
assert.ok(tight.some((n) => /tight/i.test(n)));
assert.ok(tight.some((n) => /width/i.test(n)));

let manifoldOk = false;
try {
  const { buildBox, buildPartStl, stlTriangleCount } = await import("./stl.js");
  const preview = await buildBox(DEFAULT_PARAMS, { quality: "preview", previewLid: true });
  assert.ok(preview.baseVolume > 20_000, `base volume ${preview.baseVolume}`);
  assert.ok(preview.lidVolume > 8_000, `lid volume ${preview.lidVolume}`);
  assert.ok(preview.baseTris > 200);
  assert.ok(preview.lidTris > 200);

  const base = await buildPartStl(DEFAULT_PARAMS, "base");
  const lid = await buildPartStl(DEFAULT_PARAMS, "lid");
  assert.ok(stlTriangleCount(base.stl) > 200);
  assert.ok(stlTriangleCount(lid.stl) > 200);
  assert.ok(base.stl.byteLength > 84);
  assert.ok(lid.stl.byteLength > 84);

  const wide = await buildBox(
    applySliderChange(DEFAULT_PARAMS, "innerWidth", 90),
    { quality: "preview" }
  );
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
  `ok geometry defaults ${d0.outerL.toFixed(1)}×${d0.outerW.toFixed(1)}×${d0.baseZ.toFixed(1)}${manifoldOk ? " + manifold" : ""}`
);
