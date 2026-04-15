import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ];
  },
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
