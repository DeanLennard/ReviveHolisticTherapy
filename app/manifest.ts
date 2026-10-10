import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Revive Holistic Therapies",
    short_name: "Revive",
    description: "Massage and holistic therapy in Cannock and Hednesford.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0D3371",
    icons: [
      {
        src: "/icon.png?v=20261010",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
