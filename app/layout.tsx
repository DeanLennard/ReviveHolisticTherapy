import type { Metadata } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";

import { Analytics } from "@/components/analytics";
import { CookieConsent } from "@/components/cookie-consent";
import { SchemaScript } from "@/components/schema-script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({
  title: "Massage Therapy in Cannock | Revive Holistic Therapies",
  description:
    "Modern massage and holistic therapy clinic in Cannock offering personalised treatments, online booking, client portal access, and trusted local care.",
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: site.name,
      url: site.domain,
      telephone: site.phone,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Littleworth Hill",
        addressLocality: "Hednesford",
        addressRegion: "Staffordshire",
        postalCode: "WS12 1NS",
        addressCountry: "GB",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.domain,
    },
  ];

  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <div className="min-h-screen bg-[color:var(--color-background)] text-[color:var(--color-text)]">
          <SchemaScript data={schema} />
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <SiteHeader />
          <main id="main-content">{children}</main>
          <SiteFooter />
          <CookieConsent />
          <Analytics />
        </div>
      </body>
    </html>
  );
}
