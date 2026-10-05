# Power bank wrap

Live **slide-on cord-wrap sleeve** for Mattheus’s mint **SYJSHUANGXI SYJ-F37F** (143 × 68 × 16 mm). Modeled on the Anker 733 cable wrap: two outer cord pockets, a tapered hole so it grips.

**Power bank wrap v3 · Oct 5, 2026**

## Open the designer

jsDelivr serves HTML as text, so use **htmlpreview**:

[Open designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/power-bank-wrap-9c5d/power-bank-wrap/index.html)

After merge: [designer on main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/power-bank-wrap/index.html) · [files on GitHub](https://github.com/mathoose/public-playground/tree/main/power-bank-wrap)

Phone-first: orbit the sleeve, drag sliders, **Download this STL**. Presets: **SYJ-F37F**, **HOCO J159**, **Loose fit**.

## What it is

An open-ended band the bank **slides into**. USB ports and LEDs stay out the other end.

- **Inner width / sleeve length / thickness** are sliders
- **Taper** (default **0.4 mm per side**): the far end of the hole is slightly smaller, so it slides on tight and stays put
- **Two C-channel wrap pockets** on the long sides (figure-8 the cable)
- Optional side slots so the power button and micro-USB aren’t covered if you lengthen the sleeve

“Width and length to be blue” was treated as **adjustable sliders**, not a print color.

## Print (Snapmaker Luban / PETG)

1. Stand it on the **tight end**, hole pointing up. **No supports.**
2. **PETG**, 0.4 mm nozzle, **0.2 mm** layers, **4 walls**, 20–25% infill.
3. Slide the **10+ end in first**. USB / LEDs / button stay exposed.

Default outer size is **72.0 × 91.2 × 21.1 mm** — fits A150 / A250 / A350.

## Rebuild

```bash
npm install
npm test
npm run build
npm run export
```

`app.bundle.js` and `power-bank-wrap-v3.stl` are committed so htmlpreview / Pages work without `npm install` on the phone.
