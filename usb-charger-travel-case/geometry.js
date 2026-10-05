/** Photive travel-case params + derived dimensions (mirrors photive-travel-case.scad).
 *  USB face (confirmed photo): six USB-A in ONE horizontal row on the 70×26 mm end.
 */

export const APP_VERSION = "1 · Oct 5, 2026";
export const APP_VERSION_TAG = "v1";

/** Fixed Photive port count — designer exposes readout, not a free-form count. */
export const USB_PORT_COUNT = 6;

export const DEFAULT_PARAMS = Object.freeze({
  // Brick — measured Photive
  brick_l: 100,
  brick_w: 70,
  brick_h: 26,
  brick_r: 4,
  nest_clear_xy: 0.4,
  nest_clear_z: 0.6,

  // USB face — 1×6 row on 70×26 end (from usb-face-caliper.jpg)
  usb_port_count: USB_PORT_COUNT,
  usb_pitch: 10.0, // mm center-to-center along 70 mm face
  usb_side_margin: 10.0, // mm from brick side to first/last port center (equal spacing at pitch 10)
  usb_z_center: 13.0, // mm from brick bottom to port center (tall USB-A ~centered on 26 mm)
  usb_opening_w: 5.0, // mm along row (narrow USB-A shell)
  usb_opening_h: 12.2, // mm tall (USB-A long axis vertical)
  show_usb_markers: true,
  align_slots_to_usb: true,

  // Case
  wall: 2.4,
  floor: 2.0,
  slot_count: 6,
  slot_throat: 5.2,
  slot_depth: 42,
  slot_wall_h: 14,
  slot_divider: 1.4,
  label_w: 12,
  label_d: 8,
  label_recess: 0.5,
  ac_pocket_depth: 22,
  finger_notch_w: 28,
  finger_notch_d: 8,
  touch_fillet: 1.5,

  // Lid
  lip_depth: 4.5,
  lip_clear: 0.35,
  lip_overlap: 2.0,
  lid_thickness: 2.8,

  // Cord wrap
  wrap_post_h: 11,
  wrap_post_d: 7,
  wrap_gap: 9,
  wrap_end_bar_l: 38,

  // Preview / export quality
  segments: 28,
  part: "both", // base | lid | both
});

export function mergeParams(overrides = {}) {
  return { ...DEFAULT_PARAMS, ...overrides };
}

export function clampParams(raw) {
  const p = mergeParams(raw);
  const n = (v, lo, hi) => Math.min(hi, Math.max(lo, Number(v)));
  p.brick_l = n(p.brick_l, 40, 200);
  p.brick_w = n(p.brick_w, 30, 120);
  p.brick_h = n(p.brick_h, 10, 60);
  p.brick_r = n(p.brick_r, 0.5, 20);
  p.nest_clear_xy = n(p.nest_clear_xy, 0, 2);
  p.nest_clear_z = n(p.nest_clear_z, 0, 3);
  p.usb_port_count = USB_PORT_COUNT;
  p.usb_pitch = n(p.usb_pitch, 6, 20);
  p.usb_side_margin = n(p.usb_side_margin, 2, 30);
  p.usb_z_center = n(p.usb_z_center, 4, p.brick_h - 4);
  p.usb_opening_w = n(p.usb_opening_w, 3, 10);
  p.usb_opening_h = n(p.usb_opening_h, 8, 16);
  p.wall = n(p.wall, 1.2, 5);
  p.floor = n(p.floor, 1.0, 5);
  p.slot_throat = n(p.slot_throat, 3, 10);
  p.slot_depth = n(p.slot_depth, 20, 80);
  p.slot_wall_h = n(p.slot_wall_h, 6, 30);
  p.slot_divider = n(p.slot_divider, 0.8, 4);
  p.ac_pocket_depth = n(p.ac_pocket_depth, 8, 40);
  p.finger_notch_w = n(p.finger_notch_w, 10, 50);
  p.finger_notch_d = n(p.finger_notch_d, 2, 20);
  p.touch_fillet = n(p.touch_fillet, 0, 4);
  p.lip_depth = n(p.lip_depth, 2, 10);
  p.lip_clear = n(p.lip_clear, 0.05, 1.2);
  p.lip_overlap = n(p.lip_overlap, 0.5, 5);
  p.lid_thickness = n(p.lid_thickness, 1.5, 6);
  p.wrap_post_h = n(p.wrap_post_h, 4, 25);
  p.wrap_post_d = n(p.wrap_post_d, 4, 14);
  p.wrap_gap = n(p.wrap_gap, 4, 30);
  p.wrap_end_bar_l = n(p.wrap_end_bar_l, 10, 80);
  p.segments = Math.round(n(p.segments, 12, 64));
  p.slot_count = Math.round(n(p.slot_count, 2, 8));
  p.show_usb_markers = !!p.show_usb_markers;
  p.align_slots_to_usb = !!p.align_slots_to_usb;
  if (p.part !== "base" && p.part !== "lid" && p.part !== "both") p.part = "both";
  return p;
}

/** Equal side margin for a centered 1×N row on brick_w. */
export function equalUsbSideMargin(brickW, portCount, pitch) {
  return (brickW - (portCount - 1) * pitch) / 2;
}

export function dims(p) {
  const c = clampParams(p);
  const inner_l = c.brick_l + 2 * c.nest_clear_xy;
  const inner_w = c.brick_w + 2 * c.nest_clear_xy;
  const outer_l = inner_l + c.slot_depth + c.ac_pocket_depth + 2 * c.wall;
  const outer_w = inner_w + 2 * c.wall;
  const cavity_z = c.brick_h + c.nest_clear_z;
  const base_z = c.floor + cavity_z;
  const outer_r = Math.min(c.brick_r + c.wall + c.touch_fillet * 0.35, outer_w / 2 - 0.2, outer_l / 2 - 0.2);
  return {
    ...c,
    inner_l,
    inner_w,
    outer_l,
    outer_w,
    cavity_z,
    base_z,
    outer_r,
    nest_cx: c.wall + c.ac_pocket_depth + inner_l / 2,
    nest_cy: c.wall + inner_w / 2,
    // USB end of nest (ports face +X toward cable slots)
    usb_face_x: c.wall + c.ac_pocket_depth + c.nest_clear_xy + c.brick_l,
  };
}

/** Y centers of the 1×6 USB-A row in case coordinates (along brick_w). */
export function usbPortCentersY(d) {
  const y0 = d.wall + d.nest_clear_xy + d.usb_side_margin;
  const out = [];
  for (let i = 0; i < d.usb_port_count; i++) {
    out.push(y0 + i * d.usb_pitch);
  }
  return out;
}

export function slotCenters(d) {
  const x0 = d.wall + d.ac_pocket_depth + d.inner_l;
  const out = [];
  const usbYs = usbPortCentersY(d);
  const useUsb =
    d.align_slots_to_usb && d.slot_count === d.usb_port_count && usbYs.length === d.slot_count;

  if (useUsb) {
    for (let i = 0; i < d.slot_count; i++) {
      out.push({
        cx: x0 + d.slot_depth / 2,
        cy: usbYs[i],
        labelX: x0 + d.slot_depth - d.label_w / 2 - 3,
      });
    }
    return out;
  }

  const total = d.slot_count * d.slot_throat + (d.slot_count - 1) * d.slot_divider;
  const y0 = d.wall + (d.inner_w - total) / 2 + d.slot_throat / 2;
  for (let i = 0; i < d.slot_count; i++) {
    out.push({
      cx: x0 + d.slot_depth / 2,
      cy: y0 + i * (d.slot_throat + d.slot_divider),
      labelX: x0 + d.slot_depth - d.label_w / 2 - 3,
    });
  }
  return out;
}

/** Ghost / cutout markers for USB-A openings on the USB end face. */
export function usbMarkerCenters(d) {
  const ys = usbPortCentersY(d);
  const z = d.floor + d.usb_z_center;
  // Slightly proud of the USB end so they read in the viewer
  const x = d.usb_face_x + 1;
  return ys.map((y) => ({
    x,
    y,
    z,
    w: d.usb_opening_w,
    h: d.usb_opening_h,
    depth: 3,
  }));
}

export function plaGrams(volumeMm3) {
  return (volumeMm3 / 1000) * 1.24;
}

export function sizeLabel(d) {
  return `${d.outer_l.toFixed(0)} × ${d.outer_w.toFixed(0)} × ${d.base_z.toFixed(0)} mm base`;
}
