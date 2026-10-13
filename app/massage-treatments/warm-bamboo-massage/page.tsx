import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";
import { isServiceAvailable } from "@/lib/service-availability";

export const metadata = buildMetadata({
  title: "Warm Bamboo Massage Cannock | Deep Relaxation & Muscle Relief | Revive Holistic Therapies",
  description:
    "Experience warm bamboo massage in Cannock to ease muscle tension and improve circulation. A warming, revitalising treatment for relaxation and wellbeing.",
  path: "/massage-treatments/warm-bamboo-massage",
});

const suitableFor = [
  "Experiencing muscle tension or tightness",
  "Looking for a deeper massage with a relaxing feel",
  "Wanting a treatment that feels both invigorating and calming",
  "Feeling physically tired or run down",
  "Interested in trying a different type of massage",
];

const benefits = [
  "Relief from muscular tension",
  "Improved circulation",
  "Deeper muscle relaxation",
  "A revitalising yet calming experience",
  "Improved sense of wellbeing",
  "A unique and refreshing treatment",
];

const faqItems = [
  {
    question: "What is bamboo massage used for?",
    answer: "It helps relieve muscle tension, improve circulation and provide a relaxing yet revitalising experience.",
  },
  {
    question: "Is bamboo massage deep or relaxing?",
    answer: "It can be both. The pressure can be adjusted to suit your preference.",
  },
  {
    question: "Is it suitable for everyone?",
    answer: "Yes, it is suitable for most people and can be tailored to your comfort level.",
  },
];

export default function WarmBambooMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Warm Bamboo Massage",
      description:
        "Warm bamboo massage in Cannock using heated bamboo tools to ease tension, support circulation and create a relaxing yet revitalising treatment experience.",
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
          { label: "Warm Bamboo Massage" },
        ]}
      />

      <PageHero
        eyebrow="Warm Bamboo Massage"
        title="Warm Bamboo Massage in Cannock for Relaxation and Revitalisation"
        description="Warm bamboo massage is a unique and deeply relaxing treatment that combines massage techniques with the use of heated bamboo tools. At Revive Holistic Therapies in Cannock, this treatment is designed to ease muscle tension, improve circulation and leave you feeling both relaxed and revitalised. The warmth of the bamboo helps muscles soften while the flowing techniques create a soothing and refreshing experience."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Warm Bamboo Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is warm bamboo massage?"
            title="What is warm bamboo massage?"
            description="Warm bamboo massage uses smooth bamboo tools that are gently heated and used during the treatment to apply pressure and perform flowing massage movements."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The bamboo tools allow for a deeper, more even pressure while the warmth helps muscles relax more quickly.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This creates a treatment that feels both invigorating and deeply calming at the same time.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is warm bamboo massage suitable for?"
            description="Warm bamboo massage is ideal if you are:"
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
            title="Benefits of warm bamboo massage"
            description="Warm bamboo massage offers a range of benefits for both body and mind."
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
            description="Your treatment will begin with a short consultation to understand your needs and preferences."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Heated bamboo tools will then be used alongside massage techniques to create a smooth, flowing treatment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The warmth of the bamboo helps the body relax while the techniques work into areas of tension. The experience is both soothing and energising, leaving you feeling refreshed and balanced.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Warm bamboo massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow for a more complete full-body treatment and a deeper level of relaxation.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for bamboo massage in Cannock?"
            description="At Revive Holistic Therapies, we offer treatments that are both professional and personalised."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Warm bamboo massage is tailored to your needs, ensuring the right balance of pressure, warmth and technique.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for a calm, welcoming and high-quality treatment experience.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for bamboo massage in Cannock or Hednesford?"
            description="If you are searching for warm bamboo massage in Cannock, Revive Holistic Therapies offers a unique and relaxing treatment designed to help ease tension and improve wellbeing."
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
              { href: "/massage-treatments/aqua-massage", label: "Aqua Massage" },
              { href: "/massage-treatments/lomi-lomi-massage", label: "Lomi Lomi Massage" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
              { href: "/price-list", label: "Price List" },
              { href: "/contact", label: "Contact" },
              { href: "/booking", label: "Booking" },
            ]
              .filter((item) => item.href !== "/massage-treatments/lomi-lomi-massage" || isServiceAvailable("lomi-lomi-massage"))
              .map((item) => (
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your warm bamboo massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Try something different</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to experience a unique and deeply relaxing treatment, book your warm bamboo massage in Cannock today.
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
          title="Warm bamboo massage FAQs"
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
          Book Warm Bamboo Massage
        </Link>
      </div>
    </div>
  );
}
