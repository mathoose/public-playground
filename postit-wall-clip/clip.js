/** Browser port of generate.py — same defaults and ribbon mesh. */

export const DEFAULT_PARAMS = Object.freeze({
  width: 20.0,
  thickness: 2.8,
  back_length: 40.0,
  hook_inner_r: 4.0,
  arm_length: 22.0,
  pinch_gap: 0.45,
  pinch_t: 0.52,
  tip_standoff: 7.2,
  tip_angle_deg: 58.0,
  arc_segments: 48,
  end_radius: 0.35,
});

export function mergeParams(overrides = {}) {
  return { ...DEFAULT_PARAMS, ...overrides };
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}
function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}
function mul(a, s) {
  return [a[0] * s, a[1] * s];
}
function len(a) {
  return Math.hypot(a[0], a[1]);
}
function norm(a) {
  const l = len(a);
  if (l < 1e-12) return [0, 0];
  return [a[0] / l, a[1] / l];
}
function rot90(a, sign = 1) {
  return [-sign * a[1], sign * a[0]];
}

function polylineLength(pts) {
  let t = 0;
  for (let i = 0; i < pts.length - 1; i++) t += len(sub(pts[i + 1], pts[i]));
  return t;
}

function resample(pts, spacing) {
  if (pts.length < 2) return pts.slice();
  const total = polylineLength(pts);
  const n = Math.max(2, Math.round(total / spacing));
  const out = [pts[0]];
  let acc = 0;
  let seg = 0;
  for (let k = 1; k < n - 1; k++) {
    const target = (k * total) / (n - 1);
    while (seg < pts.length - 2 && acc + len(sub(pts[seg + 1], pts[seg])) < target) {
      acc += len(sub(pts[seg + 1], pts[seg]));
      seg++;
    }
    const a = pts[seg];
    const b = pts[seg + 1];
    const sl = len(sub(b, a));
    const u = sl < 1e-12 ? 0 : (target - acc) / sl;
    out.push([a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u]);
  }
  out.push(pts[pts.length - 1]);
  return out;
}

function arcPoints(center, radius, a0, a1, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    pts.push([center[0] + radius * Math.cos(a), center[1] + radius * Math.sin(a)]);
  }
  return pts;
}

function cubicBezier(p0, p1, p2, p3, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const u = 1 - t;
    const x =
      u ** 3 * p0[0] + 3 * u ** 2 * t * p1[0] + 3 * u * t ** 2 * p2[0] + t ** 3 * p3[0];
    const y =
      u ** 3 * p0[1] + 3 * u ** 2 * t * p1[1] + 3 * u * t ** 2 * p2[1] + t ** 3 * p3[1];
    pts.push([x, y]);
  }
  return pts;
}

export function centerline(p) {
  const t = p.thickness;
  const rC = p.hook_inner_r + t / 2;
  const yBack = t / 2;
  const cx = rC;
  const cy = yBack + rC;
  const hookJoint = [cx, yBack];
  const backEnd = [p.back_length - t / 2, yBack];
  const nBack = Math.max(8, Math.floor(p.back_length / 0.6));
  const back = [];
  for (let i = 0; i <= nBack; i++) {
    back.push([backEnd[0] - ((backEnd[0] - hookJoint[0]) * i) / nBack, yBack]);
  }

  const hookSweep = Math.PI + (12 * Math.PI) / 180;
  const hook = arcPoints([cx, cy], rC, -Math.PI / 2, -Math.PI / 2 - hookSweep, p.arc_segments);

  const arm0 = hook[hook.length - 1];
  const hookEndAngle = -Math.PI / 2 - hookSweep;
  const tanHook = norm([rC * Math.sin(hookEndAngle), -rC * Math.cos(hookEndAngle)]);

  const yPinch = yBack + t + p.pinch_gap;
  const xPinch = cx + p.arm_length * p.pinch_t;

  const tipAng = (p.tip_angle_deg * Math.PI) / 180;
  const xTip = cx + p.arm_length;
  const yTip = yBack + p.tip_standoff;
  const span = len(sub([xTip, yTip], [xPinch, yPinch]));
  const hHook = p.arm_length * 0.26;
  const hPin = Math.max(3.5, span * 0.38);
  const hTip = Math.max(3.5, span * 0.38);
  const tipDir = [Math.cos(tipAng), Math.sin(tipAng)];

  const s1 = cubicBezier(
    arm0,
    [arm0[0] + tanHook[0] * hHook, arm0[1] + tanHook[1] * hHook],
    [xPinch - hPin, yPinch],
    [xPinch, yPinch],
    p.arc_segments
  );
  const s2 = cubicBezier(
    [xPinch, yPinch],
    [xPinch + hPin, yPinch],
    [xTip - tipDir[0] * hTip, yTip - tipDir[1] * hTip],
    [xTip, yTip],
    p.arc_segments
  );

  const pts = [];
  for (const group of [back, hook, s1, s2]) {
    for (const q of group) {
      if (pts.length && len(sub(q, pts[pts.length - 1])) < 1e-6) continue;
      pts.push(q);
    }
  }
  return resample(pts, 0.28);
}

function tangents(center) {
  const n = center.length;
  const out = [];
  for (let i = 0; i < n; i++) {
    let tng;
    if (i === 0) tng = norm(sub(center[1], center[0]));
    else if (i === n - 1) tng = norm(sub(center[i], center[i - 1]));
    else tng = norm(add(norm(sub(center[i], center[i - 1])), norm(sub(center[i + 1], center[i]))));
    out.push(tng);
  }
  return out;
}

function offsetSides(center, dist) {
  const tngs = tangents(center);
  const left = [];
  const right = [];
  for (let i = 0; i < center.length; i++) {
    const nrm = rot90(tngs[i], 1);
    left.push(add(center[i], mul(nrm, dist)));
    right.push(add(center[i], mul(nrm, -dist)));
  }
  return [left, right];
}

function vz(q, z) {
  return [q[0], q[1], z];
}

function quad(a, b, c, d) {
  return [
    [a, b, c],
    [a, c, d],
  ];
}

export function extrudeRibbon(center, dist, z0, z1) {
  const [left, right] = offsetSides(center, dist);
  const faces = [];
  const n = center.length;
  for (let i = 0; i < n - 1; i++) {
    const l0 = left[i];
    const l1 = left[i + 1];
    const r0 = right[i];
    const r1 = right[i + 1];
    faces.push(...quad(vz(l0, z1), vz(r0, z1), vz(r1, z1), vz(l1, z1)));
    faces.push(...quad(vz(l0, z0), vz(l1, z0), vz(r1, z0), vz(r0, z0)));
    faces.push(...quad(vz(l0, z0), vz(l0, z1), vz(l1, z1), vz(l1, z0)));
    faces.push(...quad(vz(r0, z0), vz(r1, z0), vz(r1, z1), vz(r0, z1)));
  }
  let l = left[0];
  let r = right[0];
  faces.push(...quad(vz(l, z0), vz(r, z0), vz(r, z1), vz(l, z1)));
  l = left[n - 1];
  r = right[n - 1];
  faces.push(...quad(vz(l, z0), vz(l, z1), vz(r, z1), vz(r, z0)));
  return faces;
}

export function meshVolume(faces) {
  let vol = 0;
  for (const [a, b, c] of faces) {
    vol +=
      a[0] * (b[1] * c[2] - b[2] * c[1]) +
      a[1] * (b[2] * c[0] - b[0] * c[2]) +
      a[2] * (b[0] * c[1] - b[1] * c[0]);
  }
  return vol / 6;
}

export function meshBbox(faces) {
  let min = [Infinity, Infinity, Infinity];
  let max = [-Infinity, -Infinity, -Infinity];
  for (const tri of faces) {
    for (const v of tri) {
      for (let i = 0; i < 3; i++) {
        if (v[i] < min[i]) min[i] = v[i];
        if (v[i] > max[i]) max[i] = v[i];
      }
    }
  }
  return {
    min,
    max,
    size: [max[0] - min[0], max[1] - min[1], max[2] - min[2]],
  };
}

export function meshFor(overrides = {}) {
  const p = mergeParams(overrides);
  const cl = centerline(p);
  const z0 = -p.width / 2;
  const z1 = p.width / 2;
  const faces = extrudeRibbon(cl, p.thickness / 2, z0, z1);
  return { params: p, faces, volume: meshVolume(faces), bbox: meshBbox(faces) };
}

function triNormal(tri) {
  const [a, b, c] = tri;
  const ux = b[0] - a[0],
    uy = b[1] - a[1],
    uz = b[2] - a[2];
  const vx = c[0] - a[0],
    vy = c[1] - a[1],
    vzv = c[2] - a[2];
  let nx = uy * vzv - uz * vy;
  let ny = uz * vx - ux * vzv;
  let nz = ux * vy - uy * vx;
  const l = Math.hypot(nx, ny, nz) || 1;
  return [nx / l, ny / l, nz / l];
}

export function stlBytes(faces, name = "postit_clip") {
  const buf = new ArrayBuffer(80 + 4 + faces.length * 50);
  const view = new DataView(buf);
  const header = new TextEncoder().encode(name);
  for (let i = 0; i < Math.min(80, header.length); i++) view.setUint8(i, header[i]);
  view.setUint32(80, faces.length, true);
  let o = 84;
  for (const tri of faces) {
    const n = triNormal(tri);
    view.setFloat32(o, n[0], true);
    view.setFloat32(o + 4, n[1], true);
    view.setFloat32(o + 8, n[2], true);
    o += 12;
    for (const v of tri) {
      view.setFloat32(o, v[0], true);
      view.setFloat32(o + 4, v[1], true);
      view.setFloat32(o + 8, v[2], true);
      o += 12;
    }
    view.setUint16(o, 0, true);
    o += 2;
  }
  return buf;
}

export function facesToPositions(faces) {
  const pos = new Float32Array(faces.length * 9);
  let i = 0;
  for (const tri of faces) {
    for (const v of tri) {
      pos[i++] = v[0];
      pos[i++] = v[1];
      pos[i++] = v[2];
    }
  }
  return pos;
}
