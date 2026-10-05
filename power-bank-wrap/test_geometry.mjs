import assert from "node:assert/strict";
import {
  DEFAULT_PARAMS,
  PRESETS,
  applyPreset,
  applySliderChange,
  clampParams,
  derive,
  warnings,
} from "./geometry.js";

const d0 = derive();
assert.ok(Math.abs(d0.p.bankL - 143) < 1e-6);
assert.ok(Math.abs(d0.p.bankW - 68) < 1e-6);
assert.ok(Math.abs(d0.p.bankH - 16) < 1e-6);
assert.equal(d0.innerL.toFixed(2), "143.90");
assert.equal(d0.innerW.toFixed(2), "68.90");
assert.equal(d0.nestOuterL.toFixed(2), "147.90");
assert.equal(d0.nestOuterW.toFixed(2), "72.90");
assert.ok(d0.totalL > d0.nestOuterL + 40, `totalL ${d0.totalL}`);
assert.ok(d0.baseZ > 16 && d0.baseZ < 22, `baseZ ${d0.baseZ}`);
assert.ok(d0.buttonX > d0.bankX0 + 15 && d0.buttonX < d0.bankX0 + 30);
assert.ok(d0.postY1 - d0.postY0 > 30);

const j159 = applyPreset("j159");
assert.equal(j159.bankL, 143.5);
const dJ = derive(j159);
assert.ok(dJ.innerL > d0.innerL);

const loose = applyPreset("loose");
assert.ok(loose.clearXY > DEFAULT_PARAMS.clearXY);

const grown = applySliderChange(DEFAULT_PARAMS, "wrapDeck", 60);
assert.equal(grown.wrapDeck, 60);
assert.ok(derive(grown).totalL > d0.totalL);

const tight = warnings({ ...DEFAULT_PARAMS, lip: 1.6, clearXY: 0.2 });
assert.ok(tight.some((n) => /lip|tight/i.test(n)));

const same = clampParams(DEFAULT_PARAMS);
assert.equal(same.usbWindowW, 58);
assert.equal(same.clipOn, 1);

let manifoldOk = false;
try {
  const { buildCase, buildCaseStl, stlTriangleCount } = await import("./stl.js");
  const preview = await buildCase(DEFAULT_PARAMS, { quality: "preview" });
  assert.ok(preview.volume > 8_000, `volume ${preview.volume}`);
  assert.ok(preview.tris > 400, `tris ${preview.tris}`);
  assert.equal(preview.d.nestOuterW.toFixed(2), d0.nestOuterW.toFixed(2));

  const stl = await buildCaseStl(DEFAULT_PARAMS);
  assert.ok(stlTriangleCount(stl.stl) > 400);
  assert.ok(stl.stl.byteLength > 84);

  const wide = await buildCase(applySliderChange(DEFAULT_PARAMS, "bankW", 80), { quality: "preview" });
  assert.ok(wide.d.nestOuterW > d0.nestOuterW);
  manifoldOk = true;
} catch (err) {
  if (String(err).includes("Cannot find package 'manifold-3d'")) {
    console.log("skip mesh tests (manifold-3d not installed)");
  } else {
    throw err;
  }
}

console.log(
  `ok geometry defaults nest ${d0.nestOuterL.toFixed(1)}×${d0.nestOuterW.toFixed(1)}×${d0.baseZ.toFixed(1)} overall ${d0.totalL.toFixed(1)}${manifoldOk ? " + manifold" : ""}`
);
