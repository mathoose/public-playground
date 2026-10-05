# Photive 6-port — travel case (Part B)

Custom nest for **Photive** brick **100 × 70 × 26 mm** (~4 mm corners), **six cable slots** with label recesses, **friction-fit lid** with **cord-wrap posts** for the detachable figure-8 AC lead.

Part A (snap-on cap) is **not** included in this folder.

## Files

| File | Description |
| --- | --- |
| `photive-travel-case.scad` | Parametric source (`part` = `base` \| `lid`) |
| `photive-travel-case-base.stl` | Case body |
| `photive-travel-case-lid.stl` | Lid + cord wrap |
| `build-stl.sh` | Re-export STLs after editing `.scad` |

## Print

- **Material:** PETG recommended (durability, slight flex on lid skirt).
- **Orientation:** Each part **flat on the build plate** (base bottom down, lid top down so cord posts print vertically).
- **Walls:** ~2.4 mm; no supports expected for base; lid skirt may need **0.2 mm brim** if corner lift.
- **Tuning:** If lid is loose/tight, adjust `lip_clear` in `.scad` (±0.1 mm).

## Layout

- **AC end** (−X): pocket for figure-8 plug body.
- **USB end** (+X toward slots): six parallel slots open toward the brick face (charging-station or coiled travel).
- **Finger notch** on the USB end of the nest for lift-out.

## Verify on your brick

OpenSCAD parameters `usb_row_spacing`, `usb_col_spacing`, `usb_face_margin_x/y` are **guesses** for a 2×3 USB-A grid. Uncomment `usb_port_markers()` in the `.scad` and preview to check alignment; caliper-measure and adjust before assuming port-to-slot alignment.

Brick envelope was confirmed from photos/caliper; **port positions were not photographed**.
