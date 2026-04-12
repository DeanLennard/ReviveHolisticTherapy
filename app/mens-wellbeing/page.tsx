import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Men's Massage & Wellbeing Cannock | Deep Tissue & Relaxation | Revive Holistic Therapies",
  description:
    "Men's massage and wellbeing treatments in Cannock including deep tissue, stress relief massage and facials. Tailored treatments to help you feel better.",
  path: "/mens-wellbeing",
});

const treatmentCategories = [
  {
    title: "De-Stress Body Massage",
    description:
      "A full-body massage designed to help you relax, ease tension and switch off from daily stress. Ideal if you are feeling run down or need time to unwind.",
    href: "/mens-wellbeing/de-stress-body-massage",
  },
  {
    title: "Deep Tissue Massage",
    description:
      "A more focused treatment designed to target deeper layers of muscle, helping to relieve tension, tightness and discomfort.",
    href: "/massage-treatments/deep-tissue-massage",
  },
  {
    title: "Recharge Facial",
    description:
      "A relaxing facial treatment combined with massage to refresh the skin and help you unwind.",
    href: "/mens-wellbeing/recharge-facial",
  },
  {
    title: "Andropause Treatment",
    description:
      "A tailored treatment designed to support wellbeing during hormonal changes, helping to reduce stress and promote balance.",
    href: "/mens-wellbeing/andropause-treatment",
  },
];

const benefits = [
  "Reduced muscle tension",
  "Relief from back, neck and shoulder discomfort",
  "Improved relaxation",
  "Reduced stress",
  "Better recovery after physical activity",
  "Improved overall wellbeing",
];

const faqItems = [
  {
    question: "Are treatments tailored for men?",
    answer: "Yes, treatments are adapted to suit your needs and preferences.",
  },
  {
    question: "Do I need to know which treatment to choose?",
    answer: "No, we can guide you based on what you need.",
  },
  {
    question: "Are treatments suitable for muscle pain?",
    answer: "Yes, treatments like deep tissue and remedial massage can help relieve tension and discomfort.",
  },
];

export default function MensWellbeingPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Men's Wellbeing Treatments",
      description:
        "Men's massage and wellbeing treatments in Cannock including deep tissue massage, stress relief massage and facials.",
      url: "https://reviveholistictherapies.com/mens-wellbeing",
      about: treatmentCategories.map((item) => ({
        "@type": "Service",
        name: item.title,
      })),
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Men's Wellbeing" }]} />

      <PageHero
        eyebrow="Men's Wellbeing"
        title="Men's Massage and Wellbeing in Cannock"
        description="At Revive Holistic Therapies, we offer a range of treatments designed specifically to support men's wellbeing. Whether you are dealing with muscle tension, back discomfort, stress or simply need time to unwind, our treatments are tailored to help you feel better in both body and mind. With a professional and straightforward approach, we focus on what you need from your session, helping you get the most from your treatment."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Your Treatment
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Targeted support"
            title="Targeted treatments for muscle tension, stress and recovery"
            description="Modern life can place a lot of strain on the body, whether from work, physical activity or everyday stress."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Our treatments are designed to help relieve tension, improve comfort and support your overall wellbeing.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We take time to understand your needs and tailor your treatment accordingly, whether you are looking for a deeper, more focused massage or a more relaxing experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We welcome clients from Cannock, Hednesford and surrounding areas.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2.1rem] border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="bg-white px-6 py-6">
              <p className="font-semibold text-[color:var(--color-heading)]">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Men's wellbeing treatments"
          title="Men's wellbeing treatments"
          description="Explore our range of treatments designed to help you relax, recover and feel more comfortable in your body."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {treatmentCategories.map((item) => (
            <article key={item.title} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-3xl font-semibold text-[color:var(--color-heading)]">{item.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{item.description}</p>
              <Link
                href={item.href}
                className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
              >
                {item.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies?"
            description="At Revive Holistic Therapies, we offer a professional and personalised approach to treatment."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Every session is tailored to your needs, whether you are looking for relief from tension, support with recovery or simply time to relax.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that are effective, straightforward and focused on results.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for men's massage in Cannock or Hednesford?"
            description="If you are searching for massage for men in Cannock, Revive Holistic Therapies offers a range of treatments designed to help you relax, recover and feel your best."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Men&apos;s wellbeing in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to feel better</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          Whether you need to relieve tension, recover from physical strain or simply relax, our treatments are designed to help. Book your appointment today.
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
          eyebrow="Useful links"
          title="Explore related treatments"
          description="Browse key pages connected to men's massage and wellbeing."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "/mens-wellbeing/de-stress-body-massage", label: "De-Stress Body Massage" },
            { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
            { href: "/mens-wellbeing/recharge-facial", label: "Recharge Facial" },
            { href: "/mens-wellbeing/andropause-treatment", label: "Andropause Treatment" },
            { href: "/massage-treatments", label: "Massage Treatments" },
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
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Men's wellbeing FAQs"
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
          Book Your Treatment
        </Link>
      </div>
    </div>
  );
}
