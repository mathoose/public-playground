import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { calloutShift, faceGap } from "./measure.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

function stadiumHole(length, width) {
  const path = new THREE.Path();
  const r = width / 2;
  const hx = Math.max(0.01, (length - width) / 2);
  path.absarc(hx, 0, r, Math.PI / 2, -Math.PI / 2, true);
  path.absarc(-hx, 0, r, -Math.PI / 2, Math.PI / 2, true);
  return path;
}

function roundedRectShape(length, width, radius) {
  const shape = new THREE.Shape();
  const hw = length / 2;
  const hh = width / 2;
  const r = Math.min(radius, hw - 0.05, hh - 0.05);
  shape.moveTo(-hw + r, -hh);
  shape.lineTo(hw - r, -hh);
  shape.absarc(hw - r, -hh + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(hw, hh - r);
  shape.absarc(hw - r, hh - r, r, 0, Math.PI / 2, false);
  shape.lineTo(-hw + r, hh);
  shape.absarc(-hw + r, hh - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(-hw, -hh + r);
  shape.absarc(-hw + r, -hh + r, r, Math.PI, Math.PI * 1.5, false);
  return shape;
}

function lidGeometry(d) {
  // Cropped lid: the rim is narrower than the hook, so the tabs peek out.
  const rim = 5.2;
  const outerL = d.p.slotLength + rim * 2;
  const outerW = d.p.slotWidth + rim * 2;
  const shape = roundedRectShape(outerL, outerW, 4);
  shape.holes.push(stadiumHole(d.p.slotLength, d.p.slotWidth));
  const lidT = Math.min(2.4, Math.max(1.5, d.throat - 1.3));
  const geo = new THREE.ExtrudeGeometry(shape, { depth: lidT, bevelEnabled: false, curveSegments: 24 });
  geo.translate(0, 0, d.thickness + (d.throat - lidT) / 2);
  return geo;
}

export class LockPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(48, -58, 42);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 6);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.78));
    this.scene.add(new THREE.HemisphereLight(0xfff6e4, 0xc4b8a4, 0.45));
    const key = new THREE.DirectionalLight(0xffffff, 1.25);
    key.position.set(-40, -60, 90);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff4d6, 0.55);
    fill.position.set(50, 24, 30);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(160, 16, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.05;
    this.scene.add(this.grid);

    this.lockMat = new THREE.MeshStandardMaterial({
      color: 0xfffaf3,
      roughness: 0.42,
      metalness: 0.02,
    });
    this.lidMat = new THREE.MeshStandardMaterial({
      color: 0xf0c014,
      roughness: 0.58,
      metalness: 0.02,
      side: THREE.DoubleSide,
    });

    this.lockMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.lockMat);
    this.lidMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.lidMat);
    this.scene.add(this.lockMesh);
    this.scene.add(this.lidMesh);

    this.callout = new THREE.Group();
    this.scene.add(this.callout);
    this.measureMode = false;
    this.picks = [];
    this.onMeasure = null;
    this.raycaster = new THREE.Raycaster();
    this._pointerDown = null;
    this._bubble = document.getElementById("measureBubble");
    this._bubbleValue = document.getElementById("measureValue");
    this._bubbleKind = document.getElementById("measureKind");
    canvas.addEventListener("pointerdown", (event) => {
      this._pointerDown = { x: event.clientX, y: event.clientY, id: event.pointerId };
    });
    canvas.addEventListener("pointerup", (event) => this._onPointerUp(event));

    this.fitted = false;
    this.view = "iso";
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { mesh, d } = result;
    this.d = d;
    this.lockMesh.geometry.dispose();
    this.lockMesh.geometry = geomFrom(mesh);
    this.lidMesh.geometry.dispose();
    this.lidMesh.geometry = lidGeometry(d);
    this.clearMeasure();
    if (!this.fitted) this.fit();
  }

  setMeasureMode(on) {
    this.measureMode = Boolean(on);
    this.canvas.parentElement?.classList.toggle("measuring", this.measureMode);
    if (!this.measureMode) this.clearMeasure();
  }

  clearMeasure() {
    const had = this.picks.length > 0;
    this.picks = [];
    this.measureReadout = null;
    this._calloutMid = null;
    this._clearCallout();
    this._hideBubble();
    if (had && this.measureMode) this.onMeasure?.({ phase: "cleared" });
  }

  _clearCallout() {
    while (this.callout.children.length) {
      const child = this.callout.children.pop();
      child.geometry?.dispose();
      child.material?.dispose();
    }
  }

  _hideBubble() {
    if (this._bubble) this._bubble.hidden = true;
  }

  _onPointerUp(event) {
    if (!this.measureMode || !this._pointerDown || this._pointerDown.id !== event.pointerId) return;
    const moved = Math.hypot(event.clientX - this._pointerDown.x, event.clientY - this._pointerDown.y);
    this._pointerDown = null;
    if (moved > 6) return;
    const hit = this._hitAt(event.clientX, event.clientY);
    if (!hit) return;
    if (this.picks.length >= 2) this.clearMeasure();
    this.picks.push(hit);
    this._drawMeasure();
  }

  _hitAt(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    const ndc = new THREE.Vector2(
      ((clientX - rect.left) / rect.width) * 2 - 1,
      -((clientY - rect.top) / rect.height) * 2 + 1
    );
    this.raycaster.setFromCamera(ndc, this.camera);
    const hits = this.raycaster.intersectObjects([this.lockMesh, this.lidMesh], false);
    const hit = hits[0];
    if (!hit?.face) return null;
    const pos = hit.object.geometry.getAttribute("position");
    const normal = hit.face.normal.clone().transformDirection(hit.object.matrixWorld).normalize();
    return {
      point: hit.point.clone(),
      normal,
      part: hit.object === this.lidMesh ? "lid" : "lock",
      verts: [hit.face.a, hit.face.b, hit.face.c].map((index) =>
        new THREE.Vector3().fromBufferAttribute(pos, index).applyMatrix4(hit.object.matrixWorld)
      ),
    };
  }

  /** Used by the page test: place a finished pair without a click. */
  showPair(a, b) {
    this.measureMode = true;
    this.canvas.parentElement?.classList.add("measuring");
    this.picks = [
      { point: new THREE.Vector3(a.point.x, a.point.y, a.point.z), normal: new THREE.Vector3(a.normal.x, a.normal.y, a.normal.z) },
      { point: new THREE.Vector3(b.point.x, b.point.y, b.point.z), normal: new THREE.Vector3(b.normal.x, b.normal.y, b.normal.z) },
    ];
    this._drawMeasure();
    return this.measureReadout;
  }

  _drawMeasure() {
    this._clearCallout();
    const ink = new THREE.MeshBasicMaterial({ color: 0x9a3412 });
    for (const pick of this.picks) {
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
        const face = new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            color: 0xc2410c,
            side: THREE.DoubleSide,
            depthTest: true,
            polygonOffset: true,
            polygonOffsetFactor: -4,
          })
        );
        this.callout.add(face);
      }
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 10), ink.clone());
      dot.position.copy(pick.point).addScaledVector(pick.normal, 0.45);
      this.callout.add(dot);
    }
    if (this.picks.length < 2) {
      this._hideBubble();
      this.measureReadout = null;
      this.onMeasure?.({ phase: "first" });
      return;
    }
    const gap = faceGap(this.picks[0], this.picks[1]);
    const box = new THREE.Box3().setFromObject(this.lockMesh);
    box.union(new THREE.Box3().setFromObject(this.lidMesh));
    const callout = calloutShift(this.picks[0].point, this.picks[1].point, box.min.toArray(), box.max.toArray(), 7);
    const endA = new THREE.Vector3(...callout.endA);
    const endB = new THREE.Vector3(...callout.endB);
    this.callout.add(this._rod(this.picks[0].point, endA, 0.28, 0x9a3412));
    this.callout.add(this._rod(this.picks[1].point, endB, 0.28, 0x9a3412));
    this.callout.add(this._rod(endA, endB, 0.42, 0x9a3412));
    this.callout.add(this._arrow(endA, endB));
    this.callout.add(this._arrow(endB, endA));
    this._calloutMid = endA.clone().add(endB).multiplyScalar(0.5);
    this.measureReadout = {
      phase: "pair",
      parallel: gap.parallel,
      mm: gap.primary,
      label: `${gap.primary.toFixed(1)} mm`,
    };
    this._placeBubble();
    this.onMeasure?.(this.measureReadout);
  }

  _rod(a, b, radius, color) {
    const dir = new THREE.Vector3().subVectors(b, a);
    const len = Math.max(0.2, dir.length());
    const mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius, len, 8),
      new THREE.MeshBasicMaterial({ color })
    );
    mesh.position.copy(a).add(b).multiplyScalar(0.5);
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
    return mesh;
  }

  _arrow(from, toward) {
    const dir = new THREE.Vector3().subVectors(toward, from).normalize();
    const height = 2.6;
    const mesh = new THREE.Mesh(
      new THREE.ConeGeometry(1.05, height, 10),
      new THREE.MeshBasicMaterial({ color: 0x9a3412 })
    );
    mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    mesh.position.copy(from).addScaledVector(dir, height / 2);
    return mesh;
  }

  _placeBubble() {
    const bubble = this._bubble;
    if (!bubble || !this._calloutMid || this.picks.length < 2) {
      this._hideBubble();
      return;
    }
    const projected = this._calloutMid.clone().project(this.camera);
    if (projected.z > 1) {
      bubble.hidden = true;
      return;
    }
    const parent = this.canvas.parentElement || this.canvas;
    const w = parent.clientWidth;
    const h = parent.clientHeight;
    const x = Math.min(w - 28, Math.max(28, (projected.x * 0.5 + 0.5) * w));
    const y = Math.min(h - 18, Math.max(18, (-projected.y * 0.5 + 0.5) * h));
    bubble.hidden = false;
    bubble.style.left = `${x}px`;
    bubble.style.top = `${y}px`;
    if (this._bubbleValue) this._bubbleValue.textContent = this.measureReadout.label;
    if (this._bubbleKind) {
      this._bubbleKind.textContent =
        this.kindText || (this.measureReadout.parallel ? "between those faces" : "between the clicks");
    }
  }

  fit() {
    this.setNamedView(this.view || "iso");
    this.fitted = true;
  }

  setNamedView(name) {
    const d = this.d;
    this.view = name || "iso";
    if (!d) return;
    this.camera.up.set(0, 0, 1);
    const z = d.thickness + d.throat * 0.35;
    const span = Math.max(d.hookY, d.p.slotLength + 12, 48);
    if (name === "top") {
      this.camera.position.set(0.15, -0.2, span * 1.15);
      this.controls.target.set(0, 0, z);
    } else if (name === "side") {
      this.camera.position.set(span * 1.25, 0, z);
      this.controls.target.set(0, 0, z);
    } else if (name === "hook") {
      this.camera.up.set(0, 1, 0);
      this.camera.position.set(span * 0.15, -span * 0.42, -span * 0.72);
      this.controls.target.set(0, 0, d.thickness * 0.4);
    } else {
      this.camera.position.set(span * 0.62, -span * 0.78, span * 0.34);
      this.controls.target.set(0, 1.5, z);
    }
    this.controls.update();
  }

  resize() {
    const parent = this.canvas.parentElement || this.canvas;
    const w = Math.max(1, parent.clientWidth);
    const h = Math.max(1, parent.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    if (this.picks.length === 2) this._placeBubble();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
