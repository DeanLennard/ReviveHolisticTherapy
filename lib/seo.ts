import type { Metadata } from "next";

import { site } from "./site-data";

type MetadataInput = {
  title: string;
  description: string;
  path?: string;
  index?: boolean;
};

export function buildMetadata({ title, description, path = "/", index = true }: MetadataInput): Metadata {
  const canonical = new URL(path, site.domain).toString();

  return {
    title,
    description,
    metadataBase: new URL(site.domain),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type: "website",
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: index ? undefined : { index: false, follow: false },
  };
}

export function jsonLdScript(data: Record<string, unknown> | Array<Record<string, unknown>>) {
  return JSON.stringify(data);
}
