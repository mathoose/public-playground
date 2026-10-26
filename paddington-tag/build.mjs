#!/usr/bin/env node
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { existsSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const localPkg = join(here, "package.json");
const require = createRequire(localPkg);
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
