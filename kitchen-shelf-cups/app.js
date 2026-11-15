import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  SLIDERS,
  SOURCE_HEX_FLAT,
  derive,
  formatMm,
  mergeParams,
  warnings,
} from "./geometry.js";
import { ShelfPreview } from "./preview.js";
import { buildShelf, buildShelfStl, downloadArrayBuffer, stlTriangleCount } from "./cad.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";

const APP_ID = "kitchen-shelf-cups";
const PLA = 1.24;
const $ = (id) => document.getElementById(id);

function skipLibrary() {
  const q = new URLSearchParams(location.search);
  return q.has("capture") || q.has("shot");
}

let params = mergeParams(!skipLibrary() && wantsRestore() ? lastSettings(APP_ID) || {} : {});
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmtValue(key, n) {
  const step = SLIDERS.find((s) => s.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  return formatMm(n, digits);
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
      el.dataset.unit = spec.unit || "";
      el.value = String(params[spec.key]);
    }
    if (out) out.textContent = spec.unit ? fmtValue(spec.key, params[spec.key]) : String(params[spec.key]);
  }
  const skip = $("skipCenter");
  if (skip) skip.checked = params.skipCenter;
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
  const grams = result?.volume != null ? ((result.volume / 1000) * PLA).toFixed(0) : "—";
  const cm3 = result?.volume != null ? (result.volume / 1000).toFixed(0) : "—";
  el.innerHTML = `
    <b>${d.p.width.toFixed(0)} × ${d.p.height.toFixed(0)} × ${d.totalZ.toFixed(0)} mm.</b>
    ${d.holeCount} hexes, flat ${formatMm(d.flat)} (source through-hole ${formatMm(SOURCE_HEX_FLAT)}).
    Outer ring ${formatMm(d.p.ring)} on every side · walls ${formatMm(d.webX)} and ${formatMm(d.webY)} ·
    arms ${formatMm(d.p.armThick, 0)} × ${formatMm(d.p.armLength, 0)}.
    ~${cm3} cm³ · ~${grams} g PLA
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildShelf(params, "preview");
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
  rebuildTimer = window.setTimeout(rebuild, 80);
}

async function downloadStl() {
  setStatus("Building STL…");
  try {
    const { stl, volume } = await buildShelfStl(params);
    const filename = `kitchen-shelf-cups-${APP_VERSION_TAG}.stl`;
    downloadArrayBuffer(filename, stl);
    rememberSettings(APP_ID, params);
    rememberExport(APP_ID, { filename, params });
    setStatus(`STL · ${stlTriangleCount(stl)} tris · ~${((volume / 1000) * PLA).toFixed(0)} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bindUi() {
  writeParams(params);
  preview = new ShelfPreview({ canvas: $("view") });
  if (!skipLibrary()) rememberVisit(APP_ID);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach((other) => {
        other.classList.toggle("active", other === button);
      });
      preview.setView(button.getAttribute("data-view"));
    });
  });

  $("resetView")?.addEventListener("click", () => {
    document.querySelectorAll("[data-view]").forEach((button) => {
      button.classList.toggle("active", button.getAttribute("data-view") === "angle");
    });
    preview.setView("angle");
  });

  for (const spec of SLIDERS) {
    const el = $(spec.key);
    el?.addEventListener("input", () => {
      params = mergeParams({ ...params, [spec.key]: Number(el.value) });
      writeParams(params);
      scheduleRebuild();
    });
  }

  $("skipCenter")?.addEventListener("change", () => {
    params = mergeParams({ ...params, skipCenter: $("skipCenter").checked });
    writeParams(params);
    scheduleRebuild();
  });

  $("download")?.addEventListener("click", downloadStl);

  const panel = document.querySelector(".panel");
  pairSlidersWithNumbers(panel);
  installUndo({
    panel,
    read: () => params,
    apply: (next) => {
      writeParams(next);
      scheduleRebuild();
    },
  });

  const foot = $("app-version");
  if (foot) foot.textContent = `${APP_NAME} v${APP_VERSION}`;

  scheduleRebuild();
}

bindUi();
