import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const SHELF = 0xe7d3b0;
const LEG = 0xb8884a;
const BED = 0xd7d2c8;

function geomFrom(positions) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

const DIRS = {
  stack: [1.05, -1.35, 0.82],
  shelf: [0.35, -1.15, 1.35],
  legs: [0.55, -1.55, 0.72],
  test: [1.05, -1.2, 0.9],
};

export class ShelfPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(BED, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.5, 8000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(260, -320, 220);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 50);

    this.ambient = new THREE.AmbientLight(0xfff6ea, 0.62);
    this.hemi = new THREE.HemisphereLight(0xfff8ef, 0xcbbba6, 0.38);
    this.scene.add(this.ambient);
    this.scene.add(this.hemi);
    this.key = new THREE.DirectionalLight(0xfffaf3, 1.25);
    this.key.position.set(140, -180, 260);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.camera.near = 10;
    this.key.shadow.camera.far = 1400;
    const span = 420;
    this.key.shadow.camera.left = -span;
    this.key.shadow.camera.right = span;
    this.key.shadow.camera.top = span;
    this.key.shadow.camera.bottom = -span;
    this.key.shadow.bias = -0.0006;
    this.scene.add(this.key);
    this.fill = new THREE.DirectionalLight(0xffe0c2, 0.45);
    this.fill.position.set(-160, 80, 90);
    this.scene.add(this.fill);
    this.rim = new THREE.DirectionalLight(0xfff3e4, 0);
    this.scene.add(this.rim);

    this.grid = new THREE.GridHelper(640, 32, 0xc9bfb0, 0xddd4c8);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.shelfMat = new THREE.MeshStandardMaterial({ color: SHELF, roughness: 0.72, metalness: 0.02, flatShading: true });
    this.legMat = new THREE.MeshStandardMaterial({ color: LEG, roughness: 0.5, metalness: 0.02, flatShading: true });
    this.lower = new THREE.Mesh(new THREE.BufferGeometry(), this.shelfMat);
    this.upper = new THREE.Mesh(new THREE.BufferGeometry(), this.shelfMat);
    this.legs = new THREE.Mesh(new THREE.BufferGeometry(), this.legMat);
    this.legsFlat = new THREE.Mesh(new THREE.BufferGeometry(), this.legMat);
    this.test = new THREE.Mesh(new THREE.BufferGeometry(), this.shelfMat);
    for (const mesh of [this.lower, this.upper, this.legs, this.legsFlat, this.test]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }

    this.view = "stack";
    this.gap = 100;
    this.thickness = 6;
    this.fitted = false;
    this.dir = DIRS.stack;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  resize() {
    const parent = this.canvas.parentElement || this.canvas;
    const w = parent.clientWidth || 1;
    const h = parent.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
  }

  _set(mesh, positions) {
    mesh.geometry.dispose();
    mesh.geometry = positions && positions.length ? geomFrom(positions) : new THREE.BufferGeometry();
  }

  update(result) {
    const d = result.d;
    this.gap = d.p.legLength;
    this.thickness = d.p.thickness;
    this._set(this.lower, meshPositions(result.flat));
    this._set(this.upper, meshPositions(result.flat));
    this.upper.position.z = d.p.thickness + d.p.legLength;
    this._set(this.legs, meshPositions(result.legsStanding));
    this._set(this.legsFlat, meshPositions(result.legs));
    this._set(this.test, meshPositions(result.test));
    this.applyVisibility();
    if (!this.fitted) {
      this.fit(this.dir);
      this.fitted = true;
    }
  }

  applyVisibility() {
    const view = this.view;
    this.lower.visible = view === "stack" || view === "shelf";
    this.upper.visible = view === "stack";
    this.legs.visible = view === "stack" || view === "shelf";
    this.legsFlat.visible = view === "legs";
    this.test.visible = view === "test";
    this.grid.visible = true;
  }

  setNamedView(name, detail) {
    this.legs.position.set(0, 0, 0);
    this.ambient.intensity = 0.62;
    this.hemi.intensity = 0.38;
    this.key.intensity = 1.25;
    this.fill.intensity = 0.45;
    this.rim.intensity = 0;
    const span = 420;
    const shadow = this.key.shadow.camera;
    shadow.left = -span;
    shadow.right = span;
    shadow.top = span;
    shadow.bottom = -span;
    shadow.near = 10;
    shadow.far = 1400;
    shadow.updateProjectionMatrix();
    this.camera.fov = 38;
    if (name === "close" && detail) {
      this.view = "stack";
      this.applyVisibility();
      this.frameCorner(detail);
      this.fitted = true;
      return;
    }
    this.view = DIRS[name] ? name : "stack";
    this.dir = DIRS[this.view];
    this.applyVisibility();
    this.fit(this.dir);
    this.fitted = true;
  }

  frameCorner(d) {
    const x = d.p.shelfLength / 2 - d.inset;
    const y = -(d.p.shelfWidth / 2 - d.inset);
    const z = d.p.thickness;
    this.upper.visible = false;
    this.grid.visible = false;
    this.ambient.intensity = 0.07;
    this.hemi.intensity = 0.04;
    const shiftY = 18;
    this.legs.position.set(0, shiftY, d.socketDepth);
    this.key.intensity = 1.85;
    this.fill.intensity = 0.08;
    this.rim.intensity = 0.42;
    this.key.position.set(x + 28, y - 24, z + 16);
    this.key.target.position.set(x, y + shiftY * 0.5, z);
    this.scene.add(this.key.target);
    this.rim.position.set(x - 22, y + shiftY + 6, z + 26);
    const shadow = this.key.shadow.camera;
    const s = 46;
    shadow.left = -s;
    shadow.right = s;
    shadow.top = s;
    shadow.bottom = -s;
    shadow.near = 1;
    shadow.far = 140;
    shadow.updateProjectionMatrix();
    this.key.shadow.bias = -0.00035;
    this.camera.fov = 30;
    this.camera.position.set(x + 14, y + shiftY * 0.5 - 1, z + 84);
    this.controls.target.set(x + 1, y + shiftY * 0.5, z + 17);
    this.camera.near = 0.4;
    this.camera.far = 500;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  visibleBounds() {
    const box = new THREE.Box3();
    let any = false;
    for (const mesh of [this.lower, this.upper, this.legs, this.legsFlat, this.test]) {
      if (!mesh.visible || !mesh.geometry.getAttribute("position")) continue;
      const part = new THREE.Box3().setFromObject(mesh);
      if (part.isEmpty()) continue;
      box.union(part);
      any = true;
    }
    return any ? box : null;
  }

  fit(dir = this.dir) {
    const box = this.visibleBounds();
    if (!box) return;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const radius = 0.5 * Math.hypot(size.x, size.y, size.z);
    const halfFov = (this.camera.fov * Math.PI) / 360;
    const dist = (radius / Math.sin(halfFov)) * 1.08;
    const len = Math.hypot(dir[0], dir[1], dir[2]) || 1;
    this.camera.position.set(
      center.x + (dir[0] / len) * dist,
      center.y + (dir[1] / len) * dist,
      center.z + (dir[2] / len) * dist
    );
    this.controls.target.copy(center);
    this.camera.near = Math.max(0.2, dist / 80);
    this.camera.far = dist * 30;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}

function meshPositions(mesh) {
  const stride = mesh.numProp || 3;
  const pos = new Float32Array(mesh.triVerts.length * 3);
  let i = 0;
  for (let t = 0; t < mesh.triVerts.length; t++) {
    const v = mesh.triVerts[t] * stride;
    pos[i++] = mesh.vertProperties[v];
    pos[i++] = mesh.vertProperties[v + 1];
    pos[i++] = mesh.vertProperties[v + 2];
  }
  return pos;
}
