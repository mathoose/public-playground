# Photive snap box

Simple **open tray + snap lid** for Mattheus’s **Photive 6-port** USB brick.

**Photive snap box v1 · Oct 5, 2026**

Not the travel case (wrap / six organizer slots / USB cap). Those stay on hold in [PR #13](https://github.com/mathoose/public-playground/pull/13).

## Print these

| Part | File |
| --- | --- |
| Tray | [`photive-snap-box-base.stl`](photive-snap-box-base.stl) |
| Lid | [`photive-snap-box-lid.stl`](photive-snap-box-lid.stl) |

**CDN (this branch, after push):**

- [base STL](https://cdn.jsdelivr.net/gh/mathoose/public-playground@cursor/photive-snap-box-44bc/photive-snap-box/photive-snap-box-base.stl)
- [lid STL](https://cdn.jsdelivr.net/gh/mathoose/public-playground@cursor/photive-snap-box-44bc/photive-snap-box/photive-snap-box-lid.stl)

After merge, swap `@cursor/photive-snap-box-44bc` for `@main`.

## What it is

Brick **100 × 70 × 26 mm**, ~4 mm corners. Sits in an open tray (open on the large 100×70 face).

| End | Geometry |
| --- | --- |
| USB (70×26) | **+15 mm** inside for USB-A plug bodies; **six cable-only holes** (~5 × 7.6 mm stadiums) on 10 mm pitch |
| C8 (opposite 70×26) | **+22 mm** inside for the figure-8 plug body; **8.5 mm** centered hole + **U-slot from the open top** so the cord drops in; lid closes the slot and a small tab captures the cord |

Lid **snaps** (inner skirt + four nubs on the long sides). No wrap posts, no cable-organizer slots, no separate USB cap.

## Snapmaker Luban (PETG)

1. Luban → **3D Printing** → open each STL (one at a time is easiest).
2. **Orientation (as exported — do not flip):**
   - **Base:** floor on the bed, open top up. USB holes are in a vertical wall; rear U-slot is open at the top. **No supports.**
   - **Lid:** pretty outer face on the bed, snap skirt pointing up. **No supports.**
3. **Material:** **PETG** (snaps need a little flex; PLA will creep).
4. **Suggested profile (0.4 mm nozzle):**
   - Layer **0.2 mm**
   - **4 walls** (1.6 mm) — box wall is 2.4 mm so 4–5 walls fill the sides
   - Infill **20–25%** gyroid or grid
   - Bed **70–80 °C**, nozzle **240–250 °C** (Snapmaker PETG default is fine)
   - Brim optional on the lid if the first layer is fussy
5. Print the **base first**. Drop the brick in, thread USB cables through the front, drop the figure-8 cord into the rear slot, then print the lid.

If the lid is tight: sand the four nubs or set `lip_clear` to **0.40** in the SCAD and re-export. If loose: `lip_clear` **0.24** or a sliver of tape on the skirt.

## Rebuild STLs

```bash
./build-stl.sh
```

Needs [OpenSCAD](https://openscad.org/) (2021.01 is fine). Edit numbers at the top of `photive-snap-box.scad` (Customizer groups work in the GUI).

## Files

- `photive-snap-box.scad` — source of truth
- `photive-snap-box-base.stl` / `-lid.stl` — slice these
- `index.html` — download links + print notes
