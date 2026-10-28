import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function geomFrom(positions) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

const GINGER = 0xa15c38;
const ICING = 0xf4f1ea;
const CANDY = 0xd7263d;

export class HousePreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xe7e1d6, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 2000);
    this.camera.up.set(0, 1, 0);
    this.camera.position.set(0, 0, 240);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 4, 8);

    this.scene.add(new THREE.AmbientLight(0xfff6ea, 0.62));
    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xcbbba6, 0.32));
    this.key = new THREE.DirectionalLight(0xfffaf3, 1.25);
    this.key.position.set(40, 80, 120);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.camera.near = 20;
    this.key.shadow.camera.far = 400;
    const s = 90;
    this.key.shadow.camera.left = -s;
    this.key.shadow.camera.right = s;
    this.key.shadow.camera.top = s;
    this.key.shadow.camera.bottom = -s;
    this.key.shadow.bias = -0.0006;
    this.scene.add(this.key);
    const fill = new THREE.DirectionalLight(0xffe0c2, 0.35);
    fill.position.set(-70, 20, 40);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(220, 16, 0xc9bfb0, 0xd9d0c2);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.4;
    this.scene.add(this.grid);

    this.gingerMat = new THREE.MeshStandardMaterial({ color: GINGER, roughness: 0.72, metalness: 0.02 });
    this.icingMat = new THREE.MeshStandardMaterial({ color: ICING, roughness: 0.48, metalness: 0.02 });
    this.candyMat = new THREE.MeshStandardMaterial({ color: CANDY, roughness: 0.38, metalness: 0.04 });
    this.ginger = new THREE.Mesh(new THREE.BufferGeometry(), this.gingerMat);
    this.icing = new THREE.Mesh(new THREE.BufferGeometry(), this.icingMat);
    this.candy = new THREE.Mesh(new THREE.BufferGeometry(), this.candyMat);
    for (const mesh of [this.ginger, this.icing, this.candy]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }

    this.show = { icing: true, candy: true, bed: true };
    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { parts } = result;
    this._set(this.ginger, parts.gingerbread.positions);
    this._set(this.icing, parts.icing.positions);
    this._set(this.candy, parts.candy.positions);
    this.applyShow();
    if (!this.fitted) this.fit();
  }

  _set(mesh, positions) {
    mesh.geometry.dispose();
    mesh.geometry = positions?.length ? geomFrom(positions) : new THREE.BufferGeometry();
  }

  applyShow() {
    this.icing.visible = this.show.icing;
    this.candy.visible = this.show.candy;
    this.grid.visible = this.show.bed;
  }

  setShow(patch) {
    Object.assign(this.show, patch);
    this.applyShow();
  }

  setNamedView(name) {
    const views = {
      front: { pos: [0, 6, 230], target: [0, 4, 8] },
      angle: { pos: [120, 40, 170], target: [0, 6, 8] },
      side: { pos: [210, 10, 30], target: [0, 4, 8] },
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
