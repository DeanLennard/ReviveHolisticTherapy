import type { MetadataRoute } from "next";

import { site } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/portal/", "/api/", "/booking/success", "/booking/cancelled"],
    },
    sitemap: `${site.domain}/sitemap.xml`,
    host: site.domain,
  };
}
