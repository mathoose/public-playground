// Named slider snapshots in localStorage — one list per app id (works on htmlpreview).

export const SAVE_LIMIT = 40;
export const NAME_LIMIT = 80;
export const NOTE_LIMIT = 400;

const STYLE_ID = "designer-saves-style";

const CSS = `
.designer-saves {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
  min-width: 0;
  flex: 1 1 160px;
  max-width: min(100%, 420px);
}
.designer-saves-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  width: 100%;
}
.designer-saves-row input[type="text"],
.designer-saves-row textarea {
  min-width: 0;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 10px;
  padding: 6px 10px;
  background: #fff;
  font-size: 0.82rem;
}
.designer-saves-name { flex: 1 1 120px; max-width: 180px; }
.designer-saves-note { flex: 2 1 140px; max-width: 220px; resize: none; height: 2.4em; }
.designer-saves-save {
  min-height: 36px;
  padding: 6px 14px;
  border: none;
  border-radius: 999px;
  background: var(--accent-2, #0f766e);
  color: #fff;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  touch-action: manipulation;
  white-space: nowrap;
}
.designer-saves-save:active { filter: brightness(0.95); }
.designer-saves-hint {
  margin: 0;
  width: 100%;
  text-align: right;
  font-size: 0.72rem;
  color: var(--muted, #78716c);
}
.designer-saves-hint[data-kind="err"] { color: var(--warn, #9a3412); }
.designer-saves-toggle {
  border: 1px solid var(--line, #ddd6cc);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 999px;
  padding: 4px 10px;
  font: inherit;
  font-size: 0.75rem;
  font-weight: 650;
  cursor: pointer;
  color: var(--ink, #1c1917);
}
.designer-saves-panel {
  width: 100%;
  max-height: 140px;
  overflow: auto;
  border: 1px solid var(--line, #ddd6cc);
  border-radius: 10px;
  background: rgba(255, 252, 247, 0.96);
}
.designer-saves-panel[hidden] { display: none !important; }
.designer-saves-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
}
.designer-saves-table th,
.designer-saves-table td {
  padding: 6px 10px;
  text-align: left;
  border-bottom: 1px solid var(--line, #eee8df);
}
.designer-saves-table th {
  position: sticky;
  top: 0;
  background: #faf7f2;
  font-weight: 700;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted, #78716c);
}
.designer-saves-table tr:last-child td { border-bottom: none; }
.designer-saves-table button.load {
  border: none;
  background: none;
  padding: 0;
  font: inherit;
  font-weight: 650;
  color: var(--accent-2, #0f766e);
  cursor: pointer;
  text-align: left;
}
.designer-saves-table tr.active td { background: #ecfdf5; }
.designer-saves-empty {
  margin: 0;
  padding: 10px;
  color: var(--muted, #78716c);
  font-size: 0.78rem;
}
.panel-top-saves {
  margin: 0 0 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--line, #ddd6cc);
}
.panel-top-saves .designer-saves { align-items: stretch; max-width: none; }
.panel-top-saves .designer-saves-row { justify-content: stretch; }
.panel-top-saves .designer-saves-hint { text-align: left; }
@media (max-width: 520px) {
  .designer-saves-note { flex: 1 1 100%; max-width: none; }
}
`;

export function storageKey(appId) {
  return `mathoose.public-playground.${appId}.saves`;
}

export function clipText(value, limit) {
  return String(value ?? "").trim().slice(0, limit);
}

export function sortNewest(saves) {
  return saves.slice().sort((a, b) => b.savedAt - a.savedAt || b.name.localeCompare(a.name));
}

export function makeSameParams(mergeParams, keys) {
  return (a, b) => {
    const left = mergeParams(a);
    const right = mergeParams(b);
    return keys.every((key) => left[key] === right[key]);
  };
}

function cleanEntry(raw, mergeParams) {
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

export function readSaves(appId, getItem, mergeParams) {
  try {
    const raw = JSON.parse(getItem(storageKey(appId)) || "[]");
    if (!Array.isArray(raw)) return [];
    return sortNewest(raw.map((e) => cleanEntry(e, mergeParams)).filter(Boolean));
  } catch {
    return [];
  }
}

export function writeSaves(appId, setItem, saves) {
  setItem(storageKey(appId), JSON.stringify(saves));
}

export function rememberSave(saves, { name, note, params, mergeParams, now = Date.now() }) {
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

function ensureStyle() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = CSS;
  document.head.appendChild(style);
}

function formatWhen(ms) {
  try {
    return new Date(ms).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

/**
 * Mount Save + note + saved-versions UI into a header or panel-top anchor.
 */
export function mountDesignerSaves({
  appId,
  anchor,
  placement = "header",
  mergeParams,
  sameParams,
  getParams,
  setParams,
  onLoad,
}) {
  ensureStyle();
  const wrap = document.createElement("div");
  wrap.className = placement === "panel" ? "panel-top-saves" : "designer-saves";
  wrap.innerHTML = `
    <div class="designer-saves-row">
      <input class="designer-saves-name" type="text" maxlength="${NAME_LIMIT}" autocomplete="off" placeholder="Save name" aria-label="Save name" />
      <textarea class="designer-saves-note" maxlength="${NOTE_LIMIT}" placeholder="Note on this save" aria-label="Note on this save"></textarea>
      <button type="button" class="designer-saves-save">Save</button>
      <button type="button" class="designer-saves-toggle" aria-expanded="false">Saved versions</button>
    </div>
    <p class="designer-saves-hint" hidden></p>
    <div class="designer-saves-panel" hidden>
      <table class="designer-saves-table">
        <thead><tr><th>Name</th><th>Date</th></tr></thead>
        <tbody></tbody>
      </table>
    </div>
  `;
  if (placement === "panel") anchor.prepend(wrap);
  else anchor.appendChild(wrap);

  const nameEl = wrap.querySelector(".designer-saves-name");
  const noteEl = wrap.querySelector(".designer-saves-note");
  const hintEl = wrap.querySelector(".designer-saves-hint");
  const panelEl = wrap.querySelector(".designer-saves-panel");
  const toggleBtn = wrap.querySelector(".designer-saves-toggle");
  const tbody = wrap.querySelector("tbody");

  let saves = [];

  function setHint(text, kind = "") {
    if (!text) {
      hintEl.hidden = true;
      hintEl.textContent = "";
      hintEl.dataset.kind = "";
      return;
    }
    hintEl.hidden = false;
    hintEl.textContent = text;
    hintEl.dataset.kind = kind;
  }

  function renderList() {
    tbody.replaceChildren();
    const params = getParams();
    if (!saves.length) {
      panelEl.innerHTML = `<p class="designer-saves-empty">No saves in this browser yet.</p>`;
      return;
    }
    if (!panelEl.querySelector("table")) {
      panelEl.innerHTML = `
        <table class="designer-saves-table">
          <thead><tr><th>Name</th><th>Date</th></tr></thead>
          <tbody></tbody>
        </table>
      `;
    }
    const body = panelEl.querySelector("tbody");
    saves.forEach((save, index) => {
      const tr = document.createElement("tr");
      if (sameParams(save.params, params)) tr.classList.add("active");
      const nameCell = document.createElement("td");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "load";
      btn.textContent = index === 0 ? `${save.name} · Latest` : save.name;
      if (save.note) btn.title = save.note;
      btn.addEventListener("click", () => loadSave(save.id));
      nameCell.append(btn);
      const dateCell = document.createElement("td");
      dateCell.textContent = formatWhen(save.savedAt);
      if (save.note) dateCell.title = save.note;
      tr.append(nameCell, dateCell);
      body.append(tr);
    });
  }

  function refreshHint() {
    const name = nameEl.value.trim();
    if (!name) {
      setHint("");
      return;
    }
    const existing = saves.find((s) => s.name === name);
    setHint(existing ? `“${name}” is already saved. Saving again replaces it.` : "");
  }

  function loadSave(id) {
    const save = saves.find((s) => s.id === id);
    if (!save) return;
    setParams(save.params);
    nameEl.value = save.name;
    noteEl.value = save.note;
    setHint(`Loaded ${save.name}. Edit sliders, then save again.`);
    onLoad?.(save);
    renderList();
  }

  function saveCurrent() {
    const result = rememberSave(saves, {
      name: nameEl.value,
      note: noteEl.value,
      params: getParams(),
      mergeParams,
    });
    if (!result.ok) {
      setHint(result.error, "err");
      return;
    }
    saves = result.saves;
    try {
      writeSaves(appId, (key, value) => localStorage.setItem(key, value), saves);
    } catch {
      setHint("This browser blocked saving. Nothing was uploaded.", "err");
      return;
    }
    nameEl.value = result.entry.name;
    setHint(result.replaced ? `Replaced ${result.entry.name}.` : `Saved ${result.entry.name}.`);
    renderList();
  }

  try {
    saves = readSaves(appId, (key) => localStorage.getItem(key), mergeParams);
  } catch {
    saves = [];
  }

  wrap.querySelector(".designer-saves-save").addEventListener("click", saveCurrent);
  nameEl.addEventListener("input", refreshHint);
  nameEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveCurrent();
    }
  });
  toggleBtn.addEventListener("click", () => {
    const open = panelEl.hidden;
    panelEl.hidden = !open;
    toggleBtn.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) renderList();
  });

  renderList();

  return {
    renderList,
    get saves() {
      return saves;
    },
  };
}
