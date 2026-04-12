import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";

type PolicyPageContentProps = {
  slug: "privacy-policy" | "cookie-policy" | "terms-and-conditions";
  title: string;
  description: string;
  content: string[];
};

export function PolicyPageContent({ slug, title, description, content }: PolicyPageContentProps) {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <PageHero eyebrow="Policy" title={title} description={description} />
      <section className="mt-14 rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <div className="space-y-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
          {content.map((paragraph, index) => (
            <p key={`${slug}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </section>
    </div>
  );
}
