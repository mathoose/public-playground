/** Manifold helpers for the slide-on back. Both frame exporters call these. */

function cubeFromBox(Manifold, b, temps) {
  const w = b.x1 - b.x0;
  const h = b.y1 - b.y0;
  const d = b.z1 - b.z0;
  if (w < 1e-4 || h < 1e-4 || d < 1e-4) return null;
  const m = Manifold.cube([w, h, d], true).translate(
    (b.x0 + b.x1) / 2,
    (b.y0 + b.y1) / 2,
    (b.z0 + b.z1) / 2
  );
  temps.push(m);
  return m;
}

function addBox(Manifold, solid, b, temps) {
  const c = cubeFromBox(Manifold, b, temps);
  if (!c) return solid;
  const next = solid.add(c);
  temps.push(next);
  return next;
}

function subBox(Manifold, solid, b, temps) {
  const c = cubeFromBox(Manifold, b, temps);
  if (!c) return solid;
  const next = solid.subtract(c);
  temps.push(next);
  return next;
}

function roundPlateCorners(Manifold, solid, clip, temps) {
  const R = Math.min(clip.plateCorner || 0, clip.plate.w / 2 - 0.5, clip.plate.h / 2 - 0.5);
  if (R < 0.2) return solid;
  const H = clip.plate.t + 6;
  const hw = clip.plate.w / 2;
  const hh = clip.plate.h / 2;
  let out = solid;
  for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    const ox = sx * hw;
    const oy = sy * hh;
    const cx = ox - sx * R;
    const cy = oy - sy * R;
    const block = Manifold.cube([R + 0.6, R + 0.6, H], true).translate(
      ox - (sx * R) / 2,
      oy - (sy * R) / 2,
      H / 2 - 1
    );
    temps.push(block);
    const cyl = Manifold.cylinder(H + 2, R, R, 40, true).translate(cx, cy, H / 2 - 1);
    temps.push(cyl);
    const keep = block.intersect(cyl);
    temps.push(keep);
    const cutter = block.subtract(keep);
    temps.push(cutter);
    out = out.subtract(cutter);
    temps.push(out);
  }
  return out;
}

/**
 * Cut a channel in the cover's back layers for the rails and stops, then
 * fuse the tongues. The face of the cover stays intact.
 */
export function addCoverTongues(Manifold, solid, clip, temps) {
  let out = solid;
  const pockets = (clip.relief || []).map((b) => cubeFromBox(Manifold, b, temps)).filter(Boolean);
  if (pockets.length) {
    const cutter = pockets.length === 1 ? pockets[0] : Manifold.union(pockets);
    if (cutter !== pockets[0]) temps.push(cutter);
    out = out.subtract(cutter);
    temps.push(out);
  }
  for (const tongue of clip.tongues) out = addBox(Manifold, out, tongue, temps);
  return out;
}

/**
 * Back plate in print coordinates (z = 0 outer face on the bed).
 * Rails and stops are fused to the slab. Stand holes are cut through the plate.
 * Hang holes are cut last.
 */
export function buildSlideBack(Manifold, clip, holes, temps) {
  let solid = cubeFromBox(Manifold, clip.slab, temps);
  solid = roundPlateCorners(Manifold, solid, clip, temps);
  for (const rail of clip.rails) {
    solid = addBox(Manifold, solid, rail.wall, temps);
    for (const lip of rail.lips) solid = addBox(Manifold, solid, lip, temps);
    solid = addBox(Manifold, solid, rail.stop, temps);
  }
  if (clip.pegStand && clip.pegStand.cut) {
    for (const hole of clip.pegStand.holes) solid = subBox(Manifold, solid, hole.box, temps);
  }
  if (holes && holes.length) {
    const drills = holes.map((h) => {
      const cyl = Manifold.cylinder(clip.plate.t + 4, h.r, h.r, 36, true).translate(
        h.x,
        h.y,
        clip.plate.t / 2
      );
      temps.push(cyl);
      return cyl;
    });
    const cutter = drills.length === 1 ? drills[0] : Manifold.union(drills);
    if (cutter !== drills[0]) temps.push(cutter);
    solid = solid.subtract(cutter);
    temps.push(solid);
  }
  return solid;
}

/** Flat peg stand, one solid. Print it on the bed (Z is the sheet thickness). */
export function buildPegStand(Manifold, clip, temps) {
  const stand = clip.pegStand;
  if (!stand || !stand.cut) return null;
  let solid = null;
  for (const b of stand.boxes) {
    solid = solid ? addBox(Manifold, solid, b, temps) : cubeFromBox(Manifold, b, temps);
  }
  return solid;
}
