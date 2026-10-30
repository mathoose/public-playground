import { mountDesignerSaves, makeSameParams } from "./designer-saves.js";
import { attachFaceMeasure, bindFaceMeasureUI, highlightMeasureParams } from "./face-measure.js";

/** Header row: named saves. */
export function wireHeaderSaves({ appId, mergeParams, sliderKeys, getParams, setParams, onLoad }) {
  const anchor = document.querySelector("header .header-saves");
  if (!anchor) return null;
  return mountDesignerSaves({
    appId,
    anchor,
    mergeParams,
    sameParams: makeSameParams(mergeParams, sliderKeys),
    getParams,
    setParams,
    onLoad,
  });
}

/** Panel top (bubble / striped): same saves UI above undo bar. */
export function wirePanelSaves({ appId, mergeParams, sliderKeys, getParams, setParams, panel }) {
  const el = panel || document.querySelector(".panel");
  if (!el) return null;
  return mountDesignerSaves({
    appId,
    anchor: el,
    placement: "panel",
    mergeParams,
    sameParams: makeSameParams(mergeParams, sliderKeys),
    getParams,
    setParams,
  });
}

/** Costco-style two-click measure on a live preview. */
export function wireFaceMeasure({
  preview,
  canvas,
  scene,
  getTargets,
  getBox,
  panel,
  measurePair,
  getParams,
  THREE,
  defaultHint = "Drag to orbit · pinch or scroll to zoom",
}) {
  attachFaceMeasure(preview, {
    THREE,
    canvas: canvas || document.getElementById("view"),
    scene,
    getTargets,
    getBox,
  });
  bindFaceMeasureUI({
    preview,
    panel: panel || document.querySelector(".panel"),
    measureBtn: "measure",
    hintEl: "hint",
    defaultHint,
    onPair: (info) => {
      if (!measurePair || !info.picks?.[0] || !info.picks?.[1]) return;
      const mapped = measurePair(info.picks[0], info.picks[1], getParams?.());
      highlightMeasureParams(panel || document.querySelector(".panel"), mapped?.params || []);
    },
  });
}

/** Call from preview render loops after attachFaceMeasure. */
export function tickFaceMeasureBubble(preview) {
  if (preview.picks?.length === 2) preview._placeMeasureBubble?.();
}

export const STAGE_MEASURE_HTML = `
      <div class="hint" id="hint">Drag to orbit · pinch or scroll to zoom</div>
      <div class="measure-bubble" id="measureBubble" hidden>
        <b id="measureValue"></b>
        <span id="measureKind"></span>
      </div>
`;

export const HEADER_SAVES_HTML = `
      <div class="header-meta">
        <div class="header-saves"></div>
        <p class="version">__VERSION__</p>
      </div>
`;

export const MEASURE_CHIP = `<button type="button" class="chip" id="measure">Measure</button>`;

export const MEASURE_CSS = `
.stage.measuring #view { cursor: crosshair; }
.measure-bubble {
  position: absolute;
  z-index: 5;
  transform: translate(-50%, -140%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 6px 12px 7px;
  border-radius: 999px;
  background: #9a3412;
  color: #fff;
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 8px 18px rgba(28, 25, 23, 0.22);
}
.measure-bubble[hidden] { display: none !important; }
.measure-bubble b { font-size: 0.95rem; font-variant-numeric: tabular-nums; }
.measure-bubble span { font-size: 0.68rem; font-weight: 650; opacity: 0.92; }
header .header-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  min-width: 0;
  flex: 1 1 200px;
}
header .version { margin: 0; color: var(--muted, #78716c); font-size: 0.85rem; }
.row.mp-hot, .field.mp-hot {
  background: #fef3c7;
  outline: 2px solid #d97706;
  border-radius: 10px;
}
`;
