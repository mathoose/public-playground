---
recorded: 2026-09-07T13:14:00Z
timezone: UTC
source: mobile-voice
status: inbox
title: Qsidono SPC charts for 7920 photoresist
---

# Qsidono SPC charts for 7920 photoresist

## Transcript

> The one thing I want to do is try using Qsidono through cursor if I tell you how many lots I want to be included and the material number. You should be able to find and export all the SPC charts, take screenshots of every SPC chart, and tell me the most recent lot in the dataset. If I could be one task on its own, I could start with trying to do it for 7920, photo resist, and then report back what it worked or not.

## What this is about

A standalone Cursor task against **QC Dono** (company Palantir Foundry; voice-to-text said Qsidono): given a **lot count** and a **material number**, use **Meeting view** only, set **filters** only, screenshot every SPC chart, and report the **most recent lot**.

First trial: material **7920**, photoresist. Lot count was not given for this trial — use whatever the system shows (or a reasonable default) and say how many lots were in the pull.

## Suggested actions for desktop Cursor

- [x] Attempt 7920 trial from this Cloud Agent (2026-09-07)
- [x] Report result: **did not work** — no Qsidono URL, login, or work-network access; lot count not given (see `1325-qsidono-7920-trial-did-not-work.md`)
- [ ] Re-run on work Foundry SSO (self-hosted worker or desktop on VPN) with lot count + QC Dono Meeting view URL
- [ ] For material 7920 (photoresist): Meeting view filters only, screenshot each chart, report most recent lot
- [ ] Keep exports **out** of this public repo
- [ ] Do not open BATCH GENEALOGY until asked
