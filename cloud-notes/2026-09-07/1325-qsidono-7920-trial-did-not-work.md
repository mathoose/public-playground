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

This VM is on the public internet. Qsidono looks like an **internal** quality/SPC app (lots + material number + control charts). It is not reachable from here without a URL and a logged-in session on the company network.

## Suggested actions for desktop Cursor

- [ ] Do **not** commit real lot numbers, CoAs, or SPC exports into `public-playground` (this repo is public)
- [ ] Next voice dump should include: **how many lots**, confirm material **7920**, and the **Qsidono URL** (paste from the browser) or a screenshot of the logged-in screen
- [ ] To actually run this from Cursor: start a **self-hosted worker** on the work PC (`cursor worker start`) while on VPN, or add a private-repo agent with SSO — then re-run this playbook
- [ ] Follow `cloud-notes/playbooks/qsidono-spc.md`
