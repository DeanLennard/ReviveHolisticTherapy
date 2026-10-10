import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { sendAdminEventNotification, sendBookingConfirmationEmail } from "@/lib/mailer";
import { syncBookingPaymentFromSuccess } from "@/lib/payment-checkout";
import { getSiteSettings } from "@/lib/content";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

type SuccessPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingle(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function BookingSuccessPage({ searchParams }: SuccessPageProps) {
  const params = searchParams ? await searchParams : {};
  const bookingId = getSingle(params.bookingId);
  const provider = getSingle(params.provider);
  const sessionId = getSingle(params.session_id);
  const booking = bookingId ? await syncBookingPaymentFromSuccess({ bookingId, provider, sessionId }) : null;

  if (booking) {
    const settings = await getSiteSettings();
    await sendBookingConfirmationEmail(booking, settings).catch(() => undefined);
    await sendAdminEventNotification("payment confirmed", booking, settings).catch(() => undefined);
  }

  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Booking confirmed"
        title="Your payment step has been completed"
        description="Your booking and payment information have been updated. A confirmation email will be sent if email delivery is configured."
      />
      <section className="mt-12 rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <p className="text-lg text-[color:var(--color-text-muted)]">
          {booking
            ? `Booking ${booking._id?.toHexString()} is now recorded with status ${booking.status} and payment status ${booking.paymentStatus}.`
            : "We could not verify a booking reference from this return URL, but you can review your account or contact the clinic if needed."}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/portal/account" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
            View my account
          </Link>
          <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] px-5 py-3 font-semibold text-[color:var(--color-heading)]">
            Contact the clinic
          </Link>
        </div>
      </section>
    </div>
  );
}
