# Henson razor tool

Live designer for a **blade-change cradle** (and optional **handle grip**) for the **Henson AL13 / Ti22** safety razor, so your fingers never hold the head while you unscrew it.

**Henson razor tool v2 · Oct 6, 2026**

## Open the designer

[Open designer (htmlpreview, this branch)](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/henson-razor-tool-67bf/henson-razor-tool/index.html)

After merge: [designer @ main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/henson-razor-tool/index.html)

Phone-first: orbit the cradle on top, sliders below. Download the cradle and grip STLs separately.

## Print these (v1 defaults)

| Part | File | Orientation |
| --- | --- | --- |
| Head cradle | [`henson-head-cradle-v1.stl`](henson-head-cradle-v1.stl) | Flat bottom on the bed, pocket up |
| Handle grip (optional) | [`henson-handle-grip-v1.stl`](henson-handle-grip-v1.stl) | Standing, wide (tail) end on the bed |

PETG or PLA, 0.2 mm layers, 3–4 walls, 20 % infill, **no supports**. Edges are rounded ~1.5 mm on top and chamfered at the bed.

## How it works

The Henson head is not round: it is a ~43 × 24 mm block whose cross-section tapers from the narrow **top cap** (~17.5 mm) to the wider **baseplate** (~24.5 mm). The cradle is a knurled Ø62 mm puck with a pocket that matches the **cap** taper, so the cap cannot turn. Above the cap grip the pocket steps out by the **blade-edge relief**, so the blade edges never touch plastic.

1. Drop the razor in **cap down**, handle up.
2. Hold the knurled puck (or set it on the counter) and turn the handle **counter-clockwise** (standard right-hand thread).
3. Lift the handle away. The cap stays in the pocket blade-up.
4. Take the blade off by its **short ends** using the finger notches; push the cap up through the bottom hole if it sticks.
5. Lay the new blade on the cap tabs, baseplate back on (Nitronic bushing facing the handle), handle **clockwise** until finger-tight.

**Grip sleeve:** with the head off, slide it on from the threaded end and push toward the tail. Its bore follows the 12.25 → 9.75 mm handle taper, so it wedges tight near the tail and can stay on.

## Defaults and sources

| Dimension | Default | Source |
| --- | --- | --- |
| Head length | 43.0 mm | Printables guard #523295 (43.5 inner) and unscrew tool #1561273 (44.25 pocket) |
| Head width at blade line | 23.5 mm | Unscrew tool pocket 23.85 mm; guard 24.5 mm at the baseplate |
| Cap top width | 17.5 mm | Guard inner profile 17 mm at the cap face |
| Handle Ø tail / near head | 12.25 / 9.75 mm | Henson FAQ (v2 handle) |
| Fit clearance | 0.3 mm per side | — |

Calipers beat these numbers — measure your head and adjust **Razor head** sliders.

## Sliders

**Fit:** fit clearance · blade-edge relief
**Razor head:** head length · head width at blade line · cap top width · cap grip depth · head corner radius · relief tier height
**Cradle:** diameter · floor · push-out hole · grip ribs · rib depth · edge round · finger notch width
**Handle grip:** handle Ø at tail · handle Ø near head · grip length · outer Ø · bore clearance · flutes

## Rebuild

```bash
npm install
npm test
npm run build
node export_default.mjs   # rewrite the v1 STLs
```

`app.bundle.js` is committed so htmlpreview / CDN / Pages work without `npm install` on the phone.
