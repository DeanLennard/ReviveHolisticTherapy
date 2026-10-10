import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Facials Cannock | Relaxing & Skin Rejuvenating Treatments | Revive Holistic Therapies",
  description:
    "Facials in Cannock including Gua Sha, Rose, Neroli and mini facials. Relaxing treatments to refresh your skin and improve wellbeing.",
  path: "/facials",
});

const facialTreatments = [
  {
    title: "Gua Sha Facial",
    description:
      "A facial treatment that incorporates Gua Sha techniques to help stimulate circulation, reduce tension and promote a more refreshed appearance.",
    href: "/facials/gua-sha-facial",
  },
  {
    title: "Rose Facial",
    description:
      "A soothing facial using rose-based products to calm and nourish the skin, ideal for sensitive or tired skin.",
    href: "/facials/rose-facial",
  },
  {
    title: "Neroli Facial",
    description:
      "A refreshing facial designed to revitalise the skin while providing a relaxing treatment experience.",
    href: "/facials/neroli-facial",
  },
  {
    title: "Mini Facial",
    description:
      "A shorter treatment designed to give your skin a quick refresh while still providing a relaxing experience.",
    href: "/facials/mini-facial",
  },
  {
    title: "Recharge Facial",
    description:
      "A combined treatment that includes both facial care and massage elements, helping to refresh your skin while easing tension in the upper body.",
    href: "/facials/recharge-facial",
  },
  {
    title: "Facial Reflexology",
    description:
      "A gentle face and head-focused reflexology treatment for a calm, restorative wellbeing experience.",
    href: "/facials/facial-reflexology",
  },
];

const benefits = [
  "Refreshed and revitalised skin",
  "Improved circulation",
  "Reduced tension in the face and upper body",
  "Improved skin appearance",
  "Relaxation and stress relief",
  "Time to focus on yourself",
];

const faqItems = [
  {
    question: "Which facial should I choose?",
    answer: "Each facial offers different benefits. You can choose based on your skin needs or contact us for advice.",
  },
  {
    question: "Are facials suitable for all skin types?",
    answer: "Yes, treatments are tailored to suit your skin.",
  },
  {
    question: "How often should I have a facial?",
    answer: "Many clients benefit from regular treatments to maintain healthy skin.",
  },
];

export default function FacialsPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Facial Treatments",
      description:
        "Facials in Cannock including Gua Sha, Rose, Neroli, mini facials and recharge facials for skin refreshment and relaxation.",
      url: "https://new.reviveholistictherapies.com/facials",
      about: facialTreatments.map((item) => ({
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Facials" }]} />

      <PageHero
        eyebrow="Facials"
        title="Facial Treatments in Cannock for Relaxation and Skin Care"
        description="At Revive Holistic Therapies, our facials are designed to do more than just care for your skin. Each treatment combines professional skincare with a relaxing experience, helping you feel refreshed, revitalised and more balanced. Whether you are looking to improve your skin, unwind or enjoy time for yourself, our facials are tailored to your needs."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book a Facial
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Relaxation and skin care"
            title="Skincare and relaxation combined"
            description="Our facial treatments are designed to support both skin health and overall wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Each session includes a combination of cleansing, massage and carefully selected products, helping to refresh the skin while creating a calming and restorative experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments are tailored to suit your skin type and preferences, ensuring you get the most from your appointment.
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
          eyebrow="Facial treatments"
          title="Our facial treatments"
          description="Explore our range of facial treatments available in Cannock, each designed to refresh your skin and provide a relaxing experience."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {facialTreatments.map((item) => (
            <article key={item.title} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-3xl font-semibold text-[color:var(--color-heading)]">{item.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{item.description}</p>
              <Link
                href={item.href}
                className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
              >
                {item.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for facials in Cannock?"
            description="At Revive Holistic Therapies, our facials are designed to be both effective and relaxing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Each treatment is tailored to your skin and your needs, creating a personalised experience that supports both your appearance and wellbeing.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for treatments that are professional, calming and results-focused.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for facials in Cannock or Hednesford?"
            description="If you are searching for facials in Cannock, Revive Holistic Therapies offers a range of treatments designed to refresh your skin and help you relax."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Facials in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Refresh your skin and relax</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          Whether you are looking to improve your skin or simply enjoy a relaxing treatment, our facials are designed to help you feel your best. Book your appointment today.
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
          description="Browse the main facial options and connected category pages."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "/facials/gua-sha-facial", label: "Gua Sha Facial" },
            { href: "/facials/rose-facial", label: "Rose Facial" },
            { href: "/facials/neroli-facial", label: "Neroli Facial" },
            { href: "/facials/mini-facial", label: "Mini Facial" },
            { href: "/facials/recharge-facial", label: "Recharge Facial" },
            { href: "/facials/facial-reflexology", label: "Facial Reflexology" },
            { href: "/womens-wellbeing", label: "Women's Wellbeing" },
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
          title="Facials FAQs"
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
          Book a Facial
        </Link>
      </div>
    </div>
  );
}
