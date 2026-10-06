// Shared undo/redo for the parametric STL designers.
//
//   import { installUndo } from "../shared/undo-history.js";
//   installUndo({ panel: $("panel"), read: () => params, apply: (s) => { params = s; refresh(); } });
//
// A step is recorded after any `change` (slider release, number/select/checkbox commit) or
// `click` (presets, Reset, chips) anywhere in the page, but only when read() actually differs from
// the current step — so dragging a slider is one step and view-only buttons record nothing.
// read() must return plain JSON-able settings; apply(snapshot) must write them back and rebuild.

const STYLE_ID = "undo-history-style";
const CSS = `
.history-bar {
  position: sticky;
  top: 0;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 10px;
  padding: 8px 0;
  background: var(--panel, var(--card, #f7f4ef));
  border-bottom: 1px solid var(--line, #ddd6cc);
}
.history-bar button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 36px;
  padding: 6px 14px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 999px;
  background: #fff;
  color: var(--ink, #1c1917);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 650;
  cursor: pointer;
  touch-action: manipulation;
}
.history-bar button:disabled { opacity: 0.4; cursor: default; }
.history-bar .history-hint {
  margin-left: auto;
  color: var(--muted, #78716c);
  font-size: 0.72rem;
  white-space: nowrap;
}
@media (hover: none) { .history-bar .history-hint { display: none; } }
`;

const TEXT_TYPES = new Set(["text", "number", "search", "email", "url", "tel", "password"]);

function isTextEditing(el) {
  if (!el) return false;
  if (el.isContentEditable || el.tagName === "TEXTAREA") return true;
  return el.tagName === "INPUT" && TEXT_TYPES.has(el.type);
}

export function createHistory({ read, apply, limit = 100, onChange = () => {} }) {
  const snap = () => JSON.stringify(read());
  let stack = [snap()];
  let index = 0;

  const api = {
    get canUndo() {
      return index > 0;
    },
    get canRedo() {
      return index < stack.length - 1;
    },
    commit() {
      const next = snap();
      if (next === stack[index]) return false;
      stack = stack.slice(0, index + 1);
      stack.push(next);
      if (stack.length > limit) stack.shift();
      index = stack.length - 1;
      onChange(api);
      return true;
    },
    undo() {
      if (!api.canUndo) return false;
      go(index - 1);
      return true;
    },
    redo() {
      if (!api.canRedo) return false;
      go(index + 1);
      return true;
    },
    clear() {
      stack = [snap()];
      index = 0;
      onChange(api);
    },
  };

  function go(i) {
    index = i;
    apply(JSON.parse(stack[index]));
    // Apps clamp/normalize on apply; store what they settled on so the next commit is a real change.
    stack[index] = snap();
    onChange(api);
  }

  return api;
}

export function installUndo({ panel, before, read, apply, limit } = {}) {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  const isMac = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);
  const bar = document.createElement("div");
  bar.className = "history-bar";
  bar.setAttribute("role", "toolbar");
  bar.setAttribute("aria-label", "Undo history");
  bar.innerHTML = `
    <button type="button" data-history="undo" title="Undo (${isMac ? "⌘Z" : "Ctrl+Z"})">↶ Undo</button>
    <button type="button" data-history="redo" title="Redo (${isMac ? "⇧⌘Z" : "Ctrl+Shift+Z"})">↷ Redo</button>
    <span class="history-hint">${isMac ? "⌘Z · ⇧⌘Z" : "Ctrl+Z · Ctrl+Shift+Z"}</span>
  `;
  const undoBtn = bar.querySelector('[data-history="undo"]');
  const redoBtn = bar.querySelector('[data-history="redo"]');

  const host = panel || document.body;
  const anchor = before || host.querySelector(".settings-group") || host.firstElementChild;
  if (anchor && anchor.parentElement) anchor.parentElement.insertBefore(bar, anchor);
  else host.prepend(bar);

  // Sticky `top: 0` stops below the scroller's padding, letting settings show above the bar.
  const pinToScrollerTop = () => {
    let el = bar.parentElement;
    while (el && el !== document.body && !/(auto|scroll)/.test(getComputedStyle(el).overflowY)) {
      el = el.parentElement;
    }
    const pad = el && el !== document.body ? parseFloat(getComputedStyle(el).paddingTop) || 0 : 0;
    bar.style.top = `${-pad}px`;
  };
  pinToScrollerTop();
  window.addEventListener("resize", pinToScrollerTop);

  const sync = (h) => {
    undoBtn.disabled = !h.canUndo;
    redoBtn.disabled = !h.canRedo;
  };

  const history = createHistory({
    read,
    limit,
    onChange: sync,
    apply(snapshot) {
      const active = document.activeElement;
      if (active && active !== document.body && host.contains(active) && active.blur) active.blur();
      apply(snapshot);
    },
  });
  sync(history);

  undoBtn.addEventListener("click", () => history.undo());
  redoBtn.addEventListener("click", () => history.redo());

  // Bubble-phase on document runs after each control's own handler has updated the app state.
  document.addEventListener("change", () => history.commit());
  document.addEventListener("click", (e) => {
    if (e.target instanceof Element && e.target.closest(".history-bar")) return;
    history.commit();
  });

  document.addEventListener("keydown", (e) => {
    if (!(e.metaKey || e.ctrlKey) || e.altKey) return;
    const key = e.key.toLowerCase();
    const isUndo = key === "z" && !e.shiftKey;
    const isRedo = (key === "z" && e.shiftKey) || (key === "y" && e.ctrlKey && !e.metaKey);
    if (!isUndo && !isRedo) return;
    if (isTextEditing(e.target)) return;
    e.preventDefault();
    if (isUndo) history.undo();
    else history.redo();
  });

  return history;
}
