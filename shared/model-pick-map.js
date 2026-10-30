/** Pure helpers for click-to-feature and two-point distance mapping. No DOM, no Three. */

export function faceAxis(normal) {
  if (!normal) return "z";
  const ax = Math.abs(normal.x) || 0;
  const ay = Math.abs(normal.y) || 0;
  const az = Math.abs(normal.z) || 0;
  if (ax >= ay && ax >= az) return "x";
  if (ay >= az) return "y";
  return "z";
}

export function distanceMm(a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const dz = b.z - a.z;
  return Math.hypot(dx, dy, dz);
}

/** Tolerance for "these clicks sit on the two ends of a known length". */
export function defaultTol(span) {
  const s = Math.abs(Number(span) || 0);
  if (s < 3) return Math.max(0.35, s * 0.45);
  if (s < 8) return Math.max(0.8, s * 0.22);
  // A click lands on the face, a little off the exact edge. Keep small
  // dimensions tight and give longer ones a couple of millimetres.
  return Math.min(8, Math.max(2.4, s * 0.12));
}

export function insideBox(point, min, max, pad = 0) {
  return (
    point.x >= min[0] - pad &&
    point.x <= max[0] + pad &&
    point.y >= min[1] - pad &&
    point.y <= max[1] + pad &&
    point.z >= min[2] - pad &&
    point.z <= max[2] + pad
  );
}

function boxVolume(min, max) {
  return (
    Math.max(0, max[0] - min[0]) * Math.max(0, max[1] - min[1]) * Math.max(0, max[2] - min[2])
  );
}

function smallest(list) {
  let best = null;
  let vol = Infinity;
  for (const f of list) {
    const v = boxVolume(f.min, f.max);
    if (v < vol) {
      vol = v;
      best = f;
    }
  }
  return best;
}

/** Smallest feature box for this part that contains the point. Exact fit wins over a padded one. */
export function featureAt(point, features, partId) {
  const list = (features || []).filter((f) => !f.part || !partId || f.part === partId);
  const exact = smallest(list.filter((f) => insideBox(point, f.min, f.max, 0)));
  if (exact) return exact;
  return smallest(list.filter((f) => insideBox(point, f.min, f.max, f.pad ?? 1.25)));
}

function partsOk(m, a, b) {
  if (!m.parts || !m.parts.length) return true;
  if (m.pair) {
    const got = [a.partId, b.partId];
    return (
      (got[0] === m.parts[0] && got[1] === m.parts[1]) ||
      (got[0] === m.parts[1] && got[1] === m.parts[0])
    );
  }
  return m.parts.includes(a.partId) && m.parts.includes(b.partId);
}

/**
 * Which registered measurements the two clicks actually span.
 * A hit means both points sit on that measurement's two ends (or, for kind
 * "chord", the straight-line distance equals the known value).
 */
export function measurementsForSpan(a, b, measurements) {
  const distance = distanceMm(a.point, b.point);
  const hits = [];
  for (const m of measurements || []) {
    if (!partsOk(m, a, b)) continue;
    if (m.when && !m.when(a, b, distance)) continue;
    if (m.kind === "chord") {
      const tol = m.tol ?? defaultTol(m.value);
      if (Math.abs(distance - Number(m.value)) <= tol) hits.push(m);
      continue;
    }
    if (!m.axis) continue;
    const pa = a.point[m.axis];
    const pb = b.point[m.axis];
    const lo = Math.min(pa, pb);
    const hi = Math.max(pa, pb);
    const e0 = Math.min(m.end0, m.end1);
    const e1 = Math.max(m.end0, m.end1);
    const tol = m.tol ?? defaultTol(e1 - e0);
    if (Math.abs(lo - e0) <= tol && Math.abs(hi - e1) <= tol) hits.push(m);
  }
  return { distance, hits };
}

export function unionParams(hits) {
  const out = [];
  for (const h of hits || []) {
    for (const key of h.params || []) {
      if (!out.includes(key)) out.push(key);
    }
  }
  return out;
}

export function describeMeasurements(hits) {
  if (!hits?.length) {
    return {
      title: "Between the two clicks",
      detail: "No slider sets this distance.",
      params: [],
    };
  }
  const params = unionParams(hits);
  const bits = hits.map((h) => {
    const n = Number(h.named);
    return Number.isFinite(n) ? `${h.title} (${n.toFixed(1)} mm)` : h.title;
  });
  return {
    title: hits.map((h) => h.title).join(" · "),
    detail: params.length ? bits.join(" · ") : `${bits.join(" · ")}. No slider sets this distance.`,
    params,
  };
}
