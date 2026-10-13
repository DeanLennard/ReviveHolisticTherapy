import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";
import { lomiLomiMassageIsAvailable } from "@/lib/service-availability";

export const metadata = buildMetadata({
  title: "Lomi Lomi Massage Cannock | Hawaiian Flowing Massage Therapy",
  description:
    "Experience Lomi Lomi massage in Cannock, a flowing Hawaiian massage designed to relax the body, ease tension and restore balance.",
  path: "/massage-treatments/lomi-lomi-massage",
});

const suitableFor = [
  "Are looking for a deeply relaxing experience",
  "Feel stressed or overwhelmed",
  "Want to switch off completely",
  "Prefer a flowing, full-body massage",
  "Are looking for something different from traditional massage",
];

const benefits = [
  "Deep relaxation",
  "Reduced stress and tension",
  "Improved circulation",
  "A calming effect on the nervous system",
  "A sense of balance and wellbeing",
  "A more connected and mindful experience",
];

const faqItems = [
  {
    question: "What makes Lomi Lomi different from other massages?",
    answer: "It uses flowing, continuous movements rather than structured techniques.",
  },
  {
    question: "Is it suitable for beginners?",
    answer: "Yes, it is ideal if you are new to massage or looking for deep relaxation.",
  },
  {
    question: "Will it be deep or gentle?",
    answer: "It can be adapted depending on your preference.",
  },
];

export default function LomiLomiMassagePage() {
  if (!lomiLomiMassageIsAvailable) {
    notFound();
  }

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Lomi Lomi Massage",
      description:
        "Lomi Lomi massage in Cannock inspired by Hawaiian flowing massage techniques, designed to ease tension, calm the mind and create a deeply immersive full-body treatment.",
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
          { label: "Massage Treatments", href: "/massage-treatments" },
          { label: "Heat Therapy Massage", href: "/massage-treatments/heat-therapy-massage" },
          { label: "Lomi Lomi Massage" },
        ]}
      />

      <PageHero
        eyebrow="Lomi Lomi Massage"
        title="Lomi Lomi Massage in Cannock for Deep Relaxation"
        description="Lomi Lomi massage is a flowing, rhythmic treatment inspired by traditional Hawaiian techniques. At Revive Holistic Therapies in Cannock, this unique massage is designed to help you fully relax, release tension and experience a deeper sense of calm. Using continuous, wave-like movements across the body, this treatment creates a soothing and immersive experience that helps quiet the mind and ease the body."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Lomi Lomi Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is Lomi Lomi massage?"
            title="What is Lomi Lomi massage?"
            description="Lomi Lomi massage is a full-body treatment that uses long, flowing strokes to create a continuous and rhythmic experience."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The movements are designed to feel fluid and connected, helping the body relax more naturally.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Unlike more structured massage styles, Lomi Lomi focuses on creating a sense of flow, allowing you to fully switch off and enjoy the experience without interruption.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is Lomi Lomi massage suitable for?"
            description="Lomi Lomi massage is ideal if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be adapted to your comfort level.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of Lomi Lomi massage"
            description="Lomi Lomi massage offers both physical and emotional benefits."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients describe this treatment as one of the most relaxing massage experiences available.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
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
            The massage uses long, flowing movements across the body, creating a continuous and soothing rhythm. The experience is unhurried and designed to help you fully relax from start to finish.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The environment is calm and quiet, allowing you to switch off completely and enjoy the treatment.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Lomi Lomi massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow for a more complete and immersive experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for Lomi Lomi massage in Cannock?"
            description="At Revive Holistic Therapies, we focus on creating treatments that are both relaxing and personalised."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Lomi Lomi massage is delivered in a calm and professional environment, ensuring you feel comfortable and supported throughout.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that offer a deeper level of relaxation and care.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for Lomi Lomi massage in Cannock or Hednesford?"
            description="If you are searching for Lomi Lomi massage in Cannock, Revive Holistic Therapies offers a unique and deeply relaxing treatment experience."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments", label: "Massage Treatments" },
              { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
              { href: "/massage-treatments/warm-bamboo-massage", label: "Warm Bamboo Massage" },
              { href: "/reflexology", label: "Reflexology" },
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

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your Lomi Lomi massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Experience deep relaxation</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to switch off, unwind and enjoy a truly relaxing treatment, book your Lomi Lomi massage in Cannock today.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#0A234D]">
            Book Now
          </Link>
          <Link href="/contact" className="rounded-full border border-[#AFC8ED] bg-[#174A91] px-6 py-3 text-center font-semibold text-white">
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Lomi Lomi massage FAQs"
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
          className="block rounded-full bg-[color:var(--color-accent)] px-5 py-4 text-center font-semibold text-white shadow-[0_20px_45px_-25px_rgba(13,51,113,0.85)]"
        >
          Book Lomi Lomi Massage
        </Link>
      </div>
    </div>
  );
}
