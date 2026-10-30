---
name: 3d-printing-library
description: Add a printable project to the 3D printing library so it shows up under Latest, and record visits, saved settings, and exports for Last you worked on. Use when creating a designer, adding a card to the 3D printing hub, or shipping STL or 3MF downloads.
---

# 3D printing library

Every printable project is a card on the hub. The hub opens on **Latest**, sorted newest first. Do not hand-order the cards.

## Add the project

1. Put the app folder next to the others (`baroque-frame/`, `paddington-tag/`, …).
2. In [3d-printing/index.html](../../../3d-printing/index.html), add one `<article class="card">` with:
   - `data-id` — the folder name (`postit-wall-clip` even though the live URL is `/clip/`)
   - `data-title` — the name shown in Last you worked on
   - `data-updated` — today’s date, `YYYY-MM-DD`
   - `data-seq` — one higher than the current highest `data-seq`
   - a star `<button class="star">` **beside** the link, not inside it
   - `data-htmlpreview` pointing at this branch’s `index.html`
3. Copy the folder in [.github/workflows/pages.yml](../../../.github/workflows/pages.yml). Post-it is the exception: the folder is `postit-wall-clip/` and the live path is `_site/clip/`.
4. Add a row in [3d-printing/README.md](../../../3d-printing/README.md) and a line in the repo README.
5. Rebuild `app.bundle.js` (or `clip.bundle.js`). Do not commit `node_modules`.

The page sorts by `data-updated`, then `data-seq`. A new card with today’s date and the next seq lands at the top of Latest without rearranging the file.

## Activity (required)

Import [shared/library-activity.js](../../../shared/library-activity.js) and call all three:

```js
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";

const APP_ID = "your-app"; // same string as data-id

rememberVisit(APP_ID); // once on load, skip ?capture= and ?shot=

// first paint, only when the URL asks to resume
const params = wantsRestore() ? (lastSettings(APP_ID) || DEFAULT_PARAMS) : DEFAULT_PARAMS;

// on each successful STL or 3MF download
rememberSettings(APP_ID, params);
rememberExport(APP_ID, { filename, params });
```

- Storage key is `mathoose-public-playground:print-library`. The hub’s inline script uses that same string. Do not rename it in one place only.
- Save the slider settings (plain JSON), not the mesh. Files stay in the browser’s Downloads folder.
- Resume only for `?restore=1` or `#restore`. A normal open from Latest still starts at the defaults.
- Skip `rememberVisit` when the URL has `capture` or `shot`.
- The private PIN page stays out of the catalog.

Favorites are a star on the hub card. They live in this same localStorage object, so each browser has its own list. Do not add an account or a server.
