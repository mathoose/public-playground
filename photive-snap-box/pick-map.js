import { usbY } from "./geometry.js";
import {
  describeMeasurements,
  faceAxis,
  featureAt,
  measurementsForSpan,
} from "../shared/model-pick-map.js";

function beadCenters(d, lift) {
  const p = d.p;
  const z = d.baseZ - d.beadDrop + lift;
  const xs = [d.outerL * 0.28, d.outerL * 0.72];
  const ys = [d.outerW + p.lipClear, -p.lipClear];
  const out = [];
  for (const x of xs) for (const y of ys) out.push({ x, y, z });
  return out;
}

export function photiveFeatures(d, lift = 0) {
  const p = d.p;
  const features = [];
  for (let i = 0; i < p.usbCount; i++) {
    const y = usbY(d, i);
    const params = ["usbHoleW", "usbHoleH", ...(p.usbCount > 1 ? ["usbPitch", "usbCount"] : [])];
    features.push({
      part: "base",
      id: `usb-${i}`,
      title: `USB hole ${i + 1}`,
      detail: "Cable hole in the front wall.",
      params,
      faces: { x: params, y: params, z: params },
      min: [-1.2, y - p.usbHoleW / 2 - 1.2, d.zUsb - p.usbHoleH / 2 - 1.2],
      max: [d.wall + 1.2, y + p.usbHoleW / 2 + 1.2, d.zUsb + p.usbHoleH / 2 + 1.2],
    });
  }
  const r = p.c8HoleD / 2;
  features.push({
    part: "base",
    id: "c8",
    title: "Rear cord hole",
    detail: "Figure-8 / C8 opening in the back wall.",
    params: ["c8HoleD"],
    faces: { x: ["c8HoleD"], y: ["c8HoleD"], z: ["c8HoleD"] },
    min: [d.outerL - d.wall - 2, d.outerW / 2 - r - 1, d.zC8 - r - 1],
    max: [d.outerL + 1, d.outerW / 2 + r + 1, d.zC8 + r + 1],
  });

  const top = d.baseZ + p.lidThickness + lift;
  const mouth = d.baseZ - p.lipDepth + lift;
  features.push({
    part: "lid",
    id: "lid",
    title: "Lid",
    detail: "Outside cap. Thickness is the top; the skirt overlap is lip depth.",
    params: ["lidThickness", "lipDepth", "lipClear", "lipThick"],
    faces: {
      x: ["lipThick", "lipClear", "lipDepth", "innerLength"],
      y: ["lipThick", "lipClear", "lipDepth", "innerWidth"],
      z: ["lidThickness", "lipDepth"],
    },
    min: [-d.lidOff, -d.lidOff, Math.min(mouth, top) - 0.5],
    max: [d.outerL + d.lidOff, d.outerW + d.lidOff, Math.max(mouth, top) + 0.5],
  });

  for (const t of d.teeth) {
    const params = [t.plug > 0 ? `plug${t.i + 1}` : "spacerFit", "usbExtra", "spacerFit"].filter(
      (k, i, a) => a.indexOf(k) === i
    );
    features.push({
      part: "spacer",
      id: `tooth-${t.i}`,
      title: `Spacer tooth ${t.i + 1}`,
      detail: t.plug > 0 ? "Tooth depth is the USB pocket minus this plug." : "Spine only — plug length is zero.",
      params,
      faces: { x: params, y: ["usbPitch", "usbHoleW"], z: ["innerHeight", "stopH"] },
      min: [d.wall, d.wall + t.y - d.toothW / 2, d.floor],
      max: [d.wall + Math.max(t.depth, p.spacerSpine), d.wall + t.y + d.toothW / 2, d.floor + d.spacerH],
    });
  }

  const brickX = d.wall + (d.stopH > 0 ? d.stopDepth : p.usbExtra + 0.4);
  const brickH = Math.max(1, d.cavityZ - 0.6);
  features.push({
    part: "brick",
    id: "brick",
    title: "Charger brick",
    detail: "Preview only. It fills the cavity between the USB pocket and the rear extra.",
    params: ["innerLength", "innerWidth", "innerHeight", "usbExtra", "acExtra"],
    faces: {
      x: ["innerLength", "usbExtra", "acExtra"],
      y: ["innerWidth"],
      z: ["innerHeight", "floor"],
    },
    min: [brickX, d.yBrick0, d.floor],
    max: [brickX + d.brickL, d.yBrick0 + d.brickW, d.floor + brickH],
  });
  return features;
}

function fallback(hit, d) {
  const face = faceAxis(hit.normal);
  const p = d.p;
  if (hit.partId === "base") {
    if (face === "z") {
      return {
        title: hit.point.z < p.floor + 0.8 ? "Tray floor" : "Tray rim",
        detail: "Floor thickness, or the cavity height if you are on the top rim.",
        params: hit.point.z < p.floor + 0.8 ? ["floor"] : ["innerHeight", "floor"],
      };
    }
    if (face === "y") {
      return { title: "Tray side", detail: "Inner width plus the two walls.", params: ["innerWidth", "wall"] };
    }
    const usbSide = hit.point.x < d.outerL / 2;
    return {
      title: usbSide ? "USB end" : "Rear end",
      detail: "Length of the tray. The near extra is the USB pocket; the far extra is the rear cord side.",
      params: ["innerLength", "wall", usbSide ? "usbExtra" : "acExtra"],
    };
  }
  if (hit.partId === "plug") {
    return {
      title: "USB plug",
      detail: "Preview plug. Its length is that port's plug slider.",
      params: ["usbExtra"],
    };
  }
  return {
    title: "Spot",
    detail: "This spot is not tied to a slider.",
    params: [],
  };
}

export function inspectPhotive(hit, d, lift = 0) {
  if (hit.partId === "lid") {
    let nearest = Infinity;
    for (const c of beadCenters(d, lift)) {
      nearest = Math.min(nearest, Math.hypot(hit.point.x - c.x, hit.point.y - c.y, hit.point.z - c.z));
    }
    if (nearest < d.p.beadR + 1.6) {
      return {
        title: "Lid snap bead",
        detail: "Bead radius versus the lid clearance is what makes the snap bite.",
        params: ["beadR", "lipClear"],
        box: null,
      };
    }
  }
  const feature = featureAt(hit.point, photiveFeatures(d, lift), hit.partId);
  if (!feature) {
    const info = fallback(hit, d);
    return { ...info, box: null };
  }
  const face = faceAxis(hit.normal);
  const params = (feature.faces && feature.faces[face]) || feature.params || [];
  return {
    title: feature.title,
    detail: feature.detail,
    params,
    box: { min: feature.min, max: feature.max },
  };
}

export function photiveMeasurements(d, lift = 0) {
  const p = d.p;
  const list = [
    {
      title: "Tray length",
      axis: "x",
      end0: 0,
      end1: d.outerL,
      named: d.outerL,
      params: ["innerLength", "wall"],
      parts: ["base"],
    },
    {
      title: "Tray width",
      axis: "y",
      end0: 0,
      end1: d.outerW,
      named: d.outerW,
      params: ["innerWidth", "wall"],
      parts: ["base"],
    },
    {
      title: "Tray height",
      axis: "z",
      end0: 0,
      end1: d.baseZ,
      named: d.baseZ,
      params: ["innerHeight", "floor"],
      parts: ["base"],
    },
    {
      title: "Cavity length",
      axis: "x",
      end0: d.wall,
      end1: d.wall + d.innerL,
      named: d.innerL,
      params: ["innerLength"],
      parts: ["base"],
    },
    {
      title: "Cavity width",
      axis: "y",
      end0: d.wall,
      end1: d.wall + d.innerW,
      named: d.innerW,
      params: ["innerWidth"],
      parts: ["base"],
    },
    {
      title: "Rear cord hole",
      kind: "chord",
      value: p.c8HoleD,
      named: p.c8HoleD,
      tol: 1.2,
      params: ["c8HoleD"],
      parts: ["base"],
      when: (a, b) => a.point.x > d.outerL - d.wall - 4 && b.point.x > d.outerL - d.wall - 4,
    },
    {
      title: "Lid length",
      axis: "x",
      end0: -d.lidOff,
      end1: d.outerL + d.lidOff,
      named: d.lidL,
      params: ["innerLength", "wall", "lipClear", "lipThick"],
      parts: ["lid"],
    },
    {
      title: "Lid width",
      axis: "y",
      end0: -d.lidOff,
      end1: d.outerW + d.lidOff,
      named: d.lidW,
      params: ["innerWidth", "wall", "lipClear", "lipThick"],
      parts: ["lid"],
    },
    {
      title: "Lid height",
      axis: "z",
      end0: d.baseZ - p.lipDepth + lift,
      end1: d.baseZ + p.lidThickness + lift,
      named: p.lidThickness + p.lipDepth,
      params: ["lidThickness", "lipDepth"],
      parts: ["lid"],
    },
    {
      title: "Brick length",
      axis: "x",
      end0: d.wall + (d.stopH > 0 ? d.stopDepth : p.usbExtra + 0.4),
      end1: d.wall + (d.stopH > 0 ? d.stopDepth : p.usbExtra + 0.4) + d.brickL,
      named: d.brickL,
      params: ["innerLength", "usbExtra", "acExtra"],
      parts: ["brick"],
    },
    {
      title: "Brick width",
      axis: "y",
      end0: d.yBrick0,
      end1: d.yBrick0 + d.brickW,
      named: d.brickW,
      params: ["innerWidth"],
      parts: ["brick"],
    },
  ];
  for (let i = 0; i < p.usbCount; i++) {
    const y = usbY(d, i);
    list.push({
      title: `USB hole ${i + 1} width`,
      axis: "y",
      end0: y - p.usbHoleW / 2,
      end1: y + p.usbHoleW / 2,
      named: p.usbHoleW,
      params: ["usbHoleW"],
      parts: ["base"],
    });
    list.push({
      title: `USB hole ${i + 1} height`,
      axis: "z",
      end0: d.zUsb - p.usbHoleH / 2,
      end1: d.zUsb + p.usbHoleH / 2,
      named: p.usbHoleH,
      params: ["usbHoleH"],
      parts: ["base"],
    });
    if (i < p.usbCount - 1) {
      const y2 = usbY(d, i + 1);
      list.push({
        title: "USB hole pitch",
        axis: "y",
        end0: y,
        end1: y2,
        named: p.usbPitch,
        params: ["usbPitch"],
        parts: ["base"],
      });
    }
  }
  for (const t of d.teeth) {
    if (!(t.depth > 0)) continue;
    list.push({
      title: `Tooth ${t.i + 1} depth`,
      axis: "x",
      end0: d.wall,
      end1: d.wall + t.depth,
      named: t.depth,
      params: t.plug > 0 ? [`plug${t.i + 1}`, "spacerFit", "usbExtra"] : ["spacerFit", "usbExtra"],
      parts: ["spacer"],
    });
  }
  if (d.stopH > 0) {
    list.push({
      title: "Brick stop height",
      axis: "z",
      end0: d.floor,
      end1: d.floor + d.stopH,
      named: d.stopH,
      params: ["stopH"],
      parts: ["spacer"],
    });
  }
  return list;
}

export function measurePhotive(a, b, d, lift = 0) {
  return describeMeasurements(measurementsForSpan(a, b, photiveMeasurements(d, lift)).hits);
}
