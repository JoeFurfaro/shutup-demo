// Single chokepoint for required environment variables.
// If a var is missing we fail loudly rather than limping along with `undefined`.

function requireEnv(name) {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in your shell or .env file before running this command.`
    );
  }
  return value;
}

// Mask a secret-ish value for safe logging (keep a short suffix for sanity checks).
function mask(value) {
  if (!value) return "(unset)";
  if (value.length <= 6) return "****";
  return `****${value.slice(-4)}`;
}

module.exports = { requireEnv, mask };
