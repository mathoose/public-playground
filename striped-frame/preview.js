import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { pegStandPlateBoxes, plateLoop } from "../shared/frame-clip.js";
import {
  edgeFinishSizes,
  frameClipFor,
  frontEdgeRuns,
  hangHoleLayout,
  layoutStripes,
  outerPerimeterPoly,
} from "./geometry.js";

export class FramePreview {
  constructor({ canvas3d, canvas2d }) {
    this.canvas3d = canvas3d;
    this.canvas2d = canvas2d;
    this.photoImage = null;
    this.layout = null;
    this.params = null;
    this.hoverSeg = null;

    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas3d,
      antialias: true,
      alpha: false,
      preserveDrawingBuffer: true,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xd7d2c8);
    this.persp = new THREE.PerspectiveCamera(32, 1, 1, 4000);
    this.persp.position.set(40, 25, 300);
    this.ortho = new THREE.OrthographicCamera(-100, 100, 100, -100, 0.1, 5000);
    this.camera = this.persp;
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

    this.matCache = new Map();
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
    this.bedMat = new THREE.MeshStandardMaterial({
      color: 0x78716c,
      roughness: 0.75,
      metalness: 0.04,
    });
    this.edgeFinishMat = new THREE.MeshStandardMaterial({
      color: 0xa8a29e,
      roughness: 0.55,
      metalness: 0.08,
    });

    this.partView = "assembled";
    this.tempGeoms = [];
    this.running = true;
    this._loop = this._loop.bind(this);
    requestAnimationFrame(this._loop);

    canvas2d.addEventListener("pointermove", (e) => this._on2dMove(e));
    canvas2d.addEventListener("pointerleave", () => {
      this.hoverSeg = null;
      this._draw2d();
    });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(canvas3d.parentElement || canvas3d);
  }

  _matForHex(hex) {
    const key = hex >>> 0;
    if (!this.matCache.has(key)) {
      this.matCache.set(
        key,
        new THREE.MeshStandardMaterial({
          color: hex,
          roughness: 0.4,
          metalness: 0.06,
          side: THREE.DoubleSide,
        })
      );
    }
    return this.matCache.get(key);
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
    this.layout = layoutStripes(params);
    this._rebuild3d();
    this._draw2d();
    return this.layout;
  }

  setPartView(mode) {
    this.partView = mode === "cover" || mode === "back" || mode === "side" ? mode : "assembled";
    this._applyPartView();
    this._applyPose();
    this.fit();
  }

  _applyPartView() {
    if (!this.coverGroup) return;
    const mode = this.partView;
    this.coverGroup.visible = mode !== "back";
    this.photoGroup.visible = mode === "assembled" || mode === "cover" || mode === "side";
    this.backGroup.visible = mode !== "cover";
    // The photo view stays clear. The easel only shows on the back and from the side.
    this.standGroup.visible = (mode === "back" || mode === "side") && Boolean(this._clip?.pegStand?.cut);
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

  _addBox(parent, b, material) {
    const w = b.x1 - b.x0;
    const h = b.y1 - b.y0;
    const d = b.z1 - b.z0;
    if (w < 1e-4 || h < 1e-4 || d < 1e-4) return;
    const mesh = new THREE.Mesh(this._trackGeom(new THREE.BoxGeometry(w, h, d)), material);
    mesh.position.set((b.x0 + b.x1) / 2, (b.y0 + b.y1) / 2, (b.z0 + b.z1) / 2);
    parent.add(mesh);
  }

  resize() {
    const canvas = this.canvas3d;
    const parent = canvas.parentElement || canvas;
    const w = Math.max(1, parent.clientWidth);
    const h = Math.max(1, parent.clientHeight);
    this.renderer.setSize(w, h, false);
    this.persp.aspect = w / h;
    this.persp.updateProjectionMatrix();
    if (this.partView === "back") this.fit();
    this._draw2d();
  }

  fit() {
    if (!this.layout) return;
    const span = Math.max(this.layout.outer.w, this.layout.outer.h, 40);
    const dist = span * 1.85;
    const leg = this._clip?.pegStand?.legReach || span * 0.3;
    const back = this.partView === "back";
    const cam = back ? this.ortho : this.persp;
    if (this.controls.object !== cam) this.controls.object = cam;
    this.camera = cam;
    cam.up.set(0, 1, 0);
    if (back) {
      const aspect = this.persp.aspect || 1;
      const half = span * 0.62;
      this.ortho.left = -half * aspect;
      this.ortho.right = half * aspect;
      this.ortho.top = half;
      this.ortho.bottom = -half;
      this.ortho.position.set(0, 0, -dist);
      this.controls.target.set(0, 0, 0);
      this.ortho.lookAt(0, 0, 0);
      this.ortho.updateProjectionMatrix();
    } else if (this.partView === "side") {
      this.camera.position.set(dist * 0.72, span * 0.05, -dist * 0.62);
      this.controls.target.set(0, -span * 0.02, -leg * 0.2);
    } else if (this.partView === "assembled") {
      this.camera.position.set(0, span * 0.05, dist);
      this.controls.target.set(0, 0, 0);
    } else {
      this.camera.position.set(0, 0, dist);
      this.controls.target.set(0, 0, this.layout.maxHeight * 0.25);
    }
    this.controls.update();
  }

  dispose() {
    this.running = false;
    this.ro.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    for (const g of this.tempGeoms) g.dispose();
    for (const m of this.matCache.values()) m.dispose();
  }

  _trackGeom(geom) {
    this.tempGeoms.push(geom);
    return geom;
  }

  _clearTemps() {
    for (const g of this.tempGeoms) g.dispose();
    this.tempGeoms = [];
  }

  _rebuild3d() {
    const layout = this.layout;
    while (this.group.children.length) {
      this.group.remove(this.group.children[0]);
    }
    this._clearTemps();
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

    if (layout.params.bedThickness > 0.05) {
      const shape = this._ringShape(layout.outer.w, layout.outer.h, layout.opening.w, layout.opening.h, layout.outerCornerRadius);
      const bed = new THREE.Mesh(
        this._trackGeom(
          new THREE.ExtrudeGeometry(shape, {
            depth: layout.params.bedThickness,
            bevelEnabled: false,
            curveSegments: 12,
          })
        ),
        this.bedMat
      );
      this.coverGroup.add(bed);
    }

    for (const seg of layout.segments) {
      const mat = this._matForHex(seg.hex);
      for (const b of seg.boxes) {
        const mesh = new THREE.Mesh(
          this._trackGeom(new THREE.BoxGeometry(b.w, b.h, Math.max(0.2, seg.height))),
          mat
        );
        mesh.position.set(b.cx, b.cy, seg.height / 2);
        this.coverGroup.add(mesh);
      }
    }

    this._addEdgeFinishPreview(layout);
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
    this._applyPartView();
    this._applyPose();
  }

  _ringShape(outerW, outerH, innerW, innerH, cornerR) {
    const shape = new THREE.Shape();
    const poly = outerPerimeterPoly(outerW, outerH, cornerR, 12);
    shape.moveTo(poly[0][0], poly[0][1]);
    for (let i = 1; i < poly.length; i++) shape.lineTo(poly[i][0], poly[i][1]);
    shape.closePath();
    const hole = new THREE.Path();
    hole.moveTo(-innerW / 2, -innerH / 2);
    hole.lineTo(-innerW / 2, innerH / 2);
    hole.lineTo(innerW / 2, innerH / 2);
    hole.lineTo(innerW / 2, -innerH / 2);
    hole.closePath();
    shape.holes.push(hole);
    return shape;
  }

  _addEdgeFinishPreview(layout) {
    const finish = edgeFinishSizes(layout.params);
    const z = layout.maxHeight;
    const mat = this.edgeFinishMat;
    const addWedge = (run, size, mode, kind) => {
      if (mode === "none" || size < 0.05) return;
      const len = run.axis === "x" ? run.x1 - run.x0 : run.y1 - run.y0;
      if (len < 0.3) return;
      if (mode === "chamfer") {
        // 45° square prism along the rim — same cue Manifold uses for the STL cut.
        const s = size * Math.SQRT2;
        const mesh = new THREE.Mesh(
          this._trackGeom(
            new THREE.BoxGeometry(run.axis === "x" ? len : s, run.axis === "x" ? s : len, s)
          ),
          mat
        );
        if (run.axis === "x") {
          mesh.rotation.x = Math.PI / 4;
          mesh.position.set((run.x0 + run.x1) / 2, run.y, z);
        } else {
          mesh.rotation.y = Math.PI / 4;
          mesh.position.set(run.x, (run.y0 + run.y1) / 2, z);
        }
        this.coverGroup.add(mesh);
      } else {
        // Quarter-pipe along the rim (preview cue; STL uses a proper fillet cutter).
        const mesh = new THREE.Mesh(
          this._trackGeom(new THREE.CylinderGeometry(size, size, len, 16, 1, false, 0, Math.PI / 2)),
          mat
        );
        if (run.axis === "x") {
          mesh.rotation.z = Math.PI / 2;
          const into = kind === "outside" ? (run.y > 0 ? -1 : 1) : run.y > 0 ? 1 : -1;
          mesh.rotation.y = into < 0 ? 0 : Math.PI;
          mesh.position.set((run.x0 + run.x1) / 2, run.y + into * size, z - size);
        } else {
          mesh.rotation.x = Math.PI / 2;
          const into = kind === "outside" ? (run.x > 0 ? -1 : 1) : run.x > 0 ? 1 : -1;
          mesh.rotation.z = into < 0 ? 0 : Math.PI;
          mesh.position.set(run.x + into * size, (run.y0 + run.y1) / 2, z - size);
        }
        this.coverGroup.add(mesh);
      }
    };

    const runs = frontEdgeRuns(layout);
    for (const run of runs.outside) addWedge(run, finish.outside.size, finish.outside.mode, "outside");
    for (const run of runs.inside) addWedge(run, finish.inside.size, finish.inside.mode, "inside");
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
    return this._trackGeom(
      new THREE.ExtrudeGeometry(shape, {
        depth: t,
        bevelEnabled: false,
        curveSegments: 20,
      })
    );
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
    const map = this._map2d();
    return {
      x: (event.clientX - rect.left - map.ox) / map.scale,
      y: -(event.clientY - rect.top - map.oy) / map.scale,
    };
  }

  _map2d() {
    const canvas = this.canvas2d;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cssW = canvas.clientWidth || 1;
    const cssH = canvas.clientHeight || 1;
    if (canvas.width !== Math.round(cssW * dpr) || canvas.height !== Math.round(cssH * dpr)) {
      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
    }
    const layout = this.layout;
    const pad = 16;
    const spanW = layout ? layout.outer.w : 100;
    const spanH = layout ? layout.outer.h : 100;
    const scale = Math.min((cssW - pad * 2) / spanW, (cssH - pad * 2) / spanH);
    return { scale, ox: cssW / 2, oy: cssH / 2, w: cssW, h: cssH, dpr };
  }

  _on2dMove(event) {
    if (!this.layout) return;
    const pt = this._worldFrom2d(event);
    this.hoverSeg = this._hitSeg(pt);
    this._draw2d();
  }

  _hitSeg(pt) {
    for (const seg of this.layout.segments) {
      for (const b of seg.boxes) {
        if (pt.x >= b.minX && pt.x <= b.maxX && pt.y >= b.minY && pt.y <= b.maxY) {
          return seg;
        }
      }
    }
    return null;
  }

  _draw2d() {
    const canvas = this.canvas2d;
    const ctx = canvas.getContext("2d");
    const map = this._map2d();
    ctx.setTransform(map.dpr, 0, 0, map.dpr, 0, 0);
    ctx.clearRect(0, 0, map.w, map.h);
    ctx.fillStyle = "#ece8e1";
    ctx.fillRect(0, 0, map.w, map.h);
    if (!this.layout) return;

    const toX = (x) => map.ox + x * map.scale;
    const toY = (y) => map.oy - y * map.scale;
    const { photo, opening, segments, params } = this.layout;

    ctx.save();
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

    ctx.save();
    const outerPoly = outerPerimeterPoly(
      this.layout.outer.w,
      this.layout.outer.h,
      this.layout.outerCornerRadius || 0,
      14
    );
    ctx.beginPath();
    ctx.moveTo(toX(outerPoly[0][0]), toY(outerPoly[0][1]));
    for (let i = 1; i < outerPoly.length; i++) {
      ctx.lineTo(toX(outerPoly[i][0]), toY(outerPoly[i][1]));
    }
    ctx.closePath();
    // Cut opening so stripes only fill the moulding ring
    ctx.moveTo(toX(-opening.w / 2), toY(-opening.h / 2));
    ctx.lineTo(toX(opening.w / 2), toY(-opening.h / 2));
    ctx.lineTo(toX(opening.w / 2), toY(opening.h / 2));
    ctx.lineTo(toX(-opening.w / 2), toY(opening.h / 2));
    ctx.closePath();
    ctx.clip("evenodd");

    for (const seg of segments) {
      const hover = this.hoverSeg && this.hoverSeg.id === seg.id;
      ctx.fillStyle = `#${seg.hex.toString(16).padStart(6, "0")}`;
      if (hover) ctx.globalAlpha = 0.85;
      for (const b of seg.boxes) {
        ctx.fillRect(toX(b.minX), toY(b.maxY), b.w * map.scale, b.h * map.scale);
      }
      ctx.globalAlpha = 1;
    }
    ctx.restore();

    ctx.beginPath();
    ctx.rect(toX(-opening.w / 2), toY(opening.h / 2), opening.w * map.scale, opening.h * map.scale);
    ctx.strokeStyle = "rgba(15, 118, 110, 0.55)";
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 3]);
    ctx.stroke();
    ctx.setLineDash([]);

    // Outer silhouette (shows corner radius)
    ctx.beginPath();
    ctx.moveTo(toX(outerPoly[0][0]), toY(outerPoly[0][1]));
    for (let i = 1; i < outerPoly.length; i++) {
      ctx.lineTo(toX(outerPoly[i][0]), toY(outerPoly[i][1]));
    }
    ctx.closePath();
    ctx.strokeStyle = "rgba(28, 25, 23, 0.35)";
    ctx.lineWidth = 1.25;
    ctx.stroke();

    const finish = edgeFinishSizes(params);
    if (finish.outside.size > 0.05 || finish.inside.size > 0.05) {
      ctx.strokeStyle = "rgba(15, 118, 110, 0.4)";
      ctx.lineWidth = 2;
      if (finish.outside.size > 0.05) {
        ctx.beginPath();
        ctx.moveTo(toX(outerPoly[0][0]), toY(outerPoly[0][1]));
        for (let i = 1; i < outerPoly.length; i++) {
          ctx.lineTo(toX(outerPoly[i][0]), toY(outerPoly[i][1]));
        }
        ctx.closePath();
        ctx.stroke();
      }
      if (finish.inside.size > 0.05) {
        ctx.strokeRect(
          toX(-opening.w / 2),
          toY(opening.h / 2),
          opening.w * map.scale,
          opening.h * map.scale
        );
      }
    }
    for (const hole of hangHoleLayout(params)) {
      const rr = Math.max(hole.r * map.scale, 5);
      ctx.beginPath();
      ctx.arc(toX(hole.x), toY(hole.y), rr, 0, Math.PI * 2);
      ctx.fillStyle = "#f5f5f4";
      ctx.fill();
      ctx.strokeStyle = "#44403c";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    ctx.fillStyle = "#78716c";
    ctx.font = "11px system-ui, sans-serif";
    ctx.textAlign = "left";
    const nColors = this.layout.colors.length;
    ctx.fillText(
      this.hoverSeg
        ? `color ${this.hoverSeg.colorIndex + 1} · ${this.hoverSeg.length.toFixed(1)} mm along path`
        : `${nColors}-color pattern · ${this.layout.repeats} loops`,
      10,
      map.h - 10
    );
    ctx.restore();
  }
}
