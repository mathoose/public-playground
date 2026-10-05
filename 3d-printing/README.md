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

On the live site those are `/bubble-frame/`, `/clip/`, `/striped-frame/`, and `/photive-snap-box/`.

## Add another app

1. Put the new project folder next to the others (locally: `Projects / 3d printing / your-app`).
2. Add a card in [`index.html`](index.html).
3. Copy the folder in `.github/workflows/pages.yml` next to the other apps.
4. Prefer **collapsible settings groups** (`<details class="settings-group">`) for params — see `striped-frame/`.