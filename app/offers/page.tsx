import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Offers | Revive Holistic Therapies",
  description: "Browse current and future promotions from Revive Holistic Therapies.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <PageHero
        eyebrow="Relax packages"
        title="Relaxation packages are coming soon"
        description="We are preparing a selection of longer, more immersive treatment packages for when you need time to relax, reset and restore."
      />
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <article className="surface-card-strong rounded-[2rem] p-8">
          <p className="eyebrow">Coming soon</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-[color:var(--color-heading)]">Relaxation packages</h2>
          <p className="mt-4 leading-8 text-[color:var(--color-text-muted)]">Combined treatments and extended appointments will be announced here once the final package options are confirmed.</p>
        </article>
        <article className="surface-card-strong rounded-[2rem] p-8">
          <p className="eyebrow">In development</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-[color:var(--color-heading)]">Body scrub treatment</h2>
          <p className="mt-4 leading-8 text-[color:var(--color-text-muted)]">A body scrub is being considered for the treatment menu. Register your interest and we will share details when confirmed.</p>
          <Link href="/contact" className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">Register your interest</Link>
        </article>
      </section>
    </div>
  );
}
