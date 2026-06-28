import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Pretty embed URL: gitfut.com/<username>.png -> the card image route. The
    // username charset matches GitHub's (alphanumerics + hyphens), so this never
    // captures real static assets like /mascot.png. Returned as an afterFiles
    // rewrite (a plain array), so /public files still win over it.
    return [
      { source: "/:username([a-zA-Z0-9-]+).png", destination: "/api/card-image/:username" },
    ];
  },
};

export default nextConfig;
