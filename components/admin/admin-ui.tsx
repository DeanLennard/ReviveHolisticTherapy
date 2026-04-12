import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
};

type AdminPanelProps = {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
};

type AdminStatCardProps = {
  label: string;
  value: string;
  helper?: string;
};

export function AdminPageHeader({ eyebrow, title, description, action }: AdminPageHeaderProps) {
  return (
    <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-accent)]">{eyebrow}</p>
      ) : null}
      <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <h1 className="font-display text-3xl font-semibold text-[color:var(--color-heading)] sm:text-4xl">{title}</h1>
          <p className="mt-3 text-base leading-7 text-[color:var(--color-text-muted)]">{description}</p>
        </div>
        {action ? <div className="flex flex-wrap gap-3">{action}</div> : null}
      </div>
    </div>
  );
}

export function AdminPanel({ title, description, action, children }: AdminPanelProps) {
  return (
    <section className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">{title}</h2>
          {description ? <p className="mt-2 max-w-3xl text-sm leading-6 text-[color:var(--color-text-muted)]">{description}</p> : null}
        </div>
        {action ? <div className="flex flex-wrap gap-3">{action}</div> : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function AdminStatGrid({ children }: { children: ReactNode }) {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>;
}

export function AdminStatCard({ label, value, helper }: AdminStatCardProps) {
  return (
    <div className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <p className="text-sm text-[color:var(--color-text-muted)]">{label}</p>
      <p className="mt-3 font-display text-4xl font-semibold text-[color:var(--color-heading)]">{value}</p>
      {helper ? <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">{helper}</p> : null}
    </div>
  );
}

export function AdminListDetails({
  summary,
  meta,
  children,
  defaultOpen = false,
}: {
  summary: string;
  meta?: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="group rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5">
      <summary className="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-semibold text-[color:var(--color-heading)]">{summary}</span>
        {meta ? <span className="text-sm text-[color:var(--color-text-muted)]">{meta}</span> : null}
      </summary>
      <div className="mt-5">{children}</div>
    </details>
  );
}
