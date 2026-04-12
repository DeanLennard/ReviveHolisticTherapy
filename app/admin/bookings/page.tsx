import Link from "next/link";

import { BookingCalendar } from "@/components/admin/booking-calendar";
import { BookingSchedule } from "@/components/admin/booking-schedule";
import { AdminPageHeader, AdminPanel, AdminStatCard, AdminStatGrid } from "@/components/admin/admin-ui";
import { createManualBooking, updateBookingDetails, updateBookingStatus } from "@/lib/admin-actions";
import { getAllServicesForAdmin, getBookingsForAdmin } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Admin Bookings | Revive Holistic Therapies",
  description: "Manage bookings, statuses, appointment edits, and manual appointment creation.",
  path: "/admin/bookings",
});

type BookingsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function getSingleParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function statusClass(status: string) {
  if (status === "paid" || status === "confirmed") {
    return "rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700";
  }

  if (status === "pending" || status === "deposit paid") {
    return "rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700";
  }

  return "rounded-full bg-slate-200 px-4 py-2 text-sm font-semibold text-slate-700";
}

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = searchParams ? await searchParams : {};
  const [services, bookings] = await Promise.all([getAllServicesForAdmin(), getBookingsForAdmin()]);

  const selectedStatus = getSingleParam(params.status);
  const selectedService = getSingleParam(params.service);
  const selectedDate = getSingleParam(params.date);
  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus && booking.status !== selectedStatus) return false;
    if (selectedService && booking.serviceTitle !== selectedService) return false;
    if (selectedDate && booking.bookingDate !== selectedDate) return false;
    return true;
  });

  const today = new Date().toISOString().slice(0, 10);
  const weekAhead = new Date();
  weekAhead.setDate(weekAhead.getDate() + 7);
  const bookingsToday = bookings.filter((booking) => booking.bookingDate === today);
  const bookingsThisWeek = bookings.filter((booking) => new Date(`${booking.bookingDate}T${booking.bookingStart}:00`) <= weekAhead);
  const currentMonthLabel = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date());

  return (
    <>
      <AdminPageHeader
        eyebrow="Bookings"
        title="Bookings are now easier to scan and manage"
        description="Filtering, list-style editing, manual booking creation, and the schedule views now sit on their own page instead of being buried inside one long admin screen."
        action={
          <>
            <form action="/api/admin/bookings" method="get">
              <input type="hidden" name="format" value="csv" />
              <button type="submit" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 text-sm font-semibold text-[color:var(--color-heading)]">
                Export CSV
              </button>
            </form>
            <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm font-semibold text-white">
              Open public booking
            </Link>
          </>
        }
      />

      <AdminStatGrid>
        <AdminStatCard label="Filtered bookings" value={String(filteredBookings.length)} helper="Current results in the list below" />
        <AdminStatCard label="Today's bookings" value={String(bookingsToday.length)} helper="Appointments due today" />
        <AdminStatCard label="Week ahead" value={String(bookingsThisWeek.length)} helper="Bookings scheduled in the next 7 days" />
        <AdminStatCard
          label="Pending actions"
          value={String(bookings.filter((booking) => booking.status === "pending" || booking.paymentStatus === "pending").length)}
          helper="Bookings or payments needing follow-up"
        />
      </AdminStatGrid>

      <AdminPanel title="Filter bookings" description="Narrow the list by status, service, or date.">
        <form className="grid gap-3 rounded-[1.5rem] bg-[color:var(--color-surface)] p-4 md:grid-cols-4">
          <select name="status" defaultValue={selectedStatus} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {["pending", "confirmed", "paid", "deposit paid", "cancelled", "completed", "no show", "refunded"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select name="service" defaultValue={selectedService} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            <option value="">All services</option>
            {services.map((service) => (
              <option key={service._id?.toHexString()} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          <input name="date" type="date" defaultValue={selectedDate} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <div className="flex gap-2">
            <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
              Filter
            </button>
            <Link href="/admin/bookings" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">
              Reset
            </Link>
          </div>
        </form>
      </AdminPanel>

      <div className="grid gap-6">
        <AdminPanel title="Create manual booking" description="Add a booking directly from admin when a client books by phone or message.">
          <form action={createManualBooking} className="grid gap-3">
            <input name="customerName" placeholder="Customer name" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <input name="customerEmail" type="email" placeholder="Customer email" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <input name="customerPhone" placeholder="Customer phone" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <select name="serviceId" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
              {services.map((service) => (
                <option key={service._id?.toHexString()} value={service._id?.toHexString()}>
                  {service.title}
                </option>
              ))}
            </select>
            <input name="bookingDate" type="date" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <input name="bookingStart" type="time" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="bookingEnd" type="time" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            </div>
            <input name="practitionerName" placeholder="Practitioner name" defaultValue="Primary therapist" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <div className="grid grid-cols-2 gap-3">
              <select name="status" defaultValue="confirmed" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                {["pending", "confirmed", "paid", "deposit paid", "completed"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <select name="paymentStatus" defaultValue="unpaid" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                {["unpaid", "pending", "deposit paid", "paid"].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <select name="paymentProvider" defaultValue="clinic" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
              {["stripe", "gocardless", "clinic", "none"].map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))}
            </select>
            <textarea name="notes" placeholder="Client notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <textarea name="adminNotes" placeholder="Admin notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
            <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
              Create booking
            </button>
          </form>
        </AdminPanel>

        <AdminPanel title="Schedule views" description="Keep the filtered list, schedule summary, and month view together.">
          <div className="space-y-6">
            <BookingSchedule bookings={filteredBookings} />
            <BookingCalendar bookings={filteredBookings} monthLabel={currentMonthLabel} />
          </div>
        </AdminPanel>
      </div>

      <AdminPanel title="Booking list" description="Update statuses quickly from the list, then use the edit forms below for deeper changes.">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Booking list with customer, service, date, status, and payment provider</caption>
            <thead className="text-[color:var(--color-text-muted)]">
              <tr>
                <th scope="col" className="pb-3 pr-6 font-medium">Booking</th>
                <th scope="col" className="pb-3 pr-6 font-medium">Service</th>
                <th scope="col" className="pb-3 pr-6 font-medium">Date</th>
                <th scope="col" className="pb-3 pr-6 font-medium">Status</th>
                <th scope="col" className="pb-3 font-medium">Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking._id?.toHexString()} className="border-t border-[color:var(--color-border)]">
                  <th scope="row" className="py-4 pr-6 text-left">
                    <p className="font-semibold text-[color:var(--color-heading)]">{booking.customerName}</p>
                    <p className="text-[color:var(--color-text-muted)]">{booking.customerEmail}</p>
                  </th>
                  <td className="py-4 pr-6 text-[color:var(--color-text-muted)]">{booking.serviceTitle}</td>
                  <td className="py-4 pr-6 text-[color:var(--color-text-muted)]">
                    {booking.bookingDate} {booking.bookingStart}
                  </td>
                  <td className="py-4 pr-6">
                    <form action={updateBookingStatus} className="flex items-center gap-3">
                      <input type="hidden" name="bookingId" value={booking._id?.toHexString()} />
                      <select name="status" defaultValue={booking.status} className="rounded-full border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                        {["pending", "confirmed", "paid", "deposit paid", "cancelled", "completed", "no show", "refunded"].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                      <button type="submit" className={statusClass(booking.status)}>
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="py-4 text-[color:var(--color-text-muted)]">{booking.paymentProvider}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminPanel>

      <AdminPanel title="Edit booking details" description="Use the list below for reschedules, payment state updates, practitioner changes, and notes.">
        <div className="space-y-4">
          {filteredBookings.length ? (
            filteredBookings.map((booking, index) => (
              <details
                key={`edit-${booking._id?.toHexString()}`}
                open={index === 0}
                className="group rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-5"
              >
                <summary className="flex cursor-pointer list-none flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-semibold text-[color:var(--color-heading)]">
                    {booking.customerName} - {booking.serviceTitle}
                  </span>
                  <span className="text-sm text-[color:var(--color-text-muted)]">
                    {booking.bookingDate} at {booking.bookingStart}
                  </span>
                </summary>
                <form action={updateBookingDetails} className="mt-5 grid gap-3 lg:grid-cols-4">
                  <input type="hidden" name="bookingId" value={booking._id?.toHexString()} />
                  <input name="bookingDate" type="date" defaultValue={booking.bookingDate} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="bookingStart" type="time" defaultValue={booking.bookingStart} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="bookingEnd" type="time" defaultValue={booking.bookingEnd} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="practitionerName" defaultValue={booking.practitionerName ?? ""} placeholder="Practitioner" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <input name="paymentReference" defaultValue={booking.paymentReference ?? ""} placeholder="Payment reference" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
                  <select name="status" defaultValue={booking.status} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    {["pending", "confirmed", "paid", "deposit paid", "cancelled", "completed", "no show", "refunded"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <select name="paymentStatus" defaultValue={booking.paymentStatus} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    {["unpaid", "pending", "deposit paid", "paid", "failed", "refunded", "partially refunded"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <select name="paymentProvider" defaultValue={booking.paymentProvider} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    {["stripe", "gocardless", "clinic", "none"].map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                  </select>
                  <textarea name="notes" defaultValue={booking.notes} placeholder="Client notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm lg:col-span-2" />
                  <textarea name="adminNotes" defaultValue={booking.adminNotes} placeholder="Admin notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm lg:col-span-2" />
                  <div className="lg:col-span-4">
                    <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
                      Save booking changes
                    </button>
                  </div>
                </form>
              </details>
            ))
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">No bookings match the current filter.</p>
          )}
        </div>
      </AdminPanel>
    </>
  );
}
