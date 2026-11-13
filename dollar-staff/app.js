import {
  APP_NAME,
  APP_VERSION,
  DEFAULT_PARAMS,
  SLIDERS,
  derive,
  fileName,
  mergeParams,
  warnings,
} from "./geometry.js";
import { StaffPreview } from "./preview.js";
import { buildDollar, buildExports, downloadArrayBuffer, stlTriangleCount } from "./cad.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import { lastSettings, rememberExport, rememberSettings, rememberVisit, wantsRestore } from "../shared/library-activity.js";

const APP_ID = "dollar-staff";
const pageSearch = new URLSearchParams(location.search);
const PLA = 1.24;

const VIEWS = {
  closed: { front: true, back: true, sign: true, slide: 0, lid: 0 },
  apart: { front: true, back: true, sign: true, slide: 42, lid: 16 },
  case: { front: true, back: true, sign: false, slide: 0, lid: 16 },
  sign: { front: false, back: false, sign: true, slide: 0, lid: 0 },
};

function skipLibrary() {
  return pageSearch.has("capture") || pageSearch.has("shot");
}

function startingParams() {
  const base = skipLibrary() || !wantsRestore() ? DEFAULT_PARAMS : lastSettings(APP_ID) || DEFAULT_PARAMS;
  return mergeParams(base);
}

const $ = (id) => document.getElementById(id);

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;
let partView = "closed";

function fmtValue(spec, n) {
  const digits = spec.step >= 1 ? 0 : spec.step < 0.1 ? 2 : 1;
  return `${Number(n).toFixed(digits)}${spec.unit ? ` ${spec.unit}` : ""}`;
}

function renderRows() {
  for (const spec of SLIDERS) {
    const host = $(`g-${spec.group}`);
    if (!host) continue;
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <label for="${spec.key}">${spec.label}</label>
      <output id="${spec.key}-out"></output>
      <input id="${spec.key}" type="range" min="${spec.min}" max="${spec.max}" step="${spec.step}" value="${DEFAULT_PARAMS[spec.key]}"${spec.unit ? ` data-unit="${spec.unit}"` : ""} />`;
    host.appendChild(row);
  }
}

function writeParams(p) {
  params = mergeParams(p);
  for (const spec of SLIDERS) {
    const el = $(spec.key);
    const out = $(`${spec.key}-out`);
    if (el) el.value = String(params[spec.key]);
    if (out) out.textContent = fmtValue(spec, params[spec.key]);
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
  const volume = result ? result.frontVolume + result.backVolume + result.signVolume : 0;
  const grams = result ? ((volume / 1000) * PLA).toFixed(0) : "—";
  el.innerHTML = `
    Solid $ <b>${d.loopW.toFixed(0)} × ${d.barH.toFixed(0)} mm</b>, center bar <b>${d.barW.toFixed(1)} mm</b>, about <b>${d.totalH.toFixed(0)} mm</b> tall<br />
    Card pocket <b>${d.pocketZ.toFixed(2)} × ${d.pocketY.toFixed(2)} × ${d.pocketX.toFixed(2)} mm</b>
    — edge-on to the S, long side vertical, ISO card + ${d.p.clearance.toFixed(2)} mm each side<br />
    Dovetail <b>${d.neck.toFixed(1)} → ${d.tip.toFixed(1)} mm</b> · slides down the bar<br />
    Socket <b>3/4″-5 ACME</b> · minor ID <b>${d.threadID.toFixed(2)} mm</b> · pitch <b>${d.pitch.toFixed(2)} mm</b> · <b>${d.p.engage.toFixed(0)} mm</b> engagement<br />
    Case front + case back + dollar sign · PLA ~<b>${grams} g</b>
  `;
}

function applyView() {
  const view = VIEWS[partView] || VIEWS.closed;
  preview.setShow({ front: view.front, back: view.back, sign: view.sign });
  preview.setPose(view.slide, view.lid);
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildDollar(params, { quality: "preview" });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    applyView();
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
  setStatus("Updating…");
  rebuildTimer = window.setTimeout(rebuild, 80);
}

function noteDownload(filename) {
  if (skipLibrary()) return;
  rememberSettings(APP_ID, params);
  rememberExport(APP_ID, { filename, params });
}

async function downloadPart(part) {
  setStatus(`Building ${part} STL…`);
  await new Promise((r) => setTimeout(r, 30));
  try {
    const built = await buildExports(params);
    const stl = part === "front" ? built.frontStl : part === "back" ? built.backStl : built.signStl;
    const filename = fileName(part);
    downloadArrayBuffer(filename, stl);
    noteDownload(filename);
    const volume = part === "front" ? built.frontVolume : part === "back" ? built.backVolume : built.signVolume;
    setStatus(`${filename} · ${stlTriangleCount(stl)} tris · ~${((volume / 1000) * PLA).toFixed(1)} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

async function download3mf() {
  setStatus("Building 3MF…");
  try {
    const built = await buildExports(params);
    const filename = fileName("3mf");
    downloadArrayBuffer(filename, built.threemf, "model/3mf");
    noteDownload(filename);
    setStatus(`${filename} · one assembly · case front, case back, and dollar sign`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bind() {
  renderRows();
  writeParams(startingParams());
  for (const { key } of SLIDERS) {
    $(key)?.addEventListener("input", () => {
      writeParams({ ...params, [key]: Number($(key).value) });
      scheduleRebuild();
    });
  }
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.addEventListener("click", () => {
      partView = btn.getAttribute("data-part");
      document.querySelectorAll("[data-part]").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      applyView();
    });
  });
  $("showCard")?.addEventListener("click", () => {
    const on = !$("showCard").classList.contains("active");
    $("showCard").classList.toggle("active", on);
    $("showCard").setAttribute("aria-pressed", on ? "true" : "false");
    preview.setShow({ card: on });
  });
  $("showBed")?.addEventListener("click", () => {
    const on = !$("showBed").classList.contains("active");
    $("showBed").classList.toggle("active", on);
    $("showBed").setAttribute("aria-pressed", on ? "true" : "false");
    preview.setShow({ bed: on });
  });
  $("reset")?.addEventListener("click", () => {
    writeParams(DEFAULT_PARAMS);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  $("dlFront")?.addEventListener("click", () => downloadPart("front"));
  $("dlBack")?.addEventListener("click", () => downloadPart("back"));
  $("dlSign")?.addEventListener("click", () => downloadPart("sign"));
  $("dl3mf")?.addEventListener("click", () => download3mf());
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;
const headerVersion = $("header-version");
if (headerVersion) headerVersion.textContent = `v${APP_VERSION}`;

preview = new StaffPreview({ canvas: $("view") });
bind();
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => ({ ...params }),
  apply: (snapshot) => {
    writeParams(snapshot);
    scheduleRebuild();
  },
});

if (!skipLibrary()) rememberVisit(APP_ID);

const shot = pageSearch.get("shot") || pageSearch.get("capture");
if (shot) {
  document.body.classList.add("capture");
  preview.renderer.setPixelRatio(2);
}

window.dollarStaff = {
  preview,
  derive: () => derive(params),
  ready: () => latest != null,
};

rebuild().then(() => {
  if (shot === "edge" || shot === "dovetail") {
    preview.setShow({ front: true, back: true, sign: true, card: true });
    preview.setPose(8, 20);
    preview.setNamedView("edge");
  } else if (shot === "apart") {
    partView = "apart";
    applyView();
    preview.setNamedView("iso");
  } else if (shot) {
    preview.setNamedView(shot === "1" ? "iso" : shot);
  }
});
