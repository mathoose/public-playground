# SAP lot search — 790516 / 790519 (read-only)

Standalone task. **Search and report only.** Do not create, change, or post anything in SAP.

Voice-to-text may say “bill me a spreadsheet” → **build** a spreadsheet.

## Classification

Search lots containing **790516** or **790519** (all variants).

| Lot pattern | Category |
| --- | --- |
| Starts with `USAW` | Production batch |
| Starts with `79` (different suffixes) | Aging result |

## Spreadsheet

For each lot:

- Lot ID
- Family (`790516` or `790519`)
- Category (production / aging)
- Tests present
- **Tests not included** vs the union of tests seen on that family (or vs the inspection plan if SAP shows it)

Do not commit filled lot/test data to `public-playground`. Write the live workbook to Cloud Agent artifacts or a private path.

Empty layout: `cloud-notes/playbooks/sap-lot-search-template.csv` and `cloud-notes/playbooks/sap-lots-790516-790519-TEMPLATE.xlsx`.
