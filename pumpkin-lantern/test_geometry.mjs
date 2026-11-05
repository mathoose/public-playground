import assert from "node:assert/strict";
import { zipSync } from "fflate";
import { measureSeat, mergeParams, warnings } from "./geometry.js";
import { applyCut, loadManifold, parse3mf, parseStl, stlFromIndexed } from "./cut.js";

let n = 0;
const ok = (msg) => console.log(`ok ${++n} - ${msg}`);

{
  const p = mergeParams({ ledDiameter: 200, cordDiameter: -3, cordAngle: "12" });
  assert.equal(p.ledDiameter, 80);
  assert.equal(p.cordDiameter, 0);
  assert.equal(p.cordAngle, 12);
  assert.equal(p.ledThickness, 7.6);
  ok("mergeParams clamps sliders and keeps defaults");
}

const wasm = await loadManifold();
const { Manifold } = wasm;

function ringMesh() {
  const outer = Manifold.cylinder(12, 32, 32, 72);
  const inner = Manifold.cylinder(16, 20, 20, 72).translate(0, 0, -2);
  const ring = outer.subtract(inner);
  const mesh = ring.getMesh();
  const prop = mesh.numProp || 3;
  const src = mesh.vertProperties;
  const vertCount = src.length / prop;
  const positions = new Float32Array(vertCount * 3);
  for (let i = 0; i < vertCount; i += 1) {
    positions[i * 3] = src[i * prop];
    positions[i * 3 + 1] = src[i * prop + 1];
    positions[i * 3 + 2] = src[i * prop + 2];
  }
  const indices = Uint32Array.from(mesh.triVerts);
  outer.delete();
  inner.delete();
  ring.delete();
  return { positions, indices };
}

function minRadiusAt(positions, indices, z) {
  let minR = Infinity;
  const n = indices.length;
  for (let t = 0; t < n; t += 3) {
    const ia = indices[t] * 3;
    const ib = indices[t + 1] * 3;
    const ic = indices[t + 2] * 3;
    edge(ia, ib);
    edge(ib, ic);
    edge(ic, ia);
  }
  return minR;

  function edge(i, j) {
    const za = positions[i + 2];
    const zb = positions[j + 2];
    const dz = zb - za;
    if (Math.abs(dz) < 1e-8) return;
    if ((za - z) * (zb - z) > 0) return;
    const t = (z - za) / dz;
    const x = positions[i] + t * (positions[j] - positions[i]);
    const y = positions[i + 1] + t * (positions[j + 1] - positions[i + 1]);
    const r = Math.hypot(x, y);
    if (r < minR) minR = r;
  }
}

const ring = ringMesh();
const seat = measureSeat(ring.positions, ring.indices);
assert.ok(Math.abs(seat.seatRadius - 20) < 0.35, `seat radius ${seat.seatRadius}`);
assert.ok(seat.seatTop - seat.zMin > 8, "seat has height");
assert.ok(seat.collarOuterMin > 28, `collar outer ${seat.collarOuterMin}`);
ok(`measured ring opening ${seat.seatRadius.toFixed(2)} mm, collar outer ${seat.collarOuterMin.toFixed(1)} mm`);

{
  const enlarged = await applyCut(ring.positions, ring.indices, { ledDiameter: 50, ledThickness: 8, clearance: 0.4, cordDiameter: 6, cordHeight: 4, cordAngle: 0 }, seat);
  assert.equal(enlarged.plan.mode, "enlarge");
  assert.ok(Math.abs(enlarged.plan.opening - 50.4) < 0.01);
  const minR = minRadiusAt(enlarged.positions, enlarged.indices, seat.zMin + 4);
  assert.ok(minR > 24.5 && minR < 26.2, `enlarged min r ${minR}`);
  assert.ok(enlarged.volume > 1000);
  const stl = stlFromIndexed(enlarged.positions, enlarged.indices);
  assert.equal(new DataView(stl).getUint32(80, true), enlarged.indices.length / 3);
  ok(`enlarged opening min radius ${minR.toFixed(2)} mm and STL triangle count matches`);
}

{
  const shrunk = await applyCut(ring.positions, ring.indices, { ledDiameter: 32, ledThickness: 8, clearance: 0.4, cordDiameter: 0, cordHeight: 4, cordAngle: 0 }, seat);
  assert.equal(shrunk.plan.mode, "shrink");
  const minR = minRadiusAt(shrunk.positions, shrunk.indices, seat.zMin + 4);
  assert.ok(minR > 15.4 && minR < 17.2, `shrunk min r ${minR}`);
  assert.ok(shrunk.volume > ringVolume(ring), "shrink adds a lip");
  ok(`shrunk opening min radius ${minR.toFixed(2)} mm`);
}

{
  const fitted = warnings({ ledDiameter: 40, clearance: 0.4, ledThickness: 8, cordDiameter: 8, cordHeight: 4, cordAngle: 0 }, seat);
  assert.equal(fitted.length, 0);
  const wide = warnings({ ledDiameter: 70, clearance: 0.6, ledThickness: 8, cordDiameter: 8, cordHeight: 4, cordAngle: 0 }, seat);
  assert.ok(wide.some((note) => note.includes("wider than the thin parts")));
  ok("wide disc warns when it passes the thin ring");
}

{
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
 <resources><object id="1" type="model"><mesh>
  <vertices>
   <vertex x="0" y="0" z="0"/>
   <vertex x="1" y="0" z="0"/>
   <vertex x="0" y="2" z="3"/>
  </vertices>
  <triangles><triangle v1="0" v2="1" v3="2"/></triangles>
 </mesh></object></resources>
 <build><item objectid="1"/></build>
</model>`;
  const zipped = zipSync({ "3D/3dmodel.model": new TextEncoder().encode(xml) });
  const parsed = parse3mf(zipped.buffer.slice(zipped.byteOffset, zipped.byteOffset + zipped.byteLength));
  assert.equal(parsed.indices.length, 3);
  assert.equal(parsed.positions[7], 2);
  assert.equal(parsed.positions[8], 3);
  const round = parseStl(stlFromIndexed(parsed.positions, parsed.indices));
  assert.equal(round.indices.length, 3);
  assert.ok(Math.abs(round.positions[7] - 2) < 1e-5);
  ok("3MF and STL round-trip a triangle");
}

function ringVolume(mesh) {
  let volume = 0;
  const p = mesh.positions;
  const idx = mesh.indices;
  for (let t = 0; t < idx.length; t += 3) {
    const a = idx[t] * 3;
    const b = idx[t + 1] * 3;
    const c = idx[t + 2] * 3;
    volume += (p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1])
      + p[a + 1] * (p[b + 2] * p[c] - p[b] * p[c + 2])
      + p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c])) / 6;
  }
  return Math.abs(volume);
}

console.log(`${n} tests passed`);
