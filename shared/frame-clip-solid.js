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

/** Tongues are in cover coordinates (z = 0 at the cover back). */
export function addCoverTongues(Manifold, solid, clip, temps) {
  let out = solid;
  for (const tongue of clip.tongues) out = addBox(Manifold, out, tongue, temps);
  return out;
}

/**
 * Back plate in print coordinates (z = 0 outer face on the bed).
 * Rails, stops, and the stand cleat are fused to the slab. Hang holes are cut last.
 */
export function buildSlideBack(Manifold, clip, holes, temps) {
  let solid = cubeFromBox(Manifold, clip.slab, temps);
  for (const rail of clip.rails) {
    solid = addBox(Manifold, solid, rail.wall, temps);
    for (const lip of rail.lips) solid = addBox(Manifold, solid, lip, temps);
    solid = addBox(Manifold, solid, rail.stop, temps);
  }
  if (clip.socket) {
    solid = addBox(Manifold, solid, clip.socket.housing, temps);
    solid = subBox(Manifold, solid, clip.socket.void, temps);
    for (const lip of clip.socket.lips) solid = addBox(Manifold, solid, lip, temps);
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
