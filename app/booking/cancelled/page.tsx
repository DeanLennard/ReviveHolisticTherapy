import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BookingCancelledPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Payment cancelled"
        title="Your booking has been saved, but payment was not completed"
        description="You can return to booking to try again, or contact the clinic if you would prefer to complete payment another way."
      />
      <section className="mt-12 rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap gap-3">
          <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            Return to booking
          </Link>
          <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            Contact the clinic
          </Link>
        </div>
      </section>
    </div>
  );
}
