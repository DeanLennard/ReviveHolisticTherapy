"use client";

import { useState } from "react";

import { BookingDetailsModal, type AdminBookingDetails } from "@/components/admin/booking-details-modal";
import { addDaysToDateKey, formatBusinessDate, getBusinessDateKey } from "@/lib/date";

function groupByDate(bookings: AdminBookingDetails[]) {
  return bookings.reduce<Record<string, AdminBookingDetails[]>>((accumulator, booking) => {
    const key = booking.bookingDate;
    accumulator[key] = [...(accumulator[key] ?? []), booking].sort((a, b) => a.bookingStart.localeCompare(b.bookingStart));
    return accumulator;
  }, {});
}

export function BookingSchedule({ bookings }: { bookings: AdminBookingDetails[] }) {
  const [selectedBooking, setSelectedBooking] = useState<AdminBookingDetails | null>(null);
  const grouped = groupByDate(bookings);
  const today = getBusinessDateKey();
  const weekDates = Array.from({ length: 7 }, (_, index) => addDaysToDateKey(today, index));
  const todaysBookings = grouped[today] ?? [];

  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
        <h3 className="font-display text-2xl font-semibold">Day view</h3>
        <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">{formatBusinessDate(today)}</p>
        <div className="mt-4 space-y-3">
          {todaysBookings.length ? (
            todaysBookings.map((booking) => (
              <button key={booking.id} type="button" onClick={() => setSelectedBooking(booking)} className="w-full rounded-[1.25rem] bg-[color:var(--color-surface)] p-4 text-left transition hover:bg-[#e7f0fb]">
                <p className="font-semibold text-[color:var(--color-heading)]">
                  {booking.bookingStart} - {booking.bookingEnd}
                </p>
                <p className="mt-1 text-sm text-[color:var(--color-heading)]">{booking.customerName}</p>
                <p className="mt-1 text-sm text-[color:var(--color-text-muted)]">
                  {booking.serviceTitle} - {booking.status}
                </p>
              </button>
            ))
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">No bookings today.</p>
          )}
        </div>
      </div>
      <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-6 shadow-[var(--shadow-soft)]">
        <h3 className="font-display text-2xl font-semibold">Week view</h3>
        <div className="mt-4 space-y-4">
          {weekDates.map((date) => {
            const items = grouped[date] ?? [];

            return (
              <div key={date} className="rounded-[1.25rem] bg-[color:var(--color-surface)] p-4">
                <p className="font-semibold text-[color:var(--color-heading)]">{formatBusinessDate(date)}</p>
                {items.length ? (
                  <div className="mt-3 space-y-2">
                    {items.map((booking) => (
                    <button key={booking.id} type="button" onClick={() => setSelectedBooking(booking)} className="flex w-full items-center justify-between gap-3 rounded-xl bg-white px-3 py-2 text-left text-sm transition hover:bg-[#e7f0fb]">
                      <span className="font-medium text-[color:var(--color-heading)]">{booking.bookingStart}</span>
                      <span className="flex-1 text-[color:var(--color-heading)]">{booking.customerName}</span>
                      <span className="text-[color:var(--color-text-muted)]">{booking.serviceTitle}</span>
                    </button>
                    ))}
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-[color:var(--color-text-muted)]">No bookings.</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </div>
  );
}
