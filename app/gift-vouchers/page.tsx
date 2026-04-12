import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Gift Vouchers | Revive Holistic Therapies",
  description: "Explore gift voucher options for massage and holistic therapy treatments at Revive Holistic Therapies.",
  path: "/gift-vouchers",
});

export default function GiftVouchersPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gift vouchers" }]} />
      <PageHero
        eyebrow="Future-ready"
        title="Gift vouchers ready for future rollout"
        description="This page prepares the site structure for treatment gift vouchers and seasonal gifting offers."
      />
    </div>
  );
}
