#!/usr/bin/env node
/**
 * Regenerate data/issues.json by scraping the Brazilian Press publisher
 * page on Issuu (https://issuu.com/brazilianpress).
 *
 * Issuu serves the publisher page as server-rendered HTML that preloads
 * cover image IDs and per-issue links in the same order, so we can extract
 * both lists with regex and zip them together. A browser-like User-Agent
 * is required or Issuu returns "You are not allowed to access this resource."
 */

'use strict';

const fs = require('fs');
const path = require('path');

const PUBLISHER = 'brazilianpress';
const PUBLISHER_URL = `https://issuu.com/${PUBLISHER}`;
const LIST_URL = `${PUBLISHER_URL}?ps=300`;

const USER_AGENT =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/120.0 Safari/537.36';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} fetching ${url}`);
  }
  return res.text();
}

function uniqueOrdered(values) {
  const seen = new Set();
  const out = [];
  for (const v of values) {
    if (seen.has(v)) continue;
    seen.add(v);
    out.push(v);
  }
  return out;
}

function extractCoverIds(html) {
  const re =
    /image\.isu\.pub\/([a-f0-9-]+)\/jpg\/page_1_thumb_large\.jpg/g;
  const ids = [];
  let m;
  while ((m = re.exec(html)) !== null) ids.push(m[1]);
  return uniqueOrdered(ids);
}

function extractDocNames(html) {
  const re =
    /\/brazilianpress\/docs\/([a-zA-Z0-9_.-]+?)(?=["?&])/g;
  const docs = [];
  let m;
  while ((m = re.exec(html)) !== null) docs.push(m[1]);
  return uniqueOrdered(docs);
}

function extractTotal(html) {
  const m = html.match(/totalPublications"\s*:\s*(\d+)/i);
  if (m) return Number(m[1]);
  const m2 = html.match(/"publicationCount"\s*:\s*(\d+)/i);
  if (m2) return Number(m2[1]);
  return null;
}

function parseEdition(docname) {
  const m = docname.match(/ed\.?(\d{3,4})/i);
  return m ? Number(m[1]) : null;
}

function parseDateFromDocname(docname) {
  let m = docname.match(/_(\d{2})_(\d{2})_(\d{4})/);
  if (m) {
    const [, dd, mm, yyyy] = m;
    return safeDate(Number(yyyy), Number(mm), Number(dd));
  }
  m = docname.match(/_(\d{4})(\d{2})(\d{2})/);
  if (m) {
    const [, yyyy, mm, dd] = m;
    return safeDate(Number(yyyy), Number(mm), Number(dd));
  }
  return null;
}

function parseDateFromCoverId(coverId) {
  // Cover IDs usually start with YYMMDD<rest>.
  const m = coverId.match(/^(\d{2})(\d{2})(\d{2})/);
  if (!m) return null;
  const [, yy, mm, dd] = m;
  const year = 2000 + Number(yy);
  return safeDate(year, Number(mm), Number(dd));
}

function safeDate(year, month, day) {
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return null;
  }
  const d = new Date(Date.UTC(year, month - 1, day));
  if (
    d.getUTCFullYear() !== year ||
    d.getUTCMonth() !== month - 1 ||
    d.getUTCDate() !== day
  ) {
    return null;
  }
  return d;
}

function titleFromDocname(docname) {
  // Strip the trailing _DD_MM_YYYY or _YYYYMMDD section so the title looks clean.
  let base = docname
    .replace(/_\d{2}_\d{2}_\d{4}.*$/, '')
    .replace(/_\d{8}.*$/, '')
    .replace(/[._-]+$/g, '');
  const parts = base.split(/[._-]+/).filter(Boolean);
  const words = parts.map((p) => {
    if (/^ed\d+$/i.test(p)) {
      const num = p.replace(/^ed/i, '');
      return `Ed. ${num}`;
    }
    if (/^\d+$/.test(p)) return p;
    return p.charAt(0).toUpperCase() + p.slice(1).toLowerCase();
  });
  return words.join(' ').replace(/\s+/g, ' ').trim();
}

function humanDate(d) {
  if (!d) return null;
  return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
}

function buildIssue(docname, coverId) {
  const dateFromName = parseDateFromDocname(docname);
  const dateFromCover = parseDateFromCoverId(coverId);
  const date = dateFromName || dateFromCover;
  const edition = parseEdition(docname);
  const title = titleFromDocname(docname) || docname;
  return {
    id: docname,
    docname,
    title,
    edition,
    date: date ? date.toISOString() : null,
    humanDate: humanDate(date),
    year: date ? date.getUTCFullYear() : null,
    month: date ? date.getUTCMonth() + 1 : null,
    url: `https://issuu.com/${PUBLISHER}/docs/${docname}`,
    embedUrl: `https://e.issuu.com/embed.html?u=${PUBLISHER}&d=${docname}`,
    cover: `https://image.isu.pub/${coverId}/jpg/page_1_thumb_large.jpg`,
    coverFull: `https://image.isu.pub/${coverId}/jpg/page_1.jpg`,
    coverMedium: `https://image.isu.pub/${coverId}/jpg/page_1_thumb_medium.jpg`,
    publisherUid: coverId,
  };
}

async function main() {
  console.log(`Fetching ${LIST_URL} ...`);
  const html = await fetchHtml(LIST_URL);

  const covers = extractCoverIds(html);
  const docs = extractDocNames(html);
  const totalOnIssuu = extractTotal(html);

  console.log(
    `Found ${covers.length} cover IDs and ${docs.length} doc names ` +
      (totalOnIssuu ? `(publisher total: ${totalOnIssuu})` : ''),
  );

  const count = Math.min(covers.length, docs.length);
  if (count === 0) {
    throw new Error(
      'No issues parsed. Issuu may have changed its markup, or the request ' +
        'was blocked. Re-run with a browser-like User-Agent.',
    );
  }

  const issues = [];
  for (let i = 0; i < count; i++) {
    issues.push(buildIssue(docs[i], covers[i]));
  }

  // Sort newest first; issues without a date sink to the end.
  issues.sort((a, b) => {
    if (a.date && b.date) return b.date.localeCompare(a.date);
    if (a.date) return -1;
    if (b.date) return 1;
    return (b.edition || 0) - (a.edition || 0);
  });

  const payload = {
    publisher: PUBLISHER,
    publisherName: 'Brazilian Press',
    publisherUrl: PUBLISHER_URL,
    publisherSite: 'https://www.brazilianpress.com/',
    totalPublishedOnIssuu: totalOnIssuu || issues.length,
    lastUpdated: new Date().toISOString(),
    issues,
  };

  const outPath = path.join(__dirname, '..', 'data', 'issues.json');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(payload, null, 2) + '\n');
  console.log(`Wrote ${issues.length} issues to ${outPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
