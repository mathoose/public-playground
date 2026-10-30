import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

export class CoasterPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xe6dfd2, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 4000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(150, -110, 150);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 12);

    this.scene.add(new THREE.HemisphereLight(0xfff7ee, 0xc8bba8, 0.9));
    const key = new THREE.DirectionalLight(0xffffff, 1.45);
    key.position.set(90, -180, 70);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffe4c8, 0.45);
    fill.position.set(-120, 60, -80);
    this.scene.add(fill);

    this.bed = new THREE.Mesh(
      new THREE.CircleGeometry(80, 72),
      new THREE.MeshStandardMaterial({ color: 0xd9d0c2, roughness: 1 }),
    );
    this.bed.position.z = -0.05;
    this.scene.add(this.bed);

    this.mat = new THREE.MeshStandardMaterial({
      color: 0xc4895a,
      roughness: 0.52,
      metalness: 0.02,
    });
    this.mesh = new THREE.Mesh(new THREE.BufferGeometry(), this.mat);
    this.scene.add(this.mesh);

    this.fitted = false;
    this.view = "angle";
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement);
    this.resize();
  }

  resize() {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  setView(name) {
    this.view = name;
    const views = {
      angle: new THREE.Vector3(150, -110, 150),
      front: new THREE.Vector3(0, -210, 80),
      top: new THREE.Vector3(0.1, 0.1, 280),
    };
    this.camera.position.copy(views[name] || views.angle);
    this.controls.target.set(0, 0, 12);
    this.controls.update();
  }

  fit() {
    this.setView(this.view);
    this.fitted = true;
  }

  update(result) {
    if (!result?.mesh) return;
    this.mesh.geometry.dispose();
    this.mesh.geometry = geomFrom(result.mesh);
    if (!this.fitted) this.fit();
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
