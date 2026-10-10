import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reiki Cannock | Relaxing Energy Therapy for Stress & Wellbeing",
  description:
    "Reiki in Cannock to promote relaxation, reduce stress and support emotional wellbeing. A gentle, calming treatment at Revive Holistic Therapies.",
  path: "/womens-wellbeing/reiki",
});

const suitableFor = [
  "Feeling stressed or overwhelmed",
  "Experiencing anxiety or emotional tension",
  "Struggling to relax or switch off",
  "Feeling mentally or physically drained",
  "Looking for a gentle and calming treatment",
];

const benefits = [
  "Deep relaxation",
  "Reduced stress and anxiety",
  "Improved emotional balance",
  "A greater sense of calm",
  "Improved sleep",
  "Support for overall wellbeing",
];

const faqItems = [
  {
    question: "What does Reiki feel like?",
    answer: "Most people experience it as deeply relaxing and calming.",
  },
  {
    question: "Do I need to believe in Reiki?",
    answer: "No, many clients simply enjoy it as a relaxation treatment.",
  },
  {
    question: "Is Reiki safe?",
    answer: "Yes, it is a gentle and non-invasive treatment.",
  },
];

export default function ReikiPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Reiki",
      description:
        "Reiki in Cannock offering a gentle, calming treatment designed to encourage relaxation, reduce stress and support overall wellbeing.",
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
          { label: "Reiki" },
        ]}
      />

      <PageHero
        eyebrow="Reiki"
        title="Reiki in Cannock for Relaxation and Balance"
        description="Reiki is a gentle, non-invasive treatment designed to promote relaxation and support overall wellbeing. At Revive Holistic Therapies in Cannock, Reiki sessions provide a calm and peaceful experience, helping you feel more balanced, relaxed and at ease. Whether you are feeling stressed, overwhelmed or simply need time to switch off, Reiki offers a soothing and restorative treatment."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Reiki
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is Reiki?"
            title="What is Reiki?"
            description="Reiki is a relaxation-focused treatment where the therapist places their hands lightly on or just above the body."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The aim is to create a calming environment that allows the body and mind to relax.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            While Reiki is often described as an energy-based therapy, many clients simply experience it as a deeply calming and restorative treatment that helps them feel more balanced.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is Reiki suitable for?"
            description="Reiki is ideal if you are:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be enjoyed as part of a regular wellbeing routine.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of Reiki"
            description="Reiki is often chosen for its calming and restorative effects."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients find Reiki helps them feel more grounded and at ease.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your Reiki treatment"
            description="Your treatment will begin with a short consultation to understand how you are feeling."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            You will then lie comfortably while the therapist gently places their hands on or near different areas of the body. The treatment is quiet and unhurried, allowing you to fully relax.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients experience a sense of calm during the session, and some drift into a deeply relaxed state.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Reiki is available in 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This allows for a full and relaxing treatment experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for Reiki in Cannock?"
            description="At Revive Holistic Therapies, we provide a calm, welcoming and professional environment where you can fully relax."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Reiki treatments are delivered with care and attention to your comfort, helping you feel supported and at ease throughout your session.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that help them relax, reset and feel more balanced.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for Reiki in Cannock or Hednesford?"
            description="If you are searching for Reiki in Cannock, Revive Holistic Therapies offers calming treatments designed to support relaxation and wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/womens-wellbeing", label: "Women's Wellbeing" },
              { href: "/reflexology", label: "Reflexology" },
              { href: "/holistic-therapies", label: "Holistic Therapies" },
              { href: "/massage-treatments", label: "Massage Treatments" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Reiki in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to relax and reset</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to slow down, relax and enjoy a calming treatment, book your Reiki session in Cannock today.
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
          title="Reiki FAQs"
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
          Book Reiki
        </Link>
      </div>
    </div>
  );
}
