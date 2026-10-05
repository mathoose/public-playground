import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions, parseBinaryStl } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

function geomFromStl(buffer) {
  const pos = parseBinaryStl(buffer);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.computeVertexNormals();
  return geo;
}

export class CasePreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(42, 1, 0.1, 2500);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(-110, -150, 120);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(40, 40, 12);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(-40, -80, 120);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff7ed, 0.42);
    fill.position.set(80, 40, -20);
    this.scene.add(fill);

    this.grid = new THREE.GridHelper(280, 28, 0xb0a89c, 0xc9c2b6);
    this.grid.rotation.x = Math.PI / 2;
    this.scene.add(this.grid);

    this.caseMat = new THREE.MeshStandardMaterial({
      color: 0xc4b8a4,
      roughness: 0.52,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    this.bankMat = new THREE.MeshStandardMaterial({
      color: 0xb7d1a8,
      roughness: 0.62,
      metalness: 0.04,
    });
    this.glassMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.28,
      metalness: 0.12,
    });
    this.portMat = new THREE.MeshStandardMaterial({
      color: 0x1c1917,
      roughness: 0.4,
      metalness: 0.1,
    });
    this.refMat = new THREE.MeshStandardMaterial({
      color: 0x5b7c99,
      roughness: 0.48,
      metalness: 0.08,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
    });

    this.caseMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.caseMat);
    this.bankMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.bankMat);
    this.glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.glassMat);
    this.portGroup = new THREE.Group();
    this.refMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.refMat);
    this.refMesh.visible = false;
    this.scene.add(this.caseMesh);
    this.scene.add(this.bankMesh);
    this.scene.add(this.glassMesh);
    this.scene.add(this.portGroup);
    this.scene.add(this.refMesh);

    this.fitted = false;
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  update(result) {
    const { mesh, d } = result;
    this.caseMesh.geometry.dispose();
    this.caseMesh.geometry = geomFrom(mesh);

    this.bankMesh.geometry.dispose();
    this.bankMesh.geometry = new THREE.BoxGeometry(
      Math.max(1, d.p.bankL),
      Math.max(1, d.p.bankW),
      Math.max(1, d.p.bankH)
    );
    this.bankMesh.position.set(
      d.bankX0 + d.p.bankL / 2,
      d.bankY0 + d.p.bankW / 2,
      d.bankZ0 + d.p.bankH / 2
    );

    this.glassMesh.geometry.dispose();
    this.glassMesh.geometry = new THREE.BoxGeometry(28, Math.max(1, d.p.bankW - 4), 0.6);
    this.glassMesh.position.set(
      d.bankX0 + 16,
      d.bankY0 + d.p.bankW / 2,
      d.bankZ0 + d.p.bankH + 0.15
    );

    while (this.portGroup.children.length) {
      const ch = this.portGroup.children[0];
      this.portGroup.remove(ch);
      ch.geometry?.dispose();
    }
    const faceX = d.bankX0 - 0.2;
    const faceZ = d.bankZ0 + d.p.bankH / 2;
    const cyBank = d.bankY0 + d.p.bankW / 2;
    const ports = [
      { y: cyBank - 18, w: 12.2, h: 5.2 },
      { y: cyBank, w: 9.0, h: 3.6 },
      { y: cyBank + 18, w: 12.2, h: 5.2 },
    ];
    for (const spec of ports) {
      const g = new THREE.BoxGeometry(1.2, spec.w, spec.h);
      const m = new THREE.Mesh(g, this.portMat);
      m.position.set(faceX, spec.y, faceZ);
      this.portGroup.add(m);
    }

    this.grid.position.set(d.p.sleeveLen / 2, d.cy, -0.2);
    this.d = d;
    this._placeReference();
    if (!this.fitted) this.fit();
  }

  async loadReference(url) {
    try {
      const res = await fetch(url);
      if (!res.ok) return false;
      const buf = await res.arrayBuffer();
      this.refMesh.geometry.dispose();
      this.refMesh.geometry = geomFromStl(buf);
      this.refMesh.geometry.computeBoundingBox();
      this.refReady = true;
      this._placeReference();
      return true;
    } catch {
      return false;
    }
  }

  _placeReference() {
    if (!this.refReady || !this.d) return;
    const box = this.refMesh.geometry.boundingBox;
    if (!box) return;
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    // Sit the Anker wrap beside our sleeve, both on Z=0, aligned along X.
    this.refMesh.position.set(
      this.d.p.sleeveLen / 2 - center.x,
      this.d.outerW + 18 - box.min.y,
      -box.min.z
    );
  }

  showReference(on) {
    this.refMesh.visible = !!on && this.refReady;
  }

  fit() {
    this.setNamedView("iso");
    this.fitted = true;
  }

  setNamedView(name) {
    const d = this.d;
    if (!d) return;
    this.camera.up.set(0, 0, 1);
    this.showReference(name === "ref");
    if (name === "side") {
      this.camera.position.set(d.p.sleeveLen * 0.15, -d.outerW * 2.1, d.outerH * 0.7);
      this.controls.target.set(d.p.sleeveLen * 0.35, d.cy, d.outerH * 0.5);
    } else if (name === "wrap") {
      this.camera.position.set(d.p.sleeveLen + 25, -70, d.outerH + 28);
      this.controls.target.set(d.p.sleeveLen * 0.72, 2, d.outerH * 0.5);
    } else if (name === "ref") {
      const span = Math.max(d.p.sleeveLen, d.outerW + 80, 90);
      const dist = span * 1.2;
      this.camera.position.set(-dist * 0.35, -dist * 0.55, dist * 0.55);
      this.controls.target.set(d.p.sleeveLen / 2, d.outerW * 0.7, d.outerH * 0.3);
    } else {
      const span = Math.max(d.p.bankL, d.outerW, 110);
      const dist = span * 1.05;
      this.camera.position.set(-dist * 0.72, -dist * 0.62, dist * 0.38);
      this.controls.target.set((d.bankX0 + d.p.sleeveLen) * 0.45, d.cy, d.outerH * 0.4);
    }
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
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
