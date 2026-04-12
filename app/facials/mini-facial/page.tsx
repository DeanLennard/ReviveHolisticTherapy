import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Mini Facial Cannock | Quick Refresh Facial Treatment",
  description:
    "Mini facial in Cannock for a quick skin refresh. A short, relaxing treatment to cleanse, revitalise and improve your skin.",
  path: "/facials/mini-facial",
});

const suitableFor = [
  "Are short on time",
  "Want a quick skin refresh",
  "Are new to facials",
  "Want a low-commitment treatment",
  "Want to maintain your skin between full facials",
];

const benefits = [
  "Refreshed and revitalised skin",
  "Improved skin appearance",
  "Quick and effective treatment",
  "Relaxation in a short time",
  "A convenient way to maintain your skin",
  "A simple introduction to facials",
];

const faqItems = [
  {
    question: "How long does a mini facial take?",
    answer: "It typically lasts around 30 minutes.",
  },
  {
    question: "Is it as effective as a full facial?",
    answer: "It provides a quick refresh but is shorter than a full treatment.",
  },
  {
    question: "Is it suitable for beginners?",
    answer: "Yes, it is a great introduction to facials.",
  },
];

export default function MiniFacialPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Mini Facial",
      description:
        "Mini facial in Cannock offering a quick, relaxing skin refresh with cleansing, exfoliation and light massage.",
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
          { label: "Mini Facial" },
        ]}
      />

      <PageHero
        eyebrow="Mini Facial"
        title="Mini Facial in Cannock for a Quick Skin Refresh"
        description="The mini facial is a shorter treatment designed to refresh your skin while still providing a relaxing experience. At Revive Holistic Therapies in Cannock, this facial is ideal if you are short on time but still want to improve your skin and enjoy a moment of relaxation. Perfect as an introduction to facials or as a quick top-up between treatments."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Mini Facial
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is a mini facial?"
            title="What is a mini facial?"
            description="A mini facial is a condensed version of a full facial treatment, focusing on essential steps such as cleansing, exfoliation and light massage."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is designed to refresh the skin quickly while still offering a relaxing experience, making it ideal for those with limited time.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="The mini facial is ideal if you:"
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
            title="Benefits of a mini facial"
            description="This treatment offers a range of benefits."
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
            The facial includes cleansing, exfoliation and light massage, followed by basic skincare to leave your skin feeling refreshed and clean.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is quick, effective and relaxing, making it easy to fit into your day.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Mini facial is available in 30 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This makes it ideal if you are looking for a quick and effective treatment.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for facials in Cannock?"
            description="At Revive Holistic Therapies, even shorter treatments are delivered with care and attention to detail."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Your mini facial is tailored to your skin, ensuring you still get the benefits of a professional treatment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that are convenient, effective and relaxing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for a quick facial in Cannock or Hednesford?"
            description="If you are searching for a mini facial in Cannock, Revive Holistic Therapies offers quick and effective treatments designed to refresh your skin."
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
              { href: "/facials/gua-sha-facial", label: "Gua Sha Facial" },
              { href: "/facials/rose-facial", label: "Rose Facial" },
              { href: "/facials/neroli-facial", label: "Neroli Facial" },
              { href: "/facials/recharge-facial", label: "Recharge Facial" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Mini facial in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Refresh your skin in less time</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are looking for a quick and effective facial, book your mini facial in Cannock today.
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
          title="Mini facial FAQs"
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
          Book Mini Facial
        </Link>
      </div>
    </div>
  );
}
