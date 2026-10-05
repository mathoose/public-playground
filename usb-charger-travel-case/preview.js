import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class CasePreview {
  constructor({ canvas }) {
    this.canvas = canvas;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0xd7d2c8, 1);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(38, 1, 0.5, 2000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(120, -160, 110);

    this.controls = new OrbitControls(this.camera, canvas);
    this.controls.enableDamping = true;
    this.controls.target.set(75, 40, 15);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.72));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(-40, -80, 120);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xfff7ed, 0.4);
    fill.position.set(80, 40, -20);
    this.scene.add(fill);

    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.baseMat = new THREE.MeshStandardMaterial({
      color: 0xb0b0b0,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
    this.lidMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.5,
      metalness: 0.06,
      side: THREE.DoubleSide,
    });
    this.markerMat = new THREE.MeshStandardMaterial({
      color: 0x0f766e,
      roughness: 0.45,
      metalness: 0.1,
      transparent: true,
      opacity: 0.55,
    });

    this.baseMesh = null;
    this.lidMesh = null;
    this.markerMeshes = [];
    this._running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas.parentElement || canvas);
    this.resize();
  }

  _clearPart(mesh) {
    if (!mesh) return;
    this.group.remove(mesh);
    mesh.geometry?.dispose();
  }

  _fromData(data, material) {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(data.positions, 3));
    geo.setIndex(new THREE.BufferAttribute(data.indices, 1));
    geo.computeVertexNormals();
    return new THREE.Mesh(geo, material);
  }

  update(result) {
    this._clearPart(this.baseMesh);
    this._clearPart(this.lidMesh);
    this.baseMesh = null;
    this.lidMesh = null;
    for (const m of this.markerMeshes) this._clearPart(m);
    this.markerMeshes = [];

    if (result?.base?.mesh) {
      this.baseMesh = this._fromData(result.base.mesh, this.baseMat);
      this.group.add(this.baseMesh);
    }
    if (result?.lid?.mesh) {
      this.lidMesh = this._fromData(result.lid.mesh, this.lidMat);
      this.group.add(this.lidMesh);
    }
    if (result?.markers?.length) {
      for (const m of result.markers) {
        // Tall USB-A opening: depth along nest X, narrow along Y, tall along Z
        const box = new THREE.Mesh(
          new THREE.BoxGeometry(m.depth || 3, m.w || 5, m.h || 12),
          this.markerMat
        );
        box.position.set(m.x, m.y, m.z);
        this.group.add(box);
        this.markerMeshes.push(box);
      }
    }
  }

  fit(d) {
    if (!d) return;
    const cx = d.outer_l / 2;
    const cy = d.part === "both" ? (d.outer_w * 2 + 15) / 2 : d.outer_w / 2;
    const cz = Math.max(d.base_z, d.lid_thickness + d.wrap_post_h) / 2;
    this.controls.target.set(cx, cy, cz);
    const span = Math.max(d.outer_l, d.outer_w * (d.part === "both" ? 2.2 : 1), d.base_z * 3);
    this.camera.position.set(cx + span * 0.85, cy - span * 1.05, cz + span * 0.7);
    this.controls.update();
  }

  resize() {
    const stage = this.canvas.parentElement || this.canvas;
    const w = stage.clientWidth || 1;
    const h = stage.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
  }

  _loop() {
    if (!this._running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }
}
