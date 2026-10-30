import { DEFAULT_PARAMS, derive, eyeletCenter, linkMetrics, mergeParams, warnings } from "./geometry.js";
import { boundsOf, buildBagStls, buildParts, loadManifold } from "./stl.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const link = linkMetrics(44);
assert(link.hookRi > link.eyeR + 0.4, "hook clears the next eye");
assert(link.gate > link.neckW + 0.8, "neck leaves through the gate");
assert(link.eyeR * 2 > link.gate + 4, "the eye cannot slip back out the gate");
assert(link.boneShaft >= 8, "the bone shaft is long enough to see");
assert(link.eyeRi > 2.4, "eye hole stays open");

const bag = derive(DEFAULT_PARAMS);
assert(bag.mode === "bag", "default is the side bag");
assert(bag.outerH > bag.innerH, "the floor adds height");
assert(bag.lattice.xs.length >= 2, "front has ribs");
assert(bag.lattice.rows.length >= 2, "ribs stack with bone bands");
assert(bag.bowlTop + 8 < bag.rimBottom, "open ribs sit above the bowl");

const phone = derive({ ...DEFAULT_PARAMS, mode: "phone" });
assert(Math.abs(phone.p.phoneWidth - 71.6) < 1e-6, "phone width starts at an iPhone 16");
assert(Math.abs(phone.p.phoneHeight - 147.6) < 1e-6, "phone height starts at an iPhone 16");
assert(Math.abs(phone.p.phoneDepth - 7.8) < 1e-6, "phone depth starts at an iPhone 16");
assert(phone.cavityW > phone.p.phoneWidth, "cage is wider than the phone");
assert(phone.cavityD > phone.p.phoneDepth, "cage is deeper than the phone");
assert(phone.cavityH > phone.p.phoneHeight, "cage is taller than the phone");

const capped = mergeParams({ links: 99, bagWidth: 1, phoneDepth: 1 });
assert(capped.links === 36, "link count clamps");
assert(capped.bagWidth === 50, "bag width clamps");
assert(capped.phoneDepth === 6, "phone depth clamps");
assert(warnings({ ...DEFAULT_PARAMS, links: 36 }).some((n) => /bed/i.test(n)), "a long chain mentions the bed");

const wasm = await loadManifold();
const { Manifold } = wasm;
const temps = [];

function probe(solid, size, at) {
  const cube = Manifold.cube(size, true).translate(at);
  temps.push(cube);
  const hit = solid.intersect(cube);
  temps.push(hit);
  return hit.volume();
}

function checkMode(label, raw) {
  const local = [];
  const built = buildParts(wasm, raw, local, 28);
  const { body, chain, clasps, linkSolids, d } = built;
  const bb = body.boundingBox();
  const cb = chain.boundingBox();
  const kb = clasps.boundingBox();
  console.log(label, "body", bb.min.map((n) => n.toFixed(1)), bb.max.map((n) => n.toFixed(1)), "vol", body.volume().toFixed(0));
  console.log(label, "chain z", cb.min[2].toFixed(2), cb.max[2].toFixed(2), "x", cb.min[0].toFixed(1), cb.max[0].toFixed(1), "shells", chain.decompose().length);
  console.log(label, "clasps", kb.min.map((n) => n.toFixed(1)), kb.max.map((n) => n.toFixed(1)));

  assert(bb.min[2] > -0.05, `${label} body sits on the bed`);
  assert(cb.min[2] > -0.05, `${label} chain sits on the bed`);
  assert(kb.min[2] > -0.05, `${label} clasps sit on the bed`);
  assert(body.volume() > 8000, `${label} body has substance`);
  assert(chain.decompose().length === raw.links || chain.decompose().length === d.p.links, `${label} chain is separate links`);

  let sum = 0;
  for (const linkSolid of linkSolids) sum += linkSolid.volume();
  let fused = linkSolids[0];
  for (let i = 1; i < linkSolids.length; i++) {
    fused = fused.add(linkSolids[i]);
    local.push(fused);
  }
  assert(Math.abs(fused.volume() - sum) < 2, `${label} links overlap (${sum.toFixed(1)} vs ${fused.volume().toFixed(1)})`);

  const bodyChain = body.intersect(chain);
  const bodyClasp = body.intersect(clasps);
  const chainClasp = chain.intersect(clasps);
  local.push(bodyChain, bodyClasp, chainClasp);
  assert(bodyChain.volume() < 0.5, `${label} chain hits the body`);
  assert(bodyClasp.volume() < 0.5, `${label} clasps hit the body`);
  assert(chainClasp.volume() < 0.5, `${label} clasps hit the chain`);

  if (d.mode === "bag") {
    assert(probe(body, [8, 8, 8], [0, 0, d.floor + 12]) < 0.2, "bag cavity is open");
    assert(probe(body, [6, 6, 1.2], [0, 0, 0.7]) > 2, "bag floor is solid");
    const slot = d.lattice.xs[0];
    const z = d.lattice.rows[0] + d.lattice.slotH / 2;
    assert(probe(body, [3, 8, 3], [slot, d.outerD / 2, z]) < 0.3, "a front rib gap is open");
    assert(probe(body, [3, 3, 3], [0, d.outerD / 2 - 1, z]) > 1, "sternum stays between the ribs");
  } else {
    const cy = -d.outerD / 2 + d.backT + d.cavityD / 2;
    const cz = d.floor + d.cavityH / 2;
    assert(probe(body, [10, 4, 10], [0, cy, cz]) < 0.2, "phone cavity is open");
    assert(probe(body, [8, 6, 1.2], [0, 0, 0.8]) > 1, "phone shelf is solid");
    const lipX = d.cavityW / 2 - d.lip / 2;
    const lipY = d.outerD / 2 - d.lipT / 2;
    assert(probe(body, [2.2, 1.4, 8], [lipX, lipY, d.outerH * 0.45]) > 0.4, "front lip holds the phone");
    assert(probe(body, [8, 6, 6], [0, d.outerD / 2, d.outerH * 0.5]) < 0.3, "screen opening is clear");
  }

  const eye = eyeletCenter(d, 1);
  assert(probe(body, [2, 2, 2], [eye.x, eye.y, eye.z]) < 0.2, `${label} eyelet hole is open`);
  assert(probe(body, [2.2, 2.2, 2.2], [d.outerW / 2 - 0.4, 0, eye.z]) > 0.3, `${label} eyelet fuses to the wall`);

  const shells = chain.decompose();
  for (const item of shells) {
    try { item.delete?.(); } catch { /* shared handle */ }
  }
  for (const item of local) {
    try { item.delete?.(); } catch { /* already freed */ }
  }
}

const few = { ...DEFAULT_PARAMS, links: 8 };
checkMode("bag", few);
checkMode("phone", { ...few, mode: "phone" });

const exported = await buildBagStls(DEFAULT_PARAMS);
const bodyBounds = boundsOf(exported.parts.body.positions);
assert(bodyBounds.min[2] > -0.05, "export body is on the bed");
const xml = Buffer.from(exported.threemf).toString("latin1");
assert(xml.startsWith("PK"), "3mf is a zip");
assert((xml.match(/<mesh>/g) || []).length === 3, "three meshes");
assert((xml.match(/<component /g) || []).length === 3, "three parts in the assembly");
assert((xml.match(/<item /g) || []).length === 1, "one joint build item");
assert(xml.includes('unit="millimeter"'), "millimeters");
for (const name of ["body", "chain", "clasp"]) assert(xml.includes(`name="${name}"`), `missing ${name}`);
console.log("tris", exported.tris, "grams", ((exported.volume / 1000) * 1.24).toFixed(1));
console.log("ok");
