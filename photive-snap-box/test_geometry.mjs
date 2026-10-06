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
assert.equal(same.lipClear, 0.28);

// Outside-cap lid: skirt clears the base outer wall by lipClear per side; nubs bite in.
assert.ok(Math.abs(d0.skirtInW - d0.outerW - 2 * 0.28) < 1e-9);
assert.ok(Math.abs(d0.skirtInL - d0.outerL - 2 * 0.28) < 1e-9);
assert.ok(d0.beadBite > 0.2 && d0.beadBite < 0.35, `bead bite ${d0.beadBite}`);
assert.ok(d0.grooveDepth > d0.beadBite);

// Spacer teeth: gap = USB pocket − plug length − fit.
const sp = derive({ ...DEFAULT_PARAMS, plug1: 9, plug2: 14, plug3: 0, plug4: 20 });
assert.equal(sp.teeth.length, 6);
assert.ok(Math.abs(sp.teeth[0].depth - (15 - 9 - 0.25)) < 1e-9);
assert.ok(Math.abs(sp.teeth[1].depth - DEFAULT_PARAMS.spacerSpine) < 1e-9);
assert.equal(sp.teeth[2].depth, DEFAULT_PARAMS.spacerSpine);
assert.ok(sp.teeth[3].tooLong);
assert.ok(warnings({ ...DEFAULT_PARAMS, plug4: 20 }).some((n) => /Port 4/.test(n)));
assert.ok(sp.stopH > 0 && sp.stopH < sp.usbZc - sp.slotR);

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

  const spacer = await buildPartStl(DEFAULT_PARAMS, "spacer");
  assert.ok(stlTriangleCount(spacer.stl) > 100);

  const wide = await buildBox(
    applySliderChange(DEFAULT_PARAMS, "innerWidth", 90),
    { quality: "preview" }
  );
  assert.ok(wide.d.outerW > d0.outerW);

  // Seated assembly must not collide anywhere (brick, base, lid, spacer comb).
  const { loadManifold, buildBaseSolid, buildLidSolid, buildSpacerSolid, lidToPreview, spacerToBase } =
    await import("./stl.js");
  const wasm = await loadManifold();
  const temps = [];
  const mixed = { ...DEFAULT_PARAMS, plug1: 9, plug2: 12.5, plug3: 0, plug4: 14, plug5: 10, plug6: 11 };
  for (const params of [DEFAULT_PARAMS, mixed]) {
    const d = derive(params);
    const base = buildBaseSolid(wasm, params, temps, 24);
    const lid = lidToPreview(buildLidSolid(wasm, params, temps, 24), d, 0, temps);
    const comb = spacerToBase(buildSpacerSolid(wasm, params, temps, 24), d, temps);
    const brick = wasm.Manifold.cube([100, 70, 26]).translate(d.usbXBrick, d.yBrick0, d.floor);
    temps.push(brick);
    const hit = (a, b) => {
      const x = a.intersect(b);
      temps.push(x);
      return x.volume();
    };
    assert.ok(hit(lid, brick) < 1e-3, "lid hits brick");
    assert.ok(hit(lid, base) < 1e-3, `lid hits base ${hit(lid, base)}`);
    assert.ok(hit(comb, base) < 1e-3, "spacer hits base");
    assert.ok(hit(comb, lid) < 1e-3, "spacer hits lid");
    assert.ok(hit(comb, brick) < 1e-3, "spacer hits brick");
    const lb = lid.boundingBox();
    assert.ok(Math.abs(lb.max[2] - (d.baseZ + d.p.lidThickness)) < 1e-6);
  }
  for (const t of new Set(temps)) {
    try {
      t.delete();
    } catch {
      /* already freed */
    }
  }
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
