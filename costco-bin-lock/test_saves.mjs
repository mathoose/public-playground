import assert from "node:assert/strict";
import { DEFAULT_PARAMS } from "./geometry.js";
import { SAVE_LIMIT, readSaves, rememberSave, sameSliderParams, writeSaves } from "./saves.js";

const memory = new Map();
const getItem = (k) => (memory.has(k) ? memory.get(k) : null);
const setItem = (k, v) => memory.set(k, v);

assert.deepEqual(readSaves(getItem), []);
assert.deepEqual(readSaves(() => "{"), []);

const first = rememberSave([], {
  name: "  first print  ",
  note: "  8 mm hook  ",
  params: { ...DEFAULT_PARAMS, engagement: 8 },
  now: 1_000,
});
assert.equal(first.ok, true);
assert.equal(first.replaced, false);
assert.equal(first.saves[0].name, "first print");
assert.equal(first.saves[0].note, "8 mm hook");
assert.equal(first.saves[0].params.engagement, 8);

const second = rememberSave(first.saves, {
  name: "deeper",
  note: "full bin",
  params: { ...DEFAULT_PARAMS, engagement: 9.5 },
  now: 2_000,
});
assert.equal(second.saves[0].name, "deeper");
assert.equal(second.saves[1].name, "first print");

const replaced = rememberSave(second.saves, {
  name: "first print",
  note: "wider slot",
  params: { ...DEFAULT_PARAMS, slotWidth: 12 },
  now: 3_000,
});
assert.equal(replaced.replaced, true);
assert.equal(replaced.entry.id, first.entry.id);
assert.equal(replaced.saves[0].name, "first print");
assert.equal(replaced.saves[0].note, "wider slot");
assert.equal(replaced.saves[0].params.slotWidth, 12);
assert.equal(replaced.saves.filter((s) => s.name === "first print").length, 1);
assert.equal(replaced.saves[1].name, "deeper");

const blank = rememberSave(replaced.saves, { name: "   ", note: "x", params: DEFAULT_PARAMS, now: 4_000 });
assert.equal(blank.ok, false);
assert.equal(blank.saves.length, 2);

const many = [];
let batch = [];
for (let i = 0; i < SAVE_LIMIT + 5; i++) {
  const result = rememberSave(batch, {
    name: `n${i}`,
    note: "",
    params: DEFAULT_PARAMS,
    now: 10_000 + i,
  });
  batch = result.saves;
}
assert.equal(batch.length, SAVE_LIMIT);
assert.equal(batch[0].name, `n${SAVE_LIMIT + 4}`);
assert.equal(batch.some((s) => s.name === "n0"), false);

writeSaves(setItem, replaced.saves);
const roundTrip = readSaves(getItem);
assert.equal(roundTrip[0].name, "first print");
assert.equal(roundTrip[1].params.engagement, 9.5);
assert.equal(sameSliderParams(roundTrip[1].params, { ...DEFAULT_PARAMS, engagement: 9.5 }), true);
assert.equal(sameSliderParams(roundTrip[1].params, DEFAULT_PARAMS), false);

console.log("saves ok");
