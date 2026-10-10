import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/services", destination: "/treatments", permanent: true },
      { source: "/services/:slug", destination: "/treatments/:slug", permanent: true },
      { source: "/treatments/deep-tissue-massage", destination: "/massage-treatments/deep-tissue-massage", permanent: true },
      { source: "/treatments/aromatherapy-massage", destination: "/massage-treatments/aromatherapy-massage", permanent: true },
      { source: "/treatments/remedial-massage", destination: "/massage-treatments/remedial-massage", permanent: true },
      { source: "/treatments/indian-head-massage", destination: "/massage-treatments/indian-head-massage", permanent: true },
      { source: "/treatments/heat-therapy-massage", destination: "/massage-treatments/heat-therapy-massage", permanent: true },
      { source: "/treatments/hot-stone-massage", destination: "/massage-treatments/hot-stone-massage", permanent: true },
      { source: "/treatments/warm-bamboo-massage", destination: "/massage-treatments/warm-bamboo-massage", permanent: true },
      { source: "/treatments/aqua-massage", destination: "/massage-treatments/aqua-massage", permanent: true },
      { source: "/treatments/lomi-lomi-massage", destination: "/massage-treatments/lomi-lomi-massage", permanent: true },
      { source: "/treatments/reflexology", destination: "/reflexology", permanent: true },
      { source: "/treatments/pregnancy-massage", destination: "/womens-wellbeing/pregnancy-massage", permanent: true },
      { source: "/book", destination: "/booking", permanent: true },
      { source: "/portal", destination: "/portal/login", permanent: true },
      { source: "/testimonials", destination: "/reviews", permanent: true },
    ];
  },
};

export default nextConfig;
