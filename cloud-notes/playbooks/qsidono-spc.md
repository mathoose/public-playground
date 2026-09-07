# Qsidono SPC pull (standalone task)

Run this as **one task**. Do not mix it with other work.

**Do not commit** lot numbers, chart images, or exports to `public-playground` — that repo is public. Put artifacts in the Cloud Agent artifacts folder or a private path the user names.

## Inputs (required)

| Input | Example | This 7920 trial |
| --- | --- | --- |
| Material number | 7920 | 7920 |
| Material name | photoresist | photoresist |
| How many lots | last 30 lots | **missing** — ask or use the system's default and **say how many were included** |
| Qsidono URL | https://… from the work browser | **missing** |

## Steps

1. Open Qsidono (work VPN / SSO). If login fails, stop and report that — do not guess passwords.
2. Search material number. Confirm the description matches (e.g. photoresist).
3. Set the lot window to the requested count (most recent N lots).
4. List every SPC chart / characteristic for that material.
5. For **each** chart: open it, screenshot the full chart (points, limits, lot axis visible), and export if the app has export (PDF/CSV/PNG).
6. From the same dataset, read the **most recent lot** (lot ID + date if shown).
7. Report: material, lot count actually used, chart count, most recent lot, paths to screenshots, and whether it fully worked.

## Report shape

```
Material: 7920 (photoresist)
Lots included: N (most recent)
Charts: K
Most recent lot: <id> on <date>
Worked: yes / partial / no
Blockers: …
```
