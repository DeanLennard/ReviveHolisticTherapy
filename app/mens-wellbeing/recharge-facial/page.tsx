import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Men’s Facial Cannock | Recharge Facial for Skin & Relaxation",
  description:
    "Men’s facial in Cannock combining skin care and massage. A relaxing recharge facial to refresh your skin and ease tension.",
  path: "/mens-wellbeing/recharge-facial",
});

const suitableFor = [
  "Want to improve your skin",
  "Feel tired or run down",
  "Experience tension in the shoulders or upper body",
  "Want a relaxing treatment without a full massage",
  "Are new to facials",
];

const benefits = [
  "Refreshed and revitalised skin",
  "Improved circulation",
  "Reduced tension in the upper body",
  "Improved relaxation",
  "A more energised and refreshed feeling",
  "Time to switch off and reset",
];

const faqItems = [
  {
    question: "Is this facial suitable for men with no skincare routine?",
    answer: "Yes, it is designed to be simple and effective.",
  },
  {
    question: "Do I need to prepare for the treatment?",
    answer: "No preparation is needed.",
  },
  {
    question: "Is it relaxing or results-focused?",
    answer: "It offers both relaxation and skin benefits.",
  },
];

export default function MensRechargeFacialPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Men's Recharge Facial",
      description:
        "Men's recharge facial in Cannock combining skincare, massage and relaxation to refresh the skin and ease upper-body tension.",
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
          { label: "Men's Wellbeing", href: "/mens-wellbeing" },
          { label: "Recharge Facial" },
        ]}
      />

      <PageHero
        eyebrow="Men's Recharge Facial"
        title="Recharge Facial in Cannock for Skin and Relaxation"
        description="The recharge facial is designed to refresh your skin while helping you relax and unwind. At Revive Holistic Therapies in Cannock, this treatment combines facial care with massage techniques to ease tension and leave you feeling recharged. Ideal if you are feeling tired, stressed or simply want to look and feel better, this treatment offers a balance of skincare and relaxation."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Recharge Facial
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is a recharge facial?"
            title="What is a recharge facial?"
            description="The recharge facial is a combined treatment that includes both skincare and relaxation elements."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It typically begins with a back exfoliation and massage, followed by facial cleansing and massage.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This combination helps to refresh the skin while also relieving tension in the upper body, creating a balanced and restorative experience.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
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
            It is a great introduction to both skincare and relaxation treatments.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of the recharge facial"
            description="This treatment offers both skin and wellbeing benefits."
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
            description="Your treatment will begin with a short consultation to understand your needs."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The session includes a back exfoliation and massage using aromatherapy oils, followed by facial cleansing, massage and a face mask. While the mask is applied, you will also enjoy a relaxing scalp massage.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is designed to be both effective and relaxing, leaving you feeling refreshed and more at ease.
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
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for men’s facials in Cannock?"
            description="At Revive Holistic Therapies, treatments are designed to be approachable, effective and tailored to your needs."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that help them feel refreshed, relaxed and more comfortable in themselves.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for a men’s facial in Cannock or Hednesford?"
            description="If you are searching for a men’s facial in Cannock, Revive Holistic Therapies offers treatments designed to refresh your skin and help you relax."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/mens-wellbeing", label: "Men's Wellbeing" },
              { href: "/facials", label: "Facials" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/mens-wellbeing/de-stress-body-massage", label: "De-Stress Body Massage" },
              { href: "/price-list", label: "Price List" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Men’s facial in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Refresh your skin and recharge</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are looking to feel more refreshed, relaxed and energised, book your recharge facial in Cannock today.
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
          title="Recharge facial FAQs"
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
          Book Recharge Facial
        </Link>
      </div>
    </div>
  );
}
