// Per-browser record of the 3D printing library.
// The hub page reads the same localStorage key. Keep the key string in sync
// with the inline script in 3d-printing/index.html.

export const LIBRARY_STORE_KEY = "mathoose-public-playground:print-library";

const ACTIVITY_CAP = 30;

function emptyStore() {
  return { favorites: [], activity: [], settings: {} };
}

function readStore() {
  try {
    const data = JSON.parse(localStorage.getItem(LIBRARY_STORE_KEY));
    if (!data || typeof data !== "object") return emptyStore();
    return {
      favorites: Array.isArray(data.favorites) ? data.favorites : [],
      activity: Array.isArray(data.activity) ? data.activity : [],
      settings: data.settings && typeof data.settings === "object" ? data.settings : {},
    };
  } catch {
    return emptyStore();
  }
}

function writeStore(data) {
  try {
    localStorage.setItem(LIBRARY_STORE_KEY, JSON.stringify(data));
  } catch {
    /* private mode or a full disk: the designer still works */
  }
}

function clone(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch {
    return null;
  }
}

function pushActivity(data, entry) {
  data.activity.unshift(entry);
  data.activity = data.activity.slice(0, ACTIVITY_CAP);
}

export function wantsRestore() {
  const query = new URLSearchParams(location.search);
  if (query.get("restore") === "1") return true;
  return location.hash === "#restore" || location.hash.includes("restore=1");
}

export function lastSettings(appId) {
  const saved = readStore().settings[appId];
  return saved ? clone(saved) : null;
}

export function rememberVisit(appId) {
  const data = readStore();
  const latest = data.activity[0];
  if (latest && latest.id === appId && latest.kind === "visit" && Date.now() - latest.at < 120000) return;
  pushActivity(data, { id: appId, kind: "visit", at: Date.now() });
  writeStore(data);
}

export function rememberSettings(appId, params) {
  const data = readStore();
  const saved = clone(params);
  if (saved) data.settings[appId] = saved;
  pushActivity(data, { id: appId, kind: "save", at: Date.now() });
  writeStore(data);
}

export function rememberExport(appId, { filename, params } = {}) {
  const data = readStore();
  const saved = params == null ? null : clone(params);
  if (saved) data.settings[appId] = saved;
  pushActivity(data, { id: appId, kind: "export", filename: filename || "", at: Date.now() });
  writeStore(data);
}
