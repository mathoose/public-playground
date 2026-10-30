import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { APP_VERSION_TAG, DEFAULT_PARAMS } from "./geometry.js";
import { buildCoasterStl, stlTriangleCount } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const { stl, volume, d } = await buildCoasterStl(DEFAULT_PARAMS);
const out = join(here, `coaster-base-${APP_VERSION_TAG}.stl`);
writeFileSync(out, Buffer.from(stl));
console.log(
  `wrote ${out}  ${d.outerSize.toFixed(0)}×${d.totalZ.toFixed(1)} mm  arms ${d.p.armHeight}×${d.p.armWidth}  ${stlTriangleCount(stl)} tris  ~${((volume / 1000) * 1.24).toFixed(1)} g`,
);
