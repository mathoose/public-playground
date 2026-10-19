import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  SLIDERS,
  clampParams,
  derive,
  mergeParams,
  warnings,
} from "./geometry.js";
import { ToolPreview } from "./preview.js";
import { buildAll, buildPartStl, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import { installModelPick } from "../shared/model-pick.js";
import * as THREE from "three";
import { inspectHenson, measureHenson } from "./pick-map.js";

const $ = (id) => document.getElementById(id);
const UNITS = Object.fromEntries(SLIDERS.map((s) => [s.key, s.unit]));

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;
function fmtValue(key, n) {
  const step = SLIDERS.find((s) => s.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  const unit = UNITS[key] ? ` ${UNITS[key]}` : "";
  if (key === "pushHoleD" && n === 0) return "off";
  if ((key === "gripRibs" || key === "gripFlutes") && n < 3) return "off";
  if (key === "notchW" && n === 0) return "off";
  return `${Number(n).toFixed(digits)}${unit}`;
}

function writeParams(p) {
  params = mergeParams(p);
  for (const { key } of SLIDERS) {
    const el = $(key);
    const out = $(`${key}-out`);
    if (el) el.value = String(params[key]);
    if (out) out.textContent = fmtValue(key, params[key]);
  }
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout(result) {
  const d = result?.d || derive(params);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(params).map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  const g = (v) => (v ? ((v / 1000) * 1.27).toFixed(1) : "—");
  el.innerHTML = `
    Cradle <b>Ø${d.p.puckD} × ${d.height.toFixed(1)} mm</b> · wall ≥ <b>${d.minWall.toFixed(1)} mm</b><br />
    Cap pocket <b>${d.pocketL.toFixed(1)} × ${d.pocketWBottom.toFixed(1)}→${d.pocketWTop.toFixed(1)} mm</b>, ${d.p.capDepth.toFixed(1)} mm deep<br />
    Blade relief <b>${d.upperL.toFixed(1)} × ${d.upperW.toFixed(1)} mm</b>, ${d.p.upperDepth.toFixed(1)} mm tall<br />
    Handle grip <b>Ø${d.p.gripOD} × ${d.p.gripLen} mm</b>, bore ${d.gripBoreBottom.toFixed(2)}→${d.gripBoreTop.toFixed(2)} mm<br />
    PETG ~<b>${g(result?.cradleVolume)} g</b> cradle + <b>${g(result?.gripVolume)} g</b> grip
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildAll(params, { quality: "preview", ghost: true });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    preview.setVisible({
      cradle: pick.visibility().cradle !== false,
      grip: pick.visibility().grip !== false,
      razor: pick.visibility().razor !== false,
    });
    pick.refresh();
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
  rebuildTimer = window.setTimeout(rebuild, 40);
}

async function downloadPart(part) {
  setStatus(`Building ${part} STL…`);
  try {
    const { stl, volume } = await buildPartStl(params, part);
    const name = part === "grip" ? "handle-grip" : "head-cradle";
    downloadArrayBuffer(`henson-${name}-${APP_VERSION_TAG}.stl`, stl);
    setStatus(`${part} · ${stlTriangleCount(stl)} tris · ~${((volume / 1000) * 1.27).toFixed(1)} g PETG`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function applyView() {
  preview?.setVisible({
    cradle: pick.visibility().cradle !== false,
    grip: pick.visibility().grip !== false,
    razor: pick.visibility().razor !== false,
  });
}

function bind() {
  writeParams(DEFAULT_PARAMS);
  for (const { key } of SLIDERS) {
    const el = $(key);
    if (!el) continue;
    el.addEventListener("input", () => {
      params = clampParams({ ...params, [key]: Number(el.value) });
      writeParams(params);
      scheduleRebuild();
    });
  }
  $("reset")?.addEventListener("click", () => {
    writeParams(DEFAULT_PARAMS);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  $("dlCradle")?.addEventListener("click", () => downloadPart("cradle"));
  $("dlGrip")?.addEventListener("click", () => downloadPart("grip"));
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new ToolPreview({ canvas: $("view") });
const pick = installModelPick({
  THREE,
  panel: document.querySelector(".panel"),
  canvas: $("view"),
  camera: preview.camera,
  scene: preview.scene,
  getParts: () => [
    { id: "cradle", label: "Cradle", objects: [{ object: preview.meshes.cradle, hit: "cradle" }] },
    { id: "grip", label: "Grip", objects: [{ object: preview.meshes.grip, hit: "grip" }] },
    {
      id: "razor",
      label: "Razor",
      preview: true,
      objects: [
        { object: preview.meshes.ghost, hit: "razor" },
        { object: preview.meshes.blade, hit: "blade" },
      ],
    },
  ],
  inspect: (hit) => inspectHenson(hit, latest?.d || derive(params)),
  measure: (a, b) => measureHenson(a, b, latest?.d || derive(params)),
  onVisible: (shown) => {
    preview.setVisible({
      cradle: shown.cradle !== false,
      grip: shown.grip !== false,
      razor: shown.razor !== false,
    });
  },
});
window.__pick = pick;
bind();
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => params,
  apply: (snapshot) => {
    writeParams(snapshot);
    scheduleRebuild();
  },
});
applyView();
setStatus("Loading CAD…");
rebuild();
