import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function geomFrom(positions) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

const BONE = 0xe4d2ae;
const CHAIN = 0xf6ead0;
const CLASP = 0xc4a36e;

export class BagPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd5cdc2, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.5, 4000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(180, -220, 140);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 40);

    this.scene.add(new THREE.AmbientLight(0xfff6ea, 0.55));
    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xcbbba6, 0.35));
    this.key = new THREE.DirectionalLight(0xfffaf3, 1.35);
    this.key.position.set(80, -120, 180);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.camera.near = 10;
    this.key.shadow.camera.far = 900;
    const s = 220;
    this.key.shadow.camera.left = -s;
    this.key.shadow.camera.right = s;
    this.key.shadow.camera.top = s;
    this.key.shadow.camera.bottom = -s;
    this.key.shadow.bias = -0.0004;
    this.scene.add(this.key);
    const fill = new THREE.DirectionalLight(0xffe0c2, 0.4);
    fill.position.set(-90, 40, 60);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(520, 26, 0xc9bfb0, 0xddd4c8);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.bodyMat = new THREE.MeshStandardMaterial({ color: BONE, roughness: 0.62, metalness: 0.02 });
    this.chainMat = new THREE.MeshStandardMaterial({ color: CHAIN, roughness: 0.5, metalness: 0.03 });
    this.claspMat = new THREE.MeshStandardMaterial({ color: CLASP, roughness: 0.48, metalness: 0.06 });
    this.body = new THREE.Mesh(new THREE.BufferGeometry(), this.bodyMat);
    this.chain = new THREE.Mesh(new THREE.BufferGeometry(), this.chainMat);
    this.clasp = new THREE.Mesh(new THREE.BufferGeometry(), this.claspMat);
    for (const mesh of [this.body, this.chain, this.clasp]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }

    this.show = { body: true, chain: true, clasp: true, bed: true };
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
    this._set(this.body, parts.body.positions);
    this._set(this.chain, parts.chain.positions);
    this._set(this.clasp, parts.clasp.positions);
    this.applyShow();
    if (!this.fitted) this.fit();
  }

  _set(mesh, positions) {
    mesh.geometry.dispose();
    mesh.geometry = positions?.length ? geomFrom(positions) : new THREE.BufferGeometry();
  }

  applyShow() {
    this.body.visible = this.show.body;
    this.chain.visible = this.show.chain;
    this.clasp.visible = this.show.clasp;
    this.grid.visible = this.show.bed;
  }

  setShow(patch) {
    Object.assign(this.show, patch);
    this.applyShow();
  }

  bounds() {
    const box = new THREE.Box3();
    let any = false;
    for (const mesh of [this.body, this.chain, this.clasp]) {
      if (!mesh.visible || !mesh.geometry.getAttribute("position")) continue;
      mesh.geometry.computeBoundingBox();
      if (!mesh.geometry.boundingBox || mesh.geometry.boundingBox.isEmpty()) continue;
      box.union(mesh.geometry.boundingBox);
      any = true;
    }
    if (!any) box.set(new THREE.Vector3(-40, -40, 0), new THREE.Vector3(40, 40, 80));
    return box;
  }

  setNamedView(name) {
    const frameOf = (mesh) => {
      if (!mesh?.geometry?.getAttribute("position")) return null;
      mesh.geometry.computeBoundingBox();
      const box = mesh.geometry.boundingBox;
      if (!box || box.isEmpty()) return null;
      return box;
    };
    const bodyBox = frameOf(this.body);
    const chainBox = frameOf(this.chain);
    const focus = name === "strap" ? chainBox || bodyBox : bodyBox || this.bounds();
    const target = focus.getCenter(new THREE.Vector3());
    const size = focus.getSize(new THREE.Vector3());
    const half = Math.max(size.x, size.y, size.z) * (name === "strap" ? 0.58 : 0.72);
    const fov = (this.camera.fov * Math.PI) / 180;
    const dist = half / Math.tan(fov / 2);
    const dirs = {
      iso: new THREE.Vector3(0.95, 1.25, 0.72),
      front: new THREE.Vector3(0.02, 1, 0.08),
      side: new THREE.Vector3(1.15, 0.35, 0.32),
      strap: new THREE.Vector3(0.35, 1.05, 0.9),
    };
    const dir = (dirs[name] || dirs.iso).clone().normalize();
    this.camera.position.copy(target).addScaledVector(dir, dist);
    this.camera.up.set(0, 0, 1);
    this.controls.target.copy(target);
    this.camera.near = Math.max(0.5, dist / 80);
    this.camera.far = dist * 8;
    this.camera.updateProjectionMatrix();
    this.controls.update();
    this.fitted = true;
  }

  fit() {
    this.setNamedView("iso");
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
