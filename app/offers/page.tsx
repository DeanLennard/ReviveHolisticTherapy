import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Offers | Revive Holistic Therapies",
  description: "Browse current and future promotions from Revive Holistic Therapies.",
  path: "/offers",
});

export default function OffersPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Offers" }]} />
      <PageHero
        eyebrow="Future-ready"
        title="Offers and promotions"
        description="A dedicated offers route is now in place so promotions can be added without changing the core site structure later."
      />
    </div>
  );
}
