# Photive snap box

Live **open tray + snap lid** designer for Mattheus’s **Photive 6-port** USB brick.

**Photive snap box v2 · Oct 5, 2026**

Not the travel case (wrap / six organizer slots / USB cap). Those stay on hold in [PR #13](https://github.com/mathoose/public-playground/pull/13).

## Open the designer

After this branch is on GitHub, use the jsDelivr **commit** link (branch names with `/` do not work on jsDelivr):

[Open designer](https://cdn.jsdelivr.net/gh/mathoose/public-playground@0ba8fd926c1d0b3ce9a68031b2c9f07061aa4421/photive-snap-box/)

After merge: [designer @ main](https://cdn.jsdelivr.net/gh/mathoose/public-playground@main/photive-snap-box/)

Phone-first: orbit the tray on top, sliders below. **Download base STL** and **Download lid STL** separately.

## Print these (v1 defaults)

| Part | File |
| --- | --- |
| Tray | [`photive-snap-box-base.stl`](photive-snap-box-base.stl) |
| Lid | [`photive-snap-box-lid.stl`](photive-snap-box-lid.stl) |

Or generate a custom pair from the live sliders.

## What it is

Brick **100 × 70 × 26 mm**, ~4 mm corners. Sits in an open tray (open on the large 100×70 face).

| End | Geometry |
| --- | --- |
| USB (70×26) | **+15 mm** inside for USB-A plug bodies; **six cable-only holes** (~5 × 7.6 mm stadiums) on 10 mm pitch |
| C8 (opposite 70×26) | **+22 mm** inside for the figure-8 plug body; **8.5 mm** centered hole + **U-slot from the open top** so the cord drops in; lid closes the slot and a small tab captures the cord |

Lid **snaps** (inner skirt + four nubs on the long sides). No wrap posts, no cable-organizer slots, no separate USB cap.

## Sliders

Grouped, collapsible. Photive defaults in **Reset Photive**.

**Fit** (open)

- Snap-fit clearance
- Rear cord gap / slot width
- USB cable hole width
- USB cable hole height
- USB hole pitch

**Inside** (open)

- Inner width
- Inner length
- USB plug extra (+15 mm pocket; grows inner length)
- Rear extra (C8 plug body)
- Inner / box height

**Box**

- Wall thickness
- Floor thickness
- Corner radius
- Edge fillet
- USB hole count

**Lid**

- Lid thickness
- Lid snap overlap
- Skirt thickness
- Snap bead radius

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
   - Bed **70–80 °C**, nozzle **240–250 °C**
   - Brim optional on the lid if the first layer is fussy
5. Print the **base first**. Drop the brick in, thread USB cables through the front, drop the figure-8 cord into the rear slot, then print the lid.

If the lid is tight: sand the four nubs or raise **Snap-fit clearance** toward **0.40**. If loose: drop it toward **0.24**.

## Rebuild

```bash
npm install
npm test
npm run build
```

`app.bundle.js` is committed so CDN / Pages work without `npm install` on the phone.

OpenSCAD v1 source is still [`photive-snap-box.scad`](photive-snap-box.scad) (`./build-stl.sh`). The live designer uses the same defaults in JS (manifold-3d).
