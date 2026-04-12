import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hopi Ear Candles Cannock | Relaxing Ear Candling Treatment",
  description:
    "Hopi ear candling in Cannock to promote relaxation and support comfort in the ear, nose and throat area. Book your treatment today.",
  path: "/holistic-therapies/hopi-ear-candles",
});

const suitableFor = [
  "Feel tension or discomfort in the ear area",
  "Experience sinus congestion",
  "Feel pressure in the head",
  "Are looking for a relaxing treatment",
  "Want a calming and different therapy experience",
];

const benefits = [
  "A calming and soothing experience",
  "Reduced tension in the head area",
  "A feeling of lightness and clarity",
  "Improved relaxation",
  "Support for overall wellbeing",
];

const faqItems = [
  {
    question: "Is Hopi ear candling safe?",
    answer: "Yes, when performed by a trained therapist it is a gentle and relaxing treatment.",
  },
  {
    question: "Does it hurt?",
    answer: "No, most people find it warm and soothing.",
  },
  {
    question: "What does it feel like?",
    answer: "You may feel a gentle warmth and a calming sensation.",
  },
];

export default function HopiEarCandlesPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hopi Ear Candles",
      description:
        "Hopi ear candling in Cannock offering a warm, soothing treatment designed to promote relaxation and support comfort in the ear, nose and throat area.",
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
          { label: "Hopi Ear Candles" },
        ]}
      />

      <PageHero
        eyebrow="Hopi Ear Candles"
        title="Hopi Ear Candles in Cannock for Relaxation and Comfort"
        description="Hopi ear candling is a soothing and relaxing treatment designed to support comfort in the ear, nose and throat area while promoting overall relaxation. At Revive Holistic Therapies in Cannock, this treatment is delivered in a calm and gentle way, helping you feel relaxed and refreshed. Often combined with a lymphatic drainage facial massage, it provides a deeper sense of relaxation and wellbeing."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Hopi Ear Candles
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is Hopi ear candling?"
            title="What is Hopi ear candling?"
            description="Hopi ear candling, also known as thermo auricular therapy, involves placing a specially designed hollow candle gently into the ear."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The candle creates a light suction effect while providing a warm and calming sensation.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is designed to be soothing and relaxing, with many clients enjoying the gentle warmth and overall experience.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="Hopi ear candling may be suitable if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            If you are unsure whether this treatment is right for you, please get in touch.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of Hopi ear candling"
            description="Hopi ear candling is often chosen for both relaxation and comfort."
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
            You will lie comfortably while the candles are used gently in each ear. The experience is warm, calming and quiet, allowing you to relax fully.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is often combined with a lymphatic drainage facial massage, enhancing the overall experience and helping you feel even more relaxed.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Hopi ear candling is available in 45 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This includes both the ear candling and additional relaxation elements.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for Hopi ear candling in Cannock?"
            description="At Revive Holistic Therapies, treatments are delivered in a calm, professional and supportive environment."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We focus on ensuring your comfort throughout the session, helping you feel relaxed and at ease.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that offer both relaxation and a unique experience.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for Hopi ear candles in Cannock or Hednesford?"
            description="If you are searching for Hopi ear candling in Cannock, Revive Holistic Therapies offers relaxing treatments designed to help you unwind and feel refreshed."
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
              { href: "/holistic-therapies/crystal-therapy", label: "Crystal Therapy" },
              { href: "/womens-wellbeing/reiki", label: "Reiki" },
              { href: "/reflexology", label: "Reflexology" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Hopi ear candles in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Relax and feel refreshed</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are looking for a soothing and relaxing treatment, book your Hopi ear candling session in Cannock today.
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
          title="Hopi ear candles FAQs"
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
          Book Hopi Ear Candles
        </Link>
      </div>
    </div>
  );
}
