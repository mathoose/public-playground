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
    d.cardCenterZ,
  ]);
  temps.push(grown);
  return { card, grown, d };
}

function check(label, raw) {
  const temps = [];
  const { front, back, sign, socket, d } = buildShells(wasm, raw, temps, "preview");
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

  const flareX = d.neck / 2 + Math.min(0.7, (d.tip - d.neck) / 3);
  const tongueZ = d.tailZ0 + d.tailLen * 0.45;
  const inTail = Manifold.cube([1.1, 1.2, 5], true).translate([flareX, 0, tongueZ]);
  const beside = Manifold.cube([d.barW * 0.35, d.caseY * 0.35, 6], true).translate([
    0,
    0,
    d.caseCenterZ - d.caseZ / 2 - 8,
  ]);
  const groove = Manifold.cube([d.neck * 0.34, 1.2, 2.4], true).translate([0, 0, d.strokeTop - 1.5]);
  const prongL = Manifold.cube([4, 4, 6], true).translate([-d.barW * 0.28, 0, d.strokeTop + 8]);
  const prongR = Manifold.cube([4, 4, 6], true).translate([d.barW * 0.28, 0, d.strokeTop + 8]);
  const tailOnBack = back.intersect(inTail);
  const tailOnFront = front.intersect(inTail);
  const tailHit = Manifold.union([tailOnBack, tailOnFront]);
  const tailSign = sign.intersect(inTail);
  temps.push(tailOnBack, tailOnFront);
  const barHit = sign.intersect(beside);
  const grooveHit = sign.intersect(groove);
  const prongHit = Manifold.union([sign.intersect(prongL), sign.intersect(prongR)]);
  temps.push(inTail, beside, groove, prongL, prongR, tailHit, tailSign, barHit, grooveHit, prongHit);
  assert.ok(tailHit.volume() > 4, `${label} male dovetail missing (${tailHit.volume().toFixed(1)})`);
  assert.ok(tailSign.volume() < 4, `${label} dovetail is fused to the dollar (${tailSign.volume().toFixed(1)})`);
  assert.ok(barHit.volume() > 8, `${label} center bar is not solid (${barHit.volume().toFixed(1)})`);
  assert.ok(grooveHit.volume() < 4, `${label} dovetail slot is closed (${grooveHit.volume().toFixed(1)})`);
  assert.ok(prongHit.volume() < 4, `${label} two pieces still stick up above the dollar (${prongHit.volume().toFixed(1)})`);
  assert.ok(Math.abs(cardBb.max[2] - d.strokeTop) < 0.4, `${label} card top ${cardBb.max[2].toFixed(2)} is not even with the stroke ${d.strokeTop.toFixed(2)}`);

  const caseOnSign = back.intersect(sign);
  const lidOnSign = front.intersect(sign);
  temps.push(caseOnSign, lidOnSign);
  assert.ok(caseOnSign.volume() + lidOnSign.volume() < 8, `${label} case intersects the dollar (${(caseOnSign.volume() + lidOnSign.volume()).toFixed(1)})`);

  const signBb = sign.boundingBox();
  assert.ok(signBb.max[2] < d.strokeTop + 0.75, `${label} the sign rises above the stroke (${signBb.max[2].toFixed(2)} > ${d.strokeTop.toFixed(2)})`);
  const caseBb = back.boundingBox();
  const frontBb = front.boundingBox();
  const caseYMax = Math.max(caseBb.max[1], frontBb.max[1]);
  const caseYMin = Math.min(caseBb.min[1], frontBb.min[1]);
  assert.ok(caseYMax <= signBb.max[1] + 0.2, `${label} card sticks out past the sign (+Y ${caseYMax.toFixed(2)} > ${signBb.max[1].toFixed(2)})`);
  assert.ok(caseYMin >= signBb.min[1] - 0.2, `${label} card sticks out past the sign (-Y)`);
  assert.ok(signBb.max[1] > d.caseY / 2 - 0.4, `${label} sign does not reach the case`);
  const midWall = Manifold.cube([d.caseX + 8, 1.4, 3], true).translate([0, d.caseY / 2 - 0.8, d.caseCenterZ]);
  const wallFront = front.intersect(midWall);
  const wallBack = back.intersect(midWall);
  temps.push(midWall, wallFront, wallBack);
  const caseSpanX = wallFront.boundingBox().max[0] - wallBack.boundingBox().min[0];
  assert.ok(Math.abs(caseSpanX - d.barW) < 1.2, `${label} case is not as thick as the stroke (${caseSpanX.toFixed(2)} vs ${d.barW.toFixed(2)})`);
  for (const [name, solid] of [
    ["dollar sign", sign],
    ["case back", back],
    ["case front", front],
  ]) {
    const bits = solid.decompose();
    assert.equal(bits.length, 1, `${label} ${name} is ${bits.length} pieces`);
    for (const bit of bits) bit.delete();
  }
  const hookTip = Manifold.cube([10, 10, 8], true).translate([d.caseX / 2 + 6, 0, d.strokeTop - 10]);
  const hookOnBack = back.intersect(hookTip);
  const hookOnSign = sign.intersect(hookTip);
  temps.push(hookTip, hookOnBack, hookOnSign);
  assert.ok(hookOnBack.volume() > 15, `${label} the end of the S is not on the back case (${hookOnBack.volume().toFixed(1)})`);
  assert.ok(hookOnSign.volume() < 4, `${label} the end of the S is still loose on the sign (${hookOnSign.volume().toFixed(1)})`);
  const tongueDeep = Manifold.cube([3, 10, 4], true).translate([0, 0, d.tailZ0 + d.tailLen * 0.5]);
  const tongueDeepHit = Manifold.union([front.intersect(tongueDeep), back.intersect(tongueDeep)]);
  temps.push(tongueDeep, tongueDeepHit);
  assert.ok(tongueDeepHit.volume() > 70, `${label} dovetail tongue is still a thin fin (${tongueDeepHit.volume().toFixed(1)})`);
  assert.ok(Math.abs(d.signT - 36.8) < 0.05, `${label} S is not four times as thick (${d.signT})`);
  const curveY = d.loopW * 0.42;
  const curveZ = d.strokeTop - d.loopH * 0.22;
  const onPlate = Manifold.cube([5, 3, 5], true).translate([curveY, d.signT / 2 - 2, curveZ]);
  const offPlate = Manifold.cube([5, 3, 5], true).translate([curveY, d.signT / 2 + 3, curveZ]);
  const onHit = Manifold.union([sign.intersect(onPlate), back.intersect(onPlate)]);
  const offHit = Manifold.union([sign.intersect(offPlate), back.intersect(offPlate)]);
  temps.push(onPlate, offPlate, onHit, offHit);
  assert.ok(onHit.volume() > 4, `${label} thicker S misses the plate (${onHit.volume().toFixed(1)})`);
  assert.ok(offHit.volume() < 2, `${label} S is thicker than four times (${offHit.volume().toFixed(1)})`);
  const caseBottom = d.caseCenterZ - d.caseZ / 2;
  const corner = Manifold.cube([d.caseX * 0.28, 0.7, 0.7], true).translate([
    d.caseX * 0.25,
    d.caseY / 2 - 0.35,
    caseBottom + 0.35,
  ]);
  const cornerHit = front.intersect(corner);
  temps.push(corner, cornerHit);
  assert.ok(cornerHit.volume() > 0.05, `${label} bottom corner of the card box is still rounded (${cornerHit.volume().toFixed(3)})`);
  const waist = Manifold.cube([d.p.stroke, 8, d.p.stroke], true).translate([
    d.barW / 2 + d.p.stroke * 0.2,
    0,
    caseBottom - d.p.stroke * 0.55,
  ]);
  const waistHit = sign.intersect(waist);
  temps.push(waist, waistHit);
  assert.ok(waistHit.volume() > 20, `${label} the S is broken at the waist (${waistHit.volume().toFixed(1)})`);
  assert.ok(cardBb.min[0] < 0 && cardBb.max[0] > 0 && cardBb.min[1] < -10 && cardBb.max[1] > 10, `${label} S does not cross the middle of the card`);
  assert.ok(cardBb.min[2] > d.socketTop + 28, `${label} card is still down on the socket (z ${cardBb.min[2].toFixed(1)}, socket top ${d.socketTop.toFixed(1)})`);
  const lowHook = Manifold.cube([8, 8, 6], true).translate([d.loopW * 0.35, 0, d.socketTop + 12]);
  const lowHit = sign.intersect(lowHook);
  temps.push(lowHook, lowHit);
  assert.ok(lowHit.volume() < 4, `${label} the dollar sign is still beside the socket (${lowHit.volume().toFixed(1)})`);
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

  assert.equal(socket.status(), "NoError", `${label} socket test status`);
  const socketParts = socket.decompose();
  assert.equal(socketParts.length, 1, `${label} socket test is not one solid`);
  for (const part of socketParts) part.delete?.();
  const socketBb = socket.boundingBox();
  assert.ok(Math.abs(socketBb.min[2]) < 0.2, `${label} socket test mouth not on z=0`);
  assert.ok(socketBb.max[2] <= d.socketTop + 0.05, `${label} socket test includes the neck (${socketBb.max[2].toFixed(1)} > ${d.socketTop.toFixed(1)})`);
  assert.ok(socketBb.max[2] > d.boreEnd, `${label} socket test is shorter than the thread`);
  const socketCm3 = socket.volume() / 1000;
  assert.ok(socketCm3 > 8 && socketCm3 < 80, `${label} socket test volume ${socketCm3.toFixed(1)} cm³ is not just the thread`);
  const socketClear = socket.intersect(probe);
  const socketCrest = socket.intersect(bite);
  temps.push(socketClear, socketCrest);
  assert.ok(socketClear.volume() < 8, `${label} socket test bore is blocked (${socketClear.volume().toFixed(2)})`);
  assert.ok(socketCrest.volume() > 40, `${label} socket test has no thread (${socketCrest.volume().toFixed(1)})`);
  const above = Manifold.cube([80, 80, 40], true).translate([0, 0, d.socketTop + 30]);
  const aboveHit = socket.intersect(above);
  temps.push(above, aboveHit);
  assert.ok(aboveHit.volume() < 0.01, `${label} socket test includes the dollar sign`);

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
