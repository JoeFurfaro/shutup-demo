#!/usr/bin/env bash
# Run the container, injecting secrets at runtime via -e (never baked into the image).
set -euo pipefail

# Load .env if present (local dev); in CI/prod the vars are already in the env.
[ -f .env ] && { set -a; . ./.env; set +a; }

: "${DATABASE_URL:?Set DATABASE_URL in your environment}"
: "${STRIPE_SECRET_KEY:?Set STRIPE_SECRET_KEY in your environment}"
: "${NEXTAUTH_SECRET:?Set NEXTAUTH_SECRET in your environment}"

PORT="${PORT:-3000}"

docker run --rm \
  -p "${PORT}:3000" \
  -e DATABASE_URL \
  -e STRIPE_SECRET_KEY \
  -e NEXTAUTH_SECRET \
  -e NEXT_PUBLIC_APP_URL \
  -e NEXT_PUBLIC_STRIPE_KEY \
  shutup-demo
