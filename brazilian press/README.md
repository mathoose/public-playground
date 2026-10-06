# Brazilian Press

A small, self-contained web app for the **Brazilian Press** newspaper. It
mirrors every issue published to
[issuu.com/brazilianpress](https://issuu.com/brazilianpress), gives readers a
clean reader/archive/search UI, and adds a live community feed for readers in
the Brazilian diaspora.

There is **no build step**, no bundler, no database. Vanilla HTML/CSS/JS on
the front, Express + Socket.io on the back, JSON files for storage.

## Features

- **Reader.** The most recent issue opens automatically in a full-screen
  overlay backed by Issuu's official embed. Press `Esc` (or click `← Back`) to
  exit. The iframe `src` is cleared on close so audio/video stops.
- **Archive.** Every available edition as a card with cover, edition badge and
  date. Filter by year or free-text.
- **Search.** Queries the local catalogue's metadata (title, docname, edition,
  year, date, month). Matching terms are flagged in yellow. A secondary link
  jumps to Issuu's in-PDF search.
- **Local.** A tiny community feed:
  - Username + location (preloaded with Brazilian-diaspora hubs; "Other"
    reveals a custom city field that auto-adds to the picker).
  - 600-char composer with a live counter.
  - Live updates via Socket.io rooms (`loc:<location>` and `loc:__all__`).
  - Hero banner with the latest issue as a clickable tile.
- Profile (username, location, custom city) persists in `localStorage` under
  `bp:profile`.
- Posts persist atomically to `data/posts.json` (capped at 500).

## Quick start

```bash
cd "brazilian press"
npm install
npm start
# → http://localhost:3000
```

Requires Node 18+. The repository ships with a pre-generated
`data/issues.json` so the app works offline. To refresh from Issuu:

```bash
npm run refresh-catalogue
```

That re-scrapes `https://issuu.com/brazilianpress?ps=300` and overwrites
`data/issues.json`.

## Routes (frontend)

The app is a single page with hash routing:

- `#/archive` — issue grid
- `#/search` — local catalogue search
- `#/local` — community feed

A catch-all server route serves `index.html` for any other path so deep
links keep working on refresh.

## API

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET    | `/api/health`            | `{ ok, issues, posts, lastUpdated }` |
| GET    | `/api/issues`            | Full catalogue object |
| GET    | `/api/issues/current`    | Newest issue |
| GET    | `/api/issues/:id`        | Single issue by `docname` |
| GET    | `/api/search?q=…`        | `{ query, terms, totalHits, issuuSearchUrl, results }` |
| GET    | `/api/locations`         | `{ locations: […] }` |
| GET    | `/api/posts?location=…`  | Recent posts, optionally filtered |
| POST   | `/api/posts`             | `{ username, location, content }` → created post |

### Socket.io

- On connect, the client joins room `loc:__all__`.
- The client may emit `subscribe` with a location string to also follow that
  city. Sending an empty string just leaves the previous room.
- Server emits `post:new` to `loc:__all__` and `loc:<location>` whenever a
  new post is created.
- Server emits `location:added` when a brand-new location is introduced.

## Limits

- Username 40 chars
- Location 60 chars
- Post content 600 chars
- Posts stored: 500 (FIFO trimmed)

## Files

```
brazilian press/
├── package.json
├── .gitignore
├── README.md
├── server.js                 # Express + Socket.io
├── scripts/
│   └── build-catalogue.js    # regenerates data/issues.json from Issuu
├── data/
│   ├── issues.json           # catalogue
│   ├── posts.json            # (ignored) community posts
│   └── locations.json        # (ignored) user-added locations
└── public/
    ├── index.html
    ├── styles.css
    └── app.js
```

## Notes

This project is an unofficial reader. Brazilian Press, its branding and its
content remain the property of their publisher.
