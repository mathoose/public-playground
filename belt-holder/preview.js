import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

export class HolderPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 4000);
    this.camera.up.set(0, 0, 1);
    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 20);

    this.scene.add(new THREE.HemisphereLight(0xfffaf5, 0xd6d0c6, 0.9));
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.42));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(40, -90, 80);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xe7eef5, 0.45);
    fill.position.set(-70, 40, 30);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(220, 22, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.08;
    this.scene.add(this.grid);

    this.material = new THREE.MeshStandardMaterial({
      color: 0xf6f3ee,
      roughness: 0.46,
      metalness: 0.02,
    });
    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.material);
    this.scene.add(this.mesh);

    this.belt = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 1, 48),
      new THREE.MeshStandardMaterial({
        color: 0x2a241c,
        roughness: 0.68,
        metalness: 0.05,
        transparent: true,
        opacity: 0.94,
      })
    );
    this.scene.add(this.belt);

    this.mode = "clip";
    this.d = null;
    this.fitted = false;
    this.view = "angle";
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { d, mesh } = result;
    this.mesh.geometry.dispose();
    this.mesh.geometry = geomFrom(mesh);
    this.d = d;
    const modeChanged = this.mode !== d.mode;
    this.mode = d.mode;

    if (d.mode === "clip") {
      const rollR = d.innerR * 0.62;
      const rollLen = d.width * 0.7;
      this.belt.visible = true;
      this.belt.scale.set(rollR, rollLen, rollR);
      this.belt.position.set(0, 0, d.pinLength + d.wall + rollR);
    } else {
      this.belt.visible = false;
    }

    if (!this.fitted || modeChanged) this.fit();
  }

  setView(name) {
    this.view = name || "angle";
    this.fitted = false;
    this.fit();
  }

  fit() {
    const d = this.d;
    if (!d) return;
    const span = Math.max(d.sizeX, d.sizeY, d.maxZ, 40);
    const dist = (span * 0.82) / Math.tan((32 * Math.PI) / 360);
    if (this.view === "side") {
      this.look([0, 0, d.maxZ * 0.42], [0.04, -1, 0.12], dist);
      return;
    }
    if (this.view === "top") {
      this.look([0, 0, d.maxZ * 0.45], [0.15, -0.28, 1], dist * 0.92);
      return;
    }
    if (d.mode === "bin") {
      // Corner view: open top, a side wall, and the pins under the floor.
      this.look([0, 0, d.maxZ * 0.4], [0.9, -0.95, 0.52], dist);
      return;
    }
    // Three-quarter view: the open C, the belt, and the pins on the bed.
    this.look([0, 0, d.pinLength + 12], [1.05, -0.82, 0.16], dist * 0.94);
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
