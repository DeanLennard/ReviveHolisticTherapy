import Link from "next/link";

import { BookingCalendar } from "@/components/admin/booking-calendar";
import { BookingSchedule } from "@/components/admin/booking-schedule";
import { AdminPageHeader, AdminPanel, AdminStatCard, AdminStatGrid } from "@/components/admin/admin-ui";
import { createManualBooking, updateBookingDetails } from "@/lib/admin-actions";
import { getAllServicesForAdmin, getBookingsForAdmin } from "@/lib/content";
import { addDaysToDateKey, getBusinessDateKey } from "@/lib/date";
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

type BookingTab = "all" | "past" | "future" | "cancelled" | "payment-pending";

const bookingTabs: Array<{ value: BookingTab; label: string }> = [
  { value: "all", label: "All bookings" },
  { value: "past", label: "Past bookings" },
  { value: "future", label: "Future bookings" },
  { value: "cancelled", label: "Cancelled" },
  { value: "payment-pending", label: "Payment pending" },
];

function getBookingTab(value: string): BookingTab {
  return bookingTabs.some((tab) => tab.value === value) ? (value as BookingTab) : "all";
}

export default async function AdminBookingsPage({ searchParams }: BookingsPageProps) {
  const params = searchParams ? await searchParams : {};
  const [services, bookings] = await Promise.all([getAllServicesForAdmin(), getBookingsForAdmin()]);

  const selectedStatus = getSingleParam(params.status);
  const selectedService = getSingleParam(params.service);
  const selectedDate = getSingleParam(params.date);
  const searchQuery = getSingleParam(params.q).trim().toLowerCase();
  const selectedTab = getBookingTab(getSingleParam(params.tab));
  const selectedBookingId = getSingleParam(params.edit);
  const requestedPage = Number.parseInt(getSingleParam(params.page), 10);
  const currentPage = Number.isFinite(requestedPage) && requestedPage > 0 ? requestedPage : 1;
  const today = getBusinessDateKey();

  const filteredBookings = bookings.filter((booking) => {
    if (selectedStatus && booking.status !== selectedStatus) return false;
    if (selectedService && booking.serviceTitle !== selectedService) return false;
    if (selectedDate && booking.bookingDate !== selectedDate) return false;
    if (searchQuery) {
      const searchableValues = [
        booking.customerName,
        booking.customerEmail,
        booking.customerPhone,
        booking.serviceTitle,
        booking._id?.toHexString() ?? "",
        booking.paymentReference ?? "",
      ];

      if (!searchableValues.some((value) => value.toLowerCase().includes(searchQuery))) return false;
    }

    if (selectedTab === "past" && booking.bookingDate >= today) return false;
    if (selectedTab === "future" && booking.bookingDate < today) return false;
    if (selectedTab === "cancelled" && booking.status !== "cancelled") return false;
    if (selectedTab === "payment-pending" && booking.paymentStatus !== "pending") return false;
    return true;
  });

  const weekAhead = addDaysToDateKey(today, 6);
  const bookingsToday = bookings.filter((booking) => booking.bookingDate === today);
  const bookingsThisWeek = bookings.filter((booking) => booking.bookingDate >= today && booking.bookingDate <= weekAhead);
  const currentMonthLabel = new Intl.DateTimeFormat("en-GB", { month: "long", year: "numeric" }).format(new Date());
  const pageSize = 10;
  const totalPages = Math.max(1, Math.ceil(filteredBookings.length / pageSize));
  const page = Math.min(currentPage, totalPages);
  const paginatedBookings = filteredBookings.slice((page - 1) * pageSize, page * pageSize);
  const scheduleBookings = filteredBookings.flatMap((booking) => {
    const id = booking._id?.toHexString();
    if (!id) return [];

    return [{
      id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      serviceTitle: booking.serviceTitle,
      practitionerName: booking.practitionerName,
      bookingDate: booking.bookingDate,
      bookingStart: booking.bookingStart,
      bookingEnd: booking.bookingEnd,
      status: booking.status,
      paymentStatus: booking.paymentStatus,
      paymentProvider: booking.paymentProvider,
      paymentReference: booking.paymentReference,
      paymentMode: booking.paymentMode,
      depositAmount: booking.depositAmount,
      totalAmount: booking.totalAmount,
      notes: booking.notes,
      adminNotes: booking.adminNotes,
    }];
  });
  const selectedBooking = bookings.find((booking) => booking._id?.toHexString() === selectedBookingId) ?? null;
  const buildBookingsHref = (updates: Record<string, string | undefined>, hash = "") => {
    const keys = ["tab", "q", "status", "service", "date", "page", "edit"] as const;
    const query = new URLSearchParams();

    for (const key of keys) {
      const value = Object.prototype.hasOwnProperty.call(updates, key) ? updates[key] : getSingleParam(params[key]);
      if (value) query.set(key, value);
    }

    const search = query.toString();
    return `/admin/bookings${search ? `?${search}` : ""}${hash}`;
  };

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
            <BookingSchedule bookings={scheduleBookings} />
            <BookingCalendar bookings={scheduleBookings} monthLabel={currentMonthLabel} />
          </div>
        </AdminPanel>
      </div>

      <AdminPanel id="booking-list" title="Booking list" description="Select a booking to open its focused edit form below.">
        <div className="mb-6 flex flex-wrap gap-2 border-b border-[color:var(--color-border)] pb-4">
          {bookingTabs.map((tab) => (
            <Link
              key={tab.value}
              href={buildBookingsHref({ tab: tab.value, page: undefined, edit: undefined })}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedTab === tab.value
                  ? "bg-[color:var(--color-accent)] text-white"
                  : "bg-[color:var(--color-surface)] text-[color:var(--color-heading)] hover:bg-[color:var(--color-border)]"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        <form className="mb-6 grid gap-3 rounded-[1.5rem] bg-[color:var(--color-surface)] p-4 md:grid-cols-2 xl:grid-cols-5">
          <input type="hidden" name="tab" value={selectedTab} />
          <label className="xl:col-span-2">
            <span className="sr-only">Search bookings</span>
            <input name="q" defaultValue={searchQuery} placeholder="Search name, email, telephone, or reference" className="w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          </label>
          <select name="status" defaultValue={selectedStatus} aria-label="Booking status" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {["pending", "confirmed", "paid", "deposit paid", "cancelled", "completed", "no show", "refunded"].map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select name="service" defaultValue={selectedService} aria-label="Service" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
            <option value="">All services</option>
            {services.map((service) => (
              <option key={service._id?.toHexString()} value={service.title}>{service.title}</option>
            ))}
          </select>
          <input name="date" type="date" defaultValue={selectedDate} aria-label="Booking date" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
          <div className="flex gap-2 xl:col-span-2">
            <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Search</button>
            <Link href="/admin/bookings" className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Reset</Link>
          </div>
        </form>
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
              {paginatedBookings.map((booking) => (
                <tr key={booking._id?.toHexString()} className="border-t border-[color:var(--color-border)]">
                  <th scope="row" className="py-4 pr-6 text-left">
                    <Link
                      href={buildBookingsHref({ edit: booking._id?.toHexString(), page: String(page) }, "#edit-booking")}
                      className="font-semibold text-[color:var(--color-heading)] transition hover:text-[color:var(--color-accent)]"
                    >
                      {booking.customerName}
                    </Link>
                    <p className="text-[color:var(--color-text-muted)]">{booking.customerEmail}</p>
                    <p className="text-[color:var(--color-text-muted)]">{booking.customerPhone}</p>
                  </th>
                  <td className="py-4 pr-6 text-[color:var(--color-text-muted)]">{booking.serviceTitle}</td>
                  <td className="py-4 pr-6 text-[color:var(--color-text-muted)]">
                    {booking.bookingDate} {booking.bookingStart}
                  </td>
                  <td className="py-4 pr-6"><span className={statusClass(booking.status)}>{booking.status}</span></td>
                  <td className="py-4 text-[color:var(--color-text-muted)]">{booking.paymentProvider} &middot; {booking.paymentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {paginatedBookings.length === 0 ? <p className="mt-5 text-sm text-[color:var(--color-text-muted)]">No bookings match the current filters.</p> : null}
        {totalPages > 1 ? (
          <nav aria-label="Booking list pages" className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-[color:var(--color-text-muted)]">
              Showing {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, filteredBookings.length)} of {filteredBookings.length}
            </p>
            <div className="flex gap-2">
              {page > 1 ? <Link href={buildBookingsHref({ page: String(page - 1) })} className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Previous</Link> : null}
              {page < totalPages ? <Link href={buildBookingsHref({ page: String(page + 1) })} className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">Next</Link> : null}
            </div>
          </nav>
        ) : null}
      </AdminPanel>

      <AdminPanel id="edit-booking" title="Edit booking details" description="Select a booking from the list to reschedule it, update payment state, or add notes.">
        {selectedBooking ? (
          <div key={selectedBooking._id?.toHexString()} className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-[color:var(--color-heading)]">{selectedBooking.customerName} - {selectedBooking.serviceTitle}</p>
                <p className="text-sm text-[color:var(--color-text-muted)]">{selectedBooking.customerEmail} &middot; {selectedBooking.customerPhone}</p>
              </div>
              <Link href={buildBookingsHref({ edit: undefined }, "#booking-list")} className="text-sm font-semibold text-[color:var(--color-accent)]">Close editor</Link>
            </div>
            <form action={updateBookingDetails} className="mt-5 grid gap-3 lg:grid-cols-4">
              <input type="hidden" name="bookingId" value={selectedBooking._id?.toHexString()} />
              <input name="customerName" defaultValue={selectedBooking.customerName} placeholder="Customer name" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="customerEmail" type="email" defaultValue={selectedBooking.customerEmail} placeholder="Customer email" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="customerPhone" type="tel" defaultValue={selectedBooking.customerPhone} placeholder="Customer telephone" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="bookingDate" type="date" defaultValue={selectedBooking.bookingDate} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="bookingStart" type="time" defaultValue={selectedBooking.bookingStart} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="bookingEnd" type="time" defaultValue={selectedBooking.bookingEnd} className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="practitionerName" defaultValue={selectedBooking.practitionerName ?? ""} placeholder="Practitioner" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <input name="paymentReference" defaultValue={selectedBooking.paymentReference ?? ""} placeholder="Payment reference" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm" />
              <label className="text-sm font-medium text-[color:var(--color-heading)]">
                Booking status
                <select name="status" defaultValue={selectedBooking.status} className="mt-1 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    {["pending", "confirmed", "paid", "deposit paid", "cancelled", "completed", "no show", "refunded"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                </select>
              </label>
              <label className="text-sm font-medium text-[color:var(--color-heading)]">
                Payment status
                <select name="paymentStatus" defaultValue={selectedBooking.paymentStatus} className="mt-1 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    {["unpaid", "pending", "deposit paid", "paid", "failed", "refunded", "partially refunded"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                </select>
              </label>
              <label className="text-sm font-medium text-[color:var(--color-heading)]">
                Payment method
                <select name="paymentProvider" defaultValue={selectedBooking.paymentProvider} className="mt-1 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm">
                    {["stripe", "gocardless", "clinic", "none"].map((provider) => (
                      <option key={provider} value={provider}>
                        {provider}
                      </option>
                    ))}
                </select>
              </label>
              <textarea name="notes" defaultValue={selectedBooking.notes} placeholder="Client notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm lg:col-span-2" />
              <textarea name="adminNotes" defaultValue={selectedBooking.adminNotes} placeholder="Admin notes" className="rounded-2xl border border-[color:var(--color-border)] bg-white px-3 py-2 text-sm lg:col-span-2" />
              <div className="lg:col-span-4">
                <button type="submit" className="rounded-full bg-[color:var(--color-accent)] px-4 py-2 text-sm font-semibold text-white">
                  Save booking changes
                </button>
              </div>
            </form>
          </div>
        ) : (
          <p className="text-sm text-[color:var(--color-text-muted)]">Select a booking from the list above to edit it.</p>
        )}
      </AdminPanel>
    </>
  );
}
