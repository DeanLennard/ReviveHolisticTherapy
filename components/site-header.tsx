"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { site } from "@/lib/site-data";
import { lomiLomiMassageIsAvailable } from "@/lib/service-availability";

type MegaLink = {
  href: string;
  label: string;
  badge?: string;
};

type MegaGroup = {
  title: string;
  href?: string;
  links: MegaLink[];
};

type MegaItem = {
  href: string;
  label: string;
  groups?: MegaGroup[];
};

const megaNav: MegaItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/massage-treatments",
    label: "Massage",
    groups: [
      {
        title: "Core Massage",
        href: "/massage-treatments",
        links: [
          { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage", badge: "Featured" },
          { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
          { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
          { href: "/massage-treatments/indian-head-massage", label: "Indian Head Massage" },
        ],
      },
      {
        title: "Heat Therapy",
        href: "/massage-treatments/heat-therapy-massage",
        links: [
          { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
          { href: "/massage-treatments/hot-stone-massage", label: "Hot Stone Massage" },
          { href: "/massage-treatments/warm-bamboo-massage", label: "Warm Bamboo Massage" },
          { href: "/massage-treatments/aqua-massage", label: "Aqua Massage" },
          ...(lomiLomiMassageIsAvailable
            ? [{ href: "/massage-treatments/lomi-lomi-massage", label: "Lomi Lomi Massage" }]
            : []),
        ],
      },
      {
        title: "Specialised",
        href: "/reflexology",
        links: [{ href: "/reflexology", label: "Reflexology" }],
      },
    ],
  },
  {
    href: "/facials",
    label: "Facials",
    groups: [
      {
        title: "Facial Treatments",
        href: "/facials",
        links: [
          { href: "/facials/recharge-facial", label: "Recharge Facial", badge: "Featured" },
          { href: "/facials/gua-sha-facial", label: "Gua Sha Facial" },
          { href: "/facials/rose-facial", label: "Rose Facial" },
          { href: "/facials/neroli-facial", label: "Neroli Facial" },
          { href: "/facials/mini-facial", label: "Mini Facial" },
          { href: "/facials/facial-reflexology", label: "Facial Reflexology", badge: "New" },
        ],
      },
    ],
  },
  {
    href: "/womens-wellbeing",
    label: "Wellbeing",
    groups: [
      {
        title: "Women's Wellbeing",
        href: "/womens-wellbeing",
        links: [
          { href: "/womens-wellbeing/pregnancy-massage", label: "Pregnancy Massage" },
          { href: "/womens-wellbeing/peri-menopause-massage", label: "Peri / Menopause Massage" },
          { href: "/womens-wellbeing/oncology-massage", label: "Oncology Massage" },
        ],
      },
      {
        title: "Men's Wellbeing",
        href: "/mens-wellbeing",
        links: [
          { href: "/mens-wellbeing/de-stress-body-massage", label: "De-Stress Body Massage", badge: "Featured" },
          { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue (Men's)" },
          { href: "/mens-wellbeing/recharge-facial", label: "Recharge Facial (Men's)" },
          { href: "/mens-wellbeing/andropause-treatment", label: "Andropause Treatment" },
        ],
      },
      {
        title: "Holistic Therapies",
        href: "/holistic-therapies",
        links: [
          { href: "/womens-wellbeing/reiki", label: "Reiki" },
          { href: "/holistic-therapies/crystal-therapy", label: "Crystal Therapy" },
          { href: "/holistic-therapies/hopi-ear-candles", label: "Hopi Ear Candles" },
          { href: "/holistic-therapies/auriculotherapy", label: "Auriculotherapy", badge: "New" },
          { href: "/holistic-therapies/acupuncture", label: "Acupuncture", badge: "Coming soon" },
        ],
      },
    ],
  },
  { href: "/price-list", label: "Price List" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function getPanelWidth(groupCount: number) {
  if (groupCount <= 1) {
    return "w-[26rem]";
  }

  if (groupCount === 2) {
    return "w-[46rem]";
  }

  return "w-[68rem]";
}

function Chevron({ open }: { open?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 7.5 10 12l4.5-4.5" />
    </svg>
  );
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const whatsappHref = `https://wa.me/${site.whatsappNumber.replace(/\D+/g, "")}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-hairline)] bg-white/92 backdrop-blur-xl">
      <div className="border-b border-[color:var(--color-hairline)] bg-white/72">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 text-sm text-[color:var(--color-text-muted)] sm:px-6 lg:flex-row lg:flex-nowrap lg:items-start lg:justify-between lg:gap-6 lg:px-8">
          <p className="hidden min-w-0 max-w-[30rem] flex-1 leading-6 lg:block xl:max-w-[42rem]">{site.businessSummary}</p>
          <div className="flex shrink-0 flex-wrap items-center gap-3 lg:flex-nowrap lg:justify-end">
            <Link
              className="hidden rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_18px_36px_-24px_rgba(13,51,113,0.75)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)] lg:inline-flex"
              href="/portal/login"
            >
              Portal
            </Link>
            <a
              className="inline-flex rounded-full bg-[#25d366] px-4 py-2 text-sm font-semibold !text-white shadow-[0_18px_36px_-24px_rgba(37,211,102,0.7)] transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a className="whitespace-nowrap transition hover:text-[color:var(--color-accent)]" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
              {site.phone}
            </a>
            <a
              className="hidden whitespace-nowrap transition hover:text-[color:var(--color-accent)] sm:inline"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 text-[color:var(--color-heading)]" onClick={() => setIsOpen(false)}>
          <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-[1.35rem] border border-[color:var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#edf5f5_100%)] shadow-[0_18px_35px_-28px_rgba(31,42,46,0.3)]">
            <Image
              src="/icon.png?v=20261010"
              alt="Revive Holistic Therapies icon"
              width={52}
              height={52}
              className="h-full w-full object-cover"
              priority
            />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold leading-none">Revive Holistic Therapies</span>
            <span className="mt-1 block text-sm text-[color:var(--color-text-muted)]">
              Hednesford clinic serving Cannock and surrounding areas
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 lg:flex">
          {megaNav.map((item) =>
            item.groups?.length ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(item.label)}
                onMouseLeave={() => setOpenDesktopMenu((current) => (current === item.label ? null : current))}
              >
                <Link
                  href={item.href}
                  className={`inline-flex items-center gap-2 text-sm font-semibold tracking-[0.02em] transition ${
                    openDesktopMenu === item.label
                      ? "text-[color:var(--color-accent)]"
                      : "text-[color:var(--color-heading)] hover:text-[color:var(--color-accent)]"
                  }`}
                  onFocus={() => setOpenDesktopMenu(item.label)}
                >
                  {item.label}
                  <Chevron open={openDesktopMenu === item.label} />
                </Link>

                {openDesktopMenu === item.label ? (
                  <div
                    className={`absolute left-1/2 top-full z-30 -translate-x-1/2 pt-4 ${getPanelWidth(item.groups.length)} max-w-[calc(100vw-4rem)]`}
                  >
                    <div className="pointer-events-none absolute inset-x-0 -top-4 h-4" />
                    <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white/98 p-4 shadow-[0_40px_90px_-48px_rgba(17,30,33,0.5)] backdrop-blur-xl">
                      <div
                        className="grid gap-4"
                        style={{ gridTemplateColumns: `repeat(${item.groups.length}, minmax(0, 1fr))` }}
                      >
                        {item.groups.map((group) => (
                          <div
                            key={group.title}
                            className="rounded-[1.5rem] border border-[color:var(--color-hairline)] bg-[linear-gradient(180deg,#ffffff_0%,#f7f9f9_100%)] p-5"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                {group.href ? (
                                  <Link
                                    href={group.href}
                                    className="text-base font-semibold text-[color:var(--color-heading)] transition hover:text-[color:var(--color-accent)]"
                                    onClick={() => setOpenDesktopMenu(null)}
                                  >
                                    {group.title}
                                  </Link>
                                ) : (
                                  <p className="text-base font-semibold text-[color:var(--color-heading)]">{group.title}</p>
                                )}
                                <div className="mt-2 h-px w-10 bg-[color:var(--color-accent)]/35" />
                              </div>
                            </div>

                            <div className="mt-5 space-y-1.5">
                              {group.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="flex items-center justify-between gap-3 rounded-[1rem] px-3 py-2.5 text-sm font-medium text-[color:var(--color-heading)] transition hover:bg-[color:var(--color-surface)] hover:text-[color:var(--color-accent)]"
                                  onClick={() => setOpenDesktopMenu(null)}
                                >
                                  <span>{link.label}</span>
                                  {link.badge ? (
                                    <span className="rounded-full bg-[color:var(--color-accent)]/12 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                                      {link.badge}
                                    </span>
                                  ) : null}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold tracking-[0.02em] text-[color:var(--color-heading)] transition hover:text-[color:var(--color-accent)]"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/booking"
            className="rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_24px_45px_-28px_rgba(13,51,113,0.8)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)]"
          >
            Book Now
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex rounded-full border border-[color:var(--color-border)] p-3 text-[color:var(--color-heading)] lg:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle navigation"
          aria-controls="mobile-navigation"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex h-4 w-5 flex-col justify-between">
            <span className="block h-0.5 rounded-full bg-current" />
            <span className="block h-0.5 rounded-full bg-current" />
            <span className="block h-0.5 rounded-full bg-current" />
          </span>
        </button>
      </div>

      {isOpen ? (
        <div id="mobile-navigation" className="border-t border-[color:var(--color-hairline)] bg-white px-4 py-4 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">
            {megaNav.map((item) =>
              item.groups?.length ? (
                <div key={item.label} className="overflow-hidden rounded-[1.4rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-[color:var(--color-heading)]"
                    aria-expanded={openMobileSection === item.label}
                    onClick={() =>
                      setOpenMobileSection((current) => (current === item.label ? null : item.label))
                    }
                  >
                    <span>{item.label}</span>
                    <Chevron open={openMobileSection === item.label} />
                  </button>

                  {openMobileSection === item.label ? (
                    <div className="border-t border-[color:var(--color-border)] px-3 py-3">
                      <Link
                        href={item.href}
                        className="mb-3 block rounded-[1rem] bg-white px-3 py-2.5 text-sm font-semibold text-[color:var(--color-heading)]"
                        onClick={() => setIsOpen(false)}
                      >
                        View all {item.label}
                      </Link>

                      <div className="space-y-3">
                        {item.groups.map((group) => (
                          <div key={group.title} className="rounded-[1.1rem] bg-white p-3">
                            <div className="flex items-center justify-between gap-3">
                              {group.href ? (
                                <Link
                                  href={group.href}
                                  className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent)]"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {group.title}
                                </Link>
                              ) : (
                                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent)]">
                                  {group.title}
                                </p>
                              )}
                            </div>

                            <div className="mt-3 space-y-1">
                              {group.links.map((link) => (
                                <Link
                                  key={link.href}
                                  href={link.href}
                                  className="flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm text-[color:var(--color-heading)] transition hover:bg-[color:var(--color-surface)] hover:text-[color:var(--color-accent)]"
                                  onClick={() => setIsOpen(false)}
                                >
                                  <span>{link.label}</span>
                                  {link.badge ? (
                                    <span className="rounded-full bg-[color:var(--color-accent)]/12 px-2 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
                                      {link.badge}
                                    </span>
                                  ) : null}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 font-medium text-[color:var(--color-heading)] transition hover:bg-[color:var(--color-surface)]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ),
            )}

            <div className="mt-3 rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-2">
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
                Useful links
              </p>
              {site.utilityNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-xl px-3 py-2 text-sm text-[color:var(--color-heading)] transition hover:bg-white hover:text-[color:var(--color-accent)]"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl px-4 py-3 font-medium text-[color:var(--color-heading)] transition hover:bg-[color:var(--color-surface)]"
              onClick={() => setIsOpen(false)}
            >
              WhatsApp
            </a>

            <Link
              href="/booking"
              className="mt-2 rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-center font-semibold text-white"
              onClick={() => setIsOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
