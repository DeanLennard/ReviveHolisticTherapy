import { AdminListDetails, AdminPageHeader, AdminPanel, AdminStatCard, AdminStatGrid } from "@/components/admin/admin-ui";
import { getBookingsForAdmin, getCustomersForAdmin, getPaymentsForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Customers | Revive Holistic Therapies",
  description: "View customer profiles, bookings, and payment history snapshots.",
  path: "/admin/customers",
});

export default async function AdminCustomersPage() {
  const [customers, bookings, payments] = await Promise.all([
    getCustomersForAdmin(),
    getBookingsForAdmin(),
    getPaymentsForAdmin(),
  ]);

  return (
    <>
      <AdminPageHeader
        eyebrow="Customers"
        title="Customer records are easier to review"
        description="This page gives a cleaner support view of customer details, booking counts, and payment activity without mixing it into the rest of the admin UI."
      />

      <AdminStatGrid>
        <AdminStatCard label="Customer accounts" value={String(customers.length)} helper="Registered customer profiles" />
        <AdminStatCard
          label="Customers with bookings"
          value={String(customers.filter((customer) => bookings.some((booking) => booking.customerEmail === customer.email)).length)}
          helper="At least one booking record"
        />
        <AdminStatCard
          label="Customers with payments"
          value={String(customers.filter((customer) => customer._id && payments.some((payment) => payment.userId?.toHexString() === customer._id?.toHexString())).length)}
          helper="At least one linked payment"
        />
        <AdminStatCard
          label="Marketing consent"
          value={String(customers.filter((customer) => customer.marketingConsent).length)}
          helper="Customers opted into marketing"
        />
      </AdminStatGrid>

      <AdminPanel title="Customer list" description="Expand a record to review contact details and activity summary.">
        <div className="space-y-4">
          {customers.length ? (
            customers.map((customer, index) => {
              const customerBookings = bookings.filter((booking) => booking.customerEmail === customer.email);
              const customerPayments = payments.filter((payment) => customer._id && payment.userId?.toHexString() === customer._id.toHexString());

              return (
                <AdminListDetails
                  key={customer._id?.toHexString()}
                  summary={`${customer.firstName} ${customer.lastName}`}
                  meta={`${customer.email} | ${customerBookings.length} bookings`}
                  defaultOpen={index === 0}
                >
                  <div className="grid gap-3 text-sm text-[color:var(--color-text-muted)]">
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone || "Not provided"}</p>
                    <p>Role: {customer.role}</p>
                    <p>Marketing consent: {customer.marketingConsent ? "Yes" : "No"}</p>
                    <p>Created: {new Date(customer.createdAt).toLocaleString("en-GB")}</p>
                    <p>Last login: {customer.lastLoginAt ? new Date(customer.lastLoginAt).toLocaleString("en-GB") : "Not recorded"}</p>
                    <p>Payments linked: {customerPayments.length}</p>
                    <p>
                      Upcoming bookings:{" "}
                      {customerBookings.filter((booking) => !["completed", "cancelled"].includes(booking.status)).length}
                    </p>
                  </div>
                </AdminListDetails>
              );
            })
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">No customer accounts available yet.</p>
          )}
        </div>
      </AdminPanel>
    </>
  );
}
