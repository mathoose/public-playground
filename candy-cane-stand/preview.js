import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(mesh.positions, 3));
  geo.setIndex(new THREE.BufferAttribute(mesh.indices, 1));
  geo.computeVertexNormals();
  return geo;
}

export class StandPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xe7e0d4, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 5000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(260, -240, 190);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 36);

    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xc9bfb0, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(140, -220, 180);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffe6cc, 0.4);
    fill.position.set(-180, 80, 40);
    this.scene.add(fill);

    this.bed = new THREE.Mesh(
      new THREE.CircleGeometry(130, 72),
      new THREE.MeshStandardMaterial({ color: 0xd9d0c2, roughness: 1 }),
    );
    this.bed.position.z = -0.4;
    this.scene.add(this.bed);

    this.mat = new THREE.MeshStandardMaterial({
      color: 0xf6f3ec,
      roughness: 0.62,
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
      angle: new THREE.Vector3(280, -250, 200),
      front: new THREE.Vector3(0, -380, 90),
      top: new THREE.Vector3(0.1, -0.1, 420),
    };
    this.camera.position.copy(views[name] || views.angle);
    this.controls.target.set(0, 0, 32);
    this.controls.update();
  }

  update(mesh) {
    if (!mesh?.positions) return;
    const geo = geomFrom(mesh);
    this.mesh.geometry.dispose();
    this.mesh.geometry = geo;
    if (!this.fitted) {
      this.setView(this.view);
      this.fitted = true;
    }
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
