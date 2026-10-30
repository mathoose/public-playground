import { describeMeasurements, measurementsForSpan } from "../shared/model-pick-map.js";
import { derive } from "./geometry.js";

export function measurementsFor(params) {
  const d = derive(params);
  const tol = (span) => Math.min(8, Math.max(1.2, span * 0.08));
  return [
    {
      title: "Slot length",
      axis: "y",
      end0: -d.p.slotLength / 2,
      end1: d.p.slotLength / 2,
      params: ["slotLength"],
      tol: tol(d.p.slotLength),
    },
    {
      title: "Slot width",
      axis: "x",
      end0: -d.p.slotWidth / 2,
      end1: d.p.slotWidth / 2,
      params: ["slotWidth"],
      tol: tol(d.p.slotWidth),
    },
    {
      title: "Square end",
      axis: "x",
      end0: -d.headX / 2,
      end1: d.headX / 2,
      params: ["squareEnd"],
      tol: tol(d.headX),
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
