# Photive 6-port — travel case designer

Live parametric designer for the **Photive** brick nest (**100 × 70 × 26 mm**), **six cable slots** with label recesses, and a **friction-fit lid** with **cord-wrap posts**.

## Open

- **This branch (CDN):** [usb-charger-travel-case/](https://cdn.jsdelivr.net/gh/mathoose/public-playground@20421f5/usb-charger-travel-case/)
- **htmlpreview:** [open designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/usb-charger-travel-case-designer-8213/usb-charger-travel-case/index.html)
- After merge: `https://cdn.jsdelivr.net/gh/mathoose/public-playground@main/usb-charger-travel-case/`

## Files

| File | Description |
| --- | --- |
| `index.html` | Phone-first UI + collapsible settings |
| `app.bundle.js` | Committed viewer bundle (Three.js) |
| `geometry.js` / `stl.js` | Params + Manifold CSG (loaded from CDN at runtime) |
| `photive-travel-case.scad` | OpenSCAD source of truth for v0 STLs |
| `photive-travel-case-base.stl` / `-lid.stl` | Default ready-to-slice exports |

## Adjustable params (designer)

- **Brick nest:** nest XY/Z clearances, brick L×W×H + corner R, wall, floor, AC pocket, finger notch
- **Cable slots:** throat, depth, partition height, divider; **USB 1×6 row** — pitch, side margins, Z center, opening W×H; align slots to USB pitch
- **Lid & wrap:** lip clearance/depth, lid thickness, cord-wrap post Ø/height/gap, edge fillet
- **Download:** base, lid, or both STLs

**USB face (confirmed):** six USB-A in a **single horizontal row** on the **70×26 mm** end (ports tall). Not a 2×3 grid.

## Print

- **Material:** PETG recommended
- **Orientation:** Base bottom down; lid top down (posts vertical)
- **Tune lid:** `lip_clear` ±0.1 mm if loose/tight
- **USB layout:** 1×6 row on 70×26 end — tune `usb_pitch` / side margins from the face caliper photo

## Build

```bash
npm install
npm run build   # refreshes app.bundle.js
npm test
```

Part A (snap-on cap) is **not** included.
