# Bubble frame

A browser tool that generates printable STLs: a **flat-backed bubble (hemisphere) frame** around a photo, a **back plate** the same size as the photo (optional hanging holes), and an **easel stand** that props the frame at an angle.

Open [`index.html`](index.html) through a local server (ES modules + WASM):

```bash
python3 -m http.server 8080 --directory bubble-frame
```

Then visit http://localhost:8080/

## How sizes work

You enter the **photo** width and height. The beads sit around that rectangle and bite inward by **overlap over the photo**. Adjacent beads overlap each other by **bead-to-bead overlap** (or add/remove circles per side, which changes that overlap).

Click a circle in the 2D or 3D preview to turn it off (leaves a gap) or back on.

## Print

| File | What it is |
| --- | --- |
| `bubble-frame-…-frame.stl` | Hemispheres + optional thin bed web. Flat face on the bed. |
| `bubble-frame-…-back.stl` | Rectangle exactly the photo size × back-plate thickness, with optional hanging holes. |
| `bubble-frame-…-stand.stl` | Easel: front shelf + angled backrest. Print the **side profile** flat on the bed. |

- Print **flat**, no supports
- 0.2 mm layers, 0.4 mm nozzle, 3+ walls
- PLA is fine; higher infill on the beads looks better

Sandwich **frame → photo → back plate** and glue or tape the plate to the frame’s flat back. Hang from the holes (nail, hook, or wire) or set the frame on the easel shelf so it leans on the backrest.

## Parameters

- **Ball diameter** — hemisphere size
- **Overlap over the photo** — how far beads cover the picture
- **Bead-to-bead overlap** — spacing; sets counts automatically
- **Circles per side** — `+` / `−` (link opposite sides, or set each independently)
- **Bed web** — thin connecting slab under the beads (0 = hemispheres only)
- **Back plate** — thickness of the photo-sized plate
- **Hanging holes** — 1 centered hole or 2 near the top; diameter and insets
- **Easel stand** — lean angle; height and width follow the photo size
- **Mesh quality** — sphere segments used only on export

STLs are millimeters. Geometry lives in [`geometry.js`](geometry.js); union happens in [`stl.js`](stl.js) via [manifold-3d](https://github.com/elalish/manifold).

```bash
node test_geometry.mjs
```
