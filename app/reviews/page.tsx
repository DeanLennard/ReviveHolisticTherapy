import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { getTestimonialsFromDb } from "@/lib/content";
import { mapTestimonial } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Client Reviews | Revive Holistic Therapies Cannock",
  description:
    "Read reviews and testimonials from clients who have booked massage and holistic therapy treatments with Revive Holistic Therapies in Cannock.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const testimonials = (await getTestimonialsFromDb()).map(mapTestimonial);
  const schema = testimonials.map((testimonial) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    reviewBody: testimonial.content,
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    author: {
      "@type": "Person",
      name: testimonial.customerName,
    },
    itemReviewed: {
      "@type": "HealthAndBeautyBusiness",
      name: site.name,
    },
  }));

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />
      <PageHero
        eyebrow="Client reviews"
        title="Reassurance for new visitors, social proof for stronger conversion"
        description="Reviews are presented as a dedicated trust page and can also be reused in homepage or service detail sections through the admin-managed content model."
      />
      <section className="mt-14 grid gap-6 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article key={testimonial.id} className="rounded-[1.75rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p aria-label={`${testimonial.rating} out of 5 rating`} className="text-[color:var(--color-accent)]">
              {"★★★★★".slice(0, testimonial.rating)}
            </p>
            <p className="mt-4 text-lg leading-8 text-[color:var(--color-text-muted)]">&quot;{testimonial.content}&quot;</p>
            <p className="mt-6 font-semibold text-[color:var(--color-heading)]">{testimonial.customerName}</p>
            <p className="text-sm text-[color:var(--color-text-muted)]">{testimonial.source}</p>
          </article>
        ))}
      </section>
    </div>
  );
}
