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
import { applyFrame, loadFrameMesh, meshTo3mf, meshToStl } from "./mesh.js";
import { FramePreview } from "./preview.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import { lastSettings, rememberExport, rememberSettings, rememberVisit, wantsRestore } from "../shared/library-activity.js";
import { mountDesignerSaves, makeSameParams } from "../shared/designer-saves.js";
import { attachFaceMeasure, bindFaceMeasureUI, highlightMeasureParams } from "../shared/face-measure.js";
import { measurePair } from "./pick-map.js";
import * as THREE from "three";

const APP_ID = "baroque-frame";

function skipLibrary() {
  const q = new URLSearchParams(location.search);
  return q.has("capture") || q.has("shot");
}

function startingParams(fallback) {
  if (skipLibrary() || !wantsRestore()) return fallback;
  return lastSettings(APP_ID) || fallback;
}

function noteDownload(filename) {
  rememberSettings(APP_ID, params);
  rememberExport(APP_ID, { filename, params });
}

const $ = (id) => document.getElementById(id);

let params = mergeParams();
let preview;
let savesUi;
let mesh = null;
let mapped = null;
let rebuildTimer = 0;
let shade = true;

function fmtValue(key, n) {
  const spec = SLIDERS.find((s) => s.key === key);
  const step = spec?.step ?? 0.1;
  const digits = step >= 1 ? 0 : 1;
  return `${Number(n).toFixed(digits)} ${spec?.unit ?? "mm"}`;
}

function writeParams(p) {
  params = mergeParams(p);
  const d = derive(params);
  const floor = {
    width: Math.max(SLIDERS.find((s) => s.key === "width").min, d.minWidth),
    height: Math.max(SLIDERS.find((s) => s.key === "height").min, d.minHeight),
  };
  for (const spec of SLIDERS) {
    const el = $(spec.key);
    const out = $(`${spec.key}-out`);
    if (el) {
      el.min = String(floor[spec.key] ?? spec.min);
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

function renderReadout() {
  const d = derive(params);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(params).map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  el.innerHTML = `
    Outer <b>${d.p.width.toFixed(1)} × ${d.p.height.toFixed(1)} mm</b><br />
    Opening <b>${d.openingW.toFixed(1)} × ${d.openingH.toFixed(1)} mm</b><br />
    Moulding <b>${d.borderX.toFixed(1)} mm</b> wide, <b>${d.depth.toFixed(1)} mm</b> deep
  `;
}

function rebuild() {
  if (!mesh) return;
  mapped = applyFrame(mesh, params);
  const d = derive(params);
  preview.update(mapped, mesh.idx, { width: d.p.width, height: d.p.height }, shade);
  shade = false;
  renderReadout();
  setStatus("Live");
  document.body.dataset.ready = "1";
  if (document.body.classList.contains("capture")) {
    const name = new URLSearchParams(location.search).get("capture");
    preview.setNamedView(name === "front" || name === "side" ? name : "angle");
  }
}

function scheduleRebuild() {
  renderReadout();
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(rebuild, 30);
}

function downloadBlob(filename, buffer, mime) {
  const blob = new Blob([buffer], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
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
    el.addEventListener("change", () => {
      shade = true;
      scheduleRebuild();
    });
  }
  $("reset")?.addEventListener("click", () => {
    params = mergeParams(DEFAULT_PARAMS);
    writeParams(params);
    preview.fitted = false;
    shade = true;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => preview.setNamedView(btn.getAttribute("data-view")));
  });
  bindFaceMeasureUI({
    preview,
    panel: document.querySelector(".panel"),
    measureBtn: "measure",
    hintEl: "hint",
    defaultHint: "Drag to orbit · pinch/scroll to zoom",
    onPair: (info) => {
      if (!info.picks?.[0] || !info.picks?.[1]) return;
      const mapped = measurePair(info.picks[0], info.picks[1], params);
      highlightMeasureParams(document.querySelector(".panel"), mapped.params);
    },
  });
  $("download-stl")?.addEventListener("click", () => {
    if (!mapped) return;
    setStatus("Building STL…");
    const stlName = `baroque-frame-${APP_VERSION_TAG}.stl`;
    downloadBlob(stlName, meshToStl(mapped, mesh.idx), "model/stl");
    noteDownload(stlName);
    setStatus("STL ready");
  });
  $("download-3mf")?.addEventListener("click", () => {
    if (!mapped) return;
    setStatus("Building 3MF…");
    const threemfName = `baroque-frame-${APP_VERSION_TAG}.3mf`;
    downloadBlob(threemfName, meshTo3mf(mapped, mesh.idx), "model/3mf");
    noteDownload(threemfName);
    setStatus("3MF ready");
  });
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new FramePreview({ canvas: $("view") });
attachFaceMeasure(preview, {
  THREE,
  canvas: $("view"),
  scene: preview.scene,
  getTargets: () => (preview.mesh?.geometry?.attributes?.position ? [preview.mesh] : []),
  getBox: () => new THREE.Box3().setFromObject(preview.mesh),
});
const headerSaves = document.querySelector("header .header-saves");
if (headerSaves) {
  savesUi = mountDesignerSaves({
    appId: APP_ID,
    anchor: headerSaves,
    mergeParams,
    sameParams: makeSameParams(mergeParams, SLIDERS.map((s) => s.key)),
    getParams: () => params,
    setParams: (p) => {
      writeParams(p);
      shade = true;
      scheduleRebuild();
    },
  });
}
bind();
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => {
    const { width, height, thickness } = params;
    return { width, height, thickness };
  },
  apply: (snapshot) => {
    writeParams(snapshot);
    shade = true;
    scheduleRebuild();
  },
});

if (!skipLibrary()) rememberVisit(APP_ID);

const capture = new URLSearchParams(location.search).get("capture");
if (capture) {
  document.body.classList.add("capture");
  preview.renderer.setPixelRatio(1.5);
}

setStatus("Loading frame…");
loadFrameMesh()
  .then((loaded) => {
    mesh = loaded;
    rebuild();
    if (capture) preview.setNamedView(capture === "side" || capture === "front" ? capture : "angle");
  })
  .catch((err) => {
    console.error(err);
    setStatus(String(err.message || err), "err");
  });
