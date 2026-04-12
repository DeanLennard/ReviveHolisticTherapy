import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqAccordion } from "@/components/faq-accordion";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { getServiceBySlugFromDb, getServicesFromDb } from "@/lib/content";
import { mapService } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";

type TreatmentPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return (await getServicesFromDb()).map((service) => ({ slug: service.slug }));
}

export async function generateMetadata(props: TreatmentPageProps) {
  const { slug } = await props.params;
  const serviceDoc = await getServiceBySlugFromDb(slug);
  const service = serviceDoc ? mapService(serviceDoc) : null;

  if (!service) {
    return buildMetadata({
      title: "Treatment Not Found | Revive Holistic Therapies",
      description: "The requested treatment could not be found.",
      path: `/treatments/${slug}`,
    });
  }

  return buildMetadata({
    title: service.seoTitle,
    description: service.metaDescription,
    path: `/treatments/${service.slug}`,
  });
}

export default async function TreatmentDetailPage(props: TreatmentPageProps) {
  const { slug } = await props.params;
  const serviceDoc = await getServiceBySlugFromDb(slug);
  const service = serviceDoc ? mapService(serviceDoc) : null;

  if (!service) {
    notFound();
  }

  const related = (await getServicesFromDb()).map(mapService).filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.fullDescription,
          areaServed: ["Cannock", "Hednesford", "Staffordshire"],
          provider: {
            "@type": "HealthAndBeautyBusiness",
            name: "Revive Holistic Therapies",
          },
        }}
      />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Treatments", href: "/treatments" }, { label: service.title }]} />
      <PageHero eyebrow={service.category} title={service.title} description={service.metaDescription} />

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          {service.featuredImage ? (
            <div className="mb-8 overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
              <div className="relative h-64 w-full">
                <Image
                  src={service.featuredImage}
                  alt={service.featuredImageAlt ?? service.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : null}
          <h2 className="font-display text-3xl font-semibold">Treatment overview</h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">{service.fullDescription}</p>

          <h3 className="mt-10 font-display text-2xl font-semibold">Benefits</h3>
          <ul className="prose-list mt-4 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {service.benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-2xl font-semibold">Ideal for</h3>
          <ul className="prose-list mt-4 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {service.idealFor.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-10 font-display text-2xl font-semibold">Treatment FAQs</h3>
          <FaqAccordion items={service.faqs} className="mt-5 space-y-4" />
        </article>

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-[linear-gradient(160deg,#dff3f4,#ffffff)] p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">At a glance</p>
            <div className="mt-6 space-y-4 text-[color:var(--color-heading)]">
              <div className="rounded-[1.25rem] bg-white p-4">
                <p className="text-sm text-[color:var(--color-text-muted)]">Duration</p>
                <p className="mt-1 text-xl font-semibold">{service.durationMinutes} minutes</p>
              </div>
              <div className="rounded-[1.25rem] bg-white p-4">
                <p className="text-sm text-[color:var(--color-text-muted)]">Price</p>
                <p className="mt-1 text-xl font-semibold">GBP {service.price}</p>
              </div>
              <div className="rounded-[1.25rem] bg-white p-4">
                <p className="text-sm text-[color:var(--color-text-muted)]">Payment mode</p>
                <p className="mt-1 text-xl font-semibold">{service.paymentMode.replace("-", " ")}</p>
              </div>
            </div>
            <div className="mt-8 flex flex-col gap-3">
              <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-center font-semibold text-white">
                Book this treatment
              </Link>
              <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] px-5 py-3 text-center font-semibold text-[color:var(--color-heading)]">
                Ask before booking
              </Link>
            </div>
          </div>

          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="font-display text-2xl font-semibold">Related treatments</p>
            <div className="mt-5 space-y-4">
              {related.map((item) => (
                <Link key={item.id} href={`/treatments/${item.slug}`} className="block rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
                  <p className="font-semibold text-[color:var(--color-heading)]">{item.title}</p>
                  <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{item.shortDescription}</p>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
