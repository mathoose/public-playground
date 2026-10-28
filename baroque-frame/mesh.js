import frameGz from "./frame.bin.gz";
import { mapVertex } from "./geometry.js";
import { subdivideLongEdges } from "./subdivide.js";
import { meshesTo3mf } from "./threemf.js";

const MAGIC = 0x31465242;

export async function loadFrameMesh() {
  const stream = new Blob([frameGz]).stream().pipeThrough(new DecompressionStream("gzip"));
  const buf = await new Response(stream).arrayBuffer();
  const view = new DataView(buf);
  const magic = view.getUint32(0, true);
  if (magic !== MAGIC) throw new Error("frame mesh header");
  const vertCount = view.getUint32(4, true);
  const triCount = view.getUint32(8, true);
  const pos = new Float32Array(buf, 12, vertCount * 3);
  const idx = new Uint32Array(buf, 12 + vertCount * 12, triCount * 3);
  // The sculpture's front face is triangulated with a few very long edges.
  // A straight edge that jumps from the side rail to the top rail shears into
  // a spike once width and height move those rails by different amounts.
  // Splitting those edges keeps the corner on the moulding.
  return subdivideLongEdges(pos, idx, 2.5);
}

export function applyFrame(mesh, params) {
  const src = mesh.pos;
  const out = new Float32Array(src.length);
  for (let i = 0; i < src.length; i += 3) {
    const [x, y, z] = mapVertex(src[i], src[i + 1], src[i + 2], params);
    out[i] = x;
    out[i + 1] = y;
    out[i + 2] = z;
  }
  return out;
}

export function positionsForPreview(mapped, idx) {
  const pos = new Float32Array(idx.length * 3);
  for (let t = 0; t < idx.length; t++) {
    const v = idx[t] * 3;
    pos[t * 3] = mapped[v];
    pos[t * 3 + 1] = mapped[v + 1];
    pos[t * 3 + 2] = mapped[v + 2];
  }
  return pos;
}

export function meshToStl(mapped, idx) {
  const triCount = idx.length / 3;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  const label = "baroque-frame";
  for (let i = 0; i < label.length; i++) view.setUint8(i, label.charCodeAt(i));
  view.setUint32(80, triCount, true);
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const a = idx[t * 3] * 3;
    const b = idx[t * 3 + 1] * 3;
    const c = idx[t * 3 + 2] * 3;
    const ax = mapped[a], ay = mapped[a + 1], az = mapped[a + 2];
    const bx = mapped[b], by = mapped[b + 1], bz = mapped[b + 2];
    const cx = mapped[c], cy = mapped[c + 1], cz = mapped[c + 2];
    let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
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

export function meshTo3mf(mapped, idx) {
  return meshesTo3mf([
    {
      name: "frame",
      mesh: {
        numProp: 3,
        vertProperties: mapped,
        triVerts: idx,
      },
    },
  ]);
}

export function boundsOf(mapped) {
  const b = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let i = 0; i < mapped.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = mapped[i + k];
      if (v < b.min[k]) b.min[k] = v;
      if (v > b.max[k]) b.max[k] = v;
    }
  }
  return b;
}
