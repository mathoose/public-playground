# Power bank wrap

Live **slide-on cord-wrap sleeve** for Mattheus’s mint **SYJSHUANGXI SYJ-F37F** (143 × 68 × 16 mm). Cord wraps **around the sleeve band** (the 68×16 cross-section), never over the USB end. Two **elastic snap clips on the back** hold the cord ends, in the valley between the wrap rings.

**Power bank wrap v6 · Oct 6, 2026**

## Open the designer

jsDelivr serves HTML as text, so use **htmlpreview**:

[Open designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/power-bank-wrap-9c5d/power-bank-wrap/index.html)

After merge: [designer on main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/power-bank-wrap/index.html) · [files on GitHub](https://github.com/mathoose/public-playground/tree/main/power-bank-wrap)

Phone-first: orbit, drag sliders, **Undo** / **Redo** (also Ctrl/⌘Z), **Download this STL**. Presets: **SYJ-F37F**, **HOCO J159**, **Loose fit**.

## What it is

An open-ended band the bank **slides into**. USB ports and LEDs stay out.

- **Taper** (default **0.4 mm per side**) so it grips
- **Two C-channels around the 68×16 perimeter** (rotated 90° vs v3)
- **Two elastic omega clips** on the underside, between the wrap rings (mouth ~58% of the cord)

## Print (Snapmaker Luban / PETG)

1. Stand it on the **tight end**, hole pointing up. **No supports.**
2. **PETG**, 0.4 mm nozzle, **0.2 mm** layers, **4 walls**, 20–25% infill.
3. Slide the **10+ end in first**. Wind the cord around the band; snap both ends into the bottom clips.

Default outer size is **72.0 × 87.2 × 35.1 mm** — fits A150 / A250 / A350.

## Rebuild

```bash
npm install
npm test
npm run build
npm run export
```

`app.bundle.js` and `power-bank-wrap-v5.stl` are committed so htmlpreview / Pages work without `npm install` on the phone.
