#!/usr/bin/env bash
# Build the Docker image, passing public build-time config from the current shell.
# Export NEXT_PUBLIC_APP_URL and NEXT_PUBLIC_STRIPE_KEY before running, e.g.:
#   set -a; source .env; set +a; ./build.sh
set -euo pipefail

: "${NEXT_PUBLIC_APP_URL:?Set NEXT_PUBLIC_APP_URL in your environment}"
: "${NEXT_PUBLIC_STRIPE_KEY:?Set NEXT_PUBLIC_STRIPE_KEY in your environment}"

docker build \
  --build-arg NEXT_PUBLIC_APP_URL \
  --build-arg NEXT_PUBLIC_STRIPE_KEY \
  -t shutup-demo .

echo "✓ Built image: shutup-demo"
