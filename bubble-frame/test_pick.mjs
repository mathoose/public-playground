import assert from "node:assert/strict";
import { defaultParams, frameClipFor, layoutBeads } from "./geometry.js";
import { inspectBubble, measureBubble } from "./pick-map.js";

const layout = layoutBeads(defaultParams());
const clip = frameClipFor(layout);
const top = layout.beads.find((b) => b.side === "top" && b.role === "edge");
assert.ok(top, "expected a top edge bead");

const beadHit = inspectBubble(
  {
    partId: "cover",
    point: { x: top.x, y: top.y, z: clip.frameBackZ + layout.radius * 0.7 },
    normal: { x: 0, y: 1, z: 0 },
  },
  layout
);
assert.equal(beadHit.title, "Top bead");
assert.ok(beadHit.params.includes("ballDiameter"));
assert.ok(beadHit.params.includes("photoH"));
assert.ok(beadHit.params.includes("ballOverlap"));
assert.ok(!beadHit.params.includes("plateThickness"));

const plate = inspectBubble(
  {
    partId: "back",
    point: { x: 0, y: 0, z: clip.plate.t },
    normal: { x: 0, y: 0, z: 1 },
  },
  layout
);
assert.equal(plate.title, "Back plate");
assert.deepEqual(plate.params, ["plateThickness"]);

const width = measureBubble(
  { partId: "cover", point: { x: -layout.outer.w / 2, y: 0, z: clip.frameBackZ + 2 } },
  { partId: "cover", point: { x: layout.outer.w / 2, y: 0, z: clip.frameBackZ + 2 } },
  layout
);
assert.equal(width.title, "Outer width");
assert.ok(width.params.includes("photoW"));
assert.ok(width.params.includes("ballDiameter"));
assert.ok(width.params.includes("imageOverlap"));
assert.ok(!width.params.includes("plateThickness"));

const stray = measureBubble(
  { partId: "cover", point: { x: 3, y: 4, z: 1 } },
  { partId: "cover", point: { x: 18, y: 9, z: 6 } },
  layout
);
assert.deepEqual(stray.params, []);
assert.match(stray.detail, /No slider/);

const leg = measureBubble(
  { partId: "stand", point: { x: clip.pegStand.halfSpan, y: clip.pegStand.yHole, z: -clip.pegStand.legReach } },
  { partId: "stand", point: { x: clip.pegStand.halfSpan, y: clip.pegStand.yHole, z: 0 } },
  layout
);
assert.equal(leg.title, "Stand leg");
assert.ok(leg.params.includes("photoH"), `leg params ${leg.params.join(",")}`);

console.log("bubble pick map ok", {
  outer: layout.outer,
  leg: clip.pegStand.legReach,
  bead: beadHit.params,
});
