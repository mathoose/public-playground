/**
 * Black-and-white paper height for the tag body.
 * Light (1) is high, dark (0) is low — the same rule as a slicer bump map.
 * Short broken fibers and soft pulp, not a basket weave or carbon twill.
 * `paper-height.png` is this function sampled over the necklace.
 */

function hash2(ix, iy) {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967296;
}

function noise(x, y) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash2(x0, y0);
  const b = hash2(x0 + 1, y0);
  const c = hash2(x0, y0 + 1);
  const d = hash2(x0 + 1, y0 + 1);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

function fbm(x, y, octaves) {
  let amp = 0.5;
  let freq = 1;
  let sum = 0;
  let norm = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise(x * freq, y * freq);
    norm += amp;
    amp *= 0.5;
    freq *= 2.07;
  }
  return sum / norm;
}

function stretched(x, y, ang, alongFreq, acrossFreq, seed) {
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  const u = (x * c + y * s) * alongFreq + seed;
  const v = (-x * s + y * c) * acrossFreq;
  return fbm(u, v, 3);
}

/** 0 = valley, 1 = ridge. Crests of stretched noise are short hairs, not a weave. */
export function paperHeight01(x, y) {
  const pulp = fbm(x * 0.34 + 1.3, y * 0.3 + 0.6, 4);
  const tooth = fbm(x * 1.15 + 8.2, y * 1.05 + 3.4, 2);
  const dirs = [
    [0.22, 0.55, 1.25, 0],
    [0.78, 0.48, 1.45, 17],
    [1.45, 0.62, 1.15, 31],
    [2.15, 0.5, 1.35, 9],
    [2.85, 0.58, 1.2, 44],
  ];
  let fiber = 0;
  for (const [ang, along, across, seed] of dirs) {
    const n = stretched(x, y, ang, along, across, seed);
    fiber += Math.max(0, (n - 0.5) / 0.5);
  }
  fiber = Math.min(1.2, fiber) / 1.2;
  let h = 0.28 + (pulp - 0.5) * 0.85 + (tooth - 0.5) * 0.28 + fiber * 0.55;
  if (h < 0) return 0;
  if (h > 1) return 1;
  return h;
}
