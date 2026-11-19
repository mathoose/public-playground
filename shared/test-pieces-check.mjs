import { DEFAULT_PARAMS as coaster } from "../coaster-base/geometry.js";
import { DEFAULT_PARAMS as lock } from "../costco-bin-lock/geometry.js";
import { DEFAULT_PARAMS as wrap } from "../power-bank-wrap/geometry.js";
import { defaultParams as bubble } from "../bubble-frame/geometry.js";
import { defaultParams as striped } from "../striped-frame/geometry.js";
import { DEFAULT_PARAMS as tag } from "../paddington-tag/geometry.js";
import { DEFAULT_PARAMS as razor } from "../henson-razor-tool/geometry.js";
import { DEFAULT_PARAMS as house } from "../gingerbread-switch/geometry.js";
import { DEFAULT_PARAMS as baroque } from "../baroque-frame/geometry.js";
import { DEFAULT_PARAMS as photive } from "../photive-snap-box/geometry.js";
import { DEFAULT_PARAMS as bone } from "../bone-side-bag/geometry.js";
import { DEFAULT_PARAMS as poop } from "../poop-bag-holder/geometry.js";
import { DEFAULT_PARAMS as holder } from "../private/holder-geometry.js";
import { DEFAULT_PARAMS as pumpkin } from "../pumpkin-lantern/geometry.js";
import { DEFAULT_PARAMS as clip } from "../postit-wall-clip/clip.js";
import {
  buildBubbleStandTest,
  buildCoasterTest,
  buildHolderTest,
  buildLinkTest,
  buildLipTest,
  buildLockTest,
  buildMouldingTest,
  buildOpeningTest,
  buildPinchTest,
  buildPocketTest,
  buildRollTest,
  buildSeatTest,
  buildSleeveTest,
  buildStripedStandTest,
  buildTagTest,
} from "./test-pieces.js";

const cases = [
  ["coaster", () => buildCoasterTest(coaster, "26 10")],
  ["lock", () => buildLockTest(lock, "32.2 11.4 4.2 8 16")],
  ["sleeve", () => buildSleeveTest(wrap, "68 16 2.2 0.4")],
  ["pinch", () => buildPinchTest(clip, "20 2.8 0.45")],
  ["bubble", () => buildBubbleStandTest(bubble(), "0 18")],
  ["striped", () => buildStripedStandTest(striped(), "0 18")],
  ["tag", () => buildTagTest(tag, "5 0.8 2")],
  ["pocket", () => buildPocketTest(razor, "0.3 23.5 43")],
  ["opening", () => buildOpeningTest(house, "14 32 3.2")],
  ["moulding", () => buildMouldingTest(baroque, "78 100 100")],
  ["lip", () => buildLipTest(photive, "0.28 5 7.6")],
  ["link", () => buildLinkTest(bone, "44")],
  ["roll", () => buildRollTest(poop, "30 0.8 2.4")],
  ["holder", () => buildHolderTest(holder, "27 85 12")],
  ["seat", () => buildSeatTest(pumpkin, "58.4 0.6 8")],
];

let failed = 0;
for (const [name, run] of cases) {
  try {
    const built = await run();
    const tris = new DataView(built.stl).getUint32(80, true);
    if (!(built.volume > 0) || tris < 12) throw new Error(`volume ${built.volume} tris ${tris}`);
    console.log(`ok ${name} volume ${built.volume.toFixed(0)} tris ${tris}`);
  } catch (err) {
    failed += 1;
    console.error(`FAIL ${name}`, err);
  }
}
if (failed) process.exit(1);
