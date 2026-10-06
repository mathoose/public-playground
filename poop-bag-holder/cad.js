import { derive, slotPath } from "./geometry.js";

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
          inBrowser ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) } : {}
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

const QUALITY = {
  preview: { segs: 64, twistStep: 9, flankStep: 0.08 },
  export: { segs: 128, twistStep: 5, flankStep: 0.05 },
};

/**
 * Thread ridge cross-section at z = 0, centered on angle `phaseDeg`.
 * Axial width w at radius r maps to an angular width w / pitch × 360°, so a twisted
 * extrusion of this section is a helical ridge with a trapezoid (45° flank) axial profile.
 * widthAt(r) gives the axial width; r runs from rRoot (buried in the wall) to rTip.
 */
function threadSection(CrossSection, { rRoot, rFlank, rTip, widthAt, pitch, phaseDeg = 0, flankStep = 0.02 }) {
  const ang = (w) => (w / pitch) * Math.PI;
  const ph = (phaseDeg * Math.PI) / 180;
  const pts = [];
  const arc = (r, a0, a1, n) => {
    for (let i = 0; i <= n; i++) {
      const a = a0 + ((a1 - a0) * i) / n + ph;
      pts.push([r * Math.cos(a), r * Math.sin(a)]);
    }
  };
  const aRoot = ang(widthAt(rFlank));
  const flankN = Math.max(5, Math.ceil(Math.abs(aRoot - ang(widthAt(rTip))) / flankStep));
  arc(rRoot, -aRoot, aRoot, Math.max(8, Math.ceil(aRoot / 0.12)));
  for (let i = 0; i <= flankN; i++) {
    const r = rFlank + ((rTip - rFlank) * i) / flankN;
    const a = ang(widthAt(r)) + ph;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  const aTip = ang(widthAt(rTip));
  arc(rTip, aTip, -aTip, Math.max(2, Math.ceil((2 * aTip) / 0.08)));
  for (let i = flankN; i >= 0; i--) {
    const r = rFlank + ((rTip - rFlank) * i) / flankN;
    const a = -ang(widthAt(r)) + ph;
    pts.push([r * Math.cos(a), r * Math.sin(a)]);
  }
  // Root and tip arcs run in opposite directions; reverse if needed so the contour is CCW.
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % pts.length];
    area += x0 * y1 - x1 * y0;
  }
  if (area < 0) pts.reverse();
  return new CrossSection([pts]);
}

function helix(cs, z0, length, pitch, twistStep, temps) {
  const twist = (length / pitch) * 360;
  const div = Math.max(4, Math.ceil(twist / twistStep));
  const ex = cs.extrude(length, div, twist);
  temps.push(ex);
  const out = ex.translate(0, 0, z0);
  temps.push(out);
  return out;
}

function revolveProfile(CrossSection, pts, segs, temps) {
  const cs = new CrossSection([pts]);
  temps.push(cs);
  const m = cs.revolve(segs);
  temps.push(m);
  return m;
}

/**
 * Cut a 2D shape (u = arc length along the wall at radius Rb, v = height) radially through the wall.
 * Extrudes from rIn to rOut, then bends onto the cylinder around angle `angleDeg`.
 */
function wallCutter(cs, Rb, rIn, rOut, angleDeg, temps) {
  const ex = cs.extrude(rOut - rIn);
  temps.push(ex);
  const off = (angleDeg * Math.PI) / 180;
  const bent = ex.warp((v) => {
    const u = v[0];
    const h = v[1];
    const rr = rIn + v[2];
    const a = u / Rb + off;
    v[0] = rr * Math.cos(a);
    v[1] = rr * Math.sin(a);
    v[2] = h;
  });
  temps.push(bent);
  return bent;
}

function circlePts(cx, cy, r, n) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return pts;
}

/** Unwrapped outline of the pull window + S-slot (window centered at u = 0). */
function slotAndWindow(CrossSection, d, temps) {
  const p = d.p;
  const parts = [];
  const winPts = circlePts(0, d.winZ, d.winR, 48);
  if (p.winTeardrop) winPts.push([0, d.winZ + d.winR * Math.SQRT2]);
  const win = CrossSection.hull([new CrossSection([winPts])]);
  temps.push(win);
  parts.push(win);
  const path = slotPath(d, 28);
  const r = p.slotW / 2;
  for (let i = 0; i < path.length - 1; i++) {
    const a = circlePts(path[i][0], path[i][1], r, 16);
    const b = circlePts(path[i + 1][0], path[i + 1][1], r, 16);
    const seg = CrossSection.hull([new CrossSection([a]), new CrossSection([b])]);
    temps.push(seg);
    parts.push(seg);
  }
  const u = CrossSection.union(parts);
  temps.push(u);
  return u;
}

function rect(CrossSection, x0, y0, x1, y1, temps) {
  const cs = new CrossSection([
    [
      [x0, y0],
      [x1, y0],
      [x1, y1],
      [x0, y1],
    ],
  ]);
  temps.push(cs);
  return cs;
}

/** Keyring tab: radial fin with a 45° underside so it prints upright without support. */
function tabSolid(wasm, d, temps) {
  const { CrossSection, Manifold } = wasm;
  const p = d.p;
  const rWall = d.Rb - 0.6;
  const cx = d.tabCenterR;
  const cz = d.tabZ;
  const R = d.tabOuterR;
  const zLow = cz - R * Math.SQRT2 - (cx - rWall);
  const outline = circlePts(cx, cz, R, 48);
  outline.push([rWall, cz + R], [rWall, zLow]);
  const fin = CrossSection.hull([new CrossSection([outline])]);
  temps.push(fin);
  const hole = CrossSection.circle(d.holeR, 40).translate([cx, cz]);
  temps.push(hole);
  const cs = fin.subtract(hole);
  temps.push(cs);
  const ex = cs.extrude(p.tabT, 0, 0, [1, 1], true);
  temps.push(ex);
  // (x, y, z) -> (x, -z, y): profile x = radius, profile y = height, extrusion = tangential.
  const m = ex.transform([1, 0, 0, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 0, 0, 1]);
  temps.push(m);
  const rot = m.rotate([0, 0, p.tabAngle]);
  temps.push(rot);
  const floorClip = Manifold.cube([200, 200, 400], true).translate([0, 0, 200]);
  temps.push(floorClip);
  const out = rot.intersect(floorClip);
  temps.push(out);
  return out;
}

export function buildBodySolid(wasm, raw, temps, quality = "preview") {
  const { CrossSection, Manifold } = wasm;
  const q = QUALITY[quality] || QUALITY.preview;
  const d = derive(raw);
  const p = d.p;
  const { Rb, ri, bodyH } = d;
  const dep = p.threadDepth;
  const pitch = p.threadPitch;

  const outer = revolveProfile(
    CrossSection,
    [
      [0, 0],
      [Rb - 0.5, 0],
      [Rb, 0.5],
      [Rb, bodyH],
      [0, bodyH],
    ],
    q.segs,
    temps
  );
  const bore = Manifold.cylinder(bodyH, ri, ri, q.segs).translate([0, 0, p.floor]);
  temps.push(bore);
  const rimLead = Manifold.cylinder(0.8, ri, ri + 0.6, q.segs).translate([0, 0, bodyH - 0.79]);
  temps.push(rimLead);

  const wb = pitch * 0.8;
  const section = threadSection(CrossSection, {
    rRoot: Rb - 0.5,
    rFlank: Rb,
    rTip: Rb + dep,
    widthAt: (r) => Math.max(0.05, wb - 2 * (r - Rb)),
    pitch,
    flankStep: q.flankStep,
  });
  temps.push(section);
  const ridge = helix(section, d.threadBot, d.threadTop - d.threadBot, pitch, q.twistStep, temps);
  const lead = Math.min(dep + 0.3, (d.threadTop - d.threadBot) / 3);
  const clip = revolveProfile(
    CrossSection,
    [
      [0, d.threadBot],
      [Rb - 0.3, d.threadBot],
      [Rb + dep + 0.3, d.threadBot + lead],
      [Rb + dep + 0.3, d.threadTop - lead],
      [Rb - 0.3, d.threadTop],
      [0, d.threadTop],
    ],
    q.segs,
    temps
  );
  const thread = ridge.intersect(clip);
  temps.push(thread);

  const tab = tabSolid(wasm, d, temps);
  let solid = Manifold.union([outer, thread, tab]);
  temps.push(solid);
  solid = solid.subtract(bore).subtract(rimLead);
  temps.push(solid);

  const rIn = ri - 0.8;
  const rOut = Rb + dep + 1.5;
  const cuts = [wallCutter(slotAndWindow(CrossSection, d, temps), Rb, rIn, rOut, 0, temps)];
  if (p.squareW > 0) {
    const h = p.squareW / 2;
    cuts.push(wallCutter(rect(CrossSection, -h, d.squareZ - h, h, d.squareZ + h, temps), Rb, rIn, rOut, 180, temps));
  }
  const n = Math.round(p.rimNotches);
  const slotStartDeg = (d.slotSweep / Rb) * (180 / Math.PI);
  for (let k = 0; k < n; k++) {
    const ang = slotStartDeg + (360 * (k + 0.5)) / n;
    const w = p.notchW / 2;
    cuts.push(wallCutter(rect(CrossSection, -w, bodyH - p.notchD, w, bodyH + 2, temps), Rb, rIn, rOut, ang, temps));
  }
  const cutAll = Manifold.union(cuts);
  temps.push(cutAll);
  solid = solid.subtract(cutAll);
  temps.push(solid);
  return solid;
}

/** Cap in assembled position (ceiling sits on the body rim at z = bodyH). */
export function buildCapSolid(wasm, raw, temps, quality = "preview") {
  const { CrossSection, Manifold } = wasm;
  const q = QUALITY[quality] || QUALITY.preview;
  const d = derive(raw);
  const p = d.p;
  const { Rb, capBore, capR, capBottomZ, bodyH } = d;
  const z1 = bodyH + p.capTop;
  const dep = p.threadDepth;
  const clr = p.threadClear;
  const pitch = p.threadPitch;

  let shell;
  const ring = CrossSection.circle(capR, q.segs);
  temps.push(ring);
  if (p.knurlStyle === "smooth") {
    shell = ring.extrude(z1 - capBottomZ);
    temps.push(shell);
  } else {
    const n = Math.round(p.knurlCount);
    const grooves = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2;
      const c = CrossSection.circle(p.knurlDepth, 12).translate([capR * Math.cos(a), capR * Math.sin(a)]);
      temps.push(c);
      grooves.push(c);
    }
    const g = CrossSection.union(grooves);
    temps.push(g);
    const knurled = ring.subtract(g);
    temps.push(knurled);
    const h = z1 - capBottomZ;
    if (p.knurlStyle === "diamond") {
      const twist = ((h * Math.tan(Math.PI / 6)) / capR) * (180 / Math.PI);
      const div = Math.max(6, Math.ceil(h / 0.8));
      const a = knurled.extrude(h, div, twist);
      const b = knurled.extrude(h, div, -twist);
      temps.push(a, b);
      shell = a.intersect(b);
    } else {
      shell = knurled.extrude(h);
    }
    temps.push(shell);
  }
  shell = shell.translate([0, 0, capBottomZ]);
  temps.push(shell);
  const edges = revolveProfile(
    CrossSection,
    [
      [0, capBottomZ],
      [capR - 0.5, capBottomZ],
      [capR + 0.1, capBottomZ + 0.6],
      [capR + 0.1, z1 - 1.0],
      [capR - 0.9, z1],
      [0, z1],
    ],
    q.segs,
    temps
  );
  let cap = shell.intersect(edges);
  temps.push(cap);
  const bore = Manifold.cylinder(bodyH - capBottomZ + 1, capBore, capBore, q.segs).translate([0, 0, capBottomZ - 1]);
  temps.push(bore);
  cap = cap.subtract(bore);
  temps.push(cap);

  const tipR = Rb + clr;
  const section = threadSection(CrossSection, {
    rRoot: capBore + 0.5,
    rFlank: capBore,
    rTip: tipR,
    widthAt: (r) => Math.max(0.05, pitch - pitch * 0.8 + 2 * (r - tipR)),
    pitch,
    phaseDeg: 180,
    flankStep: q.flankStep,
  });
  temps.push(section);
  const zs = d.threadBot - pitch;
  const ridge = helix(section, zs, bodyH + 0.2 - zs, pitch, q.twistStep, temps);
  const lead = dep + 0.4;
  const clip = revolveProfile(
    CrossSection,
    [
      [capBore, capBottomZ + 0.4],
      [capBore + 0.6, capBottomZ + 0.4],
      [capBore + 0.6, bodyH + 0.2],
      [tipR - 0.4, bodyH + 0.2],
      [tipR - 0.4, capBottomZ + 0.4 + lead],
    ],
    q.segs,
    temps
  );
  const thread = ridge.intersect(clip);
  temps.push(thread);
  cap = Manifold.union([cap, thread]);
  temps.push(cap);
  const mouth = Manifold.cylinder(dep + 0.6, capBore + 0.5, tipR - 0.05, q.segs).translate([0, 0, capBottomZ - 0.01]);
  temps.push(mouth);
  cap = cap.subtract(mouth);
  temps.push(cap);
  return cap;
}

/** Cap flipped for printing: closed top on the bed, threads facing up. */
function capForPrint(cap, temps) {
  const flipped = cap.rotate([180, 0, 0]);
  temps.push(flipped);
  const bb = flipped.boundingBox();
  const out = flipped.translate([0, 0, -bb.min[2]]);
  temps.push(out);
  return out;
}

export async function buildHolder(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const temps = [];
  try {
    const d = derive(raw);
    const body = buildBodySolid(wasm, raw, temps, quality);
    const cap = buildCapSolid(wasm, raw, temps, quality);
    const bodyMesh = body.getMesh();
    const capMesh = cap.getMesh();
    return {
      d,
      bodyMesh,
      capMesh,
      bodyVolume: body.volume(),
      capVolume: cap.volume(),
      bodyGenus: body.genus(),
      bodyTris: bodyMesh.triVerts.length / 3,
      capTris: capMesh.triVerts.length / 3,
    };
  } finally {
    deleteAll(temps);
  }
}

const PART_NAMES = { body: "poop-bag-holder-body", cap: "poop-bag-holder-cap" };

export async function buildPartStl(raw, part) {
  const wasm = await loadManifold();
  const temps = [];
  try {
    let solid;
    if (part === "cap") solid = capForPrint(buildCapSolid(wasm, raw, temps, "export"), temps);
    else solid = buildBodySolid(wasm, raw, temps, "export");
    const status = solid.status ? solid.status() : "NoError";
    if (status && status !== "NoError") throw new Error(`${part} manifold error: ${status}`);
    const mesh = solid.getMesh();
    return { stl: meshToStl(mesh, PART_NAMES[part] || part), volume: solid.volume(), mesh, d: derive(raw) };
  } finally {
    deleteAll(temps);
  }
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const buf = new ArrayBuffer(84 + triCount * 50);
  const header = new Uint8Array(buf, 0, 80);
  const label = name.slice(0, 79);
  for (let i = 0; i < label.length; i++) header[i] = label.charCodeAt(i);
  const view = new DataView(buf);
  view.setUint32(80, triCount, true);
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const v = [0, 1, 2].map((k) => triVerts[t * 3 + k] * stride);
    const [a, b, c] = v.map((i) => [vertProperties[i], vertProperties[i + 1], vertProperties[i + 2]]);
    const e1 = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
    const e2 = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
    const nx = e1[1] * e2[2] - e1[2] * e2[1];
    const ny = e1[2] * e2[0] - e1[0] * e2[2];
    const nz = e1[0] * e2[1] - e1[1] * e2[0];
    const nl = Math.hypot(nx, ny, nz) || 1;
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
    for (let k = 0; k < 3; k++) {
      const pt = [a, b, c][k];
      view.setFloat32(o + 12 + k * 12, pt[0], true);
      view.setFloat32(o + 16 + k * 12, pt[1], true);
      view.setFloat32(o + 20 + k * 12, pt[2], true);
    }
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
