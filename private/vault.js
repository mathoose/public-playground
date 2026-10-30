/**
 * PIN vault: PBKDF2-SHA256 -> AES-256-GCM, gzip inside the ciphertext.
 * Works in browsers (WebCrypto) and Node 20+ (globalThis.crypto).
 *
 * vault/index.json = { v, kdf, hash, iter, salt, iv, ct }   (manifest, encrypted)
 * vault/<file>.bin = iv(12 bytes) || AES-GCM ciphertext     (one per item, AAD = file name)
 */
import { gunzipSync, gzipSync } from "fflate";

export const KDF_ITERATIONS = 600000;
const enc = new TextEncoder();
const dec = new TextDecoder();

export function b64(bytes) {
  let s = "";
  const u = new Uint8Array(bytes);
  for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode(...u.subarray(i, i + 0x8000));
  return btoa(s);
}
export function unb64(str) {
  const s = atob(str);
  const u = new Uint8Array(s.length);
  for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
  return u;
}

export async function deriveKey(pin, salt, iterations = KDF_ITERATIONS) {
  const base = await crypto.subtle.importKey("raw", enc.encode(String(pin)), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function sealBytes(key, plain, aad) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv, additionalData: enc.encode(aad) },
    key,
    gzipSync(new Uint8Array(plain), { level: 9, mtime: 0 })
  );
  const out = new Uint8Array(12 + ct.byteLength);
  out.set(iv, 0);
  out.set(new Uint8Array(ct), 12);
  return out;
}

export async function openBytes(key, blob, aad) {
  const u = new Uint8Array(blob);
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: u.subarray(0, 12), additionalData: enc.encode(aad) },
    key,
    u.subarray(12)
  );
  return gunzipSync(new Uint8Array(plain));
}

export async function sealManifest(key, salt, iterations, manifest) {
  const blob = await sealBytes(key, enc.encode(JSON.stringify(manifest)), "index");
  return {
    v: 1,
    kdf: "PBKDF2",
    hash: "SHA-256",
    iter: iterations,
    salt: b64(salt),
    iv: b64(blob.subarray(0, 12)),
    ct: b64(blob.subarray(12)),
  };
}

export class WrongPinError extends Error {
  constructor() {
    super("That PIN didn't unlock the vault.");
    this.name = "WrongPinError";
  }
}

/** Returns { key, manifest } or throws WrongPinError. */
export async function unlockIndex(index, pin) {
  const key = await deriveKey(pin, unb64(index.salt), index.iter);
  const blob = new Uint8Array(12 + unb64(index.ct).length);
  blob.set(unb64(index.iv), 0);
  blob.set(unb64(index.ct), 12);
  try {
    const manifest = JSON.parse(dec.decode(await openBytes(key, blob, "index")));
    return { key, manifest };
  } catch {
    throw new WrongPinError();
  }
}

/**
 * Where the vault lives. On htmlpreview the page URL carries the GitHub blob URL, so
 * fetch from raw.githubusercontent.com on the same branch; elsewhere use ./vault/.
 */
export function vaultBase(loc = globalThis.location) {
  if (loc && /htmlpreview\.github\.io$/.test(loc.hostname)) {
    const gh = decodeURIComponent((loc.search || "").replace(/^\?/, ""));
    const m = /github\.com\/([^/]+)\/([^/]+)\/blob\/(.+)\/private\/(?:index\.html)?$/.exec(gh.split("#")[0]);
    if (m) return `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}/private/vault/`;
  }
  return new URL("vault/", loc ? loc.href : "http://localhost/").href;
}
