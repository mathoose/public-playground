import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { APP_VERSION_TAG, DEFAULT_PARAMS } from "./geometry.js";
import { boundsOf, buildTagStls, stlTriangleCount } from "./stl.js";

const here = dirname(fileURLToPath(import.meta.url));
const built = await buildTagStls(DEFAULT_PARAMS);
const { parts, d } = built;
for (const name of ["body", "letters", "ring"]) {
  const part = parts[name];
  const out = join(here, `paddington-tag-${APP_VERSION_TAG}-${name}.stl`);
  writeFileSync(out, Buffer.from(part.stl));
  const b = boundsOf(part.positions);
  console.log(
    `wrote ${out}  ${stlTriangleCount(part.stl)} tris  ~${((part.volume / 1000) * 1.24).toFixed(2)} g  z ${b.min[2].toFixed(2)}–${b.max[2].toFixed(2)}`
  );
}
const mf = join(here, `paddington-tag-${APP_VERSION_TAG}.3mf`);
writeFileSync(mf, Buffer.from(built.threemf));
console.log(`wrote ${mf}  ${(built.threemf.byteLength / 1e6).toFixed(2)} MB`);
console.log(
  `tag ${d.width.toFixed(1)}×${d.height.toFixed(1)} mm  hole ${d.p.hole.toFixed(1)}  ring outer ${d.ringOuter.toFixed(2)}`
);
