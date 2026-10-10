import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Memberships | Revive Holistic Therapies",
  description: "Preview future memberships and treatment plan options for Revive Holistic Therapies.",
  path: "/memberships",
  index: false,
});

export default function MembershipsPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Memberships" }]} />
      <PageHero
        eyebrow="Future-ready"
        title="Memberships and treatment plans"
        description="This route is in place for future recurring care plans, memberships, and package-led client retention offers."
      />
    </div>
  );
}
