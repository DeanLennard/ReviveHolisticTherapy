import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Pregnancy Massage Cannock | Safe & Relaxing Massage for Mums-to-Be | Revive Holistic Therapies",
  description:
    "Pregnancy massage in Cannock designed to ease discomfort and support relaxation for mums-to-be. Safe, tailored treatments from 12 weeks onwards.",
  path: "/womens-wellbeing/pregnancy-massage",
});

const suitableFor = [
  "Experiencing back, neck or shoulder discomfort",
  "Feeling tired or run down",
  "Experiencing swelling or tension",
  "Finding it difficult to relax",
  "Wanting time to focus on yourself",
];

const benefits = [
  "Relief from muscular discomfort",
  "Reduced tension and stress",
  "Improved relaxation",
  "Better sleep",
  "Support for circulation",
  "A sense of calm and wellbeing",
];

const faqItems = [
  {
    question: "When can I have a pregnancy massage?",
    answer: "Pregnancy massage is suitable from 12 weeks onwards.",
  },
  {
    question: "Is pregnancy massage safe?",
    answer: "Yes, it is specially adapted to ensure your comfort and safety throughout the treatment.",
  },
  {
    question: "Do I lie on my stomach?",
    answer: "No, you will be positioned comfortably so you can relax safely.",
  },
];

export default function PregnancyMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Pregnancy Massage",
      description:
        "Pregnancy massage in Cannock from 12 weeks onwards, tailored to ease discomfort, reduce tension and provide a safe, relaxing treatment for mums-to-be.",
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
          { label: "Women's Wellbeing", href: "/womens-wellbeing" },
          { label: "Pregnancy Massage" },
        ]}
      />

      <PageHero
        eyebrow="Pregnancy Massage"
        title="Pregnancy Massage in Cannock for Comfort and Relaxation"
        description="Pregnancy massage is a gentle, nurturing treatment designed to support your body during this special time. At Revive Holistic Therapies in Cannock, treatments are tailored to help ease physical discomfort, reduce tension and create a calm, relaxing experience for both you and your baby. Whether you are experiencing aches, tiredness or simply need time to relax, pregnancy massage offers a safe and supportive way to care for yourself."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Pregnancy Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Safe and supportive"
            title="Safe and tailored for mums-to-be"
            description="Your comfort and safety are always our priority."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Pregnancy massage is specially adapted so you can relax without the need to lie on your tummy. Positioning and techniques are carefully chosen to ensure you feel fully supported throughout your treatment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is suitable from 12 weeks onwards, and we will always take time to understand your needs before your session begins.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is pregnancy massage?"
            title="What is pregnancy massage?"
            description="Pregnancy massage is a specially adapted massage designed to support the physical and emotional changes that occur during pregnancy."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Using gentle, flowing techniques, the treatment focuses on easing tension, improving comfort and promoting relaxation.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The approach is always tailored to how you are feeling, ensuring a safe and calming experience.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is pregnancy massage suitable for?"
            description="Pregnancy massage is ideal if you are:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for expectant mothers from 12 weeks of pregnancy onwards.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of pregnancy massage"
            description="Pregnancy massage can help support both physical comfort and emotional wellbeing."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many mums-to-be find regular treatments helpful throughout pregnancy.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="Your treatment will begin with a short consultation to understand how you are feeling and any areas you would like to focus on."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            You will be positioned comfortably so you can fully relax throughout the session. The massage uses gentle techniques designed to ease tension and support your body during pregnancy.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The atmosphere is calm and unhurried, allowing you to enjoy a peaceful and restorative experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Pregnancy massage is available in 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This provides a complete and relaxing treatment experience tailored to your needs.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for pregnancy massage in Cannock?"
            description="At Revive Holistic Therapies, we provide a calm, professional and supportive environment where you can relax and feel cared for during your pregnancy."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments are always tailored to your comfort, with a focus on helping you feel more relaxed, supported and at ease.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for a personalised and reassuring experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for pregnancy massage in Cannock or Hednesford?"
            description="If you are searching for pregnancy massage in Cannock, Revive Holistic Therapies offers safe and relaxing treatments designed to support mums-to-be."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              { href: "/womens-wellbeing", label: "Women's Wellbeing" },
              { href: "/womens-wellbeing/peri-menopause-massage", label: "Peri / Menopause Massage" },
              { href: "/facials", label: "Facials" },
              { href: "/reflexology", label: "Reflexology" },
              { href: "/massage-treatments", label: "Massage Treatments" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Pregnancy massage in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">
          Take time to relax during your pregnancy
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are ready to ease tension, relax and enjoy time for yourself, book your pregnancy massage in Cannock today.
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
          title="Pregnancy massage FAQs"
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
          Book Pregnancy Massage
        </Link>
      </div>
    </div>
  );
}
