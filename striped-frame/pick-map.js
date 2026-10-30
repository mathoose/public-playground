import { frameClipFor, hangHoleLayout } from "./geometry.js";
import { faceAxis } from "../shared/model-pick-map.js";
import {
  inspectSharedFrame,
  measureFrame,
  sharedFrameMeasurements,
  tongueAt,
} from "../shared/frame-pick-map.js";

const WIDTH = ["photoW", "lip", "mouldingWidth"];
const HEIGHT = ["photoH", "lip", "mouldingWidth"];

function specFor(layout) {
  return {
    clip: frameClipFor(layout),
    photo: layout.photo,
    outer: layout.outer,
    opening: layout.opening,
    widthParams: WIDTH,
    heightParams: HEIGHT,
    openingWidthParams: ["photoW", "lip"],
    openingHeightParams: ["photoH", "lip"],
    holes: hangHoleLayout(layout.params),
  };
}

function heightKey(layout, colorIndex) {
  return layout.params.equalHeights ? "sharedHeight" : `colorHeight${colorIndex}`;
}

function stripeAt(point, layout, clip) {
  const zLocal = point.z - clip.frameBackZ;
  let best = null;
  let bestArea = Infinity;
  for (const seg of layout.segments) {
    if (zLocal < -0.5 || zLocal > seg.height + 0.7) continue;
    for (const b of seg.boxes) {
      if (
        point.x < b.minX - 0.8 ||
        point.x > b.maxX + 0.8 ||
        point.y < b.minY - 0.8 ||
        point.y > b.maxY + 0.8
      ) {
        continue;
      }
      const area = Math.max(0.01, b.w * b.h);
      if (area < bestArea) {
        bestArea = area;
        best = { seg, box: b, zLocal };
      }
    }
  }
  return best;
}

function inspectCover(hit, layout, clip) {
  const point = hit.point;
  const tongue = tongueAt(point, clip);
  if (tongue && point.z <= clip.frameBackZ + clip.tongueT + 0.4) {
    const stripe = stripeAt(point, layout, clip);
    if (!stripe || point.z < clip.frameBackZ + Math.min(clip.tongueT, stripe.seg.height) * 0.45) {
      return {
        title: "Slide tongue",
        detail: "Tongue size follows the moulding. No slider sets the tongue thickness.",
        params: [...WIDTH, ...HEIGHT],
        box: tongue,
      };
    }
  }
  const found = stripeAt(point, layout, clip);
  if (!found) {
    const bed = layout.params.bedThickness;
    if (bed > 0.05 && point.z >= clip.frameBackZ - 0.3 && point.z <= clip.frameBackZ + bed + 0.3) {
      return {
        title: "Bed web",
        detail: "Thin plate under the stripes.",
        params: ["bedThickness"],
        box: {
          min: [-layout.outer.w / 2, -layout.outer.h / 2, clip.frameBackZ],
          max: [layout.outer.w / 2, layout.outer.h / 2, clip.frameBackZ + bed],
        },
      };
    }
    return { title: "Cover", detail: "No slider sets this spot.", params: [], box: null };
  }
  const { seg, box: b } = found;
  const face = faceAxis(hit.normal);
  const params = [`colorThick${seg.colorIndex}`];
  const radial = b.side === "left" || b.side === "right" ? "x" : "y";
  if (face === "z" || b.kind === "arc") params.push(heightKey(layout, seg.colorIndex));
  if (face === radial || b.kind === "arc") {
    const outer =
      (b.side === "right" && point.x > (layout.opening.w / 2 + layout.outer.w / 2) / 2) ||
      (b.side === "left" && point.x < -(layout.opening.w / 2 + layout.outer.w / 2) / 2) ||
      (b.side === "top" && point.y > (layout.opening.h / 2 + layout.outer.h / 2) / 2) ||
      (b.side === "bottom" && point.y < -(layout.opening.h / 2 + layout.outer.h / 2) / 2) ||
      b.kind === "arc";
    if (outer) params.push("mouldingWidth", "outerCornerRadius");
    else params.push("lip", b.side === "left" || b.side === "right" ? "photoH" : "photoW");
  }
  if (face !== "z" && face !== radial) params.push(heightKey(layout, seg.colorIndex));
  return {
    title: `Color ${seg.colorIndex + 1} band`,
    detail: `Band along the path is ${(seg.length).toFixed(1)} mm after the pattern is scaled to close the loop. Layer height is ${seg.height.toFixed(1)} mm.`,
    params: [...new Set(params)],
    box: {
      min: [b.minX, b.minY, clip.frameBackZ],
      max: [b.maxX, b.maxY, clip.frameBackZ + seg.height],
    },
  };
}

function bandMeasurements(layout, clip) {
  const list = [];
  for (const seg of layout.segments) {
    for (const b of seg.boxes) {
      if (b.kind === "arc") continue;
      const alongX = b.side === "top" || b.side === "bottom";
      const len = alongX ? b.w : b.h;
      if (Math.abs(len - seg.length) > 1.5) continue;
      list.push({
        title: `Color ${seg.colorIndex + 1} band`,
        axis: alongX ? "x" : "y",
        end0: alongX ? b.minX : b.minY,
        end1: alongX ? b.maxX : b.maxY,
        named: seg.length,
        params: [`colorThick${seg.colorIndex}`],
        parts: ["cover"],
        tol: Math.max(1.5, seg.length * 0.08),
      });
    }
  }
  if (layout.params.equalHeights) {
    list.push({
      title: "Layer height",
      axis: "z",
      end0: clip.frameBackZ,
      end1: clip.frameBackZ + layout.params.sharedHeight,
      named: layout.params.sharedHeight,
      params: ["sharedHeight"],
      parts: ["cover"],
      tol: Math.max(0.8, layout.params.sharedHeight * 0.15),
    });
  } else {
    layout.params.colors.forEach((c, i) => {
      list.push({
        title: `Color ${i + 1} height`,
        axis: "z",
        end0: clip.frameBackZ,
        end1: clip.frameBackZ + c.height,
        named: c.height,
        params: [`colorHeight${i}`],
        parts: ["cover"],
        tol: Math.max(0.7, c.height * 0.12),
        when: (a, b) => {
          const sa = stripeAt(a.point, layout, clip);
          const sb = stripeAt(b.point, layout, clip);
          return sa?.seg.colorIndex === i && sb?.seg.colorIndex === i;
        },
      });
    });
  }
  if (layout.params.bedThickness > 0.05) {
    list.push({
      title: "Bed web",
      axis: "z",
      end0: clip.frameBackZ,
      end1: clip.frameBackZ + layout.params.bedThickness,
      named: layout.params.bedThickness,
      params: ["bedThickness"],
      parts: ["cover"],
    });
  }
  const mw = layout.mouldingWidth;
  const rails = [
    ["Top rail", "y", layout.opening.h / 2, layout.outer.h / 2],
    ["Bottom rail", "y", -layout.outer.h / 2, -layout.opening.h / 2],
    ["Right rail", "x", layout.opening.w / 2, layout.outer.w / 2],
    ["Left rail", "x", -layout.outer.w / 2, -layout.opening.w / 2],
  ];
  for (const [title, axis, end0, end1] of rails) {
    list.push({
      title,
      axis,
      end0,
      end1,
      named: mw,
      params: ["mouldingWidth"],
      parts: ["cover"],
      tol: Math.max(1.2, mw * 0.12),
    });
  }
  return list;
}

export function inspectStriped(hit, layout) {
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

export function measureStriped(a, b, layout) {
  if (!a?.point || !b?.point || !layout) {
    return { title: "Between the two clicks", detail: "No slider sets this distance.", params: [] };
  }
  const spec = specFor(layout);
  return measureFrame(a, b, [...sharedFrameMeasurements(spec), ...bandMeasurements(layout, spec.clip)]);
}
