"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { HeroSlide } from "@/lib/site-data";

type HeroCarouselProps = {
  slides: HeroSlide[];
  heading?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  trustLine?: string;
};

export function HeroCarousel({
  slides,
  heading,
  description,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  trustLine,
}: HeroCarouselProps) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [isPaused, slides.length]);

  const active = slides[index];
  const heroHeading = heading ?? active.title;
  const heroDescription = description ?? active.subtitle;
  const heroPrimaryText = primaryCtaText ?? active.primaryCtaText;
  const heroPrimaryLink = primaryCtaLink ?? active.primaryCtaLink;
  const heroSecondaryText = secondaryCtaText ?? active.secondaryCtaText;
  const heroSecondaryLink = secondaryCtaLink ?? active.secondaryCtaLink;

  return (
    <section
      aria-label="Featured highlights"
      aria-roledescription="carousel"
      className="surface-card-strong soft-grid relative overflow-hidden rounded-[2.4rem] px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-12"
    >
      <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(180deg,rgba(217,238,240,0.85),rgba(217,238,240,0))]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.2fr_0.72fr] lg:items-end">
        <div className="max-w-4xl">
          <span className="eyebrow">{active.eyebrow}</span>
          <h1 className="mt-6 max-w-4xl font-display text-4xl font-semibold leading-[1.04] text-[color:var(--color-heading)] sm:text-5xl lg:text-[4.3rem]">
            {heroHeading}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--color-text-muted)]">{heroDescription}</p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link
              href={heroPrimaryLink}
              className="rounded-full bg-[color:var(--color-accent)] px-6 py-3 text-center font-semibold text-white shadow-[0_24px_45px_-28px_rgba(13,51,113,0.75)] transition hover:-translate-y-0.5 hover:bg-[color:var(--color-accent-strong)]"
            >
              {heroPrimaryText}
            </Link>
            <Link
              href={heroSecondaryLink}
              className="rounded-full border border-[color:var(--color-border)] bg-white px-6 py-3 text-center font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)]"
            >
              {heroSecondaryText}
            </Link>
          </div>
          {trustLine ? <p className="mt-5 text-sm font-semibold text-[color:var(--color-accent)]">{trustLine}</p> : null}

          <div className="mt-10 grid gap-4 border-t border-[color:var(--color-hairline)] pt-6 sm:grid-cols-3">
            {[
              ["Local focus", "Cannock and Hednesford"],
              ["Booking journey", "Fast, direct, and clear"],
              ["Care style", "Professional and personalised"],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">{label}</p>
                <p className="mt-2 text-base font-semibold text-[color:var(--color-heading)]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Featured highlights</p>
            <button
              type="button"
              className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]"
              aria-pressed={isPaused}
              onClick={() => setIsPaused((value) => !value)}
            >
              {isPaused ? "Resume rotation" : "Pause rotation"}
            </button>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-[linear-gradient(180deg,#f8fbfb_0%,#eef5f5_100%)]">
            {active.imageUrl ? (
              <div className="relative h-44 w-full">
                <Image
                  src={active.imageUrl}
                  alt={active.imageAlt ?? active.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 28rem"
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-44 w-full bg-[linear-gradient(135deg,#dceff1_0%,#f7fbfb_100%)]" aria-hidden="true" />
            )}
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Current focus</p>
              <p className="mt-4 font-display text-2xl font-semibold text-[color:var(--color-heading)]" aria-live="polite">
                {active.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-[color:var(--color-text-muted)]">{active.subtitle}</p>
            </div>
          </div>

          <div className="grid gap-3">
            {slides.map((slide, slideIndex) => (
              <button
                key={slide.id}
                type="button"
                className={`rounded-[1.5rem] border px-5 py-4 text-left transition ${
                  slideIndex === index
                    ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent-soft)]/65"
                    : "border-[color:var(--color-border)] bg-white hover:bg-[color:var(--color-surface)]"
                }`}
              aria-label={`Show slide ${slideIndex + 1}: ${slide.eyebrow}`}
              aria-current={slideIndex === index ? "true" : undefined}
              onClick={() => setIndex(slideIndex)}
            >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-text-muted)]">Explore</p>
                <p className="mt-2 font-semibold text-[color:var(--color-heading)]">{slide.eyebrow}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
