import assert from "node:assert/strict";
import { derive, lobeSwing, mergeParams, outsidePhoto, warnings } from "./geometry.js";
import { buildFrame } from "./stl.js";

function meshBounds(mesh) {
  const vp = mesh.vertProperties;
  const b = {
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
  };
  for (let i = 0; i < vp.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      b.min[k] = Math.min(b.min[k], vp[i + k]);
      b.max[k] = Math.max(b.max[k], vp[i + k]);
    }
  }
  return b;
}

function overlaps(a, b) {
  return a.min[0] < b.max[0] && a.max[0] > b.min[0] && a.min[1] < b.max[1] && a.max[1] > b.min[1];
}

const wall = derive({ seed: 7, mode: "wall", tube: 11, photoW: 4, photoH: 6, units: "in" });
assert.equal(outsidePhoto(wall), true, "outline stays larger than the photo");
assert.ok(lobeSwing(wall) > Math.min(wall.photoW, wall.photoH) * 0.22, "lobes are deep, not a thin ripple");
assert.ok(wall.clips.length >= 4, "clips spaced around the frame");
for (const clip of wall.clips) {
  assert.ok(clip.uOut > clip.photoEdge, "clip reaches the outside of the photo edge");
  assert.ok(clip.uIn < clip.photoEdge, "clip laps over the photo border");
}
assert.equal(wall.holes.length, 0, "wall hang has no peg holes");
assert.ok(wall.bounds.maxX - wall.bounds.minX > wall.photoW, "outline wider than the photo");
assert.ok(wall.bounds.maxY - wall.bounds.minY > wall.photoH, "outline taller than the photo");

const other = derive({ seed: 99, mode: "wall", tube: 11, photoW: 4, photoH: 6, units: "in" });
const same = derive({ seed: 7, mode: "wall", tube: 11, photoW: 4, photoH: 6, units: "in" });
assert.notEqual(wall.points[10].radius, other.points[10].radius, "a new seed is a different squiggle");
assert.equal(wall.points[10].radius, same.points[10].radius, "a seed repeats");

const thick = derive({ seed: 7, tube: 16, photoW: 4, photoH: 6, units: "in" });
const thin = derive({ seed: 7, tube: 8, photoW: 4, photoH: 6, units: "in" });
assert.ok(thick.R > thin.R);
assert.ok(thick.section.height > thin.section.height, "thickness slider changes the tube");
assert.ok(thick.ampScale > 0.6, "a thicker tube keeps the squiggle");
assert.ok(
  thick.bounds.maxX - thick.bounds.minX > thin.bounds.maxX - thin.bounds.minX,
  "a thicker tube does not shrink the outline"
);

const standShape = derive({ seed: 7, mode: "stand", tube: 11, photoW: 4, photoH: 6, units: "in" });
assert.equal(standShape.holes.length, 2, "stand has two holes");
const sep = Math.hypot(
  standShape.holes[0].x - standShape.holes[1].x,
  standShape.holes[0].y - standShape.holes[1].y
);
assert.ok(sep > 30, "holes are spaced apart");
const midY = (standShape.bounds.minY + standShape.bounds.maxY) / 2;
for (const hole of standShape.holes) {
  assert.ok(hole.y < midY, "holes sit on the lower half, where the pegs hold it up");
}

const builtWall = await buildFrame({ seed: 7, mode: "wall", tube: 11, photoW: 4, photoH: 6, units: "in" });
assert.equal(builtWall.genus, 1);
assert.ok(builtWall.bbox.min[2] >= -0.01 && builtWall.bbox.min[2] <= 0.05, "flat back on the bed");
assert.equal(builtWall.checks.openingEmpty, true);
assert.equal(builtWall.checks.slotEmpty, true);
assert.equal(builtWall.checks.shelfSolid, true);
assert.equal(builtWall.checks.ridgeSolid, true);
assert.equal(builtWall.parts.pegs, undefined);
const wallXml = Buffer.from(builtWall.threemf).toString("latin1");
assert.equal((wallXml.match(/<item /g) || []).length, 1);
assert.match(wallXml, /unit="millimeter"/);

const built = await buildFrame(
  { seed: 42, mode: "stand", tube: 12, photoW: 5, photoH: 7, units: "in" },
  { quality: "export" }
);
assert.equal(built.genus, 1);
assert.equal(built.checks.holesEmpty, true);
assert.equal(built.checks.roofsSolid, true);
assert.equal(built.checks.slotEmpty, true);
assert.ok(built.parts.pegs.volume > 100);
const pegBox = meshBounds(built.parts.pegs.mesh);
assert.ok(pegBox.min[2] >= -0.05, "pegs sit on the bed");
const frameBox = meshBounds(built.parts.frame.mesh);
assert.equal(overlaps(pegBox, frameBox), false, "pegs sit beside the frame, not inside it");
const xml = Buffer.from(built.threemf).toString("latin1");
assert.equal((xml.match(/<item /g) || []).length, 1, "one build item");
assert.equal((xml.match(/<component /g) || []).length, 2, "frame and pegs in one assembly");
assert.match(xml, /transform="1 0 0 0 1 0 0 0 1 0 0 0"/);

const merged = mergeParams({ units: "mm", photoW: 100, photoH: 150, tube: 3, mode: "nope", seed: -4 });
assert.equal(merged.tube, 8);
assert.equal(merged.mode, "wall");
assert.equal(merged.units, "mm");
assert.ok(warnings({ tube: 16, photoW: 1, photoH: 1.2, units: "in", seed: 7 }).length >= 1);

console.log(
  `ok squiggle seed 7 · ${builtWall.d.clips.length} clips · tube ${builtWall.d.p.tube} mm · stand holes ${built.d.peg.holeD.toFixed(1)} mm`
);
