/**
 * Tiny param undo/redo stack for this designer.
 * Swap this file for the shared 3d-printing history helper when that lands.
 */

export function cloneParams(state) {
  return { ...state };
}

export function paramsEqual(a, b) {
  if (a === b) return true;
  if (!a || !b) return false;
  const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
  for (const key of keys) {
    if (a[key] !== b[key]) return false;
  }
  return true;
}

export function createParamHistory({ limit = 60, clone = cloneParams, equal = paramsEqual } = {}) {
  const stack = [];
  let index = -1;

  return {
    push(state) {
      const copy = clone(state);
      if (index >= 0 && equal(stack[index], copy)) return false;
      stack.length = index + 1;
      stack.push(copy);
      if (stack.length > limit) {
        stack.shift();
      }
      index = stack.length - 1;
      return true;
    },
    undo() {
      if (index <= 0) return null;
      index -= 1;
      return clone(stack[index]);
    },
    redo() {
      if (index < 0 || index >= stack.length - 1) return null;
      index += 1;
      return clone(stack[index]);
    },
    get canUndo() {
      return index > 0;
    },
    get canRedo() {
      return index >= 0 && index < stack.length - 1;
    },
    get length() {
      return stack.length;
    },
  };
}

function shouldIgnoreHotkey(event) {
  if (event.defaultPrevented || event.altKey || event.isComposing) return true;
  const t = event.target;
  if (!t || typeof t.closest !== "function") return false;
  if (t.isContentEditable) return true;
  const tag = t.tagName;
  if (tag === "TEXTAREA" || tag === "SELECT") return true;
  if (tag === "INPUT") {
    const type = (t.type || "text").toLowerCase();
    return type !== "range" && type !== "checkbox" && type !== "radio";
  }
  return false;
}

/** Cmd/Ctrl+Z undo, Shift+Cmd/Ctrl+Z redo. */
export function bindParamHistoryHotkeys({ undo, redo }) {
  window.addEventListener("keydown", (event) => {
    if (!(event.metaKey || event.ctrlKey)) return;
    const z = event.key === "z" || event.key === "Z" || event.code === "KeyZ";
    if (!z || shouldIgnoreHotkey(event)) return;
    event.preventDefault();
    if (event.shiftKey) redo?.();
    else undo?.();
  });
}
