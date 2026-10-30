# Poop bag holder

Parametric recreation of Mattheus's pink screw-cap dog poop bag holder: a tube that holds a standard bag roll, a knurled screw-on cap, an **S-shaped slot that runs from the top rim into a round pull window** (so the threaded top is split and flexes instead of cracking), a small square peek window, rim notches, and a side tab with a hole for a keyring / leash clip.

**Open:** [htmlpreview (branch)](https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/poop-bag-holder-a333/poop-bag-holder/index.html) · after merge: `https://mathoose.github.io/public-playground/poop-bag-holder/` (once Pages is enabled)

## Print

- PETG (most durable) or PLA, 0.2 mm layers, 3–4 walls, 15–20 % infill, **no supports**.
- **Body:** flat base on the bed. Threads use 45° flanks; the keyring tab has a 45° underside; the pull window has a teardrop top.
- **Cap:** the STL is exported upside down — closed top on the bed, threads facing up.
- Defaults: [`poop-bag-holder-body.stl`](poop-bag-holder-body.stl), [`poop-bag-holder-cap.stl`](poop-bag-holder-cap.stl) (~14.5 g + 6.5 g PETG).
- Cap binds → raise **Thread clearance** (0.3 → 0.4 mm). Cap rattles → lower it.

## Defaults

| | |
| --- | --- |
| Roll | 30 mm dia × 50 mm (0.8 mm clearance per side) |
| Body | 35.2 mm OD × 53.1 mm, 1.8 mm wall, 1.6 mm floor |
| Cap | 41.2 mm OD × 12 mm, 30 ribs |
| Thread | 3 mm pitch, 0.9 mm deep, 9 mm long, 0.3 mm clearance, right-hand |
| Slot | S-curve, 2.4 mm wide, 12 mm sideways sweep into a 14 mm window at 30 mm |
| Tab | 5 mm hole at 26 mm height, 100° around from the window |

## Params

Bag roll (diameter, length, clearance, headroom) · slot shape (S / straight), width, sweep, window diameter + height, teardrop top, square peek window, rim notches · tab angle, height, hole, rim, thickness · thread clearance, pitch, depth, length, cap wall/top, knurl style (ribs / diamond / smooth), rib count + depth · body wall, floor.

Undo / Redo and typeable numbers come from `../shared/`.

## Build

```bash
npm install
npm run build    # app.bundle.js
npm test         # manifold validity + body/cap don't collide when screwed on
npm run export   # default STLs
```

Files: `geometry.js` (params + derived dims), `cad.js` (Manifold CAD + STL), `preview.js` (Three.js viewer), `app.js` (UI).
