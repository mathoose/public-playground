import assert from "node:assert/strict";
import { DEFAULT_PARAMS, derive, warnings } from "./geometry.js";
import { buildLock } from "./stl.js";

const d = derive(DEFAULT_PARAMS);

assert.equal(d.p.slotLength, 32.2);
assert.equal(d.p.slotWidth, 11.4);
assert.equal(d.p.engagement, 8);
assert.ok(Math.abs(d.hookY - (d.p.slotWidth + 2 * d.p.engagement)) < 1e-6);
assert.ok(d.insertGap > 2, `insert gap ${d.insertGap}`);
assert.ok(d.hookX < d.p.slotWidth - 0.8);
assert.ok(d.seatLeft > 3, `seat left ${d.seatLeft}`);
assert.equal(warnings(d).length, 0, warnings(d).join(" | "));

const shallow = derive({ engagement: 3.5 });
assert.ok(warnings(shallow).some((n) => n.includes("fell out")));

const tooDeep = derive({ engagement: 14 });
assert.ok(warnings(tooDeep).some((n) => n.includes("cannot drop")));

const { mesh, volume, genus, tris } = await buildLock(DEFAULT_PARAMS, { quality: "export" });
assert.ok(volume > 800 && volume < 8000, `volume ${volume}`);
assert.ok(tris > 100, `tris ${tris}`);
assert.equal(genus, 0);

const stride = mesh.numProp || 3;
const verts = mesh.vertProperties;
let min = [Infinity, Infinity, Infinity];
let max = [-Infinity, -Infinity, -Infinity];
let bottom = 0;
let shelf = 0;
let tipLow = false;
for (let i = 0; i < verts.length; i += stride) {
  const x = verts[i];
  const y = verts[i + 1];
  const z = verts[i + 2];
  min = [Math.min(min[0], x), Math.min(min[1], y), Math.min(min[2], z)];
  max = [Math.max(max[0], x), Math.max(max[1], y), Math.max(max[2], z)];
  if (z < 0.05) bottom++;
  if (Math.abs(z - d.thickness) < 0.15 && Math.abs(y) > d.neckR + 0.4 && Math.abs(y) < d.shelfY - 0.3) {
    shelf++;
  }
  if (Math.abs(Math.abs(y) - d.hookY / 2) < 0.35 && z > d.tipH + 0.45) tipLow = true;
}

assert.ok(Math.abs(min[2]) < 0.05, `min z ${min[2]}`);
assert.ok(Math.abs(max[2] - d.totalZ) < 0.08, `max z ${max[2]} vs ${d.totalZ}`);
assert.ok(Math.abs(max[1] - d.hookY / 2) < 0.2, `max y ${max[1]} vs ${d.hookY / 2}`);
assert.ok(Math.abs(max[0] - Math.max(d.hookX, d.headX) / 2) < 0.25, `max x ${max[0]}`);
assert.ok(bottom > 20, "flat bottom on the bed");
assert.ok(shelf > 8, `flat shelf vertices ${shelf}`);
assert.equal(tipLow, false, "hook tips should ramp down, not stay full height");

console.log(
  `ok  ${d.hookX.toFixed(1)}×${d.hookY.toFixed(1)}×${d.totalZ.toFixed(1)} mm  engagement ${d.p.engagement}  seat ${d.seatLeft.toFixed(1)}  genus ${genus}  ${tris} tris  ~${(volume / 1000 * 1.24).toFixed(1)} g`
);
