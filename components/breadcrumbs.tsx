import Link from "next/link";

import { SchemaScript } from "@/components/schema-script";
import { site } from "@/lib/site-data";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${site.domain}${item.href ?? ""}`,
    })),
  };

  return (
    <>
      <SchemaScript data={schema} />
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-[color:var(--color-text-muted)]">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="transition hover:text-[color:var(--color-accent)]">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={index === items.length - 1 ? "page" : undefined} className="font-medium text-[color:var(--color-heading)]">
                  {item.label}
                </span>
              )}
              {index < items.length - 1 ? <span aria-hidden="true">/</span> : null}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
