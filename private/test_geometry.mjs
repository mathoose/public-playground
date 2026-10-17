/**
 * npm test — geometry + vault checks. Never prints the PIN.
 * With $LIBRARY_PIN set it also proves the committed vault opens with it and not with a wrong one.
 */
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { HOLDER, DEFAULT_PARAMS, mergeParams, stretchPositions, derive, warnings, fitDepth, applyPreset } from "./holder-geometry.js";
import { deriveKey, sealBytes, openBytes, sealManifest, unlockIndex, WrongPinError, vaultBase } from "./vault.js";
import { decodeMsh, stlFromIndexed, manifoldCheck } from "./mesh.js";

const here = dirname(fileURLToPath(import.meta.url));
let n = 0;
const ok = (msg) => console.log(`ok ${++n} - ${msg}`);

// stretch
{
  const src = new Float32Array([-30, -5, 0, 0, 5, 1, 30, -5, 2, 10, 0.5, 3]);
  const out = stretchPositions(src, new Float32Array(src.length), mergeParams({ depth: 27.2, width: 95 }));
  assert.deepEqual(Array.from(out), [-35, -15, 0, 0, 5, 1, 35, -15, 2, 10, -9.5, 3]);
  ok("stretch moves front (y < CUT_Y) by Δdepth and sides (|x| > CUT_X) by Δwidth/2");
  const id = stretchPositions(src, new Float32Array(src.length), mergeParams({ depth: HOLDER.ORIG_DEPTH, width: HOLDER.ORIG_WIDTH }));
  assert.deepEqual(Array.from(id), Array.from(src));
  ok("original depth/width is the identity");
}
{
  const p = mergeParams(DEFAULT_PARAMS);
  assert.equal(p.depth, 27);
  assert.ok(derive(p).slack >= 2.5, "two 12 mm phones fit with slack");
  assert.equal(warnings(p).length, 0);
  assert.equal(fitDepth(p), 27);
  ok("defaults fit two 12 mm phones without warnings");
}
// STL writer + manifold on a cube
{
  const pos = new Float32Array([0,0,0, 1,0,0, 1,1,0, 0,1,0, 0,0,1, 1,0,1, 1,1,1, 0,1,1]);
  const idx = new Uint32Array([0,2,1,0,3,2, 4,5,6,4,6,7, 0,1,5,0,5,4, 1,2,6,1,6,5, 2,3,7,2,7,6, 3,0,4,3,4,7]);
  const stl = stlFromIndexed(pos, idx);
  assert.equal(stl.byteLength, 84 + 12 * 50);
  const res = await manifoldCheck(pos, idx);
  assert.ok(res.ok, res.status);
  assert.ok(Math.abs(res.volume - 1) < 1e-6);
  ok(`binary STL writer + manifold-3d check (status ${res.status})`);
}
// crypto round trip
{
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey("correct horse", salt, 1000);
  const blob = await sealBytes(key, new TextEncoder().encode("hello vault"), "a.bin");
  assert.equal(new TextDecoder().decode(await openBytes(key, blob, "a.bin")), "hello vault");
  await assert.rejects(openBytes(key, blob, "b.bin"));
  const index = await sealManifest(key, salt, 1000, { items: [] });
  assert.deepEqual((await unlockIndex(index, "correct horse")).manifest, { items: [] });
  await assert.rejects(unlockIndex(index, "wrong"), WrongPinError);
  ok("AES-GCM/PBKDF2 round trip, AAD binding, wrong PIN -> WrongPinError");
}
// vault base on htmlpreview
{
  const loc = new URL("https://htmlpreview.github.io/?https://github.com/mathoose/public-playground/blob/cursor/private-models-a7fd/private/index.html");
  assert.equal(vaultBase(loc), "https://raw.githubusercontent.com/mathoose/public-playground/cursor/private-models-a7fd/private/vault/");
  assert.equal(vaultBase(new URL("http://127.0.0.1:8080/private/")), "http://127.0.0.1:8080/private/vault/");
  ok("vault URL resolves for htmlpreview and plain hosting");
}
// nothing plaintext in this folder
{
  const bad = [];
  const walk = (d) => {
    for (const f of readdirSync(d)) {
      if (f === "node_modules") continue;
      const p = join(d, f);
      if (statSync(p).isDirectory()) { walk(p); continue; }
      if (/\.(stl|3mf|msh|obj|step)$/i.test(f)) bad.push(p);
      const head = readFileSync(p).subarray(0, 84);
      if (head.subarray(0, 4).toString() === "MSH1" || head.subarray(0, 2).toString() === "PK" || /^solid /.test(head.toString("latin1"))) bad.push(p);
    }
  };
  walk(here);
  assert.deepEqual(bad, []);
  ok("no plaintext STL / 3MF / mesh files in private/");
}
// the committed vault
const pin = process.env.LIBRARY_PIN;
if (pin) {
  const index = JSON.parse(readFileSync(join(here, "vault/index.json"), "utf8"));
  assert.ok(index.iter >= 600000);
  const { key, manifest } = await unlockIndex(index, pin);
  await assert.rejects(unlockIndex(index, pin + "0"), WrongPinError);
  for (const it of manifest.items) {
    const bytes = await openBytes(key, readFileSync(join(here, "vault", it.file)), it.file);
    assert.equal(bytes.length, it.bytes, it.id);
    if (it.kind === "mesh") {
      const m = decodeMsh(bytes);
      for (const [d, w] of [[HOLDER.ORIG_DEPTH, 85], [27, 85], [40, 100]]) {
        const pos = stretchPositions(m.positions, new Float32Array(m.positions.length), mergeParams({ depth: d, width: w }));
        const res = await manifoldCheck(pos, m.indices);
        assert.ok(res.ok, `${it.id} d${d} w${w}: ${res.status}`);
      }
    }
  }
  ok(`committed vault opens with $LIBRARY_PIN (${manifest.items.length} items), rejects a wrong PIN, stretched meshes are closed solids`);
} else {
  console.log("# skip vault check (LIBRARY_PIN not set)");
}
console.log(`1..${n}`);
