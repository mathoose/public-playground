#!/usr/bin/env python3
"""Trace the Paddington tag's handwritten letters from the reference photo.

The glyphs are the photo's marker ink, not a system font. Threshold the dark
strokes, keep the counters (a, e, o, P, B, A, …), then low-pass each closed
outline so the pixel stairs print as a smooth marker edge. Coordinates in
letters.js are millimeters
for a 55 mm tall tag: origin at the bottom center, +Y toward the hole, +X to
the right as in the photo (letters stay rotated the same way relative to the hole).
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_fill_holes, gaussian_filter1d, label
from skimage.measure import approximate_polygon, find_contours
from skimage.morphology import closing, disk, erosion, remove_small_objects

PHOTO = Path(
    sys.argv[1]
    if len(sys.argv) > 1
    else "/cursor/stores/bc-4f59f64f-ed50-4c53-9b28-5503bd4eeb52/media/paddington/reference.jpg"
)
OUT_JS = Path(__file__).with_name("letters.js")

# Paper silhouette measured from the photo (pixels, y down).
PHOTO_TOP = 42
PHOTO_BOTTOM = 710
PHOTO_CX = 375.0
REF_HEIGHT = 55.0
SCALE = REF_HEIGHT / (PHOTO_BOTTOM - PHOTO_TOP)  # mm per pixel

# Hole ring center fitted on the dark purple ring.
HOLE_X_PX = 374.0
HOLE_Y_PX = 115.0


def to_mm(x: float, y: float) -> tuple[float, float]:
    return ((x - PHOTO_CX) * SCALE, (PHOTO_BOTTOM - y) * SCALE)


def signed_area(pts: list[tuple[float, float]]) -> float:
    a = 0.0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        a += x1 * y2 - x2 * y1
    return 0.5 * a


def resample_closed(pts: list[tuple[float, float]], step: float) -> np.ndarray:
    p = np.asarray(pts, dtype=float)
    if len(p) < 3:
        return p
    nxt = np.vstack([p, p[0]])
    seg = np.hypot(*(np.diff(nxt, axis=0).T))
    total = float(seg.sum())
    if total < step * 6:
        return p
    n = max(16, int(round(total / step)))
    targets = np.linspace(0, total, n, endpoint=False)
    cum = np.concatenate([[0.0], np.cumsum(seg)])
    out = np.empty((n, 2), dtype=float)
    j = 0
    for i, t in enumerate(targets):
        while j < len(seg) - 1 and cum[j + 1] < t:
            j += 1
        span = seg[j] or 1.0
        u = (t - cum[j]) / span
        a = p[j]
        b = p[(j + 1) % len(p)]
        out[i] = (1 - u) * a + u * b
    return out


def smooth_loop(pts: list[tuple[float, float]], radius_mm: float = 0.28) -> list[tuple[float, float]]:
    """Low-pass the closed outline so photo-pixel stairs become a marker edge.

    The radius is a fraction of a millimeter — enough to erase the 1-pixel
    sawtooth, not enough to redraw the glyph, close a counter, or eat a dot.
    """
    step = 0.03
    samples = resample_closed(pts, step)
    if len(samples) < 8:
        return [(float(x), float(y)) for x, y in samples]
    sigma = max(1.0, radius_mm / step)
    xs = gaussian_filter1d(samples[:, 0], sigma, mode="wrap")
    ys = gaussian_filter1d(samples[:, 1], sigma, mode="wrap")
    smoothed = [(float(x), float(y)) for x, y in zip(xs, ys)]
    # Even chords, short enough that the extruded wall reads as a curve up close.
    dense = resample_closed(smoothed, 0.055)
    return [(float(x), float(y)) for x, y in dense]


def dedupe(pts: list[tuple[float, float]], tol: float = 0.012) -> list[tuple[float, float]]:
    out: list[tuple[float, float]] = []
    for p in pts:
        if not out or abs(p[0] - out[-1][0]) > tol or abs(p[1] - out[-1][1]) > tol:
            out.append(p)
    if len(out) > 2 and abs(out[0][0] - out[-1][0]) <= tol and abs(out[0][1] - out[-1][1]) <= tol:
        out.pop()
    return out


def approximate_mm(pts: list[tuple[float, float]], tol: float) -> list[tuple[float, float]]:
    arr = np.array(pts + [pts[0]], dtype=float)
    approx = approximate_polygon(arr, tolerance=tol)
    if len(approx) >= 2 and np.allclose(approx[0], approx[-1]):
        approx = approx[:-1]
    return [(float(p[0]), float(p[1])) for p in approx]


def self_intersects(pts: list[tuple[float, float]]) -> bool:
    n = len(pts)
    def cross(a, b, c):
        return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
    for i in range(n):
        a, b = pts[i], pts[(i + 1) % n]
        for j in range(i + 1, n):
            if abs(i - j) <= 1 or (i == 0 and j == n - 1):
                continue
            # skip segments that share a vertex
            if j == (i + 1) % n or i == (j + 1) % n:
                continue
            c, d = pts[j], pts[(j + 1) % n]
            if {i, (i + 1) % n} & {j, (j + 1) % n}:
                continue
            d1 = cross(a, b, c)
            d2 = cross(a, b, d)
            d3 = cross(c, d, a)
            d4 = cross(c, d, b)
            if d1 * d2 < 0 and d3 * d4 < 0:
                return True
    return False


def ink_mask(lum: np.ndarray) -> np.ndarray:
    tag = binary_fill_holes(closing(lum < 248, disk(2)))
    inner = erosion(tag, disk(10))
    # Metal clip and the printed hole ring are not letters.
    excl = np.zeros(lum.shape, dtype=bool)
    excl[70:165, 310:445] = True
    excl[36:58, 250:560] = True
    mask = (lum < 108) & inner & ~excl
    mask = remove_small_objects(mask, max_size=35)
    mask = closing(mask, disk(1))
    lab, n = label(mask)
    clean = np.zeros_like(mask)
    for i in range(1, n + 1):
        comp = lab == i
        filled = binary_fill_holes(comp)
        hole = filled & ~comp
        hl, hn = label(hole)
        keep = comp.copy()
        for h in range(1, hn + 1):
            hcomp = hl == h
            # Parchment pinholes inside a stroke. Real counters are larger.
            if int(hcomp.sum()) < 28:
                keep[hcomp] = True
        clean[keep] = True
    return clean


def trace(clean: np.ndarray) -> list[list[tuple[float, float]]]:
    polys: list[list[tuple[float, float]]] = []
    lab, n = label(clean)
    for i in range(1, n + 1):
        comp = np.pad(lab == i, 1)
        contours = find_contours(comp.astype(float), 0.5)
        rings = []
        for contour in contours:
            raw = contour
            if len(raw) >= 2 and np.allclose(raw[0], raw[-1]):
                raw = raw[:-1]
            if len(raw) < 3:
                continue
            pts = [to_mm(float(p[1] - 1), float(p[0] - 1)) for p in raw]
            pts = smooth_loop(pts)
            if self_intersects(pts):
                pts = smooth_loop([to_mm(float(p[1] - 1), float(p[0] - 1)) for p in raw], 0.16)
            pts = dedupe(pts, 0.02)
            if len(pts) < 3:
                continue
            area = signed_area(pts)
            if abs(area) < 0.06:
                continue
            rings.append((abs(area), area, pts))
        if not rings:
            continue
        rings.sort(key=lambda r: -r[0])
        for idx, (_abs, area, pts) in enumerate(rings):
            # Model +Y is up. Positive area is CCW (solid). Holes are CW.
            want_positive = idx == 0
            if want_positive and area < 0:
                pts = list(reversed(pts))
            if not want_positive and area > 0:
                pts = list(reversed(pts))
            if self_intersects(pts):
                print("drop self-intersecting ring", len(pts), "area", signed_area(pts))
                continue
            polys.append([(round(x, 3), round(y, 3)) for x, y in pts])
    return polys


def write_js(polys: list[list[tuple[float, float]]]) -> None:
    body = json.dumps(polys, separators=(",", ":"))
    # Wrap for readability: one polygon per line.
    lines = ["["]
    for i, poly in enumerate(polys):
        comma = "," if i < len(polys) - 1 else ""
        lines.append(json.dumps(poly, separators=(",", ":")) + comma)
    lines.append("]")
    text = f"""// Hand-traced marker glyphs from the Paddington luggage-tag photo.
// Not a system font. Millimeters at tag height {REF_HEIGHT:.0f}:
// origin at the bottom center, +Y toward the hole, +X to the photo's right.
// Each ring is a closed loop (first point is not repeated).
// Outers are counter-clockwise; counters (a, e, o, P, B, A, …) are clockwise.
// Stroke edges are low-pass smoothed (~0.28 mm) so photo-pixel stairs do not print.
export const REF_HEIGHT = {REF_HEIGHT};
export const LETTER_POLYS = {chr(10).join(lines)};
"""
    OUT_JS.write_text(text)
    print(f"wrote {OUT_JS}  rings={len(polys)}  pts={sum(len(p) for p in polys)}")


def preview(polys: list[list[tuple[float, float]]], clean: np.ndarray) -> None:
    W, H = 900, 1200
    img = Image.new("RGB", (W, H), (244, 236, 220))
    dr = ImageDraw.Draw(img)
    # map mm to image: y up, hole at top
    def xy(p):
        x, y = p
        return (W / 2 + x * (W * 0.8 / 40), H - 40 - y * (H * 0.86 / 55))
    # tag outline (same ratios as geometry.js)
    scale = SCALE
    top_half = 139 * scale
    body_half = 236 * scale
    chamfer = 128 * scale
    rad = 38 * scale
    height = REF_HEIGHT
    outline = []
    outline.append((-body_half + rad, 0))
    outline.append((body_half - rad, 0))
    for i in range(1, 9):
        a = -np.pi / 2 + i * (np.pi / 2) / 8
        outline.append((body_half - rad + np.cos(a) * rad, rad + np.sin(a) * rad))
    outline.append((body_half, height - chamfer))
    outline.append((top_half, height))
    outline.append((-top_half, height))
    outline.append((-body_half, height - chamfer))
    outline.append((-body_half, rad))
    for i in range(1, 9):
        a = np.pi + i * (np.pi / 2) / 8
        outline.append((-body_half + rad + np.cos(a) * rad, rad + np.sin(a) * rad))
    dr.polygon([xy(p) for p in outline], fill=(212, 176, 122), outline=(90, 60, 30))
    hx, hy = to_mm(HOLE_X_PX, HOLE_Y_PX)
    c = xy((hx, hy))
    rr = 2.5 * (W * 0.8 / 40)
    dr.ellipse([c[0] - rr, c[1] - rr, c[0] + rr, c[1] + rr], fill=(244, 236, 220), outline=(60, 30, 30))
    for poly in polys:
        area = signed_area(poly)
        dr.polygon([xy(p) for p in poly], fill=(40, 28, 20) if area > 0 else (212, 176, 122))
    out = Path("/tmp/pad/traced-model.png")
    img.save(out)
    print("preview", out, "hole mm", round(hx, 2), round(hy, 2))
    # IoU check against the mask
    rast = Image.new("L", (clean.shape[1], clean.shape[0]), 0)
    rd = ImageDraw.Draw(rast)
    for poly in polys:
        pix = [((x / SCALE) + PHOTO_CX, PHOTO_BOTTOM - (y / SCALE)) for x, y in poly]
        rd.polygon(pix, fill=255 if signed_area(poly) > 0 else 0)
    r = np.asarray(rast) > 0
    inter = np.logical_and(r, clean).sum()
    union = np.logical_or(r, clean).sum()
    print(f"IoU {inter / union:.4f}  missing {np.logical_and(clean, ~r).sum()}  extra {np.logical_and(r, ~clean).sum()}")
    # Edge-only zoom of "Please look" (photo right / model +X) so stairs are obvious.
    zoom = Image.new("RGB", (1400, 1800), (232, 214, 176))
    zd = ImageDraw.Draw(zoom)
    def zx(p):
        x, y = p
        return ((x - 4) * 78 + 80, 1700 - (y - 18) * 78)
    for poly in polys:
        area = signed_area(poly)
        if not poly:
            continue
        # only the right-hand words
        if max(x for x, _y in poly) < 2:
            continue
        pts = [zx(p) for p in poly]
        zd.line(pts + [pts[0]], fill=(40, 28, 20) if area > 0 else (120, 70, 40), width=3)
    zoom.save("/tmp/pad/smooth-zoom.png")
    areas = sorted(abs(signed_area(p)) for p in polys)
    print("smallest areas mm2", [round(a, 3) for a in areas[:8]])


def main() -> None:
    lum = np.asarray(Image.open(PHOTO).convert("L")).astype(np.float32)
    clean = ink_mask(lum)
    polys = trace(clean)
    write_js(polys)
    preview(polys, clean)


if __name__ == "__main__":
    main()
