import { DEFAULT_PARAMS, derive, mergeParams, outlinePoints, scaledLetters, warnings } from "./geometry.js";
import { boundsOf, buildParts, buildTagStls, loadManifold } from "./stl.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const d = derive(DEFAULT_PARAMS);
assert(Math.abs(d.height - 55) < 1e-6, "default height");
assert(Math.abs(d.p.hole - 5) < 1e-6, "default hole");
assert(Math.abs(d.p.letterH - 0.8) < 1e-6, "default letter height");
assert(d.p.letterSize === 100, "default letter size");
assert(d.p.letterShift === 0, "default letter shift");

function boxOf(polys) {
  const b = { minX: Infinity, minY: Infinity, maxX: -Infinity, maxY: -Infinity };
  for (const poly of polys) {
    for (const [x, y] of poly) {
      if (x < b.minX) b.minX = x;
      if (y < b.minY) b.minY = y;
      if (x > b.maxX) b.maxX = x;
      if (y > b.maxY) b.maxY = y;
    }
  }
  return b;
}
const atPhoto = boxOf(scaledLetters(55, 100));
const bigger = boxOf(scaledLetters(55, 140));
assert(Math.abs(atPhoto.maxX - atPhoto.minX - 24.186) < 0.02, "100% keeps the traced width");
const photoW = atPhoto.maxX - atPhoto.minX;
const bigW = bigger.maxX - bigger.minX;
assert(Math.abs(bigW / photoW - 1.4) < 0.01, `140% should be 1.4× wide, got ${bigW / photoW}`);
const photoMidX = (atPhoto.minX + atPhoto.maxX) / 2;
const bigMidX = (bigger.minX + bigger.maxX) / 2;
assert(Math.abs(photoMidX - bigMidX) < 0.05, "letter size grows in place");
const dropped = boxOf(scaledLetters(55, 100, -6));
assert(Math.abs(dropped.maxY - (atPhoto.maxY - 6)) < 0.02, "shift moves the writing down");
assert(Math.abs(dropped.minX - atPhoto.minX) < 0.02, "shift does not move the writing sideways");
const crowded = warnings({ ...DEFAULT_PARAMS, letterSize: 140 });
assert(crowded.some((n) => n.includes("hole")), "large letters warn about the hole");
const cleared = warnings({ ...DEFAULT_PARAMS, letterSize: 140, letterShift: -8 });
assert(!cleared.some((n) => n.includes("hole")), `down shift should clear the hole, got ${cleared.join(" | ")}`);
assert(d.ringOuter > d.p.hole / 2 + 0.8, `ring should band the hole, outer ${d.ringOuter}`);
assert(d.ringOuter < d.p.hole / 2 + 2.2, `ring band too wide ${d.ringOuter}`);
assert(d.height - d.holeY - d.ringOuter > 1.1, "parchment outside the ring");

const outline = outlinePoints(d, 8);
let area = 0;
for (let i = 0; i < outline.length; i++) {
  const a = outline[i];
  const b = outline[(i + 1) % outline.length];
  area += a[0] * b[1] - b[0] * a[1];
}
assert(area > 0, "outline is counter-clockwise");

const capped = mergeParams({ height: 40, hole: 12 });
assert(capped.hole < 8, `small tag clamps the hole, got ${capped.hole}`);

const wasm = await loadManifold();
const { Manifold } = wasm;
const built = await buildTagStls(DEFAULT_PARAMS);
const { body, letters, ring } = built.parts;
const bb = boundsOf(body.positions);
const lb = boundsOf(letters.positions);
const rb = boundsOf(ring.positions);
console.log("body", bb, "genus", body.genus, "vol", body.volume.toFixed(1));
console.log("letters z", lb.min[2], lb.max[2], "vol", letters.volume.toFixed(1));
console.log("ring z", rb.min[2], rb.max[2], "vol", ring.volume.toFixed(1), "outer", d.ringOuter.toFixed(2));

assert(body.genus === 1, `body genus ${body.genus}`);
assert(Math.abs(bb.max[1] - bb.min[1] - 55) < 0.2, "body height");
assert(Math.abs(bb.max[2] - 2) < 0.05, "body peaks stay at the plate");
assert(body.volume < 3980 && body.volume > 3400, `paper grain should cut the body, vol ${body.volume}`);
let valleys = 0;
for (let i = 2; i < body.positions.length; i += 3) {
  const z = body.positions[i];
  if (z > 1.55 && z < 1.9) valleys++;
}
assert(valleys > 400, `paper valleys missing (${valleys})`);

const xml = Buffer.from(built.threemf).toString("latin1");
assert(xml.startsWith("PK"), "3mf is a zip");
for (const name of ["body", "letters", "ring"]) {
  assert(xml.includes(`name="${name}"`), `3mf missing ${name}`);
}
assert((xml.match(/<mesh>/g) || []).length === 3, "3mf should keep three separate meshes");
assert((xml.match(/<item /g) || []).length === 3, "3mf should place three parts");
assert(Math.abs(lb.max[2] - 2.8) < 0.08, "letters raised 0.8");
assert(Math.abs(rb.max[2] - 2.8) < 0.08, "ring raised with the letters");
assert(letters.volume > 80, "letters still have volume");
assert(ring.volume > 12 && ring.volume < 80, `ring volume ${ring.volume}`);

const temps = [];
const solids = buildParts(wasm, DEFAULT_PARAMS, temps, 64);
const holeProbe = Manifold.cube([0.4, 0.4, 4], true).translate([d.holeX, d.holeY, 1.4]);
temps.push(holeProbe);
for (const name of ["body", "ring", "letters"]) {
  const hit = solids[name].intersect(holeProbe);
  temps.push(hit);
  assert(hit.volume() < 0.02, `${name} fills the hole (${hit.volume()})`);
}

const bandY = d.holeY - (d.p.hole / 2 + d.ringOuter) / 2;
const bandProbe = Manifold.cube([0.4, 0.4, 0.4], true).translate([d.holeX, bandY, 2.45]);
temps.push(bandProbe);
const bandHit = solids.ring.intersect(bandProbe);
temps.push(bandHit);
assert(bandHit.volume() > 0.02, `ring missing at the band, vol ${bandHit.volume()}`);

const ink = Manifold.cube([1.2, 1.2, 0.4], true).translate([11, 40, 2.5]);
temps.push(ink);
const inkHit = solids.letters.intersect(ink);
temps.push(inkHit);
assert(inkHit.volume() > 0.15, `letters moved, probe ${inkHit.volume()}`);

const overlap = solids.letters.intersect(solids.ring);
temps.push(overlap);
assert(overlap.volume() < 0.5, `letters collide with the ring (${overlap.volume()})`);

for (const item of temps) item.delete?.();
console.log("ok");
