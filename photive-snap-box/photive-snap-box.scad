// Photive 6-port USB charger — simple snap box
// Open tray on the 100×70 face + snap-fit lid (no travel wrap / organizer).
// SUPERSEDED (v1) — do not print this lid: its skirt hangs inside the cavity and lands on the
// brick (66.8 mm skirt opening vs 70 mm brick, 4.4 mm too deep). The live designer (v3, stl.js)
// is the source of truth: outside-cap lid + USB spacer comb. ./build-stl.sh exports from it.
// Brick: 100 × 70 × 26 mm, ~4 mm corner R.
// USB 1×6 on one 70×26 end; figure-8 C8 on the opposite 70×26 end.

/* [Part] */
part = "base"; // [base, lid, both, preview]

/* [Brick — measured] */
brick_l = 100;       // mm, USB face ↔ C8 face
brick_w = 70;
brick_h = 26;
brick_r = 4;         // mm plan-view corner radius
nest_clear_xy = 0.4; // mm per side
nest_clear_z = 0.6;  // mm above brick in the cavity

/* [USB face — 1×6 row on 70×26; usb-face-caliper.jpg] */
usb_port_count = 6;
usb_pitch = 10.0;        // mm center-to-center along 70 mm
usb_side_margin = 10.0;  // mm from brick side to first/last port center
usb_z_center = 13.0;     // mm from brick bottom to port center
usb_hole_w = 5.0;        // mm — cable only (USB-A plug is ~12 mm)
usb_hole_h = 7.6;        // mm stadium height
usb_extra = 15;          // mm extra interior at USB end for plug bodies

/* [C8 / figure-8] */
ac_extra = 22;           // mm extra interior for C7 plug body
c8_z_center = 13.0;      // mm from brick bottom; inlet is centered on 26 mm face
c8_hole_d = 8.5;         // mm — passes cord jacket, blocks C7 body (~19×13)

/* [Box] */
wall = 2.4;
floor = 2.2;
touch_chamfer = 1.5;     // mm 45° on the open rim (finger edges)
outer_corner_add = 0;    // extra XY radius beyond brick_r+wall

/* [Lid — snap] */
lid_thickness = 2.6;
lip_depth = 5.0;
lip_clear = 0.32;        // mm skirt vs inner wall (per side)
lip_thick = 1.7;
bead_r = 0.55;           // mm snap nub
bead_len = 10;
bead_drop = 3.8;         // mm from rim down to bead center
pocket_extra = 0.25;     // mm pocket deeper/longer than bead
keeper_w = 5.4;          // mm cord-capture tab (fits in 8.5 mm slot)
keeper_h = 8.0;

$fn = 36;

// --- derived ---
function inner_l() = brick_l + usb_extra + ac_extra + 2 * nest_clear_xy;
function inner_w() = brick_w + 2 * nest_clear_xy;
function outer_l() = inner_l() + 2 * wall;
function outer_w() = inner_w() + 2 * wall;
function cavity_z() = brick_h + nest_clear_z;
function base_z() = floor + cavity_z();
function outer_r() = brick_r + wall + outer_corner_add;
function inner_r() = brick_r;
function usb_x_brick() = wall + nest_clear_xy + usb_extra;
function ac_x_brick() = usb_x_brick() + brick_l;
function y_brick0() = wall + nest_clear_xy;
function z_usb() = floor + usb_z_center;
function z_c8() = floor + c8_z_center;

module rounded_rect(w, l, r) {
  rr = min(r, w / 2 - 0.05, l / 2 - 0.05);
  offset(r = rr)
    square([w - 2 * rr, l - 2 * rr], center = true);
}

module extruded_rounded(w, l, h, r) {
  linear_extrude(height = h, convexity = 8)
    rounded_rect(w, l, r);
}

// Stadium through-hole along +X (vertical capsule in YZ)
module stadium_x(d, h, len) {
  dh = max(0, h - d);
  hull() {
    translate([0, 0, dh / 2]) rotate([0, 90, 0]) cylinder(d = d, h = len);
    translate([0, 0, -dh / 2]) rotate([0, 90, 0]) cylinder(d = d, h = len);
  }
}

module usb_cable_holes() {
  for (i = [0 : usb_port_count - 1]) {
    py = y_brick0() + usb_side_margin + i * usb_pitch;
    translate([-1, py, z_usb()])
      stadium_x(usb_hole_w, usb_hole_h, wall + 3);
    // outer mouth chamfer
    translate([-0.6, py, z_usb()])
      stadium_x(usb_hole_w + 1.2, usb_hole_h + 1.2, 1.4);
  }
}

module rear_u_slot() {
  x0 = outer_l() - wall - 1.2;
  py = outer_w() / 2;
  pz = z_c8();
  // Round hole for the cord
  translate([x0, py, pz])
    rotate([0, 90, 0]) cylinder(d = c8_hole_d, h = wall + 4);
  // U-slot from the open face down into that hole (cord drops in from above)
  translate([x0, py - c8_hole_d / 2, pz])
    cube([wall + 4, c8_hole_d, base_z() - pz + 4]);
}

module snap_pockets() {
  // Recesses in the inner faces of the two long walls (not in the cavity)
  xs = [outer_l() * 0.28, outer_l() * 0.72];
  pz = base_z() - bead_drop;
  pw = bead_len + 1.2;
  ph = bead_r * 2 + 1.0;
  pd = bead_r + lip_clear + pocket_extra + 0.15;
  for (px = xs) {
    translate([px - pw / 2, wall - pd, pz - ph / 2])
      cube([pw, pd + 0.25, ph]);
    translate([px - pw / 2, outer_w() - wall - 0.25, pz - ph / 2])
      cube([pw, pd + 0.25, ph]);
  }
}

module rim_chamfers() {
  // Outer top 45° only — inner rim stays full wall so snaps have meat
  ch = touch_chamfer;
  translate([outer_l() / 2, outer_w() / 2, base_z() - ch])
    difference() {
      extruded_rounded(outer_l() + 4, outer_w() + 4, ch + 1.2, outer_r());
      hull() {
        extruded_rounded(outer_l(), outer_w(), 0.02, outer_r());
        translate([0, 0, ch + 0.02])
          extruded_rounded(outer_l() - 2 * ch, outer_w() - 2 * ch, 0.02,
                           max(0.4, outer_r() - ch));
      }
    }
}

module base_body() {
  difference() {
    translate([outer_l() / 2, outer_w() / 2, 0])
      extruded_rounded(outer_l(), outer_w(), base_z(), outer_r());
    // Open trough — inner cavity through the top
    translate([outer_l() / 2, outer_w() / 2, floor])
      extruded_rounded(inner_l(), inner_w(), cavity_z() + 4, inner_r());
    usb_cable_holes();
    rear_u_slot();
    snap_pockets();
    rim_chamfers();
  }
}

module lid_skirt() {
  ox = inner_l() - 2 * lip_clear;
  oy = inner_w() - 2 * lip_clear;
  ix = ox - 2 * lip_thick;
  iy = oy - 2 * lip_thick;
  translate([outer_l() / 2, outer_w() / 2, 0])
    difference() {
      extruded_rounded(ox, oy, lip_depth, max(0.6, inner_r() - lip_clear));
      translate([0, 0, -0.2])
        extruded_rounded(ix, iy, lip_depth + 0.6, max(0.4, inner_r() - lip_clear - lip_thick));
      // Rear gap so the skirt does not block the U-slot; keeper fills it
      translate([ox / 2 - wall, 0, lip_depth / 2])
        cube([wall * 2 + 4, c8_hole_d + 1.2, lip_depth + 2], center = true);
    }
}

module lid_beads() {
  xs = [outer_l() * 0.28, outer_l() * 0.72];
  oz = lid_thickness + bead_drop;
  oy_out = (inner_w() - 2 * lip_clear) / 2;
  for (px = xs) {
    for (side = [-1, 1]) {
      translate([px, outer_w() / 2 + side * oy_out, oz])
        rotate([0, 90, 0])
          hull() {
            translate([0, 0, -bead_len / 2 + bead_r]) sphere(r = bead_r);
            translate([0, 0, bead_len / 2 - bead_r]) sphere(r = bead_r);
          }
    }
  }
}

module cord_keeper() {
  // Hangs into the rear U-slot so the lid captures the cord.
  // Inset 0.25 mm from the outer wall so it does not poke out the back.
  thick = wall - 0.5;
  translate([
    outer_l() - wall / 2 - 0.15,
    outer_w() / 2,
    lid_thickness
  ]) {
    hull() {
      translate([0, 0, keeper_h - 1.2])
        cube([thick, keeper_w, 0.4], center = true);
      translate([0, 0, 1.2])
        rotate([0, 90, 0])
          cylinder(d = keeper_w, h = thick, center = true);
    }
  }
}

module lid_finger_nicks() {
  // Thumb scallops on the long edges so the snap lid is easy to pop
  for (y = [0, outer_w()]) {
    translate([outer_l() / 2, y, lid_thickness / 2])
      rotate([0, 90, 0])
        cylinder(d = 4.2, h = 20, center = true);
  }
}

module lid_body() {
  // Print orientation: outer (pretty) face on the bed at z=0; skirt +Z
  difference() {
    union() {
      translate([outer_l() / 2, outer_w() / 2, 0])
        extruded_rounded(outer_l(), outer_w(), lid_thickness, outer_r());
      translate([0, 0, lid_thickness])
        lid_skirt();
      lid_beads();
      cord_keeper();
    }
    lid_finger_nicks();
  }
}

module preview_assembly() {
  base_body();
  // Flip lid from print orientation onto the open rim
  translate([0, 0, base_z() + lid_thickness + 14])
    translate([0, 0, lid_thickness])
      rotate([180, 0, 0])
        translate([0, -outer_w(), 0])
          lid_body();
}

if (part == "base") {
  base_body();
} else if (part == "lid") {
  lid_body();
} else if (part == "both") {
  base_body();
  translate([0, outer_w() + 12, 0]) lid_body();
} else if (part == "preview") {
  preview_assembly();
}
