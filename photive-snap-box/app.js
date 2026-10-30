import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  PLUG_KEYS,
  SLIDERS,
  applySliderChange,
  derive,
  formatMm,
  mergeParams,
  sliderAbsMax,
  warnings,
} from "./geometry.js";
import { BoxPreview } from "./preview.js";
import { buildBox, buildPartStl, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import { lastSettings, rememberExport, rememberSettings, rememberVisit, wantsRestore } from "../shared/library-activity.js";
import { wireHeaderSaves } from "../shared/wire-designer.js";
import { installModelPick } from "../shared/model-pick.js";
import * as THREE from "three";
import { inspectPhotive, measurePhotive } from "./pick-map.js";

const APP_ID = "photive-snap-box";
const SLIDER_KEYS = SLIDERS.map((s) => s.key);

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

const UNITS = Object.fromEntries(SLIDERS.map((s) => [s.key, s.unit]));
const OPEN_LIFT = 14;

const VIEWS = {
  open: { base: true, lid: true, spacer: true, ghosts: true, lift: OPEN_LIFT },
  closed: { base: true, lid: true, spacer: true, ghosts: true, lift: 0 },
  base: { base: true, lid: false, spacer: true, ghosts: true, lift: 0 },
  lid: { base: false, lid: true, spacer: false, ghosts: false, lift: OPEN_LIFT },
  spacer: { base: false, lid: false, spacer: true, ghosts: true, lift: 0 },
};

let params = mergeParams();
let preview;
let pick;
let savesUi;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;
let partView = "open";
let section = false;

function fmtValue(key, n) {
  if (key === "usbCount") return String(Math.round(n));
  if (PLUG_KEYS.includes(key) && Number(n) === 0) return "no plug";
  const step = SLIDERS.find((s) => s.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  const unit = UNITS[key] ? ` ${UNITS[key]}` : "";
  return `${Number(n).toFixed(digits)}${unit}`;
}

function syncSliderDom() {
  for (const spec of SLIDERS) {
    const range = $(spec.key);
    if (!range) continue;
    range.min = String(spec.min);
    range.max = String(sliderAbsMax(spec));
    range.step = String(spec.step);
    if (spec.unit) range.dataset.unit = spec.unit;
  }
}

function writeParams(p) {
  params = mergeParams(p);
  syncSliderDom();
  for (const { key } of SLIDERS) {
    const el = $(key);
    const out = $(`${key}-out`);
    if (el) el.value = String(params[key]);
    if (out) out.textContent = fmtValue(key, params[key]);
  }
  PLUG_KEYS.forEach((key, i) => {
    const row = $(key)?.closest(".row");
    if (row) row.hidden = i >= params.usbCount;
  });
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
  const notes = warnings(params);
  const warnEl = $("warnings");
  if (warnEl) {
    warnEl.innerHTML = notes.map((n) => `<p class="warn">${n}</p>`).join("");
  }
  const sp = $("spacerReadout");
  if (sp) {
    sp.innerHTML =
      `Tooth depth from front wall: ` +
      d.teeth
        .map((t) => `<b>${t.i + 1}</b> ${t.plug > 0 ? `${t.depth.toFixed(2)} mm` : "spine only"}`)
        .join(" · ") +
      `<br />Brick stop ${d.stopH > 0 ? `<b>${d.stopDepth.toFixed(2)} mm</b> deep × ${d.stopH.toFixed(1)} mm tall` : "off"}`;
  }
  const el = $("readout");
  if (!el) return;
  const g = (v) => (result ? ((v / 1000) * 1.27).toFixed(1) : "—");
  const tris = result ? (result.baseTris + result.lidTris + result.spacerTris).toFixed(0) : "—";
  el.innerHTML = `
    Tray <b>${d.outerL.toFixed(1)} × ${d.outerW.toFixed(1)} × ${d.baseZ.toFixed(1)} mm</b>
    · lid <b>${d.lidL.toFixed(1)} × ${d.lidW.toFixed(1)} mm</b><br />
    Lid skirt fits <b>outside</b> the walls: ${d.p.lipClear.toFixed(2)} mm/side gap · nubs bite
    <b>${d.beadBite.toFixed(2)} mm</b> into ${d.grooveDepth.toFixed(2)} mm grooves<br />
    Cavity <b>${d.innerL.toFixed(1)} × ${d.innerW.toFixed(1)} × ${d.cavityZ.toFixed(1)} mm</b>
    · USB pocket <b>${formatMm(d.p.usbExtra)}</b> · rear <b>${formatMm(d.p.acExtra)}</b><br />
    PETG ~<b>${g(result?.baseVolume)} g</b> tray + <b>${g(result?.lidVolume)} g</b> lid
    + <b>${g(result?.spacerVolume)} g</b> spacer · ${tris} tris
  `;
}

function sectionAt() {
  return derive(params).outerL * 0.28;
}

function shownNow() {
  const shown = pick?.visibility() || { base: true, lid: true, spacer: true, ghosts: true };
  return {
    base: shown.base !== false,
    lid: shown.lid !== false,
    spacer: shown.spacer !== false,
    ghosts: shown.ghosts !== false,
  };
}

function applyView() {
  const v = VIEWS[partView] || VIEWS.open;
  preview?.setVisible(shownNow());
  preview?.setLidLift(v.lift);
  preview?.setSection(section ? sectionAt() : null);
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildBox(params, { quality: "preview", previewLid: true, lidGap: 0 });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    applyView();
    pick?.refresh();
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

async function downloadPart(part) {
  setStatus(`Building ${part} STL…`);
  try {
    const { stl, volume } = await buildPartStl(params, part);
    const grams = ((volume / 1000) * 1.27).toFixed(1);
    const name = part === "spacer" ? "usb-spacer" : part;
    downloadArrayBuffer(`photive-snap-box-${name}-${APP_VERSION_TAG}.stl`, stl);
    noteDownload(`photive-snap-box-${name}-${APP_VERSION_TAG}.stl`);
    setStatus(`${part} · ${stlTriangleCount(stl)} tris · ~${grams} g PETG`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function syncPresetChips() {
  const shown = shownNow();
  let matched = null;
  for (const [name, v] of Object.entries(VIEWS)) {
    if (v.base === shown.base && v.lid === shown.lid && v.spacer === shown.spacer && v.ghosts === shown.ghosts) {
      matched = name;
    }
  }
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.classList.toggle("active", !!matched && btn.getAttribute("data-part") === matched);
  });
  if (matched) partView = matched;
}

function setPartView(next) {
  partView = VIEWS[next] ? next : "open";
  const v = VIEWS[partView];
  pick?.setVisible({ base: v.base, lid: v.lid, spacer: v.spacer, ghosts: v.ghosts }, { silent: true });
  preview?.setVisible(v);
  preview?.setLidLift(v.lift);
  preview?.setSection(section ? sectionAt() : null);
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-part") === partView);
  });
}

function setSection(on) {
  section = Boolean(on);
  $("sectionBtn")?.classList.toggle("active", section);
  applyView();
}

function bind() {
  writeParams(startingParams(DEFAULT_PARAMS));
  for (const { key } of SLIDERS) {
    const el = $(key);
    if (!el) continue;
    el.addEventListener("input", () => {
      const value = Number(el.value);
      params = applySliderChange(params, key, value);
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
  $("resetView")?.addEventListener("click", () => preview.fit());
  $("dlBase")?.addEventListener("click", () => downloadPart("base"));
  $("dlLid")?.addEventListener("click", () => downloadPart("lid"));
  $("dlSpacer")?.addEventListener("click", () => downloadPart("spacer"));
  $("sectionBtn")?.addEventListener("click", () => setSection(!section));
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.addEventListener("click", () => setPartView(btn.getAttribute("data-part")));
  });
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new BoxPreview({ canvas: $("view") });
savesUi = wireHeaderSaves({
  appId: APP_ID,
  mergeParams,
  sliderKeys: SLIDER_KEYS,
  getParams: () => params,
  setParams: (p) => {
    writeParams(p);
    scheduleRebuild();
  },
});
pick = installModelPick({
  THREE,
  panel: document.querySelector(".panel"),
  canvas: $("view"),
  camera: preview.camera,
  scene: preview.scene,
  toggleHost: document.querySelector(".view-group .group-body"),
  getParts: () => [
    { id: "base", label: "Tray", objects: [{ object: preview.meshes.base, hit: "base" }, { object: preview.caps.base, hit: "base" }] },
    { id: "lid", label: "Lid", objects: [{ object: preview.meshes.lid, hit: "lid" }, { object: preview.caps.lid, hit: "lid" }] },
    { id: "spacer", label: "Spacer", objects: [{ object: preview.meshes.spacer, hit: "spacer" }, { object: preview.caps.spacer, hit: "spacer" }] },
    {
      id: "ghosts",
      label: "Charger",
      preview: true,
      objects: (preview.ghosts.children || []).map((object, i) => ({
        object,
        hit: i === 0 ? "brick" : "plug",
      })),
    },
  ],
  inspect: (hit) => inspectPhotive(hit, latest?.d || derive(params), preview.meshes.lid.position.z),
  measure: (a, b) => measurePhotive(a, b, latest?.d || derive(params), preview.meshes.lid.position.z),
  onVisible: () => {
    preview.setVisible(shownNow());
    syncPresetChips();
  },
});
window.__pick = pick;
bind();
if (!skipLibrary()) rememberVisit(APP_ID);
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => params,
  apply: (snapshot) => {
    writeParams(snapshot);
    scheduleRebuild();
  },
});
setPartView("open");
setStatus("Loading CAD…");
rebuild().catch((err) => {
  setStatus(String(err.message || err), "err");
});

window.snapBox = {
  preview,
  setPartView,
  setSection,
  derive: () => derive(params),
  ready: () => latest != null,
};
