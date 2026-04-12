"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { site } from "@/lib/site-data";

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-hairline)] bg-white/90 backdrop-blur-xl">
      <div className="border-b border-[color:var(--color-hairline)] bg-white/72">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 text-sm text-[color:var(--color-text-muted)] sm:px-6 lg:px-8">
          <p className="hidden max-w-3xl lg:block">{site.businessSummary}</p>
          <div className="flex items-center gap-5">
            <Link className="hidden transition hover:text-[color:var(--color-accent)] lg:inline-flex" href="/portal/login">
              Customer Portal
            </Link>
            <a
              className="transition hover:text-[color:var(--color-accent)]"
              href={`https://wa.me/${site.phone.replace(/\D+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp
            </a>
            <a className="transition hover:text-[color:var(--color-accent)]" href={`tel:${site.phone.replace(/\s+/g, "")}`}>
              {site.phone}
            </a>
            <a className="transition hover:text-[color:var(--color-accent)]" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-4 text-[color:var(--color-heading)]">
          <span className="flex h-[3.25rem] w-[3.25rem] items-center justify-center overflow-hidden rounded-[1.35rem] border border-[color:var(--color-border)] bg-[linear-gradient(180deg,#ffffff_0%,#edf5f5_100%)] shadow-[0_18px_35px_-28px_rgba(31,42,46,0.3)]">
            <Image src="/icon.png" alt="Revive Holistic Therapies icon" width={52} height={52} className="h-full w-full object-cover" priority />
          </span>
          <span>
            <span className="block font-display text-xl font-semibold leading-none">Revive Holistic Therapies</span>
            <span className="mt-1 block text-sm text-[color:var(--color-text-muted)]">Hednesford clinic serving Cannock and surrounding areas</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-5 lg:flex">
          {site.primaryNav.map((item) =>
            item.children?.length ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setOpenDesktopMenu(item.label)}
                onMouseLeave={() => setOpenDesktopMenu((current) => (current === item.label ? null : current))}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-[0.02em] text-[color:var(--color-heading)] transition hover:text-[color:var(--color-accent)]"
                  onFocus={() => setOpenDesktopMenu(item.label)}
                >
                  {item.label}
                  <span aria-hidden="true" className="text-xs">
                    ▾
                  </span>
                </Link>
                {openDesktopMenu === item.label ? (
                  <div className="absolute left-0 top-full z-20 w-72 pt-3">
                    <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-3 shadow-[0_32px_80px_-44px_rgba(17,30,33,0.45)]">
                      <div className="space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-[1rem] px-4 py-3 text-sm font-medium text-[color:var(--color-heading)] transition hover:bg-[color:var(--color-surface)] hover:text-[color:var(--color-accent)]"
                            onClick={() => setOpenDesktopMenu(null)}
                          >
                            {child.label}
                          </Link>
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
            className="rounded-full bg-[color:var(--color-accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_24px_45px_-28px_rgba(43,163,172,0.8)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)]"
          >
            Book now
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
            {site.primaryNav.map((item) =>
              item.children?.length ? (
                <details key={item.label} className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
                  <summary className="cursor-pointer list-none px-4 py-3 font-medium text-[color:var(--color-heading)]">
                    <span className="flex items-center justify-between gap-3">
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-xs">
                        ▾
                      </span>
                    </span>
                  </summary>
                  <div className="flex flex-col gap-1 px-2 pb-2">
                    <Link
                      href={item.href}
                      className="rounded-xl px-3 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:bg-white hover:text-[color:var(--color-accent)]"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="rounded-xl px-3 py-2 text-sm text-[color:var(--color-heading)] transition hover:bg-white hover:text-[color:var(--color-accent)]"
                        onClick={() => setIsOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </details>
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
              <p className="px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Useful links</p>
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
              href={`https://wa.me/${site.phone.replace(/\D+/g, "")}`}
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
              Book now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
