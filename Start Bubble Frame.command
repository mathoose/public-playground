#!/bin/bash
# Double-click from the repo root. Opens the Bubble Frame app in your browser.

HERE="$(cd "$(dirname "$0")" && pwd)"
APP="$HERE/bubble-frame/Start Bubble Frame.command"

if [ ! -f "$APP" ]; then
  echo "I cannot find bubble-frame/Start Bubble Frame.command."
  echo "Keep this file in the public-playground folder."
  read -r -p "Press Return to close…"
  exit 1
fi

exec bash "$APP"
