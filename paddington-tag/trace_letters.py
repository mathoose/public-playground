#!/usr/bin/env python3
"""Trace the Paddington tag's handwritten letters from the reference photo.

The glyphs are the photo's marker ink, not a system font. Threshold the dark
strokes, keep the counters (a, e, o, P, B, A, …), and simplify each outline
just enough to drop pixel stairs. Coordinates in letters.js are millimeters
for a 55 mm tall tag: origin at the bottom center, +Y toward the hole, +X to
the right as in the photo (letters stay rotated the same way relative to the hole).
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw
from scipy.ndimage import binary_fill_holes, label
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


def chaikin(pts: list[tuple[float, float]]) -> list[tuple[float, float]]:
    """One corner-cut so pixel stairs read as marker ink, without moving the glyph."""
    out: list[tuple[float, float]] = []
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        out.append((0.75 * x1 + 0.25 * x2, 0.75 * y1 + 0.25 * y2))
        out.append((0.25 * x1 + 0.75 * x2, 0.25 * y1 + 0.75 * y2))
    return out


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
            approx = approximate_polygon(contour, tolerance=0.62)
            if len(approx) >= 2 and np.allclose(approx[0], approx[-1]):
                approx = approx[:-1]
            if len(approx) < 3:
                continue
            pts = [to_mm(float(p[1] - 1), float(p[0] - 1)) for p in approx]
            pts = dedupe(chaikin(pts))
            pts = dedupe(approximate_mm(pts, 0.045))
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


def main() -> None:
    lum = np.asarray(Image.open(PHOTO).convert("L")).astype(np.float32)
    clean = ink_mask(lum)
    polys = trace(clean)
    write_js(polys)
    preview(polys, clean)


if __name__ == "__main__":
    main()
