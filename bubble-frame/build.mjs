#!/usr/bin/env node
import * as esbuild from "esbuild";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));

await esbuild.build({
  absWorkingDir: here,
  entryPoints: ["app.js"],
  bundle: true,
  format: "iife",
  minify: true,
  sourcemap: false,
  outfile: "app.bundle.js",
  alias: {
    "three/addons": join(here, "node_modules/three/examples/jsm"),
  },
  logLevel: "info",
});

console.log("wrote app.bundle.js");
