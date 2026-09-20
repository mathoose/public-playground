import {
  APP_VERSION,
  PRESETS,
  clampParams,
  defaultParams,
  displayToMm,
  estimateVolumeMm3,
  hangHoleLayout,
  mmToDisplay,
  plaGrams,
  polygonArea,
  setSharedHeight,
  setStripeCount,
  setStripeHeight,
  sizeLabel,
  standPolygon,
} from "./geometry.js";
import { FramePreview } from "./preview.js";
import {
  buildBackPlateStl,
  buildFrameMesh,
  buildStandStl,
  stlTriangleCount,
} from "./stl.js";

const lastExports = {};
const $ = (id) => document.getElementById(id);

let params = defaultParams();
let preview;
let stripeControlsBound = false;
let lastStripeCount = -1;

function roundForInput(mm, units) {
  const v = mmToDisplay(mm, units);
  return units === "in" ? v.toFixed(3).replace(/0+$/, "").replace(/\.$/, "") : v.toFixed(1);
}

function fmtMm(v) {
  return `${v.toFixed(1)} mm`;
}

function ensureStripeControlsBound() {
  if (stripeControlsBound) return;
  const host = $("stripeHeights");
  if (!host) return;
  host.addEventListener("input", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.dataset.stripeRange == null) return;
    const i = Number(el.dataset.stripeRange);
    const sibling = host.querySelector(`[data-stripe-num="${i}"]`);
    if (sibling) sibling.value = el.value;
    params = setStripeHeight(params, i, Number(el.value));
    refresh({ skipStripeRebuild: true });
  });
  host.addEventListener("change", (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.dataset.stripeNum == null) return;
    const i = Number(el.dataset.stripeNum);
    params = setStripeHeight(params, i, Number(el.value));
    refresh();
  });
  stripeControlsBound = true;
}

function renderStripeHeightControls(force) {
  const host = $("stripeHeights");
  if (!host) return;
  ensureStripeControlsBound();
  if (!force && lastStripeCount === params.stripeCount && host.children.length === params.stripeCount) {
    params.stripeHeights.forEach((h, i) => {
      const range = host.querySelector(`[data-stripe-range="${i}"]`);
      const numEl = host.querySelector(`[data-stripe-num="${i}"]`);
      if (range && document.activeElement !== range) range.value = String(h);
      if (numEl && document.activeElement !== numEl) numEl.value = h.toFixed(1);
    });
    return;
  }
  lastStripeCount = params.stripeCount;
  host.innerHTML = "";
  params.stripeHeights.forEach((h, i) => {
    const row = document.createElement("div");
    row.className = "field stripe-height-row";
    row.innerHTML = `
      <label>Stripe ${i + 1} height <span class="val">mm</span></label>
      <div class="dual">
        <input data-stripe-range="${i}" type="range" min="1" max="40" step="0.5" value="${h}" />
        <input data-stripe-num="${i}" type="number" min="1" max="40" step="0.5" value="${h.toFixed(1)}" />
      </div>
    `;
    host.appendChild(row);
  });
}

function renderForm(opts = {}) {
  const skipShared =
    document.activeElement === $("sharedHeightRange") || document.activeElement === $("sharedHeight");
  const skipLip = document.activeElement === $("lipRange") || document.activeElement === $("lip");
  const skipWidth =
    document.activeElement === $("stripeWidthRange") || document.activeElement === $("stripeWidth");
  const skipCount =
    document.activeElement === $("stripeCountRange") || document.activeElement === $("stripeCount");

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
  if (!skipCount) {
    $("stripeCount").value = String(params.stripeCount);
    $("stripeCountRange").value = String(params.stripeCount);
  }
  if (!skipWidth) {
    $("stripeWidth").value = params.stripeWidth.toFixed(1);
    $("stripeWidthRange").value = params.stripeWidth;
  }
  $("equalHeights").checked = params.equalHeights;
  if (!skipShared) {
    $("sharedHeight").value = params.sharedHeight.toFixed(1);
    $("sharedHeightRange").value = params.sharedHeight;
  }
  $("sharedHeightBlock").hidden = !params.equalHeights;
  $("stripeHeightsBlock").hidden = false;
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

  renderStripeHeightControls(!opts.skipStripeRebuild);
}

function renderReadout(layout) {
  const grams = plaGrams(estimateVolumeMm3(layout));
  const holeArea = hangHoleLayout(params).reduce((a, h) => a + Math.PI * h.r * h.r, 0);
  const plateG = plaGrams((params.photoW * params.photoH - holeArea) * params.plateThickness);
  const standG = params.standEnabled
    ? plaGrams(Math.abs(polygonArea(standPolygon(params))) * params.standWidth)
    : 0;
  const heights = layout.stripes.map((s) => s.height.toFixed(1)).join(" / ");
  $("readout").innerHTML = `
    <div><b>${layout.stripes.length}</b> stripes · outer <b>${fmtMm(layout.outer.w)} × ${fmtMm(layout.outer.h)}</b></div>
    <div>Window ~ <b>${fmtMm(layout.opening.w)} × ${fmtMm(layout.opening.h)}</b></div>
    <div>Heights <b>${heights}</b> mm</div>
    <div>Est. PLA · frame ~ <b>${grams.toFixed(1)} g</b> · back plate ~ <b>${plateG.toFixed(1)} g</b>${
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

  const applyShared = () => {
    params = setSharedHeight(params, Number($("sharedHeightRange").value));
    refresh({ skipStripeRebuild: true });
  };
  $("sharedHeightRange").addEventListener("input", applyShared);
  $("sharedHeight").addEventListener("change", () => {
    params = setSharedHeight(params, num("sharedHeight"));
    refresh();
  });

  const applyLip = () => {
    params.lip = Number($("lipRange").value);
    refresh({ skipStripeRebuild: true });
  };
  $("lipRange").addEventListener("input", applyLip);
  $("lip").addEventListener("change", () => {
    params.lip = num("lip");
    refresh();
  });

  $("stripeCountRange").addEventListener("input", () => {
    params = setStripeCount(params, Number($("stripeCountRange").value));
    refresh({ fit: true });
  });
  $("stripeCount").addEventListener("change", () => {
    params = setStripeCount(params, num("stripeCount"));
    refresh({ fit: true });
  });

  const applyWidth = () => {
    params.stripeWidth = Number($("stripeWidthRange").value);
    refresh({ fit: true, skipStripeRebuild: true });
  };
  $("stripeWidthRange").addEventListener("input", applyWidth);
  $("stripeWidth").addEventListener("change", () => {
    params.stripeWidth = num("stripeWidth");
    refresh({ fit: true });
  });

  $("equalHeights").addEventListener("change", () => {
    if ($("equalHeights").checked) {
      params = setSharedHeight(params, params.sharedHeight);
    } else {
      params.equalHeights = false;
    }
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
    refresh();
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
  const order = [
    ["frame", "Frame"],
    ["plate", "Back plate"],
    ["stand", "Stand"],
  ];
  const parts = order
    .filter(([kind]) => lastExports[kind])
    .map(([kind, label]) => {
      const file = lastExports[kind];
      return `<a class="export-link" href="${file.url}" download="${file.name}">${label} STL</a>`;
    });
  el.hidden = parts.length === 0;
  el.innerHTML = parts.length
    ? `<div class="export-links-label">Latest exports — tap to download again</div>${parts.join("")}`
    : "";
}

async function exportStls(which) {
  const label = sizeLabel(params.photoW, params.photoH, params.units);
  const status = $("status");
  const buttons = [$("dlFrame"), $("dlPlate"), $("dlStand"), $("dlBoth")];
  buttons.forEach((b) => (b.disabled = true));
  try {
    const parts = [];
    if (which === "plate" || which === "all" || which === "both") {
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
    if (which === "frame" || which === "all" || which === "both") {
      status.textContent = "Unioning stripes (first run loads the CAD kernel)…";
      const { stl, volume, layout } = await buildFrameMesh(params);
      const n = stlTriangleCount(stl);
      rememberExport("frame", `striped-frame-${label}-frame.stl`, stl);
      parts.push(
        `frame ${n.toLocaleString()} tris · ${plaGrams(volume).toFixed(1)} g · ${layout.stripes.length} stripes`
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
