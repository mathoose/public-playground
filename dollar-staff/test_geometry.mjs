#!/usr/bin/env node
// Card fits in the pocket, both shells are real solids, broom thread ID is a 3/4"-5 ACME minor.
import assert from "node:assert/strict";
import { CARD, DEFAULT_PARAMS, THREAD_ID, derive } from "./geometry.js";
import { assembly3mf, buildShells, cardSolid, loadManifold } from "./cad.js";

const wasm = await loadManifold();
const { Manifold } = wasm;

function grownCard(raw, temps) {
  const d = derive(raw);
  const card = cardSolid(wasm, raw, temps);
  const padX = d.p.clearance + 0.8;
  const padZ = d.p.clearance + 0.8;
  const padY = d.p.clearance * 0.5 + 0.35;
  const grown = Manifold.cube([CARD.w + 2 * padX, CARD.t + 2 * padY, CARD.h + 2 * padZ], true).translate([
    0,
    d.cardCenterY,
    d.barCenterZ,
  ]);
  temps.push(grown);
  return { card, grown, d };
}

function check(label, raw) {
  const temps = [];
  const { front, back, d } = buildShells(wasm, raw, temps, "preview");
  for (const [name, solid] of [
    ["front", front],
    ["back", back],
  ]) {
    assert.equal(solid.status(), "NoError", `${label} ${name} status`);
    assert.ok(solid.volume() > 4000, `${label} ${name} volume ${solid.volume()}`);
    assert.ok(solid.getMesh().triVerts.length / 3 > 80, `${label} ${name} triangles`);
  }

  assert.ok(d.threadID > 13.2 && d.threadID < 16.5, `${label} thread ID ${d.threadID} outside 3/4"-5 ACME minor`);
  assert.ok(Math.abs(d.threadID - THREAD_ID) < 1e-9, `${label} thread ID drifted`);
  assert.ok(d.pitch > 5.07 && d.pitch < 5.09, `${label} pitch ${d.pitch}`);

  const { card, grown } = grownCard(raw, temps);
  const hitF = front.intersect(card);
  const hitB = back.intersect(card);
  temps.push(hitF, hitB);
  assert.ok(hitF.volume() < 1, `${label} card hits front ${hitF.volume().toFixed(2)} mm³`);
  assert.ok(hitB.volume() < 1, `${label} card hits back ${hitB.volume().toFixed(2)} mm³`);
  const wallF = front.intersect(grown);
  const wallB = back.intersect(grown);
  temps.push(wallF, wallB);
  assert.ok(wallF.volume() > 30, `${label} card is not capped by the front (${wallF.volume().toFixed(1)})`);
  assert.ok(wallB.volume() > 30, `${label} card is not walled by the back (${wallB.volume().toFixed(1)})`);

  assert.ok(d.pocketW >= CARD.w + 2 * d.p.clearance - 1e-6, `${label} pocket width`);
  assert.ok(d.pocketH >= CARD.h + 2 * d.p.clearance - 1e-6, `${label} pocket height`);
  assert.ok(d.pocketD >= CARD.t + d.p.clearance - 1e-6, `${label} pocket depth`);
  assert.ok(d.lineGap >= 6, `${label} line gap ${d.lineGap} is not a visible split`);
  assert.ok(d.loopW > d.lineSpan * 4, `${label} S is not larger than the two lines (${d.loopW.toFixed(0)} vs ${d.lineSpan.toFixed(1)})`);
  assert.ok(d.loopW + 0.1 >= CARD.w && d.lineH + 0.1 >= CARD.h, `${label} sign smaller than the card`);

  const gapZ = d.barCenterZ + d.ay * 0.28;
  const gap = Manifold.cube([d.lineGap * 0.45, d.frontT + 0.3, 12], true).translate([0, d.frontT / 2, gapZ]);
  const onLine = Manifold.cube([d.lineW * 0.4, d.frontT * 0.55, 12], true).translate([d.lineX, d.frontT / 2, gapZ]);
  const gapHit = front.intersect(gap);
  const lineHit = front.intersect(onLine);
  temps.push(gap, onLine, gapHit, lineHit);
  assert.ok(gapHit.volume() < 8, `${label} center gap is filled (${gapHit.volume().toFixed(1)} mm³)`);
  assert.ok(lineHit.volume() > 15, `${label} vertical stroke missing (${lineHit.volume().toFixed(1)} mm³)`);

  const backBb = back.boundingBox();
  const frontBb = front.boundingBox();
  assert.ok(Math.abs(backBb.min[2]) < 0.2, `${label} socket mouth not on z=0 (${backBb.min[2]})`);
  assert.ok(frontBb.min[2] > d.socketTop - 4, `${label} front shell includes the socket (z ${frontBb.min[2]})`);
  assert.ok(backBb.max[2] > frontBb.max[2] - 1, `${label} back is shorter than the front`);

  const probeR = d.threadID / 2 - 0.35;
  const probe = Manifold.cylinder(d.p.engage * 0.45, probeR, probeR, 32, false).translate([
    0,
    d.yCenter,
    d.threadStart + d.p.engage * 0.3,
  ]);
  const biteR = d.threadID / 2 + 1.15;
  const bite = Manifold.cylinder(d.p.engage * 0.4, biteR, biteR, 32, false).translate([
    0,
    d.yCenter,
    d.threadStart + d.lead + 2,
  ]);
  const clearHit = back.intersect(probe);
  const crestHit = back.intersect(bite);
  temps.push(probe, bite, clearHit, crestHit);
  assert.ok(clearHit.volume() < 8, `${label} bore narrower than thread ID (${clearHit.volume().toFixed(2)})`);
  assert.ok(crestHit.volume() > 40, `${label} thread crests do not reach the minor ID (${crestHit.volume().toFixed(1)})`);

  const cardBb = card.boundingBox();
  assert.ok(cardBb.min[0] > frontBb.min[0] && cardBb.max[0] < frontBb.max[0], `${label} card sticks out in X`);
  assert.ok(cardBb.min[2] > backBb.min[2] && cardBb.max[2] < backBb.max[2], `${label} card sticks out in Z`);

  console.log(
    `${label}: S ${d.loopW.toFixed(0)}×${d.loopH.toFixed(0)} mm, lines ${d.lineW.toFixed(1)} mm with ${d.lineGap.toFixed(1)} mm gap, ${d.totalH.toFixed(0)} mm tall, ` +
      `pocket ${d.pocketW.toFixed(2)}×${d.pocketH.toFixed(2)}×${d.pocketD.toFixed(2)}, ` +
      `thread ID ${d.threadID.toFixed(2)} mm × ${d.p.engage} mm, ` +
      `front ${(front.volume() / 1000).toFixed(1)} cm³, back ${(back.volume() / 1000).toFixed(1)} cm³`
  );
  for (const t of temps) t.delete?.();
}

check("default", DEFAULT_PARAMS);
check("small tight", { ...DEFAULT_PARAMS, dollarW: 120, stroke: 11, clearance: 0.2, lineGap: 6, engage: 16 });
check("large loose", { ...DEFAULT_PARAMS, dollarW: 190, stroke: 18, clearance: 1, lineGap: 14, engage: 40 });

const temps = [];
const built = buildShells(wasm, DEFAULT_PARAMS, temps, "preview");
const text = Buffer.from(assembly3mf(built.front.getMesh(), built.back.getMesh())).toString("latin1");
assert.equal((text.match(/<item /g) || []).length, 1, "3MF should have one build item");
assert.equal((text.match(/<component /g) || []).length, 2, "3MF assembly should reference both shells");
assert.ok(text.includes('unit="millimeter"'), "3MF unit");
assert.ok(text.includes("Front shell") && text.includes("Back shell"), "3MF part names");
for (const t of temps) t.delete?.();

console.log("ok");
