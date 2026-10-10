import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "De-Stress Massage Cannock | Full Body Relaxation for Men",
  description:
    "De-stress body massage in Cannock for men. A relaxing full-body treatment to ease tension, reduce stress and help you unwind.",
  path: "/mens-wellbeing/de-stress-body-massage",
});

const suitableFor = [
  "Feel stressed or overwhelmed",
  "Have tension from work or daily life",
  "Feel physically or mentally tired",
  "Want a full-body relaxing treatment",
  "Need time to switch off",
];

const benefits = [
  "Reduced stress and tension",
  "Improved relaxation",
  "Relief from everyday aches",
  "Improved circulation",
  "Better overall wellbeing",
  "A sense of calm and reset",
];

const faqItems = [
  {
    question: "Is this massage deep or gentle?",
    answer: "It is primarily designed for relaxation but can be adjusted to your preference.",
  },
  {
    question: "Do I need to choose pressure beforehand?",
    answer: "No, this can be adjusted during your treatment.",
  },
  {
    question: "Is it suitable if I’m new to massage?",
    answer: "Yes, this is a great entry-level treatment.",
  },
];

export default function DeStressBodyMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "De-Stress Body Massage",
      description:
        "Full-body de-stress massage in Cannock for men, designed to ease tension, reduce stress and provide a calming, restorative treatment experience.",
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
          { label: "De-Stress Body Massage" },
        ]}
      />

      <PageHero
        eyebrow="De-Stress Body Massage"
        title="De-Stress Body Massage in Cannock"
        description="De-stress body massage is a full-body treatment designed to help you switch off, relax and ease tension. At Revive Holistic Therapies in Cannock, this massage works across the back, legs, arms, neck and shoulders to provide a calming and restorative experience. Ideal if you are feeling stressed, tired or run down, this treatment helps you take time out and reset."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book De-Stress Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is de-stress massage?"
            title="What is a de-stress body massage?"
            description="This is a full-body massage designed to promote relaxation and reduce tension."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Using flowing techniques, the treatment focuses on helping the body unwind and the mind switch off.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Unlike more targeted treatments, this massage is designed to provide a balanced, overall experience that leaves you feeling refreshed and relaxed.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="De-stress body massage is ideal if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is particularly suited to those with busy lifestyles or demanding jobs.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of de-stress massage"
            description="This treatment offers a range of benefits."
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
            The massage will then work across the full body using smooth, flowing movements designed to ease tension and promote relaxation. Pressure can be adjusted to suit your preference.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The environment is calm and quiet, allowing you to fully switch off during the session.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="De-stress body massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow for a more complete and relaxing experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for massage in Cannock?"
            description="At Revive Holistic Therapies, treatments are tailored to your needs."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Whether you are looking to relax, reduce tension or simply take time out, your session will be adapted to suit you.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that are professional, straightforward and effective.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for a relaxing massage in Cannock or Hednesford?"
            description="If you are searching for a de-stress massage in Cannock, Revive Holistic Therapies offers full-body treatments designed to help you relax and unwind."
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
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">De-stress massage in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to unwind</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are feeling stressed, tired or in need of a break, book your de-stress body massage in Cannock today.
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
          title="De-stress massage FAQs"
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
          Book De-Stress Massage
        </Link>
      </div>
    </div>
  );
}
