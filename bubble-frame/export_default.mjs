#!/usr/bin/env node
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultParams, sizeLabel } from "./geometry.js";
import { buildBackPlateStl, buildFrameMesh, buildStandStl, stlTriangleCount } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const params = defaultParams();
const label = sizeLabel(params.photoW, params.photoH, params.units);

function save(name, buffer) {
  const path = join(here, name);
  writeFileSync(path, Buffer.from(buffer));
  const kb = (buffer.byteLength / 1024).toFixed(1);
  console.log(`wrote ${name}  ${stlTriangleCount(buffer)} tris  ${kb} KB`);
}

const frame = await buildFrameMesh(params);
save(`bubble-frame-${label}-frame.stl`, frame.stl);

const back = await buildBackPlateStl(params);
save(`bubble-frame-${label}-back.stl`, back.stl);

const stand = await buildStandStl(params);
save(`bubble-frame-${label}-stand.stl`, stand.stl);

console.log("ok — default 4×6 STLs exported");
