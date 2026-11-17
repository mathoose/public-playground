#!/usr/bin/env node
// Card is edge-on to the S, both shells are real solids, broom socket is the tapered thread.
import assert from "node:assert/strict";
import { CARD, DEFAULT_PARAMS, THREAD_ID, derive } from "./geometry.js";
import { assembly3mf, buildShells, cardSolid, copyMesh, loadManifold } from "./cad.js";

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

  assert.ok(d.threadID > 19 && d.threadID < 22, `${label} mouth crest ${d.threadID} is not the tapered broom thread`);
  assert.ok(Math.abs(d.threadID - THREAD_ID) < 1e-9, `${label} thread ID drifted`);
  assert.ok(Math.abs(d.pitch - 4.4) < 1e-9, `${label} pitch ${d.pitch}`);
  assert.ok(d.threadRoot > d.threadID + 2, `${label} groove is not wider than the crest`);

  assert.ok(d.pocketX >= CARD.t + d.p.clearance - 1e-6, `${label} pocket is not thick enough for the edge`);
  assert.ok(d.pocketY >= CARD.w + 2 * d.p.clearance - 1e-6, `${label} pocket does not stick out the short side`);
  assert.ok(d.pocketZ >= CARD.h + 2 * d.p.clearance - 1e-6, `${label} pocket is shorter than the card`);
  assert.ok(d.pocketX < 3, `${label} card is not edge-on (${d.pocketX.toFixed(2)} mm through the sign)`);
  assert.ok(d.pocketZ > d.pocketY + 10, `${label} long side is not vertical`);
  assert.ok(d.barW < 36, `${label} center bar is still card-width (${d.barW})`);

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

  const beside = Manifold.cube([d.barW * 0.28, 4, 6], true).translate([0, 0, d.caseBottom - 16]);
  const prongL = Manifold.cube([4, 4, 6], true).translate([-d.barW * 0.28, 0, d.strokeTop + 8]);
  const prongR = Manifold.cube([4, 4, 6], true).translate([d.barW * 0.28, 0, d.strokeTop + 8]);
  const barHit = sign.intersect(beside);
  const prongHit = Manifold.union([
    front.intersect(prongL),
    back.intersect(prongL),
    sign.intersect(prongL),
    front.intersect(prongR),
    back.intersect(prongR),
    sign.intersect(prongR),
  ]);
  temps.push(beside, prongL, prongR, barHit, prongHit);
  assert.ok(barHit.volume() > 8, `${label} center bar is not solid (${barHit.volume().toFixed(1)})`);
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
    ["bottom staff", sign],
    ["case back", back],
    ["case front", front],
  ]) {
    const bits = solid.decompose();
    assert.equal(bits.length, 1, `${label} ${name} is ${bits.length} pieces`);
    for (const bit of bits) bit.delete();
    const mesh = copyMesh(solid.getMesh());
    let broken = 0;
    const stride = mesh.numProp || 3;
    const v = mesh.vertProperties;
    const tv = mesh.triVerts;
    for (let i = 0; i < tv.length; i += 3) {
      const a = tv[i] * stride;
      const b = tv[i + 1] * stride;
      const c = tv[i + 2] * stride;
      const ax = v[b] - v[a];
      const ay = v[b + 1] - v[a + 1];
      const az = v[b + 2] - v[a + 2];
      const bx = v[c] - v[a];
      const by = v[c + 1] - v[a + 1];
      const bz = v[c + 2] - v[a + 2];
      const area = Math.hypot(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx) * 0.5;
      if (!(area > 1e-6)) broken++;
    }
    assert.equal(broken, 0, `${label} ${name} still has ${broken} broken triangles`);
  }
  const hookTip = Manifold.cube([10, 10, 8], true).translate([d.caseX / 2 + 6, 0, d.strokeTop - 10]);
  const hookOnFront = front.intersect(hookTip);
  const hookOnBack = back.intersect(hookTip);
  const hookOnSign = sign.intersect(hookTip);
  temps.push(hookTip, hookOnFront, hookOnBack, hookOnSign);
  assert.ok(hookOnFront.volume() > 15, `${label} the +X end of the S is not on the case front (${hookOnFront.volume().toFixed(1)})`);
  assert.ok(hookOnBack.volume() < 4, `${label} the +X end of the S is on the back (${hookOnBack.volume().toFixed(1)})`);
  assert.ok(hookOnSign.volume() < 4, `${label} the +X end of the S is still on the bottom (${hookOnSign.volume().toFixed(1)})`);
  assert.ok(Math.abs(d.signT - 36.8) < 0.05, `${label} S is not four times as thick (${d.signT})`);
  const curveY = d.loopW * 0.42;
  const curveZ = d.strokeTop - d.loopH * 0.22;
  const onPlate = Manifold.cube([5, 3, 5], true).translate([curveY, d.signT / 2 - 2, curveZ]);
  const offPlate = Manifold.cube([5, 3, 5], true).translate([curveY, d.signT / 2 + 3, curveZ]);
  const onHit = Manifold.union([sign.intersect(onPlate), front.intersect(onPlate), back.intersect(onPlate)]);
  const offHit = Manifold.union([sign.intersect(offPlate), front.intersect(offPlate), back.intersect(offPlate)]);
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
  const otherTop = Manifold.cube([24, 24, 24], true).translate([-d.loopW * 0.32, 0, d.strokeTop - 20]);
  const otherOnBack = back.intersect(otherTop);
  const otherOnFront = front.intersect(otherTop);
  const otherOnSign = sign.intersect(otherTop);
  temps.push(otherTop, otherOnBack, otherOnFront, otherOnSign);
  assert.ok(otherOnBack.volume() > 40, `${label} the −X half of the top S is not on the case back (${otherOnBack.volume().toFixed(1)})`);
  assert.ok(otherOnFront.volume() < 4, `${label} the −X half of the top S is on the front (${otherOnFront.volume().toFixed(1)})`);
  assert.ok(otherOnSign.volume() < 4, `${label} the −X half of the top S is still on the bottom (${otherOnSign.volume().toFixed(1)})`);
  const half = d.barW / 2;
  const pocketHalf = d.pocketX / 2;
  let keyWall = 3.2;
  if (half - pocketHalf - 2 * keyWall < 3.4) keyWall = Math.max(2.6, (half - pocketHalf - 3.4) / 2);
  const keyInner = pocketHalf + keyWall;
  const keyOuter = half - keyWall;
  const keyX = (keyInner + keyOuter) / 2;
  const keyW = Math.max(1.2, keyOuter - keyInner - 0.5);
  const keyUp = Manifold.cube([keyW, 10, 10], true).translate([keyX, 0, d.caseBottom + 5]);
  const keyDown = Manifold.cube([keyW, 10, 6], true).translate([keyX, 0, d.caseBottom - 4]);
  const keyOnSign = sign.intersect(keyUp);
  const keyOnFront = front.intersect(keyUp);
  const keyOnBack = back.intersect(keyUp);
  const keyBuried = sign.intersect(keyDown);
  const innerWall = Manifold.cube([1.1, 6, 6], true).translate([pocketHalf + keyWall * 0.45, 0, d.caseBottom + 6]);
  const outerWall = Manifold.cube([1.1, 6, 6], true).translate([half - keyWall * 0.45, 0, d.caseBottom + 6]);
  const innerHit = front.intersect(innerWall);
  const outerHit = front.intersect(outerWall);
  temps.push(keyUp, keyDown, keyOnSign, keyOnFront, keyOnBack, keyBuried, innerWall, outerWall, innerHit, outerHit);
  assert.ok(keyOnSign.volume() > keyUp.volume() * 0.8, `${label} cube key is not on the bottom (${keyOnSign.volume().toFixed(1)})`);
  assert.ok(keyOnFront.volume() + keyOnBack.volume() < 4, `${label} cube key still fills the case (${(keyOnFront.volume() + keyOnBack.volume()).toFixed(1)})`);
  assert.ok(keyBuried.volume() > keyDown.volume() * 0.7, `${label} cube key does not reach the bottom staff (${keyBuried.volume().toFixed(1)})`);
  assert.ok(innerHit.volume() > innerWall.volume() * 0.6, `${label} wall beside the card is thin (${innerHit.volume().toFixed(1)})`);
  assert.ok(outerHit.volume() > outerWall.volume() * 0.6, `${label} outer wall beside the key is thin (${outerHit.volume().toFixed(1)})`);
  assert.ok(cardBb.min[0] < 0 && cardBb.max[0] > 0 && cardBb.min[1] < -10 && cardBb.max[1] > 10, `${label} S does not cross the middle of the card`);
  assert.ok(cardBb.min[2] > d.socketTop + 28, `${label} card is still down on the socket (z ${cardBb.min[2].toFixed(1)}, socket top ${d.socketTop.toFixed(1)})`);
  const lowHook = Manifold.cube([8, 8, 6], true).translate([d.loopW * 0.35, 0, d.socketTop + 12]);
  const lowHit = sign.intersect(lowHook);
  temps.push(lowHook, lowHit);
  assert.ok(lowHit.volume() < 4, `${label} the dollar sign is still beside the socket (${lowHit.volume().toFixed(1)})`);
  assert.ok(Math.abs(signBb.min[2]) < 0.2, `${label} socket mouth not on z=0 (${signBb.min[2]})`);
  assert.ok(caseBb.min[2] > d.socketTop - 2, `${label} snap case includes the socket (z ${caseBb.min[2]})`);

  const probe = Manifold.cylinder(d.threadLen, 8.3, 8.3, 32, false).translate([0, d.yCenter, d.threadStart]);
  const bite = Manifold.cylinder(10, 9.7, 9.7, 32, false).translate([0, d.yCenter, d.threadStart + 6]);
  const clearHit = sign.intersect(probe);
  const crestHit = sign.intersect(bite);
  temps.push(probe, bite, clearHit, crestHit);
  assert.ok(clearHit.volume() < 8, `${label} the bore is closed (${clearHit.volume().toFixed(2)})`);
  assert.ok(crestHit.volume() > 15, `${label} the taper does not close down onto a straight plug (${crestHit.volume().toFixed(1)})`);

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
  assert.ok(socketCrest.volume() > 15, `${label} socket test has no thread (${socketCrest.volume().toFixed(1)})`);
  const above = Manifold.cube([80, 80, 40], true).translate([0, 0, d.socketTop + 30]);
  const aboveHit = socket.intersect(above);
  temps.push(above, aboveHit);
  assert.ok(aboveHit.volume() < 0.01, `${label} socket test includes the dollar sign`);

  console.log(
    `${label}: $ ${d.loopW.toFixed(0)}×${d.barH.toFixed(0)} mm, bar ${d.barW.toFixed(1)} mm, ${d.totalH.toFixed(0)} mm tall, ` +
      `pocket edge ${d.pocketX.toFixed(2)} × out ${d.pocketY.toFixed(2)} × tall ${d.pocketZ.toFixed(2)} (perpendicular to the S), ` +
      `cube keys beside the card, ` +
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
const text = Buffer.from(
  assembly3mf(copyMesh(built.front.getMesh()), copyMesh(built.back.getMesh()), copyMesh(built.sign.getMesh()))
).toString("latin1");
assert.equal((text.match(/<item /g) || []).length, 1, "3MF should have one build item");
assert.equal((text.match(/<component /g) || []).length, 3, "3MF assembly should be the two case shells and the bottom staff");
assert.ok(text.includes('unit="millimeter"'), "3MF unit");
assert.ok(
  text.includes("Case front") && text.includes("Case back") && text.includes("Bottom staff") && !text.includes("Lower hook"),
  "3MF part names"
);
for (const t of temps) t.delete?.();

console.log("ok");
