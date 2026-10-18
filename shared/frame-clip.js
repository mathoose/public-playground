/**
 * Slide-on back for the bubble and striped frames.
 *
 * The cover grows a tongue along each side (fused into the beads or moulding).
 * The back plate grows matching rails: a wall and a 45° lip, open at the top,
 * stopped at the bottom. Slide the cover down until the tongues hit the stops.
 * Gravity keeps it there when the frame is hung from the plate or leaned on the
 * stand; lift the cover to change the photo.
 *
 * 45° is the support-free overhang limit, so the lip prints on the plate with
 * the outer face on the bed. Tongues are in the cover's back layers (flat on
 * the bed). Nothing is a disconnected island.
 *
 * The stand cleat is on the same face as the rails, under the bottom edge, and
 * overlaps the plate so the back export is one solid. Clearance, lip angle,
 * and minimum tongue stay fixed; rail position and length follow width, height,
 * and border so the fit does not collapse when those change.
 *
 * Plate print coordinates: z = 0 is the outer back on the bed, +z faces the cover.
 * Cover coordinates: z = 0 is the cover's back face. The preview seats the cover
 * at z = frameBackZ.
 */

const CLEAR = 0.32;
const TONGUE_T = 1.8;
const LIP = 2.0;
const WALL = 2.2;
const FUSE = 2.05;
const Z_CLEAR = 0.32;
const PHOTO_GAP = 0.42;
const STOP = 2.3;
const SINK = 0.55;
const LIP_STEPS = 5;

function clamp(lo, hi, v) {
  return Math.min(hi, Math.max(lo, v));
}

function box(x0, x1, y0, y1, z0, z1) {
  return {
    x0: Math.min(x0, x1),
    x1: Math.max(x0, x1),
    y0: Math.min(y0, y1),
    y1: Math.max(y0, y1),
    z0: Math.min(z0, z1),
    z1: Math.max(z0, z1),
  };
}

function polygonArea(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p0 = poly[i];
    const p1 = poly[(i + 1) % poly.length];
    a += p0[0] * p1[1] - p1[0] * p0[1];
  }
  return a / 2;
}

function ensureCcw(poly) {
  return polygonArea(poly) >= 0 ? poly : poly.slice().reverse();
}

function lipSteps(side, xWallIn, xWallOut, y0, y1, z0, reach) {
  const steps = [];
  for (let i = 0; i < LIP_STEPS; i++) {
    const inset0 = (reach * i) / LIP_STEPS;
    const inset1 = (reach * (i + 1)) / LIP_STEPS;
    const zA = z0 + inset0;
    const zB = z0 + inset1 + 0.08;
    const innerX = side > 0 ? xWallIn - inset1 : -(xWallIn - inset1);
    const outerX = side > 0 ? xWallOut : -xWallOut;
    steps.push(box(innerX, outerX, y0, y1, zA, zB));
  }
  return steps;
}

/** Side profile of the easel. +x faces the cover, y = 0 is the foot on the table. */
export function clipStandProfile(thickness, angleDeg, standHeight, insertH) {
  const tabT = thickness;
  const insert = Math.max(7.2, insertH - 0.55);
  // Straight neck below the tab so the leg can kick back without
  // passing through the cleat floor.
  const neck = 6.5;
  const join = 2.4;
  const legBottom = Math.max(18, Math.min(40, standHeight * 0.38));
  const neckTop = legBottom + neck;
  const tabTop = neckTop + insert;
  const theta = (clamp(8, 32, angleDeg) * Math.PI) / 180;
  const heelX = -Math.max(22, standHeight) * Math.tan(theta) - 8;
  const poly = ensureCcw([
    [tabT, legBottom],
    [tabT, tabTop],
    [0, tabTop],
    [0, legBottom + join],
    [-tabT, legBottom],
    [heelX - tabT, 0],
    [heelX, 0],
    [0, legBottom],
  ]);
  return {
    poly,
    tab: { x0: 0, x1: tabT, y0: neckTop, y1: tabTop },
  };
}

export function frameClipLayout(o) {
  const outerW = Math.max(8, Number(o.outerW) || 0);
  const outerH = Math.max(8, Number(o.outerH) || 0);
  const border = Math.max(0, Number(o.border) || 0);
  const plateT = clamp(0.4, 8, Number(o.plateT) || 1.2);
  const cornerR = Math.max(0, Number(o.cornerRadius) || 0);
  const tongueW = clamp(3.6, 5.2, 3.5 + Math.min(border, 18) * 0.07);
  const cornerInset = Math.min(cornerR, Math.max(0, outerH / 2 - 16));
  let marginTop = Math.max(8, cornerInset + 1.2);
  let marginBot = Math.max(STOP + CLEAR + 1.3, cornerInset + 1.2);
  const minTongue = Math.min(20, Math.max(12, outerH * 0.4));
  if (outerH - marginTop - marginBot < minTongue) {
    const spare = Math.max(minTongue * 0.5, outerH - minTongue);
    marginBot = Math.min(marginBot, Math.max(STOP + 0.9, spare * 0.32));
    marginTop = Math.max(5.5, outerH - marginBot - minTongue);
  }
  const y0 = -outerH / 2 + marginBot;
  const y1 = Math.max(y0 + 8, outerH / 2 - marginTop);
  const frameBackZ = plateT + PHOTO_GAP;
  const tongueZ0 = frameBackZ;
  const tongueZ1 = frameBackZ + TONGUE_T;
  const lipZ0 = tongueZ1 + Z_CLEAR;
  const xTip = outerW / 2 + tongueW;
  const xWallIn = xTip + CLEAR;
  const xWallOut = xWallIn + WALL;
  const plateW = xWallOut * 2;
  const plateH = outerH;
  const stopY1 = y0 - CLEAR;
  const stopY0 = stopY1 - STOP;

  const tongues = [];
  for (const side of [-1, 1]) {
    const xIn = outerW / 2 - FUSE;
    const xOut = outerW / 2 + tongueW;
    tongues.push(
      box(side > 0 ? xIn : -xOut, side > 0 ? xOut : -xIn, y0, y1, 0, TONGUE_T)
    );
    const yTop = outerH / 2 - Math.max(0.6, cornerR + 0.3);
    const yBot = -outerH / 2 + Math.max(0.6, cornerR + 0.3);
    if (yTop > y1 + 0.6) {
      tongues.push(box(side > 0 ? xIn : -outerW / 2, side > 0 ? outerW / 2 : -xIn, y1 - 0.15, yTop, 0, TONGUE_T));
    }
    if (y0 > yBot + 0.6) {
      tongues.push(box(side > 0 ? xIn : -outerW / 2, side > 0 ? outerW / 2 : -xIn, yBot, y0 + 0.15, 0, TONGUE_T));
    }
  }

  const rails = [-1, 1].map((side) => {
    const wall = box(
      side > 0 ? xWallIn : -xWallOut,
      side > 0 ? xWallOut : -xWallIn,
      -plateH / 2,
      plateH / 2,
      plateT - SINK,
      lipZ0 + 0.45
    );
    const stop = box(
      side > 0 ? outerW / 2 + 0.3 : -xWallOut,
      side > 0 ? xWallOut : -(outerW / 2 + 0.3),
      stopY0,
      stopY1,
      plateT - SINK,
      lipZ0
    );
    return {
      side,
      wall,
      stop,
      lips: lipSteps(side, xWallIn, xWallOut, -plateH / 2, plateH / 2, lipZ0, LIP),
    };
  });

  const standEnabled = o.standEnabled !== false;
  const standThickness = clamp(2.4, 10, Number(o.standThickness) || 4);
  const standWidth = clamp(16, 60, Number(o.standWidth) || 28);
  const standHeight = clamp(22, 120, Number(o.standHeight) || 40);
  const angleDeg = clamp(8, 32, Number(o.standAngleDeg) || 18);
  const insertH = clamp(8.5, 12, 9 + Math.min(border, 12) * 0.12);
  const profile = clipStandProfile(standThickness, angleDeg, standHeight, insertH);
  const tabLen = profile.tab.y1 - profile.tab.y0;
  const floorZ = plateT;
  const slotClear = 0.28;
  const yStop = -plateH / 2 + 1.5;
  const yTabTop = yStop - CLEAR;
  const yTabBot = yTabTop - tabLen;
  const yOpen = yTabBot - 3.4;
  const fuseY = -plateH / 2 + 2.4;
  const slotW = standWidth + CLEAR;
  const sideWall = 1.8;
  const sockReach = 1.5;
  const slotZ1 = floorZ + standThickness + slotClear;

  const socket = standEnabled
    ? {
        insertH,
        floorZ,
        yOpen,
        yStop,
        yTabTop,
        yTabBot,
        slotW,
        slotZ0: floorZ,
        slotZ1,
        housing: box(-(slotW / 2 + sideWall), slotW / 2 + sideWall, yOpen, fuseY, 0, slotZ1 + 0.35),
        void: box(-slotW / 2, slotW / 2, yOpen - 1.2, yStop, floorZ, slotZ1 + 3),
        lips: [-1, 1].flatMap((side) =>
          lipSteps(
            side,
            slotW / 2,
            slotW / 2 + sideWall,
            yOpen,
            yStop,
            slotZ1,
            sockReach
          )
        ),
        standPoly: profile.poly,
        standTab: profile.tab,
        standPlace: {
          // After rotating the extruded profile −90° about Y:
          // worldZ = polyX + pz, worldY = polyY + py.
          pz: floorZ + slotClear * 0.5,
          py: yTabBot - profile.tab.y0,
        },
      }
    : null;

  return {
    clearance: CLEAR,
    photoGap: PHOTO_GAP,
    tongueT: TONGUE_T,
    tongueW,
    fuse: FUSE,
    lip: LIP,
    wall: WALL,
    frameBackZ,
    tongueZ0,
    tongueZ1,
    lipZ0,
    lipZ1: lipZ0 + LIP,
    xTip,
    xWallIn,
    xWallOut,
    y0,
    y1,
    stopY0,
    stopY1,
    plate: { w: plateW, h: plateH, t: plateT },
    slab: box(-plateW / 2, plateW / 2, -plateH / 2, plateH / 2, 0, plateT),
    tongues,
    rails,
    socket,
    standPoly: profile.poly,
    standTab: profile.tab,
    border,
    outerW,
    outerH,
  };
}

/** Cleat boxes with the slot left open, for the live preview. */
export function socketShellBoxes(socket) {
  if (!socket) return [];
  const h = socket.housing;
  const v = socket.void;
  return [
    box(h.x0, h.x1, h.y0, h.y1, h.z0, socket.floorZ),
    box(h.x0, v.x0, h.y0, v.y1, socket.floorZ, h.z1),
    box(v.x1, h.x1, h.y0, v.y1, socket.floorZ, h.z1),
    box(h.x0, h.x1, v.y1, h.y1, socket.floorZ, h.z1),
    ...socket.lips,
  ];
}

export function aabbOverlapVolume(a, b) {
  const x = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
  const y = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
  const z = Math.min(a.z1, b.z1) - Math.max(a.z0, b.z0);
  if (x <= 0 || y <= 0 || z <= 0) return 0;
  return x * y * z;
}
