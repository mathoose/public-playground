import assert from "node:assert/strict";
import { DEFAULT_HOLE_SPACING, DEFAULT_PIN_DIAMETER, DEFAULT_PARAMS, derive, sideWallPoint, warnings } from "./geometry.js";
import { inspectHolder } from "./stl.js";

const d = derive(DEFAULT_PARAMS);
assert.equal(d.mode, "clip");
assert.equal(d.p.pinDiameter, DEFAULT_PIN_DIAMETER);
assert.equal(d.p.holeSpacing, DEFAULT_HOLE_SPACING);
assert.equal(d.pinSpacing, 32);
assert.equal(d.pinXs[1] - d.pinXs[0], 32);
assert.equal(d.sideWall, false);
assert.equal(warnings(DEFAULT_PARAMS).length, 0);

const binD = derive({ mode: "bin" });
assert.equal(binD.sideWall, true);
assert.ok(binD.binInner < binD.width);
assert.equal(sideWallPoint(binD).y, binD.width / 2 - binD.wall / 2);

const wide = await inspectHolder({ holeSpacing: 32 });
assert.equal(wide.status, "NoError");
assert.ok(Math.abs(wide.pins.spacing - 32) < 0.15, `pin spacing ${wide.pins.spacing}`);
assert.ok(Math.abs(wide.pins.left.diameter - 5) < 0.2, `pin diameter ${wide.pins.left.diameter}`);
assert.ok(Math.abs(wide.pins.right.diameter - 5) < 0.2, `pin diameter ${wide.pins.right.diameter}`);
assert.equal(wide.sideHit, false, "clip has no side wall");
assert.equal(wide.interiorHit, false, "clip pocket is open");
assert.equal(wide.above, false, "opening faces up");
assert.equal(wide.rimHit, true, "cradle rim is solid");
assert.equal(wide.between, false, "pins are separate");
assert.equal(wide.pieces, 1, "clip is one piece");
assert.equal(wide.genus, 0);
assert.ok(Math.abs(wide.bounds.min[2]) < 0.05, `pins on the bed, min z ${wide.bounds.min[2]}`);
assert.ok(wide.bounds.max[2] > wide.d.pinLength + 10, "cradle rises above the pins");

const spaced = await inspectHolder({ holeSpacing: 50, pinDiameter: 6.5 });
assert.ok(Math.abs(spaced.pins.spacing - 50) < 0.15, `moved spacing ${spaced.pins.spacing}`);
assert.ok(Math.abs(spaced.pins.left.diameter - 6.5) < 0.25, `moved diameter ${spaced.pins.left.diameter}`);
assert.ok(spaced.pins.spacing > wide.pins.spacing + 10);

const bin = await inspectHolder({ mode: "bin" });
assert.equal(bin.d.sideWall, true);
assert.equal(bin.sideHit, true, "square mode has a side wall");
assert.equal(bin.xWallHit, true, "square cup has the other side wall too");
assert.equal(bin.lipHit, true, "side wall reaches the rim");
assert.equal(bin.interiorHit, false, "bin is hollow");
assert.equal(bin.above, false, "bin top is open");
assert.equal(bin.pieces, 1, "bin is one piece");
assert.equal(bin.genus, 0);
assert.ok(Math.abs(bin.pins.spacing - 32) < 0.15, `bin pin spacing ${bin.pins.spacing}`);
assert.ok(Math.abs(bin.bounds.min[2]) < 0.05, `bin pins on the bed ${bin.bounds.min[2]}`);

const clipAtBinWall = await inspectHolder({ mode: "clip", width: bin.d.width, wall: bin.d.wall });
assert.equal(clipAtBinWall.sideHit, false, "same spot on the clip is open");

console.log(
  `ok  pins ${wide.pins.spacing.toFixed(2)} mm / Ø ${wide.pins.left.diameter.toFixed(2)} mm  clip ${wide.tris} tris  bin side wall  pieces ${wide.pieces}`,
);
