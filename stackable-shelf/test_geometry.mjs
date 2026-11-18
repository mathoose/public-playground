import assert from "node:assert/strict";
import { derive, FILES, profileArea } from "./geometry.js";
import { boundsOf, buildShelf, measureTwist, meshToPositions } from "./cad.js";

function sizeOf(bounds) {
  return bounds.max.map((v, i) => v - bounds.min[i]);
}

function close(actual, expected, tol, label) {
  assert.ok(Math.abs(actual - expected) <= tol, `${label}: ${actual} vs ${expected} (±${tol})`);
}

function widestRing(positions, z0, cx, cy) {
  let maxR = 0;
  for (let i = 0; i < positions.length; i += 3) {
    if (Math.abs(positions[i + 2] - z0) > 0.2) continue;
    const r = Math.hypot(positions[i] - cx, positions[i + 1] - cy);
    if (r < 3 || r > 9) continue;
    if (r > maxR) maxR = r;
  }
  return maxR;
}

function frustumVolume(mouthFlat, floorFlat, depth) {
  const mouth = profileArea("hex", mouthFlat);
  const floor = profileArea("hex", floorFlat);
  return (depth / 3) * (mouth + floor + Math.sqrt(mouth * floor));
}

const hex = derive({ fit: "press" });
assert.equal(hex.p.pattern, "hex");
assert.equal(hex.p.shelfLength, 200);
assert.equal(hex.p.shelfWidth, 200);
assert.equal(hex.p.thickness, 8);
assert.equal(hex.legFlat, 10);
assert.equal(hex.p.holeOffset, -0.1);
close(hex.floorFlat, 9.8, 1e-9, "press-fit floor");
close(hex.mouthFlat, 10.6, 1e-9, "mouth is wider than the leg");
assert.ok(hex.mouthFlat > hex.legFlat, "the leg starts in the mouth");
assert.ok(hex.floorFlat < hex.legFlat, "the floor is tighter than the leg");
assert.ok(hex.socketDepth >= 3.4, "sockets capture more of the leg");
assert.equal(hex.sockets.length, 4);
assert.equal(hex.countUsed, 4);
assert.ok(hex.cells.length >= 4, "hex cells");
assert.ok(hex.coupon.size < 40, "coupon stays a corner");
assert.equal(hex.warnings.length, 0);

const square = derive({ pattern: "square", count: 3, fit: "press" });
assert.equal(square.p.pattern, "square");
assert.equal(square.countUsed, 3);
assert.equal(square.cells.length, square.countUsed * square.rows);

const loose = derive({ holeOffset: 1, fit: "press" });
close(loose.floorFlat, hex.floorFlat + 2.2, 1e-9, "offset adds both sides");
assert.ok(loose.mouthFlat > loose.floorFlat, "a looser offset still tapers");

const built = await buildShelf({ fit: "press" });
const flatBox = boundsOf(meshToPositions(built.flat));
const flatSize = sizeOf(flatBox);
close(flatSize[0], 200, 0.2, "shelf length");
close(flatSize[1], 200, 0.2, "shelf width");
close(flatSize[2], 8, 0.05, "thickness");
close(flatBox.min[2], 0, 0.05, "flat on the bed");
assert.ok(built.flat.volume < 200 * 200 * 8 * 0.85, "openings remove material");
assert.ok(built.flat.volume > 200 * 200 * 8 * 0.25, "plate is still a plate");

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
close(testSize[2], 8, 0.05, "test thickness");
assert.ok(testSize[0] < flatSize[0] / 4, "test is one corner, not the shelf");
const pocket = frustumVolume(built.d.mouthFlat, built.d.floorFlat, built.d.socketDepth);
const filletArea = built.d.coupon.size ** 2 - built.d.cornerR ** 2 * (4 - Math.PI);
const missing = filletArea * built.d.p.thickness - built.test.volume;
assert.equal(built.flat.genus, built.d.cells.length, "only the pattern openings go through");
assert.equal(built.test.genus, 0, "the corner test pocket does not go through");
close(missing, pocket, 25, "one tapered socket");
assert.ok(missing < pocket * 1.4, "the corner test has one hole, not two");
const testPos = meshToPositions(built.test);
const hole = built.d.coupon;
const mouthR = widestRing(testPos, built.d.p.thickness, hole.holeX, hole.holeY);
const floorR = widestRing(testPos, built.d.p.thickness - built.d.socketDepth, hole.holeX, hole.holeY);
assert.ok(mouthR > floorR + 0.15, `socket narrows toward the floor (${mouthR.toFixed(2)} to ${floorR.toFixed(2)})`);

const wide = await buildShelf({ holeOffset: 1.2, fit: "press" });
assert.ok(wide.d.holeFlat > built.d.holeFlat, "offset widens the socket");
assert.equal(wide.test.genus, 0);

const thick = derive({ wall: 8, fit: "press" });
assert.equal(thick.wall, 8);
assert.ok(thick.cellFlat < hex.cellFlat, "a thicker wall leaves a smaller opening");

const squared = await buildShelf({ pattern: "square", fit: "press" });
const squareLegs = sizeOf(boundsOf(meshToPositions(squared.legs)));
close(squareLegs[2], 10, 0.15, "legs still lie on a face");
close(squared.legs.volume, 4 * profileArea("hex", 10) * squared.d.printedLeg, 1, "legs stay hexagonal");
const squarePocket = frustumVolume(squared.d.mouthFlat, squared.d.floorFlat, squared.d.socketDepth);
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

const twist = derive({ fit: "twist" });
assert.equal(twist.p.fit, "twist");
assert.ok(twist.twist, "an 8 mm plate fits the twist lock");
assert.ok(twist.twist.hookRadial >= 3, "the ear sticks out twice as far");
assert.ok(twist.twist.hookHalfWidth >= 2, "the ear is twice as wide");
assert.ok(twist.twist.twist > twist.twist.innerHalf, "the twist clears the wider ear");
assert.ok(twist.twist.landEnd < twist.twist.slotNear, "the slope still rises into the lead-in");
assert.ok(twist.twist.gap >= 0.5, "clear air between the hook and the catch");
assert.ok(twist.twist.web >= 0.7, "the two sockets do not meet");
const twistBuilt = await buildShelf({ fit: "twist" });
const twistLegs = boundsOf(meshToPositions(twistBuilt.legs));
const twistLegSize = sizeOf(twistLegs);
close(twistLegs.min[2], 0, 0.05, "twist legs on the bed");
close(twistLegSize[2], twistBuilt.d.legFlat, 0.15, "hooks do not lift the leg off its face");
assert.ok(twistLegSize[1] > twistBuilt.d.legFlat + 1, "hooks stick out the sides");
assert.equal(twistBuilt.test.genus, 0, "the twist socket does not go through");
assert.equal(twistBuilt.flat.genus, twistBuilt.d.cells.length, "twist sockets stay blind");
const fit = await measureTwist();
assert.ok(fit.gap >= 0.5, "measured gap");
assert.ok(fit.dropHit < 0.4, `dropped-in leg is clear of the socket (${fit.dropHit.toFixed(3)} mm3)`);
assert.ok(fit.lockHit < 0.4, `locked leg is clear of the catch (${fit.lockHit.toFixed(3)} mm3)`);
assert.ok(fit.gapHit < 0.01, `the space under the catch is empty (${fit.gapHit.toFixed(3)} mm3)`);
assert.ok(fit.catchHit > 0.02, "the catch is solid above that space");

console.log("stackable-shelf geometry ok");
console.log(
  `hex cells ${built.d.cells.length}, coupon ${built.d.coupon.size.toFixed(1)} mm, printed leg ${built.d.printedLeg.toFixed(1)} mm`
);
