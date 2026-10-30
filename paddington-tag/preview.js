import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function geomFrom(positions) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

const KRAFT = 0xd2b48a;
const INK = 0x1c1917;
const RING = 0x6b2c1a;

export class TagPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xe6dfd2, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 2000);
    this.camera.up.set(0, 1, 0);
    this.camera.position.set(8, 18, 90);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 28, 0);

    this.scene.add(new THREE.AmbientLight(0xfff6ea, 0.55));
    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xc4b59a, 0.35));
    this.key = new THREE.DirectionalLight(0xfffaf3, 1.35);
    this.key.position.set(28, 18, 70);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.camera.near = 10;
    this.key.shadow.camera.far = 220;
    const s = 50;
    this.key.shadow.camera.left = -s;
    this.key.shadow.camera.right = s;
    this.key.shadow.camera.top = s;
    this.key.shadow.camera.bottom = -s;
    this.key.shadow.bias = -0.0004;
    this.scene.add(this.key);
    const fill = new THREE.DirectionalLight(0xffe6c4, 0.38);
    fill.position.set(-40, 50, 30);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(160, 16, 0xc9bfb0, 0xd9d0c2);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.35;
    this.scene.add(this.grid);

    this.mat = new THREE.MeshStandardMaterial({
      color: KRAFT,
      roughness: 0.62,
      metalness: 0.03,
    });
    this.letterMat = new THREE.MeshStandardMaterial({
      color: INK,
      roughness: 0.45,
      metalness: 0.02,
    });
    this.ringMat = new THREE.MeshStandardMaterial({
      color: RING,
      roughness: 0.48,
      metalness: 0.06,
    });
    this.cordMat = new THREE.MeshStandardMaterial({
      color: 0x3f342c,
      roughness: 0.72,
      metalness: 0.02,
    });

    this.tagMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.mat);
    this.letterMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.letterMat);
    this.ringMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.ringMat);
    this.tagMesh.castShadow = true;
    this.tagMesh.receiveShadow = true;
    this.letterMesh.castShadow = true;
    this.letterMesh.receiveShadow = true;
    this.ringMesh.castShadow = true;
    this.ringMesh.receiveShadow = true;
    this.cord = new THREE.Mesh(new THREE.BufferGeometry(), this.cordMat);
    this.cord.castShadow = true;
    this.scene.add(this.tagMesh, this.letterMesh, this.ringMesh, this.cord);

    this.show = { letters: true, ring: true, cord: true, bed: true };
    this.fitted = false;
    this.d = null;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { tagPos, letterPos, ringPos, d } = result;
    this.d = d;
    this.tagMesh.geometry.dispose();
    this.tagMesh.geometry = geomFrom(tagPos);
    this.letterMesh.geometry.dispose();
    this.letterMesh.geometry = letterPos?.length
      ? geomFrom(letterPos)
      : new THREE.BufferGeometry();
    this.ringMesh.geometry.dispose();
    this.ringMesh.geometry = ringPos?.length ? geomFrom(ringPos) : new THREE.BufferGeometry();
    this._syncCord();
    this.applyShow();
    if (!this.fitted) this.fit();
  }

  _syncCord() {
    const d = this.d;
    if (!d) return;
    const R = Math.max(14, d.width * 0.42);
    const tube = Math.max(0.7, Math.min(1.15, d.p.hole / 2 - 0.7));
    this.cord.geometry.dispose();
    const geo = new THREE.TorusGeometry(R, tube, 18, 64);
    geo.rotateY(Math.PI / 2);
    this.cord.geometry = geo;
    this.cord.position.set(d.holeX, d.holeY + R, d.p.thickness / 2);
  }

  applyShow() {
    this.letterMesh.visible = this.show.letters;
    this.ringMesh.visible = this.show.ring;
    this.cord.visible = this.show.cord;
    this.grid.visible = this.show.bed;
  }

  setShow(partial) {
    Object.assign(this.show, partial);
    this.applyShow();
  }

  fit() {
    this.setNamedView("front");
    this.fitted = true;
  }

  setNamedView(name) {
    const d = this.d;
    if (!d) return;
    this.camera.up.set(0, 1, 0);
    const h = d.height;
    const fov = name === "letters" ? 28 : 34;
    this.camera.fov = fov;
    if (name === "letters") {
      this.camera.position.set(12, 20, 34);
      this.controls.target.set(5, 30, 0.8);
    } else if (name === "iso") {
      this.camera.position.set(h * 0.72, h * 0.05, h * 0.95);
      this.controls.target.set(0, h * 0.46, 0.4);
    } else {
      this.camera.position.set(h * 0.22, h * 0.28, h * 2.05);
      this.controls.target.set(0, h * 0.47, 0.3);
    }
    this.camera.updateProjectionMatrix();
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
    if (this.picks?.length === 2) this._placeMeasureBubble?.();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
