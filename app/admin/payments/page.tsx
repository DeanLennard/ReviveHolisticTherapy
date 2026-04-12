import { AdminListDetails, AdminPageHeader, AdminPanel, AdminStatCard, AdminStatGrid } from "@/components/admin/admin-ui";
import { createManualPayment, refundPayment } from "@/lib/admin-actions";
import { getBookingsForAdmin, getPaymentsForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Payments | Revive Holistic Therapies",
  description: "Manage payment logs, reconciliation data, and refunds.",
  path: "/admin/payments",
});

export default async function AdminPaymentsPage() {
  const [bookings, payments] = await Promise.all([getBookingsForAdmin(), getPaymentsForAdmin()]);

  const paidRevenue = payments
    .filter((payment) => payment.status === "paid" || payment.status === "deposit paid")
    .reduce((total, payment) => total + payment.amount, 0);
  const pendingPayments = payments.filter((payment) => payment.status === "pending" || payment.status === "unpaid").length;
  const refundCount = payments.filter((payment) => payment.type === "refund" || payment.status === "refunded").length;

  return (
    <>
      <AdminPageHeader
        eyebrow="Payments"
        title="Payment logs and reconciliation now have their own page"
        description="This keeps manual payment logging, refund actions, and transaction history separate from bookings and content editing."
      />

      <AdminStatGrid>
        <AdminStatCard label="Payment records" value={String(payments.length)} helper="Stored payment and refund events" />
        <AdminStatCard label="Paid revenue" value={`GBP ${paidRevenue.toFixed(0)}`} helper="Paid and deposit-paid records" />
        <AdminStatCard label="Pending or unpaid" value={String(pendingPayments)} helper="Needs follow-up or provider sync" />
        <AdminStatCard label="Refund records" value={String(refundCount)} helper="Refund actions already logged" />
      </AdminStatGrid>

      <AdminPanel title="Log payment or refund" description="Record an offline payment, reconciliation event, or manual refund.">
        <form action={createManualPayment} className="grid gap-3 md:grid-cols-2">
          <select name="bookingId" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            {bookings.map((booking) => (
              <option key={booking._id?.toHexString()} value={booking._id?.toHexString()}>
                {booking.customerName} - {booking.serviceTitle} - {booking.bookingDate}
              </option>
            ))}
          </select>
          <input name="amount" type="number" step="0.01" placeholder="Amount" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <select name="provider" defaultValue="clinic" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            {["stripe", "gocardless", "clinic", "none"].map((provider) => (
              <option key={provider} value={provider}>
                {provider}
              </option>
            ))}
          </select>
          <select name="type" defaultValue="manual" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            {["deposit", "full", "manual", "refund"].map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <select name="status" defaultValue="paid" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            {["unpaid", "pending", "deposit paid", "paid", "failed", "refunded", "partially refunded"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <input name="providerTransactionId" placeholder="Provider transaction ID" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <textarea name="notes" placeholder="Payment notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm md:col-span-2" />
          <div className="md:col-span-2">
            <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
              Save payment log
            </button>
          </div>
        </form>
      </AdminPanel>

      <AdminPanel title="Payment history" description="Expand a record to view notes and execute a refund.">
        <div className="space-y-4">
          {payments.length ? (
            payments.map((payment, index) => (
              <AdminListDetails
                key={payment._id?.toHexString()}
                summary={`${payment.type} - GBP ${payment.amount.toFixed(2)}`}
                meta={`${payment.provider} | ${payment.status} | ${payment.receiptNumber}`}
                defaultOpen={index === 0}
              >
                <div className="space-y-4">
                  <div className="grid gap-2 text-sm text-[color:var(--color-text-muted)]">
                    <p>Provider transaction: {payment.providerTransactionId || "Not recorded"}</p>
                    <p>Booking reference: {payment.bookingId?.toHexString() ?? "Not linked"}</p>
                    <p>Created: {new Date(payment.createdAt).toLocaleString("en-GB")}</p>
                    {payment.notes ? <p>Notes: {payment.notes}</p> : null}
                  </div>
                  <form action={refundPayment} className="flex flex-wrap gap-2">
                    <input type="hidden" name="paymentId" value={payment._id?.toHexString()} />
                    <input name="amount" type="number" step="0.01" placeholder="Refund amount" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                    <button type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">
                      Execute refund
                    </button>
                  </form>
                </div>
              </AdminListDetails>
            ))
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">No payment records yet.</p>
          )}
        </div>
      </AdminPanel>
    </>
  );
}
