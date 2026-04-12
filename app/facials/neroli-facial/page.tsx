import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Neroli Facial Cannock | Refreshing & Revitalising Facial Treatment",
  description:
    "Neroli facial in Cannock to refresh, revitalise and brighten your skin. A relaxing treatment to restore your natural glow.",
  path: "/facials/neroli-facial",
});

const suitableFor = [
  "Have dull or tired-looking skin",
  "Want to refresh and brighten your complexion",
  "Feel your skin needs a boost",
  "Want a relaxing facial treatment",
  "Are looking for both results and relaxation",
];

const benefits = [
  "Refreshed and revitalised skin",
  "Improved skin appearance",
  "Brighter complexion",
  "Improved circulation",
  "Relaxation and stress relief",
  "A more energised feeling",
];

const faqItems = [
  {
    question: "What is neroli good for in skincare?",
    answer: "It is often used to refresh and revitalise the skin.",
  },
  {
    question: "Is this facial relaxing?",
    answer: "Yes, it combines skincare with a calming treatment experience.",
  },
  {
    question: "Is it suitable for all skin types?",
    answer: "Yes, it can be adapted to suit your skin.",
  },
];

export default function NeroliFacialPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Neroli Facial",
      description:
        "Neroli facial in Cannock using refreshing products, massage and facial care techniques to brighten, revitalise and relax tired-looking skin.",
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
          { label: "Neroli Facial" },
        ]}
      />

      <PageHero
        eyebrow="Neroli Facial"
        title="Neroli Facial in Cannock for Fresh, Revitalised Skin"
        description="The neroli facial is a refreshing and revitalising treatment designed to bring your skin back to life while helping you relax. At Revive Holistic Therapies in Cannock, this facial combines skincare and massage to leave your skin feeling brighter, refreshed and more balanced. Ideal if your skin feels tired, dull or in need of a boost, this treatment offers both visible and relaxing benefits."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Neroli Facial
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is a neroli facial?"
            title="What is a neroli facial?"
            description="A neroli facial uses products infused with neroli, known for its refreshing and revitalising properties."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Combined with cleansing, massage and a face mask, the treatment helps to refresh the skin, improve its appearance and provide a relaxing experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is designed to leave your skin feeling renewed and your mind at ease.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="The neroli facial is ideal if you:"
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
            title="Benefits of a neroli facial"
            description="This treatment offers a combination of skincare and wellbeing benefits."
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
            The facial includes cleansing, application of neroli-based products, massage and a face mask. The techniques used are both effective and relaxing, helping to refresh your skin while allowing you to unwind.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The environment is calm and peaceful, allowing you to fully relax.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Neroli facial is available in 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This provides a complete and balanced treatment experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for facials in Cannock?"
            description="At Revive Holistic Therapies, we focus on delivering treatments that are both effective and relaxing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Each facial is tailored to your skin and your needs, helping you get the best results from your session.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that leave them feeling refreshed and revitalised.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for a refreshing facial in Cannock or Hednesford?"
            description="If you are searching for a neroli facial in Cannock, Revive Holistic Therapies offers treatments designed to refresh your skin and help you relax."
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
              { href: "/facials/mini-facial", label: "Mini Facial" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Neroli facial in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Refresh and revitalise your skin</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If your skin needs a boost, book your neroli facial in Cannock today and enjoy a refreshing and relaxing treatment.
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
          title="Neroli facial FAQs"
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
          Book Neroli Facial
        </Link>
      </div>
    </div>
  );
}
