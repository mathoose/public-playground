# Power bank wrap

Live **open tray + charger pocket + figure-8 wrap posts** for Mattheus’s mint **SYJSHUANGXI SYJ-F37F** (143 × 68 × 16 mm).

**Power bank wrap v2 · Oct 5, 2026**

## Open the designer

jsDelivr serves HTML as text, so use **htmlpreview**:

[Open designer](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/power-bank-wrap-9c5d/power-bank-wrap/index.html)

After merge: [designer on main](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/main/power-bank-wrap/index.html) · [files on GitHub](https://github.com/mathoose/public-playground/tree/main/power-bank-wrap)

Phone-first: orbit the tray, drag sliders, **Download this STL**. Presets: **SYJ-F37F**, **HOCO J159**, **Loose fit**.

## What it is

Open tray on the mint face (LEDs stay visible).

- **Short USB end:** one rounded-rectangle window over USB-A + USB-C PD + USB-A
- **Long sides:** power button and micro-USB cutouts
- **Next to the bank:** storage well (default 45 × 40 × 30 mm) for a coiled ~1 m cable + compact 20 W USB-C wall plug
- **Opposite short end:** figure-8 mushroom posts + plug clip, so the cable can reach the ports

## Print (Snapmaker Luban / PETG)

1. Floor on the bed, posts pointing up. **No supports** (heads are 45° flares).
2. **PETG**, 0.4 mm nozzle, **0.2 mm** layers, **4 walls**, 20–25% infill.
3. Drop the bank mint-face up. Extra charger goes in the taller well.

Default outer size is **242.9 × 72.9 × 31.8 mm** — fits Snapmaker A350 (320×350) and A250 if the long side is on the 250 mm axis. Does **not** fit A150 (160 mm square).

## Rebuild

```bash
npm install
npm test
npm run build
npm run export
```

`app.bundle.js` and `power-bank-wrap-v2.stl` are committed so htmlpreview / Pages work without `npm install` on the phone.
