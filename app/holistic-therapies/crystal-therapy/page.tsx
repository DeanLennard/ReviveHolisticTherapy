import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crystal Therapy Cannock | Relaxing Holistic Treatment",
  description:
    "Crystal therapy in Cannock designed to promote relaxation, reduce stress and support overall wellbeing. A calming holistic treatment.",
  path: "/holistic-therapies/crystal-therapy",
});

const suitableFor = [
  "Feel stressed or overwhelmed",
  "Are looking for a gentle, calming treatment",
  "Want to relax both mentally and physically",
  "Feel emotionally drained",
  "Enjoy holistic or wellbeing treatments",
];

const benefits = [
  "Deep relaxation",
  "Reduced stress and tension",
  "Improved sense of calm",
  "Emotional balance",
  "Time to switch off and reset",
  "A peaceful and soothing experience",
];

const faqItems = [
  {
    question: "What does crystal therapy do?",
    answer: "It helps promote relaxation and a sense of calm.",
  },
  {
    question: "Do I need to believe in it?",
    answer: "No, many clients simply enjoy it as a relaxing experience.",
  },
  {
    question: "Is it safe?",
    answer: "Yes, it is a gentle and non-invasive treatment.",
  },
];

export default function CrystalTherapyPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Crystal Therapy",
      description:
        "Crystal therapy in Cannock designed to create a calm, relaxing treatment experience that supports overall wellbeing and emotional balance.",
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
          { label: "Holistic Therapies", href: "/holistic-therapies" },
          { label: "Crystal Therapy" },
        ]}
      />

      <PageHero
        eyebrow="Crystal Therapy"
        title="Crystal Therapy in Cannock for Relaxation and Balance"
        description="Crystal therapy is a gentle, calming treatment designed to support relaxation and overall wellbeing. At Revive Holistic Therapies in Cannock, this treatment uses carefully placed crystals to create a peaceful and restorative experience. Whether you are feeling stressed, overwhelmed or simply in need of time to relax, crystal therapy offers a soothing way to unwind."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Crystal Therapy
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is crystal therapy?"
            title="What is crystal therapy?"
            description="Crystal therapy is a holistic treatment that involves placing crystals on and around the body during a session."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The aim is to create a calming environment that supports relaxation and allows the body and mind to unwind.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            While often associated with energy-based approaches, many clients simply experience crystal therapy as a deeply relaxing and peaceful treatment.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is crystal therapy suitable for?"
            description="Crystal therapy is ideal if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be enjoyed as part of a regular self-care routine.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of crystal therapy"
            description="Crystal therapy is often chosen for its calming and restorative effects."
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
            description="Your treatment will begin with a short consultation to understand how you are feeling."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            You will then lie comfortably while crystals are placed on and around your body. The session is quiet and unhurried, allowing you to fully relax.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients experience a deep sense of calm, and some drift into a restful state during the treatment.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Crystal therapy is available in 60 minutes."
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
            title="Why choose Revive Holistic Therapies for crystal therapy in Cannock?"
            description="At Revive Holistic Therapies, we provide a calm, welcoming and professional environment where you can fully relax."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments are delivered with care and attention to your comfort, helping you feel supported and at ease throughout your session.
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
            title="Looking for crystal therapy in Cannock or Hednesford?"
            description="If you are searching for crystal therapy in Cannock, Revive Holistic Therapies offers calming treatments designed to support relaxation and wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/holistic-therapies", label: "Holistic Therapies" },
              { href: "/womens-wellbeing/reiki", label: "Reiki" },
              { href: "/reflexology", label: "Reflexology" },
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

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Crystal therapy in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Relax and rebalance</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are ready to slow down and enjoy a calming treatment, book your crystal therapy session in Cannock today.
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
          title="Crystal therapy FAQs"
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
          Book Crystal Therapy
        </Link>
      </div>
    </div>
  );
}
