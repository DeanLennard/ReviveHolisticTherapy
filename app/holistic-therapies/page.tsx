import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Holistic Therapies Cannock | Crystal Therapy & Hopi Ear Candles | Revive Holistic Therapies",
  description:
    "Holistic therapies in Cannock including crystal therapy, Hopi ear candles and wellbeing treatments to support relaxation and balance.",
  path: "/holistic-therapies",
});

const therapies = [
  {
    title: "Crystal Therapy",
    description:
      "Crystal therapy is a gentle, energy-based treatment that uses crystals placed on and around the body to support relaxation and balance. Many clients find this treatment calming and restorative, helping them feel lighter and more at ease.",
    href: "/holistic-therapies/crystal-therapy",
  },
  {
    title: "Hopi Ear Candles",
    description:
      "Hopi ear candling is a soothing treatment designed to promote relaxation and support comfort in the ear, nose and throat area. Often combined with a lymphatic drainage facial massage, it provides a calming and refreshing experience.",
    href: "/holistic-therapies/hopi-ear-candles",
  },
  {
    title: "Auriculotherapy",
    description:
      "A complementary wellbeing treatment using gentle ear pressure points and optional ear seeds as part of a tailored appointment.",
    href: "/holistic-therapies/auriculotherapy",
  },
  {
    title: "Acupuncture",
    description:
      "Acupuncture is coming soon to Revive. Register your interest while treatment details and availability are finalised.",
    href: "/holistic-therapies/acupuncture",
  },
  {
    title: "Holistic Packages",
    description:
      "Our packages combine multiple treatments to provide a more complete wellbeing experience. These are ideal if you are looking to relax more deeply and enjoy a longer, more immersive session.",
    href: "/offers",
  },
];

const benefits = [
  "Reduced stress and tension",
  "Improved relaxation",
  "A greater sense of balance",
  "Improved mood",
  "Time to reconnect with yourself",
  "A calming and restorative experience",
];

const faqItems = [
  {
    question: "What are holistic therapies?",
    answer: "They are treatments designed to support overall wellbeing by focusing on both body and mind.",
  },
  {
    question: "Are holistic therapies suitable for everyone?",
    answer: "Yes, they are gentle and can be adapted to suit individual needs.",
  },
  {
    question: "Can I combine treatments?",
    answer: "Yes, holistic packages allow you to combine treatments for a more complete experience.",
  },
];

export default function HolisticTherapiesPage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Holistic Therapies",
      description:
        "Holistic therapies in Cannock including crystal therapy, Hopi ear candles and wellbeing treatments that support relaxation and balance.",
      url: "https://new.reviveholistictherapies.com/holistic-therapies",
      about: therapies.map((item) => ({
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
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Holistic Therapies" }]} />

      <PageHero
        eyebrow="Holistic Therapies"
        title="Holistic Therapies in Cannock for Relaxation and Balance"
        description="Holistic therapies focus on supporting your overall wellbeing by helping to restore balance in both body and mind. At Revive Holistic Therapies in Cannock, we offer a range of treatments designed to help you relax, reset and feel more in tune with yourself. Whether you are looking to reduce stress, improve your sense of balance or simply enjoy a calming treatment, our holistic therapies offer a gentle and supportive approach."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book a Treatment
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="A gentle approach"
            title="A gentle approach to wellbeing"
            description="Holistic therapies take a whole-body approach, focusing on how you feel physically, mentally and emotionally."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            These treatments are designed to complement your overall wellbeing routine and provide time to slow down and reconnect.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            At Revive Holistic Therapies, treatments are delivered in a calm and welcoming environment, with a focus on your comfort and relaxation.
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
          eyebrow="Holistic treatments"
          title="Our holistic therapies"
          description="Explore our range of holistic treatments available in Cannock."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {therapies.map((item) => (
            <article key={item.title} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-3xl font-semibold text-[color:var(--color-heading)]">{item.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{item.description}</p>
              <Link
                href={item.href}
                className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
              >
                {item.title === "Holistic Packages" ? "View Packages" : item.title === "Acupuncture" ? "Coming soon" : item.title}
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
            description="At Revive Holistic Therapies, we provide treatments in a calm, professional and welcoming environment."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Our approach is always tailored to your needs, helping you feel relaxed, supported and cared for.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit from Cannock, Hednesford and surrounding areas for treatments that combine professionalism with a gentle, holistic approach.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for holistic therapies in Cannock or Hednesford?"
            description="If you are searching for holistic therapies in Cannock, Revive Holistic Therapies offers a range of treatments designed to support relaxation and balance."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Holistic therapies in Cannock</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Relax, reset and rebalance</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are looking for a calming and supportive treatment, explore our holistic therapies and book your appointment today.
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
          description="Browse holistic therapies alongside connected wellbeing categories."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: "/holistic-therapies/crystal-therapy", label: "Crystal Therapy" },
            { href: "/holistic-therapies/hopi-ear-candles", label: "Hopi Ear Candles" },
            { href: "/holistic-therapies/auriculotherapy", label: "Auriculotherapy" },
            { href: "/holistic-therapies/acupuncture", label: "Acupuncture — coming soon" },
            { href: "/offers", label: "Packages" },
            { href: "/reflexology", label: "Reflexology" },
            { href: "/massage-treatments", label: "Massage Treatments" },
            { href: "/womens-wellbeing", label: "Women's Wellbeing" },
            { href: "/facials", label: "Facials" },
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
          title="Holistic therapies FAQs"
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
          Book a Treatment
        </Link>
      </div>
    </div>
  );
}
