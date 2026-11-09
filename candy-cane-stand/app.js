import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  ORIGINAL_HOLE_NARROW,
  ORIGINAL_HOLE_WIDE,
  SHAFT_OD,
  SLIDERS,
  buildStandMesh,
  derive,
  formatMm,
  mergeParams,
  meshToStl,
  warnings,
} from "./geometry.js";
import { StandPreview } from "./preview.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";

const APP_ID = "candy-cane-stand";
const $ = (id) => document.getElementById(id);

function skipLibrary() {
  const query = new URLSearchParams(location.search);
  return query.has("capture") || query.has("shot");
}

let params = mergeParams(!skipLibrary() && wantsRestore() ? lastSettings(APP_ID) || {} : {});
let preview;
let latest = null;

function fmtValue(key, n) {
  const step = SLIDERS.find((spec) => spec.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  return formatMm(n, digits);
}

function writeParams(next) {
  params = mergeParams(next);
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
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function grams(mesh) {
  let volume = 0;
  const { positions, indices } = mesh;
  for (let t = 0; t < indices.length; t += 3) {
    const ia = indices[t] * 3;
    const ib = indices[t + 1] * 3;
    const ic = indices[t + 2] * 3;
    volume +=
      positions[ia] * (positions[ib + 1] * positions[ic + 2] - positions[ib + 2] * positions[ic + 1]) +
      positions[ia + 1] * (positions[ib + 2] * positions[ic] - positions[ib] * positions[ic + 2]) +
      positions[ia + 2] * (positions[ib] * positions[ic + 1] - positions[ib + 1] * positions[ic]);
  }
  return ((volume / 6 / 1000) * 1.24).toFixed(0);
}

function renderReadout(mesh) {
  const d = derive(params);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(params).map((note) => `<p class="warn">${note}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  el.innerHTML = `
    <b>Bore ${d.holeId.toFixed(2)} mm</b> for a ${SHAFT_OD.toFixed(1)} mm shaft
    (${d.p.clearance.toFixed(2)} mm clearance).
    Original hole ${d.originalHoleId.toFixed(1)} mm
    (oval ${ORIGINAL_HOLE_NARROW.toFixed(1)} × ${ORIGINAL_HOLE_WIDE.toFixed(1)} mm).
    Wall ${formatMm(d.p.wall)} · socket depth ${formatMm(d.p.depth, 0)} ·
    foot ${d.footDiameter.toFixed(0)} mm across, ${d.height.toFixed(0)} mm tall
    ${mesh ? `· ~${grams(mesh)} g PLA` : ""}
  `;
}

function rebuild() {
  try {
    latest = buildStandMesh(params);
    preview.update(latest);
    renderReadout(latest);
    setStatus("Live");
    document.body.dataset.ready = "1";
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function downloadBlob(filename, buffer) {
  const blob = new Blob([buffer], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadStl() {
  try {
    const mesh = buildStandMesh(params, 120);
    const filename = `candy-cane-stand-${APP_VERSION_TAG}.stl`;
    downloadBlob(filename, meshToStl(mesh));
    rememberSettings(APP_ID, params);
    rememberExport(APP_ID, { filename, params });
    const tris = mesh.indices.length / 3;
    setStatus(`STL · ${tris} tris · ~${grams(mesh)} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bindUi() {
  const query = new URLSearchParams(location.search);
  if (query.has("capture") || query.has("shot")) document.body.classList.add("capture");

  writeParams(params);
  preview = new StandPreview({ canvas: $("view") });
  if (!skipLibrary()) rememberVisit(APP_ID);

  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach((other) => {
        other.classList.toggle("active", other === button);
      });
      preview.fitted = true;
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
      rebuild();
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
      rebuild();
    },
  });

  const foot = $("app-version");
  if (foot) foot.textContent = `${APP_NAME} ${APP_VERSION}`;

  rebuild();
}

bindUi();
