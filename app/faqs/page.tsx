import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { getFaqsFromDb } from "@/lib/content";
import { mapFaq } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "FAQs | Revive Holistic Therapies",
  description:
    "Find answers to common questions about treatments, booking, payments, and the client portal at Revive Holistic Therapies.",
  path: "/faqs",
});

export default async function FaqsPage() {
  const items = (await getFaqsFromDb()).map(mapFaq);

  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "FAQs" }]} />
      <SchemaScript
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <PageHero
        eyebrow="FAQs"
        title="Helpful answers before you book"
        description="This page supports both client reassurance and structured FAQ markup for search visibility."
      />
      <section className="mt-14 space-y-4">
        {items.map((faq) => (
          <details key={faq.id} className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white px-6 py-5 shadow-[var(--shadow-soft)]">
            <summary className="cursor-pointer font-display text-xl font-semibold">{faq.question}</summary>
            <p className="mt-4 text-lg leading-8 text-[color:var(--color-text-muted)]">{faq.answer}</p>
          </details>
        ))}
      </section>
    </div>
  );
}
