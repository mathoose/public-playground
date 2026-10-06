# shared

Small modules reused by the STL designers. They are bundled into each app's `app.bundle.js` by esbuild, so this folder does not need to be deployed.

## `undo-history.js` — Undo / Redo for settings

Used by every designer (`bubble-frame/`, `henson-razor-tool/`, `photive-snap-box/`, `postit-wall-clip/`, `striped-frame/`, `power-bank-wrap/`). New designers must include it.

```js
import { installUndo } from "../shared/undo-history.js";

installUndo({
  panel: document.querySelector(".panel"),   // settings scroller; bar goes above the first .settings-group
  before: null,                               // optional element to insert the bar in front of
  read: () => params,                         // current settings as plain JSON-able data
  apply: (snapshot) => {                      // write settings back to the form and rebuild the model
    params = snapshot;
    refresh();
  },
});
```

What you get:

- A sticky **↶ Undo / ↷ Redo** bar at the top of the settings panel. On phones it stays pinned above the settings while they scroll and never covers the 3D canvas.
- **⌘Z / Ctrl+Z** undo, **⇧⌘Z / Ctrl+Shift+Z** (or Ctrl+Y) redo. Text and number fields keep their native undo while focused.
- A step is recorded after any `change` (slider release, number/select/checkbox commit) or `click` (presets, Reset, chips, bead toggles) — but only when `read()` actually changed, so one slider drag is one step and view-only buttons (Reset view, part chips, Download) record nothing.
- History is capped at 100 steps; `installUndo` returns `{ undo, redo, commit, clear, canUndo, canRedo }`.

Rules for `read` / `apply`:

- Keep view-only state (camera, which part is shown, section toggles) **out** of `read()`.
- If the app updates state only during `input`, make sure `read()` reflects it synchronously (read the form, or keep `params` updated in the handler).
- `apply` must rebuild the preview (debounced is fine).

## `slider-numbers.js` — type values, not only drag

Pairs every settings slider with a typeable number field. Call it once after the form is first written (so units can be read from each row's `<output>`), before `installUndo`:

```js
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";

pairSlidersWithNumbers(document.querySelector(".panel"));
```

- Works on rows shaped `label + <output id="key-out"> + <input type="range">`. The number field takes the output's place; the unit (`mm`, `°`) comes from the output text or `data-unit` on the range. Word states like "off" / "no plug" stay visible next to it.
- Typed values commit on Enter / blur, are **clamped to the slider's `min`/`max`** and snapped to its `step`, then the slider fires `input` + `change` like a drag, so rebuild and undo just work.
- Slider drags, `writeParams`, Reset, presets and Undo update the field too (it hooks the range's `value` setter).
- Skips sliders that already share a container with an `<input type="number">` (bubble / striped frame pair their own) and any range marked `data-no-number`.
- Because typing is clamped, **set slider `max` generously** — the real-world limit, not a "typical" one (e.g. Photive's 14 mm rear cord gap was too tight).
