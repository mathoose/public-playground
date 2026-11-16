import { derive } from "./geometry.js";

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
        return Module(inBrowser ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) } : {});
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

function dedupe(pts) {
  const out = [];
  for (const p of pts) {
    const prev = out[out.length - 1];
    if (prev && Math.hypot(p[0] - prev[0], p[1] - prev[1]) < 1e-5) continue;
    out.push(p);
  }
  if (out.length > 1 && Math.hypot(out[0][0] - out[out.length - 1][0], out[0][1] - out[out.length - 1][1]) < 1e-5) {
    out.pop();
  }
  return out;
}

/** CCW rounded rectangle. r is clamped to half the shorter side. */
export function roundedRect(x0, y0, x1, y1, r, segs) {
  const w = x1 - x0;
  const h = y1 - y0;
  const radius = Math.max(0, Math.min(r, w / 2 - 0.01, h / 2 - 0.01));
  if (radius < 0.05) {
    return [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ];
  }
  const pts = [];
  const corner = (cx, cy, a0, a1) => {
    const n = Math.max(2, segs);
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      pts.push([cx + radius * Math.cos(a), cy + radius * Math.sin(a)]);
    }
  };
  corner(x0 + radius, y0 + radius, Math.PI, Math.PI * 1.5);
  corner(x1 - radius, y0 + radius, Math.PI * 1.5, Math.PI * 2);
  corner(x1 - radius, y1 - radius, 0, Math.PI * 0.5);
  corner(x0 + radius, y1 - radius, Math.PI * 0.5, Math.PI);
  return dedupe(pts);
}

/** Pointy top when pointy is true, otherwise flats on the top and bottom. R is center-to-vertex. */
export function hexPoints(cx, cy, R, pointy = true) {
  const rot = pointy ? Math.PI / 2 : 0;
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = rot + (i * Math.PI) / 3;
    pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]);
  }
  return pts;
}

function extrude(CrossSection, pts, height, temps) {
  const cs = new CrossSection([pts]);
  temps.push(cs);
  const solid = cs.extrude(height);
  temps.push(solid);
  return solid;
}

export function buildSolid(wasm, raw, temps, quality = "preview") {
  const { CrossSection, Manifold } = wasm;
  const d = derive(raw);
  const p = d.p;
  const segs = quality === "export" ? 10 : 6;
  const parts = [];

  const plate = extrude(CrossSection, roundedRect(0, 0, p.width, p.height, d.corner, segs), p.plate, temps);
  parts.push(plate);

  const armH = p.armLength + 0.2;
  const corners = [
    [0, 0],
    [p.width - p.armThick, 0],
    [0, p.height - p.armThick],
    [p.width - p.armThick, p.height - p.armThick],
  ];
  for (const [x, y] of corners) {
    const arm = extrude(
      CrossSection,
      roundedRect(x, y, x + p.armThick, y + p.armThick, d.corner, segs),
      armH,
      temps,
    );
    const moved = arm.translate(0, 0, p.plate - 0.2);
    temps.push(moved);
    parts.push(moved);
  }

  let solid = Manifold.union(parts);
  temps.push(solid);

  const cutters = [];
  for (const c of d.centers) {
    const hole = extrude(CrossSection, hexPoints(c.x, c.y, d.R, d.pointy), p.plate + 0.8, temps);
    const moved = hole.translate(0, 0, -0.4);
    temps.push(moved);
    cutters.push(moved);
    if (d.chamfer > 0.05) {
      const cham = extrude(CrossSection, hexPoints(c.x, c.y, d.outerR, d.pointy), d.chamfer + 0.4, temps);
      const placed = cham.translate(0, 0, -0.4);
      temps.push(placed);
      cutters.push(placed);
    }
  }
  if (cutters.length) {
    const cut = Manifold.union(cutters);
    temps.push(cut);
    const next = solid.subtract(cut);
    temps.push(next);
    solid = next;
  }
  return solid;
}

function copyMesh(mesh) {
  return {
    vertProperties: new Float32Array(mesh.vertProperties),
    triVerts: new Uint32Array(mesh.triVerts),
    numProp: mesh.numProp || 3,
  };
}

export async function buildShelf(raw, quality = "preview") {
  const wasm = await loadManifold();
  const temps = [];
  try {
    const solid = buildSolid(wasm, raw, temps, quality);
    const status = solid.status ? solid.status() : "NoError";
    if (status && status !== "NoError") throw new Error(`manifold error: ${status}`);
    const volume = solid.volume();
    const mesh = copyMesh(solid.getMesh());
    return { mesh, volume, d: derive(raw), status };
  } finally {
    deleteAll(temps);
  }
}

export async function buildShelfStl(raw) {
  const built = await buildShelf(raw, "export");
  return { ...built, stl: meshToStl(built.mesh, "kitchen-shelf-cups") };
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const header = new Uint8Array(buf, 0, 80);
  const label = name.slice(0, 79);
  for (let i = 0; i < label.length; i++) header[i] = label.charCodeAt(i);
  const view = new DataView(buf);
  view.setUint32(80, triCount, true);
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const v = [0, 1, 2].map((k) => triVerts[t * 3 + k] * stride);
    const [a, b, c] = v.map((i) => [vertProperties[i], vertProperties[i + 1], vertProperties[i + 2]]);
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const nx = e1[1] * e2[2] - e1[2] * e2[1];
    const ny = e1[2] * e2[0] - e1[0] * e2[2];
    const nz = e1[0] * e2[1] - e1[1] * e2[0];
    const nl = Math.hypot(nx, ny, nz) || 1;
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
    for (let k = 0; k < 3; k++) {
      const pt = [a, b, c][k];
      view.setFloat32(o + 12 + k * 12, pt[0], true);
      view.setFloat32(o + 16 + k * 12, pt[1], true);
      view.setFloat32(o + 20 + k * 12, pt[2], true);
    }
    view.setUint16(o + 48, 0, true);
    o += 50;
  }
  return buf;
}

export function manifoldMeshToPositions(mesh) {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const pos = new Float32Array(triVerts.length * 3);
  let i = 0;
  for (let t = 0; t < triVerts.length; t++) {
    const v = triVerts[t] * stride;
    pos[i++] = vertProperties[v];
    pos[i++] = vertProperties[v + 1];
    pos[i++] = vertProperties[v + 2];
  }
  return pos;
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

export function stlTriangleCount(buffer) {
  if (buffer.byteLength < 84) return 0;
  return new DataView(buffer).getUint32(80, true);
}
