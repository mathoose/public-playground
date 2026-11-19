import {
  APP_ID,
  APP_NAME,
  APP_VERSION,
  DEFAULT_PARAMS,
  FILES,
  SLIDERS,
  applySliderChange,
  derive,
  mergeParams,
  patternNoun,
} from "./geometry.js";
import { ShelfPreview } from "./preview.js";
import { buildShelf, downloadArrayBuffer, stlTriangleCount } from "./cad.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  lastSettings,
  rememberExport,
  rememberSettings,
  rememberVisit,
  wantsRestore,
} from "../shared/library-activity.js";
import { wireHeaderSaves } from "../shared/wire-designer.js";

const pageSearch = new URLSearchParams(location.search);
const $ = (id) => document.getElementById(id);

function skipLibrary() {
  return pageSearch.has("capture") || pageSearch.has("shot");
}

function startingParams() {
  const base = skipLibrary() || !wantsRestore() ? DEFAULT_PARAMS : lastSettings(APP_ID) || DEFAULT_PARAMS;
  const pattern = pageSearch.get("pattern");
  const fit = pageSearch.get("fit");
  if (skipLibrary() && (pattern === "square" || pattern === "hex" || fit === "press" || fit === "twist")) {
    const extra = {};
    if (pattern === "square" || pattern === "hex") extra.pattern = pattern;
    if (fit === "press" || fit === "twist") extra.fit = fit;
    for (const spec of SLIDERS) {
      const raw = pageSearch.get(spec.key);
      if (raw != null && raw !== "") extra[spec.key] = Number(raw);
    }
    return mergeParams({ ...base, ...extra });
  }
  if (fit === "press" || fit === "twist") return mergeParams({ ...base, fit });
  return mergeParams(base);
}

function noteDownload(filename) {
  rememberSettings(APP_ID, params);
  rememberExport(APP_ID, { filename, params });
  savesUi?.noteDownload({ name: filename, params });
}

const SAVE_KEYS = [...SLIDERS.map((spec) => spec.key), "pattern", "fit"];

let params = mergeParams(DEFAULT_PARAMS);
let preview;
let savesUi;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmt(n, digits = 1) {
  return Number(n).toFixed(digits);
}

function writeParams(next) {
  params = mergeParams(next);
  for (const spec of SLIDERS) {
    const el = $(spec.key);
    const out = $(`${spec.key}-out`);
    if (el) el.value = String(params[spec.key]);
    if (out) {
      const digits = spec.step >= 1 ? 0 : spec.step < 0.1 ? 2 : 1;
      out.textContent = spec.unit ? `${Number(params[spec.key]).toFixed(digits)} ${spec.unit}` : String(params[spec.key]);
    }
  }
  document.querySelectorAll("[data-pattern]").forEach((btn) => {
    const on = btn.getAttribute("data-pattern") === params.pattern;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
  document.querySelectorAll("[data-fit]").forEach((btn) => {
    const on = btn.getAttribute("data-fit") === params.fit;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
  const noun = patternNoun(params.pattern);
  const countLabel = $("count-label");
  if (countLabel) countLabel.textContent = `Number of ${noun}`;
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
  $("warnings").innerHTML = d.warnings.map((note) => `<p class="warn">${note}</p>`).join("");
  const grams = (volume) => (result ? ((volume / 1000) * 1.27).toFixed(1) : "—");
  const shape = patternNoun(d.p.pattern);
  const seat = d.twist
    ? `Twist lock · ears <b>${fmt(d.twist.hookRadial)} mm</b> out · <b>${fmt(d.twist.gap, 2)} mm</b> clear under the catch · socket ${fmt(d.socketDepth)} mm deep`
    : `Press fit · mouth <b>${fmt(d.mouthFlat)} mm</b>, floor <b>${fmt(d.floorFlat)} mm</b> (${fmt(d.p.holeOffset, 2)} mm each side) · ${fmt(d.socketDepth)} mm deep`;
  $("readout").innerHTML = `
    Shelf <b>${fmt(d.p.shelfLength, 0)} × ${fmt(d.p.shelfWidth, 0)} × ${fmt(d.p.thickness)} mm</b><br />
    ${shape[0].toUpperCase()}${shape.slice(1)} <b>${d.countUsed}</b> along the length, <b>${d.rows}</b> ${d.rows === 1 ? "row" : "rows"} · ${fmt(d.cellFlat)} mm across · walls ${fmt(d.wall)} mm<br />
    Hexagonal legs <b>${fmt(d.legFlat, 0)} mm</b> across · clear height ${fmt(d.p.legLength, 0)} mm · printed ${fmt(d.printedLeg)} mm<br />
    ${seat}<br />
    Socket test <b>${fmt(d.coupon.size)} mm</b> corner, one socket<br />
    PETG ~<b>${grams(result?.flat.volume)} g</b> flat + <b>${grams(result?.legs.volume)} g</b> legs
  `;
}

function scheduleRebuild() {
  renderReadout(latest);
  window.clearTimeout(rebuildTimer);
  setStatus("Updating…");
  rebuildTimer = window.setTimeout(rebuild, 80);
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildShelf(params);
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

async function downloadKind(kind) {
  const names = {
    flat: FILES.flat,
    legs: FILES.legs,
    test: FILES.test,
    "3mf": FILES.assembly,
  };
  const filename = names[kind];
  setStatus(`Building ${filename}…`);
  try {
    const built = latest && sameParams(latest.d.p, params) ? latest : await buildShelf(params);
    latest = built;
    preview.update(built);
    if (kind === "3mf") downloadArrayBuffer(filename, built.threemf, "model/3mf");
    else downloadArrayBuffer(filename, built.stl[kind]);
    noteDownload(filename);
    const tris = kind === "3mf" ? "" : ` · ${stlTriangleCount(built.stl[kind])} tris`;
    setStatus(`Downloaded ${filename}${tris}`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function sameParams(a, b) {
  return SLIDERS.every((spec) => a[spec.key] === b[spec.key]) && a.pattern === b.pattern && a.fit === b.fit;
}

function bind() {
  writeParams(startingParams());
  for (const spec of SLIDERS) {
    const el = $(spec.key);
    if (!el) continue;
    el.addEventListener("input", () => {
      params = applySliderChange(params, spec.key, Number(el.value));
      writeParams(params);
      scheduleRebuild();
    });
  }
  document.querySelectorAll("[data-pattern]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const pattern = btn.getAttribute("data-pattern");
      if (params.pattern === pattern) return;
      params = mergeParams({ ...params, pattern });
      writeParams(params);
      scheduleRebuild();
    });
  });
  document.querySelectorAll("[data-fit]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const fit = btn.getAttribute("data-fit");
      if (params.fit === fit) return;
      params = mergeParams({ ...params, fit });
      writeParams(params);
      scheduleRebuild();
    });
  });
  $("reset")?.addEventListener("click", () => {
    writeParams(DEFAULT_PARAMS);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach((other) => {
        other.classList.toggle("active", other === btn);
      });
      preview.setNamedView(btn.getAttribute("data-view"));
    });
  });
  document.querySelectorAll("[data-download]").forEach((btn) => {
    btn.addEventListener("click", () => downloadKind(btn.getAttribute("data-download")));
  });
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;
const headerVersion = $("header-version");
if (headerVersion) headerVersion.textContent = `v${APP_VERSION}`;

preview = new ShelfPreview({ canvas: $("view") });
savesUi = wireHeaderSaves({
  appId: APP_ID,
  mergeParams,
  sliderKeys: SAVE_KEYS,
  getParams: () => params,
  setParams: (next) => {
    writeParams(next);
    scheduleRebuild();
  },
});
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

rebuild().then(() => {
  if (!shot) return;
  preview.setNamedView(shot === "1" ? "stack" : shot, latest?.d);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.dataset.ready = "1";
    });
  });
});
