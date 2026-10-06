# 3D printing library

Browser apps for parts you can customize and download as STL.

**Open the library:** after this branch is on GitHub, use the htmlpreview or GitHub Pages link from the pull request.

## Apps

| Folder | App |
| --- | --- |
| [`../bubble-frame/`](../bubble-frame/) | Bubble photo frame |
| [`../postit-wall-clip/`](../postit-wall-clip/) | Post-it wall clip |
| [`../striped-frame/`](../striped-frame/) | Striped photo frame (path stripes) |
| [`../photive-snap-box/`](../photive-snap-box/) | Photive USB snap box (live tray + lid designer) |
| [`../henson-razor-tool/`](../henson-razor-tool/) | Henson AL13 / Ti22 blade-change cradle + handle grip |
| [`../power-bank-wrap/`](../power-bank-wrap/) | SYJ-F37F slide-on sleeve, wrap around the band, elastic clips on the back |

On the live site those are `/bubble-frame/`, `/clip/`, `/striped-frame/`, `/photive-snap-box/`, `/henson-razor-tool/`, and `/power-bank-wrap/`.

## Add another app

1. Put the new project folder next to the others (locally: `Projects / 3d printing / your-app`).
2. Add a card in [`index.html`](index.html).
3. Copy the folder in `.github/workflows/pages.yml` next to the other apps.
4. Prefer **collapsible settings groups** (`<details class="settings-group">`) for params — see `striped-frame/`.
5. **Add Undo / Redo** (required for every designer) — import the shared module and call it once after the controls are bound:

   ```js
   import { installUndo } from "../shared/undo-history.js";

   installUndo({
     panel: document.querySelector(".panel"),
     read: () => params,                 // plain JSON-able settings
     apply: (snapshot) => { params = snapshot; refresh(); },  // write back + rebuild
   });
   ```

   It adds a sticky Undo / Redo bar at the top of the settings panel (never over the canvas), records one step per slider release / change / preset / Reset click, and handles ⌘Z / Ctrl+Z and ⇧⌘Z / Ctrl+Shift+Z. esbuild bundles it into `app.bundle.js`, so nothing extra needs deploying. See [`../shared/README.md`](../shared/README.md).
6. **Typeable numbers next to sliders** (required) — call `pairSlidersWithNumbers(document.querySelector(".panel"))` from `../shared/slider-numbers.js` once after the form is first written. Typed values are clamped to the slider's `min`/`max`, so pick a generous `max`. See [`../shared/README.md`](../shared/README.md).
7. Show a footer version (`<p class="foot" id="app-version">App name vN · Mon D, YYYY</p>`) and a cache marker (`<!-- build: your-app-vN -->`); bump both on every ship.
