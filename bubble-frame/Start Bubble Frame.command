#!/bin/bash
# Double-click this file on a Mac. A small terminal window will open — leave it.
# Your browser should open the Bubble Frame app. Close the terminal when you are done.

cd "$(dirname "$0")" || exit 1

if [ ! -f "./index.html" ]; then
  echo "This file has to stay inside the bubble-frame folder."
  echo "I cannot find index.html next to it."
  read -r -p "Press Return to close…"
  exit 1
fi

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is missing. Install it from https://www.python.org/downloads/"
  echo "then double-click this file again."
  read -r -p "Press Return to close…"
  exit 1
fi

PORT=8080
while command -v lsof >/dev/null 2>&1 && lsof -nP -iTCP:"$PORT" -sTCP:LISTEN >/dev/null 2>&1; do
  PORT=$((PORT + 1))
  if [ "$PORT" -gt 8099 ]; then
    echo "Could not find a free port (8080–8099 are busy)."
    read -r -p "Press Return to close…"
    exit 1
  fi
done

URL="http://127.0.0.1:${PORT}/"
echo
echo "  Bubble Frame is running."
echo "  Leave this window open."
echo
echo "  $URL"
echo
echo "  Close this window when you are done."
echo

(sleep 1; open "$URL") &
exec python3 -m http.server "$PORT" --bind 127.0.0.1
