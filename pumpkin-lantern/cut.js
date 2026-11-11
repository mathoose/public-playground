/** Mesh load, boolean cut, and binary STL. The lantern mesh is never written to disk here. */
import { unzipSync } from "fflate";
import { planCut } from "./geometry.js";

const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";

let wasmPromise = null;

export function loadManifold() {
  if (!wasmPromise) {
    const spec = typeof window !== "undefined" ? MANIFOLD_JS : "manifold-3d";
    wasmPromise = import(/* @vite-ignore */ spec)
      .then((mod) => {
        const Module = mod.default || mod;
        const inBrowser = typeof window !== "undefined";
        return Module(
          inBrowser ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) } : {},
        );
      })
      .then((wasm) => {
        wasm.setup();
        return wasm;
      });
  }
  return wasmPromise;
}

function parseModelXml(xml) {
  const verts = [];
  const vertRe = /x="([^"]+)"\s+y="([^"]+)"\s+z="([^"]+)"/g;
  let m;
  while ((m = vertRe.exec(xml))) {
    verts.push(Number(m[1]), Number(m[2]), Number(m[3]));
  }
  const idx = [];
  const triRe = /v1="(\d+)"\s+v2="(\d+)"\s+v3="(\d+)"/g;
  while ((m = triRe.exec(xml))) {
    idx.push(Number(m[1]), Number(m[2]), Number(m[3]));
  }
  return {
    positions: Float32Array.from(verts),
    indices: Uint32Array.from(idx),
  };
}

export function parse3mf(buffer) {
  const files = unzipSync(new Uint8Array(buffer));
  let best = null;
  for (const [name, data] of Object.entries(files)) {
    if (!/\.model$/i.test(name)) continue;
    const xml = new TextDecoder().decode(data);
    if (!xml.includes("<mesh")) continue;
    const mesh = parseModelXml(xml);
    if (!best || mesh.indices.length > best.indices.length) best = mesh;
  }
  if (!best || best.indices.length < 3) throw new Error("That 3MF has no mesh.");
  return best;
}

export function parseStl(buffer) {
  const bytes = new Uint8Array(buffer);
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const head = String.fromCharCode(bytes[0], bytes[1], bytes[2], bytes[3], bytes[4]);
  const triCount = bytes.byteLength >= 84 ? dv.getUint32(80, true) : 0;
  const binarySized = bytes.byteLength === 84 + triCount * 50;
  if (head === "solid" && !binarySized) return parseAsciiStl(bytes);
  if (!binarySized) throw new Error("That STL could not be read.");
  const positions = new Float32Array(triCount * 9);
  const indices = new Uint32Array(triCount * 3);
  let o = 84;
  for (let t = 0; t < triCount; t += 1) {
    o += 12;
    for (let k = 0; k < 3; k += 1) {
      const vi = t * 3 + k;
      indices[vi] = vi;
      positions[vi * 3] = dv.getFloat32(o, true);
      positions[vi * 3 + 1] = dv.getFloat32(o + 4, true);
      positions[vi * 3 + 2] = dv.getFloat32(o + 8, true);
      o += 12;
    }
    o += 2;
  }
  return { positions, indices };
}

function parseAsciiStl(bytes) {
  const text = new TextDecoder().decode(bytes);
  const verts = [];
  const idx = [];
  const re = /vertex\s+([^\s]+)\s+([^\s]+)\s+([^\s]+)/g;
  let m;
  let n = 0;
  while ((m = re.exec(text))) {
    verts.push(Number(m[1]), Number(m[2]), Number(m[3]));
    idx.push(n);
    n += 1;
  }
  if (n < 3) throw new Error("That STL has no triangles.");
  return { positions: Float32Array.from(verts), indices: Uint32Array.from(idx) };
}

export function parseMeshFile(buffer, name = "") {
  const bytes = new Uint8Array(buffer);
  const zip = bytes[0] === 0x50 && bytes[1] === 0x4b;
  if (zip || /\.3mf$/i.test(name)) return parse3mf(buffer);
  return parseStl(buffer);
}

function dispose(items) {
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

/**
 * Widen or shrink the bottom opening to the LED disc and cut one round cord hole.
 * Returns a copy of the mesh arrays. Caller keeps the source.
 */
export async function applyCut(positions, indices, params, seat) {
  const wasm = await loadManifold();
  const { Manifold } = wasm;
  const plan = planCut(params, seat);
  const temps = [];
  const keep = (item) => {
    temps.push(item);
    return item;
  };
  try {
    let solid = keep(
      Manifold.ofMesh(
        new wasm.Mesh({
          numProp: 3,
          vertProperties: positions,
          triVerts: indices,
        }),
      ),
    );
    if (solid.status() !== "NoError") {
      throw new Error("This mesh is not a closed solid, so it cannot be cut.");
    }
    if (plan.mode === "enlarge") {
      const height = plan.boreTop - plan.boreBottom;
      const bore = keep(
        Manifold.cylinder(height, plan.openingR, plan.openingR, 96).translate(seat.cx, seat.cy, plan.boreBottom),
      );
      solid = keep(solid.subtract(bore));
    } else if (plan.mode === "shrink") {
      const height = plan.seatHeight + 0.2;
      const outer = keep(
        Manifold.cylinder(height, seat.seatRadius + 0.25, seat.seatRadius + 0.25, 96).translate(
          seat.cx,
          seat.cy,
          seat.zMin,
        ),
      );
      const inner = keep(
        Manifold.cylinder(height + 2, plan.openingR, plan.openingR, 96).translate(seat.cx, seat.cy, seat.zMin - 1),
      );
      const ring = keep(outer.subtract(inner));
      solid = keep(solid.add(ring));
    }
    if (plan.cordR > 0.2) {
      const cord = keep(
        Manifold.cylinder(plan.reach, plan.cordR, plan.cordR, 64)
          .rotate(0, 90, plan.p.cordAngle)
          .translate(seat.cx, seat.cy, plan.cordZ),
      );
      solid = keep(solid.subtract(cord));
    }
    if (solid.status() !== "NoError") {
      throw new Error(`The cut did not make a solid (${solid.status()}).`);
    }
    const parts = solid.decompose().map(keep);
    parts.sort((a, b) => b.volume() - a.volume());
    const main = parts[0];
    if (!main || main.volume() < 1) throw new Error("The cut removed the lantern.");
    const chips = parts.slice(1).filter((part) => part.volume() > 5).length;
    const mesh = main.getMesh();
    const prop = mesh.numProp || 3;
    const srcVerts = mesh.vertProperties;
    const vertCount = srcVerts.length / prop;
    const packed = new Float32Array(vertCount * 3);
    for (let i = 0; i < vertCount; i += 1) {
      packed[i * 3] = srcVerts[i * prop];
      packed[i * 3 + 1] = srcVerts[i * prop + 1];
      packed[i * 3 + 2] = srcVerts[i * prop + 2];
    }
    return {
      positions: packed,
      indices: Uint32Array.from(mesh.triVerts),
      volume: main.volume(),
      genus: main.genus(),
      plan,
      chips,
    };
  } finally {
    dispose(temps);
  }
}

export function stlFromIndexed(positions, indices) {
  const nt = indices.length / 3;
  const buf = new ArrayBuffer(84 + nt * 50);
  const dv = new DataView(buf);
  const header = "pumpkin lantern led opening";
  for (let i = 0; i < header.length; i += 1) dv.setUint8(i, header.charCodeAt(i));
  dv.setUint32(80, nt, true);
  let o = 84;
  for (let t = 0; t < nt; t += 1) {
    const a = indices[t * 3] * 3;
    const b = indices[t * 3 + 1] * 3;
    const c = indices[t * 3 + 2] * 3;
    const ux = positions[b] - positions[a];
    const uy = positions[b + 1] - positions[a + 1];
    const uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a];
    const vy = positions[c + 1] - positions[a + 1];
    const vz = positions[c + 2] - positions[a + 2];
    let nx = uy * vz - uz * vy;
    let ny = uz * vx - ux * vz;
    let nz = ux * vy - uy * vx;
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    dv.setFloat32(o, nx, true);
    dv.setFloat32(o + 4, ny, true);
    dv.setFloat32(o + 8, nz, true);
    o += 12;
    for (const k of [a, b, c]) {
      dv.setFloat32(o, positions[k], true);
      dv.setFloat32(o + 4, positions[k + 1], true);
      dv.setFloat32(o + 8, positions[k + 2], true);
      o += 12;
    }
    o += 2;
  }
  return buf;
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
