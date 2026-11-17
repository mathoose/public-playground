/**
 * Stackable shelf.
 *
 * The uploaded reference is a 200 mm plate, 6 mm thick, with a grid of openings
 * and four 10 mm round legs. Each leg nests about 0.4 mm per side into a socket
 * on the next shelf (10 mm leg, 10.8 mm hole). Openings can be hexagons or
 * squares. The legs and the sockets stay hexagonal, and the legs print on a face.
 *
 * Leg length is the clear height between the top of one shelf and the bottom of
 * the next. Each printed leg is longer by the two ends that sit in the sockets.
 */

export const APP_VERSION = "3 · Nov 17, 2026";
export const APP_VERSION_TAG = "v3";
export const APP_NAME = "Stackable shelf";
export const APP_ID = "stackable-shelf";

export const FILES = Object.freeze({
  flat: "stackable-shelf-flat.stl",
  legs: "stackable-shelf-legs.stl",
  test: "stackable-shelf-hole-test.stl",
  assembly: "stackable-shelf.3mf",
});

export const DEFAULT_PARAMS = Object.freeze({
  legLength: 100,
  shelfLength: 200,
  shelfWidth: 200,
  pattern: "hex",
  count: 4,
  wall: 4,
  thickness: 6,
  holeOffset: 0.4,
});

export const SLIDERS = [
  { key: "legLength", label: "Leg length", min: 20, max: 300, step: 1, unit: "mm", group: "size" },
  { key: "shelfLength", label: "Shelf length", min: 60, max: 450, step: 1, unit: "mm", group: "size" },
  { key: "shelfWidth", label: "Shelf width", min: 60, max: 450, step: 1, unit: "mm", group: "size" },
  { key: "count", label: "Along the length", min: 1, max: 16, step: 1, unit: "", group: "pattern" },
  { key: "wall", label: "Wall thickness", min: 1.2, max: 20, step: 0.1, unit: "mm", group: "pattern" },
  { key: "thickness", label: "Flat-piece thickness", min: 2.4, max: 16, step: 0.1, unit: "mm", group: "stock" },
  { key: "holeOffset", label: "Hole offset", min: 0, max: 2, step: 0.05, unit: "mm", group: "stock" },
];

const LEG_FLAT = 10;
const LEG_PATTERN = "hex";
const RIM = 3.2;
const OPEN_MIN = 8;
const WEB = 1.2;
const PATTERN_GAP = 2.4;

export function clamp(v, lo, hi) {
  return Math.min(hi, Math.max(lo, v));
}

function snap(value, step) {
  const digits = step >= 1 ? 0 : (String(step).split(".")[1] || "").length;
  return Number((Math.round(value / step) * step).toFixed(digits));
}

export function clampParams(raw) {
  const spec = Object.fromEntries(SLIDERS.map((s) => [s.key, s]));
  const num = (key) => {
    const s = spec[key];
    const v = Number(raw?.[key]);
    const n = clamp(Number.isFinite(v) ? v : DEFAULT_PARAMS[key], s.min, s.max);
    return snap(n, s.step);
  };
  const pattern = raw?.pattern === "square" ? "square" : "hex";
  const out = { pattern };
  for (const s of SLIDERS) out[s.key] = num(s.key);
  out.count = Math.round(out.count);
  return out;
}

export function mergeParams(raw) {
  return clampParams({ ...DEFAULT_PARAMS, ...raw });
}

export function applySliderChange(prev, key, value) {
  return clampParams({ ...prev, [key]: value });
}

export function patternNoun(pattern, count = 2) {
  const many = count !== 1;
  if (pattern === "square") return many ? "squares" : "square";
  return many ? "hexagons" : "hexagon";
}

/** Flat-to-flat for a hexagon, side length for a square. Circumradius is center to vertex. */
export function circumRadius(pattern, flat) {
  if (pattern === "square") return (flat / 2) * Math.SQRT2;
  return flat / Math.sqrt(3);
}

export function profilePoints(pattern, flat) {
  if (pattern === "square") {
    const h = flat / 2;
    return [
      [-h, -h],
      [h, -h],
      [h, h],
      [-h, h],
    ];
  }
  const radius = flat / Math.sqrt(3);
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = Math.PI / 2 + (i * Math.PI) / 3;
    points.push([radius * Math.cos(angle), radius * Math.sin(angle)]);
  }
  return points;
}

export function profileArea(pattern, flat) {
  if (pattern === "square") return flat * flat;
  return (Math.sqrt(3) / 2) * flat * flat;
}

export function socketDepthFor(thickness) {
  const maxDepth = Math.max(0.8, (thickness - WEB) / 2);
  const wanted = Math.min(8, Math.max(2, thickness * 0.45));
  let depth = Math.min(wanted, maxDepth);
  depth = Math.round(depth * 100) / 100;
  if (thickness - 2 * depth < WEB - 0.05) {
    depth = Math.round(((thickness - WEB) / 2) * 100) / 100;
  }
  return depth;
}

function cornerRadiusFor(inset, circum) {
  const limit = inset - (circum + 0.6) / Math.SQRT2;
  if (limit < 0.8) return 0;
  return Math.round(Math.min(5, limit) * 100) / 100;
}

function layoutSquares(availableL, availableW, count, wall) {
  for (let n = count; n >= 1; n--) {
    let open = (availableL - (n + 1) * wall) / n;
    const openMax = availableW - 2 * wall;
    if (open > openMax) open = openMax;
    if (open < OPEN_MIN - 0.05) continue;
    let rows = Math.max(1, Math.floor((availableW - wall) / (open + wall) + 1e-6));
    while (rows > 1 && rows * open + (rows + 1) * wall > availableW + 0.05) rows -= 1;
    const gridW = rows * open + (rows + 1) * wall;
    if (gridW > availableW + 0.05) continue;
    return { countUsed: n, rows, cellFlat: open, wall };
  }
  return { countUsed: 0, rows: 0, cellFlat: 0, wall };
}

function layoutHex(availableL, availableW, count, wall) {
  for (let n = count; n >= 1; n--) {
    let cellFlat = (availableL - (n - 1) * wall) / n;
    const flatMax = (availableW * Math.sqrt(3)) / 2 - 0.2;
    if (cellFlat > flatMax) cellFlat = flatMax;
    if (cellFlat < OPEN_MIN - 0.05) continue;
    const height = (2 * cellFlat) / Math.sqrt(3);
    const pitch = cellFlat + wall;
    const rowPitch = (pitch * Math.sqrt(3)) / 2;
    if (height > availableW + 0.05) continue;
    let rows = 1 + Math.floor((availableW - height) / rowPitch + 1e-6);
    rows = Math.max(1, rows);
    const totalY = (rows - 1) * rowPitch + height;
    if (totalY > availableW + 0.05) rows -= 1;
    if (rows < 1) continue;
    return { countUsed: n, rows, cellFlat, wall };
  }
  return { countUsed: 0, rows: 0, cellFlat: 0, wall };
}

function squareCells(length, width, layout) {
  const { countUsed, rows, cellFlat, wall } = layout;
  const gridL = countUsed * cellFlat + (countUsed + 1) * wall;
  const gridW = rows * cellFlat + (rows + 1) * wall;
  const x0 = -gridL / 2 + wall + cellFlat / 2;
  const y0 = -gridW / 2 + wall + cellFlat / 2;
  const cells = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < countUsed; col++) {
      cells.push({
        x: x0 + col * (cellFlat + wall),
        y: y0 + row * (cellFlat + wall),
      });
    }
  }
  return cells;
}

function hexCells(layout) {
  const { countUsed, rows, cellFlat, wall } = layout;
  const pitch = cellFlat + wall;
  const height = (2 * cellFlat) / Math.sqrt(3);
  const rowPitch = (pitch * Math.sqrt(3)) / 2;
  const totalX = countUsed * cellFlat + (countUsed - 1) * wall;
  const totalY = (rows - 1) * rowPitch + height;
  const x0 = -totalX / 2 + cellFlat / 2;
  const y0 = -totalY / 2 + height / 2;
  const cells = [];
  for (let row = 0; row < rows; row++) {
    const odd = countUsed > 1 && row % 2 === 1;
    const cols = odd ? countUsed - 1 : countUsed;
    const shift = odd ? pitch / 2 : 0;
    for (let col = 0; col < cols; col++) {
      cells.push({ x: x0 + shift + col * pitch, y: y0 + row * rowPitch });
    }
  }
  return cells;
}

function keepClear(cells, sockets, cellRadius, holeRadius) {
  const limit = cellRadius + holeRadius + 1.1;
  return cells.filter((cell) =>
    sockets.every((socket) => Math.hypot(cell.x - socket.x, cell.y - socket.y) >= limit)
  );
}

export function derive(raw) {
  const p = clampParams(raw);
  const legFlat = LEG_FLAT;
  const holeFlat = legFlat + 2 * p.holeOffset;
  const circum = circumRadius(LEG_PATTERN, holeFlat);
  const inset = circum + RIM;
  const cornerR = cornerRadiusFor(inset, circum);
  const socketDepth = socketDepthFor(p.thickness);
  const printedLeg = p.legLength + 2 * socketDepth;

  const sockets = [
    { x: p.shelfLength / 2 - inset, y: p.shelfWidth / 2 - inset },
    { x: -(p.shelfLength / 2 - inset), y: p.shelfWidth / 2 - inset },
    { x: p.shelfLength / 2 - inset, y: -(p.shelfWidth / 2 - inset) },
    { x: -(p.shelfLength / 2 - inset), y: -(p.shelfWidth / 2 - inset) },
  ];

  let margin = inset + circum + PATTERN_GAP;
  let availableL = p.shelfLength - 2 * margin;
  let availableW = p.shelfWidth - 2 * margin;
  if (availableL < 28 || availableW < 28) {
    margin = inset + circum + 0.8;
    availableL = p.shelfLength - 2 * margin;
    availableW = p.shelfWidth - 2 * margin;
  }

  const layout =
    p.pattern === "square"
      ? layoutSquares(Math.max(availableL, OPEN_MIN), Math.max(availableW, OPEN_MIN), p.count, p.wall)
      : layoutHex(Math.max(availableL, OPEN_MIN), Math.max(availableW, OPEN_MIN), p.count, p.wall);

  let cells =
    p.pattern === "square" ? squareCells(p.shelfLength, p.shelfWidth, layout) : hexCells(layout);
  cells = keepClear(cells, sockets, circumRadius(p.pattern, layout.cellFlat), circum);

  const couponSize = inset + circum + 4;
  const notes = [];
  if (layout.countUsed < p.count) {
    notes.push(
      `Only ${layout.countUsed} ${patternNoun(p.pattern)} fit along this shelf, so the count came down from ${p.count}.`
    );
  }
  if (p.holeOffset < 0.15) {
    notes.push("A hole offset under 0.15 mm is a tight fit. Print the corner test before the full shelf.");
  } else if (p.holeOffset > 1.2) {
    notes.push("A hole offset over 1.2 mm leaves a loose socket. The corner test shows the gap.");
  }
  if (socketDepth < 2) {
    notes.push("The sockets are shallow. A thicker flat piece gives the legs more to sit in.");
  }
  if (layout.countUsed === 0) {
    notes.push("That wall is too thick for an opening. Lower the wall thickness or the count.");
  } else if (layout.cellFlat < 12) {
    notes.push("The openings are small. A thinner wall, or fewer along the length, leaves more room.");
  }
  if (p.shelfLength > 350 || p.shelfWidth > 350) {
    notes.push("A side over 350 mm may not fit the bed in one piece.");
  }

  return {
    p,
    legFlat,
    holeFlat,
    circum,
    inset,
    cornerR,
    socketDepth,
    printedLeg,
    margin,
    sockets,
    cells,
    cellFlat: layout.cellFlat,
    wall: layout.wall,
    countUsed: layout.countUsed,
    rows: layout.rows,
    coupon: {
      size: couponSize,
      holeX: couponSize / 2 - inset,
      holeY: couponSize / 2 - inset,
    },
    warnings: notes,
  };
}

export function warnings(raw) {
  return derive(raw).warnings;
}
