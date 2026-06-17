import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow larger file uploads through server actions (creatives can be a few MB).
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
