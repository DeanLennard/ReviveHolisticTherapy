import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Women's Wellbeing Treatments Cannock | Massage, Facials & Holistic Care | Revive Holistic Therapies",
  description:
    "Women's wellbeing treatments in Cannock including pregnancy massage, menopause support, facials and holistic therapies. Book your treatment today.",
  path: "/womens-wellbeing",
});

const treatmentCategories = [
  {
    title: "Pregnancy Massage",
    description:
      "A gentle and nurturing treatment designed for mums-to-be after the first trimester. Pregnancy massage helps ease discomfort, reduce tension and create a calming experience for both mother and baby.",
    href: "/womens-wellbeing/pregnancy-massage",
  },
  {
    title: "Peri / Menopause Massage",
    description:
      "A tailored treatment designed to support you through the different stages of menopause. This calming massage helps ease tension, reduce stress and promote a greater sense of balance and wellbeing.",
    href: "/womens-wellbeing/peri-menopause-massage",
  },
  {
    title: "Oncology Massage",
    description:
      "A gentle, adapted treatment designed to support those undergoing or recovering from cancer treatment. Focused on comfort, relaxation and care, this treatment is tailored to individual needs.",
    href: "/womens-wellbeing/oncology-massage",
  },
  {
    title: "Reiki",
    description:
      "A calming energy-based treatment designed to promote relaxation and balance. Reiki can help reduce stress and support emotional wellbeing.",
    href: "/womens-wellbeing/reiki",
  },
  {
    title: "Facials",
    description:
      "Our facials are designed to refresh the skin while providing a relaxing treatment experience. Options include Gua Sha, Rose, Neroli and mini facials, all tailored to your skin and wellbeing.",
    href: "/facials",
  },
  {
    title: "Holistic Therapies",
    description:
      "Our holistic treatments include crystal therapy, Hopi ear candles and wellbeing packages, offering additional ways to support relaxation and balance.",
    href: "/holistic-therapies",
  },
];

const benefits = [
  "Reduced stress and tension",
  "Improved relaxation",
  "Support through hormonal changes",
  "Relief from physical discomfort",
  "Improved mood and balance",
  "Time to focus on yourself",
];

const faqItems = [
  {
    question: "What are women's wellbeing treatments?",
    answer: "They are treatments designed to support relaxation, balance and overall wellbeing at different stages of life.",
  },
  {
    question: "Are treatments tailored to me?",
    answer: "Yes, every treatment is adapted to your needs and preferences.",
  },
  {
    question: "Can I combine treatments?",
    answer: "Yes, some treatments can be combined or booked as part of a package.",
  },
];

export default function WomensWellbeingPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Women's Wellbeing Treatments",
      description:
        "Women's wellbeing treatments in Cannock including pregnancy massage, menopause support, facials and holistic therapies.",
      url: `${site.domain}/womens-wellbeing`,
      about: treatmentCategories.map((item) => ({
        "@type": "Service",
        name: item.title,
      })),
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Women's Wellbeing" }]} />

      <PageHero
        eyebrow="Women's Wellbeing"
        title="Supporting Women's Wellbeing in Cannock"
        description="At Revive Holistic Therapies, we offer a range of treatments designed to support women at different stages of life. From pregnancy massage and menopause support to facials and holistic therapies, each treatment is tailored to help you feel relaxed, cared for and more balanced. Whether you are looking for time to unwind, support through physical or emotional changes, or simply a moment to focus on yourself, our treatments are designed with your wellbeing in mind."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Your Treatment
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="A personalised approach"
            title="A personalised approach to your wellbeing"
            description="Every woman's needs are different, and your treatment should reflect that."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            At Revive Holistic Therapies, we take time to understand how you are feeling and what you need from your appointment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments are delivered in a calm, welcoming environment where you can fully relax and feel supported. Whether you are experiencing stress, fatigue, hormonal changes or simply need time for yourself, we are here to help.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We welcome clients from Cannock, Hednesford and surrounding areas.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2.1rem] border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="bg-white px-6 py-6">
              <p className="font-semibold text-[color:var(--color-heading)]">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Women's wellbeing treatments"
          title="Women's wellbeing treatments"
          description="Explore our range of treatments designed to support relaxation, balance and overall wellbeing."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {treatmentCategories.map((item) => (
            <article key={item.title} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-3xl font-semibold text-[color:var(--color-heading)]">{item.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{item.description}</p>
              <Link
                href={item.href}
                className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
              >
                {item.title === "Facials" ? "View Facials" : item.title === "Holistic Therapies" ? "Holistic Therapies" : item.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies?"
            description="At Revive Holistic Therapies, treatments are delivered with care, professionalism and attention to your individual needs."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We provide a calm and welcoming environment where you can relax and feel supported.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for treatments that are both personalised and focused on wellbeing.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Women's wellbeing treatments in Cannock and Hednesford"
            description="If you are looking for women&apos;s wellbeing treatments in Cannock, Revive Holistic Therapies offers a range of services designed to support relaxation, balance and overall wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Women&apos;s wellbeing in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Take time for your wellbeing</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          Whether you are looking for relaxation, support or simply time for yourself, we are here to help. Explore our treatments or book your appointment today.
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
          eyebrow="Useful links"
          title="Explore related treatments"
          description="Browse supportive treatments and category pages linked to women's wellbeing."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "/womens-wellbeing/pregnancy-massage", label: "Pregnancy Massage" },
            { href: "/womens-wellbeing/peri-menopause-massage", label: "Peri / Menopause Massage" },
            { href: "/womens-wellbeing/oncology-massage", label: "Oncology Massage" },
            { href: "/womens-wellbeing/reiki", label: "Reiki" },
            { href: "/facials", label: "Facials" },
            { href: "/holistic-therapies", label: "Holistic Therapies" },
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
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Women's wellbeing FAQs"
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
          Book Your Treatment
        </Link>
      </div>
    </div>
  );
}
