"use client";

import { useEffect } from "react";

export type AdminBookingDetails = {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceTitle: string;
  practitionerName?: string | null;
  bookingDate: string;
  bookingStart: string;
  bookingEnd: string;
  status: string;
  paymentStatus: string;
  paymentProvider: string;
  paymentReference?: string | null;
  paymentMode?: string;
  depositAmount: number;
  totalAmount: number;
  notes: string;
  adminNotes: string;
};

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[color:var(--color-surface)] p-3">
      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[color:var(--color-text-muted)]">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-[color:var(--color-heading)]">{value}</p>
    </div>
  );
}

export function BookingDetailsModal({ booking, onClose }: { booking: AdminBookingDetails | null; onClose: () => void }) {
  useEffect(() => {
    if (!booking) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [booking, onClose]);

  if (!booking) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061d43]/55 p-4" role="presentation" onMouseDown={onClose}>
      <section
        aria-labelledby="booking-details-title"
        aria-modal="true"
        role="dialog"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl sm:p-8"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex gap-4 sm:items-start sm:justify-between">
          <div>
            <p className="eyebrow">Booking details</p>
            <h2 id="booking-details-title" className="mt-3 font-display text-3xl font-semibold text-[color:var(--color-heading)]">{booking.customerName}</h2>
            <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">Reference: {booking.id}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">Close</button>
        </div>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          <Detail label="Customer" value={booking.customerName} />
          <Detail label="Email" value={booking.customerEmail} />
          <Detail label="Telephone" value={booking.customerPhone} />
          <Detail label="Treatment" value={booking.serviceTitle} />
          <Detail label="Appointment" value={`${booking.bookingDate} · ${booking.bookingStart}–${booking.bookingEnd}`} />
          <Detail label="Practitioner" value={booking.practitionerName || "Not assigned"} />
          <Detail label="Booking status" value={booking.status} />
          <Detail label="Payment status" value={booking.paymentStatus} />
          <Detail label="Payment method" value={booking.paymentProvider} />
          <Detail label="Payment reference" value={booking.paymentReference || "Not recorded"} />
          <Detail label="Total" value={`£${booking.totalAmount.toFixed(2)}`} />
          <Detail label="Deposit" value={booking.depositAmount ? `£${booking.depositAmount.toFixed(2)}` : "None"} />
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Detail label="Client notes" value={booking.notes || "None"} />
          <Detail label="Admin notes" value={booking.adminNotes || "None"} />
        </div>
      </section>
    </div>
  );
}
