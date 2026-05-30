#!/usr/bin/env bash
set -euo pipefail

# Deploy to Vercel manually
# Usage: bash scripts/deploy.sh

VERCEL_TOKEN="${VERCEL_TOKEN:-}"
if [ -z "$VERCEL_TOKEN" ]; then
  echo "ERROR: VERCEL_TOKEN not set"
  echo "Usage: VERCEL_TOKEN=<token> bash scripts/deploy.sh"
  exit 1
fi

echo "→ Deploying to Vercel..."

vercel deploy \
  --token="$VERCEL_TOKEN" \
  --prod \
  --archive=tgz \
  --yes \
  --env NODE_VERSION=24 \
  .

echo "✓ Deployment triggered!"
echo "  View at: https://flake-mu.vercel.app"