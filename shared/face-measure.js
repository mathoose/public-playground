import { calloutShift, faceGap } from "./measure.js";

/**
 * Two-click face distance measure (Costco bin lock behavior): bubble outside the part,
 * dimension line offset from the mesh. Mutates `host` (usually a preview instance).
 */
export function attachFaceMeasure(host, { THREE, canvas, scene, getTargets, getBox }) {
  host.measureMode = false;
  host.picks = [];
  host.onMeasure = null;
  host.measureReadout = null;

  host.callout = host.callout || new THREE.Group();
  if (!host.callout.parent) scene.add(host.callout);

  host.raycaster = host.raycaster || new THREE.Raycaster();
  host._pointerDown = null;
  host._bubble = document.getElementById("measureBubble");
  host._bubbleValue = document.getElementById("measureValue");
  host._bubbleKind = document.getElementById("measureKind");
  host._calloutMid = null;

  if (!host._faceMeasureBound) {
    host._faceMeasureBound = true;
    canvas.addEventListener("pointerdown", (event) => {
      host._pointerDown = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    canvas.addEventListener("pointerup", (event) => host._onFaceMeasurePointerUp?.(event));
  }

  host.setMeasureMode = function setMeasureMode(on) {
    host.measureMode = Boolean(on);
    canvas.parentElement?.classList.toggle("measuring", host.measureMode);
    if (!host.measureMode) host.clearMeasure();
  };

  host.clearMeasure = function clearMeasure() {
    const had = host.picks.length > 0;
    host.picks = [];
    host.measureReadout = null;
    host._calloutMid = null;
    host._clearMeasureCallout();
    host._hideMeasureBubble();
    if (had && host.measureMode) host.onMeasure?.({ phase: "cleared" });
  };

  host._clearMeasureCallout = function _clearMeasureCallout() {
    while (host.callout.children.length) {
      const child = host.callout.children.pop();
      child.geometry?.dispose();
      child.material?.dispose();
    }
  };

  host._hideMeasureBubble = function _hideMeasureBubble() {
    if (host._bubble) host._bubble.hidden = true;
  };

  host._onFaceMeasurePointerUp = function _onFaceMeasurePointerUp(event) {
    if (!host.measureMode || !host._pointerDown || host._pointerDown.id !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - host._pointerDown.x, event.clientY - host._pointerDown.y);
    host._pointerDown = null;
    if (moved > 6) return;
    const hit = host._measureHitAt(event.clientX, event.clientY);
    if (!hit) return;
    if (host.picks.length >= 2) host.clearMeasure();
    host.picks.push(hit);
    host._drawMeasure();
  };

  host._measureHitAt = function _measureHitAt(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    host.raycaster.setFromCamera(ndc, host.camera);
    const targets = getTargets() || [];
    const hits = host.raycaster.intersectObjects(targets, false);
    const hit = hits.find((h) => h?.face);
    if (!hit?.face) return null;
    const pos = hit.object.geometry.getAttribute("position");
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
    return {
      point: hit.point.clone(),
      normal,
      verts: [hit.face.a, hit.face.b, hit.face.c].map((index) =>
        new THREE.Vector3().fromBufferAttribute(pos, index).applyMatrix4(hit.object.matrixWorld)
      ),
    };
  };

  host._drawMeasure = function _drawMeasure() {
    host._clearMeasureCallout();
    const ink = new THREE.MeshBasicMaterial({ color: 0x9a3412 });
    for (const pick of host.picks) {
      if (pick.verts) {
        const geo = new THREE.BufferGeometry();
        const flat = new Float32Array(9);
        pick.verts.forEach((v, i) => {
          const lifted = v.clone().addScaledVector(pick.normal, 0.25);
          flat[i * 3] = lifted.x;
          flat[i * 3 + 1] = lifted.y;
          flat[i * 3 + 2] = lifted.z;
        });
        geo.setAttribute("position", new THREE.BufferAttribute(flat, 3));
        host.callout.add(
          new THREE.Mesh(
            geo,
            new THREE.MeshBasicMaterial({
              color: 0xc2410c,
              side: THREE.DoubleSide,
              depthTest: true,
              polygonOffset: true,
              polygonOffsetFactor: -4,
            })
          )
        );
      }
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), ink.clone());
      dot.position.copy(pick.point).addScaledVector(pick.normal, 0.45);
      host.callout.add(dot);
    }
    if (host.picks.length < 2) {
      host._hideMeasureBubble();
      host.measureReadout = null;
      host.onMeasure?.({ phase: "first" });
      return;
    }
    const gap = faceGap(host.picks[0], host.picks[1]);
    const box = getBox?.() || new THREE.Box3();
    const min = box.isBox3 ? box.min.toArray() : box.min;
    const max = box.isBox3 ? box.max.toArray() : box.max;
    const callout = calloutShift(host.picks[0].point, host.picks[1].point, min, max, 7);
    const endA = new THREE.Vector3(...callout.endA);
    const endB = new THREE.Vector3(...callout.endB);
    host.callout.add(host._measureRod(host.picks[0].point, endA, 0.28, 0x9a3412));
    host.callout.add(host._measureRod(host.picks[1].point, endB, 0.28, 0x9a3412));
    host.callout.add(host._measureRod(endA, endB, 0.42, 0x9a3412));
    host.callout.add(host._measureArrow(endA, endB));
    host.callout.add(host._measureArrow(endB, endA));
    host._calloutMid = endA.clone().add(endB).multiplyScalar(0.5);
    host.measureReadout = {
      phase: "pair",
      parallel: gap.parallel,
      mm: gap.primary,
      label: `${gap.primary.toFixed(1)} mm`,
      picks: host.picks.map((p) => ({
        point: { x: p.point.x, y: p.point.y, z: p.point.z },
        normal: p.normal ? { x: p.normal.x, y: p.normal.y, z: p.normal.z } : null,
        partId: p.partId,
      })),
    };
    host._placeMeasureBubble();
    host.onMeasure?.(host.measureReadout);
  };

  host._measureRod = function _measureRod(a, b, radius, color) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = Math.max(0.2, dir.length());
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, len, 8),
      new THREE.MeshBasicMaterial({ color })
    );
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return mesh;
  };

  host._measureArrow = function _measureArrow(from, toward) {
    const dir = new THREE.Vector3().subVectors(toward, from).normalize();
    const height = 2.6;
    const mesh = new THREE.Mesh(
      new THREE.ConeGeometry(1.05, height, 10),
      new THREE.MeshBasicMaterial({ color: 0x9a3412 })
    );
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    mesh.position.copy(from).addScaledVector(dir, height / 2);
    return mesh;
  };

  host._placeMeasureBubble = function _placeMeasureBubble() {
    const bubble = host._bubble;
    if (!bubble || !host._calloutMid || host.picks.length < 2) {
      host._hideMeasureBubble();
      return;
    }
    const projected = host._calloutMid.clone().project(host.camera);
    if (projected.z > 1) {
      bubble.hidden = true;
      return;
    }
    const parent = canvas.parentElement || canvas;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const x = Math.min(w - 28, Math.max(28, (projected.x * 0.5 + 0.5) * w));
    const y = Math.min(h - 18, Math.max(18, (-projected.y * 0.5 + 0.5) * h));
    bubble.hidden = false;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    if (host._bubbleValue) host._bubbleValue.textContent = host.measureReadout.label;
    if (host._bubbleKind) {
      host._bubbleKind.textContent = host.measureReadout.parallel
        ? "between those faces"
        : "between the clicks";
    }
  };

  return host;
}

/** Wire the Measure chip. `onPair` runs for a finished distance. `onReset` runs when that pair is cleared. */
export function bindFaceMeasureUI({
  preview,
  panel,
  measureBtn = "measure",
  hintEl = "hint",
  defaultHint = "Drag to orbit · pinch or scroll to zoom",
  onPair,
  onReset,
}) {
  const $ = (id) => (typeof id === "string" ? document.getElementById(id) : id);
  const btn = $(measureBtn);
  const hint = $(hintEl);

  btn?.addEventListener("click", () => {
    const on = !preview.measureMode;
    preview.setMeasureMode(on);
    btn.classList.toggle("active", on);
    if (!on) onReset?.();
    if (hint) {
      hint.textContent = on ? "Click one face, then another" : defaultHint;
    }
  });

  preview.onMeasure = (info) => {
    if (!hint || !preview.measureMode) return;
    if (info.phase === "cleared") {
      hint.textContent = "Click one face, then another";
      onReset?.();
    }
    if (info.phase === "first") {
      hint.textContent = "Click the second face";
      onReset?.();
    }
    if (info.phase === "pair") {
      hint.textContent = `${info.label} · drag still orbits`;
      onPair?.(info, panel);
    }
  };
}

export function highlightMeasureParams(panel, keys) {
  if (!panel) return;
  panel.querySelectorAll(".mp-hot, .measure-hot").forEach((el) => el.classList.remove("mp-hot", "measure-hot"));
  for (const key of keys || []) {
    const input = panel.querySelector(`#${CSS.escape(key)}`);
    const row = input?.closest(".row, .field, label.check, .color-card");
    if (!row || row.hidden || row.closest("[hidden]")) continue;
    row.classList.add("mp-hot");
    const details = row.closest("details");
    if (details && !details.classList.contains("mp-block")) details.open = true;
  }
}
