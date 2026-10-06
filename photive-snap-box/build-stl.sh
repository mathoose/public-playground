#!/usr/bin/env bash
# Export the default printable STLs (tray, lid, USB spacer) from the live designer's CAD.
set -euo pipefail
cd "$(dirname "$0")"
node export-stl.mjs
