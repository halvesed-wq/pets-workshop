#!/bin/bash
set -euo pipefail

# Only run in Claude Code cloud sessions
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

# Flask server dependencies, in the same app/venv the project's scripts use
if [ ! -d app/venv ]; then
  python3 -m venv app/venv
fi
app/venv/bin/pip install --quiet -r app/server/requirements.txt

# Put the venv first on PATH for the rest of the session
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export VIRTUAL_ENV=\"$PWD/app/venv\"" >> "$CLAUDE_ENV_FILE"
  echo "export PATH=\"$PWD/app/venv/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
fi

# Astro client dependencies
(cd app/client && npm install --no-audit --no-fund)
