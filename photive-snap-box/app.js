import {
  APP_NAME,
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  SLIDERS,
  applySliderChange,
  derive,
  formatMm,
  mergeParams,
  warnings,
} from "./geometry.js";
import { BoxPreview } from "./preview.js";
import { buildBox, buildPartStl, downloadArrayBuffer, stlTriangleCount } from "./stl.js";

const $ = (id) => document.getElementById(id);

const UNITS = Object.fromEntries(SLIDERS.map((s) => [s.key, s.unit]));

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;
let partView = "both";

function fmtValue(key, n) {
  if (key === "usbCount") return String(Math.round(n));
  const step = SLIDERS.find((s) => s.key === key)?.step ?? 0.1;
  const digits = step >= 1 ? 0 : step < 0.1 ? 2 : 1;
  const unit = UNITS[key] ? ` ${UNITS[key]}` : "";
  return `${Number(n).toFixed(digits)}${unit}`;
}

function readParams() {
  const next = { ...params };
  for (const { key } of SLIDERS) {
    const el = $(key);
    if (el) next[key] = Number(el.value);
  }
  return next;
}

function writeParams(p) {
  params = mergeParams(p);
  for (const { key } of SLIDERS) {
    const el = $(key);
    const out = $(`${key}-out`);
    if (el && document.activeElement !== el) el.value = String(params[key]);
    else if (el) el.value = String(params[key]);
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
  const gBase = result ? ((result.baseVolume / 1000) * 1.27).toFixed(1) : "—";
  const gLid = result ? ((result.lidVolume / 1000) * 1.27).toFixed(1) : "—";
  const tris = result ? (result.baseTris + result.lidTris).toFixed(0) : "—";
  el.innerHTML = `
    Outer tray <b>${d.outerL.toFixed(1)} × ${d.outerW.toFixed(1)} × ${d.baseZ.toFixed(1)} mm</b><br />
    Cavity <b>${d.innerL.toFixed(1)} × ${d.innerW.toFixed(1)} × ${d.cavityZ.toFixed(1)} mm</b>
    · brick nest <b>${d.brickL.toFixed(1)} × ${d.brickW.toFixed(1)} mm</b><br />
    USB extra <b>${formatMm(d.p.usbExtra)}</b> · rear extra <b>${formatMm(d.p.acExtra)}</b>
    · slot <b>${formatMm(d.p.c8HoleD)}</b><br />
    PETG ~<b>${gBase} g</b> tray + <b>${gLid} g</b> lid · ${tris} tris
  `;
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildBox(params, { quality: "preview", previewLid: true });
    if (gen !== rebuildGen) return;
    latest = result;
    preview.update(result);
    preview.setVisible({
      base: partView !== "lid",
      lid: partView !== "base",
    });
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
    downloadArrayBuffer(`photive-snap-box-${part}-${APP_VERSION_TAG}.stl`, stl);
    setStatus(`${part} · ${stlTriangleCount(stl)} tris · ~${grams} g PETG`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function setPartView(next) {
  partView = next;
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-part") === next);
  });
  preview?.setVisible({
    base: partView !== "lid",
    lid: partView !== "base",
  });
}

function bind() {
  writeParams(DEFAULT_PARAMS);
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
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.addEventListener("click", () => setPartView(btn.getAttribute("data-part")));
  });
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new BoxPreview({ canvas: $("view") });
bind();
setPartView("both");
setStatus("Loading CAD…");
rebuild().catch((err) => {
  setStatus(String(err.message || err), "err");
});
