import {
  PRESETS,
  applyTargetOverlap,
  clampParams,
  defaultParams,
  displayToMm,
  estimateVolumeMm3,
  hangHoleLayout,
  mmToDisplay,
  plaGrams,
  polygonArea,
  pruneDisabled,
  sizeLabel,
  standPolygon,
  syncTargetOverlapFromCounts,
  toggleDisabled,
} from "./geometry.js";
import { FramePreview } from "./preview.js";
import {
  buildBackPlateStl,
  buildFrameMesh,
  buildStandStl,
  downloadArrayBuffer,
  stlTriangleCount,
} from "./stl.js";

const $ = (id) => document.getElementById(id);

let params = defaultParams();
let preview;

function roundForInput(mm, units) {
  const v = mmToDisplay(mm, units);
  return units === "in" ? v.toFixed(3).replace(/0+$/, "").replace(/\.$/, "") : v.toFixed(1);
}

function fmtMm(v) {
  return `${v.toFixed(1)} mm`;
}

function renderForm() {
  $("units").value = params.units;
  $("photoW").value = roundForInput(params.photoW, params.units);
  $("photoH").value = roundForInput(params.photoH, params.units);
  $("unitW").textContent = params.units;
  $("unitH").textContent = params.units;
  $("ballDiameter").value = params.ballDiameter.toFixed(1);
  $("ballDiameterRange").value = params.ballDiameter;
  $("imageOverlap").value = params.imageOverlap.toFixed(1);
  const maxLip = Math.min(
    params.ballDiameter,
    Math.min(params.photoW, params.photoH) / 2 - 0.5
  );
  $("imageOverlapRange").max = String(Math.max(1, maxLip).toFixed(1));
  $("imageOverlapRange").value = params.imageOverlap;
  $("ballOverlap").value = params.targetBallOverlap.toFixed(1);
  $("ballOverlapRange").min = String((-0.4 * params.ballDiameter).toFixed(1));
  $("ballOverlapRange").max = String((0.75 * params.ballDiameter).toFixed(1));
  $("ballOverlapRange").value = params.targetBallOverlap;
  $("webThickness").value = params.webThickness.toFixed(1);
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
  $("segments").value = params.segments;
  $("countTop").textContent = params.countTop;
  $("countBottom").textContent = params.countBottom;
  $("countLeft").textContent = params.countLeft;
  $("countRight").textContent = params.countRight;
  $("linkH").checked = params.linkH;
  $("linkV").checked = params.linkV;
  $("bottomRow").hidden = params.linkH;
  $("rightRow").hidden = params.linkV;

  for (const btn of document.querySelectorAll("[data-preset]")) {
    const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
    const on =
      preset &&
      Math.abs(preset.w - params.photoW) < 0.05 &&
      Math.abs(preset.h - params.photoH) < 0.05;
    btn.classList.toggle("active", Boolean(on));
  }
}

function renderReadout(layout) {
  const grams = plaGrams(estimateVolumeMm3(layout, params.webThickness));
  const holeArea = hangHoleLayout(params).reduce((a, h) => a + Math.PI * h.r * h.r, 0);
  const plateG = plaGrams((params.photoW * params.photoH - holeArea) * params.plateThickness);
  const standG = params.standEnabled
    ? plaGrams(Math.abs(polygonArea(standPolygon(params))) * params.standWidth)
    : 0;
  $("readout").innerHTML = `
    <div><b>${layout.enabledCount}</b> beads · outer <b>${fmtMm(layout.outer.w)} × ${fmtMm(layout.outer.h)}</b></div>
    <div>Window ~ <b>${fmtMm(layout.opening.w)} × ${fmtMm(layout.opening.h)}</b> (scalloped)</div>
    <div>Bead overlap T/B <b>${fmtMm(layout.overlap.top)}</b> · L/R <b>${fmtMm(layout.overlap.left)}</b></div>
    <div>Est. PLA · frame ~ <b>${grams.toFixed(1)} g</b> · back plate ~ <b>${plateG.toFixed(1)} g</b>${
      params.standEnabled ? ` · stand ~ <b>${standG.toFixed(1)} g</b>` : ""
    }</div>
  `;
  $("warnings").innerHTML = layout.warnings.map((w) => `<div class="warn">${w}</div>`).join("");
  $("restore").hidden = params.disabled.length === 0;
}

function refresh(opts = {}) {
  params = pruneDisabled(clampParams(params));
  renderForm();
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
    params = applyTargetOverlap(params);
    refresh({ fit: true });
  });
  $("photoH").addEventListener("change", () => {
    params.photoH = displayToMm(num("photoH"), params.units);
    params = applyTargetOverlap(params);
    refresh({ fit: true });
  });
  $("rotate").addEventListener("click", () => {
    const w = params.photoW;
    params.photoW = params.photoH;
    params.photoH = w;
    params = applyTargetOverlap(params);
    refresh({ fit: true });
  });
  for (const btn of document.querySelectorAll("[data-preset]")) {
    btn.addEventListener("click", () => {
      const preset = PRESETS.find((p) => p.id === btn.dataset.preset);
      if (!preset) return;
      params.photoW = preset.w;
      params.photoH = preset.h;
      params.units = "in";
      params = applyTargetOverlap(params);
      refresh({ fit: true });
    });
  }

  const bindRange = (rangeId, numberId, key, overlapRecount) => {
    const apply = () => {
      params[key] = Number($(rangeId).value);
      $(numberId).value = params[key];
      if (overlapRecount) params = applyTargetOverlap(params);
      refresh();
    };
    $(rangeId).addEventListener("input", apply);
    $(numberId).addEventListener("change", () => {
      params[key] = Number($(numberId).value);
      if (overlapRecount) params = applyTargetOverlap(params);
      refresh();
    });
  };
  bindRange("ballDiameterRange", "ballDiameter", "ballDiameter", true);
  bindRange("imageOverlapRange", "imageOverlap", "imageOverlap", true);
  $("ballOverlapRange").addEventListener("input", () => {
    params.targetBallOverlap = Number($("ballOverlapRange").value);
    params = applyTargetOverlap(params);
    refresh();
  });
  $("ballOverlap").addEventListener("change", () => {
    params.targetBallOverlap = Number($("ballOverlap").value);
    params = applyTargetOverlap(params);
    refresh();
  });
  $("webThickness").addEventListener("change", () => {
    params.webThickness = num("webThickness");
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
  $("segments").addEventListener("change", () => {
    params.segments = num("segments");
    refresh();
  });

  $("linkH").addEventListener("change", () => {
    params.linkH = $("linkH").checked;
    if (params.linkH) params.countBottom = params.countTop;
    params = syncTargetOverlapFromCounts(params);
    refresh();
  });
  $("linkV").addEventListener("change", () => {
    params.linkV = $("linkV").checked;
    if (params.linkV) params.countRight = params.countLeft;
    params = syncTargetOverlapFromCounts(params);
    refresh();
  });

  const bump = (key, delta) => {
    params[key] += delta;
    if (key === "countTop" && params.linkH) params.countBottom = params.countTop;
    if (key === "countBottom" && params.linkH) params.countTop = params.countBottom;
    if (key === "countLeft" && params.linkV) params.countRight = params.countLeft;
    if (key === "countRight" && params.linkV) params.countLeft = params.countRight;
    params = syncTargetOverlapFromCounts(params);
    refresh();
  };
  $("topMinus").addEventListener("click", () => bump("countTop", -1));
  $("topPlus").addEventListener("click", () => bump("countTop", 1));
  $("bottomMinus").addEventListener("click", () => bump("countBottom", -1));
  $("bottomPlus").addEventListener("click", () => bump("countBottom", 1));
  $("leftMinus").addEventListener("click", () => bump("countLeft", -1));
  $("leftPlus").addEventListener("click", () => bump("countLeft", 1));
  $("rightMinus").addEventListener("click", () => bump("countRight", -1));
  $("rightPlus").addEventListener("click", () => bump("countRight", 1));
  $("restore").addEventListener("click", () => {
    params.disabled = [];
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
      downloadArrayBuffer(`bubble-frame-${label}-back.stl`, plate.stl);
      parts.push(`plate ${stlTriangleCount(plate.stl).toLocaleString()} tris`);
    }
    if ((which === "stand" || which === "all") && params.standEnabled) {
      status.textContent = "Building stand…";
      const stand = await buildStandStl(params);
      downloadArrayBuffer(`bubble-frame-${label}-stand.stl`, stand.stl);
      parts.push(`stand ${plaGrams(stand.volume).toFixed(1)} g`);
    }
    if (which === "frame" || which === "all" || which === "both") {
      status.textContent = "Unioning beads (first run loads the CAD kernel)…";
      const { stl, volume, layout } = await buildFrameMesh(params);
      const n = stlTriangleCount(stl);
      downloadArrayBuffer(`bubble-frame-${label}-frame.stl`, stl);
      parts.push(`frame ${n.toLocaleString()} tris · ${plaGrams(volume).toFixed(1)} g · ${layout.enabledCount} beads`);
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
  preview = new FramePreview({
    canvas3d: $("view3d"),
    canvas2d: $("view2d"),
    onToggle: (id) => {
      params = toggleDisabled(params, id);
      refresh();
    },
  });
  bind();
  refresh({ fit: true });
  preview.resize();
  window.addEventListener("resize", () => preview.resize());
}

init();
