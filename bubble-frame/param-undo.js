/**
 * Undo/redo for JSON-serializable designer params (shared pattern for playground designers).
 */
export function createParamUndo({ limit = 64 } = {}) {
  const past = [];
  let future = [];
  let frozen = null;
  let skipRecord = false;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function seed(params) {
    frozen = clone(params);
    past.length = 0;
    future.length = 0;
  }

  function record(params) {
    if (skipRecord || frozen === null) return;
    const snap = clone(params);
    if (JSON.stringify(snap) === JSON.stringify(frozen)) return;
    past.push(frozen);
    if (past.length > limit) past.shift();
    frozen = snap;
    future.length = 0;
  }

  function undo(current) {
    if (!past.length) return null;
    skipRecord = true;
    future.push(clone(current));
    const prev = past.pop();
    frozen = clone(prev);
    skipRecord = false;
    return prev;
  }

  function redo(current) {
    if (!future.length) return null;
    skipRecord = true;
    past.push(clone(current));
    const next = future.pop();
    frozen = clone(next);
    skipRecord = false;
    return next;
  }

  return {
    seed,
    record,
    undo,
    redo,
    canUndo: () => past.length > 0,
    canRedo: () => future.length > 0,
  };
}
