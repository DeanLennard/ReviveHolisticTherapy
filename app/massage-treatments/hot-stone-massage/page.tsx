import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Hot Stone Massage Cannock | Relaxing Heated Stone Therapy | Revive Holistic Therapies",
  description:
    "Enjoy a hot stone massage in Cannock to deeply relax muscles and ease tension. A soothing, warming treatment to help you unwind.",
  path: "/massage-treatments/hot-stone-massage",
});

const suitableFor = [
  "Feeling stressed or overwhelmed",
  "Experiencing muscle tension or tightness",
  "Looking for a deeply relaxing treatment",
  "Feeling physically or mentally tired",
  "Wanting a calming, warming experience",
];

const benefits = [
  "Deep muscle relaxation",
  "Reduced tension and tightness",
  "Improved circulation",
  "Enhanced relaxation",
  "A calming and soothing experience",
  "Support for overall wellbeing",
];

const faqItems = [
  {
    question: "Is hot stone massage safe?",
    answer: "Yes, the stones are heated to a safe temperature and used carefully throughout the treatment.",
  },
  {
    question: "Is it better than a regular massage?",
    answer: "It depends on your preference. Hot stone massage is ideal if you want a more relaxing, warming experience.",
  },
  {
    question: "Will the stones be too hot?",
    answer: "No, they are always checked and adjusted to ensure your comfort.",
  },
];

export default function HotStoneMassagePage() {
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Hot Stone Massage",
      description:
        "Hot stone massage in Cannock using smooth heated stones to relax muscles, ease tension and provide a deeply soothing full-body treatment.",
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
          { label: "Hot Stone Massage" },
        ]}
      />

      <PageHero
        eyebrow="Hot Stone Massage"
        title="Hot Stone Massage in Cannock for Deep Relaxation"
        description="Hot stone massage is a deeply relaxing treatment that uses smooth, heated stones to warm the muscles and enhance the effects of massage. At Revive Holistic Therapies in Cannock, this soothing treatment is designed to help you unwind, ease tension and enjoy a calming, full-body experience. The gentle warmth of the stones allows your body to relax more fully, making it an ideal choice if you are feeling tense, tired or in need of time to switch off."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Hot Stone Massage
        </Link>
        <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          Contact Us
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="What is hot stone massage?"
            title="What is hot stone massage?"
            description="Hot stone massage involves placing smooth, heated stones on specific areas of the body and using them during the massage to apply gentle pressure."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The heat helps muscles relax more quickly, allowing the therapist to work more effectively while maintaining a soothing and comfortable experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The stones are warmed to a safe temperature and carefully used throughout the treatment to provide both relaxation and therapeutic benefit.
          </p>
          <Link href="/booking" className="mt-8 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Book Now
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who is it for?"
            title="Who is hot stone massage suitable for?"
            description="Hot stone massage is ideal if you are:"
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {suitableFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            It is suitable for both men and women and can be adapted to suit your preferences.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Benefits"
            title="Benefits of hot stone massage"
            description="Hot stone massage offers a combination of relaxation and physical benefits."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This treatment is particularly popular for those who find it difficult to relax with traditional massage alone.
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
            The therapist will then use heated stones alongside massage techniques to create a smooth and relaxing flow.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            The warmth of the stones allows the body to relax more quickly, helping you feel calm and at ease throughout the treatment. The experience is unhurried and designed to help you fully switch off.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">You will leave feeling relaxed, comforted and more balanced.</p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Duration and pricing"
            title="Treatment duration and pricing"
            description="Hot stone massage is available in 60 minutes and 90 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Longer sessions allow for a more complete full-body treatment and deeper relaxation.
          </p>
          <Link href="/price-list" className="mt-8 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            View Price List
          </Link>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for hot stone massage in Cannock?"
            description="At Revive Holistic Therapies, we create treatments that feel both professional and deeply relaxing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Every hot stone massage is tailored to your needs, ensuring the right balance of warmth, pressure and technique.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for a calm, welcoming and personalised experience that helps them fully unwind.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.98fr_1.02fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local search"
            title="Looking for hot stone massage in Cannock or Hednesford?"
            description="If you are searching for hot stone massage in Cannock, Revive Holistic Therapies offers a soothing treatment designed to help you relax and ease tension."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas who are looking for a professional and calming massage experience.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Useful links</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {[
              { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
              { href: "/massage-treatments", label: "Massage Overview" },
              { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
              { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
              { href: "/massage-treatments/warm-bamboo-massage", label: "Warm Bamboo Massage" },
              { href: "/massage-treatments/aqua-massage", label: "Aqua Massage" },
              { href: "/massage-treatments/lomi-lomi-massage", label: "Lomi Lomi Massage" },
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
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your hot stone massage</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Relax, unwind and restore</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          If you are ready to enjoy a deeply relaxing and warming treatment, book your hot stone massage in Cannock today.
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
          title="Hot stone massage FAQs"
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
          Book Hot Stone Massage
        </Link>
      </div>
    </div>
  );
}
