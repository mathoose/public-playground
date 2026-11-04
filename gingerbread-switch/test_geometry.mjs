import {
  DEFAULT_PARAMS,
  DOUBLE_GANG,
  PLATE_H,
  PLATE_W,
  PLATE_W_2G,
  PRESETS,
  REFERENCE_STL_BBOX,
  TOGGLE_SCREW,
  derive,
  mergeParams,
  warnings,
} from "./geometry.js";
import { boundsOf, buildParts, buildTagStls, loadManifold } from "./stl.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const d = derive(DEFAULT_PARAMS);
assert(d.p.style === "toggle", "default is a toggle plate");
assert(Math.abs(d.screwY * 2 - TOGGLE_SCREW) < 1e-6, "toggle screws are 60.3 mm apart");
assert(d.eaveX > PLATE_W / 2 + 8, "roof spills past the plate");
assert(d.wallFront > d.p.plateT + 3, "house stands off the plate");
assert(d.roofFront > d.wallFront + 1, "roof lip is proud of the walls");

const doubleParams = { ...PRESETS["double-toggle"] };
const dbl = derive(doubleParams);
assert(dbl.p.style === "double-toggle", "double preset");
assert(Math.abs(dbl.plateW - PLATE_W_2G) < 0.01, "double plate width is 115.9 mm");
assert(Math.abs(dbl.plateH - PLATE_H) < 1e-6, "double plate height stays 114.3 mm");
assert(dbl.toggles.length === 2, "two toggle centers");
assert(Math.abs(dbl.toggles[1] - dbl.toggles[0] - DOUBLE_GANG) < 1e-6, "gang spacing 46 mm");
assert(dbl.screws.length === 4, "four screw holes on double plate");
assert(Math.abs(dbl.eaveX - dbl.plateHW - doubleParams.overhang) < 1e-6, "same overhang scale as single");
assert(
  Math.abs(dbl.eaveX * 2 - REFERENCE_STL_BBOX.sizeX) < 4,
  `wide eave span ~ reference silhouette (${REFERENCE_STL_BBOX.sizeX} mm), got ${(dbl.eaveX * 2).toFixed(1)}`
);

const rocker = derive({ ...DEFAULT_PARAMS, style: "rocker", openingW: 33.4, openingH: 66.8 });
assert(Math.abs(rocker.screwY * 2 - 96.825) < 1e-6, "rocker screws are 96.8 mm apart");
assert(rocker.p.openingH > d.p.openingH, "rocker opening is taller");

const capped = mergeParams({ openingH: 90, style: "toggle" });
assert(capped.openingH < 50, `toggle opening stays clear of the screws, got ${capped.openingH}`);

const wasm = await loadManifold();
const { Manifold } = wasm;
const built = await buildTagStls(DEFAULT_PARAMS);
const g = boundsOf(built.parts.gingerbread.positions);
const icing = boundsOf(built.parts.icing.positions);
const candy = boundsOf(built.parts.candy.positions);
console.log("gingerbread", g, "vol", built.parts.gingerbread.volume.toFixed(0), "tris", built.parts.gingerbread.tris);
console.log("icing z", icing.min[2].toFixed(2), icing.max[2].toFixed(2), "vol", built.parts.icing.volume.toFixed(0));
console.log("candy z", candy.min[2].toFixed(2), candy.max[2].toFixed(2), "vol", built.parts.candy.volume.toFixed(0));

assert(Math.abs(g.min[2]) < 0.05, "back sits on the wall");
assert(g.max[0] > PLATE_W / 2 + 8, `house should extend past the plate, max x ${g.max[0]}`);
assert(g.max[1] > PLATE_H / 2, "chimney clears the top of the plate");
assert(g.max[2] > d.p.plateT + 4, "relief is thicker than the plate");
assert(icing.max[2] > g.min[2] + d.wallFront, "icing sits on the house face");
assert(built.parts.gingerbread.volume > 20000, "plate has body");

const builtDouble = await buildTagStls(doubleParams);
const gd = boundsOf(builtDouble.parts.gingerbread.positions);
assert(gd.max[0] > PLATE_W_2G / 2 + 8, "double house extends past the wide plate");
assert(gd.min[0] < -(PLATE_W_2G / 2 + 8), "double house extends past both sides");

const xml = Buffer.from(built.threemf).toString("latin1");
assert(xml.startsWith("PK"), "3mf is a zip");
assert((xml.match(/<mesh>/g) || []).length === 3, "three meshes");
assert((xml.match(/<component /g) || []).length === 3, "three parts in the assembly");
assert((xml.match(/<item /g) || []).length === 1, "one joint build item");
for (const name of ["gingerbread", "icing", "candy"]) {
  assert(xml.includes(`name="${name}"`), `missing ${name}`);
}

const temps = [];
const solids = buildParts(wasm, DEFAULT_PARAMS, temps, 32);
function empty(name, box) {
  const probe = Manifold.cube(box.size, true).translate(box.at);
  temps.push(probe);
  const hit = solids[name].intersect(probe);
  temps.push(hit);
  assert(hit.volume() < 0.05, `${name} fills ${box.label} (${hit.volume().toFixed(2)})`);
}
function solid(name, box) {
  const probe = Manifold.cube(box.size, true).translate(box.at);
  temps.push(probe);
  const hit = solids[name].intersect(probe);
  temps.push(hit);
  assert(hit.volume() > 0.2, `${name} missing at ${box.label} (${hit.volume().toFixed(2)})`);
}
empty("gingerbread", { size: [3, 3, 40], at: [0, 0, 8], label: "the door" });
empty("icing", { size: [3, 3, 40], at: [0, 0, 8], label: "the door" });
empty("candy", { size: [3, 3, 40], at: [0, 0, 8], label: "the door" });
empty("gingerbread", { size: [2, 2, 30], at: [0, d.screwY, 6], label: "the upper screw" });
empty("gingerbread", { size: [2, 2, 12], at: [0, -d.screwY, 1.5], label: "the lower screw" });
solid("gingerbread", { size: [4, 4, 2], at: [0, -48, 1.2], label: "the plate below the house" });
solid("gingerbread", { size: [4, 4, 2], at: [PLATE_W / 2 + 6, d.eaveY + 1, 2], label: "the eave past the plate" });

const tempsD = [];
const solidsD = buildParts(wasm, doubleParams, tempsD, 32);
const hx = DOUBLE_GANG / 2;
empty("gingerbread", { size: [3, 3, 40], at: [-hx, 0, 8], label: "left toggle" });
empty("gingerbread", { size: [3, 3, 40], at: [hx, 0, 8], label: "right toggle" });
empty("gingerbread", { size: [2, 2, 30], at: [-hx, dbl.screwY, 6], label: "left upper screw" });
empty("gingerbread", { size: [2, 2, 30], at: [hx, dbl.screwY, 6], label: "right upper screw" });
solid("gingerbread", { size: [6, 4, 2], at: [0, -48, 1.2], label: "double plate below house" });

const wide = derive({ ...DEFAULT_PARAMS, overhang: 24 });
assert(wide.eaveX > d.eaveX + 6, "overhang slider pushes the roof out");
assert(warnings({ ...DEFAULT_PARAMS, depth: 16 }).length > 0, "a deep house mentions the screw recess");
assert(warnings(doubleParams).some((n) => n.includes("Double toggle")), "double preset notes plate size");

for (const item of temps) item.delete?.();
for (const item of tempsD) item.delete?.();
console.log("ok");
