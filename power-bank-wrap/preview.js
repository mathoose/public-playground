import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

export class CasePreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2500);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(-110, -150, 120);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(90, 36, 12);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(-40, -80, 120);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff7ed, 0.42);
    fill.position.set(80, 40, -20);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(280, 28, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.caseMat = new THREE.MeshStandardMaterial({
      color: 0xc4b8a4,
      roughness: 0.52,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    this.bankMat = new THREE.MeshStandardMaterial({
      color: 0xb7d1a8,
      roughness: 0.62,
      metalness: 0.04,
    });
    this.glassMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.28,
      metalness: 0.12,
    });

    this.caseMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.caseMat);
    this.bankMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.bankMat);
    this.glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.glassMat);
    this.scene.add(this.caseMesh);
    this.scene.add(this.bankMesh);
    this.scene.add(this.glassMesh);

    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { mesh, d } = result;
    this.caseMesh.geometry.dispose();
    this.caseMesh.geometry = geomFrom(mesh);

    this.bankMesh.geometry.dispose();
    this.bankMesh.geometry = new THREE.BoxGeometry(
      Math.max(1, d.p.bankL),
      Math.max(1, d.p.bankW),
      Math.max(1, d.p.bankH)
    );
    this.bankMesh.position.set(
      d.bankX0 + d.p.bankL / 2,
      d.bankY0 + d.p.bankW / 2,
      d.p.floor + d.p.bankH / 2
    );

    this.glassMesh.geometry.dispose();
    this.glassMesh.geometry = new THREE.BoxGeometry(28, Math.max(1, d.p.bankW - 4), 0.6);
    this.glassMesh.position.set(
      d.bankX0 + 16,
      d.bankY0 + d.p.bankW / 2,
      d.p.floor + d.p.bankH + 0.15
    );

    this.grid.position.set(d.totalL / 2, d.nestOuterW / 2, -0.2);
    this.d = d;
    if (!this.fitted) this.fit();
  }

  fit() {
    const d = this.d;
    if (!d) return;
    const span = Math.max(d.totalL, d.nestOuterW, d.baseZ + d.postTop, 90);
    const dist = span * 1.25;
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(-dist * 0.5, -dist * 0.78, dist * 0.52);
    this.controls.target.set(d.totalL / 2, d.nestOuterW / 2, d.baseZ * 0.4);
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
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
