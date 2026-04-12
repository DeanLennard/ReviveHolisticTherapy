import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gua Sha Facial Cannock | Lifting & Relaxing Facial Treatment",
  description:
    "Gua Sha facial in Cannock to improve circulation, reduce tension and leave your skin feeling refreshed and revitalised.",
  path: "/facials/gua-sha-facial",
});

const suitableFor = [
  "Want to improve your skin naturally",
  "Feel tension in the face or jaw",
  "Are looking for a relaxing facial treatment",
  "Want a refreshed and revitalised appearance",
  "Prefer a more holistic approach to skincare",
];

const benefits = [
  "Improved circulation",
  "Reduced facial tension",
  "Refreshed and revitalised skin",
  "Improved skin appearance",
  "Relaxation of facial muscles",
  "A calming and soothing experience",
];

const faqItems = [
  {
    question: "What does Gua Sha do for the skin?",
    answer: "It helps improve circulation and reduce tension in the facial muscles.",
  },
  {
    question: "Is Gua Sha facial relaxing?",
    answer: "Yes, it is both relaxing and beneficial for the skin.",
  },
  {
    question: "Is it suitable for sensitive skin?",
    answer: "Yes, it can be adapted to suit your skin type.",
  },
];

export default function GuaShaFacialPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Gua Sha Facial",
      description:
        "Gua Sha facial in Cannock using smooth facial tools and massage techniques to improve circulation, release tension and support natural skin rejuvenation.",
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
          { label: "Gua Sha Facial" },
        ]}
      />

      <PageHero
        eyebrow="Gua Sha Facial"
        title="Gua Sha Facial in Cannock for Natural Skin Rejuvenation"
        description="The Gua Sha facial is a relaxing treatment that uses smooth tools and massage techniques to help improve circulation, release tension and refresh the skin. At Revive Holistic Therapies in Cannock, this treatment combines skincare with a calming experience to leave you feeling both relaxed and revitalised. Ideal if you are looking for a natural approach to skincare, this facial offers both visible and relaxing benefits."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Gua Sha Facial
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is a Gua Sha facial?"
            title="What is a Gua Sha facial?"
            description="A Gua Sha facial uses specially designed smooth tools that are gently moved across the skin to stimulate circulation and release tension."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The technique helps encourage natural skin rejuvenation while also relaxing the facial muscles.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Combined with traditional facial elements, this creates a treatment that supports both skin health and relaxation.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="The Gua Sha facial is ideal if you:"
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
            title="Benefits of a Gua Sha facial"
            description="This treatment offers a combination of skincare and relaxation benefits."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="Your treatment will begin with a short consultation to understand your skin and preferences."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The facial includes cleansing, massage and the use of Gua Sha tools to gently work across the skin. The techniques are smooth and relaxing, helping to release tension while supporting skin health.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is calm and unhurried, allowing you to fully relax.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Gua Sha facial is available in 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This allows for a complete and relaxing treatment experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for Gua Sha facial in Cannock?"
            description="At Revive Holistic Therapies, facials are designed to be both effective and relaxing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Each treatment is tailored to your skin and your needs, ensuring you get the most from your session.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that combine skincare with a calming experience.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for a Gua Sha facial in Cannock or Hednesford?"
            description="If you are searching for a Gua Sha facial in Cannock, Revive Holistic Therapies offers treatments designed to refresh your skin and help you relax."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/facials", label: "Facials" },
              { href: "/facials/recharge-facial", label: "Recharge Facial" },
              { href: "/facials/rose-facial", label: "Rose Facial" },
              { href: "/facials/neroli-facial", label: "Neroli Facial" },
              { href: "/facials/mini-facial", label: "Mini Facial" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Gua Sha facial in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Refresh your skin naturally</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are looking for a natural and relaxing facial treatment, book your Gua Sha facial in Cannock today.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#162124]">
            Book Now
          </Link>
          <Link href="/contact" className="rounded-full border border-[#c4e5e7] bg-[#345157] px-6 py-3 text-center font-semibold text-white">
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Gua Sha facial FAQs"
          description="A few helpful answers before you book."
        />
        <div className="mt-8 space-y-4">
          {faqItems.map((faq) => (
            <details key={faq.question} className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-white px-5 py-4">
              <summary className="cursor-pointer font-semibold text-[color:var(--color-heading)]">{faq.question}</summary>
              <p className="mt-3 text-[color:var(--color-text-muted)]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <Link
          href="/booking"
          className="block rounded-full bg-[color:var(--color-accent)] px-5 py-4 text-center font-semibold text-white shadow-[0_20px_45px_-25px_rgba(43,163,172,0.85)]"
        >
          Book Gua Sha Facial
        </Link>
      </div>
    </div>
  );
}
