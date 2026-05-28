/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emit a self-contained server build so the Docker runtime stage stays small.
  output: "standalone",
};

module.exports = nextConfig;
