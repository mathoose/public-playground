import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

function disposeGeometry(mesh) {
  mesh.geometry?.dispose();
}

export class LanternPreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xf3e6d4, 1);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(32, 1, 0.1, 5000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(180, -200, 140);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 0);

    this.scene.add(new THREE.HemisphereLight(0xfff6ea, 0xd7c4a8, 0.95));
    const key = new THREE.DirectionalLight(0xffffff, 1.35);
    key.position.set(80, -160, 120);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xffd7a8, 0.4);
    fill.position.set(-140, 80, 40);
    this.scene.add(fill);

    this.bed = new THREE.Mesh(
      new THREE.CircleGeometry(90, 64),
      new THREE.MeshStandardMaterial({ color: 0xe7d7c4, roughness: 1 }),
    );
    this.scene.add(this.bed);

    this.bodyMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.55,
      metalness: 0.02,
      vertexColors: true,
    });
    this.body = new THREE.Mesh(new THREE.BufferGeometry(), this.bodyMat);
    this.scene.add(this.body);

    this.ledMat = new THREE.MeshStandardMaterial({
      color: 0xfff4d2,
      roughness: 0.25,
      metalness: 0,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    this.led = new THREE.Mesh(new THREE.BufferGeometry(), this.ledMat);
    this.scene.add(this.led);

    this.cordMat = new THREE.MeshStandardMaterial({
      color: 0x292524,
      roughness: 0.7,
      metalness: 0,
    });
    this.cord = new THREE.Mesh(new THREE.BufferGeometry(), this.cordMat);
    this.scene.add(this.cord);

    this.seat = null;
    this.view = "angle";
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement);
    this.resize();
  }

  resize() {
    const w = this.canvas.clientWidth || 1;
    const h = this.canvas.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  _loop() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }

  setMesh(positions, indices, seat) {
    this.seat = seat;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const colors = new Float32Array(positions.length);
    const stemZ = seat.zMin + (seat.zMax - seat.zMin) * 0.72;
    for (let i = 0; i < positions.length; i += 3) {
      const dx = positions[i] - seat.cx;
      const dy = positions[i + 1] - seat.cy;
      const stem = positions[i + 2] > stemZ && dx * dx + dy * dy < 20 * 20;
      if (stem) {
        colors[i] = 0.22;
        colors[i + 1] = 0.4;
        colors[i + 2] = 0.24;
      } else {
        colors[i] = 0.9;
        colors[i + 1] = 0.42;
        colors[i + 2] = 0.1;
      }
    }
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setIndex(new THREE.BufferAttribute(indices, 1));
    geo.computeVertexNormals();
    disposeGeometry(this.body);
    this.body.geometry = geo;
    this.bed.position.set(seat.cx, seat.cy, seat.zMin - 0.4);
    const span = Math.max(seat.xMax - seat.xMin, seat.yMax - seat.yMin);
    this.bed.scale.setScalar(Math.max(1, span / 140));
    this.fit();
  }

  setGhost(plan, seat) {
    disposeGeometry(this.led);
    disposeGeometry(this.cord);
    if (!plan || !seat) {
      this.led.geometry = new THREE.BufferGeometry();
      this.cord.geometry = new THREE.BufferGeometry();
      return;
    }
    const ledR = plan.p.ledDiameter / 2;
    const thick = plan.p.ledThickness;
    const ledGeo = new THREE.CylinderGeometry(ledR, ledR, thick, 72);
    ledGeo.rotateX(Math.PI / 2);
    ledGeo.translate(0, 0, thick / 2);
    this.led.geometry = ledGeo;
    this.led.position.set(seat.cx, seat.cy, seat.zMin);

    if (plan.cordR > 0.2) {
      const len = Math.max(6, plan.reach - plan.openingR);
      const cordGeo = new THREE.CylinderGeometry(plan.cordR, plan.cordR, len, 24);
      cordGeo.rotateZ(-Math.PI / 2);
      cordGeo.translate(plan.openingR + len / 2, 0, 0);
      cordGeo.rotateZ((plan.p.cordAngle * Math.PI) / 180);
      this.cord.geometry = cordGeo;
      this.cord.position.set(seat.cx, seat.cy, plan.cordZ);
      this.cord.visible = true;
    } else {
      this.cord.geometry = new THREE.BufferGeometry();
      this.cord.visible = false;
    }
  }

  fit() {
    this.setView(this.view);
  }

  setView(name) {
    this.view = name || "angle";
    const seat = this.seat;
    if (!seat) return;
    const cx = seat.cx;
    const cy = seat.cy;
    const cz = (seat.zMin + seat.zMax) / 2;
    const size = Math.max(seat.xMax - seat.xMin, seat.yMax - seat.yMin, seat.zMax - seat.zMin);
    const dist = size * 1.35;
    const views = {
      angle: new THREE.Vector3(cx + dist * 0.75, cy - dist * 0.85, cz + dist * 0.45),
      side: new THREE.Vector3(cx + dist * 1.25, cy, cz),
      bottom: new THREE.Vector3(cx + size * 0.04, cy - size * 0.04, seat.zMin - dist * 1.05),
    };
    this.camera.position.copy(views[this.view] || views.angle);
    this.controls.target.set(cx, cy, cz);
    this.controls.update();
  }
}
