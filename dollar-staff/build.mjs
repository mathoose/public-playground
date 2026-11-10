#!/usr/bin/env node
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, "package.json"));
const esbuild = require("esbuild");
const threeRoot = join(here, "node_modules/three");

await esbuild.build({
  absWorkingDir: here,
  entryPoints: ["app.js"],
  bundle: true,
  format: "iife",
  minify: true,
  sourcemap: false,
  outfile: "app.bundle.js",
  alias: {
    three: threeRoot,
    "three/addons": join(threeRoot, "examples/jsm"),
  },
  logLevel: "info",
});

console.log("wrote app.bundle.js");
