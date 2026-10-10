import { BookingForm } from "@/components/booking/booking-form";
import { PageHero } from "@/components/page-hero";
import { getServicesFromDb, getSiteSettings } from "@/lib/content";
import { mapService } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Book Online | Revive Holistic Therapies Cannock",
  description:
    "Book massage and holistic therapy appointments online with service-led durations, payment options, client notes, and booking rule guidance.",
  path: "/booking",
});

export default async function BookingPage() {
  const [serviceDocs, settings] = await Promise.all([getServicesFromDb(), getSiteSettings()]);
  const services = serviceDocs.map(mapService);
  const paymentSettings = settings?.paymentSettings ?? {
    stripeEnabled: true,
    goCardlessEnabled: true,
    defaultMethod: "Stripe",
    payLaterEnabled: true,
    refundSupport: true,
  };
  const bookingSettings = settings?.bookingSettings ?? {
    maximumBookingHorizonDays: 90,
    minimumNoticeHours: 12,
    cancellationWindowHours: 24,
    rescheduleWindowHours: 24,
  };
  const onlinePaymentsEnabled = paymentSettings.stripeEnabled || paymentSettings.goCardlessEnabled;

  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Online booking"
        title="A booking flow built to convert while giving the clinic operational control"
        description="This first-pass booking interface demonstrates treatment selection, real-time style slot presentation, notes capture, and configurable payment handling."
      />

      <section className="mt-14 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <BookingForm
          services={services.map((service) => ({
            id: service.id,
            title: service.title,
            durationMinutes: service.durationMinutes,
            paymentMode: service.paymentMode,
            acceptedPaymentMethods: service.acceptedPaymentMethods,
            fullPaymentRequired: service.fullPaymentRequired,
            payLaterEnabled: service.payLaterEnabled,
          }))}
          paymentSettings={paymentSettings}
          bookingSettings={bookingSettings}
        />

        <aside className="space-y-6">
          <div className="rounded-[2rem] bg-[linear-gradient(160deg,#0D3371,#061D43)] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Booking rules</p>
            <ul className="prose-list mt-5 text-white/78">
              <li>Minimum notice: {bookingSettings.minimumNoticeHours} hours</li>
              <li>Booking horizon: {bookingSettings.maximumBookingHorizonDays} days</li>
              <li>Cancellation window: {bookingSettings.cancellationWindowHours} hours</li>
              <li>Reschedule window: {bookingSettings.rescheduleWindowHours} hours</li>
              <li>Buffer times and blocked dates controlled in admin</li>
            </ul>
          </div>
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="font-display text-2xl font-semibold">Payment configuration preview</p>
            <div className="mt-5 space-y-4 text-sm text-[color:var(--color-text-muted)]">
              {onlinePaymentsEnabled ? (
                <>
                  <p>Stripe enabled: {paymentSettings.stripeEnabled ? "Yes" : "No"}</p>
                  <p>GoCardless enabled: {paymentSettings.goCardlessEnabled ? "Yes" : "No"}</p>
                  <p>Default method: {paymentSettings.defaultMethod}</p>
                  <p>Refund support: {paymentSettings.refundSupport ? "Enabled" : "Disabled"}</p>
                </>
              ) : (
                <>
                  <p>Payment: Pay on arrival</p>
                  <p>Payment will be collected at the clinic.</p>
                </>
              )}
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
