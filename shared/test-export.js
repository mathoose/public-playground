// Test export: ask for the settings, engrave those numbers on a small piece,
// and keep the export in the library download log so it can be loaded again.
// Same path as the squiggle frame stand test.

import {
  LIBRARY_STORE_KEY,
  rememberExport,
  rememberSettings,
} from "./library-activity.js";

const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";
const STYLE_ID = "test-export-style";
const LOG_CAP = 12;

const CSS = `
dialog.test-prompt {
  border: 0;
  border-radius: 16px;
  padding: 18px 18px 14px;
  max-width: min(420px, calc(100vw - 32px));
  background: #f7f1e8;
  color: var(--ink, #1c1917);
  box-shadow: 0 18px 50px rgba(40, 30, 20, 0.28);
}
dialog.test-prompt::backdrop { background: rgba(40, 30, 20, 0.35); }
dialog.test-prompt h2 { margin: 0 0 6px; font-size: 1.05rem; }
dialog.test-prompt p { margin: 0 0 12px; color: var(--muted, #78716c); font-size: 0.85rem; line-height: 1.4; }
dialog.test-prompt label { display: grid; gap: 4px; margin: 8px 0; font-size: 0.9rem; }
dialog.test-prompt input {
  width: 100%;
  padding: 8px 8px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 8px;
  background: #fff;
  color: var(--ink, #1c1917);
  font-size: 16px;
}
dialog.test-prompt .actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
dialog.test-prompt .actions .ghost { order: -1; }
dialog.test-prompt button {
  appearance: none;
  border: 0;
  border-radius: 999px;
  padding: 8px 14px;
  font: inherit;
  font-size: 0.9rem;
  font-weight: 650;
  cursor: pointer;
  background: var(--accent, #9a3412);
  color: #fff;
  width: auto;
}
dialog.test-prompt button.ghost {
  background: transparent;
  color: var(--ink, #1c1917);
  border: 1px solid var(--line, #ddd6cc);
}
.test-log {
  list-style: none;
  margin: 10px 0 0;
  padding: 0;
  display: grid;
  gap: 6px;
}
.test-log li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--muted, #78716c);
}
.test-log button {
  appearance: none;
  border: 1px solid var(--line, #ddd6cc);
  background: #fff;
  color: var(--ink, #1c1917);
  border-radius: 999px;
  padding: 4px 10px;
  font: inherit;
  font-size: 0.78rem;
  font-weight: 650;
  cursor: pointer;
  width: auto;
}
#testStatus { margin: 8px 0 0; font-size: 0.85rem; }
#testStatus[data-kind="err"] { color: var(--warn, #9a3412); }
`;

const DIGIT_SEGS = {
  0: "abcedf",
  1: "bc",
  2: "abged",
  3: "abgcd",
  4: "fgbc",
  5: "afgcd",
  6: "afgedc",
  7: "abc",
  8: "abcdefg",
  9: "abfgcd",
};

const DIGIT_ADVANCE = 3.15;
const SPACE_ADVANCE = 1.3;
const DOT_ADVANCE = 1.45;

let wasmPromise = null;

export function formatSetting(value, step = 1) {
  const n = Number(value);
  if (!Number.isFinite(n)) return "0";
  const decimals = step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  const scale = 10 ** decimals;
  const q = Math.round(n * scale) / scale;
  if (decimals === 0) return String(q);
  return q.toFixed(decimals).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
}

export function settingLabel(fields, params) {
  return fields.map((field) => formatSetting(params[field.key], field.step)).join(" ");
}

function glyphAdvance(ch) {
  if (ch === " ") return SPACE_ADVANCE;
  if (ch === ".") return DOT_ADVANCE;
  return DIGIT_ADVANCE;
}

export function labelWidth(label) {
  let width = 0;
  for (const ch of String(label)) width += glyphAdvance(ch);
  return width;
}

function digitBoxes(ch, x0, y0, zTop) {
  const w = 2.5;
  const h = 4.1;
  const t = 0.52;
  const depth = 0.55;
  const z = zTop - depth / 2;
  const seg = {
    a: [w / 2, h - t / 2, w, t],
    b: [w - t / 2, h * 0.75, t, h / 2],
    c: [w - t / 2, h * 0.25, t, h / 2],
    d: [w / 2, t / 2, w, t],
    e: [t / 2, h * 0.25, t, h / 2],
    f: [t / 2, h * 0.75, t, h / 2],
    g: [w / 2, h / 2, w - t, t],
  };
  return [...(DIGIT_SEGS[ch] || "")].map((name) => {
    const [cx, cy, sx, sy] = seg[name];
    return { size: [sx, sy, depth], at: [x0 + cx, y0 + cy, z] };
  });
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

function logKey(appId) {
  return `${appId}-tests`;
}

export function readTestLog(appId) {
  const list = readLibraryStore().settings[logKey(appId)];
  return Array.isArray(list) ? list : [];
}

export function appendTestLog(appId, entry) {
  const data = readLibraryStore();
  const list = Array.isArray(data.settings[logKey(appId)]) ? data.settings[logKey(appId)] : [];
  list.unshift(entry);
  data.settings[logKey(appId)] = list.slice(0, LOG_CAP);
  try {
    localStorage.setItem(LIBRARY_STORE_KEY, JSON.stringify(data));
  } catch {
    /* the download still happened */
  }
}

export async function loadManifold() {
  if (!wasmPromise) {
    const spec = typeof window !== "undefined" ? MANIFOLD_JS : "manifold-3d";
    wasmPromise = import(/* @vite-ignore */ spec)
      .catch(() => import(/* @vite-ignore */ MANIFOLD_JS))
      .then((mod) => {
        const Module = mod.default || mod;
        const inBrowser = typeof window !== "undefined";
        return Module(
          inBrowser
            ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) }
            : {}
        );
      })
      .then((wasm) => {
        wasm.setup();
        return wasm;
      });
  }
  return wasmPromise;
}

function deleteAll(items) {
  for (const item of items) {
    if (item && typeof item.delete === "function") {
      try {
        item.delete();
      } catch {
        /* already freed */
      }
    }
  }
}

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function copyMesh(mesh) {
  return {
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
    numProp: mesh.numProp || 3,
  };
}

export function box(Manifold, size, center, keep) {
  return keep(Manifold.cube(size, true).translate(center));
}

export function rod(Manifold, height, radius, segments, at, keep) {
  return keep(Manifold.cylinder(height, radius, radius, segments, false).translate(at));
}

export function fuse(a, b, keep) {
  return assertOk(keep(a.add(b)), "union");
}

export function cut(a, b, keep) {
  return assertOk(keep(a.subtract(b)), "cut");
}

function engraveLabel(wasm, solid, label, x0, y0, zTop, keep) {
  const { Manifold } = wasm;
  let cursor = x0;
  let cutter = null;
  for (const ch of String(label)) {
    if (ch === " ") {
      cursor += SPACE_ADVANCE;
      continue;
    }
    if (ch === ".") {
      const dot = box(Manifold, [0.62, 0.62, 0.55], [cursor + 0.72, y0 + 0.55, zTop - 0.275], keep);
      cutter = cutter ? fuse(cutter, dot, keep) : dot;
      cursor += DOT_ADVANCE;
      continue;
    }
    for (const piece of digitBoxes(ch, cursor, y0, zTop)) {
      const block = box(Manifold, piece.size, piece.at, keep);
      cutter = cutter ? fuse(cutter, block, keep) : block;
    }
    cursor += DIGIT_ADVANCE;
  }
  if (!cutter) return solid;
  return assertOk(keep(solid.subtract(cutter)), "Test marking");
}

function attachShelf(wasm, solid, label, keep) {
  const { Manifold } = wasm;
  let body = solid;
  let bounds = body.boundingBox();
  if (bounds.min[2] < -1e-4 || bounds.min[2] > 1e-3) {
    body = keep(body.translate([0, 0, -bounds.min[2]]));
    bounds = body.boundingBox();
  }
  const text = String(label);
  const textW = labelWidth(text);
  const shelfD = 6.8;
  const shelfT = 1.8;
  const shelfW = Math.max(textW + 2.4, 10);
  const overlap = 0.75;
  const xCenter = (bounds.min[0] + bounds.max[0]) / 2;
  const yBack = bounds.min[1] + overlap;
  const yFront = yBack - shelfD;
  const shelf = box(Manifold, [shelfW, shelfD, shelfT], [xCenter, (yFront + yBack) / 2, shelfT / 2], keep);
  let fused = assertOk(keep(body.add(shelf)), "Test piece");
  fused = engraveLabel(wasm, fused, text, xCenter - textW / 2, yFront + 1.15, shelfT, keep);
  bounds = fused.boundingBox();
  if (bounds.min[2] < -1e-4) fused = keep(fused.translate([0, 0, -bounds.min[2]]));
  return fused;
}

export function meshToStl(mesh, name = "test") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const title = String(name).slice(0, 79);
  for (let i = 0; i < title.length; i++) header[i] = title.charCodeAt(i);
  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  new Uint8Array(buf, 0, 80).set(header);
  view.setUint32(80, triCount, true);
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const i0 = triVerts[t * 3] * stride;
    const i1 = triVerts[t * 3 + 1] * stride;
    const i2 = triVerts[t * 3 + 2] * stride;
    const ax = vertProperties[i0];
    const ay = vertProperties[i0 + 1];
    const az = vertProperties[i0 + 2];
    const bx = vertProperties[i1];
    const by = vertProperties[i1 + 1];
    const bz = vertProperties[i1 + 2];
    const cx = vertProperties[i2];
    const cy = vertProperties[i2 + 1];
    const cz = vertProperties[i2 + 2];
    let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    const nl = Math.hypot(nx, ny, nz) || 1;
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
    view.setFloat32(o + 12, ax, true);
    view.setFloat32(o + 16, ay, true);
    view.setFloat32(o + 20, az, true);
    view.setFloat32(o + 24, bx, true);
    view.setFloat32(o + 28, by, true);
    view.setFloat32(o + 32, bz, true);
    view.setFloat32(o + 36, cx, true);
    view.setFloat32(o + 40, cy, true);
    view.setFloat32(o + 44, cz, true);
    view.setUint16(o + 48, 0, true);
    o += 50;
  }
  return buf;
}

function downloadArrayBuffer(filename, buffer) {
  const blob = new Blob([buffer], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export async function buildMarkedTest({ feature, label, stlName }) {
  const wasm = await loadManifold();
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(48);
  const temps = [];
  const keep = (item) => {
    temps.push(item);
    return item;
  };
  try {
    const body = feature(wasm, keep, temps);
    if (!body) throw new Error("Test piece is empty");
    const marked = attachShelf(wasm, body, label, keep);
    const mesh = copyMesh(marked.getMesh());
    const volume = marked.volume();
    if (!(volume > 0)) throw new Error("Test piece has no volume");
    return { stl: meshToStl(mesh, stlName), mesh, volume, label };
  } finally {
    deleteAll(temps);
  }
}

function ensureStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

function clampField(field, value) {
  let n = Number(value);
  if (!Number.isFinite(n)) n = Number(field.fallback ?? field.min ?? 0);
  if (Number.isFinite(field.min)) n = Math.max(field.min, n);
  if (Number.isFinite(field.max)) n = Math.min(field.max, n);
  return n;
}

function summaryLine(fields, params) {
  return fields
    .map((field) => {
      const unit = field.unit ? ` ${field.unit}` : "";
      return `${field.label} ${formatSetting(params[field.key], field.step)}${unit}`;
    })
    .join(" · ");
}

function fileSlug(label) {
  return String(label).replace(/\s+/g, "-").replace(/\./g, "p");
}

function renderLog(listEl, items) {
  if (!items.length) {
    listEl.hidden = true;
    listEl.innerHTML = "";
    return;
  }
  listEl.hidden = false;
  listEl.innerHTML = items
    .map(
      (item, index) => `
        <li>
          <span>${item.summary || item.filename || "test"}</span>
          <button type="button" data-load-test="${index}">Load</button>
        </li>`
    )
    .join("");
}

function askSettings(dialog, fields, params) {
  if (!dialog || typeof dialog.showModal !== "function") return Promise.resolve(null);
  for (const field of fields) {
    const input = dialog.querySelector(`[name="${field.key}"]`);
    if (input) input.value = formatSetting(params[field.key], field.step);
  }
  dialog.showModal();
  return new Promise((resolve) => {
    const finish = () => {
      dialog.removeEventListener("close", finish);
      if (dialog.returnValue !== "ok") {
        resolve(null);
        return;
      }
      const chosen = {};
      for (const field of fields) {
        const input = dialog.querySelector(`[name="${field.key}"]`);
        chosen[field.key] = clampField(field, input?.value);
      }
      resolve(chosen);
    };
    dialog.addEventListener("close", finish);
  });
}

/**
 * Adds the test button, the download log, and the settings dialog.
 * `setParams` should write the form and rebuild. Designer saves stay as they are.
 */
export function mountTestExport({
  appId,
  actions,
  buttonLabel = "Test export",
  buttonClass = "wide",
  title = "Test export settings",
  fields,
  getParams,
  setParams,
  build,
  fileStem,
  labelFor,
}) {
  if (!actions || !fields?.length) return;
  ensureStyles();

  const button = document.createElement("button");
  button.type = "button";
  button.id = "dlTest";
  button.className = buttonClass;
  button.textContent = buttonLabel;
  actions.appendChild(button);

  const log = document.createElement("ul");
  log.className = "test-log";
  log.id = "testLog";
  log.hidden = true;
  actions.insertAdjacentElement("afterend", log);

  const note = document.createElement("p");
  note.id = "testStatus";
  note.className = "status";
  log.insertAdjacentElement("afterend", note);

  const dialog = document.createElement("dialog");
  dialog.id = "testPrompt";
  dialog.className = "test-prompt";
  const form = document.createElement("form");
  form.method = "dialog";
  const heading = document.createElement("h2");
  heading.textContent = title;
  const copy = document.createElement("p");
  copy.textContent = "These numbers are engraved on the test piece and saved so you can load this export again.";
  form.append(heading, copy);
  for (const field of fields) {
    const label = document.createElement("label");
    label.textContent = field.unit ? `${field.label} (${field.unit})` : field.label;
    const input = document.createElement("input");
    input.name = field.key;
    input.type = "number";
    input.inputMode = "decimal";
    if (field.min != null) input.min = String(field.min);
    if (field.max != null) input.max = String(field.max);
    if (field.step != null) input.step = String(field.step);
    label.appendChild(input);
    form.appendChild(label);
  }
  const row = document.createElement("div");
  row.className = "actions";
  const ok = document.createElement("button");
  ok.type = "submit";
  ok.value = "ok";
  ok.textContent = "Export test";
  const cancel = document.createElement("button");
  cancel.type = "submit";
  cancel.value = "cancel";
  cancel.className = "ghost";
  cancel.textContent = "Cancel";
  row.append(ok, cancel);
  form.appendChild(row);
  dialog.appendChild(form);
  document.body.appendChild(dialog);

  const setNote = (text, kind = "") => {
    note.textContent = text;
    note.dataset.kind = kind;
  };

  const paint = () => renderLog(log, readTestLog(appId));

  async function run() {
    const chosen = await askSettings(dialog, fields, getParams());
    if (!chosen) {
      setNote("Test export canceled.");
      return;
    }
    setParams({ ...getParams(), ...chosen });
    const params = getParams();
    const label = labelFor ? labelFor(params) : settingLabel(fields, params);
    setNote("Building test…");
    button.disabled = true;
    try {
      const built = await build(params, label);
      const filename = `${fileStem}-test-${fileSlug(label)}.stl`;
      downloadArrayBuffer(filename, built.stl);
      const summary = labelFor ? `${summaryLine(fields, params)} · ${label}` : summaryLine(fields, params);
      appendTestLog(appId, {
        at: Date.now(),
        filename,
        summary,
        label,
        params: { ...params },
      });
      rememberSettings(appId, params);
      rememberExport(appId, { filename, params });
      paint();
      setNote(`Test · ${summary} · engraved on the piece`);
    } catch (err) {
      console.error(err);
      setNote(String(err?.message || err), "err");
    } finally {
      button.disabled = false;
    }
  }

  function load(index) {
    const item = readTestLog(appId)[index];
    if (!item?.params) return;
    setParams(item.params);
    rememberSettings(appId, getParams());
    setNote(`Loaded test ${item.summary || item.label || ""}`.trim());
  }

  button.addEventListener("click", () => run());
  log.addEventListener("click", (event) => {
    const hit = event.target.closest("[data-load-test]");
    if (!hit) return;
    load(Number(hit.getAttribute("data-load-test")));
  });
  paint();
}
