import assert from "node:assert/strict";
import { bindParamHistoryHotkeys, createParamHistory, paramsEqual } from "./history.js";

const h = createParamHistory({ limit: 3 });
assert.equal(h.length, 0);
assert.equal(h.canUndo, false);
assert.equal(h.canRedo, false);
assert.equal(h.undo(), null);
assert.equal(h.redo(), null);

assert.equal(h.push({ n: 1 }), true);
assert.equal(h.push({ n: 1 }), false, "duplicate snapshot is skipped");
assert.equal(h.push({ n: 2 }), true);
assert.equal(h.push({ n: 3 }), true);
assert.equal(h.length, 3);
assert.deepEqual(h.undo(), { n: 2 });
assert.deepEqual(h.undo(), { n: 1 });
assert.equal(h.undo(), null);
assert.deepEqual(h.redo(), { n: 2 });
assert.equal(h.push({ n: 9 }), true, "new edit drops the redo tail");
assert.equal(h.canRedo, false);
assert.deepEqual(h.undo(), { n: 2 });

h.push({ n: 4 });
h.push({ n: 5 });
h.push({ n: 6 });
assert.equal(h.length, 3, "oldest snapshots fall off the limit");
assert.deepEqual(h.undo(), { n: 5 });
assert.deepEqual(h.undo(), { n: 4 });
assert.equal(h.undo(), null);

assert.equal(paramsEqual({ a: 1, b: 2 }, { b: 2, a: 1 }), true);
assert.equal(paramsEqual({ a: 1 }, { a: 2 }), false);

const handlers = [];
globalThis.window = {
  addEventListener(_type, fn) {
    handlers.push(fn);
  },
};

const restore = [];
bindParamHistoryHotkeys({
  undo: () => restore.push("undo"),
  redo: () => restore.push("redo"),
});

function fire(partial = {}) {
  const event = {
    metaKey: false,
    ctrlKey: false,
    shiftKey: false,
    altKey: false,
    isComposing: false,
    defaultPrevented: false,
    key: "z",
    code: "KeyZ",
    target: { tagName: "BODY", closest() { return null; } },
    preventDefault() {
      this.defaultPrevented = true;
    },
    ...partial,
  };
  handlers[0](event);
  return event;
}

assert.equal(fire({ ctrlKey: true }).defaultPrevented, true);
assert.equal(fire({ ctrlKey: true, shiftKey: true }).defaultPrevented, true);
assert.equal(fire({ metaKey: true }).defaultPrevented, true);
assert.equal(fire({ key: "y", code: "KeyY", ctrlKey: true }).defaultPrevented, false);
const ignored = fire({
  ctrlKey: true,
  target: { tagName: "INPUT", type: "text", closest() { return null; } },
});
assert.equal(ignored.defaultPrevented, false);
assert.deepEqual(restore, ["undo", "redo", "undo"]);

console.log("ok history undo/redo + hotkeys");
