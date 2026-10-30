/** Face-to-face distance and a dimension line that sits outside the part. */

function hypot3(x, y, z) {
  return Math.hypot(x, y, z);
}

function sub(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function add(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function scale(a, s) {
  return [a[0] * s, a[1] * s, a[2] * s];
}

function dot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function unit(v) {
  const n = hypot3(v[0], v[1], v[2]);
  if (n < 1e-9) return [0, 0, 1];
  return [v[0] / n, v[1] / n, v[2] / n];
}

function asPoint(p) {
  return [p.x, p.y, p.z];
}

export function faceGap(a, b) {
  const pa = asPoint(a.point);
  const pb = asPoint(b.point);
  const delta = sub(pb, pa);
  const straight = hypot3(delta[0], delta[1], delta[2]);
  const na = unit(asPoint(a.normal));
  const nb = unit(asPoint(b.normal));
  const parallel = Math.abs(dot(na, nb)) >= 0.85;
  const face = Math.abs(dot(na, delta));
  return {
    straight,
    face,
    parallel,
    primary: parallel ? face : straight,
  };
}

function pointInside(p, min, max) {
  return (
    p[0] >= min[0] &&
    p[0] <= max[0] &&
    p[1] >= min[1] &&
    p[1] <= max[1] &&
    p[2] >= min[2] &&
    p[2] <= max[2]
  );
}

/** True when the segment from a to b meets the box, including a little padding. */
export function segmentHitsAabb(a, b, min, max, pad = 0) {
  const mn = [min[0] - pad, min[1] - pad, min[2] - pad];
  const mx = [max[0] + pad, max[1] + pad, max[2] + pad];
  const d = sub(b, a);
  let t0 = 0;
  let t1 = 1;
  for (let i = 0; i < 3; i++) {
    if (Math.abs(d[i]) < 1e-9) {
      if (a[i] < mn[i] || a[i] > mx[i]) return false;
      continue;
    }
    let tNear = (mn[i] - a[i]) / d[i];
    let tFar = (mx[i] - a[i]) / d[i];
    if (tNear > tFar) {
      const swap = tNear;
      tNear = tFar;
      tFar = swap;
    }
    t0 = Math.max(t0, tNear);
    t1 = Math.min(t1, tFar);
    if (t0 > t1) return false;
  }
  return true;
}

/**
 * Shift both face points sideways until the dimension line is outside the box.
 * Witness lines still run from the faces out to that line.
 */
export function calloutShift(pointA, pointB, boxMin, boxMax, gap = 6) {
  const a = asPoint(pointA);
  const b = asPoint(pointB);
  const mid = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  const center = [
    (boxMin[0] + boxMax[0]) / 2,
    (boxMin[1] + boxMax[1]) / 2,
    (boxMin[2] + boxMax[2]) / 2,
  ];
  const span = unit(sub(b, a));
  let raw = sub(mid, center);
  const along = dot(raw, span);
  let side = sub(raw, scale(span, along));
  if (hypot3(side[0], side[1], side[2]) < 1e-3) {
    const axes = [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ];
    let best = axes[0];
    let bestDot = 2;
    for (const axis of axes) {
      const d = Math.abs(dot(axis, span));
      if (d < bestDot) {
        bestDot = d;
        best = axis;
      }
    }
    side = best;
  }
  const sideN = unit(side);
  const longest = Math.max(
    boxMax[0] - boxMin[0],
    boxMax[1] - boxMin[1],
    boxMax[2] - boxMin[2],
    gap
  );
  let dist = gap;
  let shift = scale(sideN, dist);
  for (let i = 0; i < 28; i++) {
    shift = scale(sideN, dist);
    const endA = add(a, shift);
    const endB = add(b, shift);
    const clear =
      !pointInside(endA, boxMin, boxMax) &&
      !pointInside(endB, boxMin, boxMax) &&
      !segmentHitsAabb(endA, endB, boxMin, boxMax, 2.2);
    if (clear) return { shift, endA, endB };
    dist += Math.max(2, longest / 7);
  }
  return { shift, endA: add(a, shift), endB: add(b, shift) };
}
