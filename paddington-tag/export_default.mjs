import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_PARAMS } from "./geometry.js";
import { boundsOf, buildTagStl, stlTriangleCount } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const { stl, volume, d, genus, positions } = await buildTagStl(DEFAULT_PARAMS);
const out = join(here, "paddington-tag-v1.stl");
writeFileSync(out, Buffer.from(stl));
const b = boundsOf(positions);
console.log(
  `wrote ${out}  ${d.width.toFixed(1)}×${d.height.toFixed(1)}×${d.totalH.toFixed(2)} mm  hole ${d.p.hole.toFixed(1)}  genus ${genus}  ${stlTriangleCount(stl)} tris  ~${((volume / 1000) * 1.24).toFixed(1)} g`
);
console.log("bbox", b.min.map((n) => n.toFixed(2)), b.max.map((n) => n.toFixed(2)));
