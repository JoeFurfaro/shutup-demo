# shutup-demo

A tiny Next.js (App Router) storefront. It's deliberately ordinary: it reads its
configuration and secrets from the environment, the way most apps do. There's a
home page, a health-check API route, and a couple of database scripts.

## Environment

Copy the example file and fill in values:

```sh
cp .env.example .env
```

| Variable                 | Public? | Used by                          |
| ------------------------ | ------- | -------------------------------- |
| `PORT`                   | yes     | dev/start scripts                |
| `NODE_ENV`               | yes     | Next.js, scripts                 |
| `NEXT_PUBLIC_APP_URL`    | yes     | home page, Docker build          |
| `NEXT_PUBLIC_STRIPE_KEY` | yes     | home page, Docker build          |
| `DATABASE_URL`           | secret  | `/api/health`, migrate, seed     |
| `STRIPE_SECRET_KEY`      | secret  | `/api/health`, seed              |
| `NEXTAUTH_SECRET`        | secret  | `/api/health`                    |

`NEXT_PUBLIC_*` values are inlined into the browser bundle at build time. The
secrets are read at runtime and the app fails loudly if they're missing.

## Develop

```sh
npm install
set -a; source .env; set +a    # load env into your shell
npm run dev                    # http://localhost:${PORT:-3000}
```

Visit `/api/health` to confirm the secrets are wired up.

## Database scripts

These require the relevant secrets to be present in your shell:

```sh
npm run migrate   # needs DATABASE_URL
npm run seed      # needs DATABASE_URL + STRIPE_SECRET_KEY
```

## Docker

```sh
set -a; source .env; set +a    # export config + secrets

npm run docker:build           # ./build.sh — bakes NEXT_PUBLIC_* at build time
npm run docker:run             # ./run.sh   — injects secrets via -e at run time
```

Public config is passed as build args; secrets are passed to `docker run` so they
land in the container's runtime environment rather than in image layers.
