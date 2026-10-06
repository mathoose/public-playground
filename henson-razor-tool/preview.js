import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

export class ToolPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.1, 2000);
    this.camera.up.set(0, 0, 1);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(-60, -90, 140);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff7ed, 0.45);
    fill.position.set(90, 60, -30);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(200, 20, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.grid.position.z = -0.2;
    this.scene.add(this.grid);

    const mat = (color, extra = {}) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05, side: THREE.DoubleSide, ...extra });
    this.meshes = {
      cradle: new THREE.Mesh(new THREE.BufferGeometry(), mat(0x0f766e)),
      grip: new THREE.Mesh(new THREE.BufferGeometry(), mat(0x57534e)),
      ghost: new THREE.Mesh(
        new THREE.BufferGeometry(),
        mat(0x9ca3af, { transparent: true, opacity: 0.38, metalness: 0.4, depthWrite: false })
      ),
      blade: new THREE.Mesh(new THREE.BufferGeometry(), mat(0xdc2626, { transparent: true, opacity: 0.75 })),
    };
    for (const m of Object.values(this.meshes)) this.scene.add(m);

    this.show = { cradle: true, grip: true, razor: true };
    this.fitted = false;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  setVisible(show) {
    Object.assign(this.show, show);
    this._applyVisible();
  }

  _applyVisible() {
    const m = this.meshes;
    m.cradle.visible = this.show.cradle;
    m.grip.visible = this.show.grip;
    m.ghost.visible = this.show.razor && this.show.cradle && this.hasGhost;
    m.blade.visible = m.ghost.visible;
  }

  update(result) {
    const set = (key, mesh) => {
      this.meshes[key].geometry.dispose();
      this.meshes[key].geometry = mesh ? geomFrom(mesh) : new THREE.BufferGeometry();
    };
    set("cradle", result.cradleMesh);
    set("grip", result.gripMesh);
    set("ghost", result.ghostMesh);
    set("blade", result.bladeMesh);
    this.hasGhost = Boolean(result.ghostMesh);
    this.d = result.d;
    this._applyVisible();
    if (!this.fitted) this.fit();
  }

  fit() {
    const d = this.d;
    if (!d) return;
    const onlyGrip = this.show.grip && !this.show.cradle;
    const onlyCradle = this.show.cradle && !this.show.grip;
    const cx = onlyGrip ? d.gripOffsetX : onlyCradle ? 0 : d.gripOffsetX / 2;
    const span = onlyGrip ? Math.max(d.p.gripLen, d.p.gripOD) * 1.6 : d.p.puckD + (onlyCradle ? 10 : d.gripOffsetX);
    const dist = span * 1.25;
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(cx - dist * 0.45, -dist * 0.85, dist * 0.7);
    this.controls.target.set(cx, 0, onlyGrip ? d.p.gripLen / 2 : 8);
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
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
