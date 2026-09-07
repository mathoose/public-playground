# Cloud notes

Talk on your phone in a Cloud Agent. Each voice dump is saved here as a dated, timed file named after **what you talked about**. Sit down at the computer, pull this folder, and tell Cursor to work the inbox.

## Talk here, pick up on desktop

Yes — you can talk in this Cloud Agent (Cursor iOS, [cursor.com/agents](https://cursor.com/agents), or Cloud from desktop). Voice is just a transcript; the durable copy is a markdown file in this folder, not the chat history.

**On the phone**

1. Open or keep this Cloud Agent thread (follow-ups on the **same** agent stack notes on one branch).
2. Speak. The agent should write `cloud-notes/YYYY-MM-DD/HHMM-what-you-talked-about.md` and add a row to `INBOX.md`.
3. Merge the PR when you are ready so `main` has the notes.

**On the computer**

1. Pull this repo (`git pull` on `main` after merge, or check out the notes PR branch).
2. In Cursor, attach `@cloud-notes` or `@cloud-notes/INBOX.md`.
3. Say something like: *Work the open cloud notes. Start at the top of the inbox.*
4. Cursor should execute the checkboxes, then mark notes `status: done`.

## Layout

```
cloud-notes/
  README.md              ← you are here
  INBOX.md               ← open work for desktop Cursor
  _template.md           ← copy this for each new capture
  2026-09-07/
    1255-short-description.md
```

- **Folder** = UTC calendar day
- **Time prefix** = UTC `HHMM` (24-hour)
- **Rest of the filename** = kebab-case description of the topic

Times are UTC so phone and desktop never disagree. The `recorded` field in each file is ISO-8601 UTC.

## What a later agent should do

Treat `INBOX.md` as the work queue. For each open note:

1. Read the transcript and suggested actions.
2. Do the work (or say what is blocked).
3. Check off actions, set `status: done`, move the inbox row to **Done**.

A project rule (`.cursor/rules/cloud-notes.mdc`) tells every agent in this repo to file new voice captures automatically.
