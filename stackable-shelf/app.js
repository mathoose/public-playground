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
import { buildShelf, buildSocketTest, downloadArrayBuffer, stlTriangleCount } from "./cad.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";
import {
  LIBRARY_STORE_KEY,
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

function readLibraryStore() {
  try {
    const data = JSON.parse(localStorage.getItem(LIBRARY_STORE_KEY));
    if (!data || typeof data !== "object") return { favorites: [], activity: [], settings: {} };
    if (!data.settings || typeof data.settings !== "object") data.settings = {};
    return data;
  } catch {
    return { favorites: [], activity: [], settings: {} };
  }
}

function readTestLog() {
  const list = readLibraryStore().settings[TEST_LOG_KEY];
  return Array.isArray(list) ? list : [];
}

function appendTestLog(entry) {
  const data = readLibraryStore();
  const list = Array.isArray(data.settings[TEST_LOG_KEY]) ? data.settings[TEST_LOG_KEY] : [];
  list.unshift(entry);
  data.settings[TEST_LOG_KEY] = list.slice(0, 12);
  try {
    localStorage.setItem(LIBRARY_STORE_KEY, JSON.stringify(data));
  } catch {
    /* the download still happened */
  }
}

const SAVE_KEYS = [...SLIDERS.map((spec) => spec.key), "pattern", "fit", "chamfer"];
const TEST_LOG_KEY = "stackable-shelf-tests";

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
  document.querySelectorAll("[data-chamfer]").forEach((btn) => {
    const on = (btn.getAttribute("data-chamfer") === "on") === params.chamfer;
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
    ? `Twist lock · fins <b>${fmt(d.twist.hookHeight)} mm</b> thick · <b>${fmt(d.twist.gap, 2)} mm</b> clear under the catch · ears ${fmt(d.twist.hookRadial)} mm out`
    : `Press fit · mouth <b>${fmt(d.mouthFlat)} mm</b>, floor <b>${fmt(d.floorFlat)} mm</b> (${fmt(d.p.holeOffset, 2)} mm each side) · ${fmt(d.socketDepth)} mm deep · chamfer ${d.p.chamfer ? "on" : "off"}`;
  $("readout").innerHTML = `
    Shelf <b>${fmt(d.p.shelfLength, 0)} × ${fmt(d.p.shelfWidth, 0)} × ${fmt(d.p.thickness)} mm</b><br />
    ${shape[0].toUpperCase()}${shape.slice(1)} <b>${d.countUsed}</b> along the length, <b>${d.rows}</b> ${d.rows === 1 ? "row" : "rows"} · ${fmt(d.cellFlat)} mm across · walls ${fmt(d.wall)} mm · outside wall ${fmt(d.p.outerWall)} mm<br />
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

async function rebuild({ quiet = false } = {}) {
  const gen = ++rebuildGen;
  if (!quiet) setStatus("Updating…");
  try {
    const result = await buildShelf(params);
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    renderReadout(result);
    if (!quiet) setStatus("Live");
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function askTestSettings() {
  const dialog = $("testPrompt");
  if (!dialog || typeof dialog.showModal !== "function") return Promise.resolve(null);
  const offset = dialog.querySelector("[name=holeOffset]");
  const depth = dialog.querySelector("[name=holeDepth]");
  const fin = dialog.querySelector("[name=finThickness]");
  const chamfer = dialog.querySelector("[name=chamfer]");
  if (offset) offset.value = String(params.holeOffset);
  if (depth) depth.value = String(params.holeDepth);
  if (fin) fin.value = String(params.finThickness);
  if (chamfer) chamfer.value = params.chamfer ? "on" : "off";
  dialog.showModal();
  return new Promise((resolve) => {
    const finish = () => {
      dialog.removeEventListener("close", finish);
      if (dialog.returnValue !== "ok") {
        resolve(null);
        return;
      }
      resolve({
        holeOffset: Number(offset?.value),
        holeDepth: Number(depth?.value),
        finThickness: Number(fin?.value),
        chamfer: chamfer?.value !== "off",
      });
    };
    dialog.addEventListener("close", finish);
  });
}

function testLogLabel(item) {
  const fit = item.params?.fit === "press" ? "press" : "twist";
  const chamfer = item.params?.chamfer === false ? "chamfer off" : "chamfer on";
  return `${item.lines.join(" · ")} · ${fit} · ${chamfer}`;
}

function renderTestLog() {
  const el = $("testLog");
  if (!el) return;
  const list = readTestLog();
  if (!list.length) {
    el.hidden = true;
    el.replaceChildren();
    return;
  }
  el.hidden = false;
  el.innerHTML = list
    .map(
      (item, index) => `
        <li>
          <span>${testLogLabel(item)}</span>
          <button type="button" data-load-test="${index}">Load</button>
        </li>`
    )
    .join("");
}

function loadTest(index) {
  const item = readTestLog()[index];
  if (!item?.params) return;
  params = mergeParams(item.params);
  writeParams(params);
  preview.fitted = false;
  rememberSettings(APP_ID, params);
  setStatus(`Loaded socket test ${testLogLabel(item)}`);
  scheduleRebuild();
}

async function downloadSocketTest() {
  const chosen = await askTestSettings();
  if (!chosen) {
    setStatus("Socket test canceled.");
    return;
  }
  params = mergeParams({ ...params, ...chosen });
  writeParams(params);
  window.clearTimeout(rebuildTimer);
  rebuildGen += 1;
  setStatus("Building socket test…");
  try {
    const built = await buildSocketTest(params);
    const filename = FILES.test;
    downloadArrayBuffer(filename, built.stl);
    appendTestLog({
      at: Date.now(),
      filename,
      lines: built.lines,
      params: { ...params },
    });
    noteDownload(filename);
    renderTestLog();
    await rebuild({ quiet: true });
    setStatus(`Socket test · ${built.lines.join(" · ")} · engraved on the piece`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

async function downloadKind(kind) {
  if (kind === "test") {
    await downloadSocketTest();
    return;
  }
  const names = {
    flat: FILES.flat,
    legs: FILES.legs,
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
  return SLIDERS.every((spec) => a[spec.key] === b[spec.key]) && a.pattern === b.pattern && a.fit === b.fit && a.chamfer === b.chamfer;
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
  document.querySelectorAll("[data-chamfer]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const chamfer = btn.getAttribute("data-chamfer") === "on";
      if (params.chamfer === chamfer) return;
      params = mergeParams({ ...params, chamfer });
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
  $("testLog")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-load-test]");
    if (!button) return;
    loadTest(Number(button.getAttribute("data-load-test")));
  });
  renderTestLog();
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
