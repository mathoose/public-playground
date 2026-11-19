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
  socket: [0.58, -0.82, 1.55],
};

const SOCKET_BED = 0x2c2c30;

export class ShelfPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
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
    this.socketLeg = new THREE.Mesh(new THREE.BufferGeometry(), this.legMat);
    this.arrow = makeTwistArrow();
    this.scene.add(this.arrow);
    for (const mesh of [this.lower, this.upper, this.legs, this.legsFlat, this.test, this.socketLeg]) {
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
    this._set(this.socketLeg, meshPositions(result.socketLeg));
    this.placeArrow(d);
    this.layout = d;
    this.applyVisibility();
    if (this.view === "socket") this.clipSocket(d);
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
    this.test.visible = view === "test" || view === "socket";
    this.socketLeg.visible = view === "socket";
    this.arrow.visible = view === "socket" && !!this.arrow.userData.twist;
    this.grid.visible = true;
    const socketView = view === "socket";
    this.renderer.setClearColor(socketView ? SOCKET_BED : BED, 1);
    const gridMats = Array.isArray(this.grid.material) ? this.grid.material : [this.grid.material];
    gridMats.forEach((mat, index) => {
      mat.color.set(socketView ? (index === 0 ? 0x5a5a62 : 0x3e3e44) : index === 0 ? 0xc9bfb0 : 0xddd4c8);
    });
  }

  setNamedView(name, detail) {
    this.legs.position.set(0, 0, 0);
    this.ambient.intensity = 0.62;
    this.hemi.intensity = 0.38;
    this.key.intensity = 1.25;
    this.fill.intensity = 0.45;
    this.rim.intensity = 0;
    this.shelfMat.clippingPlanes = [];
    this.legMat.clippingPlanes = [];
    this.shelfMat.side = THREE.FrontSide;
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
    if (name === "socket") {
      this.view = "socket";
      this.dir = DIRS.socket;
      this.applyVisibility();
      const d = detail || this.layout;
      if (d) this.clipSocket(d);
      this.fit(this.dir);
      this.fitted = true;
      return;
    }
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

  placeArrow(d) {
    const t = d.twist;
    this.arrow.userData.twist = !!t;
    if (!t) return;
    const radius = Math.min(d.coupon.size * 0.33, t.pocketOuter + 1.5);
    this.arrow.position.set(d.coupon.holeX, d.coupon.holeY, d.p.thickness + 0.25);
    this.arrow.scale.setScalar(radius);
  }

  clipSocket(d) {
    const x = d.coupon.holeX;
    const y = d.coupon.holeY;
    this.renderer.localClippingEnabled = true;
    const toward = new THREE.Vector3(0.58, -0.82, 0).normalize();
    const clip = new THREE.Plane().setFromNormalAndCoplanarPoint(
      new THREE.Vector3(-0.78, 0.62, 0.08).normalize(),
      new THREE.Vector3(x, y, d.p.thickness * 0.35).addScaledVector(toward, d.coupon.size * 0.08)
    );
    this.shelfMat.clippingPlanes = [clip];
    this.shelfMat.side = THREE.DoubleSide;
    this.legMat.clippingPlanes = [];
    this.placeArrow(d);
  }

  frameCorner(d) {
    const x = d.p.shelfLength / 2 - d.inset;
    const y = -(d.p.shelfWidth / 2 - d.inset);
    const z = d.p.thickness;
    this.upper.visible = false;
    this.grid.visible = false;
    this.ambient.intensity = 0.14;
    this.hemi.intensity = 0.08;
    this.legs.position.set(0, 0, 0);
    this.key.intensity = 1.55;
    this.fill.intensity = 0.18;
    this.rim.intensity = 0.5;
    this.key.position.set(x + 24, y - 20, z + 26);
    this.key.target.position.set(x, y, z + 8);
    this.scene.add(this.key.target);
    this.rim.position.set(x - 18, y + 16, z + 20);
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
    this.renderer.localClippingEnabled = true;
    const clip = new THREE.Plane().setFromNormalAndCoplanarPoint(
      new THREE.Vector3(-1, 0.55, 0).normalize(),
      new THREE.Vector3(x, y + 0.8, z)
    );
    this.shelfMat.clippingPlanes = [clip];
    this.shelfMat.side = THREE.DoubleSide;
    this.legMat.clippingPlanes = [];
    this.camera.fov = 32;
    this.camera.position.set(x + 26, y - 20, z + 54);
    this.controls.target.set(x - 1, y + 2, z + 14);
    this.camera.near = 0.4;
    this.camera.far = 500;
    this.camera.updateProjectionMatrix();
    this.controls.update();
  }

  visibleBounds() {
    const box = new THREE.Box3();
    let any = false;
    for (const mesh of [this.lower, this.upper, this.legs, this.legsFlat, this.test, this.socketLeg]) {
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

function makeTwistArrow() {
  const material = new THREE.MeshStandardMaterial({ color: 0x2a2622, roughness: 0.4, metalness: 0.04 });
  const group = new THREE.Group();
  const start = Math.PI * 0.72;
  const span = Math.PI * 1.55;
  const pts = [];
  const steps = 56;
  for (let i = 0; i <= steps; i++) {
    const a = start - (span * i) / steps;
    pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  group.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 64, 0.1, 10, false), material));
  const end = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const dir = new THREE.Vector3().subVectors(end, prev).normalize();
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.42, 14), material);
  head.position.copy(end).addScaledVector(dir, 0.18);
  head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  group.add(head);
  group.visible = false;
  return group;
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
