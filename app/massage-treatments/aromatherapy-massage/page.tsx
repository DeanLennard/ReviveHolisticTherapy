import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aromatherapy Massage Cannock | Relaxing Massage with Essential Oils | Revive Holistic Therapies",
  description:
    "Enjoy a relaxing aromatherapy massage in Cannock using essential oils to calm the mind and body. Book your personalised treatment today.",
  path: "/massage-treatments/aromatherapy-massage",
});

const suitableFor = [
  "Feeling stressed or overwhelmed",
  "Struggling to relax or switch off",
  "Experiencing tension from daily life",
  "Feeling tired, run down or mentally drained",
  "Looking for a calming and nurturing treatment",
];

const benefits = [
  "Deep relaxation",
  "Reduced stress and anxiety",
  "Improved mood and emotional balance",
  "Relief from muscular tension",
  "Improved sleep quality",
  "Enhanced overall wellbeing",
];

const faqItems = [
  {
    question: "What oils are used in aromatherapy massage?",
    answer: "Essential oils are selected based on your needs, such as relaxation, stress relief or mood support.",
  },
  {
    question: "Is aromatherapy massage gentle?",
    answer: "Yes, it typically uses lighter, flowing techniques, but pressure can be adjusted to suit you.",
  },
  {
    question: "How often should I have aromatherapy massage?",
    answer: "Many clients benefit from regular sessions to help manage stress and maintain wellbeing.",
  },
];

export default function AromatherapyMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Aromatherapy Massage",
      description:
        "Relaxing aromatherapy massage in Cannock using carefully selected essential oils to help calm the mind, ease tension and restore balance.",
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
          { label: "Aromatherapy Massage" },
        ]}
      />

      <PageHero
        eyebrow="Aromatherapy Massage"
        title="Aromatherapy Massage in Cannock for Deep Relaxation and Wellbeing"
        description="Aromatherapy massage combines the power of touch with carefully selected essential oils to create a deeply relaxing and restorative treatment. At Revive Holistic Therapies in Cannock, each session is tailored to your needs, helping you unwind, reduce stress and restore balance. Whether you are feeling overwhelmed, tired or simply need time to switch off, this treatment offers a calming escape for both body and mind."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Aromatherapy Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is aromatherapy massage?"
            title="What is aromatherapy massage?"
            description="Aromatherapy massage uses gentle, flowing massage techniques combined with essential oils chosen to suit your needs."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            These oils are absorbed through the skin and inhaled during the treatment, helping to support both physical relaxation and emotional wellbeing.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is designed to calm the nervous system, ease tension and create a sense of balance, making it ideal for those looking for a more soothing and restorative experience.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is aromatherapy massage suitable for?"
            description="Aromatherapy massage is ideal if you are:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is suitable for both men and women and can be adapted to your preferences.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of aromatherapy massage"
            description="Aromatherapy massage offers a wide range of benefits for both body and mind."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients choose aromatherapy massage as part of a regular self-care routine to help maintain balance in a busy lifestyle.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="At the start of your appointment, we will discuss how you are feeling and what you would like from your treatment."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Essential oils will be selected to suit your needs, whether that is relaxation, uplifting your mood or helping you feel more grounded.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The massage uses slow, flowing movements designed to calm the body and quiet the mind. The atmosphere is peaceful and unhurried, allowing you to fully relax and enjoy the experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">You will leave feeling calmer, lighter and more balanced.</p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Aromatherapy massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow for a more complete full-body experience and deeper relaxation.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for aromatherapy massage in Cannock?"
            description="At Revive Holistic Therapies, every aromatherapy massage is tailored to you."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We take the time to understand how you are feeling and create a treatment that supports both your physical and emotional wellbeing.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for a calm, professional and personalised experience that helps them step away from daily pressures and reconnect with themselves.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for aromatherapy massage in Cannock or Hednesford?"
            description="If you are searching for aromatherapy massage in Cannock, Revive Holistic Therapies offers relaxing treatments designed to help you unwind and feel more balanced."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas who are looking for a peaceful and professional treatment experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments", label: "Massage Overview" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
              { href: "/treatments/indian-head-massage", label: "Indian Head Massage" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Book your aromatherapy massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to relax and reset</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are ready to slow down, reduce stress and enjoy a deeply calming treatment, book your aromatherapy massage in Cannock today.
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
          title="Aromatherapy massage FAQs"
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
          Book Aromatherapy Massage
        </Link>
      </div>
    </div>
  );
}
