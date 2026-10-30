import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  SLIDERS,
  applySliderChange,
  derive,
  mergeParams,
  warnings,
} from "./geometry.js";
import { BagPreview } from "./preview.js";
import { buildBag, buildBagStls, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import { lastSettings, rememberExport, rememberSettings, rememberVisit, wantsRestore } from "../shared/library-activity.js";

const APP_ID = "bone-side-bag";
const pageSearch = new URLSearchParams(location.search);

function skipLibrary() {
  return pageSearch.has("capture") || pageSearch.has("shot");
}

function startingParams(fallback) {
  const base = skipLibrary() || !wantsRestore() ? fallback : lastSettings(APP_ID) || fallback;
  const mode = pageSearch.get("mode");
  if (skipLibrary() && (mode === "phone" || mode === "bag")) return mergeParams({ ...base, mode });
  return mergeParams(base);
}

function noteDownload(filename) {
  rememberSettings(APP_ID, params);
  rememberExport(APP_ID, { filename, params });
}

const $ = (id) => document.getElementById(id);

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmtValue(key, n) {
  const spec = SLIDERS.find((s) => s.key === key);
  const step = spec?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  const unit = spec?.unit ?? "";
  return unit ? `${Number(n).toFixed(digits)} ${unit}` : String(Math.round(n));
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
      el.dataset.unit = spec.unit;
      el.value = String(params[spec.key]);
    }
    if (out) out.textContent = fmtValue(spec.key, params[spec.key]);
  }
  for (const mode of ["bag", "phone"]) {
    const btn = $(`mode-${mode}`);
    const on = params.mode === mode;
    btn?.classList.toggle("active", on);
    btn?.setAttribute("aria-pressed", on ? "true" : "false");
  }
  document.querySelectorAll("[data-for]").forEach((el) => {
    el.hidden = el.getAttribute("data-for") !== params.mode;
  });
  const title = $("piece-title");
  if (title) title.textContent = params.mode === "phone" ? "Phone cage" : "Side bag";
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout(result) {
  const d = derive(params);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(params).map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  const grams = result ? ((result.volume / 1000) * 1.24).toFixed(0) : "—";
  const size =
    d.mode === "phone"
      ? `Phone <b>${d.p.phoneWidth.toFixed(1)} × ${d.p.phoneHeight.toFixed(1)} × ${d.p.phoneDepth.toFixed(1)} mm</b>, cage <b>${d.outerW.toFixed(0)} × ${d.outerD.toFixed(0)} × ${d.outerH.toFixed(0)} mm</b>`
      : `Inside <b>${d.innerW.toFixed(0)} × ${d.innerD.toFixed(0)} × ${d.innerH.toFixed(0)} mm</b>, outside <b>${d.outerW.toFixed(0)} × ${d.outerD.toFixed(0)} × ${d.outerH.toFixed(0)} mm</b>`;
  el.innerHTML = `
    ${size}<br />
    Chain <b>${d.p.links}</b> bone links, about <b>${Math.round(d.strap)} mm</b> of strap, each link <b>${d.link.overall.toFixed(0)} mm</b><br />
    Body, chain, and two clasps · PLA ~<b>${grams} g</b>
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildBag(params, { quality: "preview" });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    renderReadout(result);
    setStatus("Live");
    document.body.dataset.ready = "1";
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function scheduleRebuild() {
  renderReadout(latest);
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(() => rebuild(), 60);
}

function fileStem() {
  return `bone-side-bag-${APP_VERSION_TAG}-${params.mode}`;
}

async function download3mf() {
  setStatus("Building 3MF…");
  try {
    const built = await buildBagStls(params);
    const filename = `${fileStem()}.3mf`;
    downloadArrayBuffer(filename, built.threemf, "model/3mf");
    noteDownload(filename);
    setStatus(`3MF · one assembly · body, chain, clasps · ${Math.round(built.tris)} tris`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

async function downloadPart(part) {
  setStatus(`Building ${part} STL…`);
  try {
    const built = await buildBagStls(params);
    const piece = built.parts[part];
    const filename = `${fileStem()}-${part}.stl`;
    downloadArrayBuffer(filename, piece.stl);
    noteDownload(filename);
    const grams = ((piece.volume / 1000) * 1.24).toFixed(1);
    setStatus(`${part} · ${stlTriangleCount(piece.stl)} tris · ~${grams} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bindShow() {
  const map = [
    ["showBody", "body"],
    ["showChain", "chain"],
    ["showClasp", "clasp"],
    ["showBed", "bed"],
  ];
  for (const [id, key] of map) {
    const btn = $(id);
    if (!btn) continue;
    btn.addEventListener("click", () => {
      const on = !btn.classList.contains("active");
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      preview.setShow({ [key]: on });
    });
  }
}

function bind() {
  writeParams(startingParams(DEFAULT_PARAMS));
  for (const { key } of SLIDERS) {
    const el = $(key);
    if (!el) continue;
    el.addEventListener("input", () => {
      params = applySliderChange(params, key, Number(el.value));
      writeParams(params);
      scheduleRebuild();
    });
  }
  for (const mode of ["bag", "phone"]) {
    $(`mode-${mode}`)?.addEventListener("click", () => {
      if (params.mode === mode) return;
      params = mergeParams({ ...params, mode });
      writeParams(params);
      preview.fitted = false;
      scheduleRebuild();
    });
  }
  $("phone-iphone")?.addEventListener("click", () => {
    params = mergeParams({ ...params, mode: "phone", phoneWidth: 71.6, phoneHeight: 147.6, phoneDepth: 7.8 });
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("phone-case")?.addEventListener("click", () => {
    params = mergeParams({ ...params, mode: "phone", phoneWidth: 78, phoneHeight: 160, phoneDepth: 11.5 });
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("reset")?.addEventListener("click", () => {
    params = mergeParams(DEFAULT_PARAMS);
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach((b) => b.classList.toggle("active", b === btn));
      preview.setNamedView(btn.getAttribute("data-view"));
    });
  });
  document.querySelectorAll("[data-download]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.getAttribute("data-download");
      if (kind === "3mf") download3mf();
      else downloadPart(kind);
    });
  });
  bindShow();
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new BagPreview({ canvas: $("view") });
bind();
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => ({ ...params }),
  apply: (snapshot) => {
    const modeChanged = snapshot.mode !== params.mode;
    writeParams(snapshot);
    if (modeChanged) preview.fitted = false;
    scheduleRebuild();
  },
});

if (!skipLibrary()) rememberVisit(APP_ID);

const shot = pageSearch.get("shot") || pageSearch.get("capture");
if (shot) {
  document.body.classList.add("capture");
  preview.renderer.setPixelRatio(2);
}

rebuild().then(() => {
  if (shot) preview.setNamedView(shot === "1" ? "iso" : shot);
});
