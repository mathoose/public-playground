# Paddington tag

Necklace-size luggage tag from the classic Paddington label. Three printable parts in the same coordinates: the tag body, the raised marker letters, and a raised ring around the 5 mm cord hole (the dark brown grommet on the photo). Each part is its own STL so a slicer can give it a color.

Default is about **55 mm** tall. Sliders: overall height, hole diameter, letter height, tag thickness.

## Letters

The strokes are traced from the reference photo (dark marker on the parchment), not a system font. Same line breaks and the same rotation relative to the hole:

Please look / after this / BEAR THANK / you.

`letters.js` holds those outlines in millimeters. `trace_letters.py` regenerates them from the photo (threshold the ink, keep the counters, simplify pixel stairs).

## Print

Flat on the bed, letters and ring up, no supports. 0.2 mm layers. Import all three STLs together and assign three colors: body, letters, and the hole ring (brown). The ring is raised the same height as the letters so a color change at that layer works too. The hole is sized for a necklace cord, with plastic left around the ring.

- [`paddington-tag-v2-body.stl`](paddington-tag-v2-body.stl)
- [`paddington-tag-v2-letters.stl`](paddington-tag-v2-letters.stl)
- [`paddington-tag-v2-ring.stl`](paddington-tag-v2-ring.stl)
