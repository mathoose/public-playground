#!/usr/bin/env node
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import esbuild from "esbuild";

const here = dirname(fileURLToPath(import.meta.url));
const threeRoot = join(here, "node_modules/three");

await esbuild.build({
  absWorkingDir: here,
  entryPoints: ["app.js"],
  bundle: true,
  format: "iife",
  minify: true,
  sourcemap: false,
  outfile: "app.bundle.js",
  alias: { three: threeRoot, "three/addons": join(threeRoot, "examples/jsm") },
  logLevel: "info",
});
console.log("wrote app.bundle.js");
