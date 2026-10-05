import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

export class BoxPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(-90, -120, 110);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(70, 38, 20);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(-40, -80, 120);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff7ed, 0.42);
    fill.position.set(80, 40, -20);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(220, 22, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.baseMat = new THREE.MeshStandardMaterial({
      color: 0xb8b4ad,
      roughness: 0.52,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    this.lidMat = new THREE.MeshStandardMaterial({
      color: 0x9a958c,
      roughness: 0.48,
      metalness: 0.06,
      side: THREE.DoubleSide,
    });
    this.brickMat = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.7,
      metalness: 0.04,
      transparent: true,
      opacity: 0.28,
    });

    this.baseMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.baseMat);
    this.lidMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.lidMat);
    this.brickMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.brickMat);
    this.scene.add(this.baseMesh);
    this.scene.add(this.lidMesh);
    this.scene.add(this.brickMesh);

    this.showBase = true;
    this.showLid = true;
    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  setVisible({ base = true, lid = true } = {}) {
    this.showBase = base;
    this.showLid = lid;
    this.baseMesh.visible = base;
    this.lidMesh.visible = lid;
    this.brickMesh.visible = base;
  }

  update(result) {
    const { baseMesh, lidMesh, d } = result;
    this.baseMesh.geometry.dispose();
    this.lidMesh.geometry.dispose();
    this.baseMesh.geometry = geomFrom(baseMesh);
    this.lidMesh.geometry = geomFrom(lidMesh);

    this.brickMesh.geometry.dispose();
    this.brickMesh.geometry = new THREE.BoxGeometry(
      Math.max(1, d.brickL),
      Math.max(1, d.brickW),
      Math.max(1, d.cavityZ - 0.6)
    );
    this.brickMesh.position.set(
      d.usbXBrick + d.brickL / 2,
      d.outerW / 2,
      d.floor + (d.cavityZ - 0.6) / 2
    );

    this.grid.position.set(d.outerL / 2, d.outerW / 2, -0.2);
    this.d = d;
    this.baseMesh.visible = this.showBase;
    this.lidMesh.visible = this.showLid;
    this.brickMesh.visible = this.showBase;
    if (!this.fitted) this.fit();
  }

  fit() {
    const d = this.d;
    if (!d) return;
    const span = Math.max(d.outerL, d.outerW, d.baseZ + 40, 80);
    const dist = span * 1.35;
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(-dist * 0.55, -dist * 0.72, dist * 0.55);
    this.controls.target.set(d.outerL / 2, d.outerW / 2, d.baseZ * 0.45);
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
