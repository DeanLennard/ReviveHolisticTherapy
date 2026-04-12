import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";

type PolicyPageContentProps = {
  slug: "privacy-policy" | "cookie-policy" | "terms-and-conditions";
  title: string;
  description: string;
  content: string[];
};

export function PolicyPageContent({ slug, title, description, content }: PolicyPageContentProps) {
  const blocks: Array<
    | { type: "h2"; text: string; key: string }
    | { type: "h3"; text: string; key: string }
    | { type: "p"; text: string; key: string }
    | { type: "ul"; items: string[]; key: string }
  > = [];

  for (let index = 0; index < content.length; index += 1) {
    const entry = content[index];

    if (entry.startsWith("h2:")) {
      blocks.push({
        type: "h2",
        text: entry.slice(3).trim(),
        key: `${slug}-h2-${index}`,
      });
      continue;
    }

    if (entry.startsWith("h3:")) {
      blocks.push({
        type: "h3",
        text: entry.slice(3).trim(),
        key: `${slug}-h3-${index}`,
      });
      continue;
    }

    if (entry.startsWith("li:")) {
      const items: string[] = [];
      let nextIndex = index;

      while (nextIndex < content.length && content[nextIndex].startsWith("li:")) {
        items.push(content[nextIndex].slice(3).trim());
        nextIndex += 1;
      }

      blocks.push({
        type: "ul",
        items,
        key: `${slug}-list-${index}`,
      });
      index = nextIndex - 1;
      continue;
    }

    blocks.push({
      type: "p",
      text: entry,
      key: `${slug}-${index}`,
    });
  }

  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
      <PageHero eyebrow="Policy" title={title} description={description} />
      <section className="mt-14 rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <div className="space-y-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
          {blocks.map((block) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={block.key}
                  className="pt-4 font-display text-2xl font-semibold leading-tight text-[color:var(--color-heading)]"
                >
                  {block.text}
                </h2>
              );
            }

            if (block.type === "h3") {
              return (
                <h3
                  key={block.key}
                  className="pt-2 font-display text-xl font-semibold leading-tight text-[color:var(--color-heading)]"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.type === "ul") {
              return (
                <ul key={block.key} className="prose-list space-y-2">
                  {block.items.map((item, itemIndex) => (
                    <li key={`${block.key}-item-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              );
            }

            return <p key={block.key}>{block.text}</p>;
          })}
        </div>
      </section>
    </div>
  );
}
