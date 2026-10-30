/* =========================================================================
   Brazilian Press — single-page frontend
   ========================================================================= */

(function () {
  'use strict';

  const PROFILE_KEY = 'bp:profile';
  const ROUTES = ['archive', 'search', 'local'];
  const DEFAULT_ROUTE = 'archive';

  // ---------- State ----------
  const state = {
    issues: [],
    issuesByYear: new Map(),
    locations: [],
    posts: [],
    socket: null,
    currentRoute: DEFAULT_ROUTE,
    currentLocation: '__all__',
    profile: loadProfile(),
    bootedOverlay: false,
  };

  // ---------- Profile persistence ----------
  function loadProfile() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return {};
      const obj = JSON.parse(raw);
      return obj && typeof obj === 'object' ? obj : {};
    } catch (_e) {
      return {};
    }
  }
  function saveProfile() {
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(state.profile));
    } catch (_e) { /* ignore quota errors */ }
  }

  // ---------- Utilities ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.from((root || document).querySelectorAll(sel)); }
  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeRegex(s) {
    return s.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  }
  function highlight(text, terms) {
    const safe = escapeHtml(text);
    if (!terms || !terms.length) return safe;
    const pattern = new RegExp(
      `(${terms.map(escapeRegex).join('|')})`,
      'gi',
    );
    return safe.replace(pattern, '<mark class="flag">$1</mark>');
  }
  function timeAgo(iso) {
    const t = new Date(iso).getTime();
    if (!Number.isFinite(t)) return '';
    const diff = Date.now() - t;
    if (diff < 60_000) return 'just now';
    const m = Math.floor(diff / 60_000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 7) return `${d}d ago`;
    const w = Math.floor(d / 7);
    if (w < 5) return `${w}w ago`;
    return new Date(iso).toLocaleDateString();
  }
  function refreshTimeAgo() {
    $$('[data-iso]').forEach((el) => {
      el.textContent = timeAgo(el.getAttribute('data-iso'));
    });
  }
  setInterval(refreshTimeAgo, 60_000);

  async function jsonFetch(url, opts) {
    const res = await fetch(url, opts);
    if (!res.ok) {
      let detail = '';
      try { detail = (await res.json()).error || ''; } catch (_e) { /* ignore */ }
      throw new Error(detail || `HTTP ${res.status}`);
    }
    return res.json();
  }

  // ---------- Routing ----------
  function currentRouteFromHash() {
    const m = (location.hash || '').replace(/^#\/?/, '').split('/')[0];
    return ROUTES.includes(m) ? m : DEFAULT_ROUTE;
  }
  function setRoute(route, push) {
    if (!ROUTES.includes(route)) route = DEFAULT_ROUTE;
    state.currentRoute = route;
    if (push) location.hash = `#/${route}`;
    $$('section.view').forEach((sec) => {
      sec.hidden = sec.dataset.view !== route;
    });
    $$('.primary-nav a').forEach((a) => {
      a.classList.toggle('active', a.dataset.route === route);
    });
    if (route === 'archive') renderArchive();
    if (route === 'search') {
      const input = $('#search-input');
      if (input) input.focus();
    }
    if (route === 'local') {
      renderLatestTile();
      renderFeed();
    }
  }
  window.addEventListener('hashchange', () => setRoute(currentRouteFromHash(), false));

  // ---------- Reader overlay ----------
  const reader = {
    open(issue) {
      if (!issue) return;
      const frame = $('#reader-frame');
      const title = $('#reader-title');
      const openIssuu = $('#reader-open-issuu');
      frame.src = issue.embedUrl;
      title.textContent = `${issue.title}${issue.humanDate ? ' — ' + issue.humanDate : ''}`;
      openIssuu.href = issue.url;
      const overlay = $('#reader');
      overlay.hidden = false;
      document.body.classList.add('reader-open');
      $('#reader-back').focus();
    },
    close() {
      const overlay = $('#reader');
      if (overlay.hidden) return;
      overlay.hidden = true;
      document.body.classList.remove('reader-open');
      // Clear src so audio/video stops.
      $('#reader-frame').src = '';
    },
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') reader.close();
  });

  // ---------- Boot ----------
  async function boot() {
    $('#year').textContent = new Date().getFullYear();
    $('#reader-back').addEventListener('click', () => reader.close());
    $('#open-latest').addEventListener('click', openLatest);
    $('#latest-tile').addEventListener('click', openLatest);

    setRoute(currentRouteFromHash(), false);

    try {
      const data = await jsonFetch('/api/issues');
      state.issues = data.issues || [];
      indexIssues();
    } catch (err) {
      console.error('Failed to load issues:', err);
      $('#archive-grid').innerHTML =
        '<p class="empty">Could not load issues. ' +
        'Try <code>npm run refresh-catalogue</code>.</p>';
    }

    populateYearFilter();
    populateLocations();
    renderLatestTile();
    renderArchive();

    // Auto-open the latest issue on first load.
    if (!state.bootedOverlay && state.issues.length) {
      state.bootedOverlay = true;
      reader.open(state.issues[0]);
    }

    bindArchiveFilters();
    bindSearch();
    bindLocal();

    initSocket();
    await refreshPosts();
  }

  function indexIssues() {
    state.issuesByYear = new Map();
    for (const issue of state.issues) {
      const y = issue.year || 'Unknown';
      if (!state.issuesByYear.has(y)) state.issuesByYear.set(y, []);
      state.issuesByYear.get(y).push(issue);
    }
    $('#archive-count').textContent = state.issues.length;
  }

  function openLatest() {
    if (!state.issues.length) return;
    reader.open(state.issues[0]);
  }

  // ---------- Archive ----------
  function populateYearFilter() {
    const sel = $('#year-filter');
    if (!sel) return;
    const years = Array.from(state.issuesByYear.keys())
      .filter((y) => Number.isFinite(y))
      .sort((a, b) => b - a);
    sel.innerHTML = '<option value="">All years</option>';
    for (const y of years) {
      const opt = document.createElement('option');
      opt.value = String(y);
      opt.textContent = String(y);
      sel.appendChild(opt);
    }
  }

  function bindArchiveFilters() {
    const yearSel = $('#year-filter');
    const filter = $('#archive-filter');
    yearSel.addEventListener('change', renderArchive);
    filter.addEventListener('input', renderArchive);
  }

  function renderArchive() {
    const grid = $('#archive-grid');
    const empty = $('#archive-empty');
    const year = ($('#year-filter') || {}).value || '';
    const q = (($('#archive-filter') || {}).value || '').trim().toLowerCase();

    const items = state.issues.filter((issue) => {
      if (year && String(issue.year) !== year) return false;
      if (!q) return true;
      const hay = [
        issue.title, issue.docname, issue.humanDate,
        issue.year, issue.edition,
      ].map((v) => String(v == null ? '' : v).toLowerCase()).join(' ');
      return hay.includes(q);
    });

    if (!items.length) {
      grid.innerHTML = '';
      empty.hidden = false;
      return;
    }
    empty.hidden = true;
    grid.innerHTML = items.map((i) => issueCardHtml(i)).join('');
    grid.querySelectorAll('[data-issue-id]').forEach((node) => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-issue-id');
        const issue = state.issues.find((x) => x.id === id);
        reader.open(issue);
      });
    });
  }

  function issueCardHtml(issue, terms) {
    const titleHtml = highlight(issue.title || issue.docname, terms);
    const dateHtml = highlight(issue.humanDate || '', terms);
    const badge = issue.edition != null
      ? `<span class="issue-badge">Ed. ${escapeHtml(String(issue.edition))}</span>`
      : '';
    const cover = escapeHtml(issue.cover || '');
    return `
      <button class="card issue-card" data-issue-id="${escapeHtml(issue.id)}"
              type="button" aria-label="Open ${escapeHtml(issue.title)}">
        ${badge}
        <img class="issue-cover" src="${cover}" alt="" loading="lazy" />
        <div class="issue-body">
          <h3 class="issue-title">${titleHtml}</h3>
          <div class="issue-date">${dateHtml || '&nbsp;'}</div>
        </div>
      </button>
    `;
  }

  // ---------- Search ----------
  function bindSearch() {
    const form = $('#search-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const q = $('#search-input').value.trim();
      if (!q) return;
      await runSearch(q);
    });
  }
  async function runSearch(q) {
    const grid = $('#search-grid');
    const empty = $('#search-empty');
    const meta = $('#search-meta');
    grid.innerHTML = '';
    empty.hidden = true;
    meta.hidden = true;

    let data;
    try {
      data = await jsonFetch(`/api/search?q=${encodeURIComponent(q)}`);
    } catch (err) {
      grid.innerHTML = `<p class="empty">Search failed: ${escapeHtml(err.message)}</p>`;
      return;
    }

    meta.hidden = false;
    meta.innerHTML = `
      <div>
        <strong>${data.totalHits}</strong>
        match${data.totalHits === 1 ? '' : 'es'} in the local catalogue for
        <strong>${escapeHtml(data.query)}</strong>.
      </div>
      <div>
        <a class="btn btn-ghost" href="${escapeHtml(data.issuuSearchUrl)}"
           target="_blank" rel="noopener">
          Search inside PDFs on Issuu ↗
        </a>
      </div>
    `;

    if (!data.results.length) {
      empty.hidden = false;
      return;
    }

    grid.innerHTML = data.results
      .map((i) => issueCardHtml(i, i.matchedTerms || data.terms))
      .join('');
    grid.querySelectorAll('[data-issue-id]').forEach((node) => {
      node.addEventListener('click', () => {
        const id = node.getAttribute('data-issue-id');
        const issue = state.issues.find((x) => x.id === id);
        reader.open(issue);
      });
    });
  }

  // ---------- Local ----------
  function bindLocal() {
    const usernameInput = $('#username');
    const locSel = $('#location');
    const customWrap = $('#custom-location-wrap');
    const customInput = $('#custom-location');
    const content = $('#content');
    const charCount = $('#char-count');
    const form = $('#composer');
    const feedFilter = $('#feed-filter');
    const composerError = $('#composer-error');

    if (state.profile.username) usernameInput.value = state.profile.username;
    if (state.profile.customLocation) customInput.value = state.profile.customLocation;

    usernameInput.addEventListener('input', () => {
      state.profile.username = usernameInput.value.trim();
      saveProfile();
    });
    locSel.addEventListener('change', () => {
      const v = locSel.value;
      customWrap.hidden = v !== 'Other';
      state.profile.location = v;
      saveProfile();
    });
    customInput.addEventListener('input', () => {
      state.profile.customLocation = customInput.value.trim();
      saveProfile();
    });
    content.addEventListener('input', () => {
      charCount.textContent = `${content.value.length} / 600`;
    });

    feedFilter.addEventListener('change', async () => {
      state.currentLocation = feedFilter.value;
      await refreshPosts();
      if (state.socket) state.socket.emit('subscribe', feedFilter.value === '__all__' ? '' : feedFilter.value);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      composerError.textContent = '';
      const username = usernameInput.value.trim();
      let location = locSel.value;
      if (location === 'Other') location = customInput.value.trim();
      const body = content.value.trim();

      if (!username) return (composerError.textContent = 'Add a username.');
      if (!location) return (composerError.textContent = 'Pick a location.');
      if (!body) return (composerError.textContent = 'Write a message first.');

      const submitBtn = $('#post-submit');
      submitBtn.disabled = true;
      try {
        await jsonFetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, location, content: body }),
        });
        content.value = '';
        charCount.textContent = '0 / 600';
      } catch (err) {
        composerError.textContent = err.message || 'Could not post.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  async function populateLocations() {
    let data;
    try { data = await jsonFetch('/api/locations'); }
    catch (_e) { data = { locations: ['Other'] }; }
    state.locations = data.locations || ['Other'];
    fillLocationSelect();
  }
  function fillLocationSelect() {
    const locSel = $('#location');
    const feedFilter = $('#feed-filter');
    if (!locSel || !feedFilter) return;

    locSel.innerHTML = '<option value="" disabled selected>Choose…</option>' +
      state.locations.map((l) =>
        `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`,
      ).join('');
    if (state.profile.location && state.locations.includes(state.profile.location)) {
      locSel.value = state.profile.location;
    } else if (state.profile.location === 'Other') {
      locSel.value = 'Other';
    }
    $('#custom-location-wrap').hidden = locSel.value !== 'Other';

    const currentFilter = state.currentLocation;
    feedFilter.innerHTML = '<option value="__all__">All locations</option>' +
      state.locations.filter((l) => l !== 'Other').map((l) =>
        `<option value="${escapeHtml(l)}">${escapeHtml(l)}</option>`,
      ).join('');
    feedFilter.value = currentFilter || '__all__';
  }

  function renderLatestTile() {
    const issue = state.issues[0];
    if (!issue) return;
    $('#latest-tile-img').src = issue.coverMedium || issue.cover;
    $('#latest-tile-title').textContent = issue.title;
    $('#latest-tile-date').textContent = issue.humanDate || '';
  }

  async function refreshPosts() {
    const url = state.currentLocation && state.currentLocation !== '__all__'
      ? `/api/posts?location=${encodeURIComponent(state.currentLocation)}`
      : '/api/posts';
    try {
      const data = await jsonFetch(url);
      state.posts = data.posts || [];
      renderFeed();
    } catch (err) {
      console.error('refreshPosts failed:', err);
    }
  }

  function renderFeed() {
    const list = $('#feed-list');
    const empty = $('#feed-empty');
    if (!list) return;
    if (!state.posts.length) {
      list.innerHTML = '';
      empty.hidden = false;
      $('#status-count').textContent = '';
      return;
    }
    empty.hidden = true;
    list.innerHTML = state.posts.map(postHtml).join('');
    $('#status-count').textContent =
      `${state.posts.length} post${state.posts.length === 1 ? '' : 's'}`;
  }

  function postHtml(p) {
    return `
      <li class="post">
        <div class="post-meta">
          <span class="post-user">${escapeHtml(p.username)}</span>
          <span class="post-loc">${escapeHtml(p.location)}</span>
          <span class="post-time" data-iso="${escapeHtml(p.createdAt)}">
            ${escapeHtml(timeAgo(p.createdAt))}
          </span>
        </div>
        <div class="post-body">${escapeHtml(p.content)}</div>
      </li>
    `;
  }

  function prependPost(p) {
    if (state.currentLocation !== '__all__' && p.location !== state.currentLocation) {
      return;
    }
    state.posts.unshift(p);
    if (state.posts.length > 200) state.posts.pop();
    renderFeed();
  }

  function initSocket() {
    if (typeof io !== 'function') {
      console.warn('socket.io client not loaded');
      return;
    }
    const socket = io();
    state.socket = socket;
    const pill = $('#status-pill');
    const text = pill.querySelector('.status-text');
    socket.on('connect', () => {
      pill.classList.add('connected');
      text.textContent = 'live';
      if (state.currentLocation && state.currentLocation !== '__all__') {
        socket.emit('subscribe', state.currentLocation);
      }
    });
    socket.on('disconnect', () => {
      pill.classList.remove('connected');
      text.textContent = 'offline';
    });
    socket.on('post:new', (post) => prependPost(post));
    socket.on('location:added', (payload) => {
      state.locations = payload.locations || state.locations;
      fillLocationSelect();
    });
  }

  // ---------- Go ----------
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
