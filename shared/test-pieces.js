// Small fit coupons for each designer. The shared test export engraves the
// setting numbers on a shelf fused to the coupon.

import { box, buildMarkedTest, cut, fuse, rod } from "./test-export.js";
import { derive as coasterDerive } from "../coaster-base/geometry.js";
import { buildLockSolid } from "../costco-bin-lock/stl.js";
import { mergeParams as pumpkinParams } from "../pumpkin-lantern/geometry.js";
import { derive as wrapDerive } from "../power-bank-wrap/geometry.js";
import { layoutBeads, frameClipFor as bubbleClip } from "../bubble-frame/geometry.js";
import { layoutStripes, frameClipFor as stripedClip } from "../striped-frame/geometry.js";
import { derive as tagDerive } from "../paddington-tag/geometry.js";
import { derive as razorDerive } from "../henson-razor-tool/geometry.js";
import { derive as houseDerive } from "../gingerbread-switch/geometry.js";
import { derive as baroqueDerive } from "../baroque-frame/geometry.js";
import { derive as photiveDerive } from "../photive-snap-box/geometry.js";
import { linkMetrics } from "../bone-side-bag/geometry.js";
import { buildLinkSolid } from "../bone-side-bag/stl.js";
import { derive as poopDerive } from "../poop-bag-holder/geometry.js";
import { derive as holderDerive, mergeParams as holderParams } from "../private/holder-geometry.js";

function marked(feature, label, stlName) {
  return buildMarkedTest({ feature, label, stlName });
}

export function buildCoasterTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = coasterDerive(params);
    const w = d.p.armWidth;
    const h = d.p.armHeight;
    const deckT = d.deckT;
    const deck = box(Manifold, [18, w + 8, deckT], [9, (w + 8) / 2, deckT / 2], keep);
    const wall = box(Manifold, [14, w, h], [9, w / 2, deckT + h / 2 - 0.15], keep);
    return fuse(deck, wall, keep);
  }, label, "coaster-arm-test");
}

export function buildLockTest(params, label) {
  return marked((wasm, keep, temps) => buildLockSolid(wasm, params, temps, 48), label, "costco-lock-test");
}

export function buildSeatTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const p = pumpkinParams(params);
    const id = p.ledDiameter + 2 * p.clearance;
    const od = id + 10;
    const height = Math.max(3, Math.min(12, p.ledThickness));
    let ring = cut(
      rod(Manifold, height, od / 2, 48, [0, 0, 0], keep),
      rod(Manifold, height + 2, id / 2, 40, [0, 0, -1], keep),
      keep
    );
    if (p.cordDiameter >= 1) {
      const mid = (id + od) / 4;
      const notch = box(
        Manifold,
        [p.cordDiameter, (od - id) / 2 + 2, p.cordDiameter],
        [0, mid, Math.min(p.cordHeight, height * 0.6)],
        keep
      );
      ring = cut(ring, notch, keep);
    }
    return ring;
  }, label, "pumpkin-seat-test");
}

export function buildSleeveTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = wrapDerive(params);
    const len = 16;
    const outer = box(Manifold, [d.bodyW, d.bodyH, len], [d.bodyW / 2, d.bodyH / 2, len / 2], keep);
    const inner = box(Manifold, [d.innerW0, d.innerH0, len + 2], [d.bodyW / 2, d.bodyH / 2, len / 2], keep);
    return cut(outer, inner, keep);
  }, label, "power-bank-sleeve-test");
}

export function buildPinchTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const w = Math.max(8, Number(params.width) || 20);
    const t = Math.max(1.2, Number(params.thickness) || 2.8);
    const gap = Math.max(0.15, Number(params.pinch_gap) || 0.45);
    const len = 16;
    const span = t + gap + t;
    const back = box(Manifold, [w, len, t], [w / 2, len / 2, t / 2], keep);
    const jaw = box(Manifold, [w, len, t], [w / 2, len / 2, t + gap + t / 2], keep);
    const hinge = box(Manifold, [w, Math.max(t, 2.4), span], [w / 2, Math.max(t, 2.4) / 2, span / 2], keep);
    return fuse(fuse(back, jaw, keep), hinge, keep);
  }, label, "postit-pinch-test");
}

function standBody(clipFor, layoutFor) {
  return (wasm, keep) => {
    const { Manifold } = wasm;
    return (params) => {
      const stand = clipFor(layoutFor({ ...params, standEnabled: true })).pegStand;
      let solid = null;
      for (const part of stand.boxes) {
        const sx = part.x1 - part.x0;
        const sy = part.y1 - part.y0;
        const sz = part.z1 - part.z0;
        if (sx < 0.15 || sy < 0.15 || sz < 0.15) continue;
        const piece = box(
          Manifold,
          [sx, sy, sz],
          [(part.x0 + part.x1) / 2, (part.y0 + part.y1) / 2, (part.z0 + part.z1) / 2],
          keep
        );
        solid = solid ? fuse(solid, piece, keep) : piece;
      }
      if (!solid) throw new Error("Stand test is empty");
      return solid;
    };
  };
}

export function buildBubbleStandTest(params, label) {
  return marked((wasm, keep) => standBody(bubbleClip, layoutBeads)(wasm, keep)(params), label, "bubble-stand-test");
}

export function buildStripedStandTest(params, label) {
  return marked((wasm, keep) => standBody(stripedClip, layoutStripes)(wasm, keep)(params), label, "striped-stand-test");
}

export function buildTagTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = tagDerive(params);
    const hole = d.p.hole;
    const thick = d.p.thickness;
    const od = Math.max(hole + 8, hole * 1.7);
    let disk = cut(
      rod(Manifold, thick, od / 2, 40, [0, 0, 0], keep),
      rod(Manifold, thick + 2, hole / 2, 28, [0, 0, -1], keep),
      keep
    );
    const ribH = Math.max(0.4, d.p.letterH);
    const rib = box(Manifold, [Math.max(6, hole), 1.6, ribH], [od * 0.22, 0, thick + ribH / 2 - 0.08], keep);
    return fuse(disk, rib, keep);
  }, label, "paddington-hole-test");
}

export function buildPocketTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = razorDerive(params);
    const margin = 4;
    const length = d.pocketL + margin * 2;
    const width = d.pocketWTop + margin * 2;
    const height = d.p.floor + d.p.capDepth;
    const body = box(Manifold, [length, width, height], [length / 2, width / 2, height / 2], keep);
    const pocket = box(
      Manifold,
      [d.pocketL, d.pocketWTop, d.p.capDepth + 1],
      [length / 2, width / 2, d.p.floor + (d.p.capDepth + 1) / 2],
      keep
    );
    return cut(body, pocket, keep);
  }, label, "henson-pocket-test");
}

export function buildOpeningTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = houseDerive(params);
    const border = 6;
    const w = d.p.openingW + border * 2;
    const h = d.p.openingH + border * 2;
    const t = d.p.plateT;
    const plate = box(Manifold, [w, h, t], [w / 2, h / 2, t / 2], keep);
    const hole = box(Manifold, [d.p.openingW, d.p.openingH, t + 2], [w / 2, h / 2, t / 2], keep);
    return cut(plate, hole, keep);
  }, label, "gingerbread-opening-test");
}

export function buildMouldingTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = baroqueDerive(params);
    const sx = Math.max(6, d.borderX);
    const sy = 20;
    const sz = Math.max(1.6, d.depth);
    return box(Manifold, [sx, sy, sz], [sx / 2, sy / 2, sz / 2], keep);
  }, label, "baroque-moulding-test");
}

export function buildLipTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = photiveDerive(params);
    const len = 26;
    const wall = Math.max(1.6, d.p.wall);
    const gap = d.p.lipClear;
    const lip = d.p.lipThick;
    const height = Math.max(d.p.lipDepth, 3);
    const span = wall + gap + lip;
    const base = box(Manifold, [len, wall, height], [len / 2, wall / 2, height / 2], keep);
    const lipBar = box(Manifold, [len, lip, height], [len / 2, wall + gap + lip / 2, height / 2], keep);
    const bridge = box(Manifold, [3.2, span, 2.2], [1.6, span / 2, 1.1], keep);
    let solid = fuse(fuse(base, lipBar, keep), bridge, keep);
    const holeW = d.p.usbHoleW;
    const holeH = d.p.usbHoleH;
    const padW = holeW + 6;
    const padH = holeH + 6;
    const padT = 2.4;
    const padX = len + padW / 2 - 0.5;
    const pad = box(Manifold, [padW, padH, padT], [padX, padH / 2, padT / 2], keep);
    const hole = box(Manifold, [holeW, holeH, padT + 2], [padX, padH / 2, padT / 2], keep);
    solid = fuse(solid, pad, keep);
    return cut(solid, hole, keep);
  }, label, "photive-lip-test");
}

export function buildLinkTest(params, label) {
  return marked((wasm, _keep, temps) => {
    const metrics = linkMetrics(params.linkLength);
    return buildLinkSolid(wasm, metrics, 0, metrics.eyeR + 1, 0, 32, temps);
  }, label, "bone-link-test");
}

export function buildRollTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = poopDerive(params);
    const height = 12;
    const inner = d.ri;
    const outer = inner + d.p.wall;
    let tube = cut(
      rod(Manifold, height, outer, 48, [0, 0, 0], keep),
      rod(Manifold, height + 2, inner, 40, [0, 0, -1], keep),
      keep
    );
    const slot = box(Manifold, [d.p.slotW, outer + 2, height + 2], [0, outer / 2, height / 2], keep);
    return cut(tube, slot, keep);
  }, label, "poop-roll-test");
}

export function buildHolderTest(params, label) {
  return marked((wasm, keep) => {
    const { Manifold } = wasm;
    const d = holderDerive(holderParams(params));
    const innerW = d.p.width;
    const innerD = d.p.depth;
    const wall = 2.2;
    const floor = 2.2;
    const rise = 10;
    const outerW = innerW + wall * 2;
    const floorB = box(Manifold, [outerW, innerD, floor], [outerW / 2, innerD / 2, floor / 2], keep);
    const left = box(Manifold, [wall, innerD, rise], [wall / 2, innerD / 2, floor + rise / 2 - 0.12], keep);
    const right = box(
      Manifold,
      [wall, innerD, rise],
      [outerW - wall / 2, innerD / 2, floor + rise / 2 - 0.12],
      keep
    );
    let solid = fuse(fuse(floorB, left, keep), right, keep);
    const gauge = box(Manifold, [d.p.phoneT, 8, floor + 1], [outerW / 2, innerD - 4, floor / 2], keep);
    return cut(solid, gauge, keep);
  }, label, "private-pocket-test");
}
