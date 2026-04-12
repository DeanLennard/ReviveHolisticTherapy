import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-24">
      <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-10 text-center shadow-[var(--shadow-soft)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[color:var(--color-accent)]">Page not found</p>
        <h1 className="mt-4 font-display text-4xl font-semibold">That page could not be found</h1>
        <p className="mt-4 text-lg text-[color:var(--color-text-muted)]">Try heading back to the homepage, treatments page, or booking flow.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Home
          </Link>
          <Link href="/treatments" className="rounded-full border border-[color:var(--color-border)] px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            Treatments
          </Link>
        </div>
      </div>
    </div>
  );
}
