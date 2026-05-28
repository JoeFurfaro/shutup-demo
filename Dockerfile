# syntax=docker/dockerfile:1

# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

# ---- build ----
FROM node:20-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Public config must be present at BUILD time — Next.js inlines NEXT_PUBLIC_*
# values into the client bundle. These are not secret.
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_STRIPE_KEY
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_STRIPE_KEY=$NEXT_PUBLIC_STRIPE_KEY

RUN npm run build

# ---- runtime ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Standalone output bundles the server + only the deps it needs.
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000
# Secrets (DATABASE_URL, STRIPE_SECRET_KEY, NEXTAUTH_SECRET) are NOT baked into
# the image — they are supplied at `docker run` time via -e flags.
CMD ["node", "server.js"]
