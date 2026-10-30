import assert from "node:assert/strict";
import { defaultParams, frameClipFor, layoutStripes } from "./geometry.js";
import { inspectStriped, measureStriped } from "./pick-map.js";

const layout = layoutStripes(defaultParams());
const clip = frameClipFor(layout);
const top = layout.segments
  .flatMap((seg) => seg.boxes.map((b) => ({ seg, b })))
  .find((item) => item.b.side === "top" && item.b.kind !== "arc");
assert.ok(top, "expected a top band");

const midY = (top.b.minY + top.b.maxY) / 2;
const hit = inspectStriped(
  {
    partId: "cover",
    point: { x: (top.b.minX + top.b.maxX) / 2, y: top.b.maxY - 0.4, z: clip.frameBackZ + top.seg.height - 0.2 },
    normal: { x: 0, y: 0, z: 1 },
  },
  layout
);
assert.match(hit.title, /Color \d band/);
assert.ok(hit.params.includes("sharedHeight"), hit.params.join(","));
assert.ok(hit.params.includes(`colorThick${top.seg.colorIndex}`));

const rail = measureStriped(
  { partId: "cover", point: { x: 0, y: layout.opening.h / 2, z: clip.frameBackZ + 2 } },
  { partId: "cover", point: { x: 0, y: layout.outer.h / 2, z: clip.frameBackZ + 2 } },
  layout
);
assert.equal(rail.title, "Top rail");
assert.deepEqual(rail.params, ["mouldingWidth"]);

const outerW = measureStriped(
  { partId: "cover", point: { x: -layout.outer.w / 2, y: 0, z: clip.frameBackZ + 2 } },
  { partId: "cover", point: { x: layout.outer.w / 2, y: 0, z: clip.frameBackZ + 2 } },
  layout
);
assert.equal(outerW.title, "Outer width");
assert.ok(outerW.params.includes("photoW"));
assert.ok(outerW.params.includes("lip"));
assert.ok(outerW.params.includes("mouldingWidth"));

const stray = measureStriped(
  { partId: "cover", point: { x: 2, y: 3, z: clip.frameBackZ + 1 } },
  { partId: "back", point: { x: 20, y: 8, z: 0.4 } },
  layout
);
assert.deepEqual(stray.params, []);
assert.match(stray.detail, /No slider/);

console.log("striped pick map ok", { outer: layout.outer, band: top.seg.length, midY, hit: hit.params });
