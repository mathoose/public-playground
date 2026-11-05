import {
  APP_NAME,
  APP_VERSION,
  PRESETS,
  SLIDERS,
  activePreset,
  formatMm,
  measureSeat,
  mergeParams,
  planCut,
  warnings,
} from "./geometry.js";
import { LanternPreview } from "./preview.js";
import { applyCut, downloadArrayBuffer, parseMeshFile, stlFromIndexed } from "./cut.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";

const APP_ID = "pumpkin-lantern";
const $ = (id) => document.getElementById(id);

function skipLibrary() {
  const q = new URLSearchParams(location.search);
  return q.has("capture") || q.has("shot");
}

let params = mergeParams(!skipLibrary() && wantsRestore() ? lastSettings(APP_ID) || {} : {});
let preview;
let source = null;
let seat = null;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmtValue(key, n) {
  if (key === "cordDiameter" && n === 0) return "off";
  const spec = SLIDERS.find((item) => item.key === key);
  const digits = spec && spec.step >= 1 ? 0 : 1;
  if (spec?.unit === "°") return `${n.toFixed(digits)}°`;
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
      el.dataset.unit = spec.unit;
      el.value = String(params[spec.key]);
    }
    if (out) out.textContent = fmtValue(spec.key, params[spec.key]);
  }
  const current = activePreset(params);
  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.classList.toggle("active", button.dataset.preset === current);
  });
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout() {
  const warnEl = $("warnings");
  const notes = warnings(params, seat);
  if (latest?.chips) {
    notes.push("A small loose piece was left out of the file. Aim the cord hole through a thicker rib, or use a smaller hole.");
  }
  if (warnEl) warnEl.innerHTML = notes.map((note) => `<p class="warn">${note}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  if (!seat) {
    el.innerHTML = "Drop the With Hole lantern. The opening size shows up here once the file is read.";
    return;
  }
  const plan = latest?.plan || planCut(params, seat);
  const grams = latest?.volume != null ? ((latest.volume / 1000) * 1.24).toFixed(0) : "—";
  el.innerHTML = `
    <b>Opening ${formatMm(plan.opening)} for a ${formatMm(plan.p.ledDiameter)} disc.</b>
    This file’s hole is ${formatMm(seat.seatRadius * 2)} across and ${formatMm(plan.seatHeight)} tall.
    Cord hole ${plan.cordR > 0.2 ? formatMm(plan.cordR * 2) : "off"}${
      plan.cordR > 0.2 ? `, ${formatMm(plan.cordZ - seat.zMin)} up from the table` : ""
    }.
    About ${grams} g of PLA.
  `;
}

async function rebuild() {
  if (!source || !seat) return;
  const gen = ++rebuildGen;
  setStatus("Cutting the opening…");
  try {
    const result = await applyCut(source.positions, source.indices, params, seat);
    if (gen !== rebuildGen) return;
    latest = result;
    preview.setMesh(result.positions, result.indices, seat);
    preview.setGhost(result.plan, seat);
    renderReadout();
    const chip = result.chips ? " · loose bit removed" : "";
    setStatus(`Opening ${formatMm(result.plan.opening)}${chip}`);
    $("download").disabled = false;
  } catch (err) {
    console.error(err);
    if (gen !== rebuildGen) return;
    setStatus(String(err.message || err), "err");
  }
}

function scheduleRebuild() {
  renderReadout();
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(rebuild, 280);
}

async function useFile(file) {
  setStatus("Reading the lantern…");
  $("download").disabled = true;
  try {
    const buffer = await file.arrayBuffer();
    const mesh = parseMeshFile(buffer, file.name);
    const measured = measureSeat(mesh.positions, mesh.indices);
    source = mesh;
    seat = measured;
    latest = null;
    $("drop").hidden = true;
    $("fileName").textContent = file.name;
    preview.setMesh(mesh.positions, mesh.indices, measured);
    preview.setGhost(planCut(params, measured), measured);
    scheduleRebuild();
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

async function downloadStl() {
  if (!source || !seat) {
    setStatus("Drop the lantern file first.", "err");
    return;
  }
  setStatus("Building STL…");
  try {
    const result = await applyCut(source.positions, source.indices, params, seat);
    latest = result;
    const stl = stlFromIndexed(result.positions, result.indices);
    const d = result.plan.p.ledDiameter.toFixed(1).replace(".", "p");
    const c = result.plan.p.cordDiameter.toFixed(1).replace(".", "p");
    const filename = `pumpkin-lantern-led-${d}-cord-${c}.stl`;
    downloadArrayBuffer(filename, stl);
    rememberSettings(APP_ID, params);
    rememberExport(APP_ID, { filename, params });
    setStatus(`Saved ${filename}`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bindUi() {
  writeParams(params);
  preview = new LanternPreview({ canvas: $("view") });
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
    $(spec.key)?.addEventListener("input", () => {
      params = mergeParams({ ...params, [spec.key]: Number($(spec.key).value) });
      writeParams(params);
      scheduleRebuild();
    });
  }

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const preset = PRESETS.find((item) => item.id === button.dataset.preset);
      if (!preset) return;
      params = mergeParams({ ...params, ...preset });
      writeParams(params);
      scheduleRebuild();
    });
  });

  $("file").addEventListener("change", () => {
    const file = $("file").files && $("file").files[0];
    if (file) useFile(file);
  });
  $("download").addEventListener("click", downloadStl);

  const dropTarget = document.querySelector(".app");
  dropTarget.addEventListener("dragover", (event) => {
    event.preventDefault();
    $("drop").classList.add("hot");
  });
  dropTarget.addEventListener("dragleave", () => $("drop").classList.remove("hot"));
  dropTarget.addEventListener("drop", (event) => {
    event.preventDefault();
    $("drop").classList.remove("hot");
    const file = event.dataTransfer?.files?.[0];
    if (file) useFile(file);
  });

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
  if (foot) foot.textContent = `${APP_NAME} ${APP_VERSION}`;
  $("download").disabled = true;
  renderReadout();
}

bindUi();
