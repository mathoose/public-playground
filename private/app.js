import { STLLoader } from "three/addons/loaders/STLLoader.js";
import {
  APP_NAME, APP_VERSION, APP_VERSION_TAG, BASES, DEFAULT_PARAMS, HOLDER, PRESETS, SLIDERS,
  applyPreset, derive, fitDepth, formatMm, mergeParams, stretchPositions, warnings,
} from "./holder-geometry.js";
import { Preview } from "./preview.js";
import { decodeMsh, stlFromIndexed, manifoldCheck, downloadArrayBuffer, bounds } from "./mesh.js";
import { unlockIndex, openBytes, vaultBase, WrongPinError } from "./vault.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import { wireHeaderSaves } from "../shared/wire-designer.js";
import { installModelPick } from "../shared/model-pick.js";
import * as THREE from "three";
import { inspectHolder, measureHolder } from "./pick-map.js";

const $ = (id) => document.getElementById(id);
const SLIDER_KEYS = SLIDERS.map((s) => s.key);
const state = (window.__privateState = { unlocked: false, holderReady: false, pumpkinReady: false, error: "" });

const BASE = vaultBase();
let vault = null; // { key, manifest }
const itemCache = new Map();
const meshCache = new Map();

async function fetchBytes(url) {
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`Couldn't load ${url.split("/").pop()} (${res.status})`);
  return new Uint8Array(await res.arrayBuffer());
}

function itemMeta(id) {
  const it = vault.manifest.items.find((x) => x.id === id);
  if (!it) throw new Error(`missing item ${id}`);
  return it;
}

async function getItem(id) {
  if (!itemCache.has(id)) {
    const it = itemMeta(id);
    itemCache.set(id, fetchBytes(BASE + it.file).then((blob) => openBytes(vault.key, blob, it.file)));
  }
  return itemCache.get(id);
}

async function downloadItem(id, btn) {
  const it = itemMeta(id);
  const old = btn?.textContent;
  if (btn) btn.textContent = "Decrypting…";
  try {
    const bytes = await getItem(id);
    downloadArrayBuffer(it.name, bytes, it.kind === "3mf" ? "model/3mf" : "model/stl");
  } catch (err) {
    console.error(err);
    alert(String(err.message || err));
  } finally {
    if (btn) btn.textContent = old;
  }
}

/* ---------------- PIN gate ---------------- */

let indexPromise = null;
function loadIndex() {
  if (!indexPromise) {
    indexPromise = fetch(BASE + "index.json", { cache: "no-cache" }).then((r) => {
      if (!r.ok) throw new Error(`Vault not found (${r.status})`);
      return r.json();
    });
    indexPromise.catch(() => (indexPromise = null));
  }
  return indexPromise;
}

function gateMsg(text, kind = "") {
  const el = $("gateMsg");
  el.textContent = text;
  el.dataset.kind = kind;
}

async function onUnlock(ev) {
  ev.preventDefault();
  const pinEl = $("pin");
  const pin = pinEl.value.trim();
  if (!pin) return gateMsg("Type your PIN first.", "err");
  const btn = $("unlockBtn");
  btn.disabled = true;
  gateMsg("Unlocking…");
  try {
    const index = await loadIndex();
    vault = await unlockIndex(index, pin);
    pinEl.value = "";
    state.unlocked = true;
    document.body.classList.add("unlocked");
    startApp();
  } catch (err) {
    if (err instanceof WrongPinError) {
      gateMsg("That PIN didn't work. Try again.", "err");
      pinEl.value = "";
      pinEl.focus();
    } else {
      console.error(err);
      gateMsg(String(err.message || err), "err");
    }
    state.error = String(err.message || err);
  } finally {
    btn.disabled = false;
  }
}

/* ---------------- shared viewer + tabs ---------------- */

let preview;
let tab = "holder";

function setTab(name) {
  tab = name;
  document.querySelectorAll("[data-tab]").forEach((b) => b.classList.toggle("active", b.dataset.tab === name));
  $("holderPanel").hidden = name !== "holder";
  $("pumpkinPanel").hidden = name !== "pumpkin";
  document.querySelectorAll("[data-holder-only]").forEach((el) => (el.hidden = name !== "holder"));
  $("title").textContent = name === "holder" ? "2-phone wall holder" : "Pumpkin fidget";
  pick?.clear();
  pick?.sync();
  if (name === "holder") showHolder();
  else showPumpkin();
}

/* ---------------- phone holder ---------------- */

let params = mergeParams();
let savesUi;
let holderSrc = null; // { positions, indices, base }
let srcFlat = null;
let checkTimer = 0;
let checkGen = 0;
let lastCheck = null;

const UNITS = Object.fromEntries(SLIDERS.map((s) => [s.key, s.unit]));
function fmtValue(key, n) {
  if (key === "phones") return String(Math.round(n));
  const unit = UNITS[key] ? ` ${UNITS[key]}` : "";
  return `${Number(n).toFixed(1)}${unit}`;
}

function writeParams(p) {
  params = mergeParams(p);
  for (const spec of SLIDERS) {
    const el = $(spec.key);
    const out = $(`${spec.key}-out`);
    if (el) {
      el.min = String(spec.min);
      el.max = String(spec.max);
      el.step = String(spec.step);
      el.value = String(params[spec.key]);
    }
    if (out) out.textContent = fmtValue(spec.key, params[spec.key]);
  }
  document.querySelectorAll("[data-base]").forEach((b) => b.classList.toggle("active", b.dataset.base === params.base));
  document.querySelectorAll("[data-preset]").forEach((b) => {
    const pr = PRESETS[b.dataset.preset];
    b.classList.toggle("active", ["depth", "width", "phoneT", "phones", "phoneW"].every((k) => params[k] === pr[k]));
  });
  savesUi?.renderList();
}

function setStatus(text, kind = "") {
  const el = $("status");
  el.textContent = text;
  el.dataset.kind = kind;
}

async function loadHolderBase(base) {
  if (!meshCache.has(base)) {
    meshCache.set(base, getItem(BASES[base].item).then(decodeMsh));
  }
  return meshCache.get(base);
}

let showingBase = null;
async function showHolder() {
  setStatus("Decrypting model…");
  try {
    const src = await loadHolderBase(params.base);
    if (tab !== "holder") return;
    holderSrc = src;
    if (showingBase !== params.base || preview.model.material !== preview.mat) {
      preview.setScale(1);
      preview.setIndexed(src.positions, src.indices);
      srcFlat = preview.flatPositions().array.slice();
      showingBase = params.base;
    }
    applyStretch();
    if (!preview.fitted) preview.fit();
    state.holderReady = true;
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function applyStretch() {
  if (!holderSrc || tab !== "holder") return;
  const attr = preview.flatPositions();
  stretchPositions(srcFlat, attr.array, params);
  preview.touch();
  const phonesOn = pick ? pick.visibility().phones !== false : $("showPhones").classList.contains("active");
  $("showPhones").classList.toggle("active", phonesOn);
  preview.setPhones(params, derive(params), phonesOn);
  if (pick) preview.model.visible = pick.visibility().holder !== false;
  renderReadout();
  scheduleCheck();
}

function stretchedIndexed() {
  const pos = new Float32Array(holderSrc.positions.length);
  stretchPositions(holderSrc.positions, pos, params);
  return pos;
}

function scheduleCheck() {
  clearTimeout(checkTimer);
  setStatus("Updating…");
  checkTimer = setTimeout(async () => {
    const gen = ++checkGen;
    try {
      const res = await manifoldCheck(stretchedIndexed(), holderSrc.indices);
      if (gen !== checkGen) return;
      lastCheck = res;
      renderReadout();
      setStatus(res.ok ? "Live · closed solid ✓" : `Mesh check: ${res.status}`, res.ok ? "" : "err");
    } catch (err) {
      console.error(err);
      setStatus("Live (solid check unavailable offline)");
    }
  }, 250);
}

function renderReadout() {
  const d = derive(params);
  $("warnings").innerHTML = warnings(params).map((w) => `<p class="warn">${w}</p>`).join("");
  const g = lastCheck ? ((lastCheck.volume / 1000) * 1.24).toFixed(0) : "—";
  $("readout").innerHTML = `
    Outer <b>${d.outer.map((v) => v.toFixed(1)).join(" × ")} mm</b> (W × D × H)<br />
    Pocket inside: <b>${formatMm(params.depth)}</b> deep at the floor (was ${formatMm(HOLDER.ORIG_DEPTH)}),
    ~${formatMm(d.lipGap)} at lip height · <b>${formatMm(params.width)}</b> wide (was ${formatMm(HOLDER.ORIG_WIDTH)})<br />
    ${params.phones} × ${formatMm(params.phoneT)} phones = ${formatMm(d.stack)} → <b>${formatMm(d.slack)}</b> spare<br />
    ${params.base === "screw" ? `2 screw holes, ${HOLDER.HOLE_SPACING} mm apart (vertical)` : "No holes: glue or foam tape"}
    · PLA ~<b>${g} g</b>
  `;
}

async function downloadHolder() {
  if (!holderSrc) return;
  setStatus("Building STL…");
  const stl = stlFromIndexed(stretchedIndexed(), holderSrc.indices);
  const name = `phone-holder-${params.base}-d${params.depth.toFixed(1)}-w${params.width.toFixed(1)}-${APP_VERSION_TAG}.stl`;
  downloadArrayBuffer(name, stl);
  setStatus(`Saved ${name}`);
}

function bindHolder() {
  writeParams(DEFAULT_PARAMS);
  for (const { key } of SLIDERS) {
    const el = $(key);
    el.addEventListener("input", () => {
      params = mergeParams({ ...params, [key]: Number(el.value) });
      writeParams(params);
      applyStretch();
    });
  }
  document.querySelectorAll("[data-base]").forEach((b) =>
    b.addEventListener("click", () => {
      params = mergeParams({ ...params, base: b.dataset.base });
      writeParams(params);
      showHolder();
    })
  );
  document.querySelectorAll("[data-preset]").forEach((b) =>
    b.addEventListener("click", () => {
      params = applyPreset(b.dataset.preset, params);
      writeParams(params);
      applyStretch();
    })
  );
  $("fitDepth").addEventListener("click", () => {
    params = mergeParams({ ...params, depth: fitDepth(params) });
    writeParams(params);
    applyStretch();
  });
  $("reset").addEventListener("click", () => {
    const base = params.base;
    params = mergeParams({ ...DEFAULT_PARAMS, base });
    writeParams(params);
    applyStretch();
  });
  $("showPhones").addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("active");
    pick?.setVisible({ phones: e.currentTarget.classList.contains("active") }, { silent: true });
    applyStretch();
  });
  $("download").addEventListener("click", downloadHolder);
  document.querySelectorAll("[data-item]").forEach((b) =>
    b.addEventListener("click", () => downloadItem(b.dataset.item === "holder-default" ? BASES[params.base].defaultItem : b.dataset.item, b))
  );
  pairSlidersWithNumbers($("holderPanel"));
  window.__holderHistory = installUndo({
    panel: $("holderPanel"),
    read: () => params,
    apply: (snap) => {
      const baseChanged = snap.base !== params.base;
      writeParams(snap);
      if (baseChanged) showHolder();
      else applyStretch();
    },
  });
}

/* ---------------- pumpkin ---------------- */

let pumpkinFlat = null;
let pumpkinScale = 1;
let pumpkinSize = null;

async function showPumpkin() {
  $("pumpkinStatus").textContent = "Decrypting pumpkin…";
  try {
    if (!pumpkinFlat) {
      const bytes = await getItem("pumpkin-1x");
      const geo = new STLLoader().parse(bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength));
      pumpkinFlat = geo.getAttribute("position").array;
      pumpkinSize = bounds(pumpkinFlat).size;
    }
    if (tab !== "pumpkin") return;
    preview.setPhones(params, null, false);
    preview.setFlat(pumpkinFlat.slice(), { pumpkin: true });
    if (pick) preview.model.visible = pick.visibility().pumpkin !== false;
    setPumpkinScale(pumpkinScale);
    preview.fit();
    $("pumpkinStatus").textContent = "Ready";
    state.pumpkinReady = true;
  } catch (err) {
    console.error(err);
    $("pumpkinStatus").textContent = String(err.message || err);
  }
}

function setPumpkinScale(s) {
  pumpkinScale = s;
  document.querySelectorAll("[data-scale]").forEach((b) => b.classList.toggle("active", Number(b.dataset.scale) === s));
  if (tab === "pumpkin") {
    preview.setScale(s);
    preview.fit();
  }
  if (pumpkinSize) {
    $("pumpkinReadout").innerHTML = `${s}x size: <b>${pumpkinSize.map((v) => (v * s).toFixed(1)).join(" × ")} mm</b>`;
  }
}

function bindPumpkin() {
  document.querySelectorAll("[data-scale]").forEach((b) =>
    b.addEventListener("click", () => setPumpkinScale(Number(b.dataset.scale)))
  );
}

/* ---------------- boot ---------------- */

let pick;

function startApp() {
  $("gate").hidden = true;
  $("privateApp").hidden = false;
  preview = new Preview({ canvas: $("view") });
  window.__preview = preview;
  savesUi = wireHeaderSaves({
    appId: "private",
    mergeParams,
    sliderKeys: SLIDER_KEYS,
    getParams: () => params,
    setParams: (p) => {
      const baseChanged = p.base !== params.base;
      writeParams(p);
      if (baseChanged) showHolder();
      else applyStretch();
    },
  });
  pick = installModelPick({
    THREE,
    panel: document.querySelector(".panel"),
    canvas: $("view"),
    camera: preview.camera,
    scene: preview.scene,
    getParts: () =>
      tab === "pumpkin"
        ? [{ id: "pumpkin", label: "Pumpkin", objects: [{ object: preview.model, hit: "pumpkin" }] }]
        : [
            { id: "holder", label: "Holder", objects: [{ object: preview.model, hit: "holder" }] },
            { id: "phones", label: "Phones", preview: true, objects: [{ object: preview.phones, hit: "phone" }] },
          ],
    inspect: (hit) => inspectHolder(hit, params),
    measure: (a, b) => measureHolder(a, b, params, derive(params)),
    onVisible: (shown) => {
      if (tab === "pumpkin") {
        preview.model.visible = shown.pumpkin !== false;
        return;
      }
      preview.model.visible = shown.holder !== false;
      const phonesOn = shown.phones !== false;
      $("showPhones").classList.toggle("active", phonesOn);
      preview.phones.visible = phonesOn;
    },
  });
  window.__pick = pick;
  bindHolder();
  bindPumpkin();
  document.querySelectorAll("[data-tab]").forEach((b) => b.addEventListener("click", () => setTab(b.dataset.tab)));
  document.querySelectorAll("[data-view]").forEach((b) => b.addEventListener("click", () => preview.setNamedView(b.dataset.view)));
  $("resetView").addEventListener("click", () => preview.fit());
  $("lock").addEventListener("click", () => location.reload());
  const shot = new URLSearchParams(location.search).get("shot");
  if (shot) document.body.classList.add("capture");
  setTab(new URLSearchParams(location.search).get("tab") === "pumpkin" ? "pumpkin" : "holder");
}

$("app-version").textContent = `${APP_NAME} v${APP_VERSION}`;
$("gate").addEventListener("submit", onUnlock);
loadIndex().catch((err) => gateMsg(String(err.message || err), "err"));
