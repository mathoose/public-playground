# Power bank wrap

Live **open tray + figure-8 wrap porch** for Mattheus’s mint **SYJSHUANGXI SYJ-F37F** (143 × 68 × 16 mm).

**Power bank wrap v1 · Oct 5, 2026**

## Open the designer

jsDelivr serves HTML as text, so use **htmlpreview**:

[Open designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/power-bank-wrap-9c5d/power-bank-wrap/index.html)

After merge: [designer on main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/power-bank-wrap/index.html) · [files on GitHub](https://github.com/mathoose/public-playground/tree/main/power-bank-wrap)

Phone-first: orbit the tray, drag sliders, **Download this STL**. Presets: **SYJ-F37F**, **HOCO J159**, **Loose fit**.

## What it is

Open tray on the mint face (LEDs stay visible). Cutouts for the USB-A / USB-C PD end, the side power button, and the side micro-USB. A short porch at the 10+ end holds two mushroom wrap posts and a plug clip. Figure-8 the phone cable, clip the plug.

Same shell as the hoco **J159 Essence** (143.5 × 68 × 16 mm) if you ever swap banks.

## Print (Snapmaker Luban / PETG)

1. Floor on the bed, posts pointing up. **No supports** (heads are 45° flares).
2. **PETG**, 0.4 mm nozzle, **0.2 mm** layers, **4 walls**, 20–25% infill.
3. Drop the bank mint-face up. If it’s tight, raise **XY clearance** or pick **Loose fit**.

## Rebuild

```bash
npm install
npm test
npm run build
npm run export
```

`app.bundle.js` and `power-bank-wrap-v1.stl` are committed so htmlpreview / Pages work without `npm install` on the phone.
