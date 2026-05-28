export default function Home() {
  // NEXT_PUBLIC_* vars are inlined at build time and safe to render.
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "(not set)";
  const stripeKeySet = Boolean(process.env.NEXT_PUBLIC_STRIPE_KEY);

  return (
    <main>
      <h1>shutup demo storefront</h1>
      <p>A minimal Next.js app that reads its config from the environment.</p>

      <ul>
        <li>
          <strong>App URL:</strong> {appUrl}
        </li>
        <li>
          <strong>Stripe publishable key:</strong>{" "}
          {stripeKeySet ? "configured" : "missing"}
        </li>
      </ul>

      <p>
        Check service health (requires secrets in the environment):{" "}
        <a href="/api/health">/api/health</a>
      </p>
    </main>
  );
}
