#!/usr/bin/env python3
"""Generate a wall-mounted Post-it clip matching the printed gray S/hairpin holder.

The part is a constant-thickness ribbon extruded from a 2D hairpin profile:
  - long flat back (double-sided tape to the wall)
  - 180° rounded hook (pocket for a small pad)
  - wavy return arm that pinches notes
  - flared lip so a pad or loose notes slide in easily

Print on the side (profile in XY, width in Z) so layer lines run across the
spring, matching the original.
"""

from __future__ import annotations

import math
import struct
from dataclasses import dataclass
from pathlib import Path

OUT = Path(__file__).resolve().parent


@dataclass
class ClipParams:
    # Extrusion (how wide the clip is left-to-right on the wall)
    width: float = 20.0
    # Ribbon thickness
    thickness: float = 2.8
    # Length of the taped back, measured along the wall
    back_length: float = 40.0
    # Inner radius of the C-hook pocket
    hook_inner_r: float = 4.0
    # How far the return arm extends from the hook center toward the open end
    arm_length: float = 22.0
    # Inner gap at the pinch (closest approach of the two arms)
    pinch_gap: float = 1.6
    # Where the pinch sits along the arm, 0 = just after hook, 1 = at the lip
    pinch_t: float = 0.55
    # Lip curl: radius and how far it turns away from the back (degrees)
    lip_radius: float = 3.8
    lip_angle_deg: float = 110.0
    # Samples
    arc_segments: int = 48
    # Tiny rounding on square end caps so they print cleanly
    end_radius: float = 0.35


def _v(x: float, y: float) -> tuple[float, float]:
    return (float(x), float(y))


def _add(a, b):
    return (a[0] + b[0], a[1] + b[1])


def _sub(a, b):
    return (a[0] - b[0], a[1] - b[1])


def _mul(a, s):
    return (a[0] * s, a[1] * s)


def _len(a) -> float:
    return math.hypot(a[0], a[1])


def _norm(a):
    l = _len(a)
    if l < 1e-12:
        return (0.0, 0.0)
    return (a[0] / l, a[1] / l)


def _rot90(a, sign: float = 1.0):
    return (-sign * a[1], sign * a[0])


def polyline_length(pts) -> float:
    return sum(_len(_sub(pts[i + 1], pts[i])) for i in range(len(pts) - 1))


def resample(pts, spacing: float):
    """Resample an open polyline to ~equal spacing, keeping endpoints."""
    if len(pts) < 2:
        return list(pts)
    total = polyline_length(pts)
    n = max(2, int(round(total / spacing)))
    target = [i * total / (n - 1) for i in range(n)]
    out = [pts[0]]
    acc = 0.0
    seg = 0
    for t in target[1:-1]:
        while seg < len(pts) - 2 and acc + _len(_sub(pts[seg + 1], pts[seg])) < t:
            acc += _len(_sub(pts[seg + 1], pts[seg]))
            seg += 1
        a, b = pts[seg], pts[seg + 1]
        sl = _len(_sub(b, a))
        u = 0.0 if sl < 1e-12 else (t - acc) / sl
        out.append((a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u))
    out.append(pts[-1])
    return out


def arc_points(center, radius, a0, a1, n: int):
    pts = []
    for i in range(n + 1):
        a = a0 + (a1 - a0) * i / n
        pts.append((center[0] + radius * math.cos(a), center[1] + radius * math.sin(a)))
    return pts


def cubic_bezier(p0, p1, p2, p3, n: int):
    pts = []
    for i in range(n + 1):
        t = i / n
        u = 1 - t
        x = u**3 * p0[0] + 3 * u**2 * t * p1[0] + 3 * u * t**2 * p2[0] + t**3 * p3[0]
        y = u**3 * p0[1] + 3 * u**2 * t * p1[1] + 3 * u * t**2 * p2[1] + t**3 * p3[1]
        pts.append((x, y))
    return pts


def centerline(p: ClipParams):
    """Ribbon centerline, starting at the free end of the back and ending at the lip.

    Coordinates: +x along the wall (hook at small x), +y away from the wall.
    The outer face of the back sits on y = 0.
    """
    t = p.thickness
    r_c = p.hook_inner_r + t / 2.0  # centerline hook radius
    y_back = t / 2.0

    # Hook center. Leftmost centerline x = 0.
    # Sweep clockwise from the back (down) through the left bulb to the return arm.
    cx, cy = r_c, y_back + r_c

    # Back goes from the far end toward the hook (travel direction -x).
    hook_joint = (cx, y_back)  # angle -pi/2
    back_end = (p.back_length - t / 2.0, y_back)

    n_back = max(8, int(p.back_length / 0.6))
    back = [
        (back_end[0] - (back_end[0] - hook_joint[0]) * i / n_back, y_back)
        for i in range(n_back + 1)
    ]

    # From -90° decreasing through 180° (left) to +90° (= -270°).
    hook_sweep = math.pi + math.radians(12.0)  # slightly past 180° so the arm starts inward
    hook = arc_points((cx, cy), r_c, -math.pi / 2, -math.pi / 2 - hook_sweep, p.arc_segments)

    # Return arm starts at the end of the hook (already slightly inward).
    arm0 = hook[-1]
    hook_end_angle = -math.pi / 2 - hook_sweep
    # d/dθ = (-r sin θ, r cos θ); θ decreasing => tangent = -d/dθ
    tan_hook = _norm((r_c * math.sin(hook_end_angle), -r_c * math.cos(hook_end_angle)))

    # Pinch: return-arm centerline y so the inner gap is pinch_gap
    y_pinch = y_back + t + p.pinch_gap
    x_pinch = cx + p.arm_length * p.pinch_t

    # After the pinch the arm eases away, arriving +x so the lip can curl cleanly.
    x_lip = cx + p.arm_length
    y_lip = y_pinch + 2.6

    h_hook = p.arm_length * 0.28
    h_pin = p.arm_length * 0.18
    s1 = cubic_bezier(
        arm0,
        (arm0[0] + tan_hook[0] * h_hook, arm0[1] + tan_hook[1] * h_hook),
        (x_pinch - h_pin, y_pinch),
        (x_pinch, y_pinch),
        p.arc_segments,
    )
    s2 = cubic_bezier(
        (x_pinch, y_pinch),
        (x_pinch + h_pin, y_pinch),
        (x_lip - 4.0, y_lip),
        (x_lip, y_lip),
        p.arc_segments,
    )

    # Lip: arriving +x, turn toward +y (away from the wall) so the mouth opens.
    lip_center = (x_lip, y_lip + p.lip_radius)
    a0 = -math.pi / 2
    a1 = -math.pi / 2 + math.radians(p.lip_angle_deg)
    lip = arc_points(lip_center, p.lip_radius, a0, a1, max(20, p.arc_segments // 2))

    # Stitch, dropping duplicate joints
    pts = []
    for group in (back, hook, s1, s2, lip):
        for q in group:
            if pts and _len(_sub(q, pts[-1])) < 1e-6:
                continue
            pts.append(q)
    return resample(pts, spacing=0.28)


def _tangents(center):
    n = len(center)
    tangents = []
    for i in range(n):
        if i == 0:
            tng = _norm(_sub(center[1], center[0]))
        elif i == n - 1:
            tng = _norm(_sub(center[i], center[i - 1]))
        else:
            tng = _norm(
                _add(_norm(_sub(center[i], center[i - 1])), _norm(_sub(center[i + 1], center[i])))
            )
        tangents.append(tng)
    return tangents


def offset_closed_from_open(center, dist: float, end_r: float):
    """Offset an open centerline to a closed 2D outline of thickness 2*dist.

    Ends are square with a small rounded corner so they print cleanly.
    """
    tangents = _tangents(center)
    left, right = [], []
    for q, tng in zip(center, tangents):
        nrm = _rot90(tng, +1.0)
        left.append(_add(q, _mul(nrm, dist)))
        right.append(_add(q, _mul(nrm, -dist)))

    # Square ends print cleanly when the part is laid on its side.
    outline = list(left) + list(reversed(right))
    if _len(_sub(outline[0], outline[-1])) > 1e-9:
        outline.append(outline[0])
    return outline


def offset_sides(center, dist: float):
    tangents = _tangents(center)
    left, right = [], []
    for q, tng in zip(center, tangents):
        nrm = _rot90(tng, +1.0)
        left.append(_add(q, _mul(nrm, dist)))
        right.append(_add(q, _mul(nrm, -dist)))
    return left, right


def profile_polygon(p: ClipParams):
    cl = centerline(p)
    return offset_closed_from_open(cl, p.thickness / 2.0, p.end_radius)


def triangulate_polygon(poly):
    """Ear-clip a simple closed polygon (no holes). poly[-1] may repeat poly[0]."""
    pts = list(poly)
    if _len(_sub(pts[0], pts[-1])) < 1e-9:
        pts = pts[:-1]
    n = len(pts)

    def area(vs):
        a = 0.0
        for i in range(len(vs)):
            x1, y1 = vs[i]
            x2, y2 = vs[(i + 1) % len(vs)]
            a += x1 * y2 - x2 * y1
        return a * 0.5

    # CCW
    if area(pts) < 0:
        pts = list(reversed(pts))

    idx = list(range(len(pts)))
    tris = []

    def is_convex(i0, i1, i2):
        a, b, c = pts[i0], pts[i1], pts[i2]
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]) > 1e-12

    def point_in_tri(p0, a, b, c):
        def sign(p1, p2, p3):
            return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])

        b1 = sign(p0, a, b) < 0.0
        b2 = sign(p0, b, c) < 0.0
        b3 = sign(p0, c, a) < 0.0
        return b1 == b2 == b3

    guard = 0
    while len(idx) > 3 and guard < 10000:
        guard += 1
        ear = False
        m = len(idx)
        for i in range(m):
            i0, i1, i2 = idx[(i - 1) % m], idx[i], idx[(i + 1) % m]
            if not is_convex(i0, i1, i2):
                continue
            a, b, c = pts[i0], pts[i1], pts[i2]
            empty = True
            for j in idx:
                if j in (i0, i1, i2):
                    continue
                if point_in_tri(pts[j], a, b, c):
                    empty = False
                    break
            if empty:
                tris.append((a, b, c))
                del idx[i]
                ear = True
                break
        if not ear:
            break
    if len(idx) == 3:
        tris.append((pts[idx[0]], pts[idx[1]], pts[idx[2]]))
    return tris


def _quad(a, b, c, d):
    """Two triangles for quad a-b-c-d (CCW when viewed from outside)."""
    return [(a, b, c), (a, c, d)]


def extrude_ribbon(center, dist: float, z0: float, z1: float):
    """Mesh a constant-thickness ribbon as a strip of prisms. No 2D triangulation."""
    left, right = offset_sides(center, dist)
    faces = []
    n = len(center)

    def vz(q, z):
        return (q[0], q[1], z)

    for i in range(n - 1):
        l0, l1 = left[i], left[i + 1]
        r0, r1 = right[i], right[i + 1]
        # +Z face (z1), CCW from +Z: l0 r0 r1 l1
        faces.extend(_quad(vz(l0, z1), vz(r0, z1), vz(r1, z1), vz(l1, z1)))
        # -Z face (z0), CCW from -Z: l0 l1 r1 r0
        faces.extend(_quad(vz(l0, z0), vz(l1, z0), vz(r1, z0), vz(r0, z0)))
        # Left wall (along +normal): l0 l1 at both z
        faces.extend(_quad(vz(l0, z0), vz(l0, z1), vz(l1, z1), vz(l1, z0)))
        # Right wall: r0 r1
        faces.extend(_quad(vz(r0, z0), vz(r1, z0), vz(r1, z1), vz(r0, z1)))

    # Start cap (back end): from left[0] to right[0], outward is -tangent
    l, r = left[0], right[0]
    faces.extend(_quad(vz(l, z0), vz(r, z0), vz(r, z1), vz(l, z1)))
    # End cap (lip)
    l, r = left[-1], right[-1]
    faces.extend(_quad(vz(l, z0), vz(l, z1), vz(r, z1), vz(r, z0)))
    return faces


def extrude(poly, z0: float, z1: float):
    """Return triangles as 3D triples of xyz for a prism."""
    pts = list(poly)
    if _len(_sub(pts[0], pts[-1])) < 1e-9:
        ring = pts[:-1]
    else:
        ring = pts
    faces = []

    # Caps
    for a, b, c in triangulate_polygon(ring):
        faces.append(((a[0], a[1], z0), (c[0], c[1], z0), (b[0], b[1], z0)))  # bottom, inward-down
        faces.append(((a[0], a[1], z1), (b[0], b[1], z1), (c[0], c[1], z1)))

    # Walls
    n = len(ring)
    for i in range(n):
        a = ring[i]
        b = ring[(i + 1) % n]
        a0, b0 = (a[0], a[1], z0), (b[0], b[1], z0)
        a1, b1 = (a[0], a[1], z1), (b[0], b[1], z1)
        faces.append((a0, b0, b1))
        faces.append((a0, b1, a1))
    return faces


def tri_normal(tri):
    a, b, c = tri
    ux, uy, uz = b[0] - a[0], b[1] - a[1], b[2] - a[2]
    vx, vy, vz = c[0] - a[0], c[1] - a[1], c[2] - a[2]
    nx = uy * vz - uz * vy
    ny = uz * vx - ux * vz
    nz = ux * vy - uy * vx
    l = math.sqrt(nx * nx + ny * ny + nz * nz) or 1.0
    return (nx / l, ny / l, nz / l)


def write_stl(path: Path, faces, name: str = "postit_clip"):
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("wb") as f:
        header = name.encode("ascii", "ignore")[:80]
        f.write(header + b"\0" * (80 - len(header)))
        f.write(struct.pack("<I", len(faces)))
        for tri in faces:
            n = tri_normal(tri)
            f.write(struct.pack("<3f", *n))
            for v in tri:
                f.write(struct.pack("<3f", *v))
            f.write(struct.pack("<H", 0))
    print(f"wrote {path}  ({len(faces)} tris)")


def write_preview_png(path: Path, poly, cl, p: ClipParams, title: str):
    try:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        from matplotlib.patches import Polygon
    except Exception as e:
        print("matplotlib missing, skip preview", e)
        return

    fig, ax = plt.subplots(figsize=(10, 4.2), dpi=140)
    xs, ys = zip(*poly)
    # Flip Y so the wall is on top, matching the user's edge-on photo.
    flipped = [(q[0], -q[1]) for q in poly]
    ax.add_patch(
        Polygon(
            flipped[:-1] if _len(_sub(poly[0], poly[-1])) < 1e-9 else flipped,
            closed=True,
            facecolor="#c8c8c8",
            edgecolor="#444",
            lw=0.8,
        )
    )
    ax.axhline(0, color="#888", lw=1, alpha=0.55)
    ax.text(p.back_length * 0.42, 1.8, "wall — tape the flat back here", color="#555", fontsize=9)
    ax.set_aspect("equal")
    ax.set_xlabel("mm")
    ax.set_ylabel("mm")
    pad = 4
    ax.set_xlim(-pad, p.back_length + pad)
    ax.set_ylim(-max(ys) - pad, 4)
    fig.tight_layout()
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


def write_svg(path: Path, poly, p: ClipParams):
    xs = [q[0] for q in poly]
    ys = [q[1] for q in poly]
    minx, maxx = min(xs) - 2, max(xs) + 2
    miny, maxy = min(ys) - 2, max(ys) + 2
    w, h = maxx - minx, maxy - miny
    # SVG y-down, flip
    def xy(q):
        return f"{q[0] - minx:.3f},{maxy - q[1]:.3f}"

    d = "M " + " L ".join(xy(q) for q in poly) + " Z"
    svg = f"""<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w:.2f} {h:.2f}" width="{w*4:.0f}" height="{h*4:.0f}">
  <rect width="100%" height="100%" fill="#f4f4f1"/>
  <path d="{d}" fill="#c4c4c4" stroke="#333" stroke-width="0.15"/>
</svg>
"""
    path.write_text(svg)
    print(f"wrote {path}")


def mesh_volume(faces) -> float:
    """Signed volume of a triangle mesh (origin-based)."""
    vol = 0.0
    for a, b, c in faces:
        vol += (
            a[0] * (b[1] * c[2] - b[2] * c[1])
            + a[1] * (b[2] * c[0] - b[0] * c[2])
            + a[2] * (b[0] * c[1] - b[1] * c[0])
        )
    return vol / 6.0


def write_scad(path: Path, poly, p: ClipParams, name: str):
    pts = list(poly)
    if _len(_sub(pts[0], pts[-1])) < 1e-9:
        pts = pts[:-1]
    body = ",\n    ".join(f"[{x:.4f}, {y:.4f}]" for x, y in pts)
    scad = f"""// Auto-generated from generate.py — {name}
// Edit generate.py (or the numbers below) and re-run to rebuild the STL.

width = {p.width:.3f};
thickness = {p.thickness:.3f}; // ribbon thickness, baked into the polygon
$fn = 48;

module clip_profile() {{
  polygon([
    {body}
  ]);
}}

linear_extrude(height = width, center = true)
  clip_profile();
"""
    path.write_text(scad)
    print(f"wrote {path}")


def write_iso_png(path: Path, faces, p: ClipParams, title: str):
    try:
        import matplotlib

        matplotlib.use("Agg")
        import matplotlib.pyplot as plt
        from mpl_toolkits.mplot3d.art3d import Poly3DCollection
    except Exception as e:
        print("matplotlib 3d missing, skip iso", e)
        return

    fig = plt.figure(figsize=(7.2, 5.2), dpi=140)
    ax = fig.add_subplot(111, projection="3d")
    # Show a subset if huge, but 2k tris is fine
    coll = Poly3DCollection(faces, facecolor="#c8c8c8", edgecolor="#8a8a8a", linewidths=0.08, alpha=1.0)
    ax.add_collection3d(coll)
    xs = [v[0] for t in faces for v in t]
    ys = [v[1] for t in faces for v in t]
    zs = [v[2] for t in faces for v in t]
    ax.set_xlim(min(xs) - 2, max(xs) + 2)
    ax.set_ylim(min(ys) - 2, max(ys) + 2)
    ax.set_zlim(min(zs) - 2, max(zs) + 2)
    try:
        ax.set_box_aspect((max(xs) - min(xs) + 4, max(ys) - min(ys) + 4, max(zs) - min(zs) + 4))
    except Exception:
        pass
    ax.view_init(elev=22, azim=-55)
    ax.set_xlabel("mm")
    ax.set_ylabel("mm")
    ax.set_zlabel("mm")
    fig.tight_layout()
    fig.savefig(path)
    plt.close(fig)
    print(f"wrote {path}")


def mesh_for(p: ClipParams):
    cl = centerline(p)
    poly = offset_closed_from_open(cl, p.thickness / 2.0, p.end_radius)
    z0, z1 = -p.width / 2.0, p.width / 2.0
    faces = extrude_ribbon(cl, p.thickness / 2.0, z0, z1)
    return poly, cl, faces


def main():
    original = ClipParams()
    wide = ClipParams(width=76.0)  # full 3" Post-it pad

    variants = [
        ("postit-wall-clip", original, "Original 20 x 40 mm - matches the printed clip"),
        ("postit-wall-clip-wide", wide, "Wide 76 x 40 mm - full 3x3 in Post-it pad"),
    ]
    for slug, params, title in variants:
        poly, cl, faces = mesh_for(params)
        vol = mesh_volume(faces)
        if vol <= 0:
            raise SystemExit(f"non-positive mesh volume for {slug}: {vol}")
        write_stl(OUT / f"{slug}.stl", faces, slug)
        write_scad(OUT / f"{slug}.scad", poly, params, slug)
        write_preview_png(OUT / f"{slug}-profile.png", poly, cl, params, title)
        write_iso_png(OUT / f"{slug}-iso.png", faces, params, title)
        write_svg(OUT / f"{slug}-profile.svg", poly, params)
        print(f"  volume {vol:.1f} mm3  ({vol/1000*1.24:.1f} g PLA)")

    poly, cl, _ = mesh_for(original)
    xs, ys = zip(*poly)
    print(
        f"original bbox: {max(xs)-min(xs):.1f} x {max(ys)-min(ys):.1f} x {original.width:.1f} mm"
    )


if __name__ == "__main__":
    main()
