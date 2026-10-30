import { centerline } from "./clip.js";
import {
  describeMeasurements,
  faceAxis,
  measurementsForSpan,
} from "../shared/model-pick-map.js";

function slotLayout(p) {
  const along = Math.max(0, p.slot_along);
  const depth = Math.min(Math.max(0, p.slot_depth), p.thickness - 0.55);
  if (along <= 0 || depth <= 0) return null;
  const t = p.thickness;
  const rC = p.hook_inner_r + t / 2;
  const xMin = rC + 1.5;
  const xMax = p.back_length - t / 2;
  const floor = along;
  const opening = floor + 2 * along;
  let xOpenRight = xMax - Math.max(0.5, p.slot_from_end);
  let xOpenLeft = xOpenRight - opening;
  if (xOpenLeft < xMin) {
    xOpenLeft = xMin;
    xOpenRight = Math.min(xMax - 1.0, xOpenLeft + opening);
  }
  return { x0: xOpenLeft, x1: xOpenRight, depth };
}

function region(p, x, y) {
  const t = p.thickness;
  const rC = p.hook_inner_r + t / 2;
  const yBack = t / 2;
  const cx = rC;
  const slot = slotLayout(p);
  if (slot && x >= slot.x0 - 0.6 && x <= slot.x1 + 0.6 && y <= t * 0.95) return "slot";
  if (y <= t + 0.9 && x >= cx - 0.8) return "back";
  const cy = yBack + rC;
  if (Math.hypot(x - cx, y - cy) <= rC + t * 0.75) return "hook";
  const yPinch = yBack + t + p.pinch_gap;
  const xPinch = cx + p.arm_length * p.pinch_t;
  const xTip = cx + p.arm_length;
  const yTip = yBack + p.tip_standoff;
  if (Math.hypot(x - xPinch, y - yPinch) <= Math.hypot(x - xTip, y - yTip)) return "pinch";
  return "tip";
}

const REGION = {
  slot: {
    title: "Putty slot",
    detail: "Chamfer on the back. Location is measured from the tab end.",
    params: ["slot_from_end", "slot_along", "slot_depth"],
  },
  back: {
    title: "Back",
    detail: "Flat tab. Length runs out to the free end; thickness is the ribbon.",
    params: ["back_length", "thickness"],
  },
  hook: {
    title: "Hook",
    detail: "The bend. Inner radius is the hook slider.",
    params: ["hook_inner_r", "thickness"],
  },
  pinch: {
    title: "Pinch",
    detail: "Gap between the back and the arm.",
    params: ["pinch_gap", "arm_length", "thickness"],
  },
  tip: {
    title: "Tip",
    detail: "End of the arm. Stand-off and angle aim the tip.",
    params: ["tip_standoff", "tip_angle_deg", "arm_length"],
  },
};

function regionBox(p, id) {
  const t = p.thickness;
  const w = p.width / 2;
  const rC = p.hook_inner_r + t / 2;
  const yBack = t / 2;
  const z0 = -w;
  const z1 = w;
  if (id === "slot") {
    const slot = slotLayout(p);
    if (!slot) return null;
    return { min: [slot.x0, 0, z0], max: [slot.x1, t, z1] };
  }
  if (id === "back") return { min: [rC - t, 0, z0], max: [p.back_length, t + 0.4, z1] };
  if (id === "hook") {
    const cy = yBack + rC;
    return { min: [0, 0, z0], max: [rC + t, cy + t / 2, z1] };
  }
  const xTip = rC + p.arm_length;
  const yTip = yBack + p.tip_standoff;
  return { min: [rC - t, yBack, z0], max: [xTip + t, yTip + t, z1] };
}

export function inspectClip(hit, p) {
  const face = faceAxis(hit.normal);
  const id = region(p, hit.point.x, hit.point.y);
  const info = REGION[id];
  const params = face === "z" ? ["width", ...info.params.filter((k) => k !== "width")] : info.params.slice();
  return {
    title: face === "z" ? `${info.title} face` : info.title,
    detail: face === "z" ? `Width is the extrusion. ${info.detail}` : info.detail,
    params,
    box: regionBox(p, id),
  };
}

function nearestCenterDist(p, point) {
  const line = centerline(p);
  let best = Infinity;
  for (const q of line) {
    const d = Math.hypot(q[0] - point.x, q[1] - point.y);
    if (d < best) best = d;
  }
  return best;
}

export function clipMeasurements(p) {
  const t = p.thickness;
  const rC = p.hook_inner_r + t / 2;
  const yBack = t / 2;
  const half = p.width / 2;
  const xTip = rC + p.arm_length;
  const yTip = yBack + p.tip_standoff;
  return [
    {
      title: "Width",
      axis: "z",
      end0: -half,
      end1: half,
      named: p.width,
      params: ["width"],
      parts: ["clip"],
    },
    {
      title: "Back length",
      axis: "x",
      end0: rC,
      end1: p.back_length - t / 2,
      named: p.back_length,
      params: ["back_length"],
      parts: ["clip"],
    },
    {
      kind: "chord",
      title: "Ribbon thickness",
      value: t,
      named: t,
      tol: Math.max(0.35, t * 0.18),
      params: ["thickness"],
      parts: ["clip"],
      when: (a, b) => {
        const da = nearestCenterDist(p, a.point);
        const db = nearestCenterDist(p, b.point);
        return da > t * 0.25 && db > t * 0.25 && Math.abs(a.point.z - b.point.z) < t;
      },
    },
    {
      kind: "chord",
      title: "Pinch gap",
      value: p.pinch_gap,
      named: p.pinch_gap,
      tol: 0.35,
      params: ["pinch_gap"],
      parts: ["clip"],
    },
    {
      kind: "chord",
      title: "Hook inner diameter",
      value: p.hook_inner_r * 2,
      named: p.hook_inner_r * 2,
      tol: 1.1,
      params: ["hook_inner_r"],
      parts: ["clip"],
    },
    {
      title: "Tip stand-off",
      axis: "y",
      end0: yBack,
      end1: yTip,
      named: p.tip_standoff,
      params: ["tip_standoff"],
      parts: ["clip"],
    },
    {
      title: "Arm length",
      axis: "x",
      end0: rC,
      end1: xTip,
      named: p.arm_length,
      params: ["arm_length"],
      parts: ["clip"],
      when: (a, b) => Math.max(a.point.y, b.point.y) > t + p.pinch_gap,
    },
  ];
}

export function measureClip(a, b, p) {
  return describeMeasurements(measurementsForSpan(a, b, clipMeasurements(p)).hits);
}
