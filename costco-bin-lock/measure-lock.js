/** Which lock faces a click hit, and which sliders change that distance at all. */

import { SLIDERS, clamp, derive } from "./geometry.js";
import { faceGap } from "../shared/measure.js";

function unit(v) {
  const n = Math.hypot(v[0], v[1], v[2]);
  if (n < 1e-9) return [0, 0, 1];
  return [v[0] / n, v[1] / n, v[2] / n];
}

const AXIS = { x: 0, y: 1, z: 2 };

function facesOf(d) {
  const pad0 = d.thickness + d.throat;
  const hx = d.headX / 2;
  const hy = d.headY / 2;
  const kx = d.hookX / 2;
  const ky = d.hookY / 2;
  const rim = 5.2;
  const lidT = Math.min(2.4, Math.max(1.5, d.throat - 1.3));
  const lid0 = d.thickness + (d.throat - lidT) / 2;
  const lid1 = lid0 + lidT;
  const outerL = d.p.slotLength / 2 + rim;
  const outerW = d.p.slotWidth / 2 + rim;
  const slotL = d.p.slotLength / 2;
  const slotW = d.p.slotWidth / 2;
  const face = (id, part, axis, side, plane, uAxis, u0, u1, vAxis, v0, v1) => ({
    id,
    part,
    axis,
    side,
    plane,
    uAxis,
    u0,
    u1,
    vAxis,
    v0,
    v1,
  });
  return [
    face("pad-x+", "lock", "x", 1, hx, "y", -hy, hy, "z", pad0, d.totalZ),
    face("pad-x-", "lock", "x", -1, -hx, "y", -hy, hy, "z", pad0, d.totalZ),
    face("pad-y+", "lock", "y", 1, hy, "x", -hx, hx, "z", pad0, d.totalZ),
    face("pad-y-", "lock", "y", -1, -hy, "x", -hx, hx, "z", pad0, d.totalZ),
    face("pad-z+", "lock", "z", 1, d.totalZ, "x", -hx, hx, "y", -hy, hy),
    face("pad-z-", "lock", "z", -1, pad0, "x", -hx, hx, "y", -hy, hy),
    face("hook-x+", "lock", "x", 1, kx, "y", -ky, ky, "z", 0, d.thickness),
    face("hook-x-", "lock", "x", -1, -kx, "y", -ky, ky, "z", 0, d.thickness),
    face("hook-y+", "lock", "y", 1, ky, "x", -kx, kx, "z", 0, d.thickness),
    face("hook-y-", "lock", "y", -1, -ky, "x", -kx, kx, "z", 0, d.thickness),
    face("hook-z+", "lock", "z", 1, d.thickness, "x", -kx, kx, "y", -d.coreY / 2, d.coreY / 2),
    face("hook-z-", "lock", "z", -1, 0, "x", -kx, kx, "y", -ky, ky),
    face("lid-x+", "lid", "x", 1, outerL, "y", -outerW, outerW, "z", lid0, lid1),
    face("lid-x-", "lid", "x", -1, -outerL, "y", -outerW, outerW, "z", lid0, lid1),
    face("lid-y+", "lid", "y", 1, outerW, "x", -outerL, outerL, "z", lid0, lid1),
    face("lid-y-", "lid", "y", -1, -outerW, "x", -outerL, outerL, "z", lid0, lid1),
    face("lid-z+", "lid", "z", 1, lid1, "x", -outerL, outerL, "y", -outerW, outerW),
    face("lid-z-", "lid", "z", -1, lid0, "x", -outerL, outerL, "y", -outerW, outerW),
    face("slot-y+", "lid", "y", 1, slotW, "x", -(slotL - slotW), slotL - slotW, "z", lid0, lid1),
    face("slot-y-", "lid", "y", -1, -slotW, "x", -(slotL - slotW), slotL - slotW, "z", lid0, lid1),
    face("slot-x+", "lid", "x", 1, slotL, "y", -slotW, slotW, "z", lid0, lid1),
    face("slot-x-", "lid", "x", -1, -slotL, "y", -slotW, slotW, "z", lid0, lid1),
  ];
}

function coordsOf(point) {
  return [point.x, point.y, point.z];
}

/** Which model face a click landed on, so the same face can be measured after a slider moves. */
export function identifyFace(point, normal, part, d) {
  const p = coordsOf(point);
  const n = unit(coordsOf(normal));
  let best = null;
  for (const face of facesOf(d)) {
    if (face.part !== part) continue;
    const ai = AXIS[face.axis];
    const planeDist = Math.abs(p[ai] - face.plane);
    const nDot = n[ai] * face.side;
    if (nDot < 0.55 || planeDist > 1.8) continue;
    const ui = AXIS[face.uAxis];
    const vi = AXIS[face.vAxis];
    const pad = 1.6;
    if (p[ui] < face.u0 - pad || p[ui] > face.u1 + pad) continue;
    if (p[vi] < face.v0 - pad || p[vi] > face.v1 + pad) continue;
    const spanU = face.u1 - face.u0 || 1;
    const spanV = face.v1 - face.v0 || 1;
    const u = clamp((p[ui] - face.u0) / spanU, 0, 1);
    const v = clamp((p[vi] - face.v0) / spanV, 0, 1);
    const score = planeDist + (1 - nDot) * 4;
    if (!best || score < best.score) best = { id: face.id, u, v, score };
  }
  if (best) return { id: best.id, u: best.u, v: best.v };
  if (part === "lock") {
    const radial = Math.hypot(p[0], p[1]);
    const nRad = Math.hypot(n[0], n[1]);
    if (Math.abs(radial - d.neckR) < 1.5 && nRad > 0.7) {
      return { id: "neck", u: Math.atan2(p[1], p[0]), v: clamp(p[2] / (d.totalZ || 1), 0, 1) };
    }
  }
  return null;
}

export function sampleFace(desc, d) {
  if (!desc) return null;
  if (desc.id === "neck") {
    const c = Math.cos(desc.u);
    const s = Math.sin(desc.u);
    return {
      point: { x: d.neckR * c, y: d.neckR * s, z: desc.v * d.totalZ },
      normal: { x: c, y: s, z: 0 },
    };
  }
  const face = facesOf(d).find((item) => item.id === desc.id);
  if (!face) return null;
  const point = [0, 0, 0];
  const normal = [0, 0, 0];
  point[AXIS[face.axis]] = face.plane;
  point[AXIS[face.uAxis]] = face.u0 + desc.u * (face.u1 - face.u0);
  point[AXIS[face.vAxis]] = face.v0 + desc.v * (face.v1 - face.v0);
  normal[AXIS[face.axis]] = face.side;
  return {
    point: { x: point[0], y: point[1], z: point[2] },
    normal: { x: normal[0], y: normal[1], z: normal[2] },
  };
}

/** Distance between the same two faces after the sliders in `params` are applied. */
export function distanceBetween(descA, descB, params) {
  if (!descA || !descB) return null;
  const d = derive(params);
  const a = sampleFace(descA, d);
  const b = sampleFace(descB, d);
  if (!a || !b) return null;
  return faceGap(a, b).primary;
}

/**
 * Every slider that changes this face pair's distance, from the current value
 * or anywhere else on that slider. A control counts when the number moves at all.
 */
export function slidersAffecting(params, descA, descB, sliders = SLIDERS) {
  const base = distanceBetween(descA, descB, params);
  if (base == null || !Number.isFinite(base)) return [];
  const keys = [];
  for (const slider of sliders) {
    const current = Number(params[slider.key]);
    const probes = [current + slider.step, current - slider.step, slider.min, slider.max];
    let affects = false;
    for (const raw of probes) {
      const value = clamp(raw, slider.min, slider.max);
      if (Math.abs(value - current) < 1e-6) continue;
      const next = distanceBetween(descA, descB, { ...params, [slider.key]: value });
      if (next != null && Math.abs(next - base) > 0.03) {
        affects = true;
        break;
      }
    }
    if (affects) keys.push(slider.key);
  }
  return keys;
}
