import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Auriculotherapy Cannock | Revive Holistic Therapies",
  description: "Auriculotherapy with ear-seed pressure points at Revive Holistic Therapies in Cannock. Enquire for availability and treatment details.",
  path: "/holistic-therapies/auriculotherapy",
});

export default function AuriculotherapyPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Holistic Therapies", href: "/holistic-therapies" }, { label: "Auriculotherapy" }]} />
      <PageHero
        eyebrow="Auriculotherapy"
        title="Auriculotherapy with Ear Seeds in Cannock"
        description="A focused holistic treatment using gentle ear pressure points and optional ear seeds as part of a tailored wellbeing experience."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/contact" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Enquire about auriculotherapy
        </Link>
        <Link href="/holistic-therapies" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Explore holistic therapies
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-2">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What to expect"
            title="A tailored, gentle approach"
            description="Your appointment begins with a conversation about what you would like from your treatment, followed by a calm and carefully tailored session."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Ear seeds may be used to apply light, sustained pressure to selected points after the treatment, with clear aftercare guidance provided.
          </p>
        </div>
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Important"
            title="Treatment suitability"
            description="Auriculotherapy is a complementary wellbeing treatment and is not a replacement for medical advice, diagnosis or treatment."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We will discuss suitability with you before an appointment and can answer any questions you have before booking.
          </p>
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
