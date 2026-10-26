import { DEFAULT_PARAMS, derive, mergeParams, outlinePoints } from "./geometry.js";
import { boundsOf, buildTagSolid, buildTagStl, loadManifold } from "./stl.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const d = derive(DEFAULT_PARAMS);
assert(Math.abs(d.height - 55) < 1e-6, "default height");
assert(Math.abs(d.p.hole - 5) < 1e-6, "default hole");
assert(Math.abs(d.p.letterH - 0.8) < 1e-6, "default letter height");
assert(d.width > 36 && d.width < 42, `width ${d.width}`);
assert(d.holeY > d.height * 0.8, "hole sits near the top");
assert(d.height - d.holeY - d.p.hole / 2 > 1.6, "wall above the hole");

const outline = outlinePoints(d, 8);
assert(outline.length > 8, "outline");
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
const full = await buildTagStl(DEFAULT_PARAMS);
const blank = await buildTagStl({ ...DEFAULT_PARAMS, letterH: 0 });
const b = boundsOf(full.positions);
console.log("bbox", b.min, b.max, "genus", full.genus, "tris", full.tris, "vol", full.volume.toFixed(1));

assert(full.genus === 1, `genus ${full.genus} (one through-hole, letters are bumps)`);
assert(Math.abs(b.max[1] - b.min[1] - 55) < 0.2, "stl height");
assert(Math.abs(b.max[0] - b.min[0] - d.width) < 0.3, "stl width");
assert(Math.abs(b.max[2] - (2 + 0.8)) < 0.05, `stl thickness+letters ${b.max[2]}`);
assert(Math.abs(b.min[2]) < 0.05, "flat on the bed");
assert(full.volume > blank.volume + 80, "letters add volume");
assert(full.tris < 80000, "triangle count");

const temps2 = [];
const probe = Manifold.cube([0.5, 0.5, 4], true).translate([d.holeX, d.holeY, 1]);
temps2.push(probe);
const tag = buildTagSolid(wasm, DEFAULT_PARAMS, temps2, 48);
const hit = tag.intersect(probe);
temps2.push(hit);
assert(hit.volume() < 0.01, `hole is filled, probe volume ${hit.volume()}`);

const deep = Manifold.cube([1.2, 1.2, 0.4], true).translate([11, 40, 2.5]);
temps2.push(deep);
const ink = tag.intersect(deep);
temps2.push(ink);
assert(ink.volume() > 0.2, `expected a raised stroke near Please, got ${ink.volume()}`);

for (const item of temps2) item.delete?.();
console.log("ok");
