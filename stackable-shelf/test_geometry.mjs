import assert from "node:assert/strict";
import { derive, FILES, profileArea } from "./geometry.js";
import { boundsOf, buildShelf, meshToPositions } from "./cad.js";

function sizeOf(bounds) {
  return bounds.max.map((v, i) => v - bounds.min[i]);
}

function close(actual, expected, tol, label) {
  assert.ok(Math.abs(actual - expected) <= tol, `${label}: ${actual} vs ${expected} (±${tol})`);
}

const hex = derive();
assert.equal(hex.p.pattern, "hex");
assert.equal(hex.p.shelfLength, 200);
assert.equal(hex.p.shelfWidth, 200);
assert.equal(hex.p.thickness, 6);
assert.equal(hex.legFlat, 10);
close(hex.holeFlat, 10.8, 1e-9, "default hole");
assert.equal(hex.sockets.length, 4);
assert.equal(hex.countUsed, 4);
assert.ok(hex.cells.length >= 4, "hex cells");
assert.ok(hex.coupon.size < 40, "coupon stays a corner");
assert.equal(hex.warnings.length, 0);

const square = derive({ pattern: "square", count: 3 });
assert.equal(square.p.pattern, "square");
assert.equal(square.countUsed, 3);
assert.equal(square.cells.length, square.countUsed * square.rows);

const loose = derive({ holeOffset: 1 });
close(loose.holeFlat, hex.holeFlat + 1.2, 1e-9, "offset adds both sides");

const built = await buildShelf();
const flatBox = boundsOf(meshToPositions(built.flat));
const flatSize = sizeOf(flatBox);
close(flatSize[0], 200, 0.2, "shelf length");
close(flatSize[1], 200, 0.2, "shelf width");
close(flatSize[2], 6, 0.05, "thickness");
close(flatBox.min[2], 0, 0.05, "flat on the bed");
assert.ok(built.flat.volume < 200 * 200 * 6 * 0.85, "openings remove material");
assert.ok(built.flat.volume > 200 * 200 * 6 * 0.25, "plate is still a plate");

const legBox = boundsOf(meshToPositions(built.legs));
const legSize = sizeOf(legBox);
close(legBox.min[2], 0, 0.05, "legs on the bed");
close(legSize[2], built.d.legFlat, 0.15, "legs lie on a face");
close(legSize[0], built.d.printedLeg, 0.2, "leg length is horizontal");
assert.ok(legSize[0] > legSize[2] * 3, "legs print flat, not standing");
close(built.legs.volume, 4 * profileArea("hex", built.d.legFlat) * built.d.printedLeg, 1, "four leg volumes");

const testBox = boundsOf(meshToPositions(built.test));
const testSize = sizeOf(testBox);
close(testSize[0], built.d.coupon.size, 0.2, "test width");
close(testSize[1], built.d.coupon.size, 0.2, "test depth");
close(testSize[2], 6, 0.05, "test thickness");
assert.ok(testSize[0] < flatSize[0] / 4, "test is one corner, not the shelf");
const pocket = profileArea("hex", built.d.holeFlat) * built.d.socketDepth;
const filletArea = built.d.coupon.size ** 2 - built.d.cornerR ** 2 * (4 - Math.PI);
const missing = filletArea * built.d.p.thickness - built.test.volume;
assert.equal(built.flat.genus, built.d.cells.length, "only the pattern openings go through");
assert.equal(built.test.genus, 0, "the corner test pocket does not go through");
close(missing, pocket, 20, "one socket");
assert.ok(missing < pocket * 1.4, "the corner test has one hole, not two");

const wide = await buildShelf({ holeOffset: 1.2 });
assert.ok(wide.d.holeFlat > built.d.holeFlat, "offset widens the socket");
assert.equal(wide.test.genus, 0);

const thick = derive({ wall: 8 });
assert.equal(thick.wall, 8);
assert.ok(thick.cellFlat < hex.cellFlat, "a thicker wall leaves a smaller opening");

const squared = await buildShelf({ pattern: "square" });
const squareLegs = sizeOf(boundsOf(meshToPositions(squared.legs)));
close(squareLegs[2], 10, 0.15, "legs still lie on a face");
close(squared.legs.volume, 4 * profileArea("hex", 10) * squared.d.printedLeg, 1, "legs stay hexagonal");
const squarePocket = profileArea("hex", squared.d.holeFlat) * squared.d.socketDepth;
const squareFillet = squared.d.coupon.size ** 2 - squared.d.cornerR ** 2 * (4 - Math.PI);
close(squareFillet * squared.d.p.thickness - squared.test.volume, squarePocket, 20, "square openings, hexagonal test hole");
assert.equal(squared.test.genus, 0);
assert.ok(squared.flat.genus > 0, "square openings still go through");

const bytes = new Uint8Array(built.threemf);
assert.equal(bytes[0], 0x50);
assert.equal(bytes[1], 0x4b);
const xml = new TextDecoder().decode(bytes);
assert.match(xml, /unit="millimeter"/);
assert.equal((xml.match(/<item /g) || []).length, 1);
assert.equal((xml.match(/<component /g) || []).length, 5);
assert.match(xml, /Flat piece/);
assert.match(xml, /Leg 1/);

assert.equal(FILES.test, "stackable-shelf-hole-test.stl");

console.log("stackable-shelf geometry ok");
console.log(
  `hex cells ${built.d.cells.length}, coupon ${built.d.coupon.size.toFixed(1)} mm, printed leg ${built.d.printedLeg.toFixed(1)} mm`
);
