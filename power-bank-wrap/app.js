import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  SLIDERS,
  applyPreset,
  applySliderChange,
  derive,
  formatMm,
  mergeParams,
  warnings,
} from "./geometry.js";
import { CasePreview } from "./preview.js";
import { buildCase, buildCaseStl, downloadArrayBuffer, stlTriangleCount } from "./stl.js";

const $ = (id) => document.getElementById(id);

const UNITS = Object.fromEntries(SLIDERS.map((s) => [s.key, s.unit]));

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;

function fmtValue(key, n) {
  if (key === "clipOn") return n >= 0.5 ? "on" : "off";
  const step = SLIDERS.find((s) => s.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  const unit = UNITS[key] ? ` ${UNITS[key]}` : "";
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
  const notes = warnings(params);
  const warnEl = $("warnings");
  if (warnEl) {
    warnEl.innerHTML = notes.map((n) => `<p class="warn">${n}</p>`).join("");
  }
  const el = $("readout");
  if (!el) return;
  const grams = result ? ((result.volume / 1000) * 1.24).toFixed(1) : "—";
  const tris = result ? result.tris.toFixed(0) : "—";
  el.innerHTML = `
    Overall <b>${d.totalL.toFixed(1)} × ${d.nestOuterW.toFixed(1)} × ${d.outerH.toFixed(1)} mm</b><br />
    Nest <b>${d.innerL.toFixed(1)} × ${d.innerW.toFixed(1)} × ${d.cavityZ.toFixed(1)} mm</b>
    for a <b>${formatMm(d.p.bankL)} × ${formatMm(d.p.bankW)} × ${formatMm(d.p.bankH)}</b> bank<br />
    Storage <b>${formatMm(d.p.storeL)} × ${formatMm(d.p.storeW)} × ${formatMm(d.p.storeH)}</b>
    · USB window <b>${formatMm(d.p.usbWindowW)} × ${formatMm(d.p.usbWindowH)}</b> R${formatMm(d.p.usbWindowR)}<br />
    Posts on the opposite short end · porch <b>${formatMm(d.p.wrapDeck)}</b><br />
    PETG ~<b>${grams} g</b> · ${tris} tris
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildCase(params, { quality: "preview" });
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

function scheduleRebuild() {
  renderReadout(latest);
  window.clearTimeout(rebuildTimer);
  rebuildTimer = window.setTimeout(() => {
    rebuild();
  }, 40);
}

async function downloadStl() {
  setStatus("Building STL…");
  try {
    const { stl, volume } = await buildCaseStl(params);
    const grams = ((volume / 1000) * 1.24).toFixed(1);
    downloadArrayBuffer(`power-bank-wrap-${APP_VERSION_TAG}.stl`, stl);
    setStatus(`STL · ${stlTriangleCount(stl)} tris · ~${grams} g PETG`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
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
  document.querySelectorAll("[data-preset]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-preset]").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      params = applyPreset(btn.getAttribute("data-preset"));
      writeParams(params);
      preview.fitted = false;
      scheduleRebuild();
    });
  });
  $("reset")?.addEventListener("click", () => {
    document.querySelectorAll("[data-preset]").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-preset") === "syj");
    });
    params = mergeParams(DEFAULT_PARAMS);
    writeParams(params);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView")?.addEventListener("click", () => preview.fit());
  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => preview.setNamedView(btn.getAttribute("data-view")));
  });
  $("download")?.addEventListener("click", () => downloadStl());
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new CasePreview({ canvas: $("view") });
window.__wrapPreview = preview;
bind();
setStatus("Loading CAD…");

const shot = new URLSearchParams(location.search).get("shot");
if (shot) document.body.classList.add("capture");

rebuild()
  .then(() => {
    if (shot) preview.setNamedView(shot);
    window.__wrapReady = true;
  })
  .catch((err) => {
    setStatus(String(err.message || err), "err");
  });
