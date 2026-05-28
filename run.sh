#!/usr/bin/env bash
# Run the container, injecting secrets at runtime via -e (never baked into the image).
# Export the required vars first, e.g.:
#   set -a; source .env; set +a; ./run.sh
set -euo pipefail

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
