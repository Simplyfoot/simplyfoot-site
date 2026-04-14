import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Anciennes URLs marque → /foot/...
      {
        source: "/fonctionnalites",
        destination: "/foot/fonctionnalites",
        permanent: true,
      },
      {
        source: "/offres",
        destination: "/foot/offres",
        permanent: true,
      },
      {
        source: "/gestion-club",
        destination: "/foot/gestion-club",
        permanent: true,
      },
      {
        source: "/gestion-equipe",
        destination: "/foot/gestion-equipe",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
