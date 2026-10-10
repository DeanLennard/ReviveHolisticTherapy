import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";

const faqSections = [
  {
    title: "Booking & General Questions",
    eyebrow: "Booking and general questions",
    description:
      "Helpful guidance if you are booking for the first time or are not quite sure where to begin.",
    items: [
      {
        question: "How do I book a treatment?",
        answer:
          "You can book your treatment online using our booking system, or contact us directly if you would like help choosing the right option. We welcome clients from Cannock, Hednesford and surrounding areas.",
      },
      {
        question: "Do I need to know which treatment to choose?",
        answer:
          "No - if you're unsure, we can recommend a treatment based on how you're feeling and what you need. Many clients start with a general massage and adjust over time.",
      },
      {
        question: "How often should I have a treatment?",
        answer:
          "This depends on your goals. Some clients visit occasionally for relaxation, while others come regularly to help manage tension and maintain wellbeing.",
      },
      {
        question: "Can I book multiple treatments together?",
        answer:
          "Yes, some treatments can be combined or booked as part of a longer session. You can also choose a 90-minute treatment for a more complete experience.",
      },
    ],
  },
  {
    title: "Massage Questions",
    eyebrow: "Massage questions",
    description:
      "Straightforward answers to common massage concerns around pressure, clothing, comfort and choosing the right treatment.",
    items: [
      {
        question: "What is the difference between deep tissue and remedial massage?",
        answer:
          "Deep tissue massage focuses on deeper muscle layers, while remedial massage is more targeted towards specific problem areas and tension patterns.",
      },
      {
        question: "Will massage be painful?",
        answer:
          "Massage pressure is always adjusted to your comfort level. Some treatments may feel more intense, but they should never be uncomfortable.",
      },
      {
        question: "What should I wear to a massage?",
        answer:
          "You can undress to your comfort level. You will always be covered appropriately during your treatment.",
      },
      {
        question: "Can massage help with back pain?",
        answer:
          "Massage can help relieve muscular tension and discomfort that may contribute to back pain.",
      },
      {
        question: "Which massage is best for stress?",
        answer:
          "Aromatherapy massage, de-stress massage and Indian head massage are all great options for reducing stress and helping you relax.",
      },
    ],
  },
  {
    title: "Facials Questions",
    eyebrow: "Facials questions",
    description:
      "Useful answers if you are deciding between facial treatments or want to know what is included.",
    items: [
      {
        question: "Which facial should I choose?",
        answer:
          "Each facial offers different benefits. If you are unsure, we can recommend one based on your skin type and what you would like to achieve.",
      },
      {
        question: "Are facials suitable for sensitive skin?",
        answer:
          "Yes, treatments such as the rose facial are designed to be gentle and soothing for sensitive skin.",
      },
      {
        question: "How often should I have a facial?",
        answer:
          "Many clients benefit from regular facials, but even occasional treatments can help refresh and improve your skin.",
      },
      {
        question: "What is included in a facial?",
        answer:
          "Most facials include cleansing, massage, a mask and tailored skincare products, along with a relaxing treatment experience.",
      },
    ],
  },
  {
    title: "Wellbeing & Holistic Questions",
    eyebrow: "Wellbeing and holistic questions",
    description:
      "Gentle explanations of some of our calming wellbeing treatments and what clients can expect from them.",
    items: [
      {
        question: "What is reflexology?",
        answer:
          "Reflexology is a relaxing treatment that involves applying pressure to specific points on the feet to support overall wellbeing.",
      },
      {
        question: "What is Reiki and how does it work?",
        answer:
          "Reiki is a gentle, non-invasive treatment designed to promote relaxation. Many clients experience it as a calming and restorative experience.",
      },
      {
        question: "What is crystal therapy?",
        answer:
          "Crystal therapy is a calming treatment where crystals are placed around the body to support relaxation and balance.",
      },
      {
        question: "Are holistic therapies suitable for everyone?",
        answer:
          "Yes, these treatments are gentle and can be adapted to suit your needs.",
      },
    ],
  },
  {
    title: "Specialist Treatments",
    eyebrow: "Specialist treatments",
    description:
      "Reassuring information for clients booking a more tailored treatment such as pregnancy, menopause or oncology massage.",
    items: [
      {
        question: "Is pregnancy massage safe?",
        answer:
          "Yes, pregnancy massage is adapted to ensure comfort and safety and is suitable from 12 weeks onwards.",
      },
      {
        question: "What is menopause massage?",
        answer:
          "It is a tailored treatment designed to support relaxation and wellbeing during peri and menopause.",
      },
      {
        question: "What is oncology massage?",
        answer:
          "Oncology massage is a gentle, adapted treatment designed to support comfort and relaxation during or after cancer treatment.",
      },
    ],
  },
  {
    title: "Hopi Ear Candles",
    eyebrow: "Hopi ear candles",
    description:
      "Simple answers for clients who are curious about ear candling and want to know what the treatment involves.",
    items: [
      {
        question: "What are Hopi ear candles?",
        answer:
          "Hopi ear candling is a relaxing treatment that uses a hollow candle to create a warm, soothing experience.",
      },
      {
        question: "Is ear candling safe?",
        answer:
          "Yes, when performed by a trained therapist it is a gentle and relaxing treatment.",
      },
    ],
  },
  {
    title: "Payments & Practical",
    eyebrow: "Payments and practical details",
    description:
      "Useful booking and payment information to help you know what to expect before confirming your appointment.",
    items: [
      {
        question: "How can I pay?",
        answer:
          "We accept payments via card, online booking, and options such as Stripe and GoCardless depending on booking settings.",
      },
      {
        question: "Do I need to pay in advance?",
        answer:
          "This depends on the booking settings. Some treatments may require a deposit or full payment.",
      },
      {
        question: "What is your cancellation policy?",
        answer:
          "Please provide notice if you need to cancel or reschedule your appointment. The exact cancellation window is shown during booking and in your confirmation details.",
      },
    ],
  },
  {
    title: "Local Questions",
    eyebrow: "Local Cannock questions",
    description:
      "Answers for clients checking whether we are local to them and easy to reach from nearby Staffordshire areas.",
    items: [
      {
        question: "Do you cover areas outside Cannock?",
        answer:
          "Yes, we welcome clients from Cannock, Hednesford and surrounding Staffordshire areas.",
      },
      {
        question: "Where are you based?",
        answer:
          "Revive Holistic Therapies is based in the Cannock area, making it easy to access from nearby towns and villages.",
      },
    ],
  },
];

const allFaqs = faqSections.flatMap((section) => section.items);

export const metadata = buildMetadata({
  title: "Frequently Asked Questions | Massage & Treatments Cannock | Revive Holistic Therapies",
  description:
    "Find answers about massage, facials, reflexology, pregnancy massage, booking and payments at Revive Holistic Therapies in Cannock.",
  path: "/faqs",
});

export default function FaqsPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <SchemaScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />

      <PageHero
        eyebrow="Frequently asked questions"
        title="Frequently Asked Questions"
        description="Find clear answers about booking, massage, facials, wellbeing treatments, payments and practical details before you book with Revive Holistic Therapies."
      />

      <section className="mt-16 grid gap-10">
        {faqSections.map((section) => (
          <section key={section.title} className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
            <SectionHeading
              eyebrow={section.eyebrow}
              title={section.title}
              description={section.description}
            />
            <FaqAccordion
              items={section.items}
              className="mt-8 space-y-4"
              itemClassName="rounded-[1.25rem] border border-[color:var(--color-border)] bg-white px-5 py-4"
              summaryClassName="cursor-pointer font-semibold text-[color:var(--color-heading)]"
              answerClassName="mt-3 text-[color:var(--color-text-muted)]"
            />
          </section>
        ))}
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">
          Still unsure which treatment is right for you?
        </p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">
          Still unsure which treatment is right for you?
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          We&apos;re happy to help, whether you&apos;re looking to relax, relieve tension or improve your wellbeing.
        </p>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          Contact us for advice or book your appointment today.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#0A234D]"
          >
            Contact Us
          </Link>
          <Link
            href="/booking"
            className="rounded-full border border-[#AFC8ED] bg-[#174A91] px-6 py-3 text-center font-semibold text-white"
          >
            Book Your Appointment
          </Link>
        </div>
      </section>
    </div>
  );
}
