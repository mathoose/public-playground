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

const $ = (id) => document.getElementById(id);

const UNITS = Object.fromEntries(SLIDERS.map((s) => [s.key, s.unit]));
const OPEN_LIFT = 14;

function valueDigits(step) {
  if (step >= 1) return 0;
  const frac = String(step).split(".")[1];
  return frac ? frac.length : 1;
}

function ensureNumberInputs() {
  for (const spec of SLIDERS) {
    const range = $(spec.key);
    if (!range) continue;
    const row = range.closest(".row");
    if (!row) continue;
    let num = $(`${spec.key}-num`);
    if (!num) {
      num = document.createElement("input");
      num.type = "number";
      num.id = `${spec.key}-num`;
      num.className = "value-num";
      num.setAttribute("aria-label", row.querySelector("label")?.textContent?.trim() || spec.key);
      const out = $(`${spec.key}-out`);
      if (out) out.replaceWith(num);
      else row.insertBefore(num, range);
    }
    range.min = String(spec.min);
    range.max = String(spec.max);
    range.step = String(spec.step);
    num.min = String(spec.min);
    num.max = String(sliderAbsMax(spec));
    num.step = String(spec.step);
  }
}

function setParam(key, rawValue) {
  const value = Number(rawValue);
  if (!Number.isFinite(value)) return;
  params = applySliderChange(params, key, value);
  writeParams(params);
  scheduleRebuild();
}

const VIEWS = {
  open: { base: true, lid: true, spacer: true, ghosts: true, lift: OPEN_LIFT },
  closed: { base: true, lid: true, spacer: true, ghosts: true, lift: 0 },
  base: { base: true, lid: false, spacer: true, ghosts: true, lift: 0 },
  lid: { base: false, lid: true, spacer: false, ghosts: false, lift: OPEN_LIFT },
  spacer: { base: false, lid: false, spacer: true, ghosts: true, lift: 0 },
};

let params = mergeParams();
let preview;
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

function writeParams(p) {
  params = mergeParams(p);
  for (const spec of SLIDERS) {
    const { key } = spec;
    const el = $(key);
    const num = $(`${key}-num`);
    const v = params[key];
    if (el) el.value = String(Math.min(v, spec.max));
    if (num) {
      const digits = valueDigits(spec.step);
      num.value = Number(v).toFixed(digits);
      num.classList.toggle("over-slider", v > spec.max);
    }
    const out = $(`${key}-out`);
    if (out) out.textContent = fmtValue(key, v);
  }
  PLUG_KEYS.forEach((key, i) => {
    const row = $(key)?.closest(".row");
    if (row) row.hidden = i >= params.usbCount;
  });
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

function applyView() {
  const v = VIEWS[partView];
  preview?.setVisible(v);
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
    setStatus(`${part} · ${stlTriangleCount(stl)} tris · ~${grams} g PETG`);
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err), "err");
  }
}

function setPartView(next) {
  partView = VIEWS[next] ? next : "open";
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.classList.toggle("active", btn.getAttribute("data-part") === partView);
  });
  applyView();
}

function setSection(on) {
  section = Boolean(on);
  $("sectionBtn")?.classList.toggle("active", section);
  applyView();
}

function bind() {
  ensureNumberInputs();
  writeParams(DEFAULT_PARAMS);
  for (const { key } of SLIDERS) {
    const el = $(key);
    const num = $(`${key}-num`);
    if (el) {
      el.addEventListener("input", () => setParam(key, el.value));
    }
    if (num) {
      num.addEventListener("change", () => setParam(key, num.value));
      num.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          num.blur();
          setParam(key, num.value);
        }
      });
    }
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
bind();
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
