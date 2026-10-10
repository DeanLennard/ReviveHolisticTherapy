import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Andropause Treatment Cannock | Men’s Hormonal Wellbeing Support",
  description:
    "Andropause treatment in Cannock designed to support men’s wellbeing, reduce stress and promote balance during hormonal changes.",
  path: "/mens-wellbeing/andropause-treatment",
});

const suitableFor = [
  "Low energy or fatigue",
  "Increased stress or tension",
  "Changes in mood",
  "Difficulty relaxing or switching off",
  "General feeling of imbalance",
];

const benefits = [
  "Reduced stress and tension",
  "Improved relaxation",
  "Increased sense of calm",
  "Improved overall wellbeing",
  "Support for better sleep",
  "Time to reset and recharge",
];

const faqItems = [
  {
    question: "What is andropause?",
    answer: "It refers to natural changes in hormone levels that can affect energy, mood and wellbeing.",
  },
  {
    question: "Can this treatment help with symptoms?",
    answer: "It is designed to support relaxation and overall wellbeing.",
  },
  {
    question: "Is this treatment suitable for everyone?",
    answer: "Yes, it can be adapted to suit your needs.",
  },
];

export default function AndropauseTreatmentPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Andropause Treatment",
      description:
        "Andropause treatment in Cannock designed to support men’s wellbeing through relaxation, tension relief and a more balanced, restorative treatment experience.",
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
          { label: "Andropause Treatment" },
        ]}
      />

      <PageHero
        eyebrow="Andropause Treatment"
        title="Supporting Men’s Wellbeing in Cannock"
        description="Andropause can bring changes in energy, mood and overall wellbeing. At Revive Holistic Therapies in Cannock, this tailored treatment is designed to help you relax, reduce stress and feel more balanced. Whether you are feeling run down, tense or simply not quite yourself, this treatment offers time to reset and focus on your wellbeing."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Andropause Treatment
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="A tailored approach"
            title="A treatment tailored to how you feel"
            description="Every person experiences changes differently, and there is no one-size-fits-all approach."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is designed to adapt to your needs, focusing on relaxation, tension relief and overall balance.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Using a combination of massage techniques and calming elements, the treatment helps support both physical comfort and mental wellbeing.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="This treatment is ideal if you are experiencing:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for men at any stage of andropause or for those simply looking to improve their wellbeing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of andropause treatment"
            description="This treatment is designed to support both physical and mental wellbeing."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="Your treatment will begin with a short consultation to understand how you are feeling and what you would like from your session."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment uses massage techniques and calming elements designed to help you relax and release tension. The experience is unhurried and focused on helping you feel more balanced.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Andropause treatment is available in 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This provides a complete and supportive treatment experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for men’s wellbeing in Cannock?"
            description="At Revive Holistic Therapies, we offer treatments that are tailored, professional and focused on helping you feel better."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that support both physical comfort and overall wellbeing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for men’s wellbeing treatments in Cannock or Hednesford?"
            description="If you are searching for andropause treatment in Cannock, Revive Holistic Therapies offers tailored treatments designed to support relaxation and balance."
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
              { href: "/mens-wellbeing/de-stress-body-massage", label: "De-Stress Body Massage" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Men’s wellbeing in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to reset</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are feeling tired, stressed or out of balance, this treatment can help you relax and recharge. Book your appointment today.
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
          title="Andropause treatment FAQs"
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
          Book Andropause Treatment
        </Link>
      </div>
    </div>
  );
}
