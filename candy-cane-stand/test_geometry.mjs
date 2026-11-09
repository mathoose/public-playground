import {
  DEFAULT_PARAMS,
  ORIGINAL_HOLE_ID,
  SHAFT_OD,
  buildStandMesh,
  derive,
  signedVolume,
  sliceRadii,
} from "./geometry.js";

function assert(cond, message) {
  if (!cond) throw new Error(message);
}

function cluster(radii) {
  const groups = [];
  for (const r of radii) {
    const found = groups.find((group) => Math.abs(group.mean - r) < 1.2);
    if (!found) groups.push({ mean: r, n: 1, min: r, max: r });
    else {
      found.n += 1;
      found.mean = (found.mean * (found.n - 1) + r) / found.n;
      found.min = Math.min(found.min, r);
      found.max = Math.max(found.max, r);
    }
  }
  return groups.sort((a, b) => a.mean - b.mean);
}

const d = derive(DEFAULT_PARAMS);
assert(Math.abs(d.holeId - (SHAFT_OD + 0.4)) < 1e-6, `hole id ${d.holeId}`);
assert(d.holeId - SHAFT_OD >= 0.3 && d.holeId - SHAFT_OD <= 0.6, "clearance band");
assert(Math.abs(ORIGINAL_HOLE_ID - 94.86) < 1e-6, "source hole");
assert(d.holeId > ORIGINAL_HOLE_ID + 8, "new bore must clear the original hole");

const mesh = buildStandMesh(DEFAULT_PARAMS, 96);
const volume = signedVolume(mesh);
assert(volume > 100000 && volume < 900000, `volume ${volume}`);

const edgeCount = new Map();
const { indices } = mesh;
for (let t = 0; t < indices.length; t += 3) {
  const tri = [indices[t], indices[t + 1], indices[t + 2]];
  for (let e = 0; e < 3; e += 1) {
    const a = tri[e];
    const b = tri[(e + 1) % 3];
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    edgeCount.set(key, (edgeCount.get(key) || 0) + 1);
  }
}
for (const [key, n] of edgeCount) {
  if (n !== 2) throw new Error(`edge ${key} used ${n} times`);
}

const mid = sliceRadii(mesh, 40);
const groups = cluster(mid);
assert(groups.length === 2, `expected inner+outer, got ${groups.map((g) => g.mean.toFixed(2)).join(",")}`);
const inner = groups[0].mean * 2;
const outer = groups[1].mean * 2;
assert(Math.abs(inner - d.holeId) < 0.08, `bore ${inner} vs ${d.holeId}`);
assert(Math.abs(outer - d.socketR * 2) < 0.08, `socket OD ${outer} vs ${d.socketR * 2}`);
assert(outer - inner > 8.8 && outer - inner < 9.6, `wall diametral ${outer - inner}`);

const foot = sliceRadii(mesh, 4);
const footGroups = cluster(foot);
assert(footGroups.length === 1, "foot slice should be solid");
assert(footGroups[0].mean * 2 > 180 && footGroups[0].mean * 2 < 190, `foot ${footGroups[0].mean * 2}`);

const mouth = sliceRadii(mesh, 84.9);
const mouthGroups = cluster(mouth);
assert(mouthGroups[0].mean * 2 > d.holeId + 0.6, "lead-in opens the mouth");

let zmin = Infinity;
let zmax = -Infinity;
for (let i = 2; i < mesh.positions.length; i += 3) {
  zmin = Math.min(zmin, mesh.positions[i]);
  zmax = Math.max(zmax, mesh.positions[i]);
}
assert(Math.abs(zmin) < 1e-6 && Math.abs(zmax - 85) < 1e-6, `height ${zmin}..${zmax}`);

console.log(
  JSON.stringify(
    {
      shaftOd: SHAFT_OD,
      originalHoleId: ORIGINAL_HOLE_ID,
      newHoleId: d.holeId,
      clearance: d.holeId - SHAFT_OD,
      socketOd: Number(outer.toFixed(3)),
      wall: d.p.wall,
      footDiameter: Number((footGroups[0].mean * 2).toFixed(2)),
      height: zmax - zmin,
      volumeCm3: Number((volume / 1000).toFixed(1)),
      triangles: indices.length / 3,
    },
    null,
    2,
  ),
);
