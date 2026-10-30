#!/usr/bin/env node
/**
 * Encrypt private files into ./vault/ with the PIN from $LIBRARY_PIN.
 *
 *   LIBRARY_PIN=… node scripts/seal-vault.mjs /path/outside/repo/vault-plain
 *
 * The plaintext folder holds the files plus manifest-plain.json:
 *   [{ "id", "name", "kind": "mesh"|"stl"|"3mf", "label" }, …]
 * Keep that folder OUTSIDE the repo. Only ciphertext lands in ./vault/.
 * The PIN is never printed.
 */
import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { randomBytes } from "node:crypto";
import { KDF_ITERATIONS, deriveKey, sealBytes, sealManifest } from "../vault.js";

const here = dirname(fileURLToPath(import.meta.url));
const vaultDir = join(here, "..", "vault");
const plainDir = resolve(process.argv[2] || "");
const repoRoot = resolve(here, "..", "..");
if (!process.argv[2]) throw new Error("usage: seal-vault.mjs <plaintext dir outside the repo>");
if (plainDir.startsWith(repoRoot)) throw new Error("plaintext folder must live outside the repo");
const pin = process.env.LIBRARY_PIN;
if (!pin) throw new Error("set LIBRARY_PIN");

const items = JSON.parse(readFileSync(join(plainDir, "manifest-plain.json"), "utf8"));
const salt = new Uint8Array(randomBytes(16));
const key = await deriveKey(pin, salt, KDF_ITERATIONS);

mkdirSync(vaultDir, { recursive: true });
for (const f of readdirSync(vaultDir)) rmSync(join(vaultDir, f));

const manifest = { v: 1, sealed: new Date().toISOString().slice(0, 10), items: [] };
let total = 0;
for (const it of items) {
  const plain = readFileSync(join(plainDir, it.name));
  const file = randomBytes(6).toString("hex") + ".bin";
  const blob = await sealBytes(key, plain, file);
  writeFileSync(join(vaultDir, file), blob);
  total += blob.length;
  manifest.items.push({ ...it, file, bytes: plain.length });
  console.log(`sealed ${it.id.padEnd(20)} ${(plain.length / 1e6).toFixed(2)} MB -> ${(blob.length / 1e6).toFixed(2)} MB`);
}
writeFileSync(join(vaultDir, "index.json"), JSON.stringify(await sealManifest(key, salt, KDF_ITERATIONS, manifest)) + "\n");
console.log(`vault: ${manifest.items.length} items, ${(total / 1e6).toFixed(2)} MB ciphertext, PBKDF2-SHA256 × ${KDF_ITERATIONS}`);
