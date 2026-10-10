import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { AdminNav } from "@/components/admin/admin-nav";
import { requireRole } from "@/lib/auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireRole(["super_admin", "admin", "content_editor", "bookings_manager"]);

  return (
    <div className="shell py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:items-start">
        <aside className="space-y-5 lg:sticky lg:top-24">
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[color:var(--color-accent)]">Admin</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-[color:var(--color-heading)]">Revive control centre</h2>
            <p className="mt-3 text-sm leading-6 text-[color:var(--color-text-muted)]">
              Clear sections for bookings, services, content, payments, and clinic settings.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/"
                className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]"
              >
                View website
              </Link>
              <Link
                href="/booking"
                className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white"
              >
                Public booking
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 shadow-[var(--shadow-soft)]">
            <AdminNav />
          </div>
        </aside>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
}
