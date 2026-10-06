#!/usr/bin/env node
// Writes the committed default STLs from the live designer's CAD (stl.js).
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_PARAMS } from "./geometry.js";
import { buildPartStl, stlTriangleCount } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const files = {
  base: "photive-snap-box-base.stl",
  lid: "photive-snap-box-lid.stl",
  spacer: "photive-snap-box-usb-spacer.stl",
};
for (const [part, file] of Object.entries(files)) {
  const { stl, volume } = await buildPartStl(DEFAULT_PARAMS, part);
  writeFileSync(join(here, file), Buffer.from(stl));
  console.log(`wrote ${file}  ${stlTriangleCount(stl)} tris  ~${((volume / 1000) * 1.27).toFixed(1)} g PETG`);
}
