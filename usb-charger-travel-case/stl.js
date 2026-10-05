import { clampParams, dims, slotCenters, usbMarkerCenters } from "./geometry.js";

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

/** Rounded rectangle CrossSection centered at origin (matches SCAD offset-round). */
function roundedRect(CrossSection, w, l, r, segs) {
  const rr = Math.min(r, w / 2 - 0.01, l / 2 - 0.01);
  if (rr <= 0.05) {
    return CrossSection.square([w, l], true);
  }
  // square of inset size, then round-offset out by rr
  const inner = CrossSection.square([Math.max(0.1, w - 2 * rr), Math.max(0.1, l - 2 * rr)], true);
  // JoinType Round = 1 in manifold-3d
  return inner.offset(rr, 1, segs);
}

function extrudedRounded(CrossSection, Manifold, w, l, h, r, segs, temps) {
  const cs = roundedRect(CrossSection, w, l, r, segs);
  temps.push(cs);
  const solid = cs.extrude(h);
  temps.push(solid);
  return solid;
}

function buildBaseSolid(wasm, d, temps) {
  const { Manifold, CrossSection, setCircularSegments } = wasm;
  setCircularSegments(d.segments);

  const shell = extrudedRounded(
    CrossSection,
    Manifold,
    d.outer_l,
    d.outer_w,
    d.base_z,
    d.outer_r,
    d.segments,
    temps
  ).translate(d.outer_l / 2, d.outer_w / 2, 0);
  temps.push(shell);

  // Slot bay rim block (partition walls area)
  const slotBay = Manifold.cube(
    [d.slot_depth + 1.2, d.inner_w, d.slot_wall_h],
    true
  ).translate(
    d.wall + d.ac_pocket_depth + d.inner_l + d.slot_depth / 2,
    d.wall + d.inner_w / 2,
    d.floor + d.slot_wall_h / 2
  );
  temps.push(slotBay);

  let body = Manifold.union([shell, slotBay]);
  temps.push(body);

  // Brick nest void
  const nest = extrudedRounded(
    CrossSection,
    Manifold,
    d.brick_l + 2 * d.nest_clear_xy,
    d.brick_w + 2 * d.nest_clear_xy,
    d.brick_h + d.nest_clear_z + 0.2,
    d.brick_r,
    d.segments,
    temps
  ).translate(d.nest_cx, d.nest_cy, d.floor);
  temps.push(nest);
  body = body.subtract(nest);
  temps.push(body);

  // AC pocket
  const ac = Manifold.cube(
    [d.ac_pocket_depth, d.inner_w * 0.55, d.brick_h + d.nest_clear_z + 4],
    true
  ).translate(d.wall + d.ac_pocket_depth / 2, d.wall + d.inner_w / 2, d.floor + (d.brick_h + d.nest_clear_z) / 2);
  temps.push(ac);
  body = body.subtract(ac);
  temps.push(body);

  // Finger notch at USB end of nest
  const notch = Manifold.cube(
    [d.finger_notch_d + 2, d.finger_notch_w, d.cavity_z + 4],
    true
  ).translate(
    d.wall + d.ac_pocket_depth + d.inner_l - d.finger_notch_d / 2,
    d.wall + d.inner_w / 2,
    d.base_z
  );
  temps.push(notch);
  body = body.subtract(notch);
  temps.push(body);

  // Cable slots + label recesses
  for (const s of slotCenters(d)) {
    const slot = Manifold.cube(
      [d.slot_depth + 0.5, d.slot_throat, d.slot_wall_h + 0.5],
      true
    ).translate(s.cx, s.cy, d.floor + d.slot_wall_h / 2);
    temps.push(slot);
    body = body.subtract(slot);
    temps.push(body);

    const label = Manifold.cube([d.label_w, d.label_d, d.label_recess + 0.2], true).translate(
      s.labelX,
      s.cy,
      d.floor + (d.label_recess + 0.2) / 2
    );
    temps.push(label);
    body = body.subtract(label);
    temps.push(body);
  }

  // Lid seat bore
  const bore = extrudedRounded(
    CrossSection,
    Manifold,
    d.outer_l - 2 * d.wall + 2 * d.lip_clear,
    d.outer_w - 2 * d.wall + 2 * d.lip_clear,
    d.lip_depth + 0.5,
    Math.max(0.5, d.brick_r),
    d.segments,
    temps
  ).translate(d.outer_l / 2, d.outer_w / 2, d.base_z - d.lip_overlap);
  temps.push(bore);
  body = body.subtract(bore);
  temps.push(body);

  return body;
}

function buildLidSolid(wasm, d, temps) {
  const { Manifold, CrossSection, setCircularSegments } = wasm;
  setCircularSegments(d.segments);

  const top = extrudedRounded(
    CrossSection,
    Manifold,
    d.outer_l,
    d.outer_w,
    d.lid_thickness,
    d.outer_r,
    d.segments,
    temps
  ).translate(d.outer_l / 2, d.outer_w / 2, 0);
  temps.push(top);

  const skirtOuter = extrudedRounded(
    CrossSection,
    Manifold,
    d.outer_l - 2 * d.wall - 2 * d.lip_clear,
    d.outer_w - 2 * d.wall - 2 * d.lip_clear,
    d.lip_depth,
    Math.max(0.5, d.brick_r - 0.5),
    d.segments,
    temps
  ).translate(d.outer_l / 2, d.outer_w / 2, -d.lip_depth);
  temps.push(skirtOuter);

  const skirtInner = extrudedRounded(
    CrossSection,
    Manifold,
    d.outer_l - 2 * d.wall - 2 * d.lip_clear - 1.2,
    d.outer_w - 2 * d.wall - 2 * d.lip_clear - 1.2,
    d.lip_depth + 1,
    Math.max(0.4, d.brick_r - 1),
    d.segments,
    temps
  ).translate(d.outer_l / 2, d.outer_w / 2, -d.lip_depth - 0.5);
  temps.push(skirtInner);

  let skirt = skirtOuter.subtract(skirtInner);
  temps.push(skirt);

  let lid = Manifold.union([top, skirt]);
  temps.push(lid);

  // Cord wrap posts
  const cx = d.outer_l / 2;
  const cy = d.outer_w / 2;
  const z0 = d.lid_thickness;
  const postR = d.wrap_post_d / 2;
  for (const dx of [-1, 1]) {
    const post = Manifold.cylinder(d.wrap_post_h, postR, postR, d.segments, false).translate(
      cx + (dx * d.wrap_gap) / 2,
      cy,
      z0
    );
    temps.push(post);
    lid = lid.add(post);
    temps.push(lid);
  }
  // End bar (horizontal cylinder along Y)
  const barR = postR * 0.85;
  const barLen = d.outer_w * 0.35;
  const bar = Manifold.cylinder(barLen, barR, barR, d.segments, true)
    .rotate(90, 0, 0)
    .translate(cx, cy + d.wrap_end_bar_l / 2, z0);
  temps.push(bar);
  lid = lid.add(bar);
  temps.push(lid);

  return lid;
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `photive-case ${name}`.slice(0, 79);
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

export function stlTriangleCount(buffer) {
  if (!buffer || buffer.byteLength < 84) return 0;
  return new DataView(buffer).getUint32(80, true);
}

export function downloadArrayBuffer(filename, buffer) {
  const blob = new Blob([buffer], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/** Manifold mesh → plain { positions, indices } for Three.js */
export function meshToGeometryData(mesh) {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const nVerts = vertProperties.length / stride;
  const positions = new Float32Array(nVerts * 3);
  for (let i = 0; i < nVerts; i++) {
    positions[i * 3] = vertProperties[i * stride];
    positions[i * 3 + 1] = vertProperties[i * stride + 1];
    positions[i * 3 + 2] = vertProperties[i * stride + 2];
  }
  return { positions, indices: new Uint32Array(triVerts) };
}

export async function buildCaseMeshes(params, { preview = false } = {}) {
  const d = dims(params);
  if (preview) d.segments = Math.min(d.segments, 20);
  const wasm = await loadManifold();
  const temps = [];
  try {
    const out = { dims: d, base: null, lid: null, markers: [] };
    if (d.part === "base" || d.part === "both") {
      const solid = buildBaseSolid(wasm, d, temps);
      const status = solid.status ? solid.status() : "NoError";
      if (status && status !== "NoError") throw new Error(`Base manifold error: ${status}`);
      out.base = {
        mesh: meshToGeometryData(solid.getMesh()),
        volume: solid.volume(),
        stl: preview ? null : meshToStl(solid.getMesh(), "base"),
      };
    }
    if (d.part === "lid" || d.part === "both") {
      const solid = buildLidSolid(wasm, d, temps);
      const status = solid.status ? solid.status() : "NoError";
      if (status && status !== "NoError") throw new Error(`Lid manifold error: ${status}`);
      // Offset lid for "both" preview so it sits beside the base
      let meshData = meshToGeometryData(solid.getMesh());
      if (d.part === "both" && preview) {
        const dy = d.outer_w + 15;
        for (let i = 0; i < meshData.positions.length; i += 3) {
          meshData.positions[i + 1] += dy;
        }
      }
      out.lid = {
        mesh: meshData,
        volume: solid.volume(),
        stl: preview ? null : meshToStl(solid.getMesh(), "lid"),
      };
    }
    if (d.show_usb_markers && (d.part === "base" || d.part === "both")) {
      out.markers = usbMarkerCenters(d);
    }
    return out;
  } finally {
    deleteAll(temps);
  }
}

export async function buildBaseStl(params) {
  const result = await buildCaseMeshes({ ...clampParams(params), part: "base" }, { preview: false });
  return result.base;
}

export async function buildLidStl(params) {
  const result = await buildCaseMeshes({ ...clampParams(params), part: "lid" }, { preview: false });
  return result.lid;
}
