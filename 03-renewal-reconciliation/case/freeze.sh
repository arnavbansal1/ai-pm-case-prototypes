#!/usr/bin/env bash
# Usage: ./freeze.sh <dir> <file>...   Freeze files before any model run.
set -euo pipefail
dir="$1"; shift; cd "$dir"
chmod 444 "$@"
[ -f FROZEN.sha256 ] && chmod 644 FROZEN.sha256
{ sha256sum "$@"; echo "frozen $(date -u +%Y-%m-%dT%H:%M:%SZ) before any model run"; } >> FROZEN.sha256
chmod 444 FROZEN.sha256
[ -d .git ] || git init -q
git -c user.email=claude@local -c user.name=Claude add -A
git -c user.email=claude@local -c user.name=Claude commit -qm "Freeze: $*"
git log --oneline | head -3; cat FROZEN.sha256
