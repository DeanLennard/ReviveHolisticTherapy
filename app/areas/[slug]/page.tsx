import Link from "next/link";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { getServicesFromDb } from "@/lib/content";
import { mapService } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";
import { localAreaPages, site } from "@/lib/site-data";

type AreaPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return localAreaPages.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata(props: AreaPageProps) {
  const { slug } = await props.params;
  const area = localAreaPages.find((item) => item.slug === slug);

  if (!area) {
    return buildMetadata({
      title: "Area Page Not Found | Revive Holistic Therapies",
      description: "The requested local area page could not be found.",
      path: `/areas/${slug}`,
    });
  }

  return buildMetadata({
    title: `${area.title} | Revive Holistic Therapies`,
    description: area.description,
    path: `/areas/${area.slug}`,
  });
}

export default async function AreaPage(props: AreaPageProps) {
  const { slug } = await props.params;
  const area = localAreaPages.find((item) => item.slug === slug);

  if (!area) {
    notFound();
  }

  const services = (await getServicesFromDb()).map(mapService).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    areaServed: area.shortTitle,
    url: `${site.domain}/areas/${area.slug}`,
    telephone: site.phone,
    email: site.email,
  };

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Areas", href: "/contact" }, { label: area.shortTitle }]} />
      <PageHero eyebrow="Local area" title={area.title} description={area.description} />

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <h2 className="font-display text-3xl font-semibold">Treatment care for {area.shortTitle} clients</h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">{area.intro}</p>
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {area.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
              Book online
            </Link>
            <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] px-5 py-3 font-semibold text-[color:var(--color-heading)]">
              Contact the clinic
            </Link>
          </div>
        </article>

        <aside className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="font-display text-2xl font-semibold">Popular treatments</p>
          <div className="mt-5 space-y-4">
            {services.map((service) => (
              <Link key={service.id} href={`/treatments/${service.slug}`} className="block rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
                <p className="font-semibold text-[color:var(--color-heading)]">{service.title}</p>
                <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
