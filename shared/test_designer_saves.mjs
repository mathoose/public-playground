import assert from "node:assert/strict";
import { SAVE_LIMIT, readSaves, rememberDownload, rememberSave, writeSaves } from "./designer-saves.js";

const merge = (params) => ({ ...params });

const blank = rememberSave([], { name: "   ", note: "x", params: { fit: "twist" }, mergeParams: merge, now: 1 });
assert.equal(blank.ok, false);
assert.equal(blank.error, "Type a name for this save.");

const named = rememberSave([], {
  name: "  works  ",
  note: "  first  ",
  params: { fit: "twist", legLength: 100 },
  mergeParams: merge,
  now: 1_000,
});
assert.equal(named.ok, true);
assert.equal(named.replaced, false);
assert.equal(named.entry.name, "works");

const again = rememberSave(named.saves, {
  name: "works",
  note: "tighter",
  params: { fit: "press", legLength: 120 },
  mergeParams: merge,
  now: 2_000,
});
assert.equal(again.replaced, true);
assert.equal(again.entry.id, named.entry.id);
assert.equal(again.saves.filter((s) => s.name === "works").length, 1);
assert.equal(again.saves[0].params.legLength, 120);

const firstDl = rememberDownload(again.saves, {
  name: "stackable-shelf-flat.stl",
  params: { fit: "twist", legLength: 140 },
  mergeParams: merge,
  now: 3_000,
});
const secondDl = rememberDownload(firstDl.saves, {
  name: "stackable-shelf-flat.stl",
  params: { fit: "twist", legLength: 160 },
  mergeParams: merge,
  now: 3_000,
});
assert.equal(secondDl.ok, true);
assert.equal(secondDl.saves.filter((s) => s.kind === "download").length, 2);
assert.notEqual(secondDl.entry.id, firstDl.entry.id);
assert.equal(secondDl.saves[0].params.legLength, 160);
assert.equal(secondDl.saves[1].params.legLength, 140);
assert.equal(secondDl.saves.find((s) => s.name === "works").params.legLength, 120);

const renamed = rememberSave(secondDl.saves, {
  name: "works",
  note: "again",
  params: { fit: "twist", legLength: 180 },
  mergeParams: merge,
  now: 4_000,
});
assert.equal(renamed.saves.filter((s) => s.kind === "download").length, 2);
assert.equal(renamed.saves.filter((s) => s.name === "works" && s.kind !== "download").length, 1);

const memory = new Map();
writeSaves("stackable-shelf", (key, value) => memory.set(key, value), secondDl.saves);
const roundTrip = readSaves("stackable-shelf", (key) => memory.get(key) ?? null, merge);
assert.equal(roundTrip.filter((s) => s.kind === "download").length, 2);
assert.equal(roundTrip.find((s) => s.kind !== "download").name, "works");

const emptyDl = rememberDownload(roundTrip, { name: "  ", params: {}, mergeParams: merge, now: 5_000 });
assert.equal(emptyDl.ok, false);

let batch = [];
for (let i = 0; i < SAVE_LIMIT + 3; i++) {
  batch = rememberDownload(batch, {
    name: `file-${i}.stl`,
    params: { i },
    mergeParams: merge,
    now: 10_000 + i,
  }).saves;
}
assert.equal(batch.length, SAVE_LIMIT);
assert.equal(batch[0].name, `file-${SAVE_LIMIT + 2}.stl`);

console.log("designer saves ok");
