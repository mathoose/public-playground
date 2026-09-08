---
recorded: 2026-09-07T13:25:00Z
timezone: UTC
source: typed
status: inbox
title: Qsidono 7920 trial — did not work (no access)
---

# Qsidono 7920 trial — did not work (no access)

## Transcript

Trial of the 13:14 voice task: pull SPC charts from Qsidono for material **7920** (photoresist), screenshot every chart, report the most recent lot.

## What this is about

This Cloud Agent **could not complete** the 7920 trial. Blockers are access, not the idea of the task.

## Trial result

**Did not work.** No SPC charts exported. No screenshots of charts. Most recent lot: **unknown**.

| Check | Result |
| --- | --- |
| Public product / docs named Qsidono | None found |
| Hostnames like qsidono.com | Do not resolve |
| Work login, SSO, or API secret in this environment | None |
| Self-hosted Cursor worker on a work PC | None connected |
| Lot count for this trial | **Not given** (you said you would specify lots + material; only 7920 / photoresist arrived) |

This VM is on the public internet. Confirmed later: the app is **QC Dono**, a company Palantir Foundry workshop. Still not reachable from here without the Meeting view URL and SSO.

## Suggested actions for desktop Cursor

- [ ] Do **not** commit real lot numbers, CoAs, or SPC exports into `public-playground` (this repo is public)
- [ ] Next retry: **how many lots**, material **7920**, and the **QC Dono Meeting view URL**
- [ ] Run from a **self-hosted worker** on the work PC (`cursor worker start`) on SSO, then follow `cloud-notes/playbooks/qc-dono-spc.md`
- [ ] Meeting view + filter fields only; screenshots; no other Foundry changes
