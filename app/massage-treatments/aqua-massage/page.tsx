import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Aqua Massage Cannock | Relaxing Water-Based Massage Therapy | Revive Holistic Therapies",
  description:
    "Experience aqua massage in Cannock using warm water cushions to relax muscles and ease tension. A unique, soothing full-body treatment.",
  path: "/massage-treatments/aqua-massage",
});

const suitableFor = [
  "Experience back discomfort or stiffness",
  "Have tension in the neck or shoulders",
  "Prefer a gentler massage experience",
  "Feel uncomfortable lying on a standard massage couch",
  "Want a deeply relaxing, supportive treatment",
];

const benefits = [
  "Reduced muscle tension",
  "Improved comfort and relaxation",
  "Gentle support for the body",
  "Improved circulation",
  "Relief from stiffness or strain",
  "A calming, weightless sensation",
];

const faqItems = [
  {
    question: "What is aqua massage different from normal massage?",
    answer: "Aqua massage uses warm water cushions to support the body, making it more comfortable and gentle than traditional massage.",
  },
  {
    question: "Is aqua massage suitable for back pain?",
    answer: "It can help ease discomfort by supporting the body and reducing pressure on joints and muscles.",
  },
  {
    question: "Do you get wet during aqua massage?",
    answer: "No, you remain dry as the water is contained within the cushions.",
  },
];

export default function AquaMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Aqua Massage",
      description:
        "Aqua massage in Cannock using warm water cushions to support the body, ease tension and provide a gentle, deeply relaxing full-body treatment.",
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
          { label: "Heat Therapy Massage", href: "/massage-treatments/heat-therapy-massage" },
          { label: "Aqua Massage" },
        ]}
      />

      <PageHero
        eyebrow="Aqua Massage"
        title="Aqua Massage in Cannock for Gentle, Full-Body Relaxation"
        description="Aqua massage offers a unique and deeply relaxing experience where your body is supported on warm water cushions while massage techniques are applied. At Revive Holistic Therapies in Cannock, this treatment is designed to ease tension, support comfort and create a soothing, weightless feeling. Ideal if you are looking for a gentle yet effective treatment, aqua massage allows your body to fully relax while maintaining natural alignment."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Aqua Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is aqua massage?"
            title="What is aqua massage?"
            description="Aqua massage is a treatment where you lie comfortably on specially designed warm water cushions."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            These cushions support your entire body, allowing you to relax without pressure on joints or muscles.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The water creates a gentle, supportive surface while massage techniques are applied, helping the body relax more easily and comfortably. This makes aqua massage a great option for those who may find traditional massage uncomfortable or want a more soothing experience.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is aqua massage suitable for?"
            description="Aqua massage is ideal if you:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is particularly beneficial for those who want a comfortable and calming experience without intense pressure.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of aqua massage"
            description="Aqua massage offers a range of benefits."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The combination of warmth and support makes this treatment especially soothing for both body and mind.
          </p>
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
            You will then lie comfortably on warm water cushions that support your body in a natural position.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            As the massage begins, you will feel the gentle support of the water combined with soothing massage techniques. The experience is deeply relaxing and designed to help you feel at ease from the moment you begin.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients find this treatment especially calming and easy to relax into.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Aqua massage is available in 60 minutes and 90 minutes."
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
            title="Why choose Revive Holistic Therapies for aqua massage in Cannock?"
            description="At Revive Holistic Therapies, we focus on treatments that are tailored to your comfort and wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Aqua massage provides a unique experience that combines relaxation, support and gentle therapy in a calm and welcoming setting.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that feel both professional and deeply relaxing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for aqua massage in Cannock or Hednesford?"
            description="If you are searching for aqua massage in Cannock, Revive Holistic Therapies offers a unique treatment designed to help you relax and ease tension in a gentle and supportive way."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
              { href: "/massage-treatments/hot-stone-massage", label: "Hot Stone Massage" },
              { href: "/massage-treatments/warm-bamboo-massage", label: "Warm Bamboo Massage" },
              { href: "/massage-treatments/lomi-lomi-massage", label: "Lomi Lomi Massage" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Book your aqua massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Experience a different kind of massage</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are looking for a gentle, supportive and deeply relaxing treatment, aqua massage offers a unique experience. Book your appointment today and enjoy a new way to relax and unwind.
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
          title="Aqua massage FAQs"
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
          Book Aqua Massage
        </Link>
      </div>
    </div>
  );
}
