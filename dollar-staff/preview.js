import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CARD } from "./geometry.js";

function geomFrom(positions) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

function roundedCardGeometry() {
  const w = CARD.h;
  const h = CARD.w;
  const r = CARD.corner;
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - r);
  shape.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
  shape.lineTo(x + r, y + h);
  shape.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + r);
  shape.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
  const geo = new THREE.ExtrudeGeometry(shape, { depth: CARD.t, bevelEnabled: false, curveSegments: 8 });
  geo.translate(0, 0, -CARD.t / 2);
  geo.rotateX(Math.PI / 2);
  return geo;
}

const FRONT = 0x3cb371;
const BACK = 0x1f8a4c;
const SIGN = 0x0e4d32;

export class StaffPreview {
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
    this.camera.position.set(160, 280, 150);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 90);

    this.scene.add(new THREE.AmbientLight(0xfff6ea, 0.55));
    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xcbbba6, 0.35));
    this.key = new THREE.DirectionalLight(0xfffaf3, 1.3);
    this.key.position.set(90, -140, 200);
    this.key.castShadow = true;
    this.key.shadow.mapSize.set(2048, 2048);
    this.key.shadow.camera.near = 10;
    this.key.shadow.camera.far = 900;
    const s = 260;
    this.key.shadow.camera.left = -s;
    this.key.shadow.camera.right = s;
    this.key.shadow.camera.top = s;
    this.key.shadow.camera.bottom = -s;
    this.key.shadow.bias = -0.0004;
    this.scene.add(this.key);
    const fill = new THREE.DirectionalLight(0xffe0c2, 0.4);
    fill.position.set(-100, 60, 80);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(420, 21, 0xc9bfb0, 0xddd4c8);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.frontMat = new THREE.MeshStandardMaterial({ color: FRONT, roughness: 0.48, metalness: 0.04 });
    this.backMat = new THREE.MeshStandardMaterial({ color: BACK, roughness: 0.52, metalness: 0.04 });
    this.signMat = new THREE.MeshStandardMaterial({ color: SIGN, roughness: 0.55, metalness: 0.04 });
    this.cardMat = new THREE.MeshStandardMaterial({
      color: 0xd5deea,
      roughness: 0.35,
      metalness: 0.08,
      transparent: true,
      opacity: 0.78,
    });
    this.sign = new THREE.Mesh(new THREE.BufferGeometry(), this.signMat);
    this.front = new THREE.Mesh(new THREE.BufferGeometry(), this.frontMat);
    this.back = new THREE.Mesh(new THREE.BufferGeometry(), this.backMat);
    this.card = new THREE.Mesh(roundedCardGeometry(), this.cardMat);
    for (const mesh of [this.sign, this.back, this.front, this.card]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }

    this.show = { front: true, back: true, sign: true, card: true, bed: true };
    this.slide = 0;
    this.lid = 0;
    this.frontPositions = null;
    this.backPositions = null;
    this.signPositions = null;
    this.cardY = 0;
    this.cardZ = 0;
    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { d } = result;
    this.frontPositions = result.frontPositions;
    this.backPositions = result.backPositions;
    this.signPositions = result.signPositions;
    this.cardY = d.cardCenterY;
    this.cardZ = d.barCenterZ;
    this._set(this.sign, result.signPositions);
    this.applyPose();
    if (!this.fitted) this.fit();
  }

  _set(mesh, positions) {
    mesh.geometry.dispose();
    mesh.geometry = positions?.length ? geomFrom(positions) : new THREE.BufferGeometry();
  }

  _offset(src, dy, dz) {
    const pos = new Float32Array(src);
    if (dy || dz) {
      for (let i = 0; i < pos.length; i += 3) {
        pos[i + 1] += dy;
        pos[i + 2] += dz;
      }
    }
    return pos;
  }

  applyPose() {
    if (this.backPositions) this._set(this.back, this._offset(this.backPositions, 0, this.slide));
    if (this.frontPositions) this._set(this.front, this._offset(this.frontPositions, this.lid, this.slide));
    this.card.position.set(0, this.cardY, this.cardZ + this.slide);
    this.sign.visible = this.show.sign;
    this.front.visible = this.show.front;
    this.back.visible = this.show.back;
    this.card.visible = this.show.card && (this.show.back || this.show.front);
    this.grid.visible = this.show.bed;
  }

  setShow(patch) {
    Object.assign(this.show, patch);
    this.applyPose();
  }

  setPose(slide, lid) {
    this.slide = slide;
    this.lid = lid;
    this.applyPose();
  }

  bounds() {
    const box = new THREE.Box3();
    let any = false;
    for (const mesh of [this.sign, this.front, this.back]) {
      if (!mesh.visible || !mesh.geometry.getAttribute("position")) continue;
      mesh.geometry.computeBoundingBox();
      if (!mesh.geometry.boundingBox || mesh.geometry.boundingBox.isEmpty()) continue;
      box.union(mesh.geometry.boundingBox);
      any = true;
    }
    if (!any) box.set(new THREE.Vector3(-40, -20, 0), new THREE.Vector3(40, 20, 160));
    return box;
  }

  setNamedView(name) {
    const focus = this.bounds();
    const target = focus.getCenter(new THREE.Vector3());
    const size = focus.getSize(new THREE.Vector3());
    const half = Math.max(size.x, size.y, size.z) * 0.52;
    const fov = (this.camera.fov * Math.PI) / 180;
    const dist = half / Math.tan(fov / 2);
    const dirs = {
      iso: new THREE.Vector3(0.78, 1.2, 0.46),
      front: new THREE.Vector3(0.03, 1, 0.05),
      side: new THREE.Vector3(1.25, 0.28, 0.2),
      dovetail: new THREE.Vector3(1.35, 0.7, 0.42),
    };
    const dir = (dirs[name] || dirs.iso).clone().normalize();
    this.camera.position.copy(target).addScaledVector(dir, dist * 1.08);
    this.camera.up.set(0, 0, 1);
    this.controls.target.copy(target);
    this.camera.near = Math.max(0.5, dist / 80);
    this.camera.far = dist * 12;
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
