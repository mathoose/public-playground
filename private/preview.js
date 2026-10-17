import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { HOLDER } from "./holder-geometry.js";

/** One viewer, used for the phone holder (live stretch) and the pumpkin fidget. */
export class Preview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.5, 4000);
    this.camera.up.set(0, 0, 1);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(-60, -120, 160);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff7ed, 0.45);
    fill.position.set(90, 60, -20);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(300, 30, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.mat = new THREE.MeshStandardMaterial({ color: 0xc4b8a4, roughness: 0.5, metalness: 0.05, side: THREE.DoubleSide });
    this.pumpkinMat = new THREE.MeshStandardMaterial({ color: 0xf08a24, roughness: 0.55, metalness: 0.02, side: THREE.DoubleSide });
    this.model = new THREE.Mesh(new THREE.BufferGeometry(), this.mat);
    this.scene.add(this.model);

    this.phoneMats = [
      new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.35, transparent: true, opacity: 0.55 }),
      new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.35, transparent: true, opacity: 0.45 }),
      new THREE.MeshStandardMaterial({ color: 0x0f766e, roughness: 0.35, transparent: true, opacity: 0.45 }),
    ];
    this.phones = new THREE.Group();
    this.scene.add(this.phones);

    this.box = new THREE.Box3();
    this.fitted = false;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  /** Flat-shaded non-indexed geometry; keeps a handle so positions can be rewritten live. */
  setIndexed(positions, indices, { pumpkin = false } = {}) {
    const n = indices.length;
    const flat = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const k = indices[i] * 3;
      flat[i * 3] = positions[k];
      flat[i * 3 + 1] = positions[k + 1];
      flat[i * 3 + 2] = positions[k + 2];
    }
    this.setFlat(flat, { pumpkin });
  }

  setFlat(flat, { pumpkin = false } = {}) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(flat, 3));
    geo.computeVertexNormals();
    this.model.geometry.dispose();
    this.model.geometry = geo;
    this.model.material = pumpkin ? this.pumpkinMat : this.mat;
    this.refreshBounds();
  }

  /** For live stretch: the flat source array to read from + writes into the live attribute. */
  flatPositions() {
    return this.model.geometry.getAttribute("position");
  }

  touch() {
    const attr = this.model.geometry.getAttribute("position");
    attr.needsUpdate = true;
    this.model.geometry.computeVertexNormals();
    this.model.geometry.computeBoundingSphere();
    this.refreshBounds();
  }

  setScale(s) {
    this.model.scale.setScalar(s);
    this.refreshBounds();
  }

  refreshBounds() {
    this.model.updateMatrixWorld(true);
    this.box.setFromObject(this.model);
    if (!this.box.isEmpty()) this.grid.position.set(0, 0, this.box.min.z - 0.05);
  }

  /** Ghost phones leaning on the back wall, stacked toward the front. */
  setPhones(p, d, on = true) {
    while (this.phones.children.length) {
      const c = this.phones.children.pop();
      c.geometry.dispose();
    }
    this.phones.visible = !!on;
    if (!on) return;
    const h = 163;
    const lean = THREE.MathUtils.degToRad(HOLDER.LEAN_DEG);
    for (let i = 0; i < p.phones; i++) {
      const g = new THREE.BoxGeometry(p.phoneW, p.phoneT - 0.3, h);
      g.translate(0, -(p.phoneT - 0.3) / 2 - i * p.phoneT, h / 2);
      const m = new THREE.Mesh(g, this.phoneMats[i % this.phoneMats.length]);
      m.rotation.x = -lean;
      m.position.set(0, HOLDER.BACK_Y - 0.2, HOLDER.FLOOR_Z + 0.3);
      this.phones.add(m);
    }
  }

  fit() {
    this.setNamedView("iso");
    this.fitted = true;
  }

  setNamedView(name) {
    if (this.box.isEmpty()) return;
    const c = this.box.getCenter(new THREE.Vector3());
    const size = this.box.getSize(new THREE.Vector3());
    const r = Math.max(size.x, size.y, size.z, 20);
    const dist = r * 1.9;
    const dirs = {
      iso: [-0.62, -0.95, 0.62],
      front: [0, -1, 0.12],
      side: [-1, 0, 0.1],
      top: [0.0001, -0.05, 1],
    };
    const v = new THREE.Vector3(...(dirs[name] || dirs.iso)).normalize().multiplyScalar(dist);
    this.camera.up.set(0, 0, 1);
    this.camera.position.copy(c).add(v);
    this.controls.target.copy(c);
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
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
