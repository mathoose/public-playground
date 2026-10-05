import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_PARAMS } from "./geometry.js";
import { buildCaseStl, stlTriangleCount } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const { stl, volume, d } = await buildCaseStl(DEFAULT_PARAMS);
const out = join(here, "power-bank-wrap-v2.stl");
writeFileSync(out, Buffer.from(stl));
console.log(
  `wrote ${out}  ${d.totalL.toFixed(1)}×${d.nestOuterW.toFixed(1)}×${d.outerH.toFixed(1)} mm  ${stlTriangleCount(stl)} tris  ~${((volume / 1000) * 1.24).toFixed(1)} g`
);
