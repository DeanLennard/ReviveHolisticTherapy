import { PageHero } from "@/components/page-hero";
import { cancelBookingForUser, rescheduleBookingForUser, updateProfile } from "@/lib/admin-actions";
import { canCancelBooking, canRescheduleBooking, getBookingSettings, getUpcomingAndPastBookingsForUser } from "@/lib/booking";
import { logoutAction } from "@/app/actions/auth";
import { requireUser } from "@/lib/auth";
import { getPaymentsForUser } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Client Portal Account | Revive Holistic Therapies",
  description: "Manage your bookings, profile details, and payment history in the Revive Holistic Therapies client portal.",
  path: "/portal/account",
});

export default async function PortalAccountPage() {
  const customer = await requireUser();
  const [{ upcoming, past }, bookingSettings, payments] = await Promise.all([
    getUpcomingAndPastBookingsForUser(customer._id.toHexString()),
    getBookingSettings(),
    getPaymentsForUser(customer._id.toHexString()),
  ]);
  const upcomingWithPermissions = await Promise.all(
    upcoming.map(async (booking) => {
      const [canCancel, canReschedule] = await Promise.all([
        canCancelBooking(booking.bookingDate, booking.bookingStart),
        canRescheduleBooking(booking.bookingDate, booking.bookingStart),
      ]);

      return {
        ...booking,
        canCancel: canCancel.ok,
        canReschedule: canReschedule.ok,
      };
    }),
  );

  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Portal account"
        title="Manage your appointments and account details"
        description="Use your portal to keep your contact details up to date, review bookings, and check payment records whenever it suits you."
      />
      <section className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <aside className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="font-display text-2xl font-semibold">Profile</p>
          <form action={updateProfile} className="mt-5 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-[color:var(--color-heading)]">
                First name
                <input name="firstName" defaultValue={customer.firstName} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3" />
              </label>
              <label className="text-sm font-medium text-[color:var(--color-heading)]">
                Last name
                <input name="lastName" defaultValue={customer.lastName} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3" />
              </label>
            </div>
            <label className="block text-sm font-medium text-[color:var(--color-heading)]">
              Email
              <input defaultValue={customer.email} readOnly disabled className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-4 py-3 text-[color:var(--color-text-muted)]" />
            </label>
            <label className="block text-sm font-medium text-[color:var(--color-heading)]">
              Phone
              <input name="phone" defaultValue={customer.phone} className="mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3" />
            </label>
            <label className="flex items-start gap-3 rounded-[1.25rem] bg-[color:var(--color-surface)] p-4 text-sm text-[color:var(--color-heading)]">
              <input name="marketingConsent" type="checkbox" defaultChecked={customer.marketingConsent} className="mt-1" />
              <span>I would like to hear about future clinic updates and offers.</span>
            </label>
            <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 font-semibold text-white">
              Save profile
            </button>
          </form>
          <div className="mt-6 rounded-[1.25rem] bg-[color:var(--color-surface)] p-4 text-sm text-[color:var(--color-text-muted)]">
            <p>Account access is active.</p>
            <p className="mt-2">Cancellation window: {bookingSettings.cancellationWindowHours} hours</p>
            <p className="mt-1">Reschedule window: {bookingSettings.rescheduleWindowHours} hours</p>
          </div>
          <form action={logoutAction} className="mt-6">
            <button type="submit" className="rounded-full border border-[color:var(--color-border)] px-4 py-2 font-semibold text-[color:var(--color-heading)]">
              Sign out
            </button>
          </form>
        </aside>
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="font-display text-2xl font-semibold">Upcoming bookings</p>
            <div className="mt-5 space-y-4">
              {upcomingWithPermissions.length ? (
                upcomingWithPermissions.map((booking) => (
                  <div key={booking._id?.toHexString()} className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-5">
                    <p className="font-semibold text-[color:var(--color-heading)]">{booking.serviceTitle}</p>
                    <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                      {booking.bookingDate} at {booking.bookingStart} - {booking.bookingEnd}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">Status: {booking.status}</p>
                    <div className="mt-4 grid gap-4 lg:grid-cols-[auto_1fr]">
                      <form action={cancelBookingForUser}>
                        <input type="hidden" name="bookingId" value={booking._id?.toHexString()} />
                        <button type="submit" disabled={!booking.canCancel} className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] disabled:cursor-not-allowed disabled:opacity-50">
                          Cancel booking
                        </button>
                      </form>
                      <form action={rescheduleBookingForUser} className="grid gap-3 sm:grid-cols-4">
                        <input type="hidden" name="bookingId" value={booking._id?.toHexString()} />
                        <input name="bookingDate" type="date" defaultValue={booking.bookingDate} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" disabled={!booking.canReschedule} />
                        <input name="bookingStart" type="time" defaultValue={booking.bookingStart} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" disabled={!booking.canReschedule} />
                        <input name="bookingEnd" type="time" defaultValue={booking.bookingEnd} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" disabled={!booking.canReschedule} />
                        <button type="submit" disabled={!booking.canReschedule} className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
                          Reschedule
                        </button>
                      </form>
                    </div>
                    {!booking.canCancel || !booking.canReschedule ? (
                      <p className="mt-3 text-xs text-[color:var(--color-text-muted)]">
                        Changes are locked inside the {bookingSettings.cancellationWindowHours}-hour cancellation and {bookingSettings.rescheduleWindowHours}-hour reschedule windows.
                      </p>
                    ) : null}
                  </div>
                ))
              ) : (
                <p className="text-[color:var(--color-text-muted)]">No bookings are linked to this account yet.</p>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="font-display text-2xl font-semibold">Past bookings</p>
            <div className="mt-5 space-y-4">
              {past.length ? (
                past.map((booking) => (
                  <div key={booking._id?.toHexString()} className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-5">
                    <p className="font-semibold text-[color:var(--color-heading)]">{booking.serviceTitle}</p>
                    <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                      {booking.bookingDate} at {booking.bookingStart} - {booking.bookingEnd}
                    </p>
                    <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">Status: {booking.status}</p>
                  </div>
                ))
              ) : (
                <p className="text-[color:var(--color-text-muted)]">No past bookings yet.</p>
              )}
            </div>
          </div>
          <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
            <p className="font-display text-2xl font-semibold">Payment history</p>
            <div className="mt-5 space-y-4">
              {payments.length ? (
                payments.map((payment) => (
                  <div key={payment._id?.toHexString()} className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-5">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-semibold text-[color:var(--color-heading)]">
                          {payment.type} payment - GBP {payment.amount.toFixed(2)}
                        </p>
                        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                          {payment.provider} - {payment.status} - {payment.receiptNumber}
                        </p>
                      </div>
                      <a
                        href={`/portal/account/receipts/${payment._id?.toHexString()}`}
                        className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]"
                      >
                        Download receipt
                      </a>
                      <a
                        href={`/portal/account/invoices/${payment._id?.toHexString()}`}
                        className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]"
                      >
                        Download invoice
                      </a>
                    </div>
                    {payment.notes ? <p className="mt-3 text-sm text-[color:var(--color-text-muted)]">{payment.notes}</p> : null}
                  </div>
                ))
              ) : (
                <p className="text-[color:var(--color-text-muted)]">No payment history is linked to this account yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
