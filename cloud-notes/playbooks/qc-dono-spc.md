# QC Dono SPC pull (Foundry Meeting view)

Standalone task. App name: **QC Dono** (voice-to-text may say Qsidono). It is a **company Palantir Foundry** workshop.

**Do not commit** lot numbers, chart images, or exports to `public-playground`. Put screenshots in Cloud Agent artifacts or another private path.

## Authorization (do not exceed)

Allowed:

- **Meeting view** only
- Enter values in **filter** fields only
- Screenshots + a written report

Not allowed:

- Any other Foundry view, widget, or tool
- Saves, edits, ontology changes, pipeline runs
- **BATCH GENEALOGY** until the user explicitly asks

If the UI asks for something outside filters, stop.

## Inputs

| Input | Example | 7920 trial |
| --- | --- | --- |
| Material number | 7920 | 7920 |
| Material name | photoresist | photoresist |
| How many lots | last 30 | still needed when they retry |
| Foundry / QC Dono URL | Meeting view link from the work browser | still needed |

## Steps

1. Open QC Dono **Meeting view** (work SSO). If login fails, stop.
2. Filters only: material number (7920), lot window if that filter exists. Apply filters.
3. Screenshot every SPC chart shown in Meeting view.
4. Read the **most recent lot** from what is on screen.
5. Report. Do not change anything else.

## Report shape

```
Tool: QC Dono (Foundry Meeting view)
Material: 7920 (photoresist)
Lots included: N
Charts screenshotted: K
Most recent lot: <id> on <date>
Worked: yes / partial / no
Blockers: …
```
