import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Advice Centre | Revive Holistic Therapies",
  description: "Read future blog and advice content from Revive Holistic Therapies.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Advice centre" }]} />
      <PageHero
        eyebrow="Future-ready"
        title="Advice centre and blog"
        description="This section is ready for future educational content, treatment advice, local wellbeing pages, and SEO-supporting articles."
      />
    </div>
  );
}
