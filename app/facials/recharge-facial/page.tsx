import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Recharge Facial Cannock | Relaxing Facial & Massage Treatment",
  description:
    "Recharge facial in Cannock combining skincare, massage and relaxation. A refreshing treatment to revive your skin and ease tension.",
  path: "/facials/recharge-facial",
});

const suitableFor = [
  "Feel tired or run down",
  "Want to improve your skin",
  "Experience tension in the shoulders or upper body",
  "Want a relaxing treatment with added benefits",
  "Are looking for a complete treatment experience",
];

const benefits = [
  "Refreshed and revitalised skin",
  "Improved circulation",
  "Reduced tension in the upper body",
  "Improved relaxation",
  "A more balanced and refreshed feeling",
  "Time to switch off and unwind",
];

const faqItems = [
  {
    question: "What is included in a recharge facial?",
    answer:
      "It includes back exfoliation, massage, facial cleansing, mask and scalp massage.",
  },
  {
    question: "Is it relaxing or results-focused?",
    answer: "It offers both skincare benefits and relaxation.",
  },
  {
    question: "Is it suitable for all skin types?",
    answer: "Yes, it can be tailored to your skin.",
  },
];

export default function RechargeFacialPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Recharge Facial",
      description:
        "Recharge facial in Cannock combining skincare, massage and relaxation to refresh the skin and ease upper-body tension.",
      areaServed: ["Cannock", "Hednesford", "Staffordshire"],
      provider: {
        "@type": "HealthAndBeautyBusiness",
        name: "Revive Holistic Therapies",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Facials", href: "/facials" },
          { label: "Recharge Facial" },
        ]}
      />

      <PageHero
        eyebrow="Recharge Facial"
        title="Recharge Facial in Cannock for Skin and Relaxation"
        description="The recharge facial is a deeply relaxing treatment that combines skincare with massage to leave you feeling refreshed and rebalanced. At Revive Holistic Therapies in Cannock, this treatment is designed to care for your skin while also easing tension in the body. Perfect if you are feeling tired, stressed or in need of a reset, this facial offers a complete and calming experience."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/booking"
          className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
        >
          Book Recharge Facial
        </Link>
        <Link
          href="/contact"
          className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]"
        >
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is a recharge facial?"
            title="What is a recharge facial?"
            description="The recharge facial is a combined treatment that includes both facial care and massage elements."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It begins with a back exfoliation and massage using aromatherapy oils, followed by a facial treatment including cleansing, massage and a face mask.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This creates a balanced experience that supports both skin health and relaxation.
          </p>
          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
          >
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="The recharge facial is ideal if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for most skin types and can be tailored to your needs.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of the recharge facial"
            description="This treatment offers a combination of skincare and wellbeing benefits."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <Link
            href="/booking"
            className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
          >
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="Your treatment will begin with a short consultation to understand your needs and preferences."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The session starts with a back exfoliation and massage to help release tension. You will then turn over for facial cleansing, massage and a face mask.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            While the mask is applied, you will enjoy a relaxing scalp massage. The experience is calm, unhurried and designed to help you fully relax.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Recharge facial is available in 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This provides a complete and balanced treatment experience.
          </p>
          <Link
            href="/price-list"
            className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]"
          >
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for facials in Cannock?"
            description="At Revive Holistic Therapies, treatments are tailored to your needs, combining professional skincare with a relaxing experience."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that leave them feeling refreshed, relaxed and cared for.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for a relaxing facial in Cannock or Hednesford?"
            description="If you are searching for a recharge facial in Cannock, Revive Holistic Therapies offers treatments designed to refresh your skin and help you relax."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">
            Useful links
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/facials", label: "Facials" },
              { href: "/facials/gua-sha-facial", label: "Gua Sha Facial" },
              { href: "/facials/rose-facial", label: "Rose Facial" },
              { href: "/facials/neroli-facial", label: "Neroli Facial" },
              { href: "/facials/mini-facial", label: "Mini Facial" },
              { href: "/massage-treatments", label: "Massage Treatments" },
              { href: "/contact", label: "Contact" },
              { href: "/booking", label: "Booking" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">
          Recharge facial in Cannock
        </p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">
          Relax, refresh and recharge
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are ready to take time for yourself and enjoy a deeply relaxing treatment, book your recharge facial in Cannock today.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/booking"
            className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#162124]"
          >
            Book Now
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-[#c4e5e7] bg-[#345157] px-6 py-3 text-center font-semibold text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Recharge facial FAQs"
          description="A few helpful answers before you book."
        />
        <div className="mt-8 space-y-4">
          {faqItems.map((faq) => (
            <details
              key={faq.question}
              className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-white px-5 py-4"
            >
              <summary className="cursor-pointer font-semibold text-[color:var(--color-heading)]">
                {faq.question}
              </summary>
              <p className="mt-3 text-[color:var(--color-text-muted)]">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <Link
          href="/booking"
          className="block rounded-full bg-[color:var(--color-accent)] px-5 py-4 text-center font-semibold text-white shadow-[0_20px_45px_-25px_rgba(43,163,172,0.85)]"
        >
          Book Recharge Facial
        </Link>
      </div>
    </div>
  );
}
