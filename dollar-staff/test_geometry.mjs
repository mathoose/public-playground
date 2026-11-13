#!/usr/bin/env node
// Card is edge-on to the S, both shells are real solids, broom thread ID is a 3/4"-5 ACME minor.
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
  const grown = Manifold.cube([CARD.t + 2 * padY, CARD.w + 2 * padX, CARD.h + 2 * padZ], true).translate([
    d.cardCenterX,
    d.cardCenterY,
    d.barCenterZ,
  ]);
  temps.push(grown);
  return { card, grown, d };
}

function check(label, raw) {
  const temps = [];
  const { front, back, sign, d } = buildShells(wasm, raw, temps, "preview");
  for (const [name, solid] of [
    ["case front", front],
    ["case back", back],
    ["dollar sign", sign],
  ]) {
    assert.equal(solid.status(), "NoError", `${label} ${name} status`);
    assert.ok(solid.volume() > 4000, `${label} ${name} volume ${solid.volume()}`);
    assert.ok(solid.getMesh().triVerts.length / 3 > 80, `${label} ${name} triangles`);
  }

  assert.ok(d.threadID > 13.2 && d.threadID < 16.5, `${label} thread ID ${d.threadID} outside 3/4"-5 ACME minor`);
  assert.ok(Math.abs(d.threadID - THREAD_ID) < 1e-9, `${label} thread ID drifted`);
  assert.ok(d.pitch > 5.07 && d.pitch < 5.09, `${label} pitch ${d.pitch}`);

  assert.ok(d.pocketX >= CARD.t + d.p.clearance - 1e-6, `${label} pocket is not thick enough for the edge`);
  assert.ok(d.pocketY >= CARD.w + 2 * d.p.clearance - 1e-6, `${label} pocket does not stick out the short side`);
  assert.ok(d.pocketZ >= CARD.h + 2 * d.p.clearance - 1e-6, `${label} pocket is shorter than the card`);
  assert.ok(d.pocketX < 3, `${label} card is not edge-on (${d.pocketX.toFixed(2)} mm through the sign)`);
  assert.ok(d.pocketZ > d.pocketY + 10, `${label} long side is not vertical`);
  assert.ok(d.barW < 36, `${label} center bar is still card-width (${d.barW})`);
  assert.ok(d.tip > d.neck + 2, `${label} dovetail has no flare`);

  const { card, grown } = grownCard(raw, temps);
  const hitF = front.intersect(card);
  const hitB = back.intersect(card);
  const hitS = sign.intersect(card);
  temps.push(hitF, hitB, hitS);
  assert.ok(hitF.volume() < 1, `${label} card hits case front ${hitF.volume().toFixed(2)} mm³`);
  assert.ok(hitB.volume() < 1, `${label} card hits case back ${hitB.volume().toFixed(2)} mm³`);
  assert.ok(hitS.volume() < 1, `${label} card hits the dollar ${hitS.volume().toFixed(2)} mm³`);
  const wallF = front.intersect(grown);
  const wallB = back.intersect(grown);
  temps.push(wallF, wallB);
  assert.ok(wallF.volume() > 30, `${label} card is not capped by the case front (${wallF.volume().toFixed(1)})`);
  assert.ok(wallB.volume() > 30, `${label} card is not walled by the case back (${wallB.volume().toFixed(1)})`);

  const cardBb = card.boundingBox();
  const cardSpan = [cardBb.max[0] - cardBb.min[0], cardBb.max[1] - cardBb.min[1], cardBb.max[2] - cardBb.min[2]];
  assert.ok(cardSpan[0] < 2, `${label} card is thick across the sign (${cardSpan[0].toFixed(2)})`);
  assert.ok(cardSpan[1] > 40 && cardSpan[2] > cardSpan[1], `${label} card is not a vertical fin on the sign`);

  const tailY = d.signFrontY - d.tailDepth * 0.55;
  const inTail = Manifold.cube([d.neck * 0.7, 1.2, 10], true).translate([0, tailY, d.barCenterZ]);
  const beside = Manifold.cube([2.2, 1.4, 8], true).translate([d.barW * 0.38, d.yCenter, d.barCenterZ]);
  const grooveZ = d.tailZ0 + d.tailLen + Math.min(8, d.lead * 0.45);
  const groove = Manifold.cube([d.neck * 0.4, 1.1, 4], true).translate([0, tailY, grooveZ]);
  const tailOnBack = back.intersect(inTail);
  const tailOnFront = front.intersect(inTail);
  const tailHit = Manifold.union([tailOnBack, tailOnFront]);
  const tailSign = sign.intersect(inTail);
  temps.push(tailOnBack, tailOnFront);
  const barHit = sign.intersect(beside);
  const grooveHit = sign.intersect(groove);
  temps.push(inTail, beside, groove, tailHit, tailSign, barHit, grooveHit);
  assert.ok(tailHit.volume() > 8, `${label} male dovetail missing (${tailHit.volume().toFixed(1)})`);
  assert.ok(tailSign.volume() < 4, `${label} dovetail is fused to the dollar (${tailSign.volume().toFixed(1)})`);
  assert.ok(barHit.volume() > 8, `${label} center bar is not solid (${barHit.volume().toFixed(1)})`);
  assert.ok(grooveHit.volume() < 4, `${label} dovetail slot is closed (${grooveHit.volume().toFixed(1)})`);

  const caseOnSign = back.intersect(sign);
  const lidOnSign = front.intersect(sign);
  temps.push(caseOnSign, lidOnSign);
  assert.ok(caseOnSign.volume() + lidOnSign.volume() < 8, `${label} case intersects the dollar (${(caseOnSign.volume() + lidOnSign.volume()).toFixed(1)})`);

  const signBb = sign.boundingBox();
  const caseBb = back.boundingBox();
  const frontBb = front.boundingBox();
  assert.ok(Math.max(caseBb.max[1], frontBb.max[1]) > signBb.max[1] + 25, `${label} card case is not sticking out of the sign`);
  assert.ok(Math.abs(signBb.min[2]) < 0.2, `${label} socket mouth not on z=0 (${signBb.min[2]})`);
  assert.ok(caseBb.min[2] > d.socketTop - 2, `${label} snap case includes the socket (z ${caseBb.min[2]})`);

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
    d.threadStart + d.leadIn + 2,
  ]);
  const clearHit = sign.intersect(probe);
  const crestHit = sign.intersect(bite);
  temps.push(probe, bite, clearHit, crestHit);
  assert.ok(clearHit.volume() < 8, `${label} bore narrower than thread ID (${clearHit.volume().toFixed(2)})`);
  assert.ok(crestHit.volume() > 40, `${label} thread crests do not reach the minor ID (${crestHit.volume().toFixed(1)})`);

  console.log(
    `${label}: $ ${d.loopW.toFixed(0)}×${d.barH.toFixed(0)} mm, bar ${d.barW.toFixed(1)} mm, ${d.totalH.toFixed(0)} mm tall, ` +
      `pocket edge ${d.pocketX.toFixed(2)} × out ${d.pocketY.toFixed(2)} × tall ${d.pocketZ.toFixed(2)} (perpendicular to the S), ` +
      `dovetail ${d.neck.toFixed(1)}→${d.tip.toFixed(1)} mm, ` +
      `thread ID ${d.threadID.toFixed(2)} mm × ${d.p.engage} mm, ` +
      `case ${(front.volume() / 1000 + back.volume() / 1000).toFixed(1)} cm³, sign ${(sign.volume() / 1000).toFixed(1)} cm³`
  );
  for (const t of temps) t.delete?.();
}

check("default", DEFAULT_PARAMS);
check("small tight", { ...DEFAULT_PARAMS, dollarW: 110, stroke: 12, barW: 16, clearance: 0.2, engage: 16 });
check("large loose", { ...DEFAULT_PARAMS, dollarW: 180, stroke: 18, barW: 30, clearance: 1, engage: 40 });

const temps = [];
const built = buildShells(wasm, DEFAULT_PARAMS, temps, "preview");
const text = Buffer.from(assembly3mf(built.front.getMesh(), built.back.getMesh(), built.sign.getMesh())).toString("latin1");
assert.equal((text.match(/<item /g) || []).length, 1, "3MF should have one build item");
assert.equal((text.match(/<component /g) || []).length, 3, "3MF assembly should reference the case halves and the dollar");
assert.ok(text.includes('unit="millimeter"'), "3MF unit");
assert.ok(text.includes("Case front") && text.includes("Case back") && text.includes("Dollar sign"), "3MF part names");
for (const t of temps) t.delete?.();

console.log("ok");
