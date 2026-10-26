# Paddington tag

Necklace-size luggage tag from the classic Paddington label. One printable solid: clipped top corners, rounded bottom, 5 mm cord hole, marker lettering raised 0.8 mm so it prints in a single color.

Default is about **55 mm** tall. Sliders: overall height, hole diameter, letter height, tag thickness.

## Letters

The strokes are traced from the reference photo (dark marker on the parchment), not a system font. Same line breaks and the same rotation relative to the hole:

Please look / after this / BEAR THANK / you.

`letters.js` holds those outlines in millimeters. `trace_letters.py` regenerates them from the photo (threshold the ink, keep the counters, simplify pixel stairs).

## Print

Flat on the bed, letters up, no supports. 0.2 mm layers. PLA or PETG. The hole is sized for a necklace cord, with plastic left around it.

STL: [`paddington-tag-v1.stl`](paddington-tag-v1.stl).
