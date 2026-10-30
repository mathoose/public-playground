import {
  describeMeasurements,
  faceAxis,
  featureAt,
  measurementsForSpan,
} from "../shared/model-pick-map.js";

function box(min, max) {
  return { min, max };
}

function cordRadius(d) {
  return Math.max(0.7, d.p.cordD / 2 - 0.15);
}

/** Feature boxes in the same millimetre space the sleeve mesh is built in. */
export function powerBankFeatures(d) {
  const p = d.p;
  const features = [];
  const sleeveZ = [0, d.outerH];
  const sleeveY = [0, d.outerW];

  if (p.clipOn) {
    const hx = d.clipLen / 2;
    const hy = d.clipWidth / 2;
    const z0 = d.clipHoleZ - d.clipOuterR;
    const z1 = Math.max(p.wrapStick, 1.4);
    for (const [id, title, x] of [
      ["clip-a", "USB-end cord clip", d.clipXA],
      ["clip-b", "Tight-end cord clip", d.clipXB],
    ]) {
      features.push({
        part: "sleeve",
        id,
        title,
        detail: "Clip size follows the cord diameter.",
        params: ["cordD", "clipOn"],
        faces: { x: ["cordD", "clipOn"], y: ["cordD", "clipOn"], z: ["cordD", "clipOn"] },
        ...box([x - hx, d.cy - hy, z0], [x + hx, d.cy + hy, z1]),
      });
    }
  }

  if (p.slotOn) {
    const slotLen = Math.min(18, Math.max(10, p.wrapGap - 2));
    const x0 = d.wrapX1 + (p.wrapGap - slotLen) / 2;
    const h = p.slotH;
    const z0 = d.zMid - h / 2;
    const thick = p.wall + 2.2;
    const params = ["slotOn", "slotH", "wrapGap"];
    features.push({
      part: "sleeve",
      id: "slot-l",
      title: "Side slot",
      detail: "Button / micro slot on the sleeve wall.",
      params,
      faces: { x: params, y: params, z: params },
      ...box([x0, p.wrapStick - 0.4, z0], [x0 + slotLen, p.wrapStick - 0.4 + thick, z0 + h]),
    });
    features.push({
      part: "sleeve",
      id: "slot-r",
      title: "Side slot",
      detail: "Button / micro slot on the sleeve wall.",
      params,
      faces: { x: params, y: params, z: params },
      ...box(
        [x0, d.outerW - p.wrapStick - p.wall - 1.8, z0],
        [x0 + slotLen, d.outerW - p.wrapStick - p.wall - 1.8 + thick, z0 + h]
      ),
    });
  }

  const lane = (id, title, x0, x1) => ({
    part: "sleeve",
    id,
    title,
    detail: "Channel width, depth, and the sleeve cross-section under it.",
    params: ["wrapLane", "wrapStick", "wrapFlange"],
    faces: {
      x: ["wrapLane", "wrapFlange"],
      y: ["wrapStick", "bankW", "wall"],
      z: ["wrapStick", "bankH", "wall"],
    },
    ...box([x0, sleeveY[0], sleeveZ[0]], [x1, sleeveY[1], sleeveZ[1]]),
  });
  features.push(lane("lane-a", "USB-end wrap lane", d.wrapX0, d.wrapX1));
  features.push({
    part: "sleeve",
    id: "gap",
    title: "Gap between wrap lanes",
    detail: "The solid band between the two cord channels.",
    params: ["wrapGap"],
    faces: {
      x: ["wrapGap"],
      y: ["bankW", "clearXY", "wall", "taper"],
      z: ["bankH", "clearZ", "wall", "taper"],
    },
    ...box([d.wrapX1, sleeveY[0], sleeveZ[0]], [d.wrapX2, sleeveY[1], sleeveZ[1]]),
  });
  features.push(lane("lane-b", "Tight-end wrap lane", d.wrapX2, d.wrapX3));
  const endFaces = {
    x: ["sleeveLen", "wrapInset"],
    y: ["bankW", "clearXY", "wall", "taper"],
    z: ["bankH", "clearZ", "wall", "taper"],
  };
  features.push({
    part: "sleeve",
    id: "entry",
    title: "Sleeve entry",
    detail: "Loose end of the sleeve, USB side.",
    params: ["sleeveLen", "wrapInset", "wall", "taper"],
    faces: endFaces,
    ...box([0, sleeveY[0], sleeveZ[0]], [d.wrapX0, sleeveY[1], sleeveZ[1]]),
  });
  features.push({
    part: "sleeve",
    id: "tight",
    title: "Sleeve tight end",
    detail: "Far end of the sleeve. Taper shrinks the hole here.",
    params: ["sleeveLen", "taper", "wall", "wrapInset"],
    faces: endFaces,
    ...box([d.wrapX3, sleeveY[0], sleeveZ[0]], [p.sleeveLen, sleeveY[1], sleeveZ[1]]),
  });

  features.push({
    part: "bank",
    id: "bank",
    title: "Power bank",
    detail: "Preview body. Width, thickness, and length are the bank sliders.",
    params: ["bankW", "bankH", "bankL"],
    faces: {
      x: ["bankL"],
      y: ["bankW", "bankR"],
      z: ["bankH", "bankR"],
    },
    ...box(
      [d.bankX0, d.bankY0, d.bankZ0],
      [d.bankX0 + p.bankL, d.bankY0 + p.bankW, d.bankZ0 + p.bankH]
    ),
  });

  features.push({
    part: "glass",
    id: "glass",
    title: "Screen mark",
    detail: "Preview only. Its width follows the bank. The 28 mm length is fixed.",
    params: ["bankW"],
    faces: { x: [], y: ["bankW"], z: [] },
    notes: { x: "No slider sets this edge.", z: "No slider sets this edge." },
    ...box(
      [d.bankX0 + 2, d.bankY0 + 2, d.bankZ0 + p.bankH - 0.2],
      [d.bankX0 + 30, d.bankY0 + p.bankW - 2, d.bankZ0 + p.bankH + 0.7]
    ),
  });

  features.push({
    part: "ports",
    id: "ports",
    title: "USB port marks",
    detail: "Preview only. Port size and spacing are not sliders.",
    params: [],
    faces: { x: [], y: [], z: [] },
    notes: { x: "No slider sets this.", y: "No slider sets this.", z: "No slider sets this." },
    ...box(
      [d.bankX0 - 1.2, d.cy - 26, d.bankZ0 + p.bankH / 2 - 4],
      [d.bankX0 + 1, d.cy + 26, d.bankZ0 + p.bankH / 2 + 4]
    ),
  });

  const r = cordRadius(d);
  const loopW = d.outerW - p.wrapStick;
  const loopH = d.outerH - p.wrapStick;
  for (const [id, title, x] of [
    ["cord-a", "USB-end cord", d.beltMidA],
    ["cord-b", "Tight-end cord", d.beltMidB],
  ]) {
    features.push({
      part: "cord",
      id,
      title,
      detail: "Preview cord. Diameter is the cord slider; the lane it sits in sets the position.",
      params: ["cordD", "wrapLane", "wrapGap"],
      faces: {
        x: ["cordD", "wrapLane", "wrapGap"],
        y: ["cordD"],
        z: ["cordD"],
      },
      ...box(
        [x - r - 1, d.cy - loopW / 2 - 2, d.cz - loopH / 2 - 2],
        [x + r + 1, d.cy + loopW / 2 + 2, d.cz + loopH / 2 + 2]
      ),
    });
  }
  return features;
}

export function powerBankMeasurements(d) {
  const p = d.p;
  const list = [
    { title: "Sleeve length", axis: "x", end0: 0, end1: p.sleeveLen, named: p.sleeveLen, params: ["sleeveLen"], parts: ["sleeve"] },
    { title: "USB-end lane width", axis: "x", end0: d.wrapX0, end1: d.wrapX1, named: p.wrapLane, params: ["wrapLane"], parts: ["sleeve"] },
    { title: "Gap between lanes", axis: "x", end0: d.wrapX1, end1: d.wrapX2, named: p.wrapGap, params: ["wrapGap"], parts: ["sleeve"] },
    { title: "Tight-end lane width", axis: "x", end0: d.wrapX2, end1: d.wrapX3, named: p.wrapLane, params: ["wrapLane"], parts: ["sleeve"] },
    {
      title: "Wrap zone",
      axis: "x",
      end0: d.wrapX0,
      end1: d.wrapX3,
      named: d.wrapX3 - d.wrapX0,
      params: ["wrapLane", "wrapGap"],
      parts: ["sleeve"],
    },
    {
      title: "Clip spacing",
      axis: "x",
      end0: d.clipXA,
      end1: d.clipXB,
      named: d.clipXB - d.clipXA,
      params: ["wrapLane", "wrapGap", "wrapInset", "cordD"],
      parts: ["sleeve"],
      when: () => !!p.clipOn,
    },
    {
      title: "Outer width",
      axis: "y",
      end0: 0,
      end1: d.outerW,
      named: d.outerW,
      params: ["bankW", "clearXY", "wall", "wrapStick"],
      parts: ["sleeve"],
    },
    {
      title: "Entry hole width",
      axis: "y",
      end0: d.holeY0,
      end1: d.holeY0 + d.innerW0,
      named: d.innerW0,
      params: ["bankW", "clearXY"],
      parts: ["sleeve"],
    },
    {
      title: "Outer thickness",
      axis: "z",
      end0: 0,
      end1: d.outerH,
      named: d.outerH,
      params: ["bankH", "clearZ", "wall", "wrapStick"],
      parts: ["sleeve"],
    },
    {
      title: "Entry hole thickness",
      axis: "z",
      end0: d.holeZ0,
      end1: d.holeZ0 + d.innerH0,
      named: d.innerH0,
      params: ["bankH", "clearZ"],
      parts: ["sleeve"],
    },
    {
      title: "Bank length",
      axis: "x",
      end0: d.bankX0,
      end1: d.bankX0 + p.bankL,
      named: p.bankL,
      params: ["bankL"],
      parts: ["bank"],
    },
    {
      title: "Bank width",
      axis: "y",
      end0: d.bankY0,
      end1: d.bankY0 + p.bankW,
      named: p.bankW,
      params: ["bankW"],
      parts: ["bank"],
    },
    {
      title: "Bank thickness",
      axis: "z",
      end0: d.bankZ0,
      end1: d.bankZ0 + p.bankH,
      named: p.bankH,
      params: ["bankH"],
      parts: ["bank"],
    },
    {
      title: "Width clearance",
      axis: "y",
      end0: d.holeY0,
      end1: d.bankY0,
      named: p.clearXY,
      params: ["clearXY"],
      parts: ["sleeve", "bank"],
      pair: true,
    },
    {
      title: "Width clearance",
      axis: "y",
      end0: d.bankY0 + p.bankW,
      end1: d.holeY0 + d.innerW0,
      named: p.clearXY,
      params: ["clearXY"],
      parts: ["sleeve", "bank"],
      pair: true,
    },
    {
      title: "Thickness clearance",
      axis: "z",
      end0: d.holeZ0,
      end1: d.bankZ0,
      named: p.clearZ,
      params: ["clearZ"],
      parts: ["sleeve", "bank"],
      pair: true,
    },
    {
      title: "Thickness clearance",
      axis: "z",
      end0: d.bankZ0 + p.bankH,
      end1: d.holeZ0 + d.innerH0,
      named: p.clearZ,
      params: ["clearZ"],
      parts: ["sleeve", "bank"],
      pair: true,
    },
    {
      title: "Cord spacing",
      axis: "x",
      end0: d.beltMidA,
      end1: d.beltMidB,
      named: d.beltMidB - d.beltMidA,
      params: ["wrapLane", "wrapGap"],
      parts: ["cord"],
    },
    {
      kind: "chord",
      title: "Cord diameter",
      value: p.cordD,
      named: p.cordD,
      tol: 0.9,
      params: ["cordD"],
      parts: ["cord"],
    },
  ];
  if (Math.abs(d.wrapX0 - p.wrapInset) < 0.25) {
    list.push({
      title: "End inset",
      axis: "x",
      end0: 0,
      end1: d.wrapX0,
      named: p.wrapInset,
      params: ["wrapInset"],
      parts: ["sleeve"],
    });
  }
  return list;
}

export function inspectPowerBank(hit, d) {
  const feature = featureAt(hit.point, powerBankFeatures(d), hit.partId);
  if (!feature) {
    return {
      title: "Spot",
      detail: "This spot is not tied to a slider.",
      params: [],
      box: null,
    };
  }
  const face = faceAxis(hit.normal);
  let params = (feature.faces && feature.faces[face]) || feature.params || [];
  if (hit.partId === "bank" && hit.normal) {
    const ax = Math.abs(hit.normal.x);
    const ay = Math.abs(hit.normal.y);
    const az = Math.abs(hit.normal.z);
    if (ay > 0.45 && az > 0.45) params = ["bankR", "bankW", "bankH"];
  }
  const note = feature.notes?.[face];
  return {
    title: feature.title,
    detail: note || feature.detail,
    params,
    box: { min: feature.min, max: feature.max },
  };
}

export function measurePowerBank(a, b, d) {
  const { hits } = measurementsForSpan(a, b, powerBankMeasurements(d));
  return describeMeasurements(hits);
}
