import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

const PARTS = ["base", "lid", "spacer"];

export class BoxPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);
    this.renderer.localClippingEnabled = true;

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

    this.clipPlane = new THREE.Plane(new THREE.Vector3(1, 0, 0), 0);
    const solid = (color) =>
      new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.05, side: THREE.DoubleSide });
    // Back faces exposed by the section plane render flat, so the cut reads as a filled cap.
    const cap = (color) => new THREE.MeshBasicMaterial({ color, side: THREE.BackSide });
    this.mats = {
      base: solid(0xb8b4ad),
      lid: solid(0x8f8a80),
      spacer: solid(0xe0a33a),
    };
    this.capMats = {
      base: cap(0x44403c),
      lid: cap(0xbe123c),
      spacer: cap(0xb45309),
    };
    this.meshes = {};
    this.caps = {};
    for (const part of PARTS) {
      this.meshes[part] = new THREE.Mesh(new THREE.BufferGeometry(), this.mats[part]);
      this.caps[part] = new THREE.Mesh(this.meshes[part].geometry, this.capMats[part]);
      this.caps[part].visible = false;
      this.scene.add(this.meshes[part], this.caps[part]);
    }

    this.ghostMat = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.7,
      metalness: 0.04,
      transparent: true,
      opacity: 0.28,
    });
    this.plugMat = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.6,
      transparent: true,
      opacity: 0.55,
    });
    this.ghosts = new THREE.Group();
    this.scene.add(this.ghosts);

    this.show = { base: true, lid: true, spacer: true, ghosts: true };
    this.section = false;
    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  setLidLift(z) {
    this.meshes.lid.position.z = z;
    this.caps.lid.position.z = z;
  }

  setVisible(next = {}) {
    Object.assign(this.show, next);
    this._applyVisibility();
  }

  /** Section plane perpendicular to X (keeps x > at). Pass null to clear. */
  setSection(at) {
    this.section = at != null;
    if (this.section) this.clipPlane.constant = -at;
    const planes = this.section ? [this.clipPlane] : [];
    for (const part of PARTS) {
      this.mats[part].clippingPlanes = planes;
      this.mats[part].side = this.section ? THREE.FrontSide : THREE.DoubleSide;
      this.mats[part].needsUpdate = true;
      this.capMats[part].clippingPlanes = planes;
      this.capMats[part].needsUpdate = true;
    }
    this.ghostMat.clippingPlanes = planes;
    this.plugMat.clippingPlanes = planes;
    this.ghostMat.needsUpdate = true;
    this.plugMat.needsUpdate = true;
    this._applyVisibility();
  }

  _applyVisibility() {
    for (const part of PARTS) {
      this.meshes[part].visible = this.show[part];
      this.caps[part].visible = this.show[part] && this.section;
    }
    this.ghosts.visible = this.show.ghosts;
  }

  update(result) {
    const { d } = result;
    for (const part of PARTS) {
      const src = result[`${part}Mesh`];
      this.meshes[part].geometry.dispose();
      const geo = src ? geomFrom(src) : new THREE.BufferGeometry();
      this.meshes[part].geometry = geo;
      this.caps[part].geometry = geo;
    }

    for (const child of [...this.ghosts.children]) {
      child.geometry.dispose();
      this.ghosts.remove(child);
    }
    const brickX = d.wall + (d.stopH > 0 ? d.stopDepth : d.p.usbExtra + 0.4);
    const brickH = Math.max(1, d.cavityZ - 0.6);
    const brick = new THREE.Mesh(
      new THREE.BoxGeometry(Math.max(1, d.brickL), Math.max(1, d.brickW), brickH),
      this.ghostMat
    );
    brick.position.set(brickX + d.brickL / 2, d.outerW / 2, d.floor + brickH / 2);
    this.ghosts.add(brick);
    for (const t of d.teeth) {
      if (!(t.plug > 0)) continue;
      const len = Math.min(t.plug, brickX - d.wall);
      const plug = new THREE.Mesh(new THREE.BoxGeometry(len, Math.min(8.6, d.toothW), 7), this.plugMat);
      plug.position.set(brickX - len / 2, d.wall + t.y, d.zUsb);
      this.ghosts.add(plug);
    }

    this.grid.position.set(d.outerL / 2, d.outerW / 2, -0.2);
    this.d = d;
    this._applyVisibility();
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

  /** Point the camera at a target from a direction (used by the preset views). */
  look(target, dir, dist) {
    const t = new THREE.Vector3(...target);
    const v = new THREE.Vector3(...dir).normalize().multiplyScalar(dist);
    this.camera.up.set(0, 0, 1);
    this.camera.position.copy(t).add(v);
    this.controls.target.copy(t);
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
