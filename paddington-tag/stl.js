import { derive, outlinePoints, scaledLetters } from "./geometry.js";
import { paperHeight01 } from "./paper.js";
import { meshesTo3mf } from "./threemf.js";

/** Peak-to-valley of the parchment grain. Light on the height map stays high. */
const PAPER_GRAIN_MM = 0.38;
const SEAT_MARGIN = 0.4;

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

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function polygonsToSection(CrossSection, polys, temps) {
  const cs = CrossSection.ofPolygons(polys, "NonZero");
  temps.push(cs);
  return cs;
}

function tagFace(CrossSection, d, segs, temps) {
  const outline = polygonsToSection(CrossSection, [outlinePoints(d, 12)], temps);
  const hole = CrossSection.circle(d.p.hole / 2, segs).translate([d.holeX, d.holeY]);
  temps.push(hole);
  const face = outline.subtract(hole);
  temps.push(face);
  return face;
}

const SINK = 0.08;

function circleAt(CrossSection, d, radius, segs, temps) {
  const disk = CrossSection.circle(radius, segs).translate([d.holeX, d.holeY]);
  temps.push(disk);
  return disk;
}

function winding(poly, x, y) {
  let w = 0;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const yi = poly[i][1];
    const yj = poly[j][1];
    if ((yi > y) === (yj > y)) continue;
    const xi = poly[i][0];
    const xj = poly[j][0];
    const xCross = ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (x < xCross) w += yj > yi ? 1 : -1;
  }
  return w;
}

function distToPoly(poly, x, y) {
  let best = Infinity;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const x0 = poly[i][0];
    const y0 = poly[i][1];
    const x1 = poly[j][0];
    const y1 = poly[j][1];
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len2 = dx * dx + dy * dy || 1;
    let t = ((x - x0) * dx + (y - y0) * dy) / len2;
    if (t < 0) t = 0;
    else if (t > 1) t = 1;
    const d = Math.hypot(x - (x0 + t * dx), y - (y0 + t * dy));
    if (d < best) best = d;
  }
  return best;
}

/** Letters and the ring sit on a smooth seat. Counters stay open so grain shows through. */
function makeFlatAt(d) {
  const margin = SEAT_MARGIN;
  const polys = scaledLetters(d.p.height, d.p.letterSize).map((poly) => {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of poly) {
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
    return { poly, minX, minY, maxX, maxY };
  });
  const r2 = (d.ringOuter + margin) * (d.ringOuter + margin);
  return (x, y) => {
    const dx = x - d.holeX;
    const dy = y - d.holeY;
    if (dx * dx + dy * dy <= r2) return true;
    let wind = 0;
    const near = [];
    for (const p of polys) {
      if (x < p.minX - margin || x > p.maxX + margin || y < p.minY - margin || y > p.maxY + margin) continue;
      near.push(p);
      wind += winding(p.poly, x, y);
    }
    if (wind !== 0) return true;
    for (const p of near) {
      if (distToPoly(p.poly, x, y) <= margin) return true;
    }
    return false;
  };
}

function heightfieldMesh(d, step) {
  const grain = Math.min(PAPER_GRAIN_MM, d.p.thickness * 0.18);
  const flatAt = makeFlatAt(d);
  const x0 = -d.bodyHalf - 1.2;
  const x1 = d.bodyHalf + 1.2;
  const y0 = -1.2;
  const y1 = d.height + 1.2;
  const nx = Math.max(2, Math.ceil((x1 - x0) / step));
  const ny = Math.max(2, Math.ceil((y1 - y0) / step));
  const dx = (x1 - x0) / nx;
  const dy = (y1 - y0) / ny;
  const cols = nx + 1;
  const rows = ny + 1;
  const nVert = cols * rows;
  const vp = new Float32Array(nVert * 2 * 3);
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      const x = x0 + i * dx;
      const y = y0 + j * dy;
      const high = flatAt(x, y) ? 1 : paperHeight01(x, y);
      const top = d.p.thickness - grain * (1 - high);
      const b = (j * cols + i) * 3;
      vp[b] = x;
      vp[b + 1] = y;
      vp[b + 2] = -1;
      const t = (nVert + j * cols + i) * 3;
      vp[t] = x;
      vp[t + 1] = y;
      vp[t + 2] = top;
    }
  }
  const vid = (i, j, top) => (top ? nVert : 0) + j * cols + i;
  const triN = (nx * ny * 2 + (nx + ny) * 2) * 2;
  const tris = new Uint32Array(triN * 3);
  let cursor = 0;
  const push = (a, b, c) => {
    tris[cursor++] = a;
    tris[cursor++] = b;
    tris[cursor++] = c;
  };
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) {
      const a = vid(i, j, 1);
      const b = vid(i + 1, j, 1);
      const c = vid(i + 1, j + 1, 1);
      const e = vid(i, j + 1, 1);
      push(a, b, c);
      push(a, c, e);
      const A = vid(i, j, 0);
      const B = vid(i + 1, j, 0);
      const C = vid(i + 1, j + 1, 0);
      const E = vid(i, j + 1, 0);
      push(A, C, B);
      push(A, E, C);
    }
  }
  for (let j = 0; j < ny; j++) {
    push(vid(0, j, 0), vid(0, j, 1), vid(0, j + 1, 1));
    push(vid(0, j, 0), vid(0, j + 1, 1), vid(0, j + 1, 0));
    push(vid(nx, j, 0), vid(nx, j + 1, 0), vid(nx, j + 1, 1));
    push(vid(nx, j, 0), vid(nx, j + 1, 1), vid(nx, j, 1));
  }
  for (let i = 0; i < nx; i++) {
    push(vid(i, 0, 0), vid(i + 1, 0, 0), vid(i + 1, 0, 1));
    push(vid(i, 0, 0), vid(i + 1, 0, 1), vid(i, 0, 1));
    push(vid(i, ny, 0), vid(i, ny, 1), vid(i + 1, ny, 1));
    push(vid(i, ny, 0), vid(i + 1, ny, 1), vid(i + 1, ny, 0));
  }
  if (cursor !== tris.length) throw new Error(`heightfield tris ${cursor} != ${tris.length}`);
  return { numProp: 3, vertProperties: vp, triVerts: tris };
}

/**
 * Three parts in one coordinate system: body on the bed, letters and the
 * brown hole ring raised on the face. Separate meshes so each can be a color.
 * The body face is embossed with paper grain; letters and the ring stay smooth.
 */
export function buildParts(wasm, raw, temps, segs) {
  const { CrossSection, Manifold, Mesh } = wasm;
  const d = derive(raw);
  const face = tagFace(CrossSection, d, segs, temps);
  const blank = assertOk(face.extrude(d.p.thickness + 1), "body blank");
  temps.push(blank);
  const step = segs >= 48 ? 0.28 : 0.24;
  const fieldMesh = heightfieldMesh(d, step);
  const field = assertOk(new Manifold(new Mesh(fieldMesh)), "paper field");
  temps.push(field);
  const body = assertOk(blank.intersect(field), "paper body");
  temps.push(body);

  const ringOuter = circleAt(CrossSection, d, d.ringOuter, segs, temps);
  const ringBand = ringOuter.intersect(face);
  temps.push(ringBand);
  const raise = Math.max(0.2, d.p.letterH);
  const ring = assertOk(
    ringBand.extrude(raise + SINK).translate([0, 0, d.p.thickness - SINK]),
    "ring"
  );
  temps.push(ring);

  let letters = null;
  if (d.p.letterH > 0) {
    const section = polygonsToSection(CrossSection, scaledLetters(d.p.height, d.p.letterSize), temps);
    const onFace = section.intersect(face);
    temps.push(onFace);
    const clearOfRing = onFace.subtract(ringOuter);
    temps.push(clearOfRing);
    letters = assertOk(
      clearOfRing.extrude(d.p.letterH + SINK).translate([0, 0, d.p.thickness - SINK]),
      "letters"
    );
    temps.push(letters);
  }
  return { body, letters, ring, d };
}

function copyMesh(mesh) {
  return {
    numProp: mesh.numProp || 3,
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
  };
}

function pack(solid, name, keepMesh) {
  const mesh = solid.getMesh();
  return {
    stl: meshToStl(mesh, name),
    volume: solid.volume(),
    genus: typeof solid.genus === "function" ? solid.genus() : null,
    tris: mesh.triVerts.length / 3,
    positions: manifoldMeshToPositions(mesh),
    mesh: keepMesh ? copyMesh(mesh) : null,
  };
}

export async function buildTag(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 64 : 28;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const temps = [];
  try {
    const { body, letters, ring, d } = buildParts(wasm, raw, temps, segs);
    const keepMesh = quality === "export";
    const parts = {
      body: pack(body, "body", keepMesh),
      letters: letters ? pack(letters, "letters", keepMesh) : null,
      ring: pack(ring, "ring", keepMesh),
    };
    const volume = parts.body.volume + (parts.letters?.volume || 0) + parts.ring.volume;
    const tris = parts.body.tris + (parts.letters?.tris || 0) + parts.ring.tris;
    const named = ["body", "letters", "ring"]
      .filter((name) => parts[name]?.mesh)
      .map((name) => ({ name, mesh: parts[name].mesh }));
    return {
      d,
      tagPos: parts.body.positions,
      letterPos: parts.letters?.positions || new Float32Array(),
      ringPos: parts.ring.positions,
      parts,
      volume,
      tris,
      threemf: named.length ? meshesTo3mf(named) : null,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildTagStls(raw) {
  const built = await buildTag(raw, { quality: "export" });
  return built;
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `paddington-tag ${name}`.slice(0, 79);
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
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
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

export function downloadArrayBuffer(filename, buffer, mime = "model/stl") {
  const blob = new Blob([buffer], { type: mime });
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

export function boundsOf(positions) {
  const b = {
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
  };
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = positions[i + k];
      if (v < b.min[k]) b.min[k] = v;
      if (v > b.max[k]) b.max[k] = v;
    }
  }
  return b;
}
