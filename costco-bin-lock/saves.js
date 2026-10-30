// Re-export named saves — storage key is per app id in shared/designer-saves.js.

import { SLIDERS, mergeParams } from "./geometry.js";
import {
  NAME_LIMIT,
  NOTE_LIMIT,
  SAVE_LIMIT,
  clipText,
  makeSameParams,
  readSaves as readSavesRaw,
  rememberSave as rememberSaveRaw,
  sortNewest,
  storageKey,
  writeSaves as writeSavesRaw,
} from "../shared/designer-saves.js";

export const STORAGE_KEY = storageKey("costco-bin-lock");
export { NAME_LIMIT, NOTE_LIMIT, SAVE_LIMIT, clipText, sortNewest };

export const sameSliderParams = makeSameParams(mergeParams, SLIDERS.map((s) => s.key));

export function rememberSave(saves, opts) {
  return rememberSaveRaw(saves, { ...opts, mergeParams });
}

export function readSaves(getItem) {
  return readSavesRaw("costco-bin-lock", getItem, mergeParams);
}

export function writeSaves(setItem, saves) {
  writeSavesRaw("costco-bin-lock", setItem, saves);
}
