---
name: github-pr-edits
description: Edit files on GitHub via pull requests — one PR per change round, version bumps when the repo tracks them, a PR summary table, and a clickable live HTTPS link for each shipped app so the user can always open the most recent change. Use when editing a GitHub repository, creating or updating pull requests, pushing branches to GitHub, opening PRs, or when the user asks to change code on GitHub.
---

# GitHub edits (pull request workflow)

Use this skill when making **any code change destined for GitHub**. Do not push directly to the default branch. Do not reuse a branch after its PR has been merged.

## User merges only (hard rule)

**Never merge a pull request. Never push to `main` (or any default branch).**

- Always leave an **open pull request** for the user to merge themselves.
- Push **only** the feature branch so that PR can exist (`git push -u origin <branch-name>`).
- Do not run `gh pr merge`, `git merge` into `main`, `git push origin main`, or any other merge/land action.
- In the summary, tell the user they must **merge the PR** for the live copy to update.

## Workflow (required)

1. **Branch** — `git checkout <default-branch> && git pull && git checkout -b <branch-name>`
2. **Edit** — Make the smallest correct change. Match existing patterns in the repo.
3. **Version bump** — If the repo tracks versions (see below), bump every component you changed.
4. **Commit** — Clear message; end with `Versions: …` when versions were bumped.
5. **Push the feature branch** — `git push -u origin <branch-name>` (not `main`).
6. **Pull request** — Open a **new** PR to the default branch. One PR per round of work; if the previous PR merged, start a new branch and new PR. Leave it open — the user merges it.
7. **Summarize** — End your message to the user with the **PR summary table** (see below), including a **clickable live link**.

## Version bumps

Check whether the repo has a version manifest. If it does, bump **every** component whose code you touched — even one-line fixes.

### `mathoose/cursor-apps` (`versions.json`)

Format: `"N · Mon D, YYYY"` (increment **N**, update date).

| You changed… | Bump in `versions.json` |
|--------------|-------------------------|
| `index.html`, `apps.json`, `apps-backup.js`, `apps-shell.js`, `apps-shell.css`, `apps-photo-picker.js` | `launcher` |
| Files inside `your-app/` | `apps.your-app` (folder name = app id) |

Live URL after merge: `https://mathoose.github.io/cursor-apps/<app-id>/`

### `mathoose/public-playground`

No `versions.json`. Note “no version file” in the table.

Live URLs after merge:

| App | Live |
|-----|------|
| Bubble Frame | [bubble-frame on main](https://github.com/mathoose/public-playground/tree/main/bubble-frame) |
| This PR’s files | `https://github.com/mathoose/public-playground/tree/<branch>/bubble-frame` |

When you export or ship Bubble Frame, also keep **clickable STL download links** in the app (`#exportLinks`) pointing at the latest generated frame / back plate / stand.

When the change adds or ships a project in the 3D printing library, also follow `.cursor/skills/3d-printing-library/SKILL.md`. Every new project is added to the hub with today’s date and the next `data-seq`, so Latest stays newest-first.

### Joint 3MF (multi-part prints)

Whenever an app ships more than one mesh — colors, raised letters, a ring, icing, candy — always offer both:

1. **Separate STLs**, one file per part, all in the same millimeter coordinates.
2. **The joint file**: one `.3mf` of those parts as a single assembly. This is the import that should land already stacked. The page offers it next to the STLs.

Build that 3MF as one assembly. A slicer drops every `<build>` item onto the bed, so one item per part plants raised pieces inside the base (this is what buried the Paddington letters and ring).

- `unit="millimeter"`.
- Each part is its own `<object>` with a `<mesh>` and a `name`. Vertices stay in shared coordinates: Z up, bed at z=0, the same numbers as the STLs. Do not recenter a mesh on its own box.
- One more object holds `<components>`, one `<component objectid="…">` per part, each with transform `1 0 0 0 1 0 0 0 1 0 0 0`.
- `<build>` has a single `<item>` pointing at that assembly, with the same identity transform. Not one item per part.
- Do not fuse the meshes into one solid.
- A part that sits on a face keeps that height in the vertex Z. About 0.08 mm of overlap into the face is enough for the layers to bond.
- Cut screw holes, switch openings, and cord holes through every mesh that would cover them.

### Other repos

Look for `package.json`, `VERSION`, `CHANGELOG.md`, or similar. Follow the repo’s existing versioning convention. If none exists, note “no version file” in the PR summary table.

## PR summary table (required every turn with code changes)

Always include this at the **end** of your response when you changed code:

| PR | Summary | Versions | Live |
|----|---------|----------|------|
| [#N](https://github.com/owner/repo/pull/N) | One line: what the user gets after merging | `component` **N** — short note | [Open app](https://example.com/app/) |

### Column rules

1. **PR** — Link to the full GitHub PR URL. One row per **open** PR that still needs merging.
2. **Summary** — User-facing outcome (not implementation detail). One short sentence.
3. **Versions** — List every bumped id as `id` **N**. If the repo has no version file, write `none`.
4. **Live** — A **clickable HTTPS markdown link** to each changed app so the user can always open the most recent change. Do not paste a bare URL as plain text.

If nothing is open to merge, say so. Never merge it yourself.

Do **not** skip the Live column even for “small” fixes — that link is how they reach the latest change.

## Remind the user

- They must **merge the PR themselves**.
- For `mathoose/cursor-apps`: live site is `https://mathoose.github.io/cursor-apps/` (GitHub Pages from **`main`**). Hard-refresh Safari / re-add to Home Screen if the old build sticks.
- For `mathoose/public-playground` Bubble Frame: [latest on main](https://github.com/mathoose/public-playground/tree/main/bubble-frame).

## Do not

- Merge, squash, or land a PR — the user always merges.
- Push to `main` / the default branch.
- Skip version bumps for “small” fixes when the repo tracks versions.
- Reuse a merged branch for new work — create a fresh branch and PR.
- Omit the PR summary table at the end of the turn.
- Give version numbers without a clickable live URL for each changed app.
