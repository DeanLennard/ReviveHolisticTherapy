import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { ServiceCard } from "@/components/service-card";
import { getServicesFromDb } from "@/lib/content";
import { mapService } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";
import { isServiceAvailable } from "@/lib/service-availability";

export const metadata = buildMetadata({
  title: "Treatments | Massage and Holistic Therapy in Cannock",
  description:
    "Explore massage and holistic therapy treatments in Cannock, with clear service information, pricing, durations, and easy online booking.",
  path: "/treatments",
});

export default async function TreatmentsPage() {
  const services = (await getServicesFromDb()).filter((service) => isServiceAvailable(service.slug)).map(mapService);

  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Treatments" }]} />
      <PageHero
        eyebrow="Treatments"
        title="Massage and holistic therapy services designed for real needs"
        description="This service hub supports local SEO, clear treatment comparisons, and strong internal linking into each detailed service page."
      />

      <section className="mt-14 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </section>
    </div>
  );
}
