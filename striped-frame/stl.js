import {
  clampParams,
  edgeFinishSizes,
  hangHoleLayout,
  layoutStripes,
  standPolygon,
  standSlotLayout,
} from "./geometry.js";

const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";

let wasmPromise = null;

export async function loadManifold() {
  if (!wasmPromise) {
    const spec = typeof window !== "undefined" ? MANIFOLD_JS : "manifold-3d";
    wasmPromise = import(/* @vite-ignore */ spec)
      .catch(() => import(/* @vite-ignore */ MANIFOLD_JS))
      .then((mod) => {
        const Module = mod.default || mod;
        const inBrowser = typeof window !== "undefined";
        return Module(
          inBrowser
            ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) }
            : {}
        );
      })
      .then((wasm) => {
        wasm.setup();
        return wasm;
      });
  }
  return wasmPromise;
}

function deleteAll(items) {
  for (const item of items) {
    if (item && typeof item.delete === "function") {
      try {
        item.delete();
      } catch {
        /* already freed */
      }
    }
  }
}

function boxFromLayout(Manifold, b, height) {
  return Manifold.cube([b.w, b.h, height], true).translate(b.cx, b.cy, height / 2);
}

function rectRing(CrossSection, outerW, outerH, innerW, innerH) {
  const outer = CrossSection.square([outerW, outerH], true);
  if (innerW <= 0.05 || innerH <= 0.05) return outer;
  const inner = CrossSection.square([innerW, innerH], true);
  return outer.subtract(inner);
}

async function unionBoxes(Manifold, boxes, height, temps) {
  if (!boxes.length) return null;
  const parts = boxes.map((b) => {
    const m = boxFromLayout(Manifold, b, height);
    temps.push(m);
    return m;
  });
  const solid = parts.length === 1 ? parts[0] : Manifold.union(parts);
  if (solid !== parts[0]) temps.push(solid);
  return solid;
}

/** Subtract outer-corner square−quarter-cylinder cutters (radius 0 = no-op). */
function roundOuterCorners(Manifold, solid, outerW, outerH, radius, height, temps) {
  const R = radius;
  if (R < 0.05) return solid;
  const H = Math.max(height, 0.5) + 2;
  let out = solid;
  const corners = [
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];
  for (const [sx, sy] of corners) {
    const ox = (sx * outerW) / 2;
    const oy = (sy * outerH) / 2;
    const cx = ox - sx * R;
    const cy = oy - sy * R;
    const box = Manifold.cube([R, R, H], true).translate(ox - (sx * R) / 2, oy - (sy * R) / 2, H / 2 - 1);
    temps.push(box);
    const cyl = Manifold.cylinder(H + 2, R, R, 48, true).translate(cx, cy, H / 2 - 1);
    temps.push(cyl);
    const keep = box.intersect(cyl);
    temps.push(keep);
    const cutter = box.subtract(keep);
    temps.push(cutter);
    out = out.subtract(cutter);
    temps.push(out);
  }
  return out;
}

function edgeLengthOk(a, b) {
  return b - a > 0.2;
}

/**
 * Chamfer: 45° square prism along the top outer/inner rim.
 * Round: square−quarter-cylinder fillet cutter along the rim.
 */
function finishFrontEdges(Manifold, solid, layout, temps) {
  const finish = edgeFinishSizes(layout.params);
  const maxH = layout.maxHeight;
  let out = solid;

  const applyOutside = (mode, size) => {
    if (mode === "none" || size < 0.05) return;
    const ox = layout.outer.w / 2;
    const oy = layout.outer.h / 2;
    const trim = Math.max(layout.params.outerCornerRadius, size * 0.5);
    const runs = [
      { dir: "x", y: oy, x0: -ox + trim, x1: ox - trim, inward: -1 },
      { dir: "x", y: -oy, x0: -ox + trim, x1: ox - trim, inward: 1 },
      { dir: "y", x: ox, y0: -oy + trim, y1: oy - trim, inward: -1 },
      { dir: "y", x: -ox, y0: -oy + trim, y1: oy - trim, inward: 1 },
    ];
    for (const run of runs) {
      out = applyEdgeCutter(Manifold, out, run, mode, size, maxH, "outside", temps);
    }
  };

  const applyInside = (mode, size) => {
    if (mode === "none" || size < 0.05) return;
    const ix = layout.opening.w / 2;
    const iy = layout.opening.h / 2;
    const runs = [
      { dir: "x", y: iy, x0: -ix, x1: ix, inward: 1 },
      { dir: "x", y: -iy, x0: -ix, x1: ix, inward: -1 },
      { dir: "y", x: ix, y0: -iy, y1: iy, inward: 1 },
      { dir: "y", x: -ix, y0: -iy, y1: iy, inward: -1 },
    ];
    for (const run of runs) {
      out = applyEdgeCutter(Manifold, out, run, mode, size, maxH, "inside", temps);
    }
  };

  applyOutside(finish.outside.mode, finish.outside.size);
  applyInside(finish.inside.mode, finish.inside.size);
  return out;
}

function applyEdgeCutter(Manifold, solid, run, mode, size, height, kind, temps) {
  const len = run.dir === "x" ? run.x1 - run.x0 : run.y1 - run.y0;
  if (!edgeLengthOk(0, len)) return solid;
  const mid =
    run.dir === "x" ? (run.x0 + run.x1) / 2 : (run.y0 + run.y1) / 2;
  let cutter;
  if (mode === "chamfer") {
    const s = size * Math.SQRT2;
    cutter = Manifold.cube(
      run.dir === "x" ? [len, s, s] : [s, len, s],
      true
    );
    if (run.dir === "x") {
      // Rotate around X so the square cuts into ±Y and −Z from the rim.
      const ang = kind === "outside" ? (run.inward < 0 ? 45 : -45) : run.inward > 0 ? -45 : 45;
      cutter = cutter.rotate(ang, 0, 0);
      cutter = cutter.translate(mid, run.y, height);
    } else {
      const ang = kind === "outside" ? (run.inward < 0 ? -45 : 45) : run.inward > 0 ? 45 : -45;
      cutter = cutter.rotate(0, ang, 0);
      cutter = cutter.translate(run.x, mid, height);
    }
  } else {
    // Round / fillet: edge box minus aligned cylinder.
    const F = size;
    if (run.dir === "x") {
      const yBox = run.y + run.inward * (F / 2);
      const box = Manifold.cube([len, F, F], true).translate(mid, yBox, height - F / 2);
      temps.push(box);
      const cyl = Manifold.cylinder(len + 4, F, F, 28, true)
        .rotate(0, 90, 0)
        .translate(mid, run.y + run.inward * F, height - F);
      temps.push(cyl);
      const keep = box.intersect(cyl);
      temps.push(keep);
      cutter = box.subtract(keep);
    } else {
      const xBox = run.x + run.inward * (F / 2);
      const box = Manifold.cube([F, len, F], true).translate(xBox, mid, height - F / 2);
      temps.push(box);
      const cyl = Manifold.cylinder(len + 4, F, F, 28, true)
        .rotate(90, 0, 0)
        .translate(run.x + run.inward * F, mid, height - F);
      temps.push(cyl);
      const keep = box.intersect(cyl);
      temps.push(keep);
      cutter = box.subtract(keep);
    }
  }
  temps.push(cutter);
  const next = solid.subtract(cutter);
  temps.push(next);
  return next;
}

function applyFrameFinishes(Manifold, solid, layout, temps) {
  const R = layout.params.outerCornerRadius;
  let out = roundOuterCorners(Manifold, solid, layout.outer.w, layout.outer.h, R, layout.maxHeight, temps);
  out = finishFrontEdges(Manifold, out, layout, temps);
  return out;
}

export async function buildFrameMesh(params) {
  const layout = layoutStripes(params);
  if (!layout.segments.length) {
    throw new Error("No stripe segments to export.");
  }

  const wasm = await loadManifold();
  const { Manifold, CrossSection } = wasm;
  const temps = [];
  try {
    const parts = [];
    for (const seg of layout.segments) {
      if (!seg.boxes.length) continue;
      const solid = await unionBoxes(Manifold, seg.boxes, seg.height, temps);
      if (solid) parts.push(solid);
    }

    if (layout.params.bedThickness > 0.001) {
      const bed2d = rectRing(
        CrossSection,
        layout.outer.w,
        layout.outer.h,
        layout.opening.w,
        layout.opening.h
      );
      temps.push(bed2d);
      const bed = bed2d.extrude(layout.params.bedThickness);
      temps.push(bed);
      parts.push(bed);
    }

    if (!parts.length) throw new Error("Empty frame mesh.");
    let solid = parts.length === 1 ? parts[0] : Manifold.union(parts);
    if (solid !== parts[0]) temps.push(solid);

    solid = applyFrameFinishes(Manifold, solid, layout, temps);

    const status = solid.status ? solid.status() : "NoError";
    if (status && status !== "NoError") {
      throw new Error(`Manifold error: ${status}`);
    }

    const mesh = solid.getMesh();
    const volume = solid.volume();
    const stl = meshToStl(mesh, "striped-frame");
    return { stl, volume, layout };
  } finally {
    deleteAll(temps);
  }
}

/** One STL per pattern color — useful for multi-material / filament-change prints. */
export async function buildColorMeshes(params) {
  const layout = layoutStripes(params);
  const wasm = await loadManifold();
  const { Manifold } = wasm;
  const out = [];
  for (let ci = 0; ci < layout.colors.length; ci++) {
    const temps = [];
    try {
      const boxes = [];
      let height = layout.colors[ci].height;
      for (const seg of layout.segments) {
        if (seg.colorIndex !== ci) continue;
        height = seg.height;
        for (const b of seg.boxes) boxes.push(b);
      }
      if (!boxes.length) continue;
      let solid = await unionBoxes(Manifold, boxes, height, temps);
      if (!solid) continue;
      // Per-color meshes get the same corner/edge cutters so parts still mate.
      const colorLayout = {
        ...layout,
        maxHeight: height,
        params: { ...layout.params },
      };
      solid = applyFrameFinishes(Manifold, solid, colorLayout, temps);
      const status = solid.status ? solid.status() : "NoError";
      if (status && status !== "NoError") throw new Error(`Color ${ci + 1}: ${status}`);
      out.push({
        colorIndex: ci,
        swatch: layout.colors[ci].swatch,
        stl: meshToStl(solid.getMesh(), `striped-frame-color-${ci + 1}`),
        volume: solid.volume(),
      });
    } finally {
      deleteAll(temps);
    }
  }
  return { layout, parts: out };
}

export async function buildBackPlateStl(params) {
  const p = layoutStripes(params).params;
  const holes = hangHoleLayout(p);
  const slot = standSlotLayout(p);
  if (holes.length === 0 && !slot) {
    return {
      stl: boxStl(p.photoW, p.photoH, p.plateThickness, "striped-frame-back"),
      volume: p.photoW * p.photoH * p.plateThickness,
    };
  }

  const wasm = await loadManifold();
  const { Manifold } = wasm;
  const temps = [];
  try {
    const plate = Manifold.cube([p.photoW, p.photoH, p.plateThickness], true).translate(
      0,
      0,
      p.plateThickness / 2
    );
    temps.push(plate);
    let solid = plate;
    if (slot) {
      const boss = Manifold.cube([slot.bossW, slot.bossH, slot.bossD], true).translate(
        0,
        -p.photoH / 2 + slot.bossH / 2,
        p.plateThickness + slot.bossD / 2
      );
      temps.push(boss);
      const withBoss = solid.add(boss);
      temps.push(withBoss);
      const cutter = Manifold.cube([slot.slotW, slot.bossH + 8, slot.slotD], true).translate(
        0,
        -p.photoH / 2 + slot.insertH / 2 - 2,
        p.plateThickness + slot.slotD / 2
      );
      temps.push(cutter);
      solid = withBoss.subtract(cutter);
      temps.push(solid);
    }
    if (holes.length) {
      const drills = holes.map((h) => {
        const cyl = Manifold.cylinder(p.plateThickness + 4, h.r, h.r, 36, true).translate(
          h.x,
          h.y,
          p.plateThickness / 2
        );
        temps.push(cyl);
        return cyl;
      });
      const cutter = drills.length === 1 ? drills[0] : Manifold.union(drills);
      if (cutter !== drills[0]) temps.push(cutter);
      solid = solid.subtract(cutter);
      temps.push(solid);
    }
    const status = solid.status ? solid.status() : "NoError";
    if (status && status !== "NoError") throw new Error(`Back plate manifold error: ${status}`);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    return { stl: meshToStl(mesh, "striped-frame-back"), volume };
  } finally {
    deleteAll(temps);
  }
}

export async function buildStandStl(params) {
  const p = clampParams(params);
  if (!p.standEnabled) {
    throw new Error("Stand is turned off.");
  }
  const poly = standPolygon(p);
  const wasm = await loadManifold();
  const { CrossSection } = wasm;
  const temps = [];
  try {
    const cs = new CrossSection([poly]);
    temps.push(cs);
    const solid = cs.extrude(p.standWidth);
    temps.push(solid);
    const status = solid.status ? solid.status() : "NoError";
    if (status && status !== "NoError") throw new Error(`Stand manifold error: ${status}`);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    return { stl: meshToStl(mesh, "striped-frame-stand"), volume };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `striped-frame ${name}`.slice(0, 79);
  for (let i = 0; i < label.length; i++) header[i] = label.charCodeAt(i);

  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  new Uint8Array(buf, 0, 80).set(header);
  view.setUint32(80, triCount, true);

  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const i0 = triVerts[t * 3] * stride;
    const i1 = triVerts[t * 3 + 1] * stride;
    const i2 = triVerts[t * 3 + 2] * stride;
    const ax = vertProperties[i0];
    const ay = vertProperties[i0 + 1];
    const az = vertProperties[i0 + 2];
    const bx = vertProperties[i1];
    const by = vertProperties[i1 + 1];
    const bz = vertProperties[i1 + 2];
    const cx = vertProperties[i2];
    const cy = vertProperties[i2 + 1];
    const cz = vertProperties[i2 + 2];
    const e1x = bx - ax;
    const e1y = by - ay;
    const e1z = bz - az;
    const e2x = cx - ax;
    const e2y = cy - ay;
    const e2z = cz - az;
    let nx = e1y * e2z - e1z * e2y;
    let ny = e1z * e2x - e1x * e2z;
    let nz = e1x * e2y - e1y * e2x;
    const nl = Math.hypot(nx, ny, nz) || 1;
    nx /= nl;
    ny /= nl;
    nz /= nl;
    view.setFloat32(o, nx, true);
    view.setFloat32(o + 4, ny, true);
    view.setFloat32(o + 8, nz, true);
    view.setFloat32(o + 12, ax, true);
    view.setFloat32(o + 16, ay, true);
    view.setFloat32(o + 20, az, true);
    view.setFloat32(o + 24, bx, true);
    view.setFloat32(o + 28, by, true);
    view.setFloat32(o + 32, bz, true);
    view.setFloat32(o + 36, cx, true);
    view.setFloat32(o + 40, cy, true);
    view.setFloat32(o + 44, cz, true);
    view.setUint16(o + 48, 0, true);
    o += 50;
  }
  return buf;
}

export function boxStl(w, h, t, name = "box") {
  const x0 = -w / 2;
  const x1 = w / 2;
  const y0 = -h / 2;
  const y1 = h / 2;
  const z0 = 0;
  const z1 = t;
  const v = [
    [x0, y0, z0],
    [x1, y0, z0],
    [x1, y1, z0],
    [x0, y1, z0],
    [x0, y0, z1],
    [x1, y0, z1],
    [x1, y1, z1],
    [x0, y1, z1],
  ];
  const faces = [
    [0, 2, 1],
    [0, 3, 2],
    [4, 5, 6],
    [4, 6, 7],
    [0, 1, 5],
    [0, 5, 4],
    [1, 2, 6],
    [1, 6, 5],
    [2, 3, 7],
    [2, 7, 6],
    [3, 0, 4],
    [3, 4, 7],
  ];
  const triVerts = new Uint32Array(faces.flat());
  const vertProperties = new Float32Array(v.flat());
  return meshToStl({ vertProperties, triVerts, numProp: 3 }, name);
}

export function stlTriangleCount(buffer) {
  if (buffer.byteLength < 84) return 0;
  return new DataView(buffer).getUint32(80, true);
}
