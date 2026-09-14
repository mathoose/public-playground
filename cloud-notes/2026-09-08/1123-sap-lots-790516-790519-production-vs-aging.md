---
recorded: 2026-09-08T11:23:00Z
timezone: UTC
source: mobile-voice
status: inbox
title: SAP search lots 790516 and 790519 — production vs aging spreadsheet
---

# SAP search lots 790516 and 790519 — production vs aging spreadsheet

## Transcript

> Okay, search all of the results in SAP for lots with the string of numbers 7 9 0 5 1 6 and 7 9 0 5 1 9. There are gonna be different variants. The ones where it starts off with U S A W, those should be listed as the production batches, while the ones that start with 7 9 and then end with different suffixes should be the aging results. Please bill me, spreadsheet, and inform me of any tests that are not included for each batch.

## What this is about

Read-only SAP search for lots whose IDs contain **790516** or **790519**. Variants split:

- **Production batches:** lot starts with **USAW**
- **Aging results:** lot starts with **79** and has varying suffixes

Build a spreadsheet. For each batch, list **tests not included** (missing vs the family’s full test set / inspection plan).

Voice-to-text: “bill me, spreadsheet” = **build me a spreadsheet**.

## Suggested actions for desktop Cursor

- [x] Attempt SAP search from this Cloud Agent (2026-09-08) — **blocked** (no SAP/SSO)
- [x] Build spreadsheet layout: `cloud-notes/playbooks/sap-lots-790516-790519-TEMPLATE.xlsx`
- [ ] On work SAP (read-only): search `*790516*` and `*790519*`
- [ ] Classify USAW* = production, 79*+suffix = aging
- [ ] Fill tests present / tests missing per batch; keep live data out of this public repo
