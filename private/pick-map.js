import { HOLDER } from "./holder-geometry.js";
import { describeMeasurements, faceAxis, measurementsForSpan } from "../shared/model-pick-map.js";

function xZone(x) {
  if (x < -HOLDER.CUT_X) return "left";
  if (x > HOLDER.CUT_X) return "right";
  return "mid";
}

/** Width stretch moves the left wing and the right wing apart. Depth moves only the front (y < CUT_Y). */
function widthMoves(a, b) {
  return xZone(a.point.x) !== xZone(b.point.x);
}

function depthMoves(a, b) {
  const front = (y) => y < HOLDER.CUT_Y;
  return front(a.point.y) !== front(b.point.y);
}

export function inspectHolder(hit, p) {
  if (hit.partId === "phone") {
    const face = faceAxis(hit.normal);
    return {
      title: "Phone",
      detail: "Preview only. Thickness stacks along the pocket; width is side to side.",
      params: face === "x" ? ["phoneW", "width"] : ["phoneT", "phones", "depth"],
      box: null,
    };
  }
  if (hit.partId === "pumpkin") {
    return {
      title: "Pumpkin",
      detail: "Scale it with the 1x / 2x / 3x buttons. No slider changes this model.",
      params: [],
      box: null,
    };
  }
  const movesW = Math.abs(hit.point.x) > HOLDER.CUT_X;
  const movesD = hit.point.y < HOLDER.CUT_Y;
  const params = [...(movesW ? ["width"] : []), ...(movesD ? ["depth"] : [])];
  if (!params.length) {
    return {
      title: "Holder body",
      detail: "This part of the mesh stays put. Width only moves the side wings, and depth only moves the front.",
      params: [],
      box: null,
    };
  }
  const face = faceAxis(hit.normal);
  const title = face === "x" ? "Side wall" : face === "y" ? "Front or back" : "Holder";
  return {
    title,
    detail: [
      movesW ? "Past the side cut, so the width slider moves it." : "",
      movesD ? "In front of the depth cut, so the depth slider moves it." : "",
    ]
      .filter(Boolean)
      .join(" "),
    params,
    box: null,
  };
}

export function measureHolder(a, b, p, d) {
  if (a.partId === "pumpkin" || b.partId === "pumpkin") {
    return {
      title: "Pumpkin",
      detail: "No slider sets this distance. The 1x / 2x / 3x buttons scale the whole model.",
      params: [],
    };
  }
  if (a.partId === "holder" && b.partId === "holder") {
    const params = [];
    if (widthMoves(a, b)) params.push("width");
    if (depthMoves(a, b)) params.push("depth");
    if (!params.length) {
      return {
        title: "Between the two clicks",
        detail: "No slider sets this distance. Both spots stay on the same side of the width and depth cuts.",
        params: [],
      };
    }
    const bits = [];
    if (params.includes("width")) bits.push(`inner width is ${p.width.toFixed(1)} mm`);
    if (params.includes("depth")) bits.push(`inner depth is ${p.depth.toFixed(1)} mm`);
    return {
      title: params.length === 2 ? "Width and depth" : params[0] === "width" ? "Width" : "Depth",
      detail: `The stretch moves these spots apart. ${bits.join("; ")}.`,
      params,
    };
  }
  const measurements = [];
  if (a.partId === "phone" && b.partId === "phone") {
    measurements.push(
      {
        title: "Phone width",
        axis: "x",
        end0: -p.phoneW / 2,
        end1: p.phoneW / 2,
        named: p.phoneW,
        params: ["phoneW"],
        parts: ["phone"],
      },
      {
        kind: "chord",
        title: "Phone thickness",
        value: p.phoneT - 0.3,
        named: p.phoneT,
        tol: 0.55,
        params: ["phoneT"],
        parts: ["phone"],
      },
      {
        kind: "chord",
        title: "Phone stack",
        value: p.phones * p.phoneT,
        named: p.phones * p.phoneT,
        tol: 1.4,
        params: ["phones", "phoneT"],
        parts: ["phone"],
      }
    );
  }
  const pair =
    (a.partId === "phone" && b.partId === "holder") || (a.partId === "holder" && b.partId === "phone");
  if (pair && d) {
    measurements.push({
      title: "Side gap",
      axis: "x",
      end0: Math.min(a.point.x, b.point.x),
      end1: Math.max(a.point.x, b.point.x),
      named: d.sideSlack,
      params: ["width", "phoneW"],
      tol: 1.2,
      when: (_a, _b, dist) => Math.abs(dist - d.sideSlack) < 1.2 || Math.abs(Math.abs(_b.point.x - _a.point.x) - d.sideSlack) < 1.2,
    });
  }
  const { hits } = measurementsForSpan(a, b, measurements);
  if (!hits.length) {
    return { title: "Between the two clicks", detail: "No slider sets this distance.", params: [] };
  }
  return describeMeasurements(hits);
}
