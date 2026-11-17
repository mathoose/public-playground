import { derive, profilePoints } from "./geometry.js";
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

function unionAll(items, temps) {
  let acc = items[0];
  for (let i = 1; i < items.length; i++) acc = keep(temps, acc.add(items[i]));
  return acc;
}

function roundedRect(CS, w, h, r, segs, temps) {
  const rr = Math.max(0, Math.min(r, w / 2 - 0.3, h / 2 - 0.3));
  if (rr < 0.4) return keep(temps, CS.square([w, h], true));
  const core = keep(temps, CS.square([Math.max(0.4, w - 2 * rr), Math.max(0.4, h - 2 * rr)], true));
  return keep(temps, core.offset(rr, "Round", 2, segs));
}

function shiftedProfile(pattern, flat, x, y) {
  return profilePoints(pattern, flat).map(([px, py]) => [px + x, py + y]);
}

function prism(CS, pattern, flat, height, x, y, z, temps) {
  const section = keep(temps, CS.ofPolygons([shiftedProfile(pattern, flat, x, y)]));
  return keep(temps, section.extrude(Math.max(0.2, height)).translate([0, 0, z]));
}

function capture(solid) {
  assertOk(solid, "shelf");
  const mesh = solid.getMesh();
  return {
    numProp: mesh.numProp,
    vertProperties: Float32Array.from(mesh.vertProperties),
    triVerts: Uint32Array.from(mesh.triVerts),
    volume: solid.volume(),
    genus: solid.genus(),
  };
}

function layOnFace(solid, temps) {
  let laid = keep(temps, solid.rotate([0, 90, 0]));
  const box = laid.boundingBox();
  laid = keep(temps, laid.translate([-box.min[0], -box.min[1], -box.min[2]]));
  return laid;
}

const LEG_PATTERN = "hex";

function buildFlat(wasm, d, temps) {
  const { CrossSection: CS } = wasm;
  const plate2d = roundedRect(CS, d.p.shelfLength, d.p.shelfWidth, d.cornerR, 16, temps);
  let plate = keep(temps, plate2d.extrude(d.p.thickness));
  const cutters = [];
  for (const cell of d.cells) {
    cutters.push(prism(CS, d.p.pattern, d.cellFlat, d.p.thickness + 1, cell.x, cell.y, -0.5, temps));
  }
  for (const socket of d.sockets) {
    cutters.push(
      prism(CS, LEG_PATTERN, d.holeFlat, d.socketDepth + 0.4, socket.x, socket.y, -0.2, temps)
    );
    cutters.push(
      prism(
        CS,
        LEG_PATTERN,
        d.holeFlat,
        d.socketDepth + 0.4,
        socket.x,
        socket.y,
        d.p.thickness - d.socketDepth,
        temps
      )
    );
  }
  if (cutters.length) plate = keep(temps, plate.subtract(unionAll(cutters, temps)));
  return plate;
}

function buildLeg(wasm, d, temps) {
  const { CrossSection: CS } = wasm;
  return prism(CS, LEG_PATTERN, d.legFlat, d.printedLeg, 0, 0, 0, temps);
}

function buildLegsFlat(wasm, d, temps) {
  const one = layOnFace(buildLeg(wasm, d, temps), temps);
  const box = one.boundingBox();
  const span = box.max[1] - box.min[1] + 4;
  const copies = [];
  for (let i = 0; i < d.sockets.length; i++) {
    copies.push(keep(temps, one.translate([0, i * span, 0])));
  }
  return unionAll(copies, temps);
}

function buildLegsStanding(wasm, d, temps) {
  const one = buildLeg(wasm, d, temps);
  const z = d.p.thickness - d.socketDepth;
  const copies = d.sockets.map((socket) => keep(temps, one.translate([socket.x, socket.y, z])));
  return copies;
}

function buildTest(wasm, d, temps) {
  const { CrossSection: CS } = wasm;
  const size = d.coupon.size;
  const plate2d = roundedRect(CS, size, size, d.cornerR, 16, temps);
  let plate = keep(temps, plate2d.extrude(d.p.thickness));
  const cutter = prism(
    CS,
    LEG_PATTERN,
    d.holeFlat,
    d.socketDepth + 0.4,
    d.coupon.holeX,
    d.coupon.holeY,
    d.p.thickness - d.socketDepth,
    temps
  );
  plate = keep(temps, plate.subtract(cutter));
  return plate;
}

export function meshToStl(mesh, name = "mesh") {
  const { vertProperties, triVerts, numProp } = mesh;
  const stride = numProp || 3;
  const triCount = triVerts.length / 3;
  const header = new Uint8Array(80);
  const label = `stackable-shelf ${name}`.slice(0, 79);
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

export function meshToPositions(mesh) {
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

export async function buildShelf(raw) {
  const d = derive(raw);
  const wasm = await loadManifold();
  const temps = [];
  try {
    const flatSolid = buildFlat(wasm, d, temps);
    const legsSolid = buildLegsFlat(wasm, d, temps);
    const standing = buildLegsStanding(wasm, d, temps);
    const standingSolid = unionAll(standing, temps);
    const testSolid = buildTest(wasm, d, temps);

    const flat = capture(flatSolid);
    const legs = capture(legsSolid);
    const legsStanding = capture(standingSolid);
    const test = capture(testSolid);
    const legMeshes = standing.map((solid, index) => ({
      name: `Leg ${index + 1}`,
      color: "#C4A574FF",
      mesh: capture(solid),
    }));

    const threemf = meshesTo3mf(
      [
        { name: "Flat piece", color: "#E7D3B0FF", mesh: flat },
        ...legMeshes,
      ],
      "Stackable shelf"
    );

    return {
      d,
      flat,
      legs,
      legsStanding,
      test,
      threemf,
      stl: {
        flat: meshToStl(flat, "flat"),
        legs: meshToStl(legs, "legs"),
        test: meshToStl(test, "hole-test"),
      },
    };
  } finally {
    deleteAll(temps);
  }
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
