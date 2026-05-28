#!/usr/bin/env node
// Runs database migrations. Loads .env, then requires DATABASE_URL to be set.
require("dotenv").config();

const { Client } = require("pg");
const { requireEnv, mask } = require("../lib/env");

async function main() {
  const databaseUrl = requireEnv("DATABASE_URL");
  console.log(`→ Connecting to database ${mask(databaseUrl)}`);

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  console.log("→ Applying migrations...");
  await client.query(`
    CREATE TABLE IF NOT EXISTS products (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  await client.end();
  console.log("✓ Migrations complete.");
}

main().catch((err) => {
  console.error(`✗ Migration failed: ${err.message}`);
  process.exit(1);
});
