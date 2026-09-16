#!/usr/bin/env python3
"""Sanity checks for the reverse-engineered Post-it wall clip."""

from __future__ import annotations

import struct
import unittest
from pathlib import Path

import generate as g

ROOT = Path(__file__).resolve().parent


def stl_tri_count(path: Path) -> int:
    data = path.read_bytes()
    return struct.unpack_from("<I", data, 80)[0]


class ClipGeometryTests(unittest.TestCase):
    def test_original_bbox_and_volume(self):
        p = g.ClipParams()
        poly, cl, faces = g.mesh_for(p)
        xs, ys = zip(*poly)
        w = max(xs) - min(xs)
        h = max(ys) - min(ys)
        self.assertGreater(w, 36)
        self.assertLess(w, 44)
        self.assertGreater(h, 11)
        self.assertLess(h, 18)
        vol = g.mesh_volume(faces)
        self.assertGreater(vol, 3000)
        self.assertLess(vol, 7000)
        # Back is longer than the return arm (tape tab sticks out past the lip).
        self.assertGreater(max(xs), max(q[0] for q in cl[len(cl) // 2 :]) - 1)
        # Hook lives at the small-x end; lip at mid-x; back continues further.
        self.assertLess(min(xs), 1.0)

    def test_wide_scales_only_width(self):
        a = g.ClipParams()
        b = g.ClipParams(width=76.0)
        pa, _, fa = g.mesh_for(a)
        pb, _, fb = g.mesh_for(b)
        self.assertEqual(len(pa), len(pb))
        self.assertAlmostEqual(g.mesh_volume(fb) / g.mesh_volume(fa), 76.0 / 20.0, places=2)

    def test_js_port_matches_python_defaults(self):
        import subprocess

        py_faces = g.mesh_for(g.ClipParams())[2]
        py_vol = g.mesh_volume(py_faces)
        out = subprocess.check_output(
            [
                "node",
                "--input-type=module",
                "-e",
                "import { meshFor } from './clip.js'; const m = meshFor(); "
                "process.stdout.write(`${m.faces.length} ${m.volume}`)",
            ],
            cwd=ROOT,
            text=True,
        )
        n, vol = out.split()
        self.assertEqual(int(n), len(py_faces))
        self.assertAlmostEqual(float(vol), py_vol, places=3)

    def test_exported_stls_exist(self):
        for name in ("postit-wall-clip.stl", "postit-wall-clip-wide.stl"):
            path = ROOT / name
            self.assertTrue(path.is_file(), name)
            count = stl_tri_count(path)
            self.assertGreater(count, 500)
            self.assertLess(count, 20_000)


if __name__ == "__main__":
    unittest.main()
