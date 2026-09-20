import {
  APP_VERSION,
  COLOR_SWATCHES,
  PRESETS,
  clampParams,
  defaultParams,
  displayToMm,
  estimateVolumeMm3,
  hangHoleLayout,
  mmToDisplay,
  plaGrams,
  polygonArea,
  setColorCount,
  setColorHeight,
  setColorSwatch,
  setColorThickness,
  setSharedHeight,
  sizeLabel,
  standPolygon,
} from "./geometry.js";
import { FramePreview } from "./preview.js";
import {
  buildBackPlateStl,
  buildColorMeshes,
  buildFrameMesh,
  buildStandStl,
  stlTriangleCount,
} from "./stl.js";

const lastExports = {};
const $ = (id) => document.getElementById(id);

let params = defaultParams();
let preview;
let colorRowsBound = false;
let lastColorCount = -1;

function roundForInput(mm, units) {
  const v = mmToDisplay(mm, units);
  return units === "in" ? v.toFixed(3).replace(/0+$/, "").replace(/\.$/, "") : v.toFixed(1);
}

function fmtMm(v) {
  return `${v.toFixed(1)} mm`;
}

function hexCss(hex) {
  return `#${(hex >>> 0).toString(16).padStart(6, "0")}`;
}

function ensureColorRowsBound() {
  if (colorRowsBound) return;
  const host = $("colorRows");
  if (!host) return;
  host.addEventListener("input", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.dataset.thickRange != null) {
      const i = Number(el.dataset.thickRange);
      const num = host.querySelector(`[data-thick-num="${i}"]`);
      if (num) num.value = el.value;
      params = setColorThickness(params, i, Number(el.value));
      refresh({ skipColorRebuild: true });
    } else if (el.dataset.heightRange != null) {
      const i = Number(el.dataset.heightRange);
      const num = host.querySelector(`[data-height-num="${i}"]`);
      if (num) num.value = el.value;
      params = setColorHeight(params, i, Number(el.value));
      refresh({ skipColorRebuild: true });
    }
  });
  host.addEventListener("change", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLElement)) return;
    if (el.dataset.thickNum != null) {
      params = setColorThickness(params, Number(el.dataset.thickNum), Number(el.value));
      refresh();
    } else if (el.dataset.heightNum != null) {
      params = setColorHeight(params, Number(el.dataset.heightNum), Number(el.value));
      refresh();
    } else if (el.dataset.swatch != null) {
      params = setColorSwatch(params, Number(el.dataset.swatch), el.value);
      refresh();
    }
  });
  colorRowsBound = true;
}

function renderColorRows(force) {
  const host = $("colorRows");
  if (!host) return;
  ensureColorRowsBound();
  if (!force && lastColorCount === params.colorCount && host.children.length === params.colorCount) {
    params.colors.forEach((c, i) => {
      const tr = host.querySelector(`[data-thick-range="${i}"]`);
      const tn = host.querySelector(`[data-thick-num="${i}"]`);
      const hr = host.querySelector(`[data-height-range="${i}"]`);
      const hn = host.querySelector(`[data-height-num="${i}"]`);
      const sw = host.querySelector(`[data-swatch="${i}"]`);
      const swatch = host.querySelector(`[data-swatch-dot="${i}"]`);
      if (tr && document.activeElement !== tr) tr.value = String(c.thickness);
      if (tn && document.activeElement !== tn) tn.value = c.thickness.toFixed(1);
      if (hr && document.activeElement !== hr) hr.value = String(c.height);
      if (hn && document.activeElement !== hn) hn.value = c.height.toFixed(1);
      if (sw && document.activeElement !== sw) sw.value = c.swatch;
      if (swatch) swatch.style.background = hexCss(c.hex);
      const heightBlock = host.querySelector(`[data-height-block="${i}"]`);
      if (heightBlock) heightBlock.hidden = params.equalHeights;
    });
    return;
  }
  lastColorCount = params.colorCount;
  host.innerHTML = "";
  params.colors.forEach((c, i) => {
    const row = document.createElement("div");
    row.className = "color-card";
    const options = COLOR_SWATCHES.map(
      (s) => `<option value="${s.id}" ${s.id === c.swatch ? "selected" : ""}>${s.label}</option>`
    ).join("");
    row.innerHTML = `
      <div class="color-card-head">
        <span class="swatch-dot" data-swatch-dot="${i}" style="background:${hexCss(c.hex)}"></span>
        <strong>Color ${i + 1}</strong>
        <select data-swatch="${i}">${options}</select>
      </div>
      <div class="field">
        <label>Thickness along path <span class="val">mm</span></label>
        <div class="dual">
          <input data-thick-range="${i}" type="range" min="2" max="60" step="0.5" value="${c.thickness}" />
          <input data-thick-num="${i}" type="number" min="2" max="80" step="0.5" value="${c.thickness.toFixed(1)}" />
        </div>
      </div>
      <div class="field" data-height-block="${i}" ${params.equalHeights ? "hidden" : ""}>
        <label>Layer height <span class="val">mm</span></label>
        <div class="dual">
          <input data-height-range="${i}" type="range" min="1" max="40" step="0.5" value="${c.height}" />
          <input data-height-num="${i}" type="number" min="1" max="40" step="0.5" value="${c.height.toFixed(1)}" />
        </div>
      </div>
    `;
    host.appendChild(row);
  });
}

function renderForm(opts = {}) {
  const active = document.activeElement;
  const skipLip = active === $("lipRange") || active === $("lip");
  const skipMw = active === $("mouldingWidthRange") || active === $("mouldingWidth");
  const skipShared = active === $("sharedHeightRange") || active === $("sharedHeight");

  $("units").value = params.units;
  $("photoW").value = roundForInput(params.photoW, params.units);
  $("photoH").value = roundForInput(params.photoH, params.units);
  $("unitW").textContent = params.units;
  $("unitH").textContent = params.units;
  if (!skipLip) {
    $("lip").value = params.lip.toFixed(1);
    $("lipRange").value = params.lip;
  }
  const maxLip = Math.min(params.photoW, params.photoH) / 2 - 1;
  $("lipRange").max = String(Math.max(1, maxLip).toFixed(1));
  if (!skipMw) {
    $("mouldingWidth").value = params.mouldingWidth.toFixed(1);
    $("mouldingWidthRange").value = params.mouldingWidth;
  }
  $("equalHeights").checked = params.equalHeights;
  if (!skipShared) {
    $("sharedHeight").value = params.sharedHeight.toFixed(1);
    $("sharedHeightRange").value = params.sharedHeight;
  }
  $("sharedHeightBlock").hidden = !params.equalHeights;
  $("bedThickness").value = params.bedThickness.toFixed(1);
  $("plateThickness").value = params.plateThickness.toFixed(1);
  $("hangHoles").checked = params.hangHoles;
  $("hangFields").hidden = !params.hangHoles;
  $("hangHoleDiameter").value = params.hangHoleDiameter.toFixed(1);
  $("hangInsetTop").value = params.hangInsetTop.toFixed(1);
  $("hangInsetSide").value = params.hangInsetSide.toFixed(1);
  $("hangSideRow").hidden = params.hangHoleCount < 2;
  for (const btn of document.querySelectorAll("[data-holes]")) {
    btn.classList.toggle("active", Number(btn.dataset.holes) === params.hangHoleCount);
  }
  for (const btn of document.querySelectorAll("[data-colors]")) {
    btn.classList.toggle("active", Number(btn.dataset.colors) === params.colorCount);
  }
  $("standEnabled").checked = params.standEnabled;
  $("standFields").hidden = !params.standEnabled;
  $("standAngleDeg").value = String(Math.round(params.standAngleDeg));
  $("standAngleRange").value = String(Math.round(params.standAngleDeg));
  $("standAngleLabel").textContent = `${Math.round(params.standAngleDeg)}°`;
  $("dlStand").hidden = !params.standEnabled;

  for (const btn of document.querySelectorAll("[data-preset]")) {
    const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
    const on =
      preset &&
      Math.abs(preset.w - params.photoW) < 0.05 &&
      Math.abs(preset.h - params.photoH) < 0.05;
    btn.classList.toggle("active", Boolean(on));
  }

  renderColorRows(!opts.skipColorRebuild);
}

function renderReadout(layout) {
  const grams = plaGrams(estimateVolumeMm3(layout));
  const holeArea = hangHoleLayout(params).reduce((a, h) => a + Math.PI * h.r * h.r, 0);
  const plateG = plaGrams((params.photoW * params.photoH - holeArea) * params.plateThickness);
  const standG = params.standEnabled
    ? plaGrams(Math.abs(polygonArea(standPolygon(params))) * params.standWidth)
    : 0;
  const pattern = layout.colors
    .map((c) => `${(c.thickness * layout.scale).toFixed(1)}`)
    .join(" / ");
  $("readout").innerHTML = `
    <div><b>${layout.colors.length}</b>-color pattern × <b>${layout.repeats}</b> around loop</div>
    <div>Path <b>${fmtMm(layout.pathLength)}</b> · bands ~ <b>${pattern}</b> mm</div>
    <div>Outer <b>${fmtMm(layout.outer.w)} × ${fmtMm(layout.outer.h)}</b> · window <b>${fmtMm(layout.opening.w)} × ${fmtMm(layout.opening.h)}</b></div>
    <div>Est. PLA · frame ~ <b>${grams.toFixed(1)} g</b> · plate ~ <b>${plateG.toFixed(1)} g</b>${
      params.standEnabled ? ` · stand ~ <b>${standG.toFixed(1)} g</b>` : ""
    }</div>
  `;
  $("warnings").innerHTML = layout.warnings.map((w) => `<div class="warn">${w}</div>`).join("");
}

function refresh(opts = {}) {
  params = clampParams(params);
  renderForm(opts);
  const layout = preview.update(params);
  renderReadout(layout);
  if (opts.fit) preview.fit();
  return layout;
}

function num(id) {
  return Number($(id).value);
}

function bind() {
  $("units").addEventListener("change", () => {
    params.units = $("units").value;
    refresh();
  });
  $("photoW").addEventListener("change", () => {
    params.photoW = displayToMm(num("photoW"), params.units);
    refresh({ fit: true });
  });
  $("photoH").addEventListener("change", () => {
    params.photoH = displayToMm(num("photoH"), params.units);
    refresh({ fit: true });
  });
  $("rotate").addEventListener("click", () => {
    const w = params.photoW;
    params.photoW = params.photoH;
    params.photoH = w;
    refresh({ fit: true });
  });
  for (const btn of document.querySelectorAll("[data-preset]")) {
    btn.addEventListener("click", () => {
      const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
      if (!preset) return;
      params.photoW = preset.w;
      params.photoH = preset.h;
      params.units = "in";
      refresh({ fit: true });
    });
  }

  $("lipRange").addEventListener("input", () => {
    params.lip = Number($("lipRange").value);
    refresh({ skipColorRebuild: true });
  });
  $("lip").addEventListener("change", () => {
    params.lip = num("lip");
    refresh();
  });
  $("mouldingWidthRange").addEventListener("input", () => {
    params.mouldingWidth = Number($("mouldingWidthRange").value);
    refresh({ fit: true, skipColorRebuild: true });
  });
  $("mouldingWidth").addEventListener("change", () => {
    params.mouldingWidth = num("mouldingWidth");
    refresh({ fit: true });
  });

  for (const btn of document.querySelectorAll("[data-colors]")) {
    btn.addEventListener("click", () => {
      params = setColorCount(params, Number(btn.dataset.colors));
      refresh({ fit: true });
    });
  }

  $("equalHeights").addEventListener("change", () => {
    if ($("equalHeights").checked) {
      params = setSharedHeight(params, params.sharedHeight);
    } else {
      params.equalHeights = false;
    }
    refresh();
  });
  $("sharedHeightRange").addEventListener("input", () => {
    params = setSharedHeight(params, Number($("sharedHeightRange").value));
    refresh({ skipColorRebuild: true });
  });
  $("sharedHeight").addEventListener("change", () => {
    params = setSharedHeight(params, num("sharedHeight"));
    refresh();
  });

  $("bedThickness").addEventListener("change", () => {
    params.bedThickness = num("bedThickness");
    refresh();
  });
  $("plateThickness").addEventListener("change", () => {
    params.plateThickness = num("plateThickness");
    refresh();
  });
  $("hangHoles").addEventListener("change", () => {
    params.hangHoles = $("hangHoles").checked;
    refresh();
  });
  for (const btn of document.querySelectorAll("[data-holes]")) {
    btn.addEventListener("click", () => {
      params.hangHoleCount = Number(btn.dataset.holes);
      refresh();
    });
  }
  $("hangHoleDiameter").addEventListener("change", () => {
    params.hangHoleDiameter = num("hangHoleDiameter");
    refresh();
  });
  $("hangInsetTop").addEventListener("change", () => {
    params.hangInsetTop = num("hangInsetTop");
    refresh();
  });
  $("hangInsetSide").addEventListener("change", () => {
    params.hangInsetSide = num("hangInsetSide");
    refresh();
  });
  $("standEnabled").addEventListener("change", () => {
    params.standEnabled = $("standEnabled").checked;
    refresh({ fit: true });
  });
  $("standAngleRange").addEventListener("input", () => {
    params.standAngleDeg = Number($("standAngleRange").value);
    refresh({ skipColorRebuild: true });
  });
  $("standAngleDeg").addEventListener("change", () => {
    params.standAngleDeg = num("standAngleDeg");
    refresh();
  });

  $("resetView").addEventListener("click", () => preview.fit());
  $("photoFile").addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) {
      preview.setPhotoImage(null);
      return;
    }
    const img = new Image();
    img.onload = () => preview.setPhotoImage(img);
    img.src = URL.createObjectURL(file);
  });

  $("dlFrame").addEventListener("click", () => exportStls("frame"));
  $("dlColors").addEventListener("click", () => exportStls("colors"));
  $("dlPlate").addEventListener("click", () => exportStls("plate"));
  $("dlStand").addEventListener("click", () => exportStls("stand"));
  $("dlBoth").addEventListener("click", () => exportStls("all"));
}

function rememberExport(kind, filename, buffer) {
  if (lastExports[kind]) URL.revokeObjectURL(lastExports[kind].url);
  const blob = new Blob([buffer], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  lastExports[kind] = { url, name: filename };
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  renderExportLinks();
}

function renderExportLinks() {
  const el = $("exportLinks");
  if (!el) return;
  const keys = Object.keys(lastExports);
  el.hidden = keys.length === 0;
  el.innerHTML = keys.length
    ? `<div class="export-links-label">Latest exports — tap to download again</div>${keys
        .map((kind) => {
          const file = lastExports[kind];
          return `<a class="export-link" href="${file.url}" download="${file.name}">${file.name}</a>`;
        })
        .join("")}`
    : "";
}

async function exportStls(which) {
  const label = sizeLabel(params.photoW, params.photoH, params.units);
  const status = $("status");
  const buttons = [$("dlFrame"), $("dlColors"), $("dlPlate"), $("dlStand"), $("dlBoth")];
  buttons.forEach((b) => (b.disabled = true));
  try {
    const parts = [];
    if (which === "plate" || which === "all") {
      status.textContent = "Writing back plate…";
      const plate = await buildBackPlateStl(params);
      rememberExport("plate", `striped-frame-${label}-back.stl`, plate.stl);
      parts.push(`plate ${stlTriangleCount(plate.stl).toLocaleString()} tris`);
    }
    if ((which === "stand" || which === "all") && params.standEnabled) {
      status.textContent = "Building stand…";
      const stand = await buildStandStl(params);
      rememberExport("stand", `striped-frame-${label}-stand.stl`, stand.stl);
      parts.push(`stand ${plaGrams(stand.volume).toFixed(1)} g`);
    }
    if (which === "colors" || which === "all") {
      status.textContent = "Splitting colors…";
      const { parts: colorParts } = await buildColorMeshes(params);
      for (const part of colorParts) {
        const name = `striped-frame-${label}-color${part.colorIndex + 1}-${part.swatch}.stl`;
        rememberExport(`color${part.colorIndex}`, name, part.stl);
        parts.push(`c${part.colorIndex + 1} ${stlTriangleCount(part.stl).toLocaleString()} tris`);
      }
    }
    if (which === "frame" || which === "all") {
      status.textContent = "Unioning path stripes…";
      const { stl, volume, layout } = await buildFrameMesh(params);
      rememberExport("frame", `striped-frame-${label}-frame.stl`, stl);
      parts.push(
        `frame ${stlTriangleCount(stl).toLocaleString()} tris · ${plaGrams(volume).toFixed(1)} g · ${layout.segments.length} bands`
      );
    }
    status.textContent = parts.length ? parts.join(" · ") : "Done.";
  } catch (err) {
    console.error(err);
    status.textContent = err.message || String(err);
  } finally {
    buttons.forEach((b) => (b.disabled = false));
  }
}

function init() {
  const versionEl = $("app-version");
  if (versionEl) versionEl.textContent = `Striped frame v${APP_VERSION}`;
  preview = new FramePreview({
    canvas3d: $("view3d"),
    canvas2d: $("view2d"),
  });
  bind();
  refresh({ fit: true });
  preview.resize();
  window.addEventListener("resize", () => preview.resize());
}

try {
  init();
} catch (err) {
  console.error(err);
  const status = document.getElementById("status");
  if (status) status.textContent = err.message || String(err);
}
