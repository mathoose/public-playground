import { APP_NAME, APP_VERSION, DEFAULT_PARAMS, derive, fromMm, mergeParams, toMm, warnings } from "./geometry.js";
import { FramePreview } from "./preview.js";
import { buildExport, buildFrame, buildStandTest, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
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

const APP_ID = "squiggle-frame";
const TEST_LOG_KEY = "squiggle-frame-tests";
const pageSearch = new URLSearchParams(location.search);

const PRESETS = {
  "4x6": [4, 6],
  "5x7": [5, 7],
  "8x10": [8, 10],
  wallet: [2.5, 3.5],
};

function skipLibrary() {
  return pageSearch.has("capture") || pageSearch.has("shot");
}

function randomSeed() {
  return 1 + Math.floor(Math.random() * 999999999);
}

function startingParams() {
  const fallback = { ...DEFAULT_PARAMS };
  const saved = skipLibrary() || !wantsRestore() ? null : lastSettings(APP_ID);
  const base = mergeParams(saved || fallback);
  if (!saved && !skipLibrary()) base.seed = randomSeed();
  if (pageSearch.has("seed")) base.seed = Number(pageSearch.get("seed")) || base.seed;
  const mode = pageSearch.get("mode");
  if (mode === "wall" || mode === "stand") base.mode = mode;
  return mergeParams(base);
}

function noteDownload(filename) {
  rememberSettings(APP_ID, params);
  rememberExport(APP_ID, { filename, params });
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

const $ = (id) => document.getElementById(id);

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function writeParams(p) {
  params = mergeParams(p);
  const tube = $("tube");
  const tubeOut = $("tube-out");
  if (tube) tube.value = String(params.tube);
  if (tubeOut) tubeOut.textContent = `${params.tube.toFixed(1)} mm`;
  const standAngle = $("standAngle");
  const standAngleOut = $("standAngle-out");
  const standWidth = $("standWidth");
  const standWidthOut = $("standWidth-out");
  if (standAngle) standAngle.value = String(params.standAngle);
  if (standAngleOut) standAngleOut.textContent = `${params.standAngle}°`;
  if (standWidth) standWidth.value = String(params.standWidth);
  if (standWidthOut) standWidthOut.textContent = `${params.standWidth} mm`;
  const unit = params.units;
  const min = unit === "mm" ? 20 : 0.8;
  const step = unit === "mm" ? 0.1 : 0.01;
  for (const id of ["photoW", "photoH"]) {
    const el = $(id);
    if (!el) continue;
    el.min = String(min);
    el.max = String(unit === "mm" ? 400 : 16);
    el.step = String(step);
    if (document.activeElement !== el) {
      const digits = unit === "mm" ? 1 : 2;
      el.value = Number(params[id]).toFixed(digits);
    }
  }
  const unitW = $("unitW");
  const unitH = $("unitH");
  if (unitW) unitW.textContent = unit;
  if (unitH) unitH.textContent = unit;
  const units = $("units");
  if (units) units.value = unit;
  document.querySelectorAll("[data-mode]").forEach((btn) => {
    const on = btn.getAttribute("data-mode") === params.mode;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", on ? "true" : "false");
  });
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    const [w, h] = PRESETS[btn.getAttribute("data-preset")] || [];
    const pw = fromMm(toMm(w, "in"), unit);
    const ph = fromMm(toMm(h, "in"), unit);
    const on = Math.abs(params.photoW - pw) < 0.05 && Math.abs(params.photoH - ph) < 0.05;
    btn.classList.toggle("active", on);
  });
  const pegsBtn = $("dlPegs");
  if (pegsBtn) pegsBtn.hidden = params.mode !== "stand";
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout(result) {
  const d = result?.d || derive(params, "preview");
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(d).map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  const grams = result ? ((result.volume / 1000) * 1.24).toFixed(0) : "—";
  const spanX = d.bounds.maxX - d.bounds.minX;
  const spanY = d.bounds.maxY - d.bounds.minY;
  const modeLine =
    d.p.mode === "stand"
      ? `Stand · two Ø${d.peg.holeD.toFixed(1)} mm holes · pegs Ø${d.peg.pegD.toFixed(1)} × ${d.peg.legLen.toFixed(0)} mm`
      : "Wall · flat back";
  el.innerHTML = `
    Photo <b>${d.photoW.toFixed(0)} × ${d.photoH.toFixed(0)} mm</b><br />
    Squiggle about <b>${spanX.toFixed(0)} × ${spanY.toFixed(0)} mm</b>, tube <b>${d.p.tube.toFixed(1)} mm</b>, <b>${d.clips.length}</b> clips<br />
    Carrot slot <b>${d.stand.slotW.toFixed(1)} × ${d.stand.slotH.toFixed(1)} mm</b> · leg <b>${d.stand.angle}°</b> · width <b>${d.stand.width} mm</b><br />
    ${modeLine}<br />
    Pattern <b>${d.p.seed}</b> · PLA ~<b>${grams} g</b>
  `;
}

function renderTestLog() {
  const el = $("testLog");
  if (!el) return;
  const list = readTestLog();
  if (!list.length) {
    el.hidden = true;
    el.innerHTML = "";
    return;
  }
  el.hidden = false;
  el.innerHTML = list
    .map(
      (item, index) => `
        <li>
          <span>${item.angle}° · ${item.width} mm · ${item.filename || "stand test"}</span>
          <button type="button" data-load-test="${index}">Load</button>
        </li>`
    )
    .join("");
}

async function rebuild({ quiet = false } = {}) {
  const gen = ++rebuildGen;
  if (!quiet) setStatus("Updating…");
  try {
    const result = await buildFrame(params, { quality: "preview" });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    renderReadout(result);
    if (!quiet) setStatus("Live");
    document.body.dataset.ready = "1";
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function previewIsCurrent() {
  if (!latest) return false;
  const built = latest.d.p;
  const samePhoto =
    Math.abs(toMm(built.photoW, built.units) - toMm(params.photoW, params.units)) < 0.2 &&
    Math.abs(toMm(built.photoH, built.units) - toMm(params.photoH, params.units)) < 0.2;
  return (
    built.seed === params.seed &&
    built.tube === params.tube &&
    built.mode === params.mode &&
    built.standAngle === params.standAngle &&
    built.standWidth === params.standWidth &&
    samePhoto
  );
}

function scheduleRebuild() {
  renderReadout(previewIsCurrent() ? latest : null);
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(() => rebuild(), 70);
}

function fileStem() {
  const w = Math.round(toMm(params.photoW, params.units));
  const h = Math.round(toMm(params.photoH, params.units));
  return `squiggle-frame-${w}x${h}mm-${params.mode}-s${params.seed}`;
}

async function download3mf() {
  setStatus("Building 3MF…");
  try {
    const built = await buildExport(params);
    const filename = `${fileStem()}.3mf`;
    downloadArrayBuffer(filename, built.threemf, "model/3mf");
    noteDownload(filename);
    const parts = built.parts.pegs ? "frame, stand, and pegs" : "frame and stand";
    setStatus(`3MF · one assembly · ${parts} · ${Math.round(built.tris)} tris`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function askTestSettings() {
  const dialog = $("testPrompt");
  if (!dialog || typeof dialog.showModal !== "function") return Promise.resolve(null);
  const angle = dialog.querySelector("[name=angle]");
  const width = dialog.querySelector("[name=width]");
  if (angle) angle.value = String(params.standAngle);
  if (width) width.value = String(params.standWidth);
  dialog.showModal();
  return new Promise((resolve) => {
    const finish = () => {
      dialog.removeEventListener("close", finish);
      if (dialog.returnValue !== "ok") {
        resolve(null);
        return;
      }
      resolve({
        standAngle: Number(angle?.value),
        standWidth: Number(width?.value),
      });
    };
    dialog.addEventListener("close", finish);
  });
}

async function downloadStandTest() {
  const chosen = await askTestSettings();
  if (!chosen) {
    setStatus("Stand test canceled.");
    return;
  }
  params = mergeParams({ ...params, ...chosen });
  writeParams(params);
  window.clearTimeout(rebuildTimer);
  rebuildGen += 1;
  setStatus("Building stand test…");
  try {
    const built = await buildStandTest(params);
    const filename = `squiggle-stand-test-a${built.angle}-w${built.width}.stl`;
    downloadArrayBuffer(filename, built.stl);
    appendTestLog({
      at: Date.now(),
      filename,
      angle: built.angle,
      width: built.width,
      params: { ...params },
    });
    rememberSettings(APP_ID, params);
    rememberExport(APP_ID, { filename, params });
    renderTestLog();
    setStatus(`Stand test · ${built.angle}° · ${built.width} mm · engraved on the piece`);
    await rebuild({ quiet: true });
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function loadTest(index) {
  const item = readTestLog()[index];
  if (!item?.params) return;
  params = mergeParams(item.params);
  writeParams(params);
  preview.fitted = false;
  rememberSettings(APP_ID, params);
  setStatus(`Loaded stand test ${item.angle}° · ${item.width} mm`);
  window.clearTimeout(rebuildTimer);
  rebuild({ quiet: true });
}

async function downloadPart(part) {
  const labels = { pegs: "Building pegs STL…", stand: "Building stand STL…", frame: "Building frame STL…" };
  setStatus(labels[part] || "Building STL…");
  try {
    const built = await buildExport(params);
    const piece = built.stls[part];
    if (!piece) {
      setStatus("Pegs are only in stand mode.", "err");
      return;
    }
    const filename = `${fileStem()}-${part}.stl`;
    downloadArrayBuffer(filename, piece);
    noteDownload(filename);
    const volume = built.parts[part].volume;
    const grams = ((volume / 1000) * 1.24).toFixed(1);
    setStatus(`${part} · ${stlTriangleCount(piece)} tris · ~${grams} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bind() {
  writeParams(startingParams());
  $("tube")?.addEventListener("input", () => {
    params = mergeParams({ ...params, tube: Number($("tube").value) });
    const out = $("tube-out");
    if (out) out.textContent = `${params.tube.toFixed(1)} mm`;
    scheduleRebuild();
  });
  $("standAngle")?.addEventListener("input", () => {
    params = mergeParams({ ...params, standAngle: Number($("standAngle").value) });
    const out = $("standAngle-out");
    if (out) out.textContent = `${params.standAngle}°`;
    scheduleRebuild();
  });
  $("standWidth")?.addEventListener("input", () => {
    params = mergeParams({ ...params, standWidth: Number($("standWidth").value) });
    const out = $("standWidth-out");
    if (out) out.textContent = `${params.standWidth} mm`;
    scheduleRebuild();
  });
  for (const id of ["photoW", "photoH"]) {
    $(id)?.addEventListener("input", () => {
      const value = Number($(id).value);
      if (!Number.isFinite(value)) return;
      params = mergeParams({ ...params, [id]: value });
      scheduleRebuild();
    });
    $(id)?.addEventListener("change", () => writeParams(params));
  }
  $("units")?.addEventListener("change", () => {
    const next = $("units").value === "mm" ? "mm" : "in";
    if (next === params.units) return;
    const photoW = fromMm(toMm(params.photoW, params.units), next);
    const photoH = fromMm(toMm(params.photoH, params.units), next);
    params = mergeParams({ ...params, units: next, photoW, photoH });
    writeParams(params);
    scheduleRebuild();
  });
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const [w, h] = PRESETS[btn.getAttribute("data-preset")];
      params = mergeParams({
        ...params,
        photoW: fromMm(toMm(w, "in"), params.units),
        photoH: fromMm(toMm(h, "in"), params.units),
      });
      writeParams(params);
      preview.fitted = false;
      scheduleRebuild();
    });
  });
  $("rotate")?.addEventListener("click", () => {
    params = mergeParams({ ...params, photoW: params.photoH, photoH: params.photoW });
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("newSquiggle")?.addEventListener("click", () => {
    params = mergeParams({ ...params, seed: randomSeed() });
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  document.querySelectorAll("[data-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.getAttribute("data-mode");
      if (params.mode === mode) return;
      params = mergeParams({ ...params, mode });
      writeParams(params);
      preview.fitted = false;
      scheduleRebuild();
    });
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-view]").forEach((b) => b.classList.toggle("active", b === btn));
      preview.setNamedView(btn.getAttribute("data-view"));
    });
  });
  $("dlFrame")?.addEventListener("click", () => downloadPart("frame"));
  $("dlStand")?.addEventListener("click", () => downloadPart("stand"));
  $("dlPegs")?.addEventListener("click", () => downloadPart("pegs"));
  $("dl3mf")?.addEventListener("click", () => download3mf());
  $("dlStandTest")?.addEventListener("click", () => downloadStandTest());
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

preview = new FramePreview({ canvas: $("view") });
wireHeaderSaves({
  appId: APP_ID,
  mergeParams,
  sliderKeys: ["units", "photoW", "photoH", "tube", "mode", "seed", "standAngle", "standWidth"],
  getParams: () => params,
  setParams: (next) => {
    const merged = mergeParams(next);
    const refit =
      merged.mode !== params.mode ||
      merged.seed !== params.seed ||
      Math.abs(merged.photoW - params.photoW) > 0.05 ||
      Math.abs(merged.photoH - params.photoH) > 0.05;
    writeParams(merged);
    if (refit) preview.fitted = false;
    scheduleRebuild();
  },
});
bind();
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => ({ ...params }),
  apply: (snapshot) => {
    const refit = snapshot.mode !== params.mode || snapshot.seed !== params.seed;
    writeParams(snapshot);
    if (refit) preview.fitted = false;
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
  const name = shot === "1" || shot === "capture" ? "angle" : shot;
  preview.setNamedView(name);
  document.body.dataset.ready = "1";
});
