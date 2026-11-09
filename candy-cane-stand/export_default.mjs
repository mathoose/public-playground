import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_PARAMS, buildStandMesh, meshToStl } from "./geometry.js";

const here = dirname(fileURLToPath(import.meta.url));
const mesh = buildStandMesh(DEFAULT_PARAMS, 120);
const stl = meshToStl(mesh);
const path = join(here, "candy-cane-stand-v1.stl");
writeFileSync(path, Buffer.from(stl));
console.log(`wrote ${path} (${stl.byteLength} bytes, ${mesh.indices.length / 3} tris)`);
