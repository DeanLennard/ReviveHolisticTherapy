import Image from "next/image";
import Link from "next/link";

import type { Service } from "@/lib/site-data";

const canonicalServicePaths: Record<string, string> = {
  "deep-tissue-massage": "/massage-treatments/deep-tissue-massage",
  "remedial-massage": "/massage-treatments/remedial-massage",
  "aromatherapy-massage": "/massage-treatments/aromatherapy-massage",
  "indian-head-massage": "/massage-treatments/indian-head-massage",
  "heat-therapy-massage": "/massage-treatments/heat-therapy-massage",
  "hot-stone-massage": "/massage-treatments/hot-stone-massage",
  "warm-bamboo-massage": "/massage-treatments/warm-bamboo-massage",
  "aqua-massage": "/massage-treatments/aqua-massage",
  "lomi-lomi-massage": "/massage-treatments/lomi-lomi-massage",
  reflexology: "/reflexology",
  "pregnancy-massage": "/womens-wellbeing/pregnancy-massage",
  "peri-menopause-massage": "/womens-wellbeing/peri-menopause-massage",
};

export function ServiceCard({ service }: { service: Service }) {
  const serviceHref = canonicalServicePaths[service.slug] ?? `/treatments/${service.slug}`;

  return (
    <article className="surface-card-strong group flex h-full flex-col rounded-[1.8rem] p-6">
      {service.featuredImage ? (
        <div className="mb-5 overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
          <div className="relative h-48 w-full">
            <Image
              src={service.featuredImage}
              alt={service.featuredImageAlt ?? service.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
      ) : null}
      <div className="flex items-start justify-between gap-5 border-b border-[color:var(--color-hairline)] pb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--color-accent)]">{service.category}</p>
          <h3 className="mt-3 font-display text-2xl font-semibold text-[color:var(--color-heading)]">{service.title}</h3>
        </div>
        <div className="rounded-full border border-[color:var(--color-border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-[color:var(--color-text-muted)]">
          {service.durationMinutes} min
        </div>
      </div>

      <p className="mt-6 flex-1 text-base leading-7 text-[color:var(--color-text-muted)]">{service.shortDescription}</p>

      <div className="mt-8 rounded-[1.4rem] bg-[color:var(--color-surface)] p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Pricing</p>
        <p className="mt-2 text-xl font-semibold text-[color:var(--color-heading)]">From GBP {service.price}</p>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <Link
          href={serviceHref}
          className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2.5 font-medium text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
        >
          Learn more
        </Link>
        <Link
          href="/booking"
          className="rounded-full bg-[color:var(--color-accent)] px-4 py-2.5 font-medium text-white transition hover:bg-[color:var(--color-accent-strong)]"
        >
          Book now
        </Link>
      </div>
    </article>
  );
}
