/**
 * Click and two-point mapping shared by the bubble and striped frames.
 * Coordinates are content space: photo centered, +X right, +Y up, z = 0 on the
 * back of the plate. Cover meshes sit forward by clip.frameBackZ.
 * Distances come from frameClipLayout / the app layout. No invented sliders.
 */
import {
  describeMeasurements,
  faceAxis,
  insideBox,
  measurementsForSpan,
  unionParams,
} from "./model-pick-map.js";

export const PART_SHOW = {
  assembled: { cover: true, back: true, stand: true, photo: true },
  side: { cover: true, back: true, stand: true, photo: true },
  cover: { cover: true, back: false, stand: false, photo: true },
  back: { cover: false, back: true, stand: true, photo: false },
};

function boxOf(b, pad = 0) {
  return {
    min: [b.x0 - pad, b.y0 - pad, b.z0 - pad],
    max: [b.x1 + pad, b.y1 + pad, b.z1 + pad],
  };
}

function frameTol(span) {
  const s = Math.abs(Number(span) || 0);
  if (s < 8) return undefined;
  return Math.min(4, Math.max(1.6, s * 0.012));
}

function span(title, axis, end0, end1, params, extra = {}) {
  const named = Math.abs(end1 - end0);
  return {
    title,
    axis,
    end0,
    end1,
    named,
    params,
    tol: extra.tol ?? frameTol(named),
    ...extra,
  };
}

export function legReachInfo(outerH) {
  const raw = Math.max(1, Number(outerH) || 0) * 0.38;
  const capped = raw < 40 || raw > 90;
  const leg = Math.min(90, Math.max(40, raw));
  return { raw, capped, leg };
}

function hangAt(point, holes) {
  if (!holes?.length) return null;
  let best = null;
  let bestD = Infinity;
  for (const hole of holes) {
    const d = Math.hypot(point.x - hole.x, point.y - hole.y);
    const limit = hole.r + 1.4;
    if (d <= limit && d < bestD && point.z < hole.r + 4) {
      best = hole;
      bestD = d;
    }
  }
  return best;
}

function railAt(point, clip) {
  for (const rail of clip.rails || []) {
    const boxes = [rail.wall, rail.stop, ...(rail.lips || [])];
    for (const b of boxes) {
      if (insideBox(point, [b.x0, b.y0, b.z0], [b.x1, b.y1, b.z1], 0.75)) return b;
    }
  }
  return null;
}

export function tongueAt(point, clip) {
  const z0 = clip.frameBackZ;
  for (const t of clip.tongues || []) {
    const min = [t.x0, t.y0, z0 + t.z0];
    const max = [t.x1, t.y1, z0 + t.z1];
    if (insideBox(point, min, max, 0.6)) return { min, max };
  }
  return null;
}

function plateBox(clip) {
  const p = clip.plate;
  return { min: [-p.w / 2, -p.h / 2, 0], max: [p.w / 2, p.h / 2, p.t] };
}

/** Back plate, slide rails, hang holes, photo preview, and the peg stand. */
export function inspectSharedFrame(hit, spec) {
  const point = hit.point;
  const face = faceAxis(hit.normal);
  const { clip, photo, widthParams, heightParams } = spec;
  const holes = spec.holes || [];

  if (hit.partId === "photo") {
    const nearX = Math.abs(Math.abs(point.x) - photo.w / 2) < 3;
    const nearY = Math.abs(Math.abs(point.y) - photo.h / 2) < 3;
    const params = [];
    if (nearX || !nearY) params.push(spec.photoWKey || "photoW");
    if (nearY || !nearX) params.push(spec.photoHKey || "photoH");
    return {
      title: "Photo",
      detail: "Preview only. Width and height size this rectangle. The gap under the cover is fixed.",
      params: [...new Set(params)],
      box: {
        min: [-photo.w / 2, -photo.h / 2, point.z - 0.2],
        max: [photo.w / 2, photo.h / 2, point.z + 0.2],
      },
    };
  }

  if (hit.partId === "stand") {
    const stand = clip.pegStand;
    const leg = legReachInfo(clip.outerH);
    const params = ["standHoles"];
    let title = "Stand";
    let detail = "Lean uses the Slight / Medium / More buttons, which move the peg row.";
    if (face === "y") {
      title = "Stand sheet";
      detail = `Sheet is ${stand.sheetT.toFixed(1)} mm thick. No slider sets that thickness. ${detail}`;
    } else if (face === "z") {
      title = "Stand leg";
      if (leg.capped) {
        detail = `Leg length is capped at ${leg.leg.toFixed(1)} mm (40–90 mm), so frame size is not changing it. ${detail}`;
      } else {
        detail = `Leg length follows the frame height (${leg.leg.toFixed(1)} mm). ${detail}`;
        params.push(...heightParams);
      }
    } else {
      title = "Stand width";
      detail = `Leg spacing follows the back width (${(stand.halfSpan * 2).toFixed(1)} mm across). ${detail}`;
      params.push(...widthParams);
    }
    const y0 = stand.yHole - stand.sheetT / 2;
    return {
      title,
      detail,
      params,
      box: {
        min: [-stand.halfSpan - stand.legW / 2, y0, -stand.legReach],
        max: [stand.halfSpan + stand.legW / 2, y0 + stand.sheetT, stand.pegLen],
      },
    };
  }

  if (hit.partId === "back") {
    const hole = hangAt(point, holes);
    if (hole) {
      const params = ["hangHoleDiameter", "hangInsetTop", "hangHoles"];
      if (holes.length > 1) params.push("hangInsetSide", spec.photoWKey || "photoW");
      params.push(spec.photoHKey || "photoH");
      return {
        title: "Hang hole",
        detail: "Hole in the back plate. From-top and from-side insets place it.",
        params,
        box: {
          min: [hole.x - hole.r, hole.y - hole.r, -0.2],
          max: [hole.x + hole.r, hole.y + hole.r, clip.plate.t + 0.4],
        },
      };
    }
    const rail = railAt(point, clip);
    if (rail) {
      return {
        title: "Slide rail",
        detail: "The rail follows the border. Tongue and lip sizes are not separate sliders.",
        params: [...widthParams, ...heightParams, "plateThickness"],
        box: boxOf(rail, 0),
      };
    }
    const plate = plateBox(clip);
    if (face === "z") {
      return {
        title: "Back plate",
        detail: "Plate thickness.",
        params: ["plateThickness"],
        box: plate,
      };
    }
    if (face === "x") {
      return {
        title: "Back width",
        detail: "The plate sits just inside the cover.",
        params: widthParams,
        box: plate,
      };
    }
    return {
      title: "Back height",
      detail: "The plate sits just inside the cover.",
      params: heightParams,
      box: plate,
    };
  }

  return null;
}

export function sharedFrameMeasurements(spec) {
  const { clip, photo, outer, opening, widthParams, heightParams } = spec;
  const photoW = spec.photoWKey || "photoW";
  const photoH = spec.photoHKey || "photoH";
  const list = [
    span("Outer width", "x", -outer.w / 2, outer.w / 2, widthParams, { parts: ["cover", "back"] }),
    span("Outer height", "y", -outer.h / 2, outer.h / 2, heightParams, { parts: ["cover", "back"] }),
    span("Photo width", "x", -photo.w / 2, photo.w / 2, [photoW], { parts: ["photo"] }),
    span("Photo height", "y", -photo.h / 2, photo.h / 2, [photoH], { parts: ["photo"] }),
    span("Opening width", "x", -opening.w / 2, opening.w / 2, spec.openingWidthParams || widthParams, {
      parts: ["cover"],
    }),
    span("Opening height", "y", -opening.h / 2, opening.h / 2, spec.openingHeightParams || heightParams, {
      parts: ["cover"],
    }),
    span("Back width", "x", -clip.plate.w / 2, clip.plate.w / 2, widthParams, { parts: ["back"] }),
    span("Back height", "y", -clip.plate.h / 2, clip.plate.h / 2, heightParams, { parts: ["back"] }),
    span("Back thickness", "z", 0, clip.plate.t, ["plateThickness"], { parts: ["back"] }),
  ];

  const holes = spec.holes || [];
  if (holes.length === 2) {
    const x = Math.abs(holes[0].x);
    list.push(
      span("Hang hole spacing", "x", -x, x, [photoW, "hangInsetSide"], { parts: ["back"] })
    );
  }
  if (holes.length) {
    const y = holes[0].y;
    list.push(
      span("Hang hole from top of photo", "y", y, photo.h / 2, [photoH, "hangInsetTop"], {
        parts: ["back", "photo"],
        pair: true,
      })
    );
    list.push({
      title: "Hang hole diameter",
      kind: "chord",
      value: holes[0].r * 2,
      named: holes[0].r * 2,
      params: ["hangHoleDiameter"],
      parts: ["back"],
    });
  }

  const stand = clip.pegStand;
  if (stand?.cut) {
    const leg = legReachInfo(clip.outerH);
    list.push(
      span("Stand leg", "z", -stand.legReach, 0, leg.capped ? [] : heightParams, {
        parts: ["stand"],
        note: leg.capped
          ? `Leg length is capped at ${leg.leg.toFixed(1)} mm (40–90 mm). No slider changes it at this size.`
          : "",
        when: (a, b) => Math.abs(a.point.x - b.point.x) < stand.legW && Math.abs(a.point.y - b.point.y) < stand.sheetT + 2,
      })
    );
    list.push(
      span("Leg spacing", "x", -stand.halfSpan, stand.halfSpan, widthParams, {
        parts: ["stand"],
        when: (a, b) => Math.abs(a.point.z - b.point.z) < 12,
      })
    );
    const y0 = stand.yHole - stand.sheetT / 2;
    list.push(
      span("Stand sheet", "y", y0, y0 + stand.sheetT, [], {
        parts: ["stand"],
        note: `Stand sheet is ${stand.sheetT.toFixed(1)} mm thick. No slider sets it.`,
        when: (a, b) => Math.abs(a.point.x - b.point.x) < 10 && Math.abs(a.point.z - b.point.z) < 10,
      })
    );
  }
  return list;
}

export function measureFrame(a, b, measurements) {
  const { hits } = measurementsForSpan(a, b, measurements);
  const described = describeMeasurements(hits);
  if (!hits.length) return described;
  const params = unionParams(hits);
  const note = hits.map((h) => h.note).find(Boolean);
  if (note && !params.length) described.detail = note;
  return described;
}
