import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Indian Head Massage Cannock | Head, Neck & Shoulder Massage | Revive Holistic Therapies",
  description:
    "Indian head massage in Cannock to relieve tension in the head, neck and shoulders. A relaxing treatment to reduce stress and improve wellbeing.",
  path: "/massage-treatments/indian-head-massage",
});

const suitableFor = [
  "Experience tension in the neck or shoulders",
  "Suffer from stress or mental fatigue",
  "Spend long periods sitting or working at a desk",
  "Experience headaches or tightness in the head",
  "Want a shorter, focused treatment",
];

const benefits = [
  "Relief from tension in the head, neck and shoulders",
  "Reduced stress and mental fatigue",
  "Improved relaxation",
  "Improved circulation in the scalp",
  "Support for headache relief",
  "A calming and refreshing experience",
];

const faqItems = [
  {
    question: "Do I need to remove clothing for Indian head massage?",
    answer: "No, this treatment can be performed comfortably without the need to fully undress.",
  },
  {
    question: "Can Indian head massage help with headaches?",
    answer: "It may help reduce tension that contributes to headaches.",
  },
  {
    question: "Is it suitable if I am short on time?",
    answer: "Yes, it is a great option for a shorter, focused treatment.",
  },
];

export default function IndianHeadMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Indian Head Massage",
      description:
        "Indian head massage in Cannock focused on the scalp, head, neck and shoulders to help reduce tension, calm the mind and support overall wellbeing.",
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
          { label: "Indian Head Massage" },
        ]}
      />

      <PageHero
        eyebrow="Indian Head Massage"
        title="Indian Head Massage in Cannock for Stress Relief and Relaxation"
        description="Indian head massage is a deeply relaxing treatment that focuses on the scalp, head, neck and shoulders. At Revive Holistic Therapies in Cannock, this treatment is designed to ease tension, calm the mind and help you fully unwind. Ideal for those who carry stress in the upper body or spend long hours sitting at a desk, this treatment provides a simple yet effective way to relax and reset."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Indian Head Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is Indian head massage?"
            title="What is Indian head massage?"
            description="Indian head massage is a treatment that concentrates on areas where tension commonly builds up, including the scalp, neck and shoulders."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Using a combination of massage techniques, the treatment helps to release tightness, improve circulation and promote relaxation. It is typically performed with you seated or lying comfortably, depending on your preference.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is both relaxing and effective, making it a popular choice for those looking to relieve stress and tension quickly.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is Indian head massage suitable for?"
            description="Indian head massage is ideal if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be adapted to your comfort level.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of Indian head massage"
            description="Indian head massage offers a range of benefits."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is particularly beneficial for those with busy or demanding lifestyles.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your treatment"
            description="Your treatment will begin with a short consultation to understand your needs and areas of tension."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The massage will then focus on the scalp, neck and shoulders using a variety of techniques designed to release tightness and promote relaxation. Pressure can be adjusted throughout the session to ensure your comfort.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients find this treatment deeply calming, often leaving feeling lighter, clearer and more relaxed.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Indian head massage is available in 30 minutes and 60 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This makes it a great option if you are short on time but still want to feel the benefits of a professional treatment.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for Indian head massage in Cannock?"
            description="At Revive Holistic Therapies, treatments are always tailored to your needs."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We take the time to understand where you hold tension and adapt the treatment accordingly.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for treatments that are professional, effective and designed to help them feel better both physically and mentally.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for Indian head massage in Cannock or Hednesford?"
            description="If you are searching for Indian head massage in Cannock, Revive Holistic Therapies offers relaxing treatments designed to ease tension and help you unwind."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments", label: "Massage Treatments" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
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

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Book your Indian head massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Relax your mind and release tension</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are feeling stressed, tense or mentally fatigued, Indian head massage offers a simple and effective way to relax. Book your appointment today.
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
          title="Indian head massage FAQs"
          description="A few quick answers before you book."
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
          Book Indian Head Massage
        </Link>
      </div>
    </div>
  );
}
