#!/bin/bash
# Double-click from the repo root. Opens the Bubble Frame app in your browser.
# Does not start a local Python server (that is what caused the 404s).

URL="https://cdn.jsdelivr.net/gh/mathoose/public-playground@cursor/bubble-frame-finder-7f53/bubble-frame/index.html"
open "$URL"
exit 0
