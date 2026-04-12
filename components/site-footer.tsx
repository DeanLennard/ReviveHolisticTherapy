import Link from "next/link";

import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { getSiteSettings } from "@/lib/content";
import { site } from "@/lib/site-data";

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const footerCta = settings?.footerCta;
  const whatsappNumber = settings?.contactOptions?.whatsappNumber || site.phone;
  const whatsappEnabled = settings?.contactOptions?.whatsappEnabled ?? true;

  return (
    <footer className="mt-28 border-t border-[color:var(--color-hairline)] bg-[linear-gradient(180deg,#203035_0%,#18262a_100%)] text-white">
      {footerCta?.title ? (
        <div className="border-b border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="font-display text-2xl font-semibold">{footerCta.title}</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{footerCta.body}</p>
            </div>
            <Link href={footerCta.buttonLink} className="rounded-full bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
              {footerCta.buttonText}
            </Link>
          </div>
        </div>
      ) : null}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div className="space-y-6">
          <div>
            <p className="font-display text-3xl font-semibold">{site.name}</p>
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/70">
              Professional massage therapy and holistic treatments for clients in Cannock, Hednesford, and surrounding Staffordshire areas.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-sm text-white/78">
            {site.address.map((line) => (
              <p key={line}>{line}</p>
            ))}
            <p className="mt-4">{site.phone}</p>
            <p>{site.email}</p>
          </div>
        </div>

        <div>
          <p className="font-display text-lg font-semibold">Opening hours</p>
          <div className="mt-5 space-y-3 text-sm text-white/76">
            {site.openingHours.map((row) => (
              <div key={row.day} className="flex items-center justify-between gap-6 border-b border-white/8 pb-3">
                <span>{row.day}</span>
                <span>{row.hours}</span>
              </div>
            ))}
          </div>
        </div>

        <nav aria-label="Footer" className="block">
          <p className="font-display text-lg font-semibold">Quick links</p>
          <div className="mt-5 flex flex-col gap-3 text-sm text-white/76">
            <Link href="/booking" className="transition hover:text-white">
              Book now
            </Link>
            {site.utilityNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton className="text-left transition hover:text-white" />
            {whatsappEnabled ? (
              <a
                href={`https://wa.me/${whatsappNumber.replace(/\D+/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-white"
              >
                WhatsApp
              </a>
            ) : null}
            <Link href="/contact" className="transition hover:text-white">
              Contact
            </Link>
          </div>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-white/58 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>Serving Cannock, Hednesford, and surrounding areas.</p>
          <p>
            &copy; 2026 {site.name} |{" "}
            <a href="https://www.deanlennard.com" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
              Built By Dean Lennard
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
