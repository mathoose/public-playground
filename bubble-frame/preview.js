import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { pegStandPlateBoxes, plateLoop } from "../shared/frame-clip.js";
import { PART_SHOW } from "../shared/frame-pick-map.js";
import { frameClipFor, hangHoleLayout, layoutBeads, outerPerimeterPoly } from "./geometry.js";

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
  // +Y pole -> +Z so the dome faces the camera (print-bed at z=0).
  g.rotateX(Math.PI / 2);
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
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe9e1d4);
    this.camera = new THREE.PerspectiveCamera(32, 1, 1, 4000);
    this.camera.position.set(40, 25, 300);
    this.controls = new OrbitControls(this.camera, canvas3d);
    this.controls.enableDamping = true;
    this.controls.target.set(0, 0, 6);
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffffff, 1.05);
    key.position.set(60, -40, 220);
    this.scene.add(key);
    const rim = new THREE.DirectionalLight(0xffffff, 0.45);
    rim.position.set(-120, 90, 40);
    this.scene.add(rim);

    this.beadMatA = new THREE.MeshStandardMaterial({
      color: 0x292524,
      roughness: 0.32,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });
    this.beadMatB = new THREE.MeshStandardMaterial({
      color: 0xb45309,
      roughness: 0.32,
      metalness: 0.12,
      side: THREE.DoubleSide,
    });
    this.ghostMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.4,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    this.plateMat = new THREE.MeshStandardMaterial({
      color: 0xd6d3d1,
      roughness: 0.7,
      metalness: 0.05,
    });
    this.standMat = new THREE.MeshStandardMaterial({
      color: 0x44403c,
      roughness: 0.55,
      metalness: 0.04,
    });
    this.holeMat = new THREE.MeshBasicMaterial({
      color: 0x44403c,
      side: THREE.DoubleSide,
    });
    this.slotMat = new THREE.MeshStandardMaterial({
      color: 0x57534e,
      roughness: 0.7,
      metalness: 0.04,
    });
    this.photoMat = new THREE.MeshBasicMaterial({
      color: 0xf5f5f4,
      side: THREE.DoubleSide,
    });

    this.beadMeshes = [];
    this.photoMesh = null;
    this.plateMesh = null;
    this.partView = "assembled";
    this._userShow = { ...PART_SHOW.assembled };
    this._v = new THREE.Vector3();
    this._n = new THREE.Vector3();
    this.tempGeoms = [];
    this.geomCache = new Map();
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

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

  setPartView(mode) {
    this.partView = mode === "cover" || mode === "back" || mode === "side" ? mode : "assembled";
    this.setShown(PART_SHOW[this.partView] || PART_SHOW.assembled);
    this._applyPose();
    this.fit();
    return { ...this._userShow };
  }

  setShown(shown) {
    this._userShow = { ...this._userShow, ...(shown || {}) };
    this._applyShown();
  }

  _applyShown() {
    if (!this.coverGroup) return;
    const s = this._userShow;
    this.coverGroup.visible = s.cover !== false;
    this.photoGroup.visible = s.photo !== false;
    this.backGroup.visible = s.back !== false;
    this.standGroup.visible = s.stand !== false && Boolean(this._clip?.pegStand?.cut);
  }

  toContent(hit) {
    if (!hit?.point || !this.content) return hit;
    this.group.updateMatrixWorld(true);
    this._v.set(hit.point.x, hit.point.y, hit.point.z);
    this.content.worldToLocal(this._v);
    const point = { x: this._v.x, y: this._v.y, z: this._v.z };
    let normal = hit.normal;
    if (hit.normal) {
      this._n.set(hit.normal.x, hit.normal.y, hit.normal.z);
      const m = new THREE.Matrix3().getNormalMatrix(this.content.matrixWorld).invert();
      this._n.applyMatrix3(m).normalize();
      normal = { x: this._n.x, y: this._n.y, z: this._n.z };
    }
    return { ...hit, point, normal };
  }

  worldBox(box) {
    if (!box?.min || !box?.max || !this.content) return box;
    this.group.updateMatrixWorld(true);
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];
    const [x0, y0, z0] = box.min;
    const [x1, y1, z1] = box.max;
    for (const x of [x0, x1]) {
      for (const y of [y0, y1]) {
        for (const z of [z0, z1]) {
          this._v.set(x, y, z);
          this.content.localToWorld(this._v);
          min[0] = Math.min(min[0], this._v.x);
          min[1] = Math.min(min[1], this._v.y);
          min[2] = Math.min(min[2], this._v.z);
          max[0] = Math.max(max[0], this._v.x);
          max[1] = Math.max(max[1], this._v.y);
          max[2] = Math.max(max[2], this._v.z);
        }
      }
    }
    return { min, max };
  }

  toWorld(x, y, z) {
    this.group.updateMatrixWorld(true);
    this._v.set(x, y, z);
    this.content.localToWorld(this._v);
    return { x: this._v.x, y: this._v.y, z: this._v.z };
  }

  _applyPose() {
    if (!this.pose || !this.layout) return;
    const lean = this.partView === "assembled" || this.partView === "side";
    const theta = lean && this._clip?.pegStand?.cut ? this._clip.pegStand.angleRad : 0;
    const pivotY = -this.layout.outer.h / 2;
    this.content.position.y = -pivotY;
    this.pose.position.y = pivotY;
    this.pose.rotation.x = -theta;
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
    const dist = span * 1.85;
    const leg = this._clip?.pegStand?.legReach || span * 0.3;
    this.camera.up.set(0, 1, 0);
    if (this.partView === "side") {
      this.camera.position.set(dist * 0.78, span * 0.04, -dist * 0.7);
      this.controls.target.set(0, -span * 0.02, -leg * 0.22);
    } else if (this.partView === "back") {
      this.camera.position.set(dist * 0.14, -dist * 0.02, -dist);
      this.controls.target.set(0, 0, -leg * 0.18);
    } else {
      this.camera.position.set(0, 0, dist);
      this.controls.target.set(0, 0, this.partView === "cover" ? this.layout.radius * 0.2 : 0);
    }
    this.controls.update();
  }

  dispose() {
    this.running = false;
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    for (const g of this.geomCache.values()) g.dispose();
    for (const g of this.tempGeoms) g.dispose();
  }

  _trackGeom(geom) {
    this.tempGeoms.push(geom);
    return geom;
  }

  _clearTemps() {
    for (const g of this.tempGeoms) g.dispose();
    this.tempGeoms = [];
  }

  _hemiGeom(radius, segments) {
    const key = `${radius.toFixed(3)}:${segments}`;
    if (!this.geomCache.has(key)) this.geomCache.set(key, hemiGeometry(radius, segments));
    return this.geomCache.get(key);
  }

  _addBox(parent, b, material) {
    const w = b.x1 - b.x0;
    const h = b.y1 - b.y0;
    const d = b.z1 - b.z0;
    if (w < 1e-4 || h < 1e-4 || d < 1e-4) return;
    const mesh = new THREE.Mesh(this._trackGeom(new THREE.BoxGeometry(w, h, d)), material);
    mesh.position.set((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2, (b.z0 + b.z1) / 2);
    parent.add(mesh);
  }

  _rebuild3d() {
    const layout = this.layout;
    while (this.group.children.length) {
      this.group.remove(this.group.children[0]);
    }
    this._clearTemps();
    this.beadMeshes = [];
    const clip = frameClipFor(layout);
    this._clip = clip;

    this.pose = new THREE.Group();
    this.content = new THREE.Group();
    this.pose.add(this.content);
    this.group.add(this.pose);
    this.coverGroup = new THREE.Group();
    this.coverGroup.position.z = clip.frameBackZ;
    this.backGroup = new THREE.Group();
    this.standGroup = new THREE.Group();
    this.photoGroup = new THREE.Group();
    this.content.add(this.backGroup);
    this.content.add(this.standGroup);
    this.content.add(this.photoGroup);
    this.content.add(this.coverGroup);

    const previewSegs = Math.min(28, Math.max(16, Math.round(layout.params.segments / 2)));
    const geom = this._hemiGeom(layout.radius, previewSegs);
    this.beadMatA.color.set(layout.params.colorA || "#292524");
    this.beadMatB.color.set(layout.params.colorB || "#b45309");
    for (const bead of layout.beads) {
      const mat = !bead.enabled ? this.ghostMat : bead.colorIndex === 1 ? this.beadMatB : this.beadMatA;
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(bead.x, bead.y, 0);
      mesh.userData.id = bead.id;
      this.coverGroup.add(mesh);
      this.beadMeshes.push(mesh);
    }
    for (const tongue of clip.tongues) this._addBox(this.coverGroup, tongue, this.slotMat);

    this.plateMesh = new THREE.Mesh(this._plateGeom(layout, clip), this.plateMat);
    this.backGroup.add(this.plateMesh);
    for (const rail of clip.rails) {
      this._addBox(this.backGroup, rail.wall, this.slotMat);
      this._addBox(this.backGroup, rail.stop, this.slotMat);
      for (const lip of rail.lips) this._addBox(this.backGroup, lip, this.slotMat);
    }
    if (clip.pegStand?.cut) {
      for (const part of pegStandPlateBoxes(clip.pegStand)) this._addBox(this.standGroup, part, this.standMat);
    }

    const photoGeom = this._trackGeom(new THREE.PlaneGeometry(layout.photo.w, layout.photo.h));
    this.photoMesh = new THREE.Mesh(photoGeom, this.photoMat);
    this.photoMesh.position.set(0, 0, clip.frameBackZ - clip.photoGap * 0.45);
    this.photoGroup.add(this.photoMesh);

    for (const hole of hangHoleLayout(layout.params)) {
      const ring = new THREE.Mesh(
        this._trackGeom(new THREE.RingGeometry(Math.max(1.2, hole.r * 0.45), hole.r, 28)),
        this.holeMat
      );
      ring.position.set(hole.x, hole.y, clip.plate.t + 0.05);
      this.backGroup.add(ring);
    }
    this._applyShown();
    this._applyPose();
  }

  _plateGeom(layout, clip) {
    const t = clip.plate.t;
    const holes = hangHoleLayout(layout.params);
    const loop = plateLoop(clip);
    const shape = new THREE.Shape();
    shape.moveTo(loop[0][0], loop[0][1]);
    for (let i = 1; i < loop.length; i++) shape.lineTo(loop[i][0], loop[i][1]);
    shape.closePath();
    for (const hole of holes) {
      const path = new THREE.Path();
      path.absarc(hole.x, hole.y, hole.r, 0, Math.PI * 2, false);
      shape.holes.push(path);
    }
    if (clip.pegStand?.cut) {
      for (const hole of clip.pegStand.holes) {
        const path = new THREE.Path();
        const x0 = hole.x - hole.w / 2;
        const x1 = hole.x + hole.w / 2;
        const y0 = hole.y - hole.h / 2;
        const y1 = hole.y + hole.h / 2;
        path.moveTo(x0, y0);
        path.lineTo(x1, y0);
        path.lineTo(x1, y1);
        path.lineTo(x0, y1);
        path.closePath();
        shape.holes.push(path);
      }
    }
    const geom = new THREE.ExtrudeGeometry(shape, {
      depth: t,
      bevelEnabled: false,
      curveSegments: 20,
    });
    return this._trackGeom(geom);
  }

  _loop() {
    if (!this.running) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(this._loop);
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
        const hex = b.colorIndex === 1 ? params.colorB : params.colorA;
        ctx.fillStyle = hover ? "#44403c" : hex || "#292524";
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

    const holes = hangHoleLayout(params);
    for (const hole of holes) {
      const rr = Math.max(hole.r * map.scale, 5);
      ctx.beginPath();
      ctx.arc(toX(hole.x), toY(hole.y), rr, 0, Math.PI * 2);
      ctx.fillStyle = "#f5f5f4";
      ctx.fill();
      ctx.strokeStyle = "#44403c";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(toX(hole.x), toY(hole.y), rr * 0.4, 0, Math.PI * 2);
      ctx.fillStyle = "#a8a29e";
      ctx.fill();
    }

    const outerPoly = outerPerimeterPoly(
      this.layout.outer.w,
      this.layout.outer.h,
      params.outerCornerRadius,
      12
    );
    ctx.beginPath();
    ctx.moveTo(toX(outerPoly[0][0]), toY(outerPoly[0][1]));
    for (let i = 1; i < outerPoly.length; i++) {
      ctx.lineTo(toX(outerPoly[i][0]), toY(outerPoly[i][1]));
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(124, 45, 18, 0.35)";
    ctx.lineWidth = 1.25;
    ctx.stroke();

    ctx.fillStyle = "#78716c";
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(`click a circle to ${this.hoverId ? "toggle" : "add / remove"}`, 10, map.h - 10);
    ctx.restore();
  }
}
