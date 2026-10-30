import { BLADE_LENGTH, BLADE_WIDTH, HANDLE_LENGTH } from "./geometry.js";
import {
  describeMeasurements,
  faceAxis,
  measurementsForSpan,
} from "../shared/model-pick-map.js";

function boxAround(cx, cy, cz, hx, hy, hz) {
  return { min: [cx - hx, cy - hy, cz - hz], max: [cx + hx, cy + hy, cz + hz] };
}

function ghostZs(d) {
  const capH = Math.min(d.p.capDepth, 4);
  const z0 = d.p.floor + 0.05;
  const bladeZ = z0 + capH;
  const plateH = 3.8;
  const neckZ = bladeZ + 0.25 + plateH;
  return { capH, z0, bladeZ, plateH, neckZ, handle0: neckZ + 1.5 };
}

export function inspectHenson(hit, d) {
  const p = d.p;
  const x = hit.point.x;
  const y = hit.point.y;
  const z = hit.point.z;
  const face = faceAxis(hit.normal);
  const radial = Math.hypot(x, y);

  if (hit.partId === "blade") {
    return {
      title: "Blade",
      detail: `Fixed ${BLADE_LENGTH} × ${BLADE_WIDTH} × 0.25 mm. No slider changes the blade.`,
      params: [],
      box: boxAround(0, 0, ghostZs(d).bladeZ + 0.125, BLADE_LENGTH / 2, BLADE_WIDTH / 2, 0.2),
    };
  }

  if (hit.partId === "razor") {
    const g = ghostZs(d);
    if (z >= g.neckZ - 0.4) {
      return {
        title: "Handle",
        detail: `Preview handle. Diameters follow the tail and head sliders. Length is fixed at ${HANDLE_LENGTH} mm.`,
        params: ["handleTailD", "handleHeadD"],
        box: boxAround(0, 0, g.handle0 + HANDLE_LENGTH / 2, p.handleTailD / 2 + 0.4, p.handleTailD / 2 + 0.4, HANDLE_LENGTH / 2),
      };
    }
    if (z <= g.z0 + g.capH + 0.35) {
      return {
        title: "Razor cap",
        detail: "Preview cap sitting in the pocket.",
        params: ["headLength", "capTopWidth", "headWidth", "capDepth", "headCornerR"],
        box: boxAround(0, 0, g.z0 + g.capH / 2, p.headLength / 2, p.headWidth / 2, g.capH / 2 + 0.2),
      };
    }
    return {
      title: "Razor head",
      detail: "Preview head. Plate height is fixed; the footprint follows the head sliders.",
      params: ["headLength", "headWidth", "headCornerR"],
      box: boxAround(0, 0, g.bladeZ + 2, p.headLength / 2, p.headWidth / 2, 2.2),
    };
  }

  if (hit.partId === "grip") {
    const gx = x - d.gripOffsetX;
    const gr = Math.hypot(gx, y);
    const boreR = d.gripBoreBottom / 2;
    if (face === "z") {
      return {
        title: "Grip end",
        detail: "Length of the handle sleeve.",
        params: ["gripLen"],
        box: boxAround(d.gripOffsetX, 0, p.gripLen / 2, p.gripOD / 2, p.gripOD / 2, p.gripLen / 2),
      };
    }
    if (gr < boreR + 0.8) {
      return {
        title: "Grip bore",
        detail: "Bore is the handle tail plus clearance per side.",
        params: ["gripClear", "handleTailD"],
        box: null,
      };
    }
    return {
      title: "Grip outside",
      detail: "Outer diameter. Flutes are cut into this surface.",
      params: ["gripOD", "gripFlutes"],
      box: boxAround(d.gripOffsetX, 0, p.gripLen / 2, p.gripOD / 2, p.gripOD / 2, p.gripLen / 2),
    };
  }

  if (p.pushHoleD > 0.5 && radial < p.pushHoleD / 2 + 0.7 && z < p.floor + 0.6) {
    return {
      title: "Push-out hole",
      detail: "Hole through the floor so you can push the cap up.",
      params: ["pushHoleD", "floor"],
      box: boxAround(0, 0, p.floor / 2, p.pushHoleD / 2, p.pushHoleD / 2, p.floor / 2 + 0.4),
    };
  }
  if (p.notchW > 0.5 && Math.abs(y) < p.notchW / 2 + 0.8 && Math.abs(x) > d.pocketL / 2 - 2.5 && z > d.notchFloor - 0.6) {
    return {
      title: "Finger notch",
      detail: "Notch at the cap ends.",
      params: ["notchW"],
      box: boxAround(Math.sign(x || 1) * (d.pocketL / 2 + 2), 0, (d.notchFloor + d.height) / 2, 6, p.notchW / 2, (d.height - d.notchFloor) / 2),
    };
  }
  const inPocket =
    Math.abs(x) <= d.pocketL / 2 + 0.6 &&
    Math.abs(y) <= d.pocketWTop / 2 + 0.6 &&
    z >= p.floor - 0.4 &&
    z <= p.floor + p.capDepth + 0.5;
  if (inPocket && z <= p.floor + p.capDepth + 0.35) {
    return {
      title: "Cap pocket",
      detail: "Pocket for the cap. Clearance is added on every side of the head.",
      params: ["capDepth", "headLength", "headWidth", "capTopWidth", "clearance", "headCornerR"],
      box: boxAround(0, 0, p.floor + p.capDepth / 2, d.pocketL / 2, d.pocketWTop / 2, p.capDepth / 2),
    };
  }
  const inUpper =
    Math.abs(x) <= d.upperL / 2 + 0.8 &&
    Math.abs(y) <= d.upperW / 2 + 0.8 &&
    z >= p.floor + p.capDepth - 0.2;
  if (inUpper && radial < d.puckR - 1.2) {
    return {
      title: "Blade relief",
      detail: "Upper opening around the blade. Relief is extra room beyond the head, per side.",
      params: ["upperDepth", "bladeRelief", "headLength", "headWidth", "clearance"],
      box: boxAround(0, 0, (p.floor + p.capDepth + d.height) / 2, d.upperL / 2, d.upperW / 2, p.upperDepth / 2 + 0.4),
    };
  }
  if (face === "z" && z < 1) {
    return {
      title: "Cradle bottom",
      detail: "Floor under the pocket, inside the puck.",
      params: ["floor", "puckD"],
      box: boxAround(0, 0, p.floor / 2, d.puckR, d.puckR, Math.max(p.floor / 2, 0.8)),
    };
  }
  return {
    title: "Puck",
    detail: "Outside of the cradle. Ribs are cut into this wall.",
    params: ["puckD", "edgeRound", ...(p.gripRibs >= 3 ? ["gripRibs", "ribDepth"] : [])],
    box: boxAround(0, 0, d.height / 2, d.puckR, d.puckR, d.height / 2),
  };
}

export function hensonMeasurements(d) {
  const p = d.p;
  const g = ghostZs(d);
  const list = [
    { title: "Puck diameter", axis: "x", end0: -d.puckR, end1: d.puckR, named: p.puckD, params: ["puckD"], parts: ["cradle"] },
    { title: "Puck diameter", axis: "y", end0: -d.puckR, end1: d.puckR, named: p.puckD, params: ["puckD"], parts: ["cradle"] },
    {
      title: "Cradle height",
      axis: "z",
      end0: 0,
      end1: d.height,
      named: d.height,
      params: ["floor", "capDepth", "upperDepth"],
      parts: ["cradle"],
    },
    {
      title: "Cap pocket depth",
      axis: "z",
      end0: p.floor,
      end1: p.floor + p.capDepth,
      named: p.capDepth,
      params: ["capDepth"],
      parts: ["cradle"],
    },
    {
      title: "Pocket length",
      axis: "x",
      end0: -d.pocketL / 2,
      end1: d.pocketL / 2,
      named: d.pocketL,
      params: ["headLength", "clearance"],
      parts: ["cradle"],
    },
    {
      title: "Pocket width",
      axis: "y",
      end0: -d.pocketWTop / 2,
      end1: d.pocketWTop / 2,
      named: d.pocketWTop,
      params: ["headWidth", "clearance"],
      parts: ["cradle"],
    },
    {
      title: "Grip length",
      axis: "z",
      end0: 0,
      end1: p.gripLen,
      named: p.gripLen,
      params: ["gripLen"],
      parts: ["grip"],
    },
    {
      title: "Grip diameter",
      axis: "x",
      end0: d.gripOffsetX - p.gripOD / 2,
      end1: d.gripOffsetX + p.gripOD / 2,
      named: p.gripOD,
      params: ["gripOD"],
      parts: ["grip"],
    },
    {
      title: "Grip diameter",
      axis: "y",
      end0: -p.gripOD / 2,
      end1: p.gripOD / 2,
      named: p.gripOD,
      params: ["gripOD"],
      parts: ["grip"],
      when: (a, b) => Math.abs((a.point.x + b.point.x) / 2 - d.gripOffsetX) < p.gripOD,
    },
    {
      kind: "chord",
      title: "Grip bore",
      value: d.gripBoreBottom,
      named: d.gripBoreBottom,
      tol: 0.8,
      params: ["gripClear", "handleTailD"],
      parts: ["grip"],
    },
    {
      title: "Handle length",
      axis: "z",
      end0: g.handle0,
      end1: g.handle0 + HANDLE_LENGTH,
      named: HANDLE_LENGTH,
      params: [],
      parts: ["razor"],
    },
    {
      kind: "chord",
      title: "Handle tail diameter",
      value: p.handleTailD,
      named: p.handleTailD,
      tol: 0.8,
      params: ["handleTailD"],
      parts: ["razor"],
    },
    {
      kind: "chord",
      title: "Handle head diameter",
      value: p.handleHeadD,
      named: p.handleHeadD,
      tol: 0.8,
      params: ["handleHeadD"],
      parts: ["razor"],
    },
    {
      title: "Blade length",
      axis: "x",
      end0: -BLADE_LENGTH / 2,
      end1: BLADE_LENGTH / 2,
      named: BLADE_LENGTH,
      params: [],
      parts: ["blade"],
    },
    {
      title: "Blade width",
      axis: "y",
      end0: -BLADE_WIDTH / 2,
      end1: BLADE_WIDTH / 2,
      named: BLADE_WIDTH,
      params: [],
      parts: ["blade"],
    },
  ];
  return list;
}

export function measureHenson(a, b, d) {
  return describeMeasurements(measurementsForSpan(a, b, hensonMeasurements(d)).hits);
}
