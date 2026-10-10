import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Menopause Massage Cannock | Peri & Menopause Support Treatments | Revive Holistic Therapies",
  description:
    "Peri and menopause massage in Cannock designed to reduce stress, ease tension and support wellbeing during hormonal changes. Book today.",
  path: "/womens-wellbeing/peri-menopause-massage",
});

const suitableFor = [
  "Increased stress or anxiety",
  "Tension or discomfort in the body",
  "Fatigue or low energy",
  "Difficulty relaxing or sleeping",
  "Changes in mood or emotional balance",
];

const benefits = [
  "Reduced stress and tension",
  "Improved relaxation",
  "Increased sense of calm",
  "Support for emotional balance",
  "Improved sleep",
  "A feeling of being nurtured and cared for",
];

const faqItems = [
  {
    question: "What is menopause massage?",
    answer: "It is a tailored treatment designed to support relaxation and wellbeing during peri and menopause.",
  },
  {
    question: "Can it help with symptoms?",
    answer: "It may help reduce stress, improve relaxation and support overall wellbeing.",
  },
  {
    question: "Is it suitable at all stages?",
    answer: "Yes, it can be adapted to suit you at any stage.",
  },
];

export default function PeriMenopauseMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Peri and Menopause Massage",
      description:
        "Peri and menopause massage in Cannock designed to ease tension, encourage relaxation and support emotional and physical wellbeing during hormonal changes.",
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
          { label: "Peri / Menopause Massage" },
        ]}
      />

      <PageHero
        eyebrow="Peri / Menopause Massage"
        title="Peri and Menopause Massage in Cannock"
        description="Peri and menopause can bring a range of physical and emotional changes that affect how you feel day to day. At Revive Holistic Therapies in Cannock, this tailored massage treatment is designed to support your wellbeing, helping you feel more relaxed, balanced and at ease. This is your time to slow down, reconnect and give your body the care and attention it needs."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Menopause Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="A supportive treatment"
            title="A treatment designed for your changing needs"
            description="Every woman experiences peri and menopause differently."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is designed to support you at any stage, whether you are just beginning to notice changes or are further along in your journey.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The massage is tailored to how you are feeling, combining gentle techniques, aromatherapy and targeted pressure where needed to create a calming and supportive experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is this treatment suitable for?"
            description="Peri and menopause massage is ideal if you are experiencing:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is suitable for women at any stage of peri or menopause and can be adapted to your needs.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of peri and menopause massage"
            description="This treatment is designed to support both physical and emotional wellbeing."
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
            The massage is gentle and supportive, using techniques designed to relax the body and calm the mind. Aromatherapy oils may be used to enhance the experience and promote a sense of balance.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            For a more complete experience, you can upgrade to a longer session which may include a lifting facial massage and scalp massage.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and options"
            title="Treatment duration and options"
            description="Peri and menopause massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The 90 minute option includes additional facial and scalp elements for a more complete and nurturing experience.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for menopause massage in Cannock?"
            description="At Revive Holistic Therapies, we provide a calm, understanding and supportive environment where you can feel comfortable and cared for."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments are always tailored to your needs, helping you feel more balanced, relaxed and supported during this stage of life.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for a personalised and professional approach to wellbeing.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for menopause massage in Cannock or Hednesford?"
            description="If you are searching for menopause massage in Cannock, Revive Holistic Therapies offers treatments designed to support your wellbeing during peri and menopause."
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
              { href: "/womens-wellbeing/pregnancy-massage", label: "Pregnancy Massage" },
              { href: "/facials", label: "Facials" },
              { href: "/womens-wellbeing/reiki", label: "Reiki" },
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

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Peri and menopause support</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to support your wellbeing</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are looking for a calming and supportive treatment during peri or menopause, book your massage in Cannock today and give yourself time to relax and reset.
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
          title="Peri and menopause massage FAQs"
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
          Book Menopause Massage
        </Link>
      </div>
    </div>
  );
}
