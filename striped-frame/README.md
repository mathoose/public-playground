# Striped frame

Parametric **path-stripe picture frame** STL designer — forked from [`bubble-frame/`](../bubble-frame). Alternating color bands follow the moulding around the photo (inlay-style), not concentric rings. Live 3D preview → download STL (frame, per-color parts, back plate, easel stand).

**Live (interim):** [jsDelivr @ this branch](https://cdn.jsdelivr.net/gh/mathoose/public-playground@cursor/striped-frame-edges-24da/striped-frame/) · after merge: [jsDelivr @ main](https://cdn.jsdelivr.net/gh/mathoose/public-playground@main/striped-frame/)

**GitHub:** [striped-frame](https://github.com/mathoose/public-playground/tree/main/striped-frame) (after merge)

Footer / version: **Striped frame v3 · Sep 20, 2026** (`<!-- build: striped-frame-v3 -->`)

## Open

- Prefer the live link above on your phone.
- Library hub: [`../3d-printing/`](../3d-printing/)

## Print

- Frame + back plate: **flat on the bed**, no supports, 0.2 mm layers.
- **Download by color** for multi-material / filament-change prints (one STL per pattern color).
- Stand: print the **side profile** flat; tab slides into the back-plate pocket.
- Sandwich **frame → photo → back plate**.
- STL units are millimeters.

Defaults: 4×6 in photo, 14 mm moulding, 2-color repeating pattern (14 mm bands), 8 mm layer height, sharp corners / no edge finish.

## Parameters

Collapsible settings groups:

- **Photo size** — presets, lip, moulding width
- **Stripe pattern** — 2 / 3 / 4 colors; thickness along path per color; shared or per-color layer height
- **Corners & edges** — outer corner radius; inside / outside front-face round or chamfer (independent)
- **Bed & back plate** — connecting web + plate thickness
- **Hang** / **Stand** / **Download**

Pattern thicknesses are scaled slightly so an integer number of repeats closes exactly around the frame loop.

## Build

```bash
node test_geometry.mjs
npm install && node build.mjs   # writes app.bundle.js (committed for CDN/Pages)
node export_default.mjs         # needs manifold-3d; regenerates default STLs
```
