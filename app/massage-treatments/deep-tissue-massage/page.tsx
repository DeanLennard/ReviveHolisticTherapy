import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Deep Tissue Massage Cannock | Relieve Muscle Tension & Pain | Revive Holistic Therapies",
  description:
    "Book a deep tissue massage in Cannock to relieve muscle tension, tightness and discomfort. Tailored treatments to help you move and feel better.",
  path: "/massage-treatments/deep-tissue-massage",
});

const suitableFor = [
  "Muscular tension or tightness",
  "Stiffness from work or daily activities",
  "Discomfort in areas such as the back, shoulders or neck",
  "General aches from physical strain",
  "A need for a more focused, therapeutic massage",
];

const benefits = [
  "Relief from muscle tension and tightness",
  "Improved circulation",
  "Reduction in discomfort or stiffness",
  "Support for recovery after physical strain",
  "Increased flexibility and ease of movement",
  "A greater sense of relaxation",
];

const faqItems = [
  {
    question: "Is deep tissue massage painful?",
    answer: "Deep tissue massage uses firm pressure, but the treatment is always adapted to your comfort level.",
  },
  {
    question: "How often should I have a deep tissue massage?",
    answer: "This depends on your needs, but many clients benefit from regular treatments to maintain comfort and wellbeing.",
  },
  {
    question: "What should I do after my massage?",
    answer: "It is recommended to drink plenty of water and allow your body time to rest.",
  },
];

export default function DeepTissueMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Deep Tissue Massage",
      description:
        "Tailored deep tissue massage in Cannock designed to ease muscle tension, stiffness and discomfort while supporting better movement and relaxation.",
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
          { label: "Deep Tissue Massage" },
        ]}
      />

      <PageHero
        eyebrow="Deep Tissue Massage"
        title="Deep Tissue Massage in Cannock for Muscle Tension and Recovery"
        description="Deep tissue massage is a focused treatment designed to work into the deeper layers of muscle and connective tissue. At Revive Holistic Therapies in Cannock, each session is tailored to your needs, helping to release tension, ease discomfort and support better movement. Whether you are dealing with tight muscles, ongoing tension or general stiffness from day-to-day life, this treatment is designed to help you feel more comfortable and relaxed."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Deep Tissue Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Not sure if this is right for you? Contact us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is deep tissue massage?"
            title="What is deep tissue massage?"
            description="Deep tissue massage focuses on the deeper structures of muscle and connective tissue using slow, controlled movements and firm pressure."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This allows the therapist to work into areas of tension and tightness that may not be reached with lighter massage techniques.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment can be adapted to suit your comfort level, whether you prefer a more targeted approach or a balanced combination of deeper and more relaxing techniques.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is deep tissue massage suitable for?"
            description="Deep tissue massage is ideal if you are experiencing:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be tailored depending on your preferences and areas of concern.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of deep tissue massage"
            description="Deep tissue massage can support both physical comfort and overall wellbeing."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients choose this treatment regularly as part of their ongoing wellbeing routine.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="At the start of your appointment, we will take time to understand your needs and any areas you would like to focus on."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Your treatment will then be tailored accordingly.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The massage uses slow strokes and deeper pressure where needed, combined with techniques designed to release tension and improve circulation. You are always in control of the pressure level, and adjustments can be made throughout the session to ensure your comfort.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            After your treatment, you may feel more relaxed, looser in the body and better able to move without restriction.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Deep tissue massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow more time to focus on multiple areas of the body or to combine targeted work with relaxation.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for deep tissue massage in Cannock?"
            description="At Revive Holistic Therapies, every treatment is tailored to you."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We take the time to understand what you need from your session, whether that is relief from tension, support with muscular discomfort or simply time to relax.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for a professional, personalised approach that focuses on both immediate comfort and longer-term wellbeing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for deep tissue massage in Cannock or Hednesford?"
            description="If you are searching for deep tissue massage in Cannock, Revive Holistic Therapies offers tailored treatments designed to help ease tension and improve how your body feels day to day."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby areas who are looking for a professional and calming treatment experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments", label: "Massage Overview" },
              { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
              { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your deep tissue massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Book your deep tissue massage</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to ease tension, reduce discomfort and feel more relaxed, book your deep tissue massage in Cannock today. Choose a time that suits you and enjoy a treatment tailored to your needs.
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
          title="Deep tissue massage FAQs"
          description="A few quick answers to common questions before you book."
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
          Book Deep Tissue Massage
        </Link>
      </div>
    </div>
  );
}
