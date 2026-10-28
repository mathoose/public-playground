import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const GOLD = 0xc6a15b;

export class FramePreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    this.renderer.setClearColor(0xe7e1d6, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 4000);
    this.camera.up.set(0, 1, 0);
    this.camera.position.set(0, 0, 260);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 4);

    this.scene.add(new THREE.AmbientLight(0xfff4e4, 0.7));
    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xcbbba0, 0.35));
    const key = new THREE.DirectionalLight(0xfffaf2, 1.15);
    key.position.set(80, 120, 160);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffe0c0, 0.35);
    fill.position.set(-100, -20, 40);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(500, 20, 0xc9bfb0, 0xd9d0c2);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.4;
    this.scene.add(this.grid);

    this.mat = new THREE.MeshStandardMaterial({
      color: GOLD,
      roughness: 0.46,
      metalness: 0.18,
    });
    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.mat);
    this.scene.add(this.mesh);
    this.index = null;
    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(mapped, idx, span, shade = true) {
    let geo = this.mesh.geometry;
    const attr = geo.getAttribute("position");
    if (!attr || attr.count !== mapped.length / 3) {
      geo.dispose();
      geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(mapped, 3));
      geo.setIndex(new THREE.BufferAttribute(idx, 1));
      this.mesh.geometry = geo;
    } else {
      attr.array = mapped;
      attr.needsUpdate = true;
    }
    if (shade || !geo.getAttribute("normal")) geo.computeVertexNormals();
    this.span = span;
    if (!this.fitted) this.fit();
  }

  setNamedView(name) {
    const h = (this.span?.height || 100) * 0.5;
    const dist = Math.max(this.span?.width || 80, this.span?.height || 100) * 1.7;
    const views = {
      front: { pos: [0, 0, dist], target: [0, 0, 4] },
      angle: { pos: [dist * 0.75, h * 0.15, dist * 0.85], target: [0, 0, 4] },
      side: { pos: [dist, 0, dist * 0.15], target: [0, 0, 4] },
    };
    const v = views[name] || views.front;
    this.camera.position.set(...v.pos);
    this.controls.target.set(...v.target);
    this.controls.update();
    this.fitted = true;
  }

  fit() {
    this.setNamedView("angle");
  }

  resize() {
    const parent = this.canvas.parentElement || this.canvas;
    const w = parent.clientWidth || 1;
    const h = parent.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
