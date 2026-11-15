import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./cad.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

export class ShelfPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xe7e0d4, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 8000);
    this.camera.up.set(0, 0, 1);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.scene.add(new THREE.HemisphereLight(0xfff6ea, 0xc8bba6, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(180, -260, 320);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffe0c2, 0.45);
    fill.position.set(-200, 140, 80);
    this.scene.add(fill);

    this.bed = new THREE.Mesh(
      new THREE.CircleGeometry(180, 72),
      new THREE.MeshStandardMaterial({ color: 0xd9d0c2, roughness: 1 }),
    );
    this.bed.position.z = -0.4;
    this.scene.add(this.bed);

    this.mat = new THREE.MeshStandardMaterial({
      color: 0xc4893a,
      roughness: 0.48,
      metalness: 0.04,
    });
    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.mat);
    this.scene.add(this.mesh);

    this.view = "angle";
    this.size = null;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
    this.setView("angle");
  }

  resize() {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setView(name) {
    this.view = name || "angle";
    const w = this.size?.width ?? 210;
    const h = this.size?.height ?? 250;
    const z = this.size?.totalZ ?? 210;
    const cx = w / 2;
    const cy = h / 2;
    const cz = z * 0.42;
    const dist = Math.max(w, h, z) * 2.05;
    const views = {
      angle: new THREE.Vector3(cx + dist * 0.62, cy - dist * 0.78, cz + dist * 0.42),
      plate: new THREE.Vector3(cx + dist * 0.01, cy - dist * 0.04, cz + dist * 0.95),
      side: new THREE.Vector3(cx + dist * 1.05, cy + dist * 0.02, cz + dist * 0.12),
    };
    this.camera.position.copy(views[this.view] || views.angle);
    this.controls.target.set(cx, cy, cz);
    this.controls.update();
  }

  update(result) {
    if (!result?.mesh) return;
    const d = result.d;
    this.size = { width: d.p.width, height: d.p.height, totalZ: d.totalZ };
    const geo = geomFrom(result.mesh);
    this.mesh.geometry.dispose();
    this.mesh.geometry = geo;
    const bedR = Math.max(d.p.width, d.p.height) * 0.72;
    this.bed.geometry.dispose();
    this.bed.geometry = new THREE.CircleGeometry(bedR, 72);
    this.bed.position.set(d.p.width / 2, d.p.height / 2, -0.4);
    this.setView(this.view);
  }

  _loop() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
