import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // Or 'https' if your API uses HTTPS
        hostname: "api.portify.test",
        port: "", // Leave empty if default ports (80 for http, 443 for https)
        pathname: "**", // Or a more specific path if needed, e.g., '/user-uploads/**'
      },
    ],
  },
};

export default nextConfig;
