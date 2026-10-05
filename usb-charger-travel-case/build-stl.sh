#!/usr/bin/env bash
set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$DIR"
openscad -D 'part="base"' -o photive-travel-case-base.stl photive-travel-case.scad
openscad -D 'part="lid"' -o photive-travel-case-lid.stl photive-travel-case.scad
echo "Wrote photive-travel-case-base.stl and photive-travel-case-lid.stl"
