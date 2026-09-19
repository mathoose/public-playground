import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { layoutBeads } from "./geometry.js";

function hemiGeometry(radius, segments) {
  const g = new THREE.SphereGeometry(
    radius,
    segments,
    Math.max(8, Math.round(segments / 2)),
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  g.rotateX(-Math.PI / 2);
  return g;
}

export class FramePreview {
  constructor({ canvas3d, canvas2d, onToggle }) {
    this.canvas3d = canvas3d;
    this.canvas2d = canvas2d;
    this.onToggle = onToggle;
    this.photoImage = null;
    this.layout = null;
    this.params = null;
    this.hoverId = null;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas3d,
      antialias: true,
      alpha: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe9e1d4);
    this.camera = new THREE.PerspectiveCamera(32, 1, 1, 4000);
    this.camera.up.set(0, 0, 1);
    this.camera.position.set(180, -220, 260);
    this.controls = new OrbitControls(this.camera, canvas3d);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 8);
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.15);
    key.position.set(80, -120, 220);
    this.scene.add(key);
    const fill = new THREE.DirectionalLight(0xc4b5fd, 0.35);
    fill.position.set(-140, 80, 80);
    this.scene.add(fill);

    this.beadMat = new THREE.MeshPhysicalMaterial({
      color: 0x1c1917,
      roughness: 0.22,
      metalness: 0.08,
      clearcoat: 0.7,
      clearcoatRoughness: 0.18,
    });
    this.ghostMat = new THREE.MeshPhysicalMaterial({
      color: 0x78716c,
      roughness: 0.4,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    this.plateMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.7,
      metalness: 0.05,
    });
    this.photoMat = new THREE.MeshBasicMaterial({
      color: 0xf5f5f4,
      side: THREE.DoubleSide,
    });

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.beadMeshes = [];
    this.photoMesh = null;
    this.plateMesh = null;
    this.geomCache = new Map();
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    canvas3d.addEventListener("pointerdown", (e) => this._on3dPointer(e));
    canvas2d.addEventListener("pointerdown", (e) => this._on2dPointer(e));
    canvas2d.addEventListener("pointermove", (e) => this._on2dMove(e));
    canvas2d.addEventListener("pointerleave", () => {
      this.hoverId = null;
      this._draw2d();
    });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas3d.parentElement || canvas3d);
  }

  setPhotoImage(img) {
    this.photoImage = img;
    if (this.photoMat.map) {
      this.photoMat.map.dispose();
      this.photoMat.map = null;
    }
    if (img) {
      const tex = new THREE.Texture(img);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.needsUpdate = true;
      this.photoMat.map = tex;
      this.photoMat.color.set(0xffffff);
    } else {
      this.photoMat.color.set(0xf5f5f4);
    }
    this.photoMat.needsUpdate = true;
    this._draw2d();
  }

  update(params) {
    this.params = params;
    this.layout = layoutBeads(params);
    this._rebuild3d();
    this._draw2d();
    return this.layout;
  }

  resize() {
    const canvas = this.canvas3d;
    const parent = canvas.parentElement || canvas;
    const w = Math.max(1, parent.clientWidth);
    const h = Math.max(1, parent.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this._draw2d();
  }

  fit() {
    if (!this.layout) return;
    const span = Math.max(this.layout.outer.w, this.layout.outer.h, 40);
    const dist = span * 1.55;
    this.camera.position.set(dist * 0.35, -dist * 0.85, dist * 0.7);
    this.controls.target.set(0, 0, this.layout.radius * 0.35);
    this.controls.update();
  }

  dispose() {
    this.running = false;
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    for (const g of this.geomCache.values()) g.dispose();
  }

  _hemiGeom(radius, segments) {
    const key = `${radius.toFixed(3)}:${segments}`;
    if (!this.geomCache.has(key)) this.geomCache.set(key, hemiGeometry(radius, segments));
    return this.geomCache.get(key);
  }

  _rebuild3d() {
    const layout = this.layout;
    while (this.group.children.length) {
      this.group.remove(this.group.children[0]);
    }
    this.beadMeshes = [];
    const previewSegs = Math.min(28, Math.max(16, Math.round(layout.params.segments / 2)));
    const geom = this._hemiGeom(layout.radius, previewSegs);

    for (const bead of layout.beads) {
      const mesh = new THREE.Mesh(geom, bead.enabled ? this.beadMat : this.ghostMat);
      mesh.position.set(bead.x, bead.y, 0);
      mesh.userData.id = bead.id;
      this.group.add(mesh);
      this.beadMeshes.push(mesh);
    }

    const plateGeom = new THREE.BoxGeometry(layout.photo.w, layout.photo.h, layout.params.plateThickness);
    this.plateMesh = new THREE.Mesh(plateGeom, this.plateMat);
    this.plateMesh.position.set(0, 0, -layout.params.plateThickness / 2 - 0.4);
    this.group.add(this.plateMesh);

    const photoGeom = new THREE.PlaneGeometry(layout.photo.w, layout.photo.h);
    this.photoMesh = new THREE.Mesh(photoGeom, this.photoMat);
    this.photoMesh.position.set(0, 0, 0.05);
    this.group.add(this.photoMesh);
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
  }

  _eventToNdc(event, canvas) {
    const rect = canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  _on3dPointer(event) {
    if (!this.layout) return;
    this._eventToNdc(event, this.canvas3d);
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.beadMeshes);
    if (hits.length) {
      event.preventDefault();
      this.onToggle(hits[0].object.userData.id);
    }
  }

  _worldFrom2d(event) {
    const canvas = this.canvas2d;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const map = this._map2d();
    return {
      x: (x - map.ox) / map.scale,
      y: -(y - map.oy) / map.scale,
    };
  }

  _map2d() {
    const canvas = this.canvas2d;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 1;
    const cssH = canvas.clientHeight || 1;
    const w = cssW;
    const h = cssH;
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }
    const layout = this.layout;
    const pad = 16;
    const spanW = layout ? layout.outer.w : 100;
    const spanH = layout ? layout.outer.h : 100;
    const scale = Math.min((w - pad * 2) / spanW, (h - pad * 2) / spanH);
    return { scale, ox: w / 2, oy: h / 2, w, h, dpr };
  }

  _on2dMove(event) {
    if (!this.layout) return;
    const pt = this._worldFrom2d(event);
    this.hoverId = this._hitBead(pt);
    this.canvas2d.style.cursor = this.hoverId ? "pointer" : "default";
    this._draw2d();
  }

  _on2dPointer(event) {
    if (!this.layout) return;
    const pt = this._worldFrom2d(event);
    const id = this._hitBead(pt);
    if (id) {
      event.preventDefault();
      this.onToggle(id);
    }
  }

  _hitBead(pt) {
    const r = this.layout.radius;
    let best = null;
    let bestD = r * 1.15;
    for (const b of this.layout.beads) {
      const d = Math.hypot(b.x - pt.x, b.y - pt.y);
      if (d <= bestD) {
        bestD = d;
        best = b.id;
      }
    }
    return best;
  }

  _draw2d() {
    const canvas = this.canvas2d;
    const ctx = canvas.getContext("2d");
    const map = this._map2d();
    ctx.setTransform(map.dpr, 0, 0, map.dpr, 0, 0);
    ctx.clearRect(0, 0, map.w, map.h);
    ctx.fillStyle = "#f4efe6";
    ctx.fillRect(0, 0, map.w, map.h);
    if (!this.layout) return;

    const toX = (x) => map.ox + x * map.scale;
    const toY = (y) => map.oy - y * map.scale;
    const { photo, opening, radius, beads, params } = this.layout;

    ctx.save();
    ctx.fillStyle = "#d6d3d1";
    ctx.fillRect(
      toX(-photo.w / 2) - 4,
      toY(photo.h / 2) - 4,
      photo.w * map.scale + 8,
      photo.h * map.scale + 8
    );

    ctx.fillStyle = "#fff";
    ctx.fillRect(toX(-photo.w / 2), toY(photo.h / 2), photo.w * map.scale, photo.h * map.scale);
    if (this.photoImage) {
      ctx.drawImage(
        this.photoImage,
        toX(-photo.w / 2),
        toY(photo.h / 2),
        photo.w * map.scale,
        photo.h * map.scale
      );
    } else {
      ctx.strokeStyle = "#a8a29e";
      ctx.setLineDash([4, 4]);
      ctx.strokeRect(toX(-photo.w / 2), toY(photo.h / 2), photo.w * map.scale, photo.h * map.scale);
      ctx.setLineDash([]);
      ctx.fillStyle = "#a8a29e";
      ctx.font = "12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("photo", toX(0), toY(0));
    }

    ctx.beginPath();
    ctx.rect(toX(-opening.w / 2), toY(opening.h / 2), opening.w * map.scale, opening.h * map.scale);
    ctx.strokeStyle = "rgba(124, 45, 18, 0.55)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    for (const b of beads) {
      const hover = b.id === this.hoverId;
      ctx.beginPath();
      ctx.arc(toX(b.x), toY(b.y), radius * map.scale, 0, Math.PI * 2);
      if (b.enabled) {
        ctx.fillStyle = hover ? "#292524" : "#1c1917";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.18)";
        ctx.lineWidth = 1;
        ctx.stroke();
      } else {
        ctx.fillStyle = "rgba(120, 113, 108, 0.16)";
        ctx.fill();
        ctx.setLineDash([3, 3]);
        ctx.strokeStyle = hover ? "#44403c" : "#a8a29e";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    ctx.fillStyle = "#78716c";
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`click a circle to ${this.hoverId ? "toggle" : "add / remove"}`, 10, map.h - 10);
    ctx.restore();
  }
}
