import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Heat Therapy Massage Cannock | Hot Stone, Bamboo & Aqua Massage | Revive Holistic Therapies",
  description:
    "Experience heat therapy massage in Cannock including hot stone, bamboo and aqua massage. Relax muscles, ease tension and unwind.",
  path: "/massage-treatments/heat-therapy-massage",
});

const suitableFor = [
  "Experiencing muscle tension or stiffness",
  "Feeling physically or mentally tired",
  "Looking for a deeply relaxing treatment",
  "Wanting a more soothing massage experience",
  "Struggling to switch off and relax",
];

const benefits = [
  "Deeper muscle relaxation",
  "Reduced tension and tightness",
  "Improved circulation",
  "Enhanced relaxation",
  "A soothing and calming treatment experience",
  "Support for overall wellbeing",
];

const treatmentOptions = [
  {
    title: "Aqua Massage",
    description:
      "Aqua massage is a full-body experience where you lie on warm water cushions that support your body comfortably. This allows your body to relax while maintaining alignment, making it ideal if you experience discomfort, stiffness or tension.",
    extra:
      "The warmth of the water cushions enhances relaxation and helps soothe tired muscles.",
    href: "/massage-treatments/aqua-massage",
  },
  {
    title: "Hot Stone Massage",
    description:
      "Hot stone massage uses smooth, heated stones placed on the body and used during the treatment to massage the muscles. The warmth helps soften tension, allowing for a deeply relaxing experience.",
    extra: "This is a popular choice for those looking to fully unwind and enjoy a calming, warming treatment.",
    href: "/massage-treatments/hot-stone-massage",
  },
  {
    title: "Warm Bamboo Massage",
    description:
      "Warm bamboo massage uses heated bamboo tools to deliver a unique and revitalising massage experience. The warmth combined with flowing movements helps to ease tension while stimulating circulation.",
    extra: "This treatment offers a deeper, more invigorating experience while still maintaining a relaxing feel.",
    href: "/massage-treatments/warm-bamboo-massage",
  },
  {
    title: "Lomi Lomi Massage",
    description:
      "Lomi Lomi massage uses long, flowing movements across the body to create a rhythmic and immersive treatment experience. While not always heat-based, it fits within this category due to its deeply relaxing and flowing nature.",
    extra: "This treatment encourages both physical relaxation and emotional release.",
    href: "/massage-treatments/lomi-lomi-massage",
  },
];

const faqItems = [
  {
    question: "What is heat therapy massage good for?",
    answer: "It helps relax muscles, reduce tension and create a deeper sense of relaxation.",
  },
  {
    question: "Is hot stone massage included?",
    answer: "Yes, hot stone massage is one of the heat therapy options available.",
  },
  {
    question: "Which heat therapy treatment should I choose?",
    answer: "Each treatment offers a slightly different experience. You can choose based on your preference or contact us for guidance.",
  },
];

export default function HeatTherapyMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Heat Therapy Massage",
      description:
        "Heat therapy massage in Cannock including hot stone, warm bamboo and aqua massage, designed to ease tension, support circulation and create deep relaxation.",
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
          { label: "Heat Therapy Massage" },
        ]}
      />

      <PageHero
        eyebrow="Heat Therapy Massage"
        title="Heat Therapy Massage in Cannock for Deep Relaxation"
        description="Heat therapy massage combines the benefits of massage with the soothing effects of warmth to help relax the body more deeply. At Revive Holistic Therapies in Cannock, these treatments are designed to ease muscle tension, improve circulation and create a deeply calming experience. Using a variety of techniques and tools, heat therapy massage allows the body to unwind more fully, making it ideal if you are feeling tense, tired or in need of a more immersive treatment."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Heat Therapy Massage
        </Link>
        <Link href="/massage-treatments" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          View Treatments
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is heat therapy massage?"
            title="What is heat therapy massage?"
            description="Heat therapy massage uses warmth alongside massage techniques to help muscles soften and relax more easily."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This allows the therapist to work more effectively into areas of tension while creating a more soothing and comforting experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The warmth encourages circulation and helps the body let go of tightness, making these treatments ideal for both relaxation and easing muscular discomfort.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is heat therapy massage suitable for?"
            description="Heat therapy massage is ideal if you are:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            These treatments are suitable for both men and women and can be adapted to your comfort level.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of heat therapy massage"
            description="Heat therapy massage offers a combination of relaxation and physical benefits."
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
            eyebrow="Heat therapy options"
            title="Our heat therapy massage options"
            description="We offer a range of heat therapy treatments in Cannock, each providing a unique experience while delivering the benefits of warmth and relaxation."
          />
          <div className="mt-8 space-y-6">
            {treatmentOptions.map((option) => (
              <article key={option.title} className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white px-5 py-5">
                <h3 className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">{option.title}</h3>
                <p className="mt-3 text-base leading-8 text-[color:var(--color-text-muted)]">{option.description}</p>
                <p className="mt-3 text-base leading-8 text-[color:var(--color-text-muted)]">{option.extra}</p>
                <Link
                  href={option.href}
                  className="mt-5 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                >
                  {option.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for heat therapy massage in Cannock?"
            description="At Revive Holistic Therapies, we focus on creating treatments that feel both effective and deeply relaxing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Heat therapy massage is carefully tailored to your needs, ensuring the right balance of warmth, pressure and technique.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for treatments that provide a calm, professional and personalised experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for hot stone or heat therapy massage in Cannock?"
            description="If you are searching for heat therapy massage in Cannock, including hot stone massage, bamboo massage or aqua massage, Revive Holistic Therapies offers a range of treatments designed to help you relax and unwind."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas who are looking for a soothing and professional massage experience.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your heat therapy massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">
          Experience deep relaxation with heat therapy massage
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to relax, unwind and ease tension, explore our heat therapy treatments and book your appointment today.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#0A234D]">
            Book Now
          </Link>
          <Link href="/massage-treatments" className="rounded-full border border-[#AFC8ED] bg-[#174A91] px-6 py-3 text-center font-semibold text-white">
            View Treatments
          </Link>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Frequently asked questions"
          title="Heat therapy massage FAQs"
          description="A few helpful answers before you book."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {faqItems.map((faq) => (
            <article key={faq.question} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">{faq.question}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <Link
        href="/booking"
        className="fixed inset-x-4 bottom-4 z-40 rounded-full bg-[color:var(--color-accent)] px-6 py-4 text-center font-semibold text-white shadow-[0_20px_45px_-20px_rgba(13,51,113,0.75)] sm:hidden"
      >
        Book Heat Therapy Massage
      </Link>
    </div>
  );
}
