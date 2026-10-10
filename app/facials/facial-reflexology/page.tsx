import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Facial Reflexology Cannock | Revive Holistic Therapies",
  description: "Discover facial reflexology at Revive Holistic Therapies in Cannock. Enquire for availability and treatment details.",
  path: "/facials/facial-reflexology",
});

export default function FacialReflexologyPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Facials", href: "/facials" }, { label: "Facial Reflexology" }]} />
      <PageHero
        eyebrow="Facial Reflexology"
        title="Facial Reflexology in Cannock"
        description="A calming treatment centred on the face and head, designed to create a quiet moment of relaxation within your wellbeing routine."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/contact" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Enquire about this treatment
        </Link>
        <Link href="/facials" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Explore facials
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-2">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="A gentle treatment"
            title="A calm, restorative facial experience"
            description="Facial reflexology uses gentle, focused touch across the face and head in a quiet, comfortable setting."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is a lovely choice when you would like time to slow down, switch off and enjoy a treatment that feels nurturing and unhurried.
          </p>
        </div>
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Part of our reflexology offering"
            title="Feet, face and head"
            description="Revive offers traditional foot reflexology alongside this facial-focused treatment, so you can choose the experience that feels right for you."
          />
          <Link href="/reflexology" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            Explore foot reflexology
          </Link>
        </div>
      </section>

      <section className="mt-24 rounded-[2rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Treatment details</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08]">Coming soon</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          Treatment duration and pricing will be confirmed shortly. Please get in touch to register your interest.
        </p>
      </section>
    </div>
  );
}
