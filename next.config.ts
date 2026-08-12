import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.db2.pl",
        pathname: "/img/projects/**",
      },
    ],
  },

  async redirects() {
    return [
      {
        source: "/privacy-policy",
        destination: "/demo",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "/demo",
        permanent: false,
      },
      {
        source: "/en/privacy-policy",
        destination: "/en/demo",
        permanent: false,
      },
      {
        source: "/en/terms",
        destination: "/en/demo",
        permanent: false,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/en",
        destination: "/?lang=en",
      },
      {
        source: "/en/office",
        destination: "/office?lang=en",
      },
      {
        source: "/en/demo",
        destination: "/demo?lang=en",
      },
      {
        source: "/en/:slug",
        destination: "/:slug?lang=en",
      },
    ];
  },
};

export default nextConfig;