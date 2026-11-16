/**
 * Closed squiggle photo frame.
 *
 * The centerline is a star-shaped blob: an ellipse around the photo plus a few
 * big smooth lobes, like a thick marker squiggle. It cannot cross itself. A round tube with a
 * flat back is swept along that loop. Snap clips are spaced around the back,
 * on the outside of the opening, and pinch the photo border. Stand mode adds
 * two holes in that flat back for pegs.
 */

export const APP_NAME = "Squiggle frame";
export const APP_VERSION = "2 · Nov 16, 2026";
export const APP_VERSION_TAG = "v2";

export const DEFAULT_PARAMS = {
  units: "in",
  photoW: 4,
  photoH: 6,
  tube: 14,
  mode: "wall",
  seed: 7,
};

const MM_PER_IN = 25.4;

export function toMm(value, units) {
  return units === "mm" ? value : value * MM_PER_IN;
}

export function fromMm(value, units) {
  return units === "mm" ? value : value / MM_PER_IN;
}

function clamp(lo, hi, v) {
  return Math.min(hi, Math.max(lo, v));
}

function mulberry32(seed) {
  let a = seed >>> 0;
  return function rand() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function mergeParams(raw = {}) {
  const units = raw.units === "mm" ? "mm" : "in";
  const mode = raw.mode === "stand" ? "stand" : "wall";
  const photoMin = units === "mm" ? 20 : 0.8;
  const photoMax = units === "mm" ? 400 : 16;
  let seed = Math.round(Number(raw.seed));
  if (!Number.isFinite(seed) || seed < 1) seed = DEFAULT_PARAMS.seed;
  return {
    units,
    photoW: clamp(photoMin, photoMax, Number(raw.photoW) || DEFAULT_PARAMS.photoW),
    photoH: clamp(photoMin, photoMax, Number(raw.photoH) || DEFAULT_PARAMS.photoH),
    tube: clamp(8, 20, Number(raw.tube) || DEFAULT_PARAMS.tube),
    mode,
    seed: seed % 1000000000,
  };
}

/** Distance from the origin to the photo edge along a ray. */
export function photoRadius(theta, halfW, halfH) {
  const c = Math.abs(Math.cos(theta));
  const s = Math.abs(Math.sin(theta));
  const rw = c < 1e-8 ? Infinity : halfW / c;
  const rh = s < 1e-8 ? Infinity : halfH / s;
  return Math.min(rw, rh);
}

function rawWave(theta, harmonics) {
  let w = 0;
  for (const h of harmonics) w += h.weight * Math.sin(h.n * theta + h.phase);
  return w;
}

/** Several fat lobes, scaled so the deepest one actually reaches full size. */
export function waveHarmonics(seed) {
  const rnd = mulberry32(seed || 1);
  const primaries = [5, 5, 6, 6, 6];
  const primary = primaries[Math.floor(rnd() * primaries.length)];
  const lows = [3, 4];
  const highs = [4, 5, 7, 8].filter((n) => n !== primary);
  for (let k = highs.length - 1; k > 0; k--) {
    const j = Math.floor(rnd() * (k + 1));
    [highs[k], highs[j]] = [highs[j], highs[k]];
  }
  const harmonics = [
    { n: primary, phase: rnd() * Math.PI * 2, weight: 1 },
    { n: lows[Math.floor(rnd() * lows.length)], phase: rnd() * Math.PI * 2, weight: 0.08 + rnd() * 0.08 },
    { n: highs[0], phase: rnd() * Math.PI * 2, weight: 0.06 + rnd() * 0.08 },
  ];
  let peak = 1e-6;
  for (let i = 0; i < 480; i++) {
    peak = Math.max(peak, Math.abs(rawWave((i / 480) * Math.PI * 2, harmonics)));
  }
  return harmonics.map((h) => ({ ...h, weight: h.weight / peak }));
}

function waveAt(theta, harmonics) {
  return rawWave(theta, harmonics);
}

/** Polar radius of an ellipse. Smooth, so the squiggle is not a rectangle. */
function ellipseRadius(theta, rx, ry) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const denom = Math.hypot(ry * c, rx * s);
  return denom < 1e-8 ? Math.max(rx, ry) : (rx * ry) / denom;
}

/**
 * Round tube, flat on the bed. The center sits high enough that the sides
 * meet the bed at about 45°, so the dome prints without support.
 */
export function tubeSection(radius) {
  const R = radius;
  const zc = 0.72 * R;
  const psi0 = Math.acos(clamp(-1, 1, -zc / R));
  return { R, zc, psi0, height: zc + R };
}

export function profilePoints(radius, steps) {
  const { R, zc, psi0 } = tubeSection(radius);
  const pts = [];
  for (let i = 0; i <= steps; i++) {
    const psi = -psi0 + (2 * psi0 * i) / steps;
    pts.push({ u: R * Math.sin(psi), z: zc + R * Math.cos(psi) });
  }
  pts[0].z = 0;
  pts[pts.length - 1].z = 0;
  return pts;
}

function sampleCenterline(count, halfW, halfH, R, harmonics, ampScale) {
  // Offset the ellipse along its outward normal. Lobes bulge sideways off the
  // photo instead of shooting out as radial spikes, and valleys stay close in.
  const amp = Math.min(halfW, halfH) * 0.62 * ampScale;
  const pts = [];
  for (let i = 0; i < count; i++) {
    const t = (i / count) * Math.PI * 2;
    const ex = halfW * Math.cos(t);
    const ey = halfH * Math.sin(t);
    let nx = halfH * Math.cos(t);
    let ny = halfW * Math.sin(t);
    const nlen = Math.hypot(nx, ny) || 1;
    nx /= nlen;
    ny /= nlen;
    const wave = waveAt(t, harmonics);
    const offset = amp * (0.42 + 0.58 * wave) + R * 0.55;
    const x = ex + nx * offset;
    const y = ey + ny * offset;
    const theta = Math.atan2(y, x);
    const radius = Math.hypot(x, y);
    pts.push({
      x,
      y,
      theta,
      radius,
      edge: photoRadius(theta, halfW, halfH),
    });
  }
  return pts;
}

function tangentAt(points, i) {
  const n = points.length;
  const prev = points[(i - 1 + n) % n];
  const next = points[(i + 1) % n];
  let tx = next.x - prev.x;
  let ty = next.y - prev.y;
  const len = Math.hypot(tx, ty) || 1;
  tx /= len;
  ty /= len;
  return { x: tx, y: ty };
}

function framePoints(points) {
  let prev = null;
  return points.map((p, i) => {
    const t = tangentAt(points, i);
    let ox = t.y;
    let oy = -t.x;
    if (prev && ox * prev.x + oy * prev.y < 0) {
      ox = -ox;
      oy = -oy;
    }
    if (!prev && ox * p.x + oy * p.y < 0) {
      ox = -ox;
      oy = -oy;
    }
    const frame = { tx: t.x, ty: t.y, ox, oy };
    prev = frame;
    return { ...p, ...frame };
  });
}

function minSeparation(points) {
  const n = points.length;
  let worst = Infinity;
  // Nearby samples belong to the same bend. Only a pinch across the loop counts.
  const skip = Math.max(8, Math.round(n * 0.12));
  for (let i = 0; i < n; i++) {
    for (let j = i + skip + 1; j < n; j++) {
      const steps = Math.min(j - i, n - (j - i));
      if (steps <= skip) continue;
      const d = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
      if (d < worst) worst = d;
    }
  }
  return worst;
}

function minTangentDot(points) {
  let worst = 1;
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const dot = a.tx * b.tx + a.ty * b.ty;
    if (dot < worst) worst = dot;
  }
  return worst;
}

function buildLoop(count, halfW, halfH, R, harmonics) {
  let scale = 1;
  let framed = [];
  for (let attempt = 0; attempt < 8; attempt++) {
    framed = framePoints(sampleCenterline(count, halfW, halfH, R, harmonics, scale));
    const gap = minSeparation(framed, R * 2.2);
    const turn = minTangentDot(framed);
    if (gap >= R * 2.35 && turn > 0.08) break;
    scale *= 0.78;
  }
  return { points: framed, ampScale: scale };
}

function pathLength(points) {
  let total = 0;
  const seg = [];
  for (let i = 0; i < points.length; i++) {
    const a = points[i];
    const b = points[(i + 1) % points.length];
    const len = Math.hypot(b.x - a.x, b.y - a.y);
    seg.push(len);
    total += len;
  }
  return { total, seg };
}

function chordWidth(R) {
  const zc = 0.72 * R;
  const half = Math.sqrt(Math.max(0, R * R - zc * zc));
  return half * 2;
}

export function pegMetrics(R, photoMin) {
  const chord = chordWidth(R);
  const holeD = clamp(3.1, 5.4, chord - 2.2);
  const pegD = Math.max(2.4, holeD - 0.6);
  const height = tubeSection(R).height;
  const holeDepth = Math.max(3.2, height - 1.35);
  const plugLen = clamp(3, 8, holeDepth - 0.45);
  const legLen = clamp(34, 62, photoMin * 0.34);
  return { chord, holeD, pegD, holeDepth, plugLen, legLen, collarT: 2.1, collarD: pegD + 3.4 };
}

function pickHoles(points, R) {
  const n = points.length;
  let iBot = 0;
  for (let i = 1; i < n; i++) if (points[i].y < points[iBot].y) iBot = i;
  const target = clamp(34, 58, R * 7.5);
  const walk = (dir) => {
    let dist = 0;
    let i = iBot;
    for (let step = 0; step < n - 1; step++) {
      const j = (i + dir + n) % n;
      dist += Math.hypot(points[j].x - points[i].x, points[j].y - points[i].y);
      i = j;
      if (dist >= target) return points[i];
    }
    return points[i];
  };
  return [walk(-1), walk(1)];
}

function placeClips(points, holes, R, seed) {
  const { total } = pathLength(points);
  const n = points.length;
  // Clips sit in the bays, where the tube is just outside the photo. A valley
  // inside a photo corner gets sliced open, and a clip on a far lobe becomes a long tab.
  const clear = (pt) => {
    const gap = pt.radius - pt.edge;
    return gap > R * 0.5 && gap < R * 2.7;
  };
  const valleys = [];
  for (let i = 0; i < n; i++) {
    if (!clear(points[i])) continue;
    const gap = points[i].radius - points[i].edge;
    const prev = points[(i - 1 + n) % n].radius - points[(i - 1 + n) % n].edge;
    const next = points[(i + 1) % n].radius - points[(i + 1) % n].edge;
    if (gap <= prev && gap <= next) valleys.push(points[i]);
  }
  valleys.sort((a, b) => a.radius - a.edge - (b.radius - b.edge));
  const chosen = [];
  const minSep = Math.max(22, R * 3.4);
  const tooClose = (pt, sep) =>
    chosen.some((c) => Math.hypot(c.x - pt.x, c.y - pt.y) < sep) ||
    holes.some((h) => Math.hypot(h.x - pt.x, h.y - pt.y) < R * 2.4);
  for (const pt of valleys) {
    if (tooClose(pt, minSep)) continue;
    chosen.push(pt);
    if (chosen.length >= 8) break;
  }
  const fill = (accept, sep, limit) => {
    const shift = Math.floor(mulberry32(seed + 17)() * n);
    for (let k = 0; k < n && chosen.length < limit; k++) {
      const pt = points[(shift + k) % n];
      if (!accept(pt) || tooClose(pt, sep)) continue;
      chosen.push(pt);
    }
  };
  if (chosen.length < 6) fill(clear, minSep * 0.72, 6);
  if (chosen.length < 4) {
    const wider = (pt) => {
      const gap = pt.radius - pt.edge;
      return gap > R * 0.5 && gap < R * 4;
    };
    fill(wider, minSep * 0.65, 4);
  }
  const clips = [];
  for (const pt of chosen) {
    const theta = Math.atan2(pt.y, pt.x);
    const edge = photoRadius(theta, points.halfW, points.halfH);
    const cR = Math.hypot(pt.x, pt.y);
    const inner = cR - R * 0.72;
    const uIn = edge - 3.6;
    let uOut = Math.max(edge + 0.5, inner + R * 0.5);
    uOut = Math.min(uOut, cR + R * 0.1);
    if (!(uOut > uIn + 2)) continue;
    clips.push({
      ...pt,
      theta,
      centerRadius: cR,
      photoEdge: edge,
      uIn,
      uOut,
      halfLen: 3.6,
    });
  }
  return { clips, perimeter: total };
}

function sweepMesh(points, profile) {
  const rings = points.length;
  const prof = profile.length;
  const vertProperties = new Float32Array(rings * prof * 3);
  for (let i = 0; i < rings; i++) {
    const p = points[i];
    for (let j = 0; j < prof; j++) {
      const o = (i * prof + j) * 3;
      const u = profile[j].u;
      vertProperties[o] = p.x + p.ox * u;
      vertProperties[o + 1] = p.y + p.oy * u;
      vertProperties[o + 2] = profile[j].z;
    }
  }
  const triVerts = new Uint32Array(rings * prof * 6);
  let t = 0;
  const vid = (i, j) => i * prof + j;
  for (let i = 0; i < rings; i++) {
    const i2 = (i + 1) % rings;
    for (let j = 0; j < prof; j++) {
      const j2 = (j + 1) % prof;
      triVerts[t++] = vid(i, j);
      triVerts[t++] = vid(i2, j);
      triVerts[t++] = vid(i2, j2);
      triVerts[t++] = vid(i, j);
      triVerts[t++] = vid(i2, j2);
      triVerts[t++] = vid(i, j2);
    }
  }
  return { numProp: 3, vertProperties, triVerts };
}

export function derive(raw, quality = "preview") {
  const p = mergeParams(raw);
  const photoW = toMm(p.photoW, p.units);
  const photoH = toMm(p.photoH, p.units);
  const halfW = photoW / 2;
  const halfH = photoH / 2;
  const R = p.tube / 2;
  const count = quality === "export" ? 168 : 112;
  const profileSteps = quality === "export" ? 36 : 26;
  const harmonics = waveHarmonics(p.seed);
  const loop = buildLoop(count, halfW, halfH, R, harmonics);
  loop.points.halfW = halfW;
  loop.points.halfH = halfH;
  const section = tubeSection(R);
  const holes = p.mode === "stand" ? pickHoles(loop.points, R) : [];
  const { clips, perimeter } = placeClips(loop.points, holes, R, p.seed);
  const profile = profilePoints(R, profileSteps);
  const tube = sweepMesh(loop.points, profile);
  const peg = pegMetrics(R, Math.min(photoW, photoH));
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let minCenter = Infinity;
  for (const pt of loop.points) {
    minX = Math.min(minX, pt.x - R);
    maxX = Math.max(maxX, pt.x + R);
    minY = Math.min(minY, pt.y - R);
    maxY = Math.max(maxY, pt.y + R);
    minCenter = Math.min(minCenter, pt.radius - pt.edge);
  }
  return {
    p,
    photoW,
    photoH,
    halfW,
    halfH,
    R,
    harmonics,
    ampScale: loop.ampScale,
    points: loop.points,
    clips,
    holes,
    perimeter,
    profile,
    tube,
    section,
    peg,
    minCenterGap: minCenter,
    bounds: { minX, maxX, minY, maxY },
  };
}

export function warnings(raw) {
  const d = typeof raw.points === "object" && raw.photoW ? raw : derive(raw, "preview");
  const notes = [];
  const short = Math.min(d.photoW, d.photoH);
  if (d.R * 2 > short * 0.42) {
    notes.push("The tube is thick for this photo, so the opening gets smaller.");
  }
  if (d.clips.length < 4) {
    notes.push("Only a few clips fit around this size. A larger photo spaces them out.");
  }
  if (d.p.mode === "stand" && d.peg.holeD < 3.4) {
    notes.push("A thicker tube gives the pegs a deeper hole to hold.");
  }
  return notes;
}

export function outsidePhoto(d) {
  const spanX = d.bounds.maxX - d.bounds.minX;
  const spanY = d.bounds.maxY - d.bounds.minY;
  return spanX > d.photoW + d.R && spanY > d.photoH + d.R;
}

/** How deep the lobes are, in millimeters. A ripple on a rectangle stays small. */
export function lobeSwing(d) {
  let lo = Infinity;
  let hi = -Infinity;
  for (const pt of d.points) {
    const extra = pt.radius - ellipseRadius(pt.theta, d.halfW, d.halfH);
    if (extra < lo) lo = extra;
    if (extra > hi) hi = extra;
  }
  return hi - lo;
}

export function clipOutsideOpening(d) {
  return d.clips.every((clip) => {
    const hold = clip.photoEdge - 1;
    return clip.uOut > clip.photoEdge && hold < clip.centerRadius;
  });
}
