import { frameClipFor, hangHoleLayout } from "./geometry.js";
import { faceAxis } from "../shared/model-pick-map.js";
import {
  inspectSharedFrame,
  measureFrame,
  sharedFrameMeasurements,
  tongueAt,
} from "../shared/frame-pick-map.js";

const WIDTH = ["photoW", "ballDiameter", "imageOverlap"];
const HEIGHT = ["photoH", "ballDiameter", "imageOverlap"];

function specFor(layout) {
  const clip = frameClipFor(layout);
  return {
    clip,
    photo: layout.photo,
    outer: layout.outer,
    opening: layout.opening,
    widthParams: WIDTH,
    heightParams: HEIGHT,
    openingWidthParams: ["photoW", "imageOverlap"],
    openingHeightParams: ["photoH", "imageOverlap"],
    holes: hangHoleLayout(layout.params),
  };
}

function nearestBead(point, layout, clip) {
  const z0 = clip.frameBackZ - 0.5;
  const z1 = clip.frameBackZ + layout.radius + 0.8;
  if (point.z < z0 || point.z > z1) return null;
  let best = null;
  let bestD = layout.radius + 0.9;
  for (const bead of layout.beads) {
    const d = Math.hypot(bead.x - point.x, bead.y - point.y);
    if (d < bestD) {
      bestD = d;
      best = bead;
    }
  }
  return best;
}

function inspectCover(hit, layout, clip) {
  const point = hit.point;
  const tongue = tongueAt(point, clip);
  const bead = nearestBead(point, layout, clip);
  const tongueFirst = tongue && point.z <= clip.frameBackZ + clip.tongueT + 0.45;
  if (tongueFirst && (!bead || point.z < clip.frameBackZ + layout.radius * 0.35)) {
    return {
      title: "Slide tongue",
      detail: "Tongue size follows the border. No slider sets the tongue thickness.",
      params: [...WIDTH, ...HEIGHT],
      box: tongue,
    };
  }
  if (!bead) {
    return {
      title: "Cover",
      detail: "No slider sets this spot.",
      params: [],
      box: null,
    };
  }
  const face = faceAxis(hit.normal);
  const corner = bead.role === "corner";
  const params = ["ballDiameter"];
  if (face === "x" || corner) params.push("photoW");
  if (face === "y" || corner) params.push("photoH");
  if (face !== "z") params.push("imageOverlap");
  if (!corner && (bead.side === "top" || bead.side === "bottom" || bead.side === "left" || bead.side === "right")) {
    params.push("ballOverlap");
  }
  if (corner) params.push("outerCornerRadius");
  const r = layout.radius;
  const title = corner ? "Corner bead" : bead.side === "top" || bead.side === "bottom" || bead.side === "left" || bead.side === "right" ? `${bead.side[0].toUpperCase()}${bead.side.slice(1)} bead` : "Bead";
  return {
    title,
    detail: face === "z" ? "Dome height is the ball radius." : "Bead size, and where this side of the frame sits.",
    params: [...new Set(params)],
    box: {
      min: [bead.x - r, bead.y - r, clip.frameBackZ],
      max: [bead.x + r, bead.y + r, clip.frameBackZ + r],
    },
  };
}

export function inspectBubble(hit, layout) {
  if (!hit?.point || !layout) return { title: "Spot", detail: "No slider sets this spot.", params: [] };
  const spec = specFor(layout);
  if (hit.partId === "cover") return inspectCover(hit, layout, spec.clip);
  return (
    inspectSharedFrame(hit, spec) || {
      title: "Frame",
      detail: "No slider sets this spot.",
      params: [],
    }
  );
}

export function measureBubble(a, b, layout) {
  if (!a?.point || !b?.point || !layout) {
    return { title: "Between the two clicks", detail: "No slider sets this distance.", params: [] };
  }
  const spec = specFor(layout);
  const clip = spec.clip;
  const list = sharedFrameMeasurements(spec);
  list.push({
    title: "Ball diameter",
    kind: "chord",
    value: layout.radius * 2,
    named: layout.radius * 2,
    params: ["ballDiameter"],
    parts: ["cover"],
    when: (pa, pb) =>
      layout.beads.some((bead) => {
        const da = Math.hypot(pa.point.x - bead.x, pa.point.y - bead.y);
        const db = Math.hypot(pb.point.x - bead.x, pb.point.y - bead.y);
        return da <= layout.radius + 1 && db <= layout.radius + 1;
      }),
  });
  list.push({
    title: "Bead dome",
    axis: "z",
    end0: clip.frameBackZ,
    end1: clip.frameBackZ + layout.radius,
    named: layout.radius,
    params: ["ballDiameter"],
    parts: ["cover"],
    tol: Math.max(0.8, layout.radius * 0.2),
    when: (pa, pb) => {
      const bead = nearestBead(pa.point, layout, clip);
      if (!bead) return false;
      return Math.hypot(pb.point.x - bead.x, pb.point.y - bead.y) <= layout.radius + 1;
    },
  });
  return measureFrame(a, b, list);
}
