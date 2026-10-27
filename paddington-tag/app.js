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
import { TagPreview } from "./preview.js";
import { buildTag, buildTagStls, downloadArrayBuffer, stlTriangleCount } from "./stl.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";

const $ = (id) => document.getElementById(id);

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmtValue(key, n) {
  if (key === "letterShift") {
    const v = Number(n);
    if (Math.abs(v) < 0.05) return "at the photo";
    const mag = Math.abs(v).toFixed(1);
    return v > 0 ? `up ${mag}` : `down ${mag}`;
  }
  const spec = SLIDERS.find((s) => s.key === key);
  const step = spec?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  const unit = spec?.unit ?? "mm";
  return `${Number(n).toFixed(digits)} ${unit}`;
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
}

function setStatus(text, kind = "") {
  const el = $("status");
  if (!el) return;
  el.textContent = text;
  el.dataset.kind = kind;
}

function renderReadout(result) {
  const d = derive(params);
  const warnEl = $("warnings");
  if (warnEl) warnEl.innerHTML = warnings(params).map((n) => `<p class="warn">${n}</p>`).join("");
  const el = $("readout");
  if (!el) return;
  const grams = result ? ((result.volume / 1000) * 1.24).toFixed(1) : "—";
  const tris = result ? Math.round(result.tris) : "—";
  el.innerHTML = `
    Tag <b>${d.width.toFixed(1)} × ${d.height.toFixed(1)} × ${d.totalH.toFixed(2)} mm</b>
    (plate ${d.p.thickness.toFixed(1)} + letters ${d.p.letterH.toFixed(2)}, size ${d.p.letterSize.toFixed(0)}%, shift ${d.p.letterShift.toFixed(1)} mm)<br />
    Hole <b>${d.p.hole.toFixed(1)} mm</b> at the top, ${ (d.height - d.holeY - d.p.hole / 2).toFixed(1) } mm of plastic above it<br />
    Three colors · paper body / letters / brown ring · flat on the bed · PLA ~<b>${grams} g</b> · ${tris} tris
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildTag(params, { quality: "preview" });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
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
  rebuildTimer = window.setTimeout(() => rebuild(), 40);
}

async function download3mf() {
  setStatus("Building 3MF…");
  try {
    const built = await buildTagStls(params);
    const h = params.height.toFixed(0);
    downloadArrayBuffer(
      `paddington-tag-${APP_VERSION_TAG}-${h}mm.3mf`,
      built.threemf,
      "model/3mf"
    );
    setStatus(`3MF · one assembly · body, letters, ring · ${Math.round(built.tris)} tris`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

async function downloadPart(part) {
  setStatus(`Building ${part} STL…`);
  try {
    const built = await buildTagStls(params);
    const piece = built.parts[part];
    const h = params.height.toFixed(0);
    downloadArrayBuffer(`paddington-tag-${APP_VERSION_TAG}-${part}-${h}mm.stl`, piece.stl);
    const grams = ((piece.volume / 1000) * 1.24).toFixed(1);
    setStatus(`${part} · ${stlTriangleCount(piece.stl)} tris · ~${grams} g PLA`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function bindShow() {
  const map = [
    ["showLetters", "letters"],
    ["showRing", "ring"],
    ["showCord", "cord"],
    ["showBed", "bed"],
  ];
  for (const [id, key] of map) {
    const btn = $(id);
    if (!btn) continue;
    btn.addEventListener("click", () => {
      const on = !btn.classList.contains("active");
      btn.classList.toggle("active", on);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      preview.setShow({ [key]: on });
    });
  }
}

function bind() {
  writeParams(DEFAULT_PARAMS);
  for (const { key } of SLIDERS) {
    const el = $(key);
    if (!el) continue;
    el.addEventListener("input", () => {
      params = applySliderChange(params, key, Number(el.value));
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
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => preview.setNamedView(btn.getAttribute("data-view")));
  });
  document.querySelectorAll("[data-download]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const kind = btn.getAttribute("data-download");
      if (kind === "3mf") download3mf();
      else downloadPart(kind);
    });
  });
  bindShow();
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new TagPreview({ canvas: $("view") });
window.__tagPreview = preview;
bind();
pairSlidersWithNumbers(document.querySelector(".panel"));
installUndo({
  panel: document.querySelector(".panel"),
  read: () => {
    const { height, hole, letterSize, letterShift, letterH, thickness } = params;
    return { height, hole, letterSize, letterShift, letterH, thickness };
  },
  apply: (snapshot) => {
    writeParams(snapshot);
    scheduleRebuild();
  },
});

const capture = new URLSearchParams(location.search).get("capture");
if (capture) {
  document.body.classList.add("capture");
  preview.renderer.setPixelRatio(2);
  if (capture === "letters") preview.setShow({ letters: true, ring: true, cord: false, bed: false });
  if (capture === "front") preview.setShow({ letters: true, ring: true, cord: false, bed: true });
}

rebuild().then(() => {
  if (capture === "letters") preview.setNamedView("letters");
  else if (capture === "front" || capture === "iso") preview.setNamedView(capture === "iso" ? "iso" : "front");
});
