// Photive 6-port USB charger — travel case (Part B only)
// Brick envelope: 100 × 70 × 26 mm, ~4 mm corner radius; figure-8 AC on 100×26 end.
// USB face: SIX ports in ONE horizontal row on the 70×26 mm end (ports tall) — not 2×3.

/* [Part] */
part = "base"; // [base, lid, both]

/* [Brick — measured] */
brick_l = 100;      // mm, long axis (USB face ↔ AC face)
brick_w = 70;       // mm
brick_h = 26;       // mm
brick_r = 4;        // mm corner radius (outer)
nest_clear_xy = 0.4; // mm per side
nest_clear_z = 0.6;  // mm above brick (floor to cavity)

/* [USB face — 1×6 row on 70×26 end; from usb-face-caliper.jpg] */
usb_port_count = 6;
usb_pitch = 10.0;         // mm center-to-center along 70 mm face
usb_side_margin = 10.0;   // mm from side to first/last port center
usb_z_center = 13.0;      // mm from brick bottom to port center
usb_opening_w = 5.0;      // mm along row (narrow)
usb_opening_h = 12.2;     // mm tall (USB-A vertical)

/* [Case] */
wall = 2.4;
floor = 2.0;
slot_count = 6;
slot_throat = 5.2;        // mm — typical charge-cable OD + slack
slot_depth = 42;          // mm — coil storage in front of brick
slot_wall_h = 14;         // mm partition height
slot_divider = 1.4;
label_w = 12;
label_d = 8;
label_recess = 0.5;
ac_pocket_depth = 22;     // mm relief behind brick for figure-8 plug body
finger_notch_w = 28;
finger_notch_d = 8;
touch_fillet = 1.5;       // mm outer edge round on touch surfaces

/* [Lid — friction fit] */
lip_depth = 4.5;
lip_clear = 0.35;         // radial clearance lid skirt vs base bore
lip_overlap = 2.0;
lid_thickness = 2.8;

/* [Cord wrap — on lid top] */
wrap_post_h = 11;
wrap_post_d = 7;
wrap_gap = 9;             // mm between post centers (figure-8 cord path)
wrap_end_bar_l = 38;

$fn = 48;

// --- helpers ---
function inner_l() = brick_l + 2 * nest_clear_xy;
function inner_w() = brick_w + 2 * nest_clear_xy;
function inner_x_slots() = inner_l() + slot_depth;
function inner_y() = inner_w();
function outer_l() = inner_x_slots() + ac_pocket_depth + 2 * wall;
function outer_w() = inner_y() + 2 * wall;
function cavity_z() = brick_h + nest_clear_z;
function base_z() = floor + cavity_z();

module rounded_rect_xy(w, l, r) {
  rr = min(r, w / 2 - 0.01, l / 2 - 0.01);
  offset(r = rr)
    square([w - 2 * rr, l - 2 * rr], center = true);
}

module extruded_rounded(w, l, h, r) {
  linear_extrude(height = h, convexity = 10)
    rounded_rect_xy(w, l, r);
}

module brick_void() {
  translate([wall + ac_pocket_depth + nest_clear_xy + brick_l / 2,
             wall + inner_y() / 2,
             floor])
    extruded_rounded(brick_l + 2 * nest_clear_xy, brick_w + 2 * nest_clear_xy, brick_h + nest_clear_z, brick_r);
}

module ac_pocket() {
  // Extra cut at AC end so seated figure-8 plug does not lift the brick
  translate([wall + ac_pocket_depth / 2, wall + inner_y() / 2, floor])
    cube([ac_pocket_depth, inner_y() * 0.55, brick_h + nest_clear_z + 4], center = true);
}

module finger_notch() {
  translate([wall + ac_pocket_depth + inner_l() - finger_notch_d / 2,
             wall + inner_y() / 2,
             base_z() - 0.2])
    cube([finger_notch_d + 2, finger_notch_w, cavity_z() + 4], center = true);
}

module label_pad(cx, cy) {
  translate([cx, cy, floor + 0.01])
    linear_extrude(height = label_recess + 0.01)
      square([label_w, label_d], center = true);
}

module cable_slots_cut() {
  total = slot_count * slot_throat + (slot_count - 1) * slot_divider;
  y0 = wall + (inner_y() - total) / 2 + slot_throat / 2;
  x0 = wall + ac_pocket_depth + inner_l();
  for (i = [0 : slot_count - 1]) {
    cy = y0 + i * (slot_throat + slot_divider);
    translate([x0 + slot_depth / 2, cy, floor + slot_wall_h / 2])
      cube([slot_depth + 0.5, slot_throat, slot_wall_h + 0.5], center = true);
  }
}

module cable_slot_labels() {
  total = slot_count * slot_throat + (slot_count - 1) * slot_divider;
  y0 = wall + (inner_y() - total) / 2 + slot_throat / 2;
  x0 = wall + ac_pocket_depth + inner_l();
  for (i = [0 : slot_count - 1]) {
    cy = y0 + i * (slot_throat + slot_divider);
    label_pad(x0 + slot_depth - label_w / 2 - 3, cy);
  }
}

module base_body() {
  difference() {
    union() {
      translate([outer_l() / 2, outer_w() / 2, 0])
        extruded_rounded(outer_l(), outer_w(), base_z(), brick_r + wall);
      // slot partition outer rim
      translate([wall + ac_pocket_depth + inner_l() + slot_depth / 2, wall + inner_y() / 2, floor])
        cube([slot_depth + 1.2, inner_y(), slot_wall_h], center = true);
    }
    brick_void();
    ac_pocket();
    finger_notch();
    cable_slots_cut();
    cable_slot_labels();
    // lid seat bore
    translate([outer_l() / 2, outer_w() / 2, base_z() - lip_overlap])
      extruded_rounded(outer_l() - 2 * wall + 2 * lip_clear,
                       outer_w() - 2 * wall + 2 * lip_clear,
                       lip_depth + 0.5,
                       brick_r);
  }
}

module base_touch_fillet() {
  minkowski() {
    base_body();
    translate([0, 0, touch_fillet])
      cylinder(r = touch_fillet, h = 0.01);
  }
}

module cord_wrap() {
  cx = outer_l() / 2;
  cy = outer_w() / 2;
  z0 = lid_thickness;
  for (dx = [-1, 1]) {
    translate([cx + dx * wrap_gap / 2, cy, z0])
      cylinder(d = wrap_post_d, h = wrap_post_h);
  }
  translate([cx, cy + wrap_end_bar_l / 2, z0])
    rotate([0, 0, 90])
      cylinder(d = wrap_post_d * 0.85, h = outer_w() * 0.35, center = true);
}

module lid_body() {
  union() {
    translate([outer_l() / 2, outer_w() / 2, 0])
      extruded_rounded(outer_l(), outer_w(), lid_thickness, brick_r + wall);
    // friction skirt
    difference() {
      translate([outer_l() / 2, outer_w() / 2, -lip_depth])
        extruded_rounded(outer_l() - 2 * wall - 2 * lip_clear,
                         outer_w() - 2 * wall - 2 * lip_clear,
                         lip_depth,
                         brick_r - 0.5);
      translate([outer_l() / 2, outer_w() / 2, -lip_depth - 0.5])
        extruded_rounded(outer_l() - 2 * wall - 2 * lip_clear - 1.2,
                         outer_w() - 2 * wall - 2 * lip_clear - 1.2,
                         lip_depth + 1,
                         brick_r - 1);
    }
    cord_wrap();
  }
}

module lid_touch_fillet() {
  minkowski() {
    lid_body();
    translate([0, 0, touch_fillet])
      cylinder(r = touch_fillet, h = 0.01);
  }
}

// Ghost markers for USB verification (1×6 row on USB end face)
module usb_port_markers() {
  y0 = wall + nest_clear_xy + usb_side_margin;
  px = wall + ac_pocket_depth + nest_clear_xy + brick_l + 1;
  %for (i = [0 : usb_port_count - 1]) {
    py = y0 + i * usb_pitch;
    translate([px, py, floor + usb_z_center])
      cube([3, usb_opening_w, usb_opening_h], center = true);
  }
}

if (part == "base" || part == "both") {
  base_touch_fillet();
  if (part == "both") translate([0, outer_w() + 15, 0]) lid_touch_fillet();
} else if (part == "lid") {
  lid_touch_fillet();
}

// usb_port_markers();
