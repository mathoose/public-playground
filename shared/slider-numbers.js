// Pairs every settings slider with a typeable number field, synced both ways.
//
//   import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
//   pairSlidersWithNumbers(document.querySelector(".panel"));   // after the form is first written
//
// For each <input type="range"> that does not already share a container with an
// <input type="number">, a number field goes where the row's <output> was. Typed values commit on
// Enter / blur, are clamped to the slider's min/max and snapped to its step, then the slider fires
// `input` + `change` exactly like a drag, so app handlers, rebuilds and undo all run unchanged.
// Programmatic `range.value = …` (writeParams, Reset, Undo) updates the field too.

const STYLE_ID = "slider-numbers-style";
const CSS = `
.num-field {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-self: end;
}
.num-field .num-input {
  width: 5.2em;
  padding: 4px 6px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 8px;
  background: #fff;
  color: var(--ink, #1c1917);
  font: inherit;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
  text-align: right;
}
.num-field .num-input:focus {
  outline: 2px solid var(--accent-2, var(--accent, #0f766e));
  outline-offset: 1px;
}
.num-field .num-unit,
.num-field output {
  color: var(--muted, #78716c);
  font-size: 0.85rem;
}
`;

const valueDesc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");

function decimals(step) {
  const s = String(step);
  if (!s || s === "any") return 3;
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
}

function parseOutput(text) {
  const m = /^\s*(-?\d+(?:\.\d+)?)\s*(.*?)\s*$/.exec(text || "");
  return m ? { numeric: true, unit: m[2] } : { numeric: false, unit: null };
}

function pairOne(range) {
  const row = range.parentElement;
  const output = row.querySelector("output");
  const label = row.querySelector(`label[for="${range.id}"]`) || row.querySelector("label");

  const field = document.createElement("span");
  field.className = "num-field";
  const num = document.createElement("input");
  num.type = "number";
  num.className = "num-input";
  num.inputMode = "decimal";
  num.step = "any";
  if (range.id) num.id = `${range.id}-num`;
  if (label) num.setAttribute("aria-label", label.textContent.trim());
  const unit = document.createElement("span");
  unit.className = "num-unit";
  field.append(num, unit);

  if (output) {
    output.replaceWith(field);
    field.append(output);
  } else {
    range.before(field);
  }

  let knownUnit = range.dataset.unit ?? null;
  const syncOutput = () => {
    const parsed = parseOutput(output?.textContent);
    if (parsed.numeric && knownUnit == null) knownUnit = parsed.unit;
    unit.textContent = knownUnit ?? "";
    // Keep word states like "off" / "no plug" visible next to the number.
    if (output) output.hidden = parsed.numeric || !output.textContent.trim();
  };

  const sync = () => {
    num.min = range.min;
    num.max = range.max;
    if (document.activeElement === num) return;
    const v = Number(valueDesc.get.call(range));
    num.value = Number.isFinite(v) ? String(Number(v.toFixed(decimals(range.step)))) : "";
  };

  Object.defineProperty(range, "value", {
    configurable: true,
    get() {
      return valueDesc.get.call(this);
    },
    set(v) {
      valueDesc.set.call(this, v);
      sync();
    },
  });
  range.addEventListener("input", sync);

  num.addEventListener("change", () => {
    const typed = parseFloat(num.value);
    if (!Number.isFinite(typed)) {
      sync();
      return;
    }
    const min = range.min === "" ? -Infinity : Number(range.min);
    const max = range.max === "" ? Infinity : Number(range.max);
    valueDesc.set.call(range, String(Math.min(max, Math.max(min, typed))));
    num.blur();
    sync();
    range.dispatchEvent(new Event("input", { bubbles: true }));
    range.dispatchEvent(new Event("change", { bubbles: true }));
  });
  num.addEventListener("keydown", (e) => {
    if (e.key === "Enter") num.blur();
  });

  if (output) new MutationObserver(syncOutput).observe(output, { childList: true, characterData: true, subtree: true });
  syncOutput();
  sync();
  return num;
}

export function pairSlidersWithNumbers(root = document) {
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = CSS;
    document.head.appendChild(style);
  }
  const paired = [];
  for (const range of root.querySelectorAll('input[type="range"]')) {
    if (range.dataset.noNumber != null || range.dataset.numberPaired != null) continue;
    if (range.parentElement?.querySelector('input[type="number"]')) continue;
    range.dataset.numberPaired = "";
    paired.push(pairOne(range));
  }
  return paired;
}
