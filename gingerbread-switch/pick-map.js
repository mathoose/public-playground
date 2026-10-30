import { describeMeasurements, measurementsForSpan } from "../shared/model-pick-map.js";
import { derive } from "./geometry.js";

export function measurementsFor(params) {
  const d = derive(params);
  const tol = (span) => Math.min(8, Math.max(1.2, span * 0.08));
  return [
    {
      title: "Opening width",
      axis: "x",
      end0: -d.p.openingW / 2,
      end1: d.p.openingW / 2,
      params: ["openingW"],
      tol: tol(d.p.openingW),
    },
    {
      title: "Opening height",
      axis: "y",
      end0: -d.p.openingH / 2,
      end1: d.p.openingH / 2,
      params: ["openingH"],
      tol: tol(d.p.openingH),
    },
    {
      title: "House depth",
      axis: "z",
      end0: 0,
      end1: d.wallFront,
      params: ["depth"],
      tol: tol(d.wallFront),
    },
    {
      title: "Plate thickness",
      axis: "z",
      end0: -d.p.plateT,
      end1: 0,
      params: ["plateT"],
      tol: tol(d.p.plateT),
    },
    {
      title: "Plate width",
      axis: "x",
      end0: -d.plateHW,
      end1: d.plateHW,
      params: ["overhang"],
      tol: tol(d.plateHW * 2),
    },
    {
      title: "Plate height",
      axis: "y",
      end0: -d.plateHH,
      end1: d.plateHH,
      params: ["overhang"],
      tol: tol(d.plateHH * 2),
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
