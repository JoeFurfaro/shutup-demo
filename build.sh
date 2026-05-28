#!/usr/bin/env bash
# Build the Docker image, passing public build-time config through.
set -euo pipefail

# Load .env if present (local dev); in CI/prod the vars are already in the env.
[ -f .env ] && { set -a; . ./.env; set +a; }

: "${NEXT_PUBLIC_APP_URL:?Set NEXT_PUBLIC_APP_URL in your environment}"
: "${NEXT_PUBLIC_STRIPE_KEY:?Set NEXT_PUBLIC_STRIPE_KEY in your environment}"

docker build \
  --build-arg NEXT_PUBLIC_APP_URL \
  --build-arg NEXT_PUBLIC_STRIPE_KEY \
  -t shutup-demo .

echo "✓ Built image: shutup-demo"
