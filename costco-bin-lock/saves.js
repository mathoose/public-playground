// Named slider snapshots, stored only in this browser.
// htmlpreview.github.io is one shared origin, so the key is specific to this app.

import { SLIDERS, mergeParams } from "./geometry.js";

export const STORAGE_KEY = "mathoose.public-playground.costco-bin-lock.saves";
export const SAVE_LIMIT = 40;
export const NAME_LIMIT = 80;
export const NOTE_LIMIT = 400;

export function clipText(value, limit) {
  return String(value ?? "").trim().slice(0, limit);
}

export function sameSliderParams(a, b) {
  const left = mergeParams(a);
  const right = mergeParams(b);
  return SLIDERS.every((s) => left[s.key] === right[s.key]);
}

function cleanEntry(raw) {
  if (!raw || typeof raw !== "object") return null;
  const name = clipText(raw.name, NAME_LIMIT);
  if (!name) return null;
  const savedAt = Number(raw.savedAt);
  if (!Number.isFinite(savedAt)) return null;
  return {
    id: String(raw.id || savedAt),
    name,
    note: clipText(raw.note, NOTE_LIMIT),
    params: mergeParams(raw.params),
    savedAt,
  };
}

export function sortNewest(saves) {
  return saves.slice().sort((a, b) => b.savedAt - a.savedAt || b.name.localeCompare(a.name));
}

export function readSaves(getItem) {
  try {
    const raw = JSON.parse(getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(raw)) return [];
    return sortNewest(raw.map(cleanEntry).filter(Boolean));
  } catch {
    return [];
  }
}

export function writeSaves(setItem, saves) {
  setItem(STORAGE_KEY, JSON.stringify(saves));
}

/**
 * Insert or replace by name. The saved entry is newest, so it sorts to the top.
 * Returns { ok:false, error } when the name is blank.
 */
export function rememberSave(saves, { name, note, params, now = Date.now() }) {
  const cleanName = clipText(name, NAME_LIMIT);
  if (!cleanName) {
    return { ok: false, error: "Type a name for this save.", saves: sortNewest(saves) };
  }
  const existing = saves.find((s) => s.name === cleanName);
  const entry = {
    id: existing ? existing.id : `s${now}`,
    name: cleanName,
    note: clipText(note, NOTE_LIMIT),
    params: mergeParams(params),
    savedAt: now,
  };
  const next = sortNewest([entry, ...saves.filter((s) => s.name !== cleanName)]).slice(0, SAVE_LIMIT);
  return { ok: true, saves: next, entry, replaced: Boolean(existing) };
}
