/**
 * Slide-on back for the bubble and striped frames.
 *
 * The cover grows a tongue along each side (fused into the beads or moulding).
 * The back plate grows matching rails: a wall and a 45° lip, open at the top,
 * stopped at the bottom. Slide the cover down until the tongues hit the stops.
 * Gravity keeps it there when the frame is hung from the plate or leaned on the
 * stand; lift the cover to change the photo.
 *
 * The plate and rails sit inside the front silhouette, under the border, so the
 * back does not show past the frame. A shallow channel in the cover's back
 * layers gives the lip and the stop somewhere to live without cutting the face.
 *
 * 45° is the support-free overhang limit, so the lip prints on the plate with
 * the outer face on the bed. Tongues are in the cover's back layers (flat on
 * the bed). Nothing is a disconnected island.
 *
 * The stand is a separate flat flap. Two pegs slip into rectangular holes in
 * the back plate; a wedge on the same face holds the bottom of the flap off
 * the plate so the frame leans. Three hole rows change how high the flap
 * sits, which changes the lean. The flap stays on the back, inside the front
 * silhouette. Clearance, lip angle, and minimum tongue stay fixed; rail
 * position, hole rows, and flap size follow width, height, and border.
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

function standHoleIndex(value) {
  const n = Math.round(Number(value));
  if (!Number.isFinite(n)) return 0;
  return clamp(0, 2, n);
}

function boxVolume(b) {
  return Math.max(0, b.x1 - b.x0) * Math.max(0, b.y1 - b.y0) * Math.max(0, b.z1 - b.z0);
}

/**
 * Back easel. Print boxes lie on the bed: X is the flap width, Y runs from the
 * foot (0) up to the pegs, Z is up. A wedge on the top face is tall at the foot
 * and fades out at the pegs. Installed, that face goes against the plate: pegs
 * enter the holes and the wedge holds the foot off the back.
 */
function layoutPegStand(o, plateT, plateW, plateH, outerH, xWallIn) {
  const sheetT = clamp(2.8, 4.2, Number(o.standThickness) || 3.2);
  const pegW = 3.4;
  const pegH = 2.8;
  const xyClear = 0.55;
  const holeW = pegW + xyClear;
  const holeH = pegH + xyClear;
  let pegLen = plateT - 0.22;
  if (!(pegLen < plateT - 0.06) || pegLen < 0.2) pegLen = Math.max(0.16, plateT * 0.62);
  const outerBottom = -outerH / 2;
  const plateBottom = -plateH / 2;
  const kick = clamp(36, 64, outerH * 0.32);
  const reach = kick + sheetT;
  const gap = holeH + 7;
  let drop = clamp(34, Math.min(72, plateH * 0.4), plateH * 0.34);
  const yFootMin = Math.max(outerBottom + 3.2, plateBottom + 1.1);
  let yHole0 = yFootMin + drop;
  const yHoleMax = plateH / 2 - holeH / 2 - 3.5;
  if (yHole0 + 2 * gap > yHoleMax) {
    drop = Math.max(28, yHoleMax - 2 * gap - yFootMin);
    yHole0 = yFootMin + drop;
  }
  if (yHole0 + 2 * gap > yHoleMax) {
    const room = Math.max(gap, yHoleMax - yHole0);
    drop = Math.max(24, yHoleMax - room - yFootMin);
    yHole0 = yFootMin + drop;
  }
  const ys = [0, 1, 2].map((i) => Math.min(yHoleMax, yHole0 + i * gap));
  const maxHalf = Math.max(8, xWallIn - 3);
  const halfSpan = clamp(11, maxHalf, plateW * 0.2);
  const xs = [-halfSpan * 0.62, halfSpan * 0.62];
  const steps = 8;

  const holeIndex = standHoleIndex(o.standHole);
  const rows = ys.map((y, index) => {
    const yFoot = y - drop;
    const s = yFoot - outerBottom;
    const angleRad = Math.atan(Math.max(0.8, s) / reach);
    return {
      index,
      y,
      yFoot,
      s,
      angleRad,
      angleDeg: (angleRad * 180) / Math.PI,
      active: index === holeIndex,
    };
  });
  const active = rows[holeIndex];
  const holes = [];
  for (const row of rows) {
    for (const x of xs) {
      holes.push({
        x,
        y: row.y,
        row: row.index,
        active: row.active,
        w: holeW,
        h: holeH,
        box: box(
          x - holeW / 2,
          x + holeW / 2,
          row.y - holeH / 2,
          row.y + holeH / 2,
          -0.4,
          plateT + 0.35
        ),
      });
    }
  }

  const boxes = [box(-halfSpan, halfSpan, 0, drop, 0, sheetT)];
  for (let i = 0; i < steps; i++) {
    const y0 = (drop * i) / steps;
    const y1 = (drop * (i + 1)) / steps + 0.35;
    const h = kick * (1 - i / steps);
    if (h < 0.35) continue;
    boxes.push(box(-halfSpan, halfSpan, y0, Math.min(drop, y1), sheetT - 0.25, sheetT + h));
  }
  for (const x of xs) {
    boxes.push(box(x - pegW / 2, x + pegW / 2, drop - pegH, drop + 0.2, sheetT - 0.25, sheetT + pegLen));
  }
  let volume = 0;
  for (const b of boxes) volume += boxVolume(b);
  volume -= steps * (2 * halfSpan) * 0.25 * (drop / steps);

  const plateBoxes = [];
  for (let i = 0; i < steps; i++) {
    const t0 = i / steps;
    const t1 = (i + 1) / steps;
    const y0 = active.yFoot + drop * t0;
    const y1 = Math.min(active.yFoot + drop * t1, active.y - holeH / 2 - 1.2);
    if (y1 <= y0 + 0.4) continue;
    const zOuter = -(kick * (1 - t0) + sheetT);
    plateBoxes.push(box(-halfSpan, halfSpan, y0, y1, zOuter, -0.04));
  }
  for (const x of xs) {
    plateBoxes.push(
      box(x - pegW / 2, x + pegW / 2, active.y - pegH / 2, active.y + pegH / 2, -0.2, pegLen)
    );
  }

  return {
    cut: o.standEnabled !== false,
    holeIndex,
    sheetT,
    pegW,
    pegH,
    pegLen,
    legW: sheetT,
    legReach: reach,
    footH: drop / steps,
    halfSpan,
    drop,
    kick,
    holeW,
    holeH,
    rows,
    holes,
    boxes,
    plateBoxes,
    yHole: active.y,
    yFoot: active.yFoot,
    angleRad: active.angleRad,
    angleDeg: active.angleDeg,
    volume: Math.max(0, volume),
  };
}

/** Installed flap, pegs in the active holes, sitting on the back of the plate. */
export function pegStandPlateBoxes(stand) {
  if (!stand) return [];
  return stand.plateBoxes || [];
}

/**
 * Size the tongue, wall, and lip so they fit in the solid band under the
 * border. A thicker border gets a deeper tongue. The lip stays at 45° and
 * 2 mm whenever the band and the cover height allow it.
 */
function sizeJoint(band, border, coverHeight) {
  let tongueT = TONGUE_T;
  let lip = LIP;
  let wall = WALL;
  const skin = 0.45;
  if (coverHeight > 0) {
    const room = Math.max(1.4, coverHeight - skin);
    if (room < tongueT + Z_CLEAR + lip) {
      lip = Math.min(LIP, Math.max(1.05, room * 0.4));
      tongueT = Math.max(0.8, room - Z_CLEAR - lip);
    }
  }
  lip = Math.min(lip, Math.max(CLEAR + 1.05, Math.min(LIP, lip)));
  let tongueW = clamp(3.4, 5.2, 3.3 + Math.min(Math.max(border, 0), 18) * 0.08);
  if (tongueW < lip) tongueW = lip;

  const fits = (w, t) => w + CLEAR + t <= band + 1e-6;
  if (!fits(wall, tongueW)) tongueW = Math.max(lip, band - wall - CLEAR);
  if (!fits(wall, tongueW)) wall = Math.max(1.0, band - CLEAR - tongueW);
  if (!fits(wall, tongueW)) {
    const room = Math.max(0.8, band - CLEAR);
    wall = Math.min(WALL, Math.max(0.85, room * 0.34));
    tongueW = Math.max(0.9, room - wall);
    lip = Math.min(lip, tongueW);
  }
  lip = Math.min(lip, tongueW);
  return { wall, lip, tongueW, tongueT };
}

export function frameClipLayout(o) {
  const outerW = Math.max(8, Number(o.outerW) || 0);
  const outerH = Math.max(8, Number(o.outerH) || 0);
  const border = Math.max(0, Number(o.border) || 0);
  const plateT = clamp(0.4, 8, Number(o.plateT) || 1.2);
  const cornerR = Math.max(0, Number(o.cornerRadius) || 0);
  const beadR = Math.max(0, Number(o.beadRadius) || 0);
  const coverHeight = Math.max(0, Number(o.coverHeight) || 0);
  // Rectangle corners of a bubble frame sit outside the corner beads unless
  // the plate steps in by about 0.3 radii. A moulded frame only needs a
  // small step inside its outer edge.
  let hide = beadR > 0 ? Math.max(0.7, beadR * (1 - Math.SQRT1_2) + 0.45) : 0.75;
  hide = Math.min(hide, Math.max(0.45, Math.min(outerW, outerH) * 0.5 - 8));
  const solidReach = beadR > 0 ? 2 * beadR : border;
  const band = Math.max(0.8, solidReach - hide);
  const joint = sizeJoint(band, border, coverHeight);
  const { wall, lip, tongueW, tongueT } = joint;

  const plateCorner = beadR > 0 ? 0 : Math.max(0, cornerR - hide);
  const xWallOut = outerW / 2 - hide;
  const xWallIn = xWallOut - wall;
  const xTip = xWallIn - CLEAR;
  const plateW = xWallOut * 2;
  const plateH = outerH - 2 * hide;
  const yEdge = Math.max(6, plateH / 2 - plateCorner);
  let marginTop = Math.max(7, Math.min(12, yEdge * 0.08));
  let marginBot = Math.max(STOP + CLEAR + 1.1, Math.min(10, yEdge * 0.08));
  if (yEdge * 2 - marginTop - marginBot < 12) {
    marginTop = 3.5;
    marginBot = STOP + 0.7;
  }
  const y0 = -yEdge + marginBot;
  const y1 = Math.max(y0 + 8, yEdge - marginTop);
  const frameBackZ = plateT + PHOTO_GAP;
  const tongueZ0 = frameBackZ;
  const tongueZ1 = frameBackZ + tongueT;
  const lipZ0 = tongueZ1 + Z_CLEAR;
  const stopY1 = y0 - CLEAR;
  const stopY0 = Math.max(-yEdge + 0.4, stopY1 - STOP);
  const railY0 = -yEdge;
  const railY1 = yEdge;

  const tongues = [];
  for (const side of [-1, 1]) {
    const xInner = xTip - tongueW;
    const xOuter = xTip;
    tongues.push(
      box(side > 0 ? xInner : -xOuter, side > 0 ? xOuter : -xInner, y0, y1, 0, tongueT)
    );
  }

  const rails = [-1, 1].map((side) => {
    const wallBox = box(
      side > 0 ? xWallIn : -xWallOut,
      side > 0 ? xWallOut : -xWallIn,
      railY0,
      railY1,
      plateT - SINK,
      lipZ0 + 0.35
    );
    const stop = box(
      side > 0 ? xTip - tongueW + 0.15 : -xWallOut,
      side > 0 ? xWallOut : -(xTip - tongueW + 0.15),
      stopY0,
      stopY1,
      plateT - SINK,
      tongueZ1 - 0.06
    );
    return {
      side,
      wall: wallBox,
      stop,
      lips: lipSteps(side, xWallIn, xWallOut, railY0, railY1, lipZ0, lip),
    };
  });

  const relief = [];
  for (const rail of rails) {
    const wallBox = { ...rail.wall };
    if (rail.side > 0) wallBox.x0 = Math.max(wallBox.x0, xWallIn - 0.02);
    else wallBox.x1 = Math.min(wallBox.x1, -(xWallIn - 0.02));
    const wallZ1 = lipZ0 - frameBackZ;
    relief.push(box(wallBox.x0, wallBox.x1, wallBox.y0, wallBox.y1, 0, wallZ1 + 0.04));
    for (const step of rail.lips) {
      const z0 = step.z0 - frameBackZ;
      const z1 = step.z1 - frameBackZ;
      if (z1 > tongueT + 0.05) {
        relief.push(box(step.x0, step.x1, step.y0, step.y1, Math.max(tongueT + Z_CLEAR * 0.5, z0), z1 + 0.05));
      }
    }
    relief.push(box(rail.stop.x0, rail.stop.x1, rail.stop.y0, rail.stop.y1, 0, tongueT + 0.1));
  }

  const pegStand = layoutPegStand(o, plateT, plateW, plateH, outerH, xWallIn);

  return {
    clearance: CLEAR,
    photoGap: PHOTO_GAP,
    tongueT,
    tongueW,
    fuse: FUSE,
    lip,
    wall,
    hide,
    frameBackZ,
    tongueZ0,
    tongueZ1,
    lipZ0,
    lipZ1: lipZ0 + lip,
    xTip,
    xWallIn,
    xWallOut,
    y0,
    y1,
    stopY0,
    stopY1,
    plate: { w: plateW, h: plateH, t: plateT },
    plateCorner,
    slab: box(-plateW / 2, plateW / 2, -plateH / 2, plateH / 2, 0, plateT),
    tongues,
    rails,
    relief,
    pegStand,
    border,
    outerW,
    outerH,
  };
}

/** Outline of the back plate, CCW, with rounded corners when the cover has them. */
export function plateLoop(clip, segments = 6) {
  const hw = clip.plate.w / 2;
  const hh = clip.plate.h / 2;
  const R = Math.min(Math.max(0, clip.plateCorner || 0), hw - 0.4, hh - 0.4);
  if (R < 0.15) return [[-hw, -hh], [hw, -hh], [hw, hh], [-hw, hh]];
  const pts = [];
  const corners = [
    { cx: hw - R, cy: -hh + R, a0: -Math.PI / 2, a1: 0 },
    { cx: hw - R, cy: hh - R, a0: 0, a1: Math.PI / 2 },
    { cx: -hw + R, cy: hh - R, a0: Math.PI / 2, a1: Math.PI },
    { cx: -hw + R, cy: -hh + R, a0: Math.PI, a1: (3 * Math.PI) / 2 },
  ];
  for (const c of corners) {
    for (let i = 0; i <= segments; i++) {
      const a = c.a0 + ((c.a1 - c.a0) * i) / segments;
      pts.push([c.cx + R * Math.cos(a), c.cy + R * Math.sin(a)]);
    }
  }
  return pts;
}

export function aabbOverlapVolume(a, b) {
  const x = Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0);
  const y = Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0);
  const z = Math.min(a.z1, b.z1) - Math.max(a.z0, b.z0);
  if (x <= 0 || y <= 0 || z <= 0) return 0;
  return x * y * z;
}
