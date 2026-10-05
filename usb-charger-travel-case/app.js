import {
  APP_VERSION,
  APP_VERSION_TAG,
  DEFAULT_PARAMS,
  clampParams,
  dims,
  plaGrams,
  sizeLabel,
} from "./geometry.js";
import { CasePreview } from "./preview.js";
import {
  buildCaseMeshes,
  downloadArrayBuffer,
  stlTriangleCount,
} from "./stl.js";

const $ = (id) => document.getElementById(id);

const PARAM_IDS = [
  "nest_clear_xy",
  "nest_clear_z",
  "brick_l",
  "brick_w",
  "brick_h",
  "brick_r",
  "wall",
  "floor",
  "ac_pocket_depth",
  "finger_notch_w",
  "finger_notch_d",
  "slot_throat",
  "slot_depth",
  "slot_wall_h",
  "slot_divider",
  "usb_pitch",
  "usb_side_margin",
  "usb_z_center",
  "usb_opening_w",
  "usb_opening_h",
  "lip_clear",
  "lip_depth",
  "lid_thickness",
  "wrap_post_h",
  "wrap_post_d",
  "wrap_gap",
  "touch_fillet",
];

let params = clampParams(DEFAULT_PARAMS);
let preview;
let rebuildTimer = 0;
let rebuildToken = 0;
let lastGood = null;
let fittedOnce = false;

function readParams() {
  const next = { ...params };
  for (const id of PARAM_IDS) {
    const el = $(id);
    if (el) next[id] = Number(el.value);
  }
  const part = document.querySelector('input[name="part"]:checked');
  if (part) next.part = part.value;
  next.show_usb_markers = $("show_usb_markers")?.checked ?? true;
  next.align_slots_to_usb = $("align_slots_to_usb")?.checked ?? true;
  return clampParams(next);
}

function writeParams(p) {
  params = clampParams(p);
  for (const id of PARAM_IDS) {
    const el = $(id);
    if (!el) continue;
    el.value = String(params[id]);
    const out = $(`${id}-out`);
    if (out) {
      const n = Number(params[id]);
      out.textContent = Number.isInteger(n) || (el.step === "1") ? `${n}` : n.toFixed(2);
    }
  }
  const partRadio = document.querySelector(`input[name="part"][value="${params.part}"]`);
  if (partRadio) partRadio.checked = true;
  if ($("show_usb_markers")) $("show_usb_markers").checked = !!params.show_usb_markers;
  if ($("align_slots_to_usb")) $("align_slots_to_usb").checked = !!params.align_slots_to_usb;
  if ($("usb_port_count_out")) $("usb_port_count_out").textContent = String(params.usb_port_count);
}

function setStatus(msg) {
  const el = $("status");
  if (el) el.textContent = msg || "";
}

function updateReadout(result) {
  const d = result?.dims || dims(params);
  const el = $("readout");
  if (!el) return;
  const bits = [sizeLabel(d)];
  if (result?.base) {
    bits.push(
      `base ~${plaGrams(result.base.volume).toFixed(0)} g` +
        (result.base.stl ? ` · ${stlTriangleCount(result.base.stl).toLocaleString()} tris` : "")
    );
  }
  if (result?.lid) {
    bits.push(
      `lid ~${plaGrams(result.lid.volume).toFixed(0)} g` +
        (result.lid.stl ? ` · ${stlTriangleCount(result.lid.stl).toLocaleString()} tris` : "")
    );
  }
  el.innerHTML = bits.map((b) => `<div>${b}</div>`).join("");
}

async function rebuild({ fit = false, exportQuality = false } = {}) {
  const token = ++rebuildToken;
  params = readParams();
  writeParams(params);
  setStatus(exportQuality ? "Building export mesh…" : "Updating…");
  try {
    const result = await buildCaseMeshes(params, { preview: !exportQuality });
    if (token !== rebuildToken) return null;
    lastGood = result;
    preview.update(result);
    updateReadout(result);
    if (fit || !fittedOnce) {
      preview.fit(result.dims);
      fittedOnce = true;
    }
    setStatus("");
    return result;
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err));
    return null;
  }
}

function scheduleRebuild() {
  params = readParams();
  writeParams(params);
  clearTimeout(rebuildTimer);
  rebuildTimer = setTimeout(() => rebuild({ fit: false }), 120);
}

async function downloadPart(which) {
  setStatus(`Exporting ${which}…`);
  try {
    const exportParams = { ...readParams(), part: which === "both" ? "both" : which };
    const result = await buildCaseMeshes(exportParams, { preview: false });
    const tag = APP_VERSION_TAG;
    if ((which === "base" || which === "both") && result.base?.stl) {
      downloadArrayBuffer(`photive-travel-case-base-${tag}.stl`, result.base.stl);
    }
    if ((which === "lid" || which === "both") && result.lid?.stl) {
      downloadArrayBuffer(`photive-travel-case-lid-${tag}.stl`, result.lid.stl);
    }
    updateReadout(result);
    setStatus("Downloaded.");
  } catch (err) {
    console.error(err);
    setStatus(String(err.message || err));
  }
}

function bind() {
  for (const id of PARAM_IDS) {
    const el = $(id);
    if (!el) continue;
    el.addEventListener("input", scheduleRebuild);
  }
  document.querySelectorAll('input[name="part"]').forEach((el) => {
    el.addEventListener("change", () => {
      fittedOnce = false;
      scheduleRebuild();
    });
  });
  $("show_usb_markers")?.addEventListener("change", scheduleRebuild);
  $("align_slots_to_usb")?.addEventListener("change", scheduleRebuild);
  $("equalUsbMargins")?.addEventListener("click", () => {
    const p = readParams();
    const m = (p.brick_w - (p.usb_port_count - 1) * p.usb_pitch) / 2;
    writeParams({ ...p, usb_side_margin: Math.max(2, m) });
    scheduleRebuild();
  });
  $("reset")?.addEventListener("click", () => {
    writeParams(DEFAULT_PARAMS);
    fittedOnce = false;
    rebuild({ fit: true });
  });
  $("resetView")?.addEventListener("click", () => {
    if (lastGood) preview.fit(lastGood.dims);
  });
  $("dlBase")?.addEventListener("click", () => downloadPart("base"));
  $("dlLid")?.addEventListener("click", () => downloadPart("lid"));
  $("dlBoth")?.addEventListener("click", () => downloadPart("both"));
  $("presetPhotive")?.addEventListener("click", () => {
    writeParams({
      ...DEFAULT_PARAMS,
      brick_l: 100,
      brick_w: 70,
      brick_h: 26,
      brick_r: 4,
    });
    fittedOnce = false;
    rebuild({ fit: true });
  });
}

const versionEl = $("app-version");
if (versionEl) versionEl.textContent = `Photive travel case v${APP_VERSION}`;

preview = new CasePreview({ canvas: $("view") });
writeParams(DEFAULT_PARAMS);
bind();
rebuild({ fit: true });
