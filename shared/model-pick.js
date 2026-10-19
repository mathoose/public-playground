// Click a part, or two points, on a parametric STL viewer.
//
//   import { installModelPick } from "../shared/model-pick.js";
//   const pick = installModelPick({
//     THREE, panel, canvas, camera, scene,
//     getParts: () => [
//       { id: "sleeve", label: "Sleeve", objects: [{ object: mesh, hit: "sleeve" }] },
//       { id: "bank", label: "Power bank", preview: true, objects: [{ object: bank, hit: "bank" }] },
//     ],
//     inspect: (hit) => ({ title, detail, params, box }),   // one click
//     measure: (a, b) => ({ title, detail, params }),       // two clicks — distance is computed here
//     onVisible: (shown) => preview.setUserParts(shown),
//   });
//   pick.refresh();   // after a rebuild, so the highlight follows the new size
//
// Hiding a part only changes the preview. The app's download path is untouched.
// `inspect` / `measure` must use dimensions the model already computes. An empty
// `params` list means no slider drives that spot or distance.

const STYLE_ID = "model-pick-style";
const PICK_CSS = `
.mp-block {
  margin: 0 0 12px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.45);
  overflow: hidden;
}
.mp-block > summary {
  cursor: pointer;
  padding: 10px 12px;
  font-weight: 700;
  list-style: none;
}
.mp-block > summary::-webkit-details-marker { display: none; }
.mp-body { padding: 0 12px 12px; }
.mp-note {
  margin: 0 0 8px;
  color: var(--muted, #78716c);
  font-size: 0.8rem;
  line-height: 1.4;
}
.mp-toggles {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.mp-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 6px 12px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 999px;
  background: #fff;
  color: var(--ink, #1c1917);
  font-size: 0.85rem;
  font-weight: 650;
  cursor: pointer;
  touch-action: manipulation;
}
.mp-toggle input {
  width: 18px;
  height: 18px;
  margin: 0;
  accent-color: var(--accent-2, #0f766e);
}
.mp-card {
  position: absolute;
  z-index: 4;
  left: 12px;
  right: 12px;
  bottom: 12px;
  max-width: 320px;
  padding: 10px 12px;
  border-radius: 14px;
  background: rgba(255, 251, 245, 0.96);
  color: var(--ink, #1c1917);
  box-shadow: 0 8px 24px rgba(28, 25, 23, 0.16);
  border: 1px solid #e7d7b8;
}
.mp-card[hidden] { display: none !important; }
.mp-card-title {
  margin: 0;
  font-weight: 750;
  font-size: 1rem;
  font-variant-numeric: tabular-nums;
}
.mp-card-sub { margin: 2px 0 0; font-size: 0.82rem; font-weight: 650; }
.mp-card-detail { margin: 4px 0 8px; font-size: 0.78rem; color: var(--muted, #57534e); line-height: 1.35; }
.mp-clear {
  min-height: 44px;
  padding: 8px 14px;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 999px;
  background: #fff;
  color: var(--ink, #1c1917);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.mp-tag {
  position: absolute;
  z-index: 4;
  transform: translate(-50%, -130%);
  padding: 2px 6px;
  border-radius: 999px;
  background: #9a3412;
  color: #fff;
  font-size: 0.72rem;
  font-weight: 750;
  pointer-events: none;
}
.mp-tag[hidden] { display: none !important; }
.row.mp-hot {
  background: #fef3c7;
  outline: 2px solid #d97706;
  border-radius: 10px;
  padding: 4px 6px;
}
`;

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = PICK_CSS;
  document.head.appendChild(style);
}

function hitIdOf(object) {
  let o = object;
  while (o) {
    if (o.userData && o.userData.mpHit) return o.userData.mpHit;
    o = o.parent;
  }
  return null;
}

export function installModelPick({
  THREE,
  panel,
  canvas,
  camera,
  scene,
  getParts,
  inspect,
  measure,
  onVisible,
  toggleHost = null,
  insertBefore = null,
}) {
  ensureStyle();
  const visible = {};
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const tmp = new THREE.Vector3();
  const hits = [];

  const stage = canvas.parentElement || canvas;
  if (getComputedStyle(stage).position === "static") stage.style.position = "relative";

  const card = document.createElement("div");
  card.className = "mp-card";
  card.hidden = true;
  card.innerHTML = `
    <p class="mp-card-title"></p>
    <p class="mp-card-sub"></p>
    <p class="mp-card-detail"></p>
    <button type="button" class="mp-clear">Clear pick</button>
  `;
  const titleEl = card.querySelector(".mp-card-title");
  const subEl = card.querySelector(".mp-card-sub");
  const detailEl = card.querySelector(".mp-card-detail");
  stage.appendChild(card);

  const tagA = document.createElement("div");
  const tagB = document.createElement("div");
  tagA.className = "mp-tag";
  tagB.className = "mp-tag";
  tagA.textContent = "A";
  tagB.textContent = "B";
  tagA.hidden = true;
  tagB.hidden = true;
  stage.appendChild(tagA);
  stage.appendChild(tagB);

  let toggleRoot = toggleHost;
  if (!toggleRoot) {
    const block = document.createElement("details");
    block.className = "mp-block";
    block.open = true;
    block.innerHTML = `
      <summary>Show</summary>
      <div class="mp-body">
        <p class="mp-note">Preview only. Hiding a part does not change the STL download.</p>
        <div class="mp-toggles"></div>
        <p class="mp-note">Click one spot for the sliders that change it. Click a second spot for the distance between them.</p>
      </div>
    `;
    const anchor = insertBefore || panel.querySelector(":scope > .settings-group, :scope > .mp-block") || panel.firstElementChild;
    if (anchor && anchor.parentElement === panel) panel.insertBefore(block, anchor);
    else panel.prepend(block);
    toggleRoot = block.querySelector(".mp-toggles");
  } else {
    const note = document.createElement("p");
    note.className = "mp-note";
    note.textContent = "Show or hide each part. Preview only — downloads still export every part.";
    const toggles = document.createElement("div");
    toggles.className = "mp-toggles";
    toggleHost.prepend(toggles);
    toggleHost.insertBefore(note, toggles);
    toggleRoot = toggles;
  }

  const markerGeo = new THREE.SphereGeometry(1.35, 16, 12);
  const markerMat = new THREE.MeshBasicMaterial({ color: 0x9a3412, depthTest: false });
  const markerA = new THREE.Mesh(markerGeo, markerMat);
  const markerB = new THREE.Mesh(markerGeo, markerMat.clone());
  markerB.material.color.setHex(0xb45309);
  markerA.visible = false;
  markerB.visible = false;
  markerA.raycast = () => {};
  markerB.raycast = () => {};
  markerA.renderOrder = 20;
  markerB.renderOrder = 20;

  const lineGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(),
    new THREE.Vector3(),
  ]);
  const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0x9a3412, depthTest: false }));
  line.visible = false;
  line.raycast = () => {};
  line.renderOrder = 19;

  const box = new THREE.Box3();
  const boxHelper = new THREE.Box3Helper(box, 0xb45309);
  boxHelper.visible = false;
  boxHelper.raycast = () => {};
  boxHelper.material.depthTest = false;
  scene.add(markerA, markerB, line, boxHelper);

  function partsNow() {
    return getParts() || [];
  }

  function renderToggles() {
    const parts = partsNow();
    const seen = new Set();
    for (const part of parts) {
      seen.add(part.id);
      if (visible[part.id] === undefined) visible[part.id] = part.visible !== false;
    }
    toggleRoot.innerHTML = "";
    for (const part of parts) {
      const label = document.createElement("label");
      label.className = "mp-toggle";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = visible[part.id] !== false;
      input.dataset.show = part.id;
      const text = document.createElement("span");
      text.textContent = part.preview ? `${part.label} (preview)` : part.label;
      label.append(input, text);
      input.addEventListener("change", () => {
        visible[part.id] = input.checked;
        applyVisible();
      });
      toggleRoot.appendChild(label);
    }
    for (const id of Object.keys(visible)) {
      if (!seen.has(id)) delete visible[id];
    }
  }

  function applyVisible() {
    for (const part of partsNow()) {
      const on = visible[part.id] !== false;
      for (const entry of part.objects || []) {
        if (entry.object) entry.object.visible = on;
      }
    }
    onVisible?.({ ...visible });
  }

  function tagObjects() {
    for (const part of partsNow()) {
      for (const entry of part.objects || []) {
        if (entry.object) entry.object.userData.mpHit = entry.hit || part.id;
      }
    }
  }

  function highlightParams(keys) {
    panel.querySelectorAll(".mp-hot").forEach((el) => el.classList.remove("mp-hot"));
    const rows = [];
    for (const key of keys || []) {
      const input = panel.querySelector(`#${CSS.escape(key)}`);
      const row = input?.closest(".row");
      if (!row || row.hidden || row.closest("[hidden]")) continue;
      row.classList.add("mp-hot");
      const details = row.closest("details");
      if (details && !details.classList.contains("mp-block")) details.open = true;
      rows.push(row);
    }
    if (rows[0]) rows[0].scrollIntoView({ block: "nearest" });
  }

  function showBox(info) {
    const b = info?.box;
    if (!b?.min || !b?.max) {
      boxHelper.visible = false;
      return;
    }
    box.min.set(b.min[0], b.min[1], b.min[2]);
    box.max.set(b.max[0], b.max[1], b.max[2]);
    boxHelper.visible = true;
  }

  function placeTag(el, point, on) {
    el.hidden = !on || !point;
    if (!point) return;
    tmp.set(point.x, point.y, point.z).project(camera);
    const rect = canvas.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const x = ((tmp.x * 0.5 + 0.5) * rect.width) + (rect.left - stageRect.left);
    const y = ((-tmp.y * 0.5 + 0.5) * rect.height) + (rect.top - stageRect.top);
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.hidden = tmp.z < -1 || tmp.z > 1;
  }

  function showSingle(hit) {
    const info = inspect(hit) || {};
    card.hidden = false;
    titleEl.textContent = info.title || "Spot";
    subEl.textContent = "One click";
    const params = info.params || [];
    detailEl.textContent = [
      info.detail || (params.length ? "Highlighted sliders change this spot." : "No slider sets this spot."),
      "Click a second spot to measure the distance.",
    ].join(" ");
    highlightParams(params);
    showBox(info);
    markerA.position.set(hit.point.x, hit.point.y, hit.point.z);
    markerA.visible = true;
    markerB.visible = false;
    line.visible = false;
    tagB.hidden = true;
  }

  function showPair(a, b) {
    const distance = Math.hypot(b.point.x - a.point.x, b.point.y - a.point.y, b.point.z - a.point.z);
    const info = measure(a, b) || {};
    const params = info.params || [];
    card.hidden = false;
    titleEl.textContent = `${distance.toFixed(1)} mm`;
    subEl.textContent = info.title || "Point A to point B";
    detailEl.textContent = info.detail || (params.length ? "Highlighted sliders change this distance." : "No slider sets this distance.");
    highlightParams(params);
    showBox(null);
    markerA.position.set(a.point.x, a.point.y, a.point.z);
    markerB.position.set(b.point.x, b.point.y, b.point.z);
    markerA.visible = true;
    markerB.visible = true;
    const pos = lineGeo.getAttribute("position");
    pos.setXYZ(0, a.point.x, a.point.y, a.point.z);
    pos.setXYZ(1, b.point.x, b.point.y, b.point.z);
    pos.needsUpdate = true;
    lineGeo.computeBoundingSphere();
    line.visible = true;
  }

  function redraw() {
    if (!hits.length) return;
    if (hits.length === 1) showSingle(hits[0]);
    else showPair(hits[0], hits[1]);
  }

  function clear() {
    hits.length = 0;
    card.hidden = true;
    markerA.visible = false;
    markerB.visible = false;
    line.visible = false;
    boxHelper.visible = false;
    tagA.hidden = true;
    tagB.hidden = true;
    highlightParams([]);
  }

  function pickAt(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    tagObjects();
    const targets = [];
    for (const part of partsNow()) {
      if (visible[part.id] === false) continue;
      for (const entry of part.objects || []) {
        if (entry.object && entry.object.visible) targets.push(entry.object);
      }
    }
    const found = raycaster.intersectObjects(targets, true);
    const hit = found.find((h) => h.object && h.face);
    if (!hit) return;
    const point = { x: hit.point.x, y: hit.point.y, z: hit.point.z };
    let normal = null;
    if (hit.face) {
      tmp.copy(hit.face.normal);
      const nmat = new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld);
      tmp.applyMatrix3(nmat).normalize();
      normal = { x: tmp.x, y: tmp.y, z: tmp.z };
    }
    const record = { point, normal, partId: hitIdOf(hit.object), object: hit.object };
    if (hits.length >= 2) hits.length = 0;
    hits.push(record);
    redraw();
  }

  let down = null;
  canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || e.isPrimary === false) return;
    down = { x: e.clientX, y: e.clientY, id: e.pointerId };
  });
  window.addEventListener("pointerup", (e) => {
    if (!down || e.pointerId !== down.id) return;
    const dx = e.clientX - down.x;
    const dy = e.clientY - down.y;
    down = null;
    if (dx * dx + dy * dy > 64) return;
    const rect = canvas.getBoundingClientRect();
    if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) return;
    pickAt(e.clientX, e.clientY);
  });
  card.querySelector(".mp-clear").addEventListener("click", (e) => {
    e.preventDefault();
    clear();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !(e.target instanceof HTMLInputElement)) clear();
  });

  function tick() {
    placeTag(tagA, hits[0]?.point, hits.length >= 1);
    placeTag(tagB, hits[1]?.point, hits.length >= 2);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  renderToggles();

  // Undo installs its own bar at the top. Keep Show directly under that bar.
  requestAnimationFrame(() => {
    const history = panel.querySelector(":scope > .history-bar");
    const block = panel.querySelector(":scope > .mp-block");
    if (history && block && block.parentElement === panel) history.after(block);
  });

  return {
    /** Rebuild the show/hide list when the set of parts changes (tab switch). */
    sync() {
      renderToggles();
    },
    /** Re-run the open pick against current dimensions (after a slider rebuild). */
    refresh() {
      redraw();
    },
    clear,
    visibility() {
      return { ...visible };
    },
    setVisible(map, { silent = false } = {}) {
      for (const [id, on] of Object.entries(map || {})) visible[id] = !!on;
      renderToggles();
      if (silent) {
        for (const part of partsNow()) {
          const on = visible[part.id] !== false;
          for (const entry of part.objects || []) {
            if (entry.object) entry.object.visible = on;
          }
        }
      } else {
        applyVisible();
      }
    },
    clickClient(clientX, clientY) {
      pickAt(clientX, clientY);
    },
    project(x, y, z) {
      tmp.set(x, y, z).project(camera);
      const rect = canvas.getBoundingClientRect();
      return {
        x: rect.left + (tmp.x * 0.5 + 0.5) * rect.width,
        y: rect.top + (-tmp.y * 0.5 + 0.5) * rect.height,
        behind: tmp.z < -1 || tmp.z > 1,
      };
    },
  };
}
