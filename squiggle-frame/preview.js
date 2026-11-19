import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(positions) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.computeVertexNormals();
  return geo;
}

const LILAC = 0xc4b5fd;
const PEG = 0xddd6fe;
const STAND = 0xf9a8d4;
const PHOTO = 0xe7e5e4;

export class FramePreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xe7e0d4, 1);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.5, 4000);
    this.camera.up.set(0, 1, 0);
    this.camera.position.set(90, 40, 220);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 4);

    this.scene.add(new THREE.AmbientLight(0xfff7ee, 0.62));
    this.scene.add(new THREE.HemisphereLight(0xfff8ef, 0xd6cfc4, 0.38));
    this.key = new THREE.DirectionalLight(0xfffaf3, 1.25);
    this.key.position.set(40, 80, 180);
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
    const fill = new THREE.DirectionalLight(0xe9d5ff, 0.35);
    fill.position.set(-80, -20, 40);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(420, 21, 0xc9bfb0, 0xddd4c8);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.frameMat = new THREE.MeshStandardMaterial({ color: LILAC, roughness: 0.55, metalness: 0.02 });
    this.pegMat = new THREE.MeshStandardMaterial({ color: PEG, roughness: 0.5, metalness: 0.03 });
    this.standMat = new THREE.MeshStandardMaterial({ color: STAND, roughness: 0.48, metalness: 0.02 });
    this.photoMat = new THREE.MeshStandardMaterial({
      color: PHOTO,
      roughness: 0.85,
      metalness: 0,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    this.frame = new THREE.Mesh(new THREE.BufferGeometry(), this.frameMat);
    this.stand = new THREE.Mesh(new THREE.BufferGeometry(), this.standMat);
    this.pegs = new THREE.Mesh(new THREE.BufferGeometry(), this.pegMat);
    this.photo = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), this.photoMat);
    for (const mesh of [this.frame, this.stand, this.pegs, this.photo]) {
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);
    }
    this.photo.castShadow = false;

    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const framePos = manifoldMeshToPositions(result.parts.frame.mesh);
    this._set(this.frame, framePos);
    const { d, pegInstalled, standInstalled } = result;
    if (standInstalled) {
      this._set(this.stand, manifoldMeshToPositions(standInstalled));
      this.stand.visible = true;
    } else {
      this._set(this.stand, new Float32Array());
      this.stand.visible = false;
    }
    if (pegInstalled && d.holes.length) {
      const one = manifoldMeshToPositions(pegInstalled);
      const both = new Float32Array(one.length * d.holes.length);
      d.holes.forEach((hole, n) => {
        const base = n * one.length;
        for (let i = 0; i < one.length; i += 3) {
          both[base + i] = one[i] + hole.x;
          both[base + i + 1] = one[i + 1] + hole.y;
          both[base + i + 2] = one[i + 2];
        }
      });
      this._set(this.pegs, both);
      this.pegs.visible = true;
    } else {
      this._set(this.pegs, new Float32Array());
      this.pegs.visible = false;
    }
    this.photo.scale.set(d.photoW, d.photoH, 1);
    this.photo.position.set(0, 0, 1.08);
    if (!this.fitted) this.fit();
  }

  _set(mesh, positions) {
    mesh.geometry.dispose();
    mesh.geometry = positions?.length ? geomFrom(positions) : new THREE.BufferGeometry();
  }

  bounds() {
    const box = new THREE.Box3();
    let any = false;
    for (const mesh of [this.frame, this.stand, this.pegs]) {
      if (!mesh.visible || !mesh.geometry.getAttribute("position")) continue;
      mesh.geometry.computeBoundingBox();
      if (!mesh.geometry.boundingBox || mesh.geometry.boundingBox.isEmpty()) continue;
      box.union(mesh.geometry.boundingBox);
      any = true;
    }
    if (!any) box.set(new THREE.Vector3(-60, -80, 0), new THREE.Vector3(60, 80, 12));
    return box;
  }

  setNamedView(name) {
    const focus = this.bounds();
    const target = focus.getCenter(new THREE.Vector3());
    target.z = Math.min(target.z, 6);
    const size = focus.getSize(new THREE.Vector3());
    const half = Math.max(size.x, size.y) * 0.62;
    const fov = (this.camera.fov * Math.PI) / 180;
    const dist = half / Math.tan(fov / 2);
    const dirs = {
      angle: new THREE.Vector3(0.55, 0.22, 1),
      front: new THREE.Vector3(0.02, 0.04, 1),
      back: new THREE.Vector3(0.08, 0.05, -1),
    };
    const dir = (dirs[name] || dirs.angle).clone().normalize();
    this.camera.position.copy(target).addScaledVector(dir, dist);
    this.camera.up.set(0, 1, 0);
    this.controls.target.copy(target);
    this.camera.near = Math.max(0.4, dist / 100);
    this.camera.far = dist * 12;
    this.camera.updateProjectionMatrix();
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
