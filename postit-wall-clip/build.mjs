#!/usr/bin/env node
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(here, "../bubble-frame/package.json"));
const esbuild = require("esbuild");

await esbuild.build({
  absWorkingDir: here,
  entryPoints: ["viewer.js"],
  bundle: true,
  format: "iife",
  minify: true,
  outfile: "clip.bundle.js",
  alias: {
    three: join(here, "../bubble-frame/node_modules/three"),
    "three/addons": join(here, "../bubble-frame/node_modules/three/examples/jsm"),
  },
  logLevel: "info",
});

console.log("wrote clip.bundle.js");
