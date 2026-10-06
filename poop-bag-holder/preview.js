import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./cad.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

const PARTS = ["body", "cap"];

export class HolderPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);
    this.renderer.localClippingEnabled = true;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.1, 2000);
    this.camera.up.set(0, 0, 1);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.62));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(80, -60, 120);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff1f2, 0.5);
    fill.position.set(-80, 60, 30);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(160, 16, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.clipPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    const solid = (color) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.48, metalness: 0.02, side: THREE.DoubleSide });
    const cap = (color) => new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
    this.mats = { body: solid(0xf2a6c2), cap: solid(0xe57fa6) };
    this.capMats = { body: cap(0x9d174d), cap: cap(0x831843) };
    this.meshes = {};
    this.caps = {};
    for (const part of PARTS) {
      this.meshes[part] = new THREE.Mesh(new THREE.BufferGeometry(), this.mats[part]);
      this.caps[part] = new THREE.Mesh(this.meshes[part].geometry, this.capMats[part]);
      this.caps[part].visible = false;
      this.scene.add(this.meshes[part], this.caps[part]);
    }

    this.rollMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8, transparent: true, opacity: 0.35 });
    this.roll = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 1, 48), this.rollMat);
    this.roll.rotation.x = Math.PI / 2;
    this.scene.add(this.roll);

    this.show = { body: true, cap: true, roll: true };
    this.section = false;
    this.fitted = false;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  setCapLift(z) {
    this.meshes.cap.position.z = z;
    this.caps.cap.position.z = z;
  }

  setVisible(next = {}) {
    Object.assign(this.show, next);
    this._applyVisibility();
  }

  /** Section plane through the axis (keeps y > 0) — shows the thread engagement. */
  setSection(on) {
    this.section = Boolean(on);
    const planes = this.section ? [this.clipPlane] : [];
    for (const part of PARTS) {
      this.mats[part].clippingPlanes = planes;
      this.mats[part].side = this.section ? THREE.FrontSide : THREE.DoubleSide;
      this.mats[part].needsUpdate = true;
      this.capMats[part].clippingPlanes = planes;
      this.capMats[part].needsUpdate = true;
    }
    this.rollMat.clippingPlanes = planes;
    this.rollMat.needsUpdate = true;
    this._applyVisibility();
  }

  _applyVisibility() {
    for (const part of PARTS) {
      this.meshes[part].visible = this.show[part];
      this.caps[part].visible = this.show[part] && this.section;
    }
    this.roll.visible = this.show.roll;
  }

  update(result) {
    const { d } = result;
    for (const part of PARTS) {
      this.meshes[part].geometry.dispose();
      const geo = geomFrom(result[`${part}Mesh`]);
      this.meshes[part].geometry = geo;
      this.caps[part].geometry = geo;
    }
    const r = d.p.rollD / 2;
    this.roll.scale.set(r, d.p.rollLen, r);
    this.roll.position.set(0, 0, d.p.floor + d.p.rollLen / 2 + 0.2);
    this.d = d;
    this._applyVisibility();
    if (!this.fitted) this.fit();
  }

  fit() {
    const d = this.d;
    if (!d) return;
    const span = Math.max(d.totalH + 22, d.capOD + d.tabReach, 60);
    this.look([0, 0, (d.totalH + 22) * 0.48], [1, 0.42, 0.42], span * 2.25);
  }

  look(target, dir, dist) {
    const t = new THREE.Vector3(...target);
    const v = new THREE.Vector3(...dir).normalize().multiplyScalar(dist);
    this.camera.up.set(0, 0, 1);
    this.camera.position.copy(t).add(v);
    this.controls.target.copy(t);
    this.controls.update();
    this.fitted = true;
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
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
