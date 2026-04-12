import type { MetadataRoute } from "next";

import { getServicesFromDb } from "@/lib/content";
import { site } from "@/lib/site-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/about",
    "/treatments",
    "/gift-vouchers",
    "/memberships",
    "/offers",
    "/blog",
    "/booking",
    "/contact",
    "/faqs",
    "/reviews",
    "/areas/cannock",
    "/areas/hednesford",
    "/portal/login",
    "/portal/account",
    "/admin",
    "/privacy-policy",
    "/cookie-policy",
    "/terms-and-conditions",
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${site.domain}${path}`,
    lastModified: "2026-04-12",
  }));

  const serviceEntries = (await getServicesFromDb()).map((service) => ({
    url: `${site.domain}/treatments/${service.slug}`,
    lastModified: "2026-04-12",
  }));

  return [...staticEntries, ...serviceEntries];
}
