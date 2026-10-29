import { derive, eyeletCenter } from "./geometry.js";
import { meshesTo3mf } from "./threemf.js";

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
        return Module(inBrowser ? { locateFile: (path) => (path.endsWith(".wasm") ? MANIFOLD_WASM : path) } : {});
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

function addAll(items, temps) {
  let acc = items[0];
  for (let i = 1; i < items.length; i++) acc = keep(temps, acc.add(items[i]));
  return acc;
}

function sub(a, b, temps) {
  return keep(temps, a.subtract(b));
}

function roundedRect(CS, w, h, r, segs, temps) {
  const rr = Math.max(0.8, Math.min(r, w / 2 - 0.3, h / 2 - 0.3));
  const core = keep(temps, CS.square([Math.max(0.4, w - 2 * rr), Math.max(0.4, h - 2 * rr)], true));
  return keep(temps, core.offset(rr, "Round", 2, segs));
}

function annulus(CS, cx, cy, ro, ri, segs, temps) {
  const outer = keep(temps, CS.circle(ro, segs).translate([cx, cy]));
  const inner = keep(temps, CS.circle(ri, segs).translate([cx, cy]));
  return keep(temps, outer.subtract(inner));
}

function extrude(section, h, temps) {
  return keep(temps, section.extrude(Math.max(0.2, h)));
}

function box(Manifold, size, at, temps) {
  return keep(temps, Manifold.cube(size, true).translate(at));
}

function boneBar(CS, x0, x1, y, endR, midR, segs, temps) {
  const span = x1 - x0;
  if (span < endR * 2 + 1.2) {
    return keep(temps, CS.square([Math.max(0.6, span), midR * 2], true).translate([(x0 + x1) / 2, y]));
  }
  // Circle edges stay inside x0..x1, with a short bite so the bar fuses to the eye or hook.
  const left = keep(temps, CS.circle(endR, segs).translate([x0 + endR - 0.45, y]));
  const mid = keep(temps, CS.circle(midR, segs).translate([(x0 + x1) / 2, y]));
  const right = keep(temps, CS.circle(endR, segs).translate([x1 - endR + 0.45, y]));
  return keep(temps, CS.hull(left, mid, right));
}

/**
 * One bone link. Eye at x0, hook centered on the next eye.
 * Links after the first send a narrow neck out through the previous gate.
 */
export function buildLinkSolid(wasm, metrics, index, x0, y, segs, temps) {
  const { CrossSection: CS, Manifold } = wasm;
  const m = metrics;
  const hx = x0 + m.pitch;
  const eye = extrude(annulus(CS, x0, y, m.eyeR, m.eyeRi, segs, temps), m.thick, temps);
  let hook = extrude(annulus(CS, hx, y, m.hookR, m.hookRi, segs, temps), m.thick, temps);
  const gate = box(
    Manifold,
    [m.wall + 1.4, m.gate, m.thick + 2],
    [hx + m.hookRi + m.wall / 2, y, m.thick / 2],
    temps
  );
  hook = sub(hook, gate, temps);

  const parts = [eye, hook];
  const shaftEnd = hx - m.hookR + m.fuse;
  const endR = m.boneW / 2;
  const midR = Math.max(1.55, endR * 0.62);
  if (index === 0) {
    const x1 = x0 + m.eyeR - 1.3;
    const profile = boneBar(CS, x1, shaftEnd, y, endR, midR, segs, temps);
    parts.push(extrude(profile, m.thick, temps));
  } else {
    const neck1 = x0 + m.eyeR - 0.8;
    const neck2 = x0 + m.hookR + 0.45;
    const neckLen = Math.max(0.8, neck2 - neck1);
    parts.push(box(Manifold, [neckLen, m.neckW, m.thick], [neck1 + neckLen / 2, y, m.thick / 2], temps));
    const wide1 = x0 + m.hookR + 0.05;
    const profile = boneBar(CS, wide1, shaftEnd, y, endR, midR, segs, temps);
    parts.push(extrude(profile, m.thick, temps));
  }
  return assertOk(addAll(parts, temps), `link ${index}`);
}

function buildClaspSolid(wasm, metrics, x, y, segs, temps) {
  const handle = metrics.boneShaft + 16;
  const pitch = handle + 2 * metrics.hookR;
  return buildLinkSolid(wasm, { ...metrics, boneShaft: handle, pitch }, 0, x, y, segs, temps);
}

function latticeCutters(Manifold, d, face, temps) {
  const plan = d.lattice;
  if (!plan.xs.length || !plan.rows.length) return null;
  const boxes = [];
  const depth = face === "back" ? (d.backT || d.wall) + 3 : d.wall + 3;
  for (const row of plan.rows) {
    const z = row + plan.slotH / 2;
    for (const x of plan.xs) {
      for (const sign of [1, -1]) {
        if (face === "front" || face === "back") {
          const y = face === "front" ? d.outerD / 2 + 0.4 - depth / 2 : -d.outerD / 2 - 0.4 + depth / 2;
          boxes.push(box(Manifold, [plan.slotW, depth, plan.slotH], [sign * x, y, z], temps));
        }
      }
    }
  }
  if (!boxes.length) return null;
  return addAll(boxes, temps);
}

function eyeletSolid(wasm, d, side, segs, temps) {
  const { CrossSection: CS } = wasm;
  const c = eyeletCenter(d, side);
  const m = d.link;
  const section = annulus(CS, 0, 0, m.eyeR, m.eyeRi, segs, temps);
  let solid = keep(temps, section.extrude(m.thick, 0, 0, [1, 1], true));
  solid = keep(temps, solid.rotate([90, 0, 0]));
  solid = keep(temps, solid.translate([c.x, c.y, c.z]));
  return solid;
}

function ribXs(plan) {
  const xs = [];
  for (const x of plan.xs) {
    const outer = x + plan.slotW / 2 + plan.ribW / 2;
    xs.push(outer, -outer);
  }
  return xs;
}

function ribBones(wasm, d, face, segs, temps) {
  if (face === "front" && d.mode === "phone") return null;
  const plan = d.lattice;
  if (!plan.xs.length) return null;
  const { Manifold } = wasm;
  const y = face === "front" ? d.outerD / 2 - 0.35 : -(d.outerD / 2) + (d.backT ? d.backT * 0.45 : 0.35);
  const z0 = Math.max(d.floor + 1, d.bowlTop - (face === "front" ? 2 : 0));
  const z1 = d.rimBottom + 0.4;
  const h = z1 - z0;
  if (h < 6) return null;
  const radius = face === "front" ? 2.05 : 1.65;
  const bits = [];
  const centers = face === "front" ? [0, ...ribXs(plan)] : ribXs(plan);
  for (const x of centers) {
    bits.push(keep(temps, Manifold.cylinder(h, radius, radius, segs, false).translate([x, y, z0])));
  }
  if (face === "front") {
    const knobY = d.outerD / 2 + 0.2;
    const knobZ = d.rimBottom + 0.15;
    for (const x of centers) {
      const knob = Math.abs(x) < 0.1 ? 2.2 : 1.75;
      bits.push(keep(temps, Manifold.sphere(knob, segs).translate([x, knobY, knobZ])));
    }
  }
  return addAll(bits, temps);
}

function tailSolid(wasm, d, segs, temps) {
  const { CrossSection: CS } = wasm;
  const y0 = d.outerD / 2 - 2.4;
  const reach = Math.min(18, Math.max(12, d.outerD * 0.35));
  const y1 = y0 + reach;
  const bulb = keep(temps, CS.circle(4.3, segs));
  const a = keep(temps, bulb.translate([0, y0]));
  const b = keep(temps, bulb.translate([0, y1]));
  const mid = keep(temps, CS.square([3.6, Math.max(1, y1 - y0)], true).translate([0, (y0 + y1) / 2]));
  const profile = addAll([a, b, mid], temps);
  return extrude(profile, 3.3, temps);
}

function bagBody(wasm, d, segs, temps) {
  const { CrossSection: CS, Manifold } = wasm;
  const outer = extrude(roundedRect(CS, d.outerW, d.outerD, d.corner, segs, temps), d.outerH, temps);
  const innerR = Math.max(1.2, d.corner - d.wall);
  const inner = keep(
    temps,
    extrude(roundedRect(CS, d.innerW, d.innerD, innerR, segs, temps), d.innerH + 30, temps).translate([0, 0, d.floor])
  );
  let body = sub(outer, inner, temps);
  const front = latticeCutters(Manifold, d, "front", temps);
  const back = latticeCutters(Manifold, d, "back", temps);
  if (front) body = sub(body, front, temps);
  if (back) body = sub(body, back, temps);
  const ribs = [ribBones(wasm, d, "front", segs, temps), ribBones(wasm, d, "back", segs, temps)].filter(Boolean);
  body = addAll(
    [body, ...ribs, tailSolid(wasm, d, segs, temps), eyeletSolid(wasm, d, 1, segs, temps), eyeletSolid(wasm, d, -1, segs, temps)],
    temps
  );
  return assertOk(body, "body");
}

function phoneBody(wasm, d, segs, temps) {
  const { CrossSection: CS, Manifold } = wasm;
  const outer = extrude(roundedRect(CS, d.outerW, d.outerD, d.corner, segs, temps), d.outerH, temps);
  const cavity = box(Manifold, [d.cavityW, d.cavityD, d.cavityH + 24], [0, -d.outerD / 2 + d.backT + d.cavityD / 2, d.floor + (d.cavityH + 24) / 2], temps);
  let body = sub(outer, cavity, temps);
  const windowW = Math.max(8, d.cavityW - 2 * d.lip);
  const window = box(
    Manifold,
    [windowW, d.lipT + 4, d.outerH],
    [0, d.outerD / 2 + 0.2, d.outerH / 2 + 0.4],
    temps
  );
  body = sub(body, window, temps);
  const back = latticeCutters(Manifold, d, "back", temps);
  if (back) body = sub(body, back, temps);
  const backRibs = ribBones(wasm, d, "back", segs, temps);
  if (backRibs) body = addAll([body, backRibs], temps);
  const railR = 1.7;
  const railH = Math.max(8, d.outerH - d.floor);
  const railY = d.outerD / 2 - d.lipT * 0.2;
  const railX = d.cavityW / 2 - d.lip + railR * 0.15;
  for (const sign of [1, -1]) {
    body = addAll(
      [body, keep(temps, Manifold.cylinder(railH, railR, railR, segs, false).translate([sign * railX, railY, d.floor]))],
      temps
    );
  }
  body = addAll([body, eyeletSolid(wasm, d, 1, segs, temps), eyeletSolid(wasm, d, -1, segs, temps)], temps);
  return assertOk(body, "phone cage");
}

function placeHardware(wasm, body, d, segs, temps) {
  const bb = body.boundingBox();
  const m = d.link;
  const startX = bb.max[0] + 6 + m.eyeR;
  const links = [];
  for (let i = 0; i < d.p.links; i++) {
    links.push(buildLinkSolid(wasm, m, i, startX + i * m.pitch, 0, segs, temps));
  }
  const chain = assertOk(addAll(links, temps), "chain");
  const claspY = bb.max[1] + m.hookR + 8;
  const claspPitch = m.boneShaft + 16 + 2 * m.hookR;
  const claspX = bb.min[0] + m.eyeR;
  const clasp1 = buildClaspSolid(wasm, m, claspX, claspY, segs, temps);
  const clasp2 = buildClaspSolid(wasm, m, claspX + claspPitch + m.hookR + m.eyeR + 6, claspY, segs, temps);
  const clasps = assertOk(addAll([clasp1, clasp2], temps), "clasps");
  return { chain, clasps, links };
}

export function buildParts(wasm, raw, temps, segs) {
  const d = derive(raw);
  const body = d.mode === "phone" ? phoneBody(wasm, d, segs, temps) : bagBody(wasm, d, segs, temps);
  const hardware = placeHardware(wasm, body, d, segs, temps);
  return { d, body, chain: hardware.chain, clasps: hardware.clasps, linkSolids: hardware.links };
}

function copyMesh(mesh) {
  return {
    numProp: mesh.numProp || 3,
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
  };
}

function pack(solid, name, keepMesh) {
  const mesh = solid.getMesh();
  return {
    stl: meshToStl(mesh, name),
    volume: solid.volume(),
    tris: mesh.triVerts.length / 3,
    positions: manifoldMeshToPositions(mesh),
    mesh: keepMesh ? copyMesh(mesh) : null,
    bounds: boundsOf(manifoldMeshToPositions(mesh)),
  };
}

export async function buildBag(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 40 : 18;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const temps = [];
  try {
    const built = buildParts(wasm, raw, temps, segs);
    const keepMesh = quality === "export";
    const parts = {
      body: pack(built.body, "body", keepMesh),
      chain: pack(built.chain, "chain", keepMesh),
      clasp: pack(built.clasps, "clasp", keepMesh),
    };
    const named = ["body", "chain", "clasp"].map((name) => ({ name, mesh: parts[name].mesh }));
    const volume = parts.body.volume + parts.chain.volume + parts.clasp.volume;
    const tris = parts.body.tris + parts.chain.tris + parts.clasp.tris;
    return {
      d: built.d,
      parts,
      volume,
      tris,
      threemf: keepMesh ? meshesTo3mf(named, built.d.mode === "phone" ? "Bone phone cage" : "Bone side bag") : null,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildBagStls(raw) {
  return buildBag(raw, { quality: "export" });
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `bone-side-bag ${name}`.slice(0, 79);
  for (let i = 0; i < label.length; i++) header[i] = label.charCodeAt(i);
  const buf = new ArrayBuffer(84 + triCount * 50);
  const view = new DataView(buf);
  new Uint8Array(buf, 0, 80).set(header);
  view.setUint32(80, triCount, true);
  let o = 84;
  for (let t = 0; t < triCount; t++) {
    const i0 = triVerts[t * 3] * stride;
    const i1 = triVerts[t * 3 + 1] * stride;
    const i2 = triVerts[t * 3 + 2] * stride;
    const ax = vertProperties[i0];
    const ay = vertProperties[i0 + 1];
    const az = vertProperties[i0 + 2];
    const bx = vertProperties[i1];
    const by = vertProperties[i1 + 1];
    const bz = vertProperties[i1 + 2];
    const cx = vertProperties[i2];
    const cy = vertProperties[i2 + 1];
    const cz = vertProperties[i2 + 2];
    let nx = (by - ay) * (cz - az) - (bz - az) * (cy - ay);
    let ny = (bz - az) * (cx - ax) - (bx - ax) * (cz - az);
    let nz = (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
    const nl = Math.hypot(nx, ny, nz) || 1;
    view.setFloat32(o, nx / nl, true);
    view.setFloat32(o + 4, ny / nl, true);
    view.setFloat32(o + 8, nz / nl, true);
    view.setFloat32(o + 12, ax, true);
    view.setFloat32(o + 16, ay, true);
    view.setFloat32(o + 20, az, true);
    view.setFloat32(o + 24, bx, true);
    view.setFloat32(o + 28, by, true);
    view.setFloat32(o + 32, bz, true);
    view.setFloat32(o + 36, cx, true);
    view.setFloat32(o + 40, cy, true);
    view.setFloat32(o + 44, cz, true);
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

export function downloadArrayBuffer(filename, buffer, mime = "model/stl") {
  const blob = new Blob([buffer], { type: mime });
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

export function boundsOf(positions) {
  const b = { min: [Infinity, Infinity, Infinity], max: [-Infinity, -Infinity, -Infinity] };
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = positions[i + k];
      if (v < b.min[k]) b.min[k] = v;
      if (v > b.max[k]) b.max[k] = v;
    }
  }
  return b;
}
