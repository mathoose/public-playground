'use strict';

const fs = require('fs');
const path = require('path');
const http = require('http');
const express = require('express');
const { Server: SocketIOServer } = require('socket.io');

const ROOT = __dirname;
const DATA_DIR = path.join(ROOT, 'data');
const ISSUES_PATH = path.join(DATA_DIR, 'issues.json');
const POSTS_PATH = path.join(DATA_DIR, 'posts.json');
const LOCATIONS_PATH = path.join(DATA_DIR, 'locations.json');

const MAX_USERNAME_LEN = 40;
const MAX_LOCATION_LEN = 60;
const MAX_CONTENT_LEN = 600;
const MAX_STORED_POSTS = 500;

const PRESET_LOCATIONS = [
  'Newark, NJ', 'Elizabeth, NJ', 'Long Branch, NJ', 'Harrison, NJ', 'Kearny, NJ',
  'Astoria, NY', 'New York, NY', 'Mineola, NY', 'Yonkers, NY',
  'Bridgeport, CT', 'Danbury, CT',
  'Framingham, MA', 'Boston, MA', 'Somerville, MA',
  'Pompano Beach, FL', 'Orlando, FL', 'Miami, FL', 'Boca Raton, FL',
  'Houston, TX', 'Los Angeles, CA',
  'São Paulo, BR', 'Rio de Janeiro, BR', 'Belo Horizonte, BR',
  'Other',
];

fs.mkdirSync(DATA_DIR, { recursive: true });

function loadIssues() {
  if (!fs.existsSync(ISSUES_PATH)) {
    console.warn(
      `[brazilian-press] data/issues.json not found. ` +
        `Run "npm run refresh-catalogue" to generate it.`,
    );
    return {
      publisher: 'brazilianpress',
      publisherName: 'Brazilian Press',
      publisherUrl: 'https://issuu.com/brazilianpress',
      publisherSite: 'https://www.brazilianpress.com/',
      totalPublishedOnIssuu: 0,
      lastUpdated: null,
      issues: [],
    };
  }
  return JSON.parse(fs.readFileSync(ISSUES_PATH, 'utf8'));
}

function readJsonSafe(file, fallback) {
  try {
    if (!fs.existsSync(file)) return fallback;
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    console.warn(`[brazilian-press] could not read ${file}:`, err.message);
    return fallback;
  }
}

function writeJsonAtomic(file, value) {
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(value, null, 2));
  fs.renameSync(tmp, file);
}

function sanitizeText(s, maxLen) {
  if (typeof s !== 'string') return '';
  // Collapse exotic whitespace, trim ends, cap length.
  const cleaned = s.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\r\n?/g, '\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return cleaned.slice(0, maxLen);
}

const catalogue = loadIssues();
const posts = readJsonSafe(POSTS_PATH, []);
const storedLocations = readJsonSafe(LOCATIONS_PATH, []);

const locationSet = new Set();
for (const loc of PRESET_LOCATIONS) locationSet.add(loc);
for (const loc of storedLocations) {
  if (typeof loc === 'string' && loc.trim()) locationSet.add(loc.trim());
}

function locationList() {
  const others = [];
  const presetOrder = new Map(PRESET_LOCATIONS.map((l, i) => [l, i]));
  const presets = [];
  for (const l of locationSet) {
    if (presetOrder.has(l)) presets.push(l);
    else others.push(l);
  }
  presets.sort((a, b) => presetOrder.get(a) - presetOrder.get(b));
  others.sort((a, b) => a.localeCompare(b));
  // Keep "Other" at the bottom of the preset block.
  const withoutOther = presets.filter((l) => l !== 'Other');
  return [...withoutOther, ...others, 'Other'];
}

function persistLocations() {
  const customs = [];
  for (const l of locationSet) {
    if (!PRESET_LOCATIONS.includes(l)) customs.push(l);
  }
  writeJsonAtomic(LOCATIONS_PATH, customs);
}

function persistPosts() {
  writeJsonAtomic(POSTS_PATH, posts);
}

function buildSearch(query) {
  const raw = String(query || '').trim();
  const terms = raw
    .split(/\s+/)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

  const issuuSearchUrl =
    `https://issuu.com/search?q=${encodeURIComponent(raw)}` +
    `&publisher=brazilianpress`;

  if (!terms.length) {
    return {
      query: raw,
      terms,
      totalHits: 0,
      issuuSearchUrl,
      results: [],
    };
  }

  const results = [];
  for (const issue of catalogue.issues) {
    const haystack = [
      issue.title,
      issue.docname,
      issue.edition != null ? `ed ${issue.edition}` : '',
      issue.edition != null ? `ed.${issue.edition}` : '',
      issue.edition != null ? String(issue.edition) : '',
      issue.year != null ? String(issue.year) : '',
      issue.humanDate || '',
      issue.month != null ? String(issue.month) : '',
      issue.date || '',
    ]
      .join(' \u0000 ')
      .toLowerCase();

    const matchedTerms = [];
    let matchScore = 0;
    for (const term of terms) {
      if (haystack.includes(term)) {
        matchedTerms.push(term);
        matchScore += 1;
      }
    }
    if (matchedTerms.length) {
      results.push({ ...issue, matchedTerms, matchScore });
    }
  }

  results.sort((a, b) => {
    if (b.matchScore !== a.matchScore) return b.matchScore - a.matchScore;
    if (a.date && b.date) return b.date.localeCompare(a.date);
    return 0;
  });

  return {
    query: raw,
    terms,
    totalHits: results.length,
    issuuSearchUrl,
    results,
  };
}

const app = express();
app.use(express.json({ limit: '32kb' }));
app.use(express.static(path.join(ROOT, 'public')));

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    issues: catalogue.issues.length,
    posts: posts.length,
    lastUpdated: catalogue.lastUpdated,
  });
});

app.get('/api/issues', (req, res) => {
  res.json(catalogue);
});

app.get('/api/issues/current', (req, res) => {
  if (!catalogue.issues.length) {
    return res.status(404).json({ error: 'no issues available' });
  }
  res.json(catalogue.issues[0]);
});

app.get('/api/issues/:id', (req, res) => {
  const issue = catalogue.issues.find((i) => i.id === req.params.id);
  if (!issue) return res.status(404).json({ error: 'issue not found' });
  res.json(issue);
});

app.get('/api/search', (req, res) => {
  res.json(buildSearch(req.query.q));
});

app.get('/api/locations', (req, res) => {
  res.json({ locations: locationList() });
});

app.get('/api/posts', (req, res) => {
  const loc = sanitizeText(req.query.location || '', MAX_LOCATION_LEN);
  let filtered = posts;
  if (loc) filtered = posts.filter((p) => p.location === loc);
  res.json({ posts: filtered.slice(-200).reverse() });
});

app.post('/api/posts', (req, res) => {
  const body = req.body || {};
  const username = sanitizeText(body.username, MAX_USERNAME_LEN);
  const location = sanitizeText(body.location, MAX_LOCATION_LEN);
  const content = sanitizeText(body.content, MAX_CONTENT_LEN);

  if (!username) return res.status(400).json({ error: 'username required' });
  if (!location) return res.status(400).json({ error: 'location required' });
  if (!content) return res.status(400).json({ error: 'content required' });

  const post = {
    id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    username,
    location,
    content,
    createdAt: new Date().toISOString(),
  };

  posts.push(post);
  while (posts.length > MAX_STORED_POSTS) posts.shift();
  persistPosts();

  let locationAdded = false;
  if (!locationSet.has(location)) {
    locationSet.add(location);
    persistLocations();
    locationAdded = true;
  }

  io.to(`loc:__all__`).emit('post:new', post);
  io.to(`loc:${location}`).emit('post:new', post);
  if (locationAdded) {
    io.emit('location:added', { location, locations: locationList() });
  }

  res.status(201).json(post);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(ROOT, 'public', 'index.html'));
});

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  socket.join('loc:__all__');
  socket.data.currentLocationRoom = null;

  socket.on('subscribe', (rawLocation) => {
    const location = sanitizeText(rawLocation || '', MAX_LOCATION_LEN);
    if (socket.data.currentLocationRoom) {
      socket.leave(socket.data.currentLocationRoom);
      socket.data.currentLocationRoom = null;
    }
    if (location) {
      const room = `loc:${location}`;
      socket.join(room);
      socket.data.currentLocationRoom = room;
    }
  });
});

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, () => {
  console.log(
    `[brazilian-press] listening on http://localhost:${PORT} ` +
      `(${catalogue.issues.length} issues, ${posts.length} posts)`,
  );
});
