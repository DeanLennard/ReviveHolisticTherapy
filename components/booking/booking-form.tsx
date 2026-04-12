"use client";

import { useEffect, useMemo, useState } from "react";

import { trackEvent } from "@/components/analytics";

type ServiceOption = {
  id: string;
  title: string;
  durationMinutes: number;
  paymentMode: "full-online" | "deposit" | "pay-later";
  acceptedPaymentMethods?: Array<"stripe" | "gocardless" | "clinic">;
  fullPaymentRequired?: boolean;
  payLaterEnabled?: boolean;
};

type PaymentSettings = {
  stripeEnabled: boolean;
  goCardlessEnabled: boolean;
  defaultMethod: string;
  refundSupport: boolean;
  payLaterEnabled?: boolean;
};

type BookingSettings = {
  maximumBookingHorizonDays: number;
  minimumNoticeHours: number;
  cancellationWindowHours: number;
  rescheduleWindowHours: number;
};

type BookingFormProps = {
  services: ServiceOption[];
  paymentSettings: PaymentSettings;
  bookingSettings: BookingSettings;
};

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function maxDateString(maximumBookingHorizonDays: number) {
  const date = new Date();
  date.setDate(date.getDate() + maximumBookingHorizonDays);
  return date.toISOString().slice(0, 10);
}

export function BookingForm({ services, paymentSettings, bookingSettings }: BookingFormProps) {
  const [serviceId, setServiceId] = useState(services[0]?.id ?? "");
  const [date, setDate] = useState(todayString());
  const [slots, setSlots] = useState<Array<{ start: string; end: string; practitionerName: string }>>([]);
  const [selectedSlot, setSelectedSlot] = useState<{ start: string; end: string; practitionerName: string } | null>(null);
  const [paymentMode, setPaymentMode] = useState<"full-online" | "deposit" | "pay-later">("deposit");
  const [paymentProvider, setPaymentProvider] = useState<"stripe" | "gocardless" | "clinic">(
    paymentSettings.defaultMethod === "GoCardless" ? "gocardless" : paymentSettings.defaultMethod === "Pay on arrival" ? "clinic" : "stripe",
  );
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const selectedService = useMemo(() => services.find((service) => service.id === serviceId), [serviceId, services]);

  function getPreferredProvider(service: ServiceOption | undefined) {
    if (!service) {
      return "clinic" as const;
    }

    if (service.acceptedPaymentMethods?.includes(paymentProvider)) {
      return paymentProvider;
    }

    if (service.acceptedPaymentMethods?.includes("stripe")) {
      return "stripe" as const;
    }

    if (service.acceptedPaymentMethods?.includes("gocardless")) {
      return "gocardless" as const;
    }

    return "clinic" as const;
  }

  useEffect(() => {
    let active = true;

    async function fetchSlots() {
      if (!serviceId || !date) {
        return;
      }

      const response = await fetch(`/api/availability?serviceId=${encodeURIComponent(serviceId)}&date=${encodeURIComponent(date)}`);
      const data = await response.json();

      if (active) {
        setSlots(data.slots ?? []);
        setSelectedSlot(null);
        setMessage(data.error ?? "");
      }
    }

    void fetchSlots();

    return () => {
      active = false;
    };
  }, [serviceId, date]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!selectedSlot) {
      setMessage("Please select an available time slot.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    const payload = {
      serviceId,
      bookingDate: date,
      bookingStart: selectedSlot.start,
      bookingEnd: selectedSlot.end,
      customerName: `${formData.get("firstName")} ${formData.get("lastName")}`.trim(),
      customerEmail: String(formData.get("email") ?? ""),
      customerPhone: String(formData.get("phone") ?? ""),
      practitionerName: selectedSlot.practitionerName,
      notes: String(formData.get("notes") ?? ""),
      paymentMode: String(formData.get("paymentMode") ?? "deposit"),
      paymentProvider: String(formData.get("paymentProvider") ?? "clinic"),
    };

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.error ?? "Booking failed. Please try another slot.");
      setSubmitting(false);
      return;
    }

    if (data.redirectUrl) {
      window.location.href = data.redirectUrl;
      return;
    }

    setMessage(`Booking created successfully. Reference: ${data.bookingId}`);
    trackEvent("booking_completed", {
      serviceId,
      bookingDate: date,
      paymentMode: payload.paymentMode,
    });
    event.currentTarget.reset();
    setSubmitting(false);
    setSelectedSlot(null);
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
      <h2 className="font-display text-3xl font-semibold">Complete your appointment request</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Service
          <select
            value={serviceId}
            onChange={(event) => {
              const nextServiceId = event.target.value;
              const nextService = services.find((service) => service.id === nextServiceId);
              setServiceId(nextServiceId);
              setPaymentMode(nextService?.fullPaymentRequired ? "full-online" : nextService?.paymentMode ?? "deposit");
              setPaymentProvider(getPreferredProvider(nextService));
            }}
            className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none"
          >
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.title}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Preferred date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            min={todayString()}
            max={maxDateString(bookingSettings.maximumBookingHorizonDays)}
            className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none"
          />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          First name
          <input name="firstName" type="text" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none" placeholder="First name" />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Last name
          <input name="lastName" type="text" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none" placeholder="Last name" />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Email
          <input name="email" type="email" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none" placeholder="you@example.com" />
        </label>
        <label className="text-sm font-medium text-[color:var(--color-heading)]">
          Phone
          <input name="phone" type="tel" required className="focus-ring mt-2 w-full rounded-2xl border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none" placeholder="Phone number" />
        </label>
      </div>

      <div className="mt-8">
        <p className="text-sm font-medium text-[color:var(--color-heading)]">
          Available time slots{selectedService ? ` for ${selectedService.durationMinutes} minute treatment` : ""}
        </p>
        <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
          Minimum notice is {bookingSettings.minimumNoticeHours} hours. Online booking is open {bookingSettings.maximumBookingHorizonDays} days ahead.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          {slots.length ? (
            slots.map((slot) => (
              <button
                key={`${slot.start}-${slot.end}`}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                 selectedSlot?.start === slot.start
                    && selectedSlot?.practitionerName === slot.practitionerName
                    ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)] text-white"
                    : "border-[color:var(--color-border)] text-[color:var(--color-heading)] hover:border-[color:var(--color-accent)]"
                }`}
              >
                {slot.start} · {slot.practitionerName}
              </button>
            ))
          ) : (
            <p className="text-sm text-[color:var(--color-text-muted)]">No slots currently available for this date.</p>
          )}
        </div>
      </div>

      <label className="mt-8 block text-sm font-medium text-[color:var(--color-heading)]">
        Notes for your therapist
        <textarea name="notes" className="focus-ring mt-2 min-h-32 w-full rounded-[1.5rem] border border-[color:var(--color-border)] bg-white px-4 py-3 outline-none" placeholder="Anything you would like us to know before the appointment?" />
      </label>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {(selectedService?.payLaterEnabled === false
          ? [
              { label: `Pay full online${paymentSettings.stripeEnabled ? " via hosted checkout" : ""}`, value: "full-online" as const },
              { label: "Pay deposit only", value: "deposit" as const },
            ]
          : [
          { label: `Pay full online${paymentSettings.stripeEnabled ? " via hosted checkout" : ""}`, value: "full-online" as const },
          { label: "Pay deposit only", value: "deposit" as const },
          { label: "Pay on arrival", value: "pay-later" as const },
        ]).map((option) => (
          <label key={option.label} className="rounded-[1.25rem] border border-[color:var(--color-border)] p-4 text-sm font-medium text-[color:var(--color-heading)]">
            <input
              type="radio"
              name="paymentMode"
              value={option.value}
              checked={paymentMode === option.value}
              onChange={() => setPaymentMode(option.value)}
              className="mr-3"
            />
            {option.label}
          </label>
        ))}
      </div>

      {paymentMode !== "pay-later" ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            paymentSettings.stripeEnabled && selectedService?.acceptedPaymentMethods?.includes("stripe")
              ? { label: "Stripe checkout", value: "stripe" as const }
              : null,
            paymentSettings.goCardlessEnabled && selectedService?.acceptedPaymentMethods?.includes("gocardless")
              ? { label: "GoCardless bank payment", value: "gocardless" as const }
              : null,
          ]
            .filter(Boolean)
            .map((provider) => (
              <label key={provider?.value} className="rounded-[1.25rem] border border-[color:var(--color-border)] p-4 text-sm font-medium text-[color:var(--color-heading)]">
                <input
                  type="radio"
                  name="paymentProvider"
                  value={provider?.value}
                  checked={paymentProvider === provider?.value}
                  onChange={() => setPaymentProvider(provider!.value)}
                  className="mr-3"
                />
                {provider?.label}
              </label>
            ))}
        </div>
      ) : (
        <input type="hidden" name="paymentProvider" value="clinic" />
      )}

      <label className="mt-8 flex items-start gap-3 rounded-[1.25rem] bg-[color:var(--color-surface)] p-4 text-sm text-[color:var(--color-heading)]">
        <input type="checkbox" defaultChecked className="mt-1" />
        <span>I consent to the clinic using my details to manage this booking and send service-related communications.</span>
      </label>

      {message ? (
        <p className="mt-4 text-sm font-medium text-[color:var(--color-heading)]" aria-live="polite">
          {message}
        </p>
      ) : null}

      <button type="submit" disabled={submitting} className="mt-8 rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white disabled:opacity-60">
        {submitting ? "Creating booking..." : "Confirm booking request"}
      </button>
    </form>
  );
}
