import { writeFileSync } from "node:fs";
import { APP_VERSION_TAG, DEFAULT_PARAMS } from "./geometry.js";
import { buildPartStl, stlTriangleCount } from "./stl.js";

for (const part of ["cradle", "grip"]) {
  const { stl, volume } = await buildPartStl(DEFAULT_PARAMS, part);
  const name = `henson-${part === "grip" ? "handle-grip" : "head-cradle"}-${APP_VERSION_TAG}.stl`;
  writeFileSync(new URL(name, import.meta.url), Buffer.from(stl));
  console.log(`${name}: ${stlTriangleCount(stl)} tris, ${(volume / 1000 * 1.27).toFixed(1)} g PETG`);
}
