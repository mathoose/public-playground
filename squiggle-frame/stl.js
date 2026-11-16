import { derive } from "./geometry.js";
import { meshesTo3mf } from "../shared/threemf.js";

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

function captureMesh(mesh) {
  return {
    numProp: mesh.numProp || 3,
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
  };
}

const SHELF_Z = 0.95;
const SLOT_H = 0.62;
const LIP_H = 1.15;
const RIDGE = 0.2;

function radialSection(CS, theta, r0, r1, halfLen, temps) {
  const rx = Math.cos(theta);
  const ry = Math.sin(theta);
  const tx = -ry;
  const ty = rx;
  const at = (r, along) => [rx * r + tx * along, ry * r + ty * along];
  const corners = [at(r0, -halfLen), at(r1, -halfLen), at(r1, halfLen), at(r0, halfLen)];
  let area = 0;
  for (let i = 0; i < corners.length; i++) {
    const j = (i + 1) % corners.length;
    area += corners[i][0] * corners[j][1] - corners[j][0] * corners[i][1];
  }
  if (area < 0) corners.reverse();
  return keep(temps, CS.ofPolygons([corners]));
}

function extrudeAt(section, height, z0, temps) {
  const solid = keep(temps, section.extrude(Math.max(0.12, height)));
  return z0 ? keep(temps, solid.translate([0, 0, z0])) : solid;
}

function buildPegSolid(wasm, peg, temps) {
  const { Manifold } = wasm;
  const r = peg.pegD / 2;
  const collarR = peg.collarD / 2;
  const plug = keep(temps, Manifold.cylinder(peg.plugLen, r, r, 28, false));
  const collar = keep(
    temps,
    Manifold.cylinder(peg.collarT, collarR, collarR, 28, false).translate([0, 0, peg.plugLen])
  );
  const leg = keep(
    temps,
    Manifold.cylinder(peg.legLen, r, r, 28, false).translate([0, 0, peg.plugLen + peg.collarT])
  );
  let solid = keep(temps, plug.add(collar));
  solid = keep(temps, solid.add(leg));
  return assertOk(solid, "Peg");
}

/** Plug runs +Z into a hole. Collar and leg hang out the back, −Z. */
function installedPegSolid(wasm, peg, temps) {
  const { Manifold } = wasm;
  const r = peg.pegD / 2;
  const collarR = peg.collarD / 2;
  const plug = keep(temps, Manifold.cylinder(peg.plugLen, r, r, 28, false));
  const collar = keep(temps, Manifold.cylinder(peg.collarT, collarR, collarR, 28, false).translate([0, 0, -peg.collarT]));
  const leg = keep(
    temps,
    Manifold.cylinder(peg.legLen, r, r, 28, false).translate([0, 0, -(peg.collarT + peg.legLen)])
  );
  let solid = keep(temps, plug.add(collar));
  solid = assertOk(keep(temps, solid.add(leg)), "Installed peg");
  return solid;
}

function installedPegMesh(wasm, peg, temps) {
  return captureMesh(installedPegSolid(wasm, peg, temps).getMesh());
}

/** Both pegs on the bed, beside the frame, axis along X. */
function printPegMesh(wasm, peg, d, temps) {
  const solid = buildPegSolid(wasm, peg, temps);
  let laid = keep(temps, solid.rotate([0, 90, 0]));
  const box = laid.boundingBox();
  laid = keep(temps, laid.translate([0, 0, -box.min[2]]));
  const laidBox = laid.boundingBox();
  const gap = 8;
  const x0 = d.bounds.maxX + gap - laidBox.min[0];
  const y0 = -laidBox.max[1] - peg.collarD;
  const first = keep(temps, laid.translate([x0, y0, 0]));
  const second = keep(temps, first.translate([0, peg.collarD + 6, 0]));
  const both = assertOk(keep(temps, first.add(second)), "Pegs");
  return captureMesh(both.getMesh());
}

function occupies(wasm, solid, center, size, temps) {
  const probe = keep(temps, wasm.Manifold.cube(size, true).translate(center));
  const hit = keep(temps, solid.intersect(probe));
  return hit.volume() > size[0] * size[1] * size[2] * 0.2;
}

export async function buildFrame(raw, { quality = "preview" } = {}) {
  const d = derive(raw, quality);
  const wasm = await loadManifold();
  const { Manifold, CrossSection: CS } = wasm;
  const temps = [];
  try {
    let frame = assertOk(new Manifold(d.tube), "Squiggle");
    temps.push(frame);
    if (frame.volume() < 0) {
      const mesh = d.tube;
      const flipped = Uint32Array.from(mesh.triVerts);
      for (let i = 0; i < flipped.length; i += 3) {
        const tmp = flipped[i + 1];
        flipped[i + 1] = flipped[i + 2];
        flipped[i + 2] = tmp;
      }
      frame = assertOk(new Manifold({ ...mesh, triVerts: flipped }), "Squiggle");
      temps.push(frame);
    }

    const clipSolids = [];
    for (const clip of d.clips) {
      const slot = radialSection(
        CS,
        clip.theta,
        clip.uIn - 0.15,
        clip.uOut - 0.4,
        Math.max(1.2, clip.halfLen - 0.3),
        temps
      );
      const voidSolid = extrudeAt(slot, SLOT_H + 0.04, SHELF_Z - 0.02, temps);
      frame = assertOk(keep(temps, frame.subtract(voidSolid)), "Clip slot");

      const section = radialSection(CS, clip.theta, clip.uIn, clip.uOut, clip.halfLen, temps);
      const shelf = extrudeAt(section, SHELF_Z, 0, temps);
      const lip = extrudeAt(section, LIP_H, SHELF_Z + SLOT_H, temps);
      const ridgeSection = radialSection(
        CS,
        clip.theta,
        clip.uIn,
        Math.min(clip.uOut, clip.uIn + 1.35),
        Math.max(1.4, clip.halfLen - 1.1),
        temps
      );
      const ridge = extrudeAt(ridgeSection, RIDGE, SHELF_Z + SLOT_H - RIDGE, temps);
      let clipSolid = keep(temps, shelf.add(lip));
      clipSolid = keep(temps, clipSolid.add(ridge));
      clipSolids.push(clipSolid);
    }
    if (clipSolids.length) {
      let clips = clipSolids[0];
      for (let i = 1; i < clipSolids.length; i++) clips = keep(temps, clips.add(clipSolids[i]));
      frame = assertOk(keep(temps, frame.add(clips)), "Frame");
    }

    if (d.p.mode === "stand") {
      const holeR = d.peg.holeD / 2;
      for (const hole of d.holes) {
        const cutter = keep(
          temps,
          Manifold.cylinder(d.peg.holeDepth + 0.4, holeR, holeR, 36, false).translate([
            hole.x,
            hole.y,
            -0.25,
          ])
        );
        frame = assertOk(keep(temps, frame.subtract(cutter)), "Peg hole");
      }
    }

    const frameMesh = captureMesh(frame.getMesh());
    const pegInstalled = d.p.mode === "stand" ? installedPegMesh(wasm, d.peg, temps) : null;
    const pegPrint = d.p.mode === "stand" ? printPegMesh(wasm, d.peg, d, temps) : null;
    const frameVolume = frame.volume();
    const genus = frame.genus();
    const bbox = frame.boundingBox();

    const parts = {
      frame: { mesh: frameMesh, volume: frameVolume },
    };
    if (pegPrint) {
      const probe = keep(temps, new Manifold(pegPrint));
      parts.pegs = { mesh: pegPrint, volume: probe.volume() };
    }

    const named = [{ name: "Squiggle frame", color: "#C4B5FDFF", mesh: frameMesh }];
    if (pegPrint) named.push({ name: "Pegs", color: "#DDD6FEFF", mesh: pegPrint });
    const volume = parts.frame.volume + (parts.pegs ? parts.pegs.volume : 0);
    const tris = named.reduce((sum, part) => sum + part.mesh.triVerts.length / 3, 0);
    const threemf = meshesTo3mf(named, "Squiggle frame");
    const checks = sampleChecks(wasm, frame, d, temps);

    return {
      d,
      parts,
      pegInstalled,
      volume,
      tris,
      threemf,
      genus,
      bbox,
      checks,
    };
  } finally {
    deleteAll(temps);
  }
}

function sampleChecks(wasm, frame, d, temps) {
  const checks = {
    openingEmpty: !occupies(wasm, frame, [0, 0, d.section.height * 0.45], [1.2, 1.2, 0.8], temps),
    holesEmpty: true,
    roofsSolid: true,
  };
  if (d.clips[0]) {
    const clip = d.clips[0];
    const rx = Math.cos(clip.theta);
    const ry = Math.sin(clip.theta);
    const r = (clip.uIn + Math.min(clip.photoEdge, clip.uOut)) / 2;
    checks.slotEmpty = !occupies(wasm, frame, [rx * r, ry * r, SHELF_Z + SLOT_H * 0.45], [0.45, 0.45, 0.2], temps);
    checks.shelfSolid = occupies(wasm, frame, [rx * r, ry * r, SHELF_Z * 0.45], [0.45, 0.45, 0.3], temps);
    checks.ridgeSolid = occupies(
      wasm,
      frame,
      [rx * (clip.uIn + 0.45), ry * (clip.uIn + 0.45), SHELF_Z + SLOT_H - RIDGE * 0.4],
      [0.4, 0.4, 0.1],
      temps
    );
  }
  for (const hole of d.holes) {
    if (occupies(wasm, frame, [hole.x, hole.y, 1.1], [0.45, 0.45, 0.35], temps)) checks.holesEmpty = false;
    if (!occupies(wasm, frame, [hole.x, hole.y, d.section.height - 0.45], [0.5, 0.5, 0.3], temps)) checks.roofsSolid = false;
  }
  return checks;
}

export async function buildExport(raw) {
  const built = await buildFrame(raw, { quality: "export" });
  const stls = {
    frame: meshToStl(built.parts.frame.mesh, "squiggle-frame"),
  };
  if (built.parts.pegs) stls.pegs = meshToStl(built.parts.pegs.mesh, "squiggle-pegs");
  return { ...built, stls };
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `squiggle-frame ${name}`.slice(0, 79);
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

export const CLIP_SLOT = { shelfZ: SHELF_Z, slotH: SLOT_H, lipH: LIP_H };
