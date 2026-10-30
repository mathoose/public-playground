import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { BORDER_X, BORDER_Z, DEFAULT_PARAMS, DEPTH, derive, mapVertex } from "./geometry.js";

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

const d0 = derive(DEFAULT_PARAMS);
assert(Math.abs(d0.p.width - 78.174141) < 1e-4, "default width");
assert(Math.abs(d0.p.height - 100) < 1e-6, "default height");
assert(Math.abs(d0.borderX - BORDER_X) < 1e-6, "default moulding width");
assert(Math.abs(d0.depth - DEPTH) < 1e-6, "default depth");

function check(x, y, z, params, expect, label) {
  const got = mapVertex(x, y, z, params);
  for (let i = 0; i < 3; i++) {
    if (Math.abs(got[i] - expect[i]) > 0.02) {
      throw new Error(`${label} [${got}] != [${expect}]`);
    }
  }
}

// Default thickness and size leave the sculpture where it was, back shifted onto the bed.
check(39.0870705, -3.0112505, 50, DEFAULT_PARAMS, [39.0870705, 50, 0], "outer corner");
check(12, 0, 10, DEFAULT_PARAMS, [12, 10, 3.0112505], "crest stays");
check(-30, 1, 0, DEFAULT_PARAMS, [-30, 0, 4.0112505], "side rail");

const wide = { ...DEFAULT_PARAMS, width: 160 };
const dw = derive(wide);
assert(Math.abs(dw.borderX - BORDER_X) < 0.02, `wider frame kept the moulding, got ${dw.borderX}`);
assert(dw.openingW > d0.openingW + 70, "opening grew with width");
check(39.0870705, 0, 0, wide, [80, 0, 3.0112505], "outer edge follows the new width");
check(12, 0, 0, wide, [12, 0, 3.0112505], "center ornament does not stretch with width");
const lip = mapVertex(22.86, 0, 0, wide);
assert(Math.abs(80 - lip[0] - BORDER_X) < 0.05, `inner lip stays one border in, delta ${80 - lip[0]}`);

const tall = { ...DEFAULT_PARAMS, height: 180 };
assert(Math.abs(derive(tall).borderZ - BORDER_Z) < 0.02, "taller frame kept the moulding");
check(0, 0, 50, tall, [0, 90, 3.0112505], "top edge follows the new height");
check(0, 0, 10, tall, [0, 10, 3.0112505], "side ornament stays");

const thick = { ...DEFAULT_PARAMS, thickness: 120 };
const dt = derive(thick);
assert(Math.abs(dt.borderX - BORDER_X * 1.2) < 0.05, "thickness widens the moulding");
assert(Math.abs(dt.depth - DEPTH * 1.2) < 0.05, "thickness deepens the frame");
assert(Math.abs(dt.p.width - DEFAULT_PARAMS.width) < 0.1, "a modest thickness keeps the outer width");
const heavy = derive({ ...DEFAULT_PARAMS, thickness: 160 });
assert(heavy.p.width > DEFAULT_PARAMS.width, "a very thick moulding opens the outer width so the sides still fit");

const gz = readFileSync(new URL("./frame.bin.gz", import.meta.url));
const buf = gunzipSync(gz);
const view = new DataView(buf.buffer, buf.byteOffset, buf.byteLength);
assert(view.getUint32(0, true) === 0x31465242, "mesh magic");
const vertCount = view.getUint32(4, true);
assert(vertCount > 100000, "mesh has the sculpture");
let maxErr = 0;
const posAt = (i) => view.getFloat32(12 + i * 4, true);
for (let v = 0; v < vertCount; v += 80) {
  const x = posAt(v * 3);
  const y = posAt(v * 3 + 1);
  const z = posAt(v * 3 + 2);
  const [mx, my, mz] = mapVertex(x, y, z, DEFAULT_PARAMS);
  maxErr = Math.max(maxErr, Math.abs(mx - x), Math.abs(my - z), Math.abs(mz - (y - (-3.0112505))));
}
assert(maxErr < 0.02, `default map drifted ${maxErr}`);
console.log("ok", "verts", vertCount, "border", BORDER_X.toFixed(2), "depth", DEPTH.toFixed(2));
