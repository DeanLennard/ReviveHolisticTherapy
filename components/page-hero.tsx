type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="surface-card-strong relative overflow-hidden rounded-[2.2rem] px-6 py-12 sm:px-10 lg:px-12">
      <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(180deg,rgba(217,238,240,0.78),rgba(217,238,240,0))]" />
      <div className="relative max-w-4xl">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.06] text-[color:var(--color-heading)] sm:text-5xl lg:text-[3.9rem]">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--color-text-muted)]">{description}</p>
      </div>
    </section>
  );
}
