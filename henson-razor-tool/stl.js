import { BLADE_LENGTH, BLADE_WIDTH, HANDLE_LENGTH, derive } from "./geometry.js";

const MANIFOLD_JS = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.js";
const MANIFOLD_WASM = "https://cdn.jsdelivr.net/npm/manifold-3d@3.2.1/manifold.wasm";

let wasmPromise = null;

export async function loadManifold() {
  if (!wasmPromise) {
    const spec = typeof window !== "undefined" ? MANIFOLD_JS : "manifold-3d";
    wasmPromise = import(/* @vite-ignore */ spec)
      .catch(() => import(/* @vite-ignore */ MANIFOLD_JS))
      .then((mod) => {
        const Module = mod.default || mod;
        const inBrowser = typeof window !== "undefined";
        return Module(
          inBrowser
            ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) }
            : {}
        );
      })
      .then((wasm) => {
        wasm.setup();
        return wasm;
      });
  }
  return wasmPromise;
}

function deleteAll(items) {
  for (const item of items) {
    if (item && typeof item.delete === "function") {
      try {
        item.delete();
      } catch {
        /* already freed */
      }
    }
  }
}

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function keep(temps, item) {
  temps.push(item);
  return item;
}

/** Rounded rectangle centered on the origin. */
function roundedRect(CrossSection, sx, sy, r, temps) {
  const rr = Math.max(0.05, Math.min(r, sx / 2 - 0.05, sy / 2 - 0.05));
  const sq = keep(temps, CrossSection.square([sx - 2 * rr, sy - 2 * rr], true));
  return keep(temps, sq.offset(rr, "Round"));
}

/** Rounded-rect prism whose Y width scales from `sy` (bottom) to `syTop` (top). */
function taperedSlab(CrossSection, sx, sy, syTop, h, r, z, temps) {
  const cs = roundedRect(CrossSection, sx, sy, r, temps);
  const solid = keep(temps, cs.extrude(h, 0, 0, [1, syTop / sy]));
  return keep(temps, solid.translate(0, 0, z));
}

function ccw(points) {
  let a = 0;
  for (let i = 0; i < points.length; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[(i + 1) % points.length];
    a += x0 * y1 - x1 * y0;
  }
  return a >= 0 ? points : points.slice().reverse();
}

function arc(cx, cy, r, a0, a1, n) {
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const a = a0 + ((a1 - a0) * i) / n;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

/**
 * Revolved body: bottom edge chamfered (no overhang on the bed), top edge rounded.
 * `boreBottom`/`boreTop` are radii (0 = solid).
 */
function revolvedBody(Manifold, { r, h, round, chamfer, boreBottom = 0, boreTop = 0, boreChamfer = 0 }, segs) {
  const rnd = Math.max(0, Math.min(round, h / 2 - 0.05, r - Math.max(boreBottom, boreTop) - 0.5));
  const ch = Math.max(0, Math.min(chamfer, h / 3));
  const pts = [];
  const bc = boreBottom > 0 ? Math.min(boreChamfer, h / 4) : 0;
  const tc = boreTop > 0 ? Math.min(boreChamfer, h / 4) : 0;
  pts.push([boreBottom > 0 ? boreBottom + bc : 0, 0]);
  pts.push([r - ch, 0]);
  if (ch > 0) pts.push([r, ch]);
  if (rnd > 0.05) {
    pts.push([r, h - rnd]);
    pts.push(...arc(r - rnd, h - rnd, rnd, 0, Math.PI / 2, 8).slice(1));
  } else {
    pts.push([r, h]);
  }
  if (boreTop > 0) {
    pts.push([boreTop + tc, h]);
    if (tc > 0) pts.push([boreTop, h - tc]);
    if (bc > 0) pts.push([boreBottom, bc]);
  } else {
    pts.push([0, h]);
  }
  return Manifold.revolve([ccw(pts)], segs);
}

function unionAll(Manifold, parts, temps) {
  if (!parts.length) return null;
  if (parts.length === 1) return parts[0];
  return keep(temps, Manifold.union(parts));
}

export function buildCradleSolid(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  const d = derive(raw);
  const p = d.p;
  const H = d.height;

  let solid = keep(
    temps,
    revolvedBody(Manifold, { r: d.puckR, h: H, round: d.edgeRound, chamfer: Math.min(0.8, d.edgeRound) }, segs * 3)
  );

  const cutters = [];
  cutters.push(
    taperedSlab(CrossSection, d.pocketL, d.pocketWBottom, d.pocketWTop, p.capDepth + 0.02, d.pocketR, p.floor, temps)
  );
  const upperZ = p.floor + p.capDepth;
  cutters.push(taperedSlab(CrossSection, d.upperL, d.upperW, d.upperW, H - upperZ + 1, d.upperR, upperZ, temps));
  if (d.leadIn > 0.05) {
    const a = keep(temps, roundedRect(CrossSection, d.upperL, d.upperW, d.upperR, temps).extrude(0.01));
    const a2 = keep(temps, a.translate(0, 0, H - d.leadIn));
    const b = keep(
      temps,
      roundedRect(CrossSection, d.upperL + 2 * d.leadIn + 0.2, d.upperW + 2 * d.leadIn + 0.2, d.upperR + d.leadIn, temps).extrude(0.01)
    );
    const b2 = keep(temps, b.translate(0, 0, H + 0.1));
    cutters.push(keep(temps, Manifold.hull([a2, b2])));
  }

  if (p.pushHoleD > 0.5) {
    const hr = Math.min(p.pushHoleD / 2, d.pocketWBottom / 2 - 1);
    const hole = keep(temps, Manifold.cylinder(p.floor + 2, hr, hr, segs, false).translate(0, 0, -1));
    cutters.push(hole);
    const cham = keep(temps, Manifold.cylinder(0.8, hr + 0.8, hr, segs, false).translate(0, 0, -0.01));
    cutters.push(cham);
  }

  if (p.notchW > 0.5) {
    const inner = d.pocketL / 2 - 3;
    const outer = d.puckR + 6;
    const r = Math.min(p.notchW / 2 - 0.05, 3);
    const cs = roundedRect(CrossSection, outer - inner, p.notchW, r, temps);
    const slab = keep(temps, cs.extrude(H - d.notchFloor + 1));
    for (const side of [-1, 1]) {
      const cx = side * (inner + (outer - inner) / 2);
      cutters.push(keep(temps, slab.translate(cx, 0, d.notchFloor)));
    }
  }

  if (p.gripRibs >= 3 && p.ribDepth > 0.05) {
    const ribR = Math.max(1.2, Math.min(4, (Math.PI * p.puckD) / p.gripRibs / 3.2));
    const centerR = d.puckR + ribR - p.ribDepth;
    for (let i = 0; i < p.gripRibs; i++) {
      const a = (2 * Math.PI * (i + 0.5)) / p.gripRibs;
      const c = keep(
        temps,
        Manifold.cylinder(H + 2, ribR, ribR, Math.max(12, Math.round(segs * 0.6)), false).translate(
          centerR * Math.cos(a),
          centerR * Math.sin(a),
          -1
        )
      );
      cutters.push(c);
    }
  }

  const cutter = unionAll(Manifold, cutters, temps);
  solid = keep(temps, solid.subtract(cutter));
  return assertOk(solid, "cradle");
}

export function buildGripSolid(wasm, raw, temps, segs) {
  const { Manifold } = wasm;
  const d = derive(raw);
  const p = d.p;
  const r = p.gripOD / 2;
  let solid = keep(
    temps,
    revolvedBody(
      Manifold,
      {
        r,
        h: p.gripLen,
        round: Math.min(1.5, p.edgeRound || 1.5),
        chamfer: 0.6,
        boreBottom: d.gripBoreBottom / 2,
        boreTop: d.gripBoreTop / 2,
        boreChamfer: 0.6,
      },
      segs * 2
    )
  );
  if (p.gripFlutes >= 3) {
    const fr = Math.max(1, Math.min(3, (Math.PI * p.gripOD) / p.gripFlutes / 3.4));
    const depth = Math.min(1.2, Math.max(0.3, d.gripWall - 1.6));
    const cr = r + fr - depth;
    const cutters = [];
    for (let i = 0; i < p.gripFlutes; i++) {
      const a = (2 * Math.PI * i) / p.gripFlutes;
      cutters.push(
        keep(
          temps,
          Manifold.cylinder(p.gripLen - 6, fr, fr, Math.max(12, Math.round(segs * 0.6)), false).translate(
            cr * Math.cos(a),
            cr * Math.sin(a),
            3
          )
        )
      );
    }
    solid = keep(temps, solid.subtract(unionAll(Manifold, cutters, temps)));
  }
  return assertOk(solid, "grip");
}

/** Translucent stand-in razor: head inverted in the cradle (cap down), handle up. */
export function buildGhost(wasm, raw, temps, segs) {
  const { Manifold, CrossSection } = wasm;
  const d = derive(raw);
  const p = d.p;
  const capH = Math.min(p.capDepth, 4);
  const z0 = p.floor + 0.05;
  const cap = taperedSlab(CrossSection, p.headLength, p.capTopWidth, p.headWidth, capH, p.headCornerR, z0, temps);
  const bladeZ = z0 + capH;
  const plateH = 3.8;
  const plate = taperedSlab(
    CrossSection,
    p.headLength,
    p.headWidth,
    Math.max(8, p.headWidth - 4),
    plateH,
    p.headCornerR,
    bladeZ + 0.25,
    temps
  );
  const neckZ = bladeZ + 0.25 + plateH;
  const neck = keep(temps, Manifold.cylinder(1.5, 5, 5, segs, false).translate(0, 0, neckZ));
  const handle = keep(
    temps,
    Manifold.cylinder(HANDLE_LENGTH, p.handleHeadD / 2, p.handleTailD / 2, segs, false).translate(0, 0, neckZ + 1.5)
  );
  const head = unionAll(Manifold, [cap, plate, neck, handle], temps);
  const blade = keep(
    temps,
    Manifold.cube([BLADE_LENGTH, BLADE_WIDTH, 0.25], true).translate(0, 0, bladeZ + 0.125)
  );
  return { head, blade };
}

export async function buildAll(raw, { quality = "preview", ghost = true } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 48 : 28;
  const d = derive(raw);
  const temps = [];
  try {
    const cradle = buildCradleSolid(wasm, raw, temps, segs);
    const grip = buildGripSolid(wasm, raw, temps, segs);
    const gripPlaced = keep(temps, grip.translate(d.gripOffsetX, 0, 0));
    const out = {
      d,
      cradleMesh: cradle.getMesh(),
      gripMesh: gripPlaced.getMesh(),
      cradleVolume: cradle.volume(),
      gripVolume: grip.volume(),
    };
    if (ghost) {
      const g = buildGhost(wasm, raw, temps, segs);
      out.ghostMesh = g.head.getMesh();
      out.bladeMesh = g.blade.getMesh();
    }
    out.cradleTris = out.cradleMesh.triVerts.length / 3;
    out.gripTris = out.gripMesh.triVerts.length / 3;
    return out;
  } finally {
    deleteAll(temps);
  }
}

export async function buildPartStl(raw, part) {
  const wasm = await loadManifold();
  const temps = [];
  try {
    const solid =
      part === "grip" ? buildGripSolid(wasm, raw, temps, 48) : buildCradleSolid(wasm, raw, temps, 48);
    const mesh = solid.getMesh();
    const volume = solid.volume();
    const name = part === "grip" ? "henson-handle-grip" : "henson-head-cradle";
    return { stl: meshToStl(mesh, name), volume, mesh, d: derive(raw) };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  const label = `henson-razor-tool ${name}`.slice(0, 79);
  for (let i = 0; i < label.length; i++) view.setUint8(i, label.charCodeAt(i));
  view.setUint32(80, triCount, true);

  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const v = [0, 1, 2].map((k) => triVerts[t * 3 + k] * stride);
    const [a, b, c] = v.map((i) => [vertProperties[i], vertProperties[i + 1], vertProperties[i + 2]]);
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const n = [e1[1] * e2[2] - e1[2] * e2[1], e1[2] * e2[0] - e1[0] * e2[2], e1[0] * e2[1] - e1[1] * e2[0]];
    const nl = Math.hypot(n[0], n[1], n[2]) || 1;
    for (let k = 0; k < 3; k++) view.setFloat32(o + k * 4, n[k] / nl, true);
    [a, b, c].forEach((pt, j) => {
      for (let k = 0; k < 3; k++) view.setFloat32(o + 12 + j * 12 + k * 4, pt[k], true);
    });
    view.setUint16(o + 48, 0, true);
    o += 50;
  }
  return buf;
}

export function manifoldMeshToPositions(mesh) {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const pos = new Float32Array(triVerts.length * 3);
  let i = 0;
  for (let t = 0; t < triVerts.length; t++) {
    const v = triVerts[t] * stride;
    pos[i++] = vertProperties[v];
    pos[i++] = vertProperties[v + 1];
    pos[i++] = vertProperties[v + 2];
  }
  return pos;
}

export function downloadArrayBuffer(filename, buffer) {
  const blob = new Blob([buffer], { type: "model/stl" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

export function stlTriangleCount(buffer) {
  if (buffer.byteLength < 84) return 0;
  return new DataView(buffer).getUint32(80, true);
}
