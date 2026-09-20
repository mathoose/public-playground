# Striped frame

Parametric **striped picture frame** STL designer — forked from [`bubble-frame/`](../bubble-frame). Concentric rectangular stripes around a photo; heights start equal, then you can edit each stripe. Live 3D preview → download STL (frame, back plate, easel stand).

**Live (interim, until Pages is on):** [jsDelivr @ this branch](https://cdn.jsdelivr.net/gh/mathoose/public-playground@cursor/striped-frame-e1e5/striped-frame/) · after merge: [jsDelivr @ main](https://cdn.jsdelivr.net/gh/mathoose/public-playground@main/striped-frame/)

**GitHub:** [striped-frame on main](https://github.com/mathoose/public-playground/tree/main/striped-frame) (after merge)

Footer / version: **Striped frame v1 · Sep 20, 2026** (`<!-- build: striped-frame-v1 -->`)

## Open

- Prefer the live link above on your phone.
- Or open `index.html` via a local static server from this folder.
- Library hub: [`../3d-printing/`](../3d-printing/)

## Print

- Frame + back plate: **flat on the bed**, no supports, 0.2 mm layers, 0.4 mm nozzle.
- Stand: print the **side profile** flat; tab slides into the back-plate pocket.
- Sandwich **frame → photo → back plate**. Glue or tape the plate to the frame’s flat back.
- STL units are millimeters.

Defaults: 4×6 in photo, 4 stripes × 6 mm wide × 8 mm high, 6 mm lip, bed web 1.2 mm.

Optional ready STLs (after `node export_default.mjs`):

| File | What |
| --- | --- |
| `striped-frame-4x6in-frame.stl` | Concentric stripes + bed web |
| `striped-frame-4x6in-back.stl` | Photo-sized plate + hang holes + stand pocket |
| `striped-frame-4x6in-stand.stl` | Easel stand |

## Parameters

Grouped into collapsible sections (Project UI pattern for STL designers):

- **Photo size** — presets, units, lip over the photo
- **Stripes** — count, radial width, shared height (default), then per-stripe heights
- **Bed & back plate** — connecting web + plate thickness
- **Hang** — 1 or 2 holes
- **Stand** — lean angle
- **Download** — readout + STL buttons

## Build

```bash
node test_geometry.mjs
npm install && node build.mjs   # writes app.bundle.js (committed for CDN/Pages)
```

To regenerate default STLs (needs `npm install manifold-3d` once):

```bash
node export_default.mjs
```
