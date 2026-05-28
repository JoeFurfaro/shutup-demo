import { requireEnv, mask } from "../../../lib/env";

// This route depends on real secrets being present in the runtime environment.
// Without them it returns 500 — demonstrating the app's hard env dependency.
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const databaseUrl = requireEnv("DATABASE_URL");
    const stripeSecretKey = requireEnv("STRIPE_SECRET_KEY");
    requireEnv("NEXTAUTH_SECRET");

    return Response.json({
      status: "ok",
      database: mask(databaseUrl),
      stripe: mask(stripeSecretKey),
      appUrl: process.env.NEXT_PUBLIC_APP_URL || null,
    });
  } catch (err) {
    return Response.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
