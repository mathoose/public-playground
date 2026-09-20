# Bubble frame

A browser tool that generates printable STLs: a **flat-backed bubble (hemisphere) frame** around a photo, a **back plate** the same size as the photo (optional hanging holes), and an **easel stand** that props the frame at an angle.

## Open the app (no typing)

**Easiest:** in Chrome, open
https://cdn.jsdelivr.net/gh/mathoose/public-playground@cursor/bubble-frame-finder-7f53/bubble-frame/index.html

**On a Mac, in Finder:** double-click **`Open Bubble Frame.html`**. That is a normal webpage shortcut — Apple will not block it.

Do **not** run `python3 -m http.server --directory bubble-frame` from your home folder. There is no `bubble-frame` folder there, so the browser gets 404.

If you double-clicked **`Start Bubble Frame.command`** and macOS said it could not verify the file: click **Done** (not Move to Trash). Then either use the HTML file above, or right-click the `.command` → **Open** → **Open**. You can also allow it in Apple menu → System Settings → Privacy & Security → **Open Anyway**.

**On Windows:** double-click **`Start Bubble Frame.bat`**, or use the same link.

## How sizes work

You enter the **photo** width and height. The beads sit around that rectangle and bite inward by **overlap over the photo**. Adjacent beads overlap each other by **bead-to-bead overlap** (or add/remove circles per side, which changes that overlap).

Click a circle in the 2D or 3D preview to turn it off (leaves a gap) or back on.

## Print

Default **4×6 in** files are already in this folder (open it in Finder):

| File | What it is |
| --- | --- |
| [`bubble-frame-4x6in-frame.stl`](bubble-frame-4x6in-frame.stl) | Hemispheres + thin bed web. Print flat on the bed. |
| [`bubble-frame-4x6in-back.stl`](bubble-frame-4x6in-back.stl) | Photo-sized plate with two hanging holes. |
| [`bubble-frame-4x6in-stand.stl`](bubble-frame-4x6in-stand.stl) | Easel: front shelf + angled backrest. Print the **side profile** flat on the bed. |

The app can download other sizes as `bubble-frame-…-frame.stl` / `-back.stl` / `-stand.stl`.

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

To regenerate the 4×6 files in this folder (needs `npm install manifold-3d` once):

```bash
node export_default.mjs
```
