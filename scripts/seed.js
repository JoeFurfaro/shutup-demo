#!/usr/bin/env node
// Seeds demo data. Requires DATABASE_URL and STRIPE_SECRET_KEY in the shell —
// products are created locally and registered with Stripe.

const { Client } = require("pg");
const Stripe = require("stripe");
const { requireEnv, mask } = require("../lib/env");

const PRODUCTS = [
  { name: "Hoodie", priceCents: 5500 },
  { name: "Sticker pack", priceCents: 800 },
  { name: "Mug", priceCents: 1500 },
];

async function main() {
  const databaseUrl = requireEnv("DATABASE_URL");
  const stripeSecretKey = requireEnv("STRIPE_SECRET_KEY");

  console.log(`→ Database: ${mask(databaseUrl)}`);
  console.log(`→ Stripe:   ${mask(stripeSecretKey)}`);

  const stripe = new Stripe(stripeSecretKey);
  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  for (const product of PRODUCTS) {
    await client.query(
      "INSERT INTO products (name, price_cents) VALUES ($1, $2)",
      [product.name, product.priceCents]
    );
    await stripe.products.create({
      name: product.name,
      default_price_data: { currency: "usd", unit_amount: product.priceCents },
    });
    console.log(`  + ${product.name}`);
  }

  await client.end();
  console.log("✓ Seed complete.");
}

main().catch((err) => {
  console.error(`✗ Seed failed: ${err.message}`);
  process.exit(1);
});
