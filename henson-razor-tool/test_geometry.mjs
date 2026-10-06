import assert from "node:assert/strict";
import { DEFAULT_PARAMS, clampParams, derive, warnings } from "./geometry.js";

const d0 = derive();
assert.equal(d0.pocketL.toFixed(1), "43.6");
assert.equal(d0.pocketWTop.toFixed(1), "24.1");
assert.equal(d0.pocketWBottom.toFixed(1), "18.1");
assert.equal(d0.height.toFixed(1), "11.9");
assert.ok(d0.minWall >= 3, `min wall ${d0.minWall}`);
assert.ok(d0.gripWall >= 2, `grip wall ${d0.gripWall}`);
assert.ok(d0.gripBoreTop < d0.gripBoreBottom);
assert.deepEqual(warnings(DEFAULT_PARAMS), []);

const odd = clampParams({ capTopWidth: 30, headWidth: 22 });
assert.equal(odd.capTopWidth, 22);
assert.ok(warnings({ clearance: 0.05 }).some((n) => /tight/i.test(n)));
assert.ok(warnings({ puckD: 52 }).some((n) => /wall/i.test(n)));

let manifoldOk = false;
try {
  const { buildAll, buildPartStl, stlTriangleCount } = await import("./stl.js");
  const r = await buildAll(DEFAULT_PARAMS);
  assert.ok(r.cradleVolume > 20_000, `cradle volume ${r.cradleVolume}`);
  assert.ok(r.gripVolume > 5_000, `grip volume ${r.gripVolume}`);
  assert.ok(r.ghostMesh.triVerts.length > 0);
  const cradle = await buildPartStl(DEFAULT_PARAMS, "cradle");
  const grip = await buildPartStl(DEFAULT_PARAMS, "grip");
  assert.ok(stlTriangleCount(cradle.stl) > 500);
  assert.ok(stlTriangleCount(grip.stl) > 200);
  const plain = await buildAll({ gripRibs: 0, notchW: 0, pushHoleD: 0, edgeRound: 0, gripFlutes: 0 }, { ghost: false });
  assert.ok(plain.cradleVolume > r.cradleVolume);
  manifoldOk = true;
  console.log(
    `cradle ${r.cradleVolume.toFixed(0)} mm³ (${((r.cradleVolume / 1000) * 1.27).toFixed(1)} g PETG), grip ${r.gripVolume.toFixed(0)} mm³`
  );
} catch (err) {
  if (String(err).includes("Cannot find package 'manifold-3d'")) {
    console.log("skip mesh tests (manifold-3d not installed)");
  } else {
    throw err;
  }
}

console.log(
  `ok defaults pocket ${d0.pocketL.toFixed(1)}×${d0.pocketWTop.toFixed(1)} mm, puck Ø${d0.p.puckD}×${d0.height.toFixed(1)} mm, wall ${d0.minWall.toFixed(1)} mm${manifoldOk ? " + manifold" : ""}`
);
