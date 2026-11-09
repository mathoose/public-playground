// Friction-fit stand for the 77 cm Giant Candy Cane (MakerWorld 876637).
//
// Measured from the public plate meshes (millimeters, mesh cross-section):
// - Shaft OD 105.0 mm. On the "77 cm lang" profile the tube lies in the XY
//   plane, so the outer diameter is the Z span of the cylindrical body.
//   Ten of eleven segments span 104.997–105.011 mm, vertices at ±52.50 mm.
//   The 110 cm profile is the same model at 110/77 scale and spans 150.00 mm.
// - Original stand (MakerWorld 3432714) socket ID 94.86 mm. Horizontal slices
//   from 15 mm to 80 mm height fit a circle of radius 47.43 mm (RMS 0.36 mm).
//   The section is slightly oval, 93.8 mm × 95.9 mm, the same ~2% stretch as
//   the foot. Straight socket wall is 4.64 mm (outer radius 52.07 mm).
//   Foot is about 186 mm across and 14 mm thick; overall height 85 mm.
//
// This stand keeps that foot, wall, and height. The bore is a round friction
// fit: shaft OD plus a diametral clearance (default 0.4 mm → 105.4 mm).

export const APP_NAME = "Candy cane stand";
export const APP_VERSION = "v1 · Nov 9, 2026";
export const APP_VERSION_TAG = "v1";

export const SHAFT_OD = 105.0;
export const ORIGINAL_HOLE_ID = 94.86;
export const ORIGINAL_HOLE_NARROW = 93.8;
export const ORIGINAL_HOLE_WIDE = 95.9;
export const HEIGHT = 85;
export const FOOT_TOP = 14;

export const DEFAULT_PARAMS = {
  clearance: 0.4,
  wall: 4.6,
  depth: 70,
};

export const SLIDERS = [
  { key: "clearance", min: 0.2, max: 1.2, step: 0.05, unit: "mm" },
  { key: "wall", min: 3.2, max: 8, step: 0.1, unit: "mm" },
  { key: "depth", min: 50, max: 76, step: 1, unit: "mm" },
];

const FOOT = [
  [0, 93],
  [4, 92.5],
  [8, 91.1],
  [11, 89.5],
  [13, 87.3],
  [14, 85],
];

function snap(n, min, max, step) {
  const clamped = Math.min(max, Math.max(min, n));
  const steps = Math.round((clamped - min) / step);
  return Math.round((min + steps * step) * 1000) / 1000;
}

export function mergeParams(raw) {
  const source = raw && typeof raw === "object" ? raw : {};
  const params = { ...DEFAULT_PARAMS };
  for (const spec of SLIDERS) {
    const n = Number(source[spec.key]);
    params[spec.key] = snap(Number.isFinite(n) ? n : DEFAULT_PARAMS[spec.key], spec.min, spec.max, spec.step);
  }
  return params;
}

export function derive(raw) {
  const p = mergeParams(raw);
  const holeId = Math.round((SHAFT_OD + p.clearance) * 100) / 100;
  const innerR = holeId / 2;
  const socketR = innerR + p.wall;
  const floorZ = Math.round((HEIGHT - p.depth) * 10) / 10;
  const footDiameter = FOOT[0][1] * 2;
  return {
    p,
    holeId,
    innerR,
    socketR,
    floorZ,
    height: HEIGHT,
    footDiameter,
    shaftOd: SHAFT_OD,
    originalHoleId: ORIGINAL_HOLE_ID,
  };
}

export function formatMm(n, digits = 1) {
  return `${Number(n).toFixed(digits)} mm`;
}

export function warnings(raw) {
  const d = derive(raw);
  const notes = [];
  if (d.socketR + 9 > 82) {
    notes.push("The socket wall is close to the edge of the foot. Lower the wall or the clearance.");
  }
  if (d.floorZ < 8) {
    notes.push("The floor is under 8 mm. A tall cane wants more plastic under the bore.");
  }
  return notes;
}

function dedupe(points) {
  const out = [];
  for (const point of points) {
    const prev = out[out.length - 1];
    if (prev && Math.abs(prev.z - point.z) < 0.02 && Math.abs(prev.r - point.r) < 0.02) continue;
    out.push(point);
  }
  return out;
}

function lerpFoot(z) {
  if (z <= FOOT[0][0]) return FOOT[0][1];
  for (let i = 1; i < FOOT.length; i += 1) {
    if (z <= FOOT[i][0]) {
      const [z0, r0] = FOOT[i - 1];
      const [z1, r1] = FOOT[i];
      return r0 + ((r1 - r0) * (z - z0)) / (z1 - z0);
    }
  }
  return FOOT[FOOT.length - 1][1];
}

function outerProfile(d) {
  const points = [];
  for (let z = 0; z <= FOOT_TOP; z += 1) points.push({ z, r: lerpFoot(z) });
  const heights = [];
  for (let z = FOOT_TOP; z <= 28; z += 1) heights.push(z);
  for (let z = 32; z <= 72; z += 4) heights.push(z);
  for (let z = 74; z <= HEIGHT; z += 1) heights.push(z);
  for (const z of heights) {
    let extra = 0;
    if (z <= 28) {
      const t = (z - FOOT_TOP) / (28 - FOOT_TOP);
      extra = 9 * Math.pow(Math.max(0, 1 - t), 2.4);
    }
    let lip = 0;
    if (z > 74) {
      const t = Math.min(1, (z - 74) / (HEIGHT - 74));
      lip = -2.4 * t * t;
    }
    const mouth = innerRadiusAt(d, z);
    const r = Math.max(d.socketR + extra + lip, mouth + 1.2);
    points.push({ z, r });
  }
  return dedupe(points);
}

function innerRadiusAt(d, z) {
  const start = HEIGHT - 2;
  if (z <= start) return d.innerR;
  const t = Math.min(1, (z - start) / 2);
  return d.innerR + t;
}

function innerProfile(d) {
  const points = [{ z: HEIGHT, r: innerRadiusAt(d, HEIGHT) }];
  points.push({ z: HEIGHT - 2, r: d.innerR });
  for (let z = HEIGHT - 2 - 16; z > d.floorZ + 4; z -= 16) {
    points.push({ z, r: d.innerR });
  }
  points.push({ z: d.floorZ, r: d.innerR });
  return dedupe(points);
}

export function buildStandMesh(raw, segments = 96) {
  const d = derive(raw);
  const outer = outerProfile(d);
  const inner = innerProfile(d);
  const positions = [];
  const addRing = (r, z) => {
    const start = positions.length / 3;
    for (let i = 0; i < segments; i += 1) {
      const angle = (i / segments) * Math.PI * 2;
      positions.push(r * Math.cos(angle), r * Math.sin(angle), z);
    }
    return start;
  };
  const outerStarts = outer.map((point) => addRing(point.r, point.z));
  const innerStarts = inner.map((point) => addRing(point.r, point.z));
  const bottomCenter = positions.length / 3;
  positions.push(0, 0, outer[0].z);
  const floorCenter = positions.length / 3;
  positions.push(0, 0, inner[inner.length - 1].z);

  const indices = [];
  const tri = (a, b, c) => indices.push(a, b, c);
  const connect = (startA, startB) => {
    for (let i = 0; i < segments; i += 1) {
      const next = (i + 1) % segments;
      tri(startA + i, startA + next, startB + next);
      tri(startA + i, startB + next, startB + i);
    }
  };

  for (let i = 0; i < segments; i += 1) {
    const next = (i + 1) % segments;
    tri(bottomCenter, outerStarts[0] + next, outerStarts[0] + i);
  }
  for (let k = 0; k < outerStarts.length - 1; k += 1) connect(outerStarts[k], outerStarts[k + 1]);
  connect(outerStarts[outerStarts.length - 1], innerStarts[0]);
  for (let k = 0; k < innerStarts.length - 1; k += 1) connect(innerStarts[k], innerStarts[k + 1]);
  const floorRing = innerStarts[innerStarts.length - 1];
  for (let i = 0; i < segments; i += 1) {
    const next = (i + 1) % segments;
    tri(floorCenter, floorRing + i, floorRing + next);
  }

  return {
    positions: Float32Array.from(positions),
    indices: Uint32Array.from(indices),
    d,
    segments,
  };
}

export function meshToStl(mesh) {
  const { positions, indices } = mesh;
  const triangles = indices.length / 3;
  const buffer = new ArrayBuffer(84 + triangles * 50);
  const view = new DataView(buffer);
  const header = "candy cane stand 77cm friction fit";
  for (let i = 0; i < header.length && i < 80; i += 1) view.setUint8(i, header.charCodeAt(i));
  view.setUint32(80, triangles, true);
  let offset = 84;
  for (let t = 0; t < triangles; t += 1) {
    const ia = indices[t * 3] * 3;
    const ib = indices[t * 3 + 1] * 3;
    const ic = indices[t * 3 + 2] * 3;
    const ax = positions[ia];
    const ay = positions[ia + 1];
    const az = positions[ia + 2];
    const bx = positions[ib];
    const by = positions[ib + 1];
    const bz = positions[ib + 2];
    const cx = positions[ic];
    const cy = positions[ic + 1];
    const cz = positions[ic + 2];
    let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    view.setFloat32(offset, nx, true);
    view.setFloat32(offset + 4, ny, true);
    view.setFloat32(offset + 8, nz, true);
    view.setFloat32(offset + 12, ax, true);
    view.setFloat32(offset + 16, ay, true);
    view.setFloat32(offset + 20, az, true);
    view.setFloat32(offset + 24, bx, true);
    view.setFloat32(offset + 28, by, true);
    view.setFloat32(offset + 32, bz, true);
    view.setFloat32(offset + 36, cx, true);
    view.setFloat32(offset + 40, cy, true);
    view.setFloat32(offset + 44, cz, true);
    view.setUint16(offset + 48, 0, true);
    offset += 50;
  }
  return buffer;
}

export function signedVolume(mesh) {
  const { positions, indices } = mesh;
  let volume = 0;
  for (let t = 0; t < indices.length; t += 3) {
    const ia = indices[t] * 3;
    const ib = indices[t + 1] * 3;
    const ic = indices[t + 2] * 3;
    const ax = positions[ia];
    const ay = positions[ia + 1];
    const az = positions[ia + 2];
    volume +=
      ax * (positions[ib + 1] * positions[ic + 2] - positions[ib + 2] * positions[ic + 1]) +
      ay * (positions[ib + 2] * positions[ic] - positions[ib] * positions[ic + 2]) +
      az * (positions[ib] * positions[ic + 1] - positions[ib + 1] * positions[ic]);
  }
  return volume / 6;
}

export function sliceRadii(mesh, z) {
  const { positions, indices } = mesh;
  const radii = [];
  const seg = (ax, ay, az, bx, by, bz) => {
    if ((az - z) * (bz - z) > 0 || az === bz) return;
    const t = (z - az) / (bz - az);
    if (t < 0 || t > 1) return;
    const x = ax + (bx - ax) * t;
    const y = ay + (by - ay) * t;
    radii.push(Math.hypot(x, y));
  };
  for (let t = 0; t < indices.length; t += 3) {
    const ia = indices[t] * 3;
    const ib = indices[t + 1] * 3;
    const ic = indices[t + 2] * 3;
    const a = [positions[ia], positions[ia + 1], positions[ia + 2]];
    const b = [positions[ib], positions[ib + 1], positions[ib + 2]];
    const c = [positions[ic], positions[ic + 1], positions[ic + 2]];
    seg(...a, ...b);
    seg(...b, ...c);
    seg(...c, ...a);
  }
  radii.sort((p, q) => p - q);
  return radii;
}
