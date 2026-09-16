# Post-it wall clip

A reprint of the small gray hairpin clip that holds Post-it notes on a wall.

The original file is gone; this is a reverse-engineered match from the printed part: a constant-thickness ribbon with a flat taped back, a rounded C-pocket, a wavy spring arm, and a flared lip.

**Print this:** [`postit-wall-clip.stl`](postit-wall-clip.stl)  
**Full 3×3 in pad:** [`postit-wall-clip-wide.stl`](postit-wall-clip-wide.stl)

## How it works

1. Put double-sided tape or a small Command strip on the **flat back**.
2. Stick it to the wall with the C-hook on the left or right — the open lip should be reachable.
3. Slide a Post-it pad or loose notes under the wavy arm. The C-pocket takes a small stack; the wave pinches them so they stay put.

The 20 mm clip is the size of the original (clips the top-center of a pad). The 76 mm clip spans a whole 3×3 in pad.

## Sizes

| File | Size (mm) | Use |
| --- | --- | --- |
| `postit-wall-clip.stl` | 40 × 14 × **20** | Original — matches the printed clip |
| `postit-wall-clip-wide.stl` | 40 × 14 × **76** | Full 3×3 in Post-it pad |

~6 g PLA for the original, ~22 g for the wide one.

## Print settings

Print it **on its side**: put the S-shaped profile on the bed so the 20 mm (or 76 mm) width is Z. That is how the original was printed — layer lines run across the spring, which is what makes it hold.

- No supports
- 0.2 mm layers, 0.4 mm nozzle
- 3–4 walls, 30–40% infill (or 100% — it is a tiny part)
- PLA is what the original looks like. PETG will be springier.

A brim is optional. The part is ~40 × 14 mm on the bed.

## Customize

```bash
python3 generate.py
```

Tweak `ClipParams` at the top of `generate.py` (`width`, `thickness`, `back_length`, `hook_inner_r`, `pinch_gap`, `lip_angle_deg`, …) and re-run.

If you have OpenSCAD, open `postit-wall-clip.scad` and change `width` to reprint a different extrusion without Python.

## Files

- `generate.py` — source of truth
- `postit-wall-clip.stl` / `-wide.stl` — slice these
- `*.scad` — same solids, width still parametric
- `*-profile.png` / `*-iso.png` — previews
- `index.html` — local preview page
