#!/usr/bin/env python3
import struct
import math

ARM_HALF = 28.833284635549546
CENTERS = [0, 90, 180, 270]
DECK = 5


def in_arm(ang):
    for c in CENTERS:
        d = (ang - c + 180) % 360 - 180
        if abs(d) <= ARM_HALF + 0.5:
            return True
    return False


def is_leg(t):
    if max(p[2] for p in t) <= DECK + 0.02:
        return False
    for x, y, z in t:
        if z <= DECK + 0.02:
            continue
        ang = math.degrees(math.atan2(y, x))
        if ang < 0:
            ang += 360
        if in_arm(ang):
            return True
    return False


def main():
    with open("coaster-base-v1.stl", "rb") as f:
        data = f.read()
    n = struct.unpack("<I", data[80:84])[0]
    triangles = []
    off = 84
    for _ in range(n):
        off += 12
        pts = [struct.unpack("<fff", data[off + 12 * j : off + 12 * j + 12]) for j in range(3)]
        off += 36
        off += 2
        if not is_leg(pts):
            triangles.append(pts)

    header = b"coaster core deck+letters" + b" " * (80 - 25)
    buf = bytearray(header[:80])
    buf += struct.pack("<I", len(triangles))
    for t in triangles:
        ax, ay, az = t[0]
        bx, by, bz = t[1]
        cx, cy, cz = t[2]
        e1 = (bx - ax, by - ay, bz - az)
        e2 = (cx - ax, cy - ay, cz - az)
        nx = e1[1] * e2[2] - e1[2] * e2[1]
        ny = e1[2] * e2[0] - e1[0] * e2[2]
        nz = e1[0] * e2[1] - e1[1] * e2[0]
        nl = (nx * nx + ny * ny + nz * nz) ** 0.5 or 1
        buf += struct.pack(
            "<ffffffffffffH",
            nx / nl,
            ny / nl,
            nz / nl,
            ax,
            ay,
            az,
            bx,
            by,
            bz,
            cx,
            cy,
            cz,
            0,
        )
    with open("coaster-core.stl", "wb") as out:
        out.write(buf)
    print(f"wrote coaster-core.stl {len(triangles)} tris")


if __name__ == "__main__":
    main()
