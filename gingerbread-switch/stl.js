import { derive, PLATE_H, PLATE_R, PLATE_W, SCREW_BORE, SCREW_D, SCREW_STOCK } from "./geometry.js";
import { meshesTo3mf } from "./threemf.js";

const SINK = 0.08;
const ICING_H = 1.35;

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

function assertOk(solid, label) {
  const status = solid.status ? solid.status() : "NoError";
  if (status && status !== "NoError") throw new Error(`${label} manifold error: ${status}`);
  return solid;
}

function keep(temps, item) {
  temps.push(item);
  return item;
}

function unionAll(items, temps) {
  let acc = items[0];
  for (let i = 1; i < items.length; i++) acc = keep(temps, acc.add(items[i]));
  return acc;
}

function roundedRect(CS, w, h, r, segs, temps) {
  const core = keep(temps, CS.square([Math.max(0.4, w - 2 * r), Math.max(0.4, h - 2 * r)], true));
  return keep(temps, core.offset(r, "Round", 2, segs));
}

function stadium(CS, w, h, segs, temps) {
  const r = w / 2;
  const straight = Math.max(0.4, h - w);
  const mid = keep(temps, CS.square([w, straight], true));
  const top = keep(temps, CS.circle(r, segs).translate([0, straight / 2]));
  const bot = keep(temps, CS.circle(r, segs).translate([0, -straight / 2]));
  return unionAll([mid, top, bot], temps);
}

function openingOf(CS, d, segs, temps) {
  const { openingW, openingH, style } = d.p;
  if (style === "rocker") return roundedRect(CS, openingW, openingH, 2.4, segs, temps);
  return stadium(CS, openingW, openingH, segs, temps);
}

function poly(CS, points, temps) {
  return keep(temps, CS.ofPolygons([points], "NonZero"));
}

function scaleAbout(points, s) {
  let cx = 0;
  let cy = 0;
  for (const [x, y] of points) {
    cx += x;
    cy += y;
  }
  cx /= points.length;
  cy /= points.length;
  return points.map(([x, y]) => [cx + (x - cx) * s, cy + (y - cy) * s]);
}

function extrudeZ(section, z0, z1, temps) {
  const h = Math.max(0.04, z1 - z0);
  const solid = keep(temps, section.extrude(h));
  return z0 ? keep(temps, solid.translate([0, 0, z0])) : solid;
}

function slab(CS, x, y, w, h, temps) {
  const s = keep(temps, CS.square([w, h], true));
  return keep(temps, s.translate([x, y]));
}

function dripCenters(d) {
  const { eaveX, eaveY, peakY } = d;
  const spots = [];
  const steps = 8;
  for (const side of [-1, 1]) {
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const x = side * eaveX * t;
      const y = peakY + (eaveY - peakY) * t;
      const radius = 2.6 + (i % 3) * 0.9;
      spots.push([x, y, radius]);
    }
  }
  return spots;
}

function peppermintCenters(d) {
  const { eaveX, eaveY, peakY } = d;
  let cx = 0;
  let cy = 0;
  for (const [x, y] of d.roof) {
    cx += x;
    cy += y;
  }
  cx /= 3;
  cy /= 3;
  const spots = [];
  for (const side of [-1, 1]) {
    for (const t of [0.46, 0.64, 0.82]) {
      const x = side * eaveX * t;
      const y = peakY + (eaveY - peakY) * t;
      const dx = cx - x;
      const dy = cy - y;
      const len = Math.hypot(dx, dy) || 1;
      const inset = 13;
      spots.push([x + (dx / len) * inset, y + (dy / len) * inset]);
    }
  }
  return spots;
}

function windowCenters(d) {
  if (!d.showWindows) return [];
  return [
    [-23, -2],
    [23, -2],
  ];
}

/**
 * Three meshes, one coordinate system. Back is flat on z=0 so it sits on the
 * wall and prints face-up. Gingerbread is the plate plus the house. Icing and
 * candy are separate so they can be another color, sunk slightly into the face.
 */
export function buildParts(wasm, raw, temps, segs) {
  const { CrossSection, Manifold } = wasm;
  const d = derive(raw);
  const CS = CrossSection;

  const plate = roundedRect(CS, PLATE_W, PLATE_H, PLATE_R, segs, temps);
  const wallH = d.eaveY - d.wallBottom;
  const wall = keep(
    temps,
    CS.square([d.wallHW * 2, wallH], true).translate([0, (d.eaveY + d.wallBottom) / 2])
  );
  const roof = poly(CS, d.roof, temps);
  const chim = d.chimney;
  const chimney = keep(
    temps,
    CS.square([chim.x1 - chim.x0, chim.y1 - chim.y0], false).translate([chim.x0, chim.y0])
  );
  const house = unionAll([wall, roof, chimney], temps);
  const innerRoof = poly(CS, scaleAbout(d.roof, 0.6), temps);
  const roofBand = keep(temps, roof.subtract(innerRoof));

  const door = openingOf(CS, d, segs, temps);
  const doorFrame = keep(temps, door.offset(3.4, "Round", 2, segs).subtract(door));

  const frames = [doorFrame];
  const paneBoxes = [];
  for (const [x, y] of windowCenters(d)) {
    const size = 13;
    const outer = slab(CS, x, y, size + 5.2, size + 5.2, temps);
    const hole = slab(CS, x, y, size, size, temps);
    frames.push(keep(temps, outer.subtract(hole)));
    const bar = 1.7;
    const pane = (size - bar) / 2;
    const shift = pane / 2 + bar / 2;
    for (const sx of [-1, 1]) {
      for (const sy of [-1, 1]) {
        paneBoxes.push([x + sx * shift, y + sy * shift, pane, pane]);
      }
    }
  }
  const icingFlat = unionAll(frames, temps);

  const ginger2d = unionAll([plate, house], temps);
  let ginger = unionAll(
    [
      extrudeZ(ginger2d, 0, d.wallFront, temps),
      extrudeZ(roofBand, d.wallFront - SINK, d.roofFront, temps),
      extrudeZ(chimney, d.wallFront - SINK, d.chimZ, temps),
    ],
    temps
  );

  const cuts = [];
  const bore = [];
  const holeR = SCREW_D / 2;
  const boreR = SCREW_BORE / 2;
  for (const sy of [-1, 1]) {
    const at = [0, sy * d.screwY];
    cuts.push(keep(temps, CS.circle(holeR, segs).translate(at)));
    bore.push(keep(temps, CS.circle(boreR, segs).translate(at)));
  }
  const holes = unionAll(cuts, temps);
  const bores = unionAll(bore, temps);
  ginger = keep(temps, ginger.subtract(extrudeZ(holes, -1, d.chimZ + 8, temps)));
  ginger = keep(temps, ginger.subtract(extrudeZ(bores, SCREW_STOCK, d.chimZ + 8, temps)));
  ginger = keep(temps, ginger.subtract(extrudeZ(door, -1, d.chimZ + 8, temps)));
  for (const [x, y, w, h] of paneBoxes) {
    const pane = slab(CS, x, y, w, h, temps);
    ginger = keep(temps, ginger.subtract(extrudeZ(pane, d.wallFront - 1.35, d.wallFront + 1, temps)));
  }

  const { x0, x1, y0, y1 } = chim;
  const coversChimney = (x, y, pad) => x > x0 - pad && x < x1 + pad && y > y0 - pad && y < y1 + pad;
  const drips = dripCenters(d)
    .filter(([x, y, r]) => !coversChimney(x, y, r))
    .map(([x, y, r]) => keep(temps, CS.circle(r, Math.max(12, segs >> 1)).translate([x, y])));
  const cap = keep(temps, CS.square([Math.max(4, x1 - x0 - 3), 7], false).translate([x0 + 1.5, y1 - 6]));
  const mints = peppermintCenters(d).filter(([x, y]) => !coversChimney(x, y, 5));
  const stripes = mints.map(([x, y]) => slab(CS, x, y, 8.2, 1.55, temps));
  const roofIcing = keep(temps, roofBand.subtract(chimney));
  let icing = unionAll(
    [
      extrudeZ(roofIcing, d.roofFront - SINK, d.roofFront + ICING_H, temps),
      extrudeZ(cap, d.chimZ - SINK, d.chimZ + ICING_H, temps),
      extrudeZ(icingFlat, d.wallFront - SINK, d.wallFront + ICING_H, temps),
      extrudeZ(unionAll(drips, temps), d.wallFront - SINK, d.roofFront + ICING_H, temps),
      ...(stripes.length ? [extrudeZ(unionAll(stripes, temps), d.wallFront + 1.45, d.wallFront + 2.6, temps)] : []),
    ],
    temps
  );
  icing = keep(temps, icing.subtract(extrudeZ(holes, -1, d.chimZ + 8, temps)));
  icing = keep(temps, icing.subtract(extrudeZ(door, -1, d.chimZ + 8, temps)));

  const candyParts = [];
  for (const [x, y] of mints) {
    const disc = keep(temps, CS.circle(4.4, segs).translate([x, y]));
    candyParts.push(extrudeZ(disc, d.wallFront - SINK, d.wallFront + 2.1, temps));
  }
  // Gumdrops beside the door. A short stack of circles stands in for a sugar drop.
  if (d.p.style === "toggle") {
    for (const sx of [-1, 1]) {
      const x = sx * (d.p.openingW / 2 + 8.5);
      const y = -d.p.openingH / 2 + 6;
      const blob = keep(temps, CS.circle(4.6, segs).translate([x, y]));
      candyParts.push(extrudeZ(blob, d.wallFront - SINK, d.wallFront + 2.2, temps));
      const ball = keep(temps, Manifold.sphere(4.2, Math.max(16, segs)));
      const dome = keep(temps, ball.scale([1, 0.92, 0.62]));
      candyParts.push(keep(temps, dome.translate([x, y, d.wallFront + 2.4])));
    }
  }
  let candy = unionAll(candyParts, temps);
  candy = keep(temps, candy.subtract(extrudeZ(holes, -1, d.chimZ + 8, temps)));
  candy = keep(temps, candy.subtract(extrudeZ(door, -1, d.chimZ + 8, temps)));

  ginger = assertOk(ginger, "gingerbread");
  icing = assertOk(icing, "icing");
  candy = assertOk(candy, "candy");
  return { gingerbread: ginger, icing, candy, d };
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
    genus: typeof solid.genus === "function" ? solid.genus() : null,
    tris: mesh.triVerts.length / 3,
    positions: manifoldMeshToPositions(mesh),
    mesh: keepMesh ? copyMesh(mesh) : null,
  };
}

export async function buildTag(raw, { quality = "preview" } = {}) {
  const wasm = await loadManifold();
  const segs = quality === "export" ? 48 : 24;
  if (typeof wasm.setCircularSegments === "function") wasm.setCircularSegments(segs);
  const temps = [];
  try {
    const partsIn = buildParts(wasm, raw, temps, segs);
    const keepMesh = quality === "export";
    const parts = {
      gingerbread: pack(partsIn.gingerbread, "gingerbread", keepMesh),
      icing: pack(partsIn.icing, "icing", keepMesh),
      candy: pack(partsIn.candy, "candy", keepMesh),
    };
    const volume = parts.gingerbread.volume + parts.icing.volume + parts.candy.volume;
    const tris = parts.gingerbread.tris + parts.icing.tris + parts.candy.tris;
    const named = ["gingerbread", "icing", "candy"].map((name) => ({ name, mesh: parts[name].mesh }));
    return {
      d: partsIn.d,
      parts,
      volume,
      tris,
      threemf: keepMesh ? meshesTo3mf(named) : null,
    };
  } finally {
    deleteAll(temps);
  }
}

export async function buildTagStls(raw) {
  return buildTag(raw, { quality: "export" });
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `gingerbread-switch ${name}`.slice(0, 79);
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
