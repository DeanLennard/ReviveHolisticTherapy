import Link from "next/link";

import { AdminPageHeader, AdminPanel, AdminStatCard, AdminStatGrid } from "@/components/admin/admin-ui";
import { getAllServicesForAdmin, getBookingsForAdmin, getCustomersForAdmin, getEnquiriesForAdmin, getPaymentsForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Dashboard | Revive Holistic Therapies",
  description: "Operational overview for bookings, services, content, enquiries, and payments.",
  path: "/admin",
});

export default async function AdminPage() {
  const [services, bookings, customers, enquiries, payments] = await Promise.all([
    getAllServicesForAdmin(),
    getBookingsForAdmin(),
    getCustomersForAdmin(),
    getEnquiriesForAdmin(),
    getPaymentsForAdmin(),
  ]);

  const today = new Date().toISOString().slice(0, 10);
  const bookingsToday = bookings.filter((booking) => booking.bookingDate === today);
  const upcomingBookings = bookings.filter((booking) => !["completed", "cancelled"].includes(booking.status));
  const paidRevenue = payments
    .filter((payment) => payment.status === "paid" || payment.status === "deposit paid")
    .reduce((total, payment) => total + payment.amount, 0);
  const recentBookings = bookings.slice(0, 5);
  const recentEnquiries = enquiries.slice(0, 5);

  return (
    <>
      <AdminPageHeader
        eyebrow="Overview"
        title="A clearer admin dashboard with dedicated sections"
        description="This overview is now the front door to the admin area. Day-to-day tasks live on their own pages so bookings, services, content, and settings are easier to understand and manage."
        action={
          <>
            <Link href="/admin/bookings" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-white">
              Manage bookings
            </Link>
            <Link
              href="/admin/services"
              className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-heading)]"
            >
              Manage services
            </Link>
          </>
        }
      />

      <AdminStatGrid>
        <AdminStatCard label="Today's bookings" value={String(bookingsToday.length)} helper="Appointments due today" />
        <AdminStatCard label="Upcoming bookings" value={String(upcomingBookings.length)} helper="Excludes completed and cancelled" />
        <AdminStatCard label="Recent enquiries" value={String(enquiries.length)} helper="Messages stored in the admin inbox" />
        <AdminStatCard label="Booked revenue" value={`GBP ${paidRevenue.toFixed(0)}`} helper="Paid and deposit-paid transactions" />
      </AdminStatGrid>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <AdminPanel title="Quick access" description="Open the main working areas directly from here.">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { href: "/admin/bookings", title: "Bookings", body: "Filter bookings, update statuses, edit appointment details, and add manual bookings." },
              { href: "/admin/services", title: "Services", body: "Edit treatment pricing, SEO fields, payment options, featured images, and publish status." },
              { href: "/admin/content", title: "Content", body: "Manage hero slides, FAQs, and testimonials in clearer list-based sections." },
              { href: "/admin/payments", title: "Payments", body: "Review payment logs, manual entries, refunds, and reconciliation details." },
              { href: "/admin/customers", title: "Customers", body: "View customer profiles, booking counts, and payment history snapshots." },
              { href: "/admin/settings", title: "Settings", body: "Update business details, policy content, availability rules, and booking settings." },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5 transition hover:border-[color:var(--color-accent)]/40 hover:shadow-[var(--shadow-soft)]"
              >
                <p className="font-semibold text-[color:var(--color-heading)]">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--color-text-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </AdminPanel>

        <AdminPanel title="Business snapshot" description="A quick read on the current admin data.">
          <div className="space-y-4 text-sm text-[color:var(--color-text-muted)]">
            <p>
              Active services: <span className="font-semibold text-[color:var(--color-heading)]">{services.filter((service) => service.isActive).length}</span>
            </p>
            <p>
              Customer accounts: <span className="font-semibold text-[color:var(--color-heading)]">{customers.length}</span>
            </p>
            <p>
              Pending or unpaid payments:{" "}
              <span className="font-semibold text-[color:var(--color-heading)]">
                {payments.filter((payment) => payment.status === "pending" || payment.status === "unpaid").length}
              </span>
            </p>
            <p>
              New enquiries:{" "}
              <span className="font-semibold text-[color:var(--color-heading)]">
                {enquiries.filter((enquiry) => enquiry.status === "new").length}
              </span>
            </p>
          </div>
        </AdminPanel>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AdminPanel title="Latest bookings" description="Recent appointment records from the live booking data.">
          <div className="space-y-3">
            {recentBookings.length ? (
              recentBookings.map((booking) => (
                <div key={booking._id?.toHexString()} className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-[color:var(--color-heading)]">
                      {booking.customerName} - {booking.serviceTitle}
                    </p>
                    <p className="text-sm text-[color:var(--color-text-muted)]">
                      {booking.bookingDate} at {booking.bookingStart}
                    </p>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                    Status: {booking.status} | Payment: {booking.paymentStatus}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[color:var(--color-text-muted)]">No bookings recorded yet.</p>
            )}
          </div>
        </AdminPanel>

        <AdminPanel title="Latest enquiries" description="The newest contact form submissions waiting for follow-up.">
          <div className="space-y-3">
            {recentEnquiries.length ? (
              recentEnquiries.map((enquiry) => (
                <div key={enquiry._id?.toHexString()} className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-semibold text-[color:var(--color-heading)]">{enquiry.subject}</p>
                    <p className="text-sm text-[color:var(--color-text-muted)]">{enquiry.status}</p>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                    {enquiry.name} | {enquiry.email}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-[color:var(--color-text-muted)]">No enquiries received yet.</p>
            )}
          </div>
        </AdminPanel>
      </div>
    </>
  );
}
