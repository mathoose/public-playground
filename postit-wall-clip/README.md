# Post-it wall clip

A reprint of the small gray hairpin clip that holds Post-it notes on a wall.

**This version:** Post-it clip v3 · Sep 20, 2026

## Your place (bookmark this)

**Designer:** https://rawcdn.githack.com/mathoose/public-playground/469c090/postit-wall-clip/index.html

**Print this file:** https://cdn.jsdelivr.net/gh/mathoose/public-playground@469c090/postit-wall-clip/postit-wall-clip-v2.stl

**Wide pad:** https://cdn.jsdelivr.net/gh/mathoose/public-playground@469c090/postit-wall-clip/postit-wall-clip-wide-v2.stl

Open the designer, drag sliders, then tap **Download this STL**. Or tap the ready-made v3 file and send it to your printer.

## Ready-made STLs

| File | Size (mm) | Use |
| --- | --- | --- |
| `postit-wall-clip-v3.stl` | 40 × 14 × **20** | This version — matches the printed clip + putty slot |
| `postit-wall-clip-wide-v3.stl` | 40 × 14 × **76** | Full 3×3 in Post-it pad |

`postit-wall-clip.stl` and `-wide.stl` are the same meshes without the version in the name.

## How it works

1. Press sticky putty (Blu-Tack / Patafix) into the **chamfered slot** on the flat back (default 4 mm along × 2 mm deep, 2.5 mm in from the tab end — drag **Putty slot location** to slide it), or use tape.
2. Stick it to the wall with the C-hook on the left or right — the open lip should be reachable.
3. Slide a Post-it pad or loose notes under the wavy arm. The C-pocket takes a small stack; the wave pinches them so they stay put.

The 20 mm clip is the size of the original (clips the top-center of a pad). The 76 mm clip spans a whole 3×3 in pad.

~6 g PLA for the original, ~22 g for the wide one.

## Print settings

Print it **on its side**: put the S-shaped profile on the bed so the 20 mm (or 76 mm) width is Z. That is how the original was printed — layer lines run across the spring, which is what makes it hold.

- No supports
- 0.2 mm layers, 0.4 mm nozzle
- 3–4 walls, 30–40% infill (or 100% — it is a tiny part)
- PLA is what the original looks like. PETG will be springier.

A brim is optional. The part is ~40 × 14 mm on the bed.

## Customize

Use the designer sliders, or edit `ClipParams` in `generate.py` and run:

```bash
python3 generate.py
```

`clip.js` is a browser port of the same math (reset in the designer matches these defaults).

## Files

- `index.html` / `viewer.js` / `clip.js` — live designer
- `generate.py` — source for committed STLs
- `postit-wall-clip-v3.stl` / `-wide-v3.stl` — slice these
- `*.scad` — same solids, width still parametric
