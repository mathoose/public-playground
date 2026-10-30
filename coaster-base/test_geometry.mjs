import assert from "node:assert/strict";
import { DEFAULT_PARAMS, derive, warnings } from "./geometry.js";
import { buildCoaster, buildCoasterExportMesh } from "./stl.js";

const d = derive(DEFAULT_PARAMS);
assert.equal(d.p.armHeight, 26);
assert.equal(d.p.armWidth, 10);
assert.equal(d.totalZ, 31);
assert.equal(d.outerSize, 112);
assert.equal(warnings(DEFAULT_PARAMS).length, 0);

const tall = derive({ armHeight: 40 });
assert.ok(warnings({ armHeight: 40 }).some((n) => n.includes("Tall arms")));

const { mesh, volume, genus, tris, d: built, armTopZ } = await buildCoaster(DEFAULT_PARAMS, {
  quality: "export",
});
assert.ok(tris > 11000, `tris ${tris}`);
assert.ok(volume > 120000 && volume < 160000, `volume ${volume}`);
assert.equal(genus, 0);
assert.ok(armTopZ > built.totalZ - 1 && armTopZ < built.totalZ + 2.5, `arm top ${armTopZ} vs ${built.totalZ}`);

const stride = mesh.numProp || 3;
const verts = mesh.vertProperties;
let min = [Infinity, Infinity, Infinity];
let max = [-Infinity, -Infinity, -Infinity];
for (let i = 0; i < verts.length; i += stride) {
  const x = verts[i];
  const y = verts[i + 1];
  const z = verts[i + 2];
  min = [Math.min(min[0], x), Math.min(min[1], y), Math.min(min[2], z)];
  max = [Math.max(max[0], x), Math.max(max[1], y), Math.max(max[2], z)];
}

assert.ok(Math.abs(min[2]) < 0.05, `min z ${min[2]}`);
assert.ok(Math.abs(max[0] - built.outerR) < 3, `max x ${max[0]}`);
assert.ok(Math.abs(max[1] - built.outerR) < 3, `max y ${max[1]}`);

const short = await buildCoaster({ armHeight: 13, armWidth: 5 }, { quality: "export" });
assert.equal(short.d.totalZ, 18);
assert.ok(short.armTopZ < armTopZ - 5, `short arm top ${short.armTopZ} vs default ${armTopZ}`);
assert.ok(short.volume < volume - 4000, `short volume ${short.volume} vs ${volume}`);

const exported = await buildCoasterExportMesh(DEFAULT_PARAMS);
assert.equal(exported.tris, 12832, `export default tris ${exported.tris}`);

console.log(
  `ok  preview ${built.outerSize.toFixed(0)}×${built.totalZ.toFixed(1)} mm  arm top ${armTopZ.toFixed(2)}  export ${exported.tris} tris  ~${((volume / 1000) * 1.24).toFixed(1)} g`,
);
