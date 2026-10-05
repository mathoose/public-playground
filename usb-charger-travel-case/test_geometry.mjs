import assert from "node:assert/strict";
import {
  clampParams,
  DEFAULT_PARAMS,
  dims,
  equalUsbSideMargin,
  slotCenters,
  usbMarkerCenters,
  usbPortCentersY,
  USB_PORT_COUNT,
} from "./geometry.js";

const d = dims(DEFAULT_PARAMS);
assert.equal(d.brick_l, 100);
assert.equal(d.brick_w, 70);
assert.equal(d.brick_h, 26);
assert.equal(d.usb_port_count, USB_PORT_COUNT);
assert.equal(USB_PORT_COUNT, 6);

const ys = usbPortCentersY(d);
assert.equal(ys.length, 6);
// Equal pitch along 70 mm face with side margin 10 → centers at 10,20,…,60 relative to brick side
assert.ok(Math.abs(ys[1] - ys[0] - d.usb_pitch) < 1e-9);
assert.ok(Math.abs(equalUsbSideMargin(70, 6, 10) - 10) < 1e-9);

const markers = usbMarkerCenters(d);
assert.equal(markers.length, 6);
assert.ok(markers[0].h >= 10); // tall USB-A
assert.ok(markers[0].w < markers[0].h); // narrow along row

const slots = slotCenters(d);
assert.equal(slots.length, 6);
// Default: slots align to USB Y centers
for (let i = 0; i < 6; i++) {
  assert.ok(Math.abs(slots[i].cy - ys[i]) < 1e-9, `slot ${i} aligned to USB`);
}

const unaligned = slotCenters(dims({ ...DEFAULT_PARAMS, align_slots_to_usb: false }));
assert.equal(unaligned.length, 6);

const tight = clampParams({ nest_clear_xy: -1, lip_clear: 9, part: "nope", usb_port_count: 99 });
assert.equal(tight.nest_clear_xy, 0);
assert.equal(tight.lip_clear, 1.2);
assert.equal(tight.part, "both");
assert.equal(tight.usb_port_count, 6);

console.log("geometry ok", {
  outer: `${d.outer_l.toFixed(1)}×${d.outer_w.toFixed(1)}×${d.base_z.toFixed(1)}`,
  usb: `1×${d.usb_port_count} pitch ${d.usb_pitch}`,
  slots: slots.length,
});
