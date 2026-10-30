import { describeMeasurements, measurementsForSpan } from "../shared/model-pick-map.js";
import { derive } from "./geometry.js";

/** Axis-aligned spans for the baroque frame mesh (centered, Y up, Z depth). */
export function measurementsFor(params) {
  const d = derive(params);
  const hw = d.p.width / 2;
  const hh = d.p.height / 2;
  const tol = (span) => Math.min(6, Math.max(1.5, span * 0.04));
  return [
    {
      title: "Frame width",
      axis: "x",
      end0: -hw,
      end1: hw,
      params: ["width"],
      tol: tol(d.p.width),
    },
    {
      title: "Frame height",
      axis: "y",
      end0: -hh,
      end1: hh,
      params: ["height"],
      tol: tol(d.p.height),
    },
    {
      title: "Frame depth",
      axis: "z",
      end0: 0,
      end1: d.depth,
      params: ["thickness"],
      tol: tol(d.depth),
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
