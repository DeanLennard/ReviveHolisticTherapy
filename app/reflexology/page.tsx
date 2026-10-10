import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Reflexology Cannock | Relaxing Foot Therapy for Wellbeing | Revive Holistic Therapies",
  description:
    "Experience reflexology in Cannock to reduce stress, improve wellbeing and promote relaxation. A calming foot treatment tailored to you.",
  path: "/reflexology",
});

const suitableFor = [
  "Feeling stressed or overwhelmed",
  "Struggling to relax",
  "Feeling tired or run down",
  "Looking for a gentle, non-invasive treatment",
  "Wanting to improve your sense of wellbeing",
];

const benefits = [
  "Reduced stress and tension",
  "Improved relaxation",
  "A greater sense of balance",
  "Improved circulation",
  "Support for overall wellbeing",
  "Time to switch off and unwind",
];

const faqItems = [
  {
    question: "What does reflexology do?",
    answer: "It helps promote relaxation and support overall wellbeing by applying pressure to points on the feet.",
  },
  {
    question: "Is reflexology painful?",
    answer: "No, it is usually very gentle and relaxing.",
  },
  {
    question: "How will I feel after reflexology?",
    answer: "Most people feel calm, relaxed and sometimes slightly sleepy.",
  },
];

export default function ReflexologyPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Reflexology",
      description:
        "Reflexology in Cannock using gentle pressure on specific points of the feet to encourage relaxation, reduce stress and support overall wellbeing.",
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reflexology" }]} />

      <PageHero
        eyebrow="Reflexology"
        title="Foot Reflexology in Cannock for Relaxation and Wellbeing"
        description="Our traditional foot reflexology treatment focuses on applying gentle pressure to specific points on the feet. It is designed to help you unwind, reduce stress and restore a sense of balance in both body and mind."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Reflexology
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is reflexology?"
            title="What is reflexology?"
            description="Reflexology is based on the idea that different areas of the feet correspond to different parts of the body."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            By applying pressure to specific points, the treatment aims to encourage relaxation and support the body&apos;s natural balance.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            While reflexology is often associated with holistic therapy, many people simply enjoy it as a deeply relaxing and calming experience that helps them switch off from daily stress.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Looking for a face and head-focused experience instead? Explore our <Link href="/facials/facial-reflexology" className="font-semibold text-[color:var(--color-accent)] underline">facial reflexology</Link> treatment.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is reflexology suitable for?"
            description="Reflexology is ideal if you are:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be enjoyed as a standalone treatment or as part of a regular wellbeing routine.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of reflexology"
            description="Reflexology is often chosen for its calming and restorative effects."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Many clients find reflexology to be one of the most relaxing treatments available.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment experience"
            title="What to expect from your reflexology treatment"
            description="During your treatment, you will be asked to remove your shoes and socks and relax in a comfortable position."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The therapist will then apply pressure to different areas of your feet using a range of techniques.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The treatment is typically very relaxing, and many clients find themselves drifting off during the session. Afterwards, you are likely to feel calm, refreshed and more balanced.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Reflexology sessions typically last around 45 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This provides enough time for a complete and relaxing treatment.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for reflexology in Cannock?"
            description="At Revive Holistic Therapies, reflexology treatments are delivered in a calm and welcoming environment, with a focus on your comfort and wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that help them relax, reset and take time out from busy lives.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for reflexology in Cannock or Hednesford?"
            description="If you are searching for reflexology in Cannock, Revive Holistic Therapies offers a calming treatment designed to help you relax and improve your sense of wellbeing."
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
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
              { href: "/massage-treatments/indian-head-massage", label: "Indian Head Massage" },
              { href: "/womens-wellbeing", label: "Women\u2019s Wellbeing" },
              { href: "/holistic-therapies", label: "Holistic Therapies" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your reflexology session</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time to relax and rebalance</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to switch off, reduce stress and enjoy a deeply relaxing treatment, book your reflexology session in Cannock today.
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
          title="Reflexology FAQs"
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
          Book Reflexology
        </Link>
      </div>
    </div>
  );
}
