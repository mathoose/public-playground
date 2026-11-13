import {
  APP_NAME,
  APP_VERSION,
  SLIDERS,
  derive,
  formatMm,
  mergeParams,
  warnings,
} from "./geometry.js";
import { HolderPreview } from "./preview.js";
import { buildHolder, buildHolderStl, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";

const APP_ID = "belt-holder";
const $ = (id) => document.getElementById(id);

function skipLibrary() {
  const q = new URLSearchParams(location.search);
  return q.has("capture") || q.has("shot");
}

function initialParams() {
  const q = new URLSearchParams(location.search);
  let raw = !skipLibrary() && wantsRestore() ? lastSettings(APP_ID) || {} : {};
  const mode = q.get("mode");
  if (mode === "clip" || mode === "bin") raw = { ...raw, mode };
  return mergeParams(raw);
}

let params = initialParams();
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
    if (el) el.value = String(params[spec.key]);
    if (out) out.textContent = fmtValue(spec.key, params[spec.key]);
  }
  const bin = params.mode === "bin";
  const cradleRow = $("row-cradle");
  const depthRow = $("row-depth");
  if (cradleRow) cradleRow.hidden = bin;
  if (depthRow) depthRow.hidden = !bin;
  document.querySelectorAll("[data-mode]").forEach((button) => {
    const on = button.getAttribute("data-mode") === params.mode;
    button.classList.toggle("active", on);
    button.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const download = $("download");
  if (download) download.textContent = bin ? "Download square bin STL" : "Download belt clip STL";
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout(volume) {
  const d = derive(params);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(params).map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  const grams = volume != null ? ((volume / 1000) * 1.24).toFixed(1) : "—";
  const pins = `${formatMm(d.p.pinDiameter, 1)} pins, ${formatMm(d.p.holeSpacing, 1)} apart`;
  el.innerHTML =
    d.mode === "bin"
      ? `<b>Square bin.</b> ${pins}. Opening ${formatMm(d.binInner, 1)} square, ${formatMm(d.p.binDepth, 0)} deep, side walls ${formatMm(d.wall, 1)}. ~${grams} g PLA`
      : `<b>Belt clip.</b> ${pins}. Cradle ${formatMm(d.p.cradleDiameter, 0)} inside, ${formatMm(d.width, 0)} wide. ~${grams} g PLA`;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildHolder(params, { quality: "preview" });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    renderReadout(result.volume);
    setStatus("Live");
    document.body.dataset.ready = "1";
    document.body.dataset.mode = result.d.mode;
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function scheduleRebuild() {
  renderReadout(latest?.volume);
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(rebuild, 80);
}

async function downloadStl() {
  setStatus("Building STL…");
  try {
    const { stl, volume, d } = await buildHolderStl(params);
    const filename = d.mode === "bin" ? "belt-holder-bin.stl" : "belt-holder-clip.stl";
    downloadArrayBuffer(filename, stl);
    rememberSettings(APP_ID, params);
    rememberExport(APP_ID, { filename, params });
    setStatus(`${filename} · ${stlTriangleCount(stl)} tris · ~${((volume / 1000) * 1.24).toFixed(1)} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bindUi() {
  if (skipLibrary()) document.body.classList.add("capture");
  writeParams(params);
  preview = new HolderPreview({ canvas: $("view") });
  if (!skipLibrary()) rememberVisit(APP_ID);

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      params = mergeParams({ ...params, mode: button.getAttribute("data-mode") });
      writeParams(params);
      scheduleRebuild();
    });
  });

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
  const headerVersion = $("header-version");
  if (headerVersion) headerVersion.textContent = `v${APP_VERSION}`;

  scheduleRebuild();
}

bindUi();
