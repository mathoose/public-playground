import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  SLIDERS,
  derive,
  formatMm,
  mergeParams,
  warnings,
} from "./geometry.js";
import { LockPreview } from "./preview.js";
import { buildLock, buildLockStl, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";
import { sameSliderParams } from "./saves.js";
import { mountDesignerSaves } from "../shared/designer-saves.js";
import { bindFaceMeasureUI, highlightMeasureParams } from "../shared/face-measure.js";
import { measurePair } from "./pick-map.js";

const APP_ID = "costco-bin-lock";
const $ = (id) => document.getElementById(id);
const pageSearch = new URLSearchParams(location.search);
const skipLibrary = pageSearch.has("capture") || pageSearch.has("shot");

let params = mergeParams(!skipLibrary && wantsRestore() ? lastSettings(APP_ID) || {} : {});
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmtValue(key, n) {
  const step = SLIDERS.find((s) => s.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  return `${Number(n).toFixed(digits)} mm`;
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
  savesUi?.renderList();
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout(result) {
  const d = result?.d || derive(params);
  const notes = warnings(d);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = notes.map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  const grams = result ? ((result.volume / 1000) * 1.24).toFixed(1) : "—";
  const tris = result ? Math.round(result.tris) : "—";
  el.innerHTML = `
    Slot <b>${formatMm(d.p.slotLength)}</b> × <b>${formatMm(d.p.slotWidth)}</b><br />
    Hook <b>${formatMm(d.hookY)}</b> × <b>${formatMm(d.hookX)}</b>,
    <b>${formatMm(d.p.engagement)}</b> under each rim<br />
    Flat shelf left after a shift <b>${formatMm(Math.max(0, d.seatLeft))}</b>
    · throat <b>${formatMm(d.throat)}</b><br />
    Drop-in clearance along the slot <b>${formatMm(d.insertGap)}</b><br />
    Square end <b>${d.headX.toFixed(1)} × ${d.headY.toFixed(1)} mm</b><br />
    Pad height <b>${d.totalZ.toFixed(1)} mm</b>
    · PLA ~<b>${grams} g</b> · ${tris} tris
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildLock(params, { quality: "preview" });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    renderReadout(result);
    setStatus("Live");
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function scheduleRebuild() {
  renderReadout(latest);
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(() => {
    rebuild();
  }, 40);
}

let savesUi;

function bindHeaderSaves() {
  const anchor = document.querySelector("header .header-saves");
  if (!anchor) return;
  savesUi = mountDesignerSaves({
    appId: APP_ID,
    anchor,
    mergeParams,
    sameParams: sameSliderParams,
    getParams: () => params,
    setParams: (p) => {
      params = mergeParams(p);
      writeParams(params);
      scheduleRebuild();
    },
  });
}

function markView(name) {
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-view") === name);
  });
}

async function downloadStl() {
  setStatus("Building STL…");
  try {
    const { stl, volume } = await buildLockStl(params);
    const grams = ((volume / 1000) * 1.24).toFixed(1);
    const filename = `costco-bin-lock-${APP_VERSION_TAG}.stl`;
    downloadArrayBuffer(filename, stl);
    if (!skipLibrary) {
      rememberSettings(APP_ID, params);
      rememberExport(APP_ID, { filename, params });
    }
    setStatus(`STL · ${stlTriangleCount(stl)} tris · ~${grams} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bind() {
  writeParams(params);
  for (const { key } of SLIDERS) {
    const el = $(key);
    if (!el) continue;
    el.addEventListener("input", () => {
      params = mergeParams({ ...params, [key]: Number(el.value) });
      writeParams(params);
      scheduleRebuild();
    });
  }
  $("reset")?.addEventListener("click", () => {
    params = mergeParams(DEFAULT_PARAMS);
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => {
    preview.fitted = false;
    preview.setNamedView("iso");
    markView("iso");
  });
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.getAttribute("data-view");
      preview.setNamedView(name);
      markView(name);
    });
  });
  $("download")?.addEventListener("click", () => downloadStl());
  bindFaceMeasureUI({
    preview,
    panel: document.querySelector(".panel"),
    measureBtn: "measure",
    hintEl: "hint",
    defaultHint: "Drag to orbit · pinch or scroll to zoom",
    onPair: (info) => {
      if (!info.picks?.[0] || !info.picks?.[1]) return;
      const mapped = measurePair(info.picks[0], info.picks[1], params);
      highlightMeasureParams(document.querySelector(".panel"), mapped.params);
    },
  });
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new LockPreview({ canvas: $("view") });
window.__lockPreview = preview;
bind();
if (!skipLibrary) rememberVisit(APP_ID);
pairSlidersWithNumbers(document.querySelector(".panel"));
bindHeaderSaves();
window.__lockHistory = installUndo({
  panel: document.querySelector(".panel"),
  read: () => params,
  apply: (snapshot) => {
    writeParams(snapshot);
    scheduleRebuild();
  },
});
setStatus("Loading CAD…");

const shot = new URLSearchParams(location.search).get("shot");
if (shot) document.body.classList.add("capture");

rebuild()
  .then(() => {
    if (shot) {
      preview.setNamedView(shot);
      markView(shot);
    }
    window.__lockReady = true;
  })
  .catch((err) => {
    setStatus(String(err.message || err), "err");
  });
