#!/usr/bin/env bash
set -euo pipefail

# Deploy to Vercel
# Usage: bash scripts/deploy.sh

VERCEL_TOKEN="${VERCEL_TOKEN:-}"
if [ -z "$VERCEL_TOKEN" ]; then
  echo "ERROR: VERCEL_TOKEN not set"
  echo "Usage: VERCEL_TOKEN=<token> bash scripts/deploy.sh"
  exit 1
fi

echo "→ Deploying to Vercel..."
cd "$(dirname "$0")/.."

npx vercel deploy \
  --token="$VERCEL_TOKEN" \
  --prod \
  --yes \
  --archive=tgz \
  .

echo "✓ Done! View at: https://flake-mu.vercel.app"