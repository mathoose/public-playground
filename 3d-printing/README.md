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
| [`../paddington-tag/`](../paddington-tag/) | Paddington luggage-tag necklace: paper-grain body, traced letters, raised hole ring, three STLs or one assembled 3MF |
| [`../gingerbread-switch/`](../gingerbread-switch/) | Gingerbread house light switch cover: standard plate, house in relief past the edges, three STLs or one joint 3MF |
| [`../baroque-frame/`](../baroque-frame/) | Baroque picture frame: width and height change the opening, moulding width stays put, thickness scales the border and the depth |
| [`../costco-bin-lock/`](../costco-bin-lock/) | Costco bin lid lock: hook engagement under the slot, a square-end size slider, and a two-face distance measure |
| [`../bone-side-bag/`](../bone-side-bag/) | Bone side bag: skeleton cup or phone cage, snap-together bone chain, separate STLs or one joint 3MF |
| [`../private/`](../private/) | PIN-locked personal-use models (encrypted vault; see its README) |

On the live site those are `/bubble-frame/`, `/clip/`, `/striped-frame/`, `/photive-snap-box/`, `/henson-razor-tool/`, `/power-bank-wrap/`, `/paddington-tag/`, `/gingerbread-switch/`, `/baroque-frame/`, `/costco-bin-lock/`, `/bone-side-bag/`, and `/private/` (behind the small lock in the footer).

## Add another app

1. Put the new project folder next to the others (locally: `Projects / 3d printing / your-app`).
2. Add a card in [`index.html`](index.html). Set `data-id` (the folder name), `data-title`, `data-updated` to today’s `YYYY-MM-DD`, and `data-seq` to one higher than the current highest. Put the star button beside the link, not inside it. Do not hand-sort the cards — the page orders Latest by that date, then `data-seq`.
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
8. **Record library activity** (required) — import `rememberVisit`, `rememberSettings`, `rememberExport`, `lastSettings`, and `wantsRestore` from [`../shared/library-activity.js`](../shared/library-activity.js). Call `rememberVisit(appId)` on load, and on each STL or 3MF download call `rememberSettings(appId, params)` and `rememberExport(appId, { filename, params })`. Apply `lastSettings(appId)` only when the URL has `?restore=1` or `#restore`. The id matches the card’s `data-id`. See [the library skill](../.cursor/skills/3d-printing-library/SKILL.md).
