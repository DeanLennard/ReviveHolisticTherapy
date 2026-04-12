import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Remedial Massage Cannock | Targeted Treatment for Pain & Tension | Revive Holistic Therapies",
  description:
    "Remedial massage in Cannock to target muscle pain, tension and postural issues. Tailored treatments to help you move and feel better.",
  path: "/massage-treatments/remedial-massage",
});

const suitableFor = [
  "Ongoing muscle tension or tightness",
  "Back, neck or shoulder discomfort",
  "Postural issues from work or daily activities",
  "Stiffness or restricted movement",
  "General aches from physical strain",
  "Recurring areas of discomfort",
];

const benefits = [
  "Relief from muscular discomfort",
  "Reduced tension and tightness",
  "Improved posture",
  "Increased mobility and flexibility",
  "Better circulation",
  "Support for recovery from strain or overuse",
  "Improved overall wellbeing",
];

const faqItems = [
  {
    question: "What is the difference between remedial and deep tissue massage?",
    answer: "Remedial massage focuses on specific problem areas, while deep tissue massage works more broadly on deeper muscle layers.",
  },
  {
    question: "Is remedial massage suitable for back pain?",
    answer: "Yes, it can help address muscular tension and discomfort contributing to back pain.",
  },
  {
    question: "Will the treatment be painful?",
    answer: "The pressure is always adjusted to your comfort level.",
  },
];

export default function RemedialMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Remedial Massage",
      description:
        "Targeted remedial massage in Cannock designed to address muscle tension, discomfort, postural strain and restricted movement in a calm, professional setting.",
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
          { label: "Remedial Massage" },
        ]}
      />

      <PageHero
        eyebrow="Remedial Massage"
        title="Remedial Massage in Cannock for Targeted Muscle Relief"
        description="Remedial massage is a focused treatment designed to address specific areas of tension, discomfort or imbalance in the body. At Revive Holistic Therapies in Cannock, each session is tailored to your individual needs, helping to relieve muscular tightness, improve movement and support your overall wellbeing. Whether you are experiencing back pain, shoulder tension or general stiffness, remedial massage offers a more targeted approach to help you feel more comfortable in your body."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Remedial Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is remedial massage?"
            title="What is remedial massage?"
            description="Remedial massage is a treatment that focuses on identifying and working on problem areas in the body."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It uses a combination of techniques, including deeper pressure, stretching and targeted massage, to help release tension and improve how muscles function.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Unlike a general relaxation massage, remedial massage is more focused and structured, allowing the therapist to address specific concerns such as tight muscles, postural strain or areas of discomfort.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is remedial massage suitable for?"
            description="Remedial massage is ideal if you are experiencing:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is suitable for both men and women and can be adapted depending on your needs and comfort level.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of remedial massage"
            description="Remedial massage can help improve how your body feels and moves."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients choose remedial massage as part of a regular routine to maintain comfort and prevent tension building up over time.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment approach"
            title="A tailored approach to your treatment"
            description="At Revive Holistic Therapies, we take the time to understand what you need from your session."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Before your treatment begins, we will discuss any areas of concern, lifestyle factors or patterns of tension that may be affecting you.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Your massage will then be tailored to focus on those areas, using the most appropriate techniques to help relieve tension and improve how your body feels.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The pressure and techniques used will always be adapted to your comfort level.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Remedial massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow for more detailed work across multiple areas of the body.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for remedial massage in Cannock?"
            description="At Revive Holistic Therapies, we focus on providing treatments that are both effective and personalised."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Every session is adapted to your needs, helping you get the most from your treatment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for a professional and caring approach that supports both short-term relief and longer-term wellbeing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for remedial massage in Cannock or Hednesford?"
            description="If you are searching for remedial massage in Cannock, Revive Holistic Therapies offers targeted treatments designed to help ease tension, improve comfort and support your daily wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments", label: "Massage Overview" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
              { href: "/massage-treatments/indian-head-massage", label: "Indian Head Massage" },
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

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Book your remedial massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Feel more comfortable in your body</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are dealing with tension, discomfort or stiffness, remedial massage can help. Book your appointment today and enjoy a treatment tailored to your needs.
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
          title="Remedial massage FAQs"
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
          Book Remedial Massage
        </Link>
      </div>
    </div>
  );
}
