import type { MetadataRoute } from "next";

import { getServicesFromDb } from "@/lib/content";
import { localAreaPages, site } from "@/lib/site-data";
import { isServiceAvailable, lomiLomiMassageIsAvailable } from "@/lib/service-availability";

const publicRoutes = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/treatments", changeFrequency: "weekly", priority: 0.9 },
  { path: "/massage-treatments", changeFrequency: "monthly", priority: 0.9 },
  { path: "/reflexology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials", changeFrequency: "monthly", priority: 0.8 },
  { path: "/holistic-therapies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/womens-wellbeing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mens-wellbeing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/price-list", changeFrequency: "monthly", priority: 0.8 },
  { path: "/booking", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
  { path: "/faqs", changeFrequency: "monthly", priority: 0.6 },
  { path: "/reviews", changeFrequency: "monthly", priority: 0.6 },
  { path: "/privacy-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/cookie-policy", changeFrequency: "yearly", priority: 0.2 },
  { path: "/terms-and-conditions", changeFrequency: "yearly", priority: 0.2 },
  { path: "/massage-treatments/deep-tissue-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/remedial-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/aromatherapy-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/indian-head-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/heat-therapy-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/aqua-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/hot-stone-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/massage-treatments/warm-bamboo-massage", changeFrequency: "monthly", priority: 0.8 },
  ...(lomiLomiMassageIsAvailable
    ? [{ path: "/massage-treatments/lomi-lomi-massage", changeFrequency: "monthly" as const, priority: 0.8 }]
    : []),
  { path: "/womens-wellbeing/pregnancy-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/womens-wellbeing/peri-menopause-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/womens-wellbeing/oncology-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/womens-wellbeing/reiki", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mens-wellbeing/de-stress-body-massage", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mens-wellbeing/recharge-facial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/mens-wellbeing/andropause-treatment", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials/gua-sha-facial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials/rose-facial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials/neroli-facial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials/mini-facial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials/recharge-facial", changeFrequency: "monthly", priority: 0.8 },
  { path: "/facials/facial-reflexology", changeFrequency: "monthly", priority: 0.8 },
  { path: "/holistic-therapies/crystal-therapy", changeFrequency: "monthly", priority: 0.8 },
  { path: "/holistic-therapies/hopi-ear-candles", changeFrequency: "monthly", priority: 0.8 },
  { path: "/holistic-therapies/auriculotherapy", changeFrequency: "monthly", priority: 0.8 },
] as const;

const categoryTreatmentSlugs = new Set([
  "deep-tissue-massage",
  "remedial-massage",
  "aromatherapy-massage",
  "indian-head-massage",
  "heat-therapy-massage",
  "aqua-massage",
  "hot-stone-massage",
  "warm-bamboo-massage",
  ...(lomiLomiMassageIsAvailable ? ["lomi-lomi-massage"] : []),
  "pregnancy-massage",
  "peri-menopause-massage",
  "oncology-massage",
  "reiki",
  "de-stress-body-massage",
  "recharge-facial",
  "andropause-treatment",
  "gua-sha-facial",
  "rose-facial",
  "neroli-facial",
  "mini-facial",
  "facial-reflexology",
  "crystal-therapy",
  "hopi-ear-candles",
  "auriculotherapy",
  "reflexology",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${site.domain}${path}`,
    changeFrequency,
    priority,
  }));

  const areaEntries: MetadataRoute.Sitemap = localAreaPages.map((area) => ({
    url: `${site.domain}/areas/${area.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const serviceEntries = (await getServicesFromDb())
    .filter((service) => isServiceAvailable(service.slug) && !categoryTreatmentSlugs.has(service.slug))
    .map((service) => ({
      url: `${site.domain}/treatments/${service.slug}`,
      lastModified: service.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticEntries, ...areaEntries, ...serviceEntries];
}
