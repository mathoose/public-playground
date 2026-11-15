#!/usr/bin/env node
import assert from "node:assert/strict";
import { writeFileSync } from "node:fs";
import { DEFAULT_PARAMS, MIN_WEB, derive, mergeParams } from "./geometry.js";
import { buildSolid, loadManifold, meshToStl } from "./cad.js";

const wasm = await loadManifold();
const { Manifold } = wasm;

function volumeIn(solid, x0, y0, z0, x1, y1, z1) {
  const box = Manifold.cube([x1 - x0, y1 - y0, z1 - z0], false).translate([x0, y0, z0]);
  const hit = solid.intersect(box);
  const v = hit.volume();
  hit.delete();
  box.delete();
  return v;
}

function check(label, raw, expect) {
  const temps = [];
  const solid = buildSolid(wasm, raw, temps, "preview");
  const d = derive(raw);
  assert.equal(solid.status(), "NoError", `${label} status`);
  const bb = solid.boundingBox();
  assert.ok(Math.abs(bb.min[0]) < 0.05, `${label} min x ${bb.min[0]}`);
  assert.ok(Math.abs(bb.min[1]) < 0.05, `${label} min y`);
  assert.ok(Math.abs(bb.min[2]) < 0.05, `${label} sits on z=0 (${bb.min[2]})`);
  assert.ok(Math.abs(bb.max[0] - d.p.width) < 0.2, `${label} width ${bb.max[0]}`);
  assert.ok(Math.abs(bb.max[1] - d.p.height) < 0.2, `${label} height ${bb.max[1]}`);
  assert.ok(Math.abs(bb.max[2] - d.totalZ) < 0.2, `${label} total Z ${bb.max[2]} vs ${d.totalZ}`);
  assert.equal(solid.genus(), d.holeCount, `${label} genus ${solid.genus()} holes ${d.holeCount}`);
  assert.ok(d.minWeb + 1e-6 >= MIN_WEB, `${label} web ${d.minWeb}`);
  for (const c of d.centers) {
    assert.ok(c.x - d.hexW / 2 >= d.p.ring - 0.05, `${label} ring left`);
    assert.ok(d.p.width - (c.x + d.hexW / 2) >= d.p.ring - 0.05, `${label} ring right`);
    assert.ok(c.y - d.hexH / 2 >= d.p.ring - 0.05, `${label} ring bottom`);
    assert.ok(d.p.height - (c.y + d.hexH / 2) >= d.p.ring - 0.05, `${label} ring top`);
  }
  const hole = d.centers[0];
  const emptied = volumeIn(solid, hole.x - 1.2, hole.y - 1.2, 0.4, hole.x + 1.2, hole.y + 1.2, d.p.plate - 0.4);
  assert.ok(emptied < 0.01, `${label} hex is open (${emptied})`);
  const ringSolid = volumeIn(solid, 2, d.p.height / 2 - 2, 1, 6, d.p.height / 2 + 2, d.p.plate - 1);
  assert.ok(ringSolid > 10, `${label} ring is solid (${ringSolid})`);
  const zMid = d.p.plate + 24;
  const zTip = d.p.plate + d.p.armLength - 12;
  for (const z of [zMid, zTip]) {
    const inside = volumeIn(solid, 1, 1, z, d.p.armThick - 1, d.p.armThick - 1, z + 3);
    const outside = volumeIn(solid, d.p.armThick + 2, 1, z, d.p.armThick + 8, d.p.armThick - 1, z + 3);
    assert.ok(inside > 20, `${label} arm solid at z=${z} (${inside})`);
    assert.ok(outside < 0.01, `${label} arm stops at thickness z=${z} (${outside})`);
  }
  if (expect?.maxVolume) {
    assert.ok(solid.volume() < expect.maxVolume, `${label} volume ${solid.volume()} < ${expect.maxVolume}`);
  }
  console.log(
    `${label}: ${(solid.volume() / 1000).toFixed(1)} cm³, ${d.holeCount} holes, ` +
      `hex ${d.flat.toFixed(2)} mm, ring ${d.p.ring} mm, web ${d.webX.toFixed(2)}×${d.webY.toFixed(2)} mm, ` +
      `genus ${solid.genus()}`,
  );
  if (expect?.stl) writeFileSync(expect.stl, Buffer.from(meshToStl(solid.getMesh(), "kitchen-shelf-cups")));
  for (const t of temps) t.delete?.();
}

const sourceVolumeMm3 = 700.3 * 1000;
check("default", DEFAULT_PARAMS, { maxVolume: sourceVolumeMm3 * 0.95, stl: "/tmp/kitchen-shelf-cups.stl" });
check("center cut", { ...DEFAULT_PARAMS, skipCenter: false });
check("big hex clamped", { ...DEFAULT_PARAMS, hexFlat: 40, ring: 22 });
const big = derive({ ...DEFAULT_PARAMS, hexFlat: 40, ring: 22 });
assert.ok(big.hexClamped, "oversized hex is clamped");
assert.ok(big.flat + 0.2 < 40, `clamped flat ${big.flat}`);
check("thick ring", { ...DEFAULT_PARAMS, ring: 28, hexFlat: 14, armThick: 16 });
check("short arms", { ...DEFAULT_PARAMS, armLength: 60, armThick: 12, cols: 5, rows: 5, skipCenter: false });
assert.equal(mergeParams({ width: 9999 }).width, 360);
console.log("ok");
