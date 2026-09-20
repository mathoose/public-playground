#!/usr/bin/env node
/** Regenerate default 4×6 STLs into this folder. Needs: npm install manifold-3d */
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultParams, sizeLabel } from "./geometry.js";
import { buildBackPlateStl, buildFrameMesh, buildStandStl } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const params = defaultParams();
const label = sizeLabel(params.photoW, params.photoH, params.units);

const frame = await buildFrameMesh(params);
writeFileSync(join(here, `striped-frame-${label}-frame.stl`), Buffer.from(frame.stl));
console.log("wrote frame", frame.stl.byteLength);

const plate = await buildBackPlateStl(params);
writeFileSync(join(here, `striped-frame-${label}-back.stl`), Buffer.from(plate.stl));
console.log("wrote plate", plate.stl.byteLength);

const stand = await buildStandStl(params);
writeFileSync(join(here, `striped-frame-${label}-stand.stl`), Buffer.from(stand.stl));
console.log("wrote stand", stand.stl.byteLength);
