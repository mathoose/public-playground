import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { manifoldMeshToPositions } from "./stl.js";

function geomFrom(mesh) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(manifoldMeshToPositions(mesh), 3));
  geo.computeVertexNormals();
  return geo;
}

function roundedRectLoop(cx, cy, cz, w, h, r, x) {
  const rr = Math.max(0.8, Math.min(r, w / 2 - 0.4, h / 2 - 0.4));
  const pts = [];
  const segs = 10;
  const corners = [
    [1, 1, 0],
    [-1, 1, Math.PI / 2],
    [-1, -1, Math.PI],
    [1, -1, (3 * Math.PI) / 2],
  ];
  for (const [sx, sz, a0] of corners) {
    const ox = cx;
    const oy = cy + sx * (w / 2 - rr);
    const oz = cz + sz * (h / 2 - rr);
    for (let i = 0; i <= segs; i++) {
      const a = a0 + (i / segs) * (Math.PI / 2);
      pts.push(new THREE.Vector3(ox, oy + Math.cos(a) * rr, oz + Math.sin(a) * rr));
    }
  }
  pts.push(pts[0].clone());
  return pts;
}

function tubeFromPoints(points, radius) {
  const curve = new THREE.CatmullRomCurve3(points, true, "catmullrom", 0.02);
  return new THREE.TubeGeometry(curve, 96, radius, 8, true);
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
    this.cordMat = new THREE.MeshStandardMaterial({
      color: 0x292524,
      roughness: 0.55,
      metalness: 0.08,
    });

    this.caseMesh = new THREE.Mesh(new THREE.BufferGeometry(), this.caseMat);
    this.bankMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.bankMat);
    this.glassMesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), this.glassMat);
    this.portGroup = new THREE.Group();
    this.cordA = new THREE.Mesh(new THREE.BufferGeometry(), this.cordMat);
    this.cordB = new THREE.Mesh(new THREE.BufferGeometry(), this.cordMat);
    this.scene.add(this.caseMesh);
    this.scene.add(this.bankMesh);
    this.scene.add(this.glassMesh);
    this.scene.add(this.portGroup);
    this.scene.add(this.cordA);
    this.scene.add(this.cordB);

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

    const loopW = d.outerW - d.p.wrapStick;
    const loopH = d.outerH - d.p.wrapStick;
    const loopR = Math.min(d.outerR + d.p.wrapStick * 0.35, loopW / 2 - 1, loopH / 2 - 1);
    const cordR = Math.max(0.7, d.p.cordD / 2 - 0.15);
    this.cordA.geometry.dispose();
    this.cordB.geometry.dispose();
    this.cordA.geometry = tubeFromPoints(
      roundedRectLoop(d.beltMidA, d.cy, d.cz, loopW, loopH, loopR),
      cordR
    );
    this.cordB.geometry = tubeFromPoints(
      roundedRectLoop(d.beltMidB, d.cy, d.cz, loopW, loopH, loopR),
      cordR
    );

    this.grid.position.set(d.p.sleeveLen / 2, d.cy, -0.2);
    this.d = d;
    if (!this.fitted) this.fit();
  }

  showCord(on) {
    this.cordA.visible = !!on;
    this.cordB.visible = !!on;
  }

  fit() {
    this.setNamedView("iso");
    this.fitted = true;
  }

  setNamedView(name) {
    const d = this.d;
    if (!d) return;
    this.camera.up.set(0, 0, 1);
    this.showCord(name !== "clips");
    if (name === "path") {
      this.camera.position.set(d.bankX0 - 55, d.cy - 95, d.cz + 58);
      this.controls.target.set(d.p.sleeveLen * 0.35, d.cy, d.cz);
    } else if (name === "clips") {
      this.camera.position.set(d.clipX + 6, d.cy - 38, -36);
      this.controls.target.set(d.clipX, d.cy, d.p.wrapStick - 1);
    } else if (name === "side") {
      this.camera.position.set(d.p.sleeveLen * 0.2, -d.bboxW * 1.8, d.cz);
      this.controls.target.set(d.p.sleeveLen * 0.4, d.cy, d.cz);
    } else {
      const span = Math.max(d.p.bankL, d.bboxW, 110);
      const dist = span * 1.02;
      this.camera.position.set(-dist * 0.58, -dist * 0.72, -dist * 0.16);
      this.controls.target.set(d.p.sleeveLen * 0.42, d.cy, d.p.wrapStick + 2);
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
