# Photive snap box

Live **open tray + snap-over lid + USB spacer comb** designer for Mattheus’s **Photive 6-port** USB brick.

**Photive snap box v3 · Oct 5, 2026**

Not the travel case (wrap / six organizer slots / USB cap). Those stay on hold in [PR #13](https://github.com/mathoose/public-playground/pull/13).

## Open the designer

[Designer @ main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/photive-snap-box/index.html) · [jsDelivr @ main](https://cdn.jsdelivr.net/gh/mathoose/public-playground@main/photive-snap-box/)

Phone-first: orbit the tray on top, sliders below. View chips: **Open**, **Closed**, **Tray**, **Lid**, **Spacer**, plus **Section** (cuts through the snap nubs so you can see the lid fit).

## Print these (v3 defaults)

| Part | File | Orientation |
| --- | --- | --- |
| Tray | [`photive-snap-box-base.stl`](photive-snap-box-base.stl) | floor on the bed |
| Lid | [`photive-snap-box-lid.stl`](photive-snap-box-lid.stl) | flat face on the bed, skirt up |
| USB spacer | [`photive-snap-box-usb-spacer.stl`](photive-snap-box-usb-spacer.stl) | flat bottom on the bed, slots up |

The default spacer assumes every plug sticks out **11 mm** from the brick. Measure yours and set the six **Port N plug length** sliders before printing the spacer.

## v3 changes (lid fit + spacers)

**Why the v2 lid didn’t fit:** its snap skirt hung **inside** the tray. The skirt was 70.16 mm across outside (0.32 mm/side under the 70.8 mm opening, fine), but with 1.7 mm walls its **inside was only 66.76 mm** — and the 70 mm brick fills the tray wall-to-wall with only 0.6 mm headroom. The 5 mm deep skirt landed on the brick’s top edges (1.6 mm overlap per side) and stopped the lid **4.4 mm proud**, so the nubs never reached their pockets.

**Fix:** the lid is now a **cap** whose skirt goes **over the outside** of the walls. Nothing on the lid enters the cavity.

| Fit (defaults) | Value |
| --- | --- |
| Tray outside | 142.6 × 75.6 mm |
| Skirt inside | 143.16 × 76.16 mm (**0.28 mm/side**, slider 0.15–0.6) |
| Lid outside | 146.36 × 79.36 mm (1.6 mm skirt, 5 mm deep) |
| Snap nubs | 4 × 10 mm, r 0.55, bite **0.27 mm** into 0.52 mm grooves on the outer long walls |
| Rim | 1.0 mm lead-in chamfer + 0.6 mm chamfer in the skirt mouth |

**USB spacer comb:** USB plug bodies are different lengths, so they stop at different distances from the front wall and can back out of the ports. The comb drops in against the front wall, **over the cables** (slots open at the top), and each tooth fills the gap behind one plug:

- tooth depth = USB pocket (15 mm) − plug length − fit gap (0.25 mm)
- a low **brick stop bar** (4 mm tall, under the plugs) sets where the brick sits, so the tooth depths are exact
- the lid holds the comb down; port 1 is the **rightmost** hole seen from outside (corner notch on the spacer)

## Sliders

Grouped, collapsible. Photive defaults in **Reset Photive**.

- **Fit** (open) — lid clearance, rear cord slot, USB hole size / pitch
- **Inside** (open) — inner width / length, USB plug extra, rear extra, height
- **USB spacers** (open) — spacer fit gap, brick stop height, Port 1–6 plug length (0 = empty port)
- **Box** — wall, floor, corner radius, rim lead-in chamfer, USB hole count
- **Lid** — thickness, snap overlap, skirt thickness, snap bead radius
- **Download** — tray / lid / spacer STLs

## Snapmaker Luban (PETG)

1. Open each STL; print as exported (no supports).
2. **PETG**, 0.2 mm layers, 4 walls, 20–25% infill, bed 70–80 °C, nozzle 240–250 °C.
3. Brick in, cables through the front holes, plug in, drop the spacer over the cables, cord into the rear slot, snap the lid.

If the lid is tight: raise **Lid clearance** toward **0.35** or sand the nubs. If loose: drop toward **0.22** or raise **Snap bead radius**.

## Rebuild

```bash
npm install
npm test            # geometry + seated-assembly collision checks
npm run build       # app.bundle.js
./build-stl.sh      # default STLs
```

`app.bundle.js` is committed so CDN / Pages work without `npm install` on the phone. [`photive-snap-box.scad`](photive-snap-box.scad) is the superseded v1 source — don’t print its lid.
