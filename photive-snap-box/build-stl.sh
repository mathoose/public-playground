#!/usr/bin/env bash
# Export printable STLs from photive-snap-box.scad (OpenSCAD 2021+).
set -euo pipefail
cd "$(dirname "$0")"

OPENSCAD="${OPENSCAD:-openscad}"

echo "OpenSCAD: $($OPENSCAD --version 2>&1 | head -1)"

# Binary STL (smaller in git). Quiet except errors.
"$OPENSCAD" -q --export-format binstl -o photive-snap-box-base.stl -D 'part="base"' photive-snap-box.scad
echo "wrote photive-snap-box-base.stl  $(wc -c < photive-snap-box-base.stl) bytes"

"$OPENSCAD" -q --export-format binstl -o photive-snap-box-lid.stl -D 'part="lid"' photive-snap-box.scad
echo "wrote photive-snap-box-lid.stl   $(wc -c < photive-snap-box-lid.stl) bytes"
