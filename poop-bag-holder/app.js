import { APP_NAME, APP_VERSION, APP_VERSION_TAG, DEFAULT_PARAMS, SLIDERS, derive, mergeParams, warnings } from "./geometry.js";
import { HolderPreview } from "./preview.js";
import { buildHolder, buildPartStl, downloadArrayBuffer, stlTriangleCount } from "./cad.js";
import { installUndo } from "../shared/undo-history.js";
import { pairSlidersWithNumbers } from "../shared/slider-numbers.js";

const $ = (id) => document.getElementById(id);
const CHOICES = ["slotShape", "knurlStyle"];
const TOGGLES = ["winTeardrop"];
const PETG = 1.27;

const VIEWS = {
  open: { body: true, cap: true, roll: true, lift: 22 },
  closed: { body: true, cap: true, roll: true, lift: 0 },
  body: { body: true, cap: false, roll: true, lift: 0 },
  cap: { body: false, cap: true, roll: false, lift: 0 },
};

let params = mergeParams();
let preview;
let latest = null;
let rebuildTimer = 0;
let rebuildGen = 0;
let partView = "open";
let section = false;

function fmtValue(spec, n) {
  const digits = spec.step >= 1 ? 0 : spec.step < 0.1 ? 2 : 1;
  if (spec.key === "squareW" && Number(n) === 0) return "off";
  if (spec.key === "rimNotches" && Number(n) === 0) return "off";
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
  for (const key of CHOICES) {
    document.querySelectorAll(`[data-${key}]`).forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute(`data-${key}`) === params[key]);
    });
  }
  for (const key of TOGGLES) {
    const el = $(key);
    if (el) el.checked = Boolean(params[key]);
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
  $("warnings").innerHTML = warnings(params)
    .map((n) => `<p class="warn">${n}</p>`)
    .join("");
  const g = (v) => (result ? ((v / 1000) * PETG).toFixed(1) : "—");
  $("readout").innerHTML = `
    Body <b>${d.bodyOD.toFixed(1)} mm OD × ${d.bodyH.toFixed(1)} mm</b> · bore ${(d.ri * 2).toFixed(1)} mm<br />
    Cap <b>${d.capOD.toFixed(1)} mm OD × ${d.capH.toFixed(1)} mm</b> · closed height ${d.totalH.toFixed(1)} mm<br />
    Thread ${d.p.threadPitch.toFixed(1)} mm pitch × ${d.threadLen.toFixed(1)} mm · ${d.p.threadClear.toFixed(2)} mm clearance<br />
    Window ${d.p.winD.toFixed(1)} mm at ${d.winZ.toFixed(1)} mm · tab hole ${d.p.tabHole.toFixed(1)} mm at ${d.tabZ.toFixed(1)} mm<br />
    PETG ~<b>${g(result?.bodyVolume)} g</b> body + <b>${g(result?.capVolume)} g</b> cap
  `;
}

function applyView() {
  const v = VIEWS[partView];
  preview?.setVisible(v);
  preview?.setCapLift(v.lift);
  preview?.setSection(section);
}

async function rebuild() {
  const gen = ++rebuildGen;
  setStatus("Updating…");
  try {
    const result = await buildHolder(params);
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
  setStatus("Updating…");
  rebuildTimer = window.setTimeout(rebuild, 120);
}

async function downloadPart(part) {
  setStatus(`Building ${part} STL…`);
  await new Promise((r) => setTimeout(r, 30));
  try {
    const { stl, volume } = await buildPartStl(params, part);
    downloadArrayBuffer(`poop-bag-holder-${part}-${APP_VERSION_TAG}.stl`, stl);
    setStatus(`${part} · ${stlTriangleCount(stl)} tris · ~${((volume / 1000) * PETG).toFixed(1)} g PETG`);
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
  renderRows();
  writeParams(DEFAULT_PARAMS);
  for (const { key } of SLIDERS) {
    const el = $(key);
    el.addEventListener("input", () => {
      writeParams({ ...params, [key]: Number(el.value) });
      scheduleRebuild();
    });
  }
  for (const key of CHOICES) {
    document.querySelectorAll(`[data-${key}]`).forEach((btn) => {
      btn.addEventListener("click", () => {
        writeParams({ ...params, [key]: btn.getAttribute(`data-${key}`) });
        scheduleRebuild();
      });
    });
  }
  for (const key of TOGGLES) {
    $(key)?.addEventListener("change", () => {
      writeParams({ ...params, [key]: $(key).checked });
      scheduleRebuild();
    });
  }
  $("reset").addEventListener("click", () => {
    writeParams(DEFAULT_PARAMS);
    preview.fitted = false;
    scheduleRebuild();
  });
  $("resetView").addEventListener("click", () => preview.fit());
  $("dlBody").addEventListener("click", () => downloadPart("body"));
  $("dlCap").addEventListener("click", () => downloadPart("cap"));
  $("sectionBtn").addEventListener("click", () => setSection(!section));
  document.querySelectorAll("[data-part]").forEach((btn) => {
    btn.addEventListener("click", () => setPartView(btn.getAttribute("data-part")));
  });
}

$("app-version").textContent = `${APP_NAME} v${APP_VERSION}`;

preview = new HolderPreview({ canvas: $("view") });
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
setPartView("open");
setStatus("Loading CAD…");
rebuild();

window.bagHolder = {
  preview,
  setPartView,
  setSection,
  derive: () => derive(params),
  ready: () => latest != null,
};
