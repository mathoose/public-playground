import { describeMeasurements, measurementsForSpan } from "../shared/model-pick-map.js";
import { derive } from "./geometry.js";

export function measurementsFor(params) {
  const d = derive(params);
  const tol = (span) => Math.min(8, Math.max(1.2, span * 0.08));
  return [
    {
      title: "Tag height",
      axis: "y",
      end0: 0,
      end1: d.height,
      params: ["height"],
      tol: tol(d.height),
    },
    {
      title: "Tag width",
      axis: "x",
      end0: -d.bodyHalf,
      end1: d.bodyHalf,
      params: ["height"],
      tol: tol(d.width),
    },
    {
      title: "Stack height",
      axis: "z",
      end0: 0,
      end1: d.totalH,
      params: ["thickness", "letterH"],
      tol: tol(d.totalH),
    },
    {
      title: "Cord hole",
      axis: "x",
      end0: d.holeX - d.p.hole / 2,
      end1: d.holeX + d.p.hole / 2,
      params: ["hole"],
      tol: tol(d.p.hole),
    },
  ];
}

export function measurePair(a, b, params) {
  const { hits } = measurementsForSpan(
    { point: a.point, partId: a.partId },
    { point: b.point, partId: b.partId },
    measurementsFor(params)
  );
  return describeMeasurements(hits);
}
