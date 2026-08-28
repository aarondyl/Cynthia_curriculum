import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The curriculum is fully client-side, so emit deployable HTML instead of a
  // Cloudflare Worker server bundle. Vercel can serve the generated client
  // directory directly.
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
