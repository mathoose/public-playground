import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { APP_VERSION_TAG } from "./geometry.js";
import { buildLockStl, stlTriangleCount } from "./stl.js";
import { DEFAULT_PARAMS } from "./geometry.js";

const here = dirname(fileURLToPath(import.meta.url));
const { stl, volume, d } = await buildLockStl(DEFAULT_PARAMS);
const out = join(here, `costco-bin-lock-${APP_VERSION_TAG}.stl`);
writeFileSync(out, Buffer.from(stl));
console.log(
  `wrote ${out}  hook ${d.hookY.toFixed(1)}×${d.hookX.toFixed(1)}  engagement ${d.p.engagement.toFixed(1)}  ${stlTriangleCount(stl)} tris  ~${((volume / 1000) * 1.24).toFixed(1)} g`
);
