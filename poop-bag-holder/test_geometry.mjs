#!/usr/bin/env node
// Smoke test: body + cap build as valid manifolds at default and edge params; parts don't collide when screwed on.
import assert from "node:assert/strict";
import { DEFAULT_PARAMS, derive } from "./geometry.js";
import { buildBodySolid, buildCapSolid, loadManifold } from "./cad.js";

const wasm = await loadManifold();

function check(label, raw) {
  const temps = [];
  const body = buildBodySolid(wasm, raw, temps, "preview");
  const cap = buildCapSolid(wasm, raw, temps, "preview");
  const d = derive(raw);
  for (const [name, s] of [["body", body], ["cap", cap]]) {
    assert.equal(s.status(), "NoError", `${label} ${name} status`);
    assert.ok(s.volume() > 1000, `${label} ${name} volume ${s.volume()}`);
  }
  const bb = body.boundingBox();
  assert.ok(Math.abs(bb.min[2]) < 1e-6, `${label} body sits on z=0`);
  assert.ok(Math.abs(bb.max[2] - d.bodyH) < 0.01, `${label} body height`);
  const clash = body.intersect(cap);
  const clashVol = clash.volume();
  assert.ok(clashVol < 1, `${label} body/cap overlap ${clashVol.toFixed(3)} mm³`);
  const capBb = cap.boundingBox();
  console.log(
    `${label}: body ${(bb.max[0] - bb.min[0]).toFixed(1)}×${(bb.max[1] - bb.min[1]).toFixed(1)}×${bb.max[2].toFixed(1)} mm` +
      ` (OD ${d.bodyOD.toFixed(1)}), cap OD ${d.capOD.toFixed(1)} × ${(capBb.max[2] - capBb.min[2]).toFixed(1)} mm,` +
      ` body ${(body.volume() / 1000).toFixed(1)} cm³ genus ${body.genus()}, cap ${(cap.volume() / 1000).toFixed(1)} cm³, overlap ${clashVol.toFixed(3)}`
  );
  for (const t of [...temps, clash]) t.delete?.();
}

check("default", DEFAULT_PARAMS);
check("straight slot + diamond", { ...DEFAULT_PARAMS, slotShape: "straight", knurlStyle: "diamond", rimNotches: 0 });
check("big roll", { ...DEFAULT_PARAMS, rollD: 40, rollLen: 70, winD: 20, tabAngle: 200, squareW: 0, knurlStyle: "smooth" });
check("tight", { ...DEFAULT_PARAMS, threadPitch: 2, threadDepth: 0.6, threadClear: 0.1, rimNotches: 8, slotSweep: 40 });
console.log("ok");
