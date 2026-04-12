import "server-only";

import type { ServiceDocument } from "@/lib/db-types";
import { getCollections } from "@/lib/collections";
import { ensureDatabaseSeeded } from "@/lib/bootstrap";

function parseTimeToMinutes(value: string) {
  const [hours, minutes] = value.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(value: number) {
  const hours = Math.floor(value / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (value % 60).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getDayOfWeek(dateString: string) {
  const date = new Date(`${dateString}T12:00:00`);
  return date.getDay();
}

function overlaps(startA: number, endA: number, startB: number, endB: number) {
  return startA < endB && startB < endA;
}

function toLocalDateTime(dateString: string, timeString: string) {
  return new Date(`${dateString}T${timeString}:00`);
}

export async function getBookingSettings() {
  await ensureDatabaseSeeded();
  const { settings } = await getCollections();
  const item = await settings.findOne({}, { sort: { updatedAt: -1 } });

  return item?.bookingSettings ?? {
    maximumBookingHorizonDays: 90,
    minimumNoticeHours: 12,
    cancellationWindowHours: 24,
    rescheduleWindowHours: 24,
  };
}

export async function validateBookingRules(dateString: string, startTime: string) {
  const bookingSettings = await getBookingSettings();
  const now = new Date();
  const appointment = toLocalDateTime(dateString, startTime);
  const startOfToday = new Date(now);
  startOfToday.setHours(0, 0, 0, 0);
  const minimumAllowed = new Date(now.getTime() + bookingSettings.minimumNoticeHours * 60 * 60 * 1000);
  const maximumAllowed = new Date(now.getTime() + bookingSettings.maximumBookingHorizonDays * 24 * 60 * 60 * 1000);

  if (Number.isNaN(appointment.getTime())) {
    return {
      ok: false,
      error: "Invalid appointment date or time.",
      bookingSettings,
    };
  }

  if (appointment < startOfToday) {
    return {
      ok: false,
      error: "Appointments cannot be booked in the past.",
      bookingSettings,
    };
  }

  if (appointment < minimumAllowed) {
    return {
      ok: false,
      error: `Appointments require at least ${bookingSettings.minimumNoticeHours} hours notice.`,
      bookingSettings,
    };
  }

  if (appointment > maximumAllowed) {
    return {
      ok: false,
      error: `Appointments can only be booked ${bookingSettings.maximumBookingHorizonDays} days ahead.`,
      bookingSettings,
    };
  }

  return {
    ok: true,
    bookingSettings,
  };
}

export async function canCancelBooking(bookingDate: string, bookingStart: string) {
  const bookingSettings = await getBookingSettings();
  const now = new Date();
  const appointment = toLocalDateTime(bookingDate, bookingStart);
  const deadline = appointment.getTime() - bookingSettings.cancellationWindowHours * 60 * 60 * 1000;

  return {
    ok: now.getTime() <= deadline,
    bookingSettings,
  };
}

export async function canRescheduleBooking(bookingDate: string, bookingStart: string) {
  const bookingSettings = await getBookingSettings();
  const now = new Date();
  const appointment = toLocalDateTime(bookingDate, bookingStart);
  const deadline = appointment.getTime() - bookingSettings.rescheduleWindowHours * 60 * 60 * 1000;

  return {
    ok: now.getTime() <= deadline,
    bookingSettings,
  };
}

export async function getAvailabilityForDate(dateString: string) {
  await ensureDatabaseSeeded();
  const { availability, blockedDates } = await getCollections();
  const dayOfWeek = getDayOfWeek(dateString);
  const [rules, blocked] = await Promise.all([
    availability.find({ dayOfWeek, isActive: true }).sort({ startTime: 1 }).toArray(),
    blockedDates.find({}).toArray(),
  ]);

  return {
    rules,
    blocked,
  };
}

export async function getAvailableSlots(service: ServiceDocument, dateString: string) {
  await ensureDatabaseSeeded();
  const bookingRuleCheck = await validateBookingRules(dateString, "00:00");
  const ruleError = bookingRuleCheck.ok ? "" : bookingRuleCheck.error ?? "";

  if (!bookingRuleCheck.ok && ruleError.includes("days ahead")) {
    return [];
  }

  const { bookings } = await getCollections();
  const { rules, blocked } = await getAvailabilityForDate(dateString);
  const existing = await bookings
    .find({
      bookingDate: dateString,
      status: { $nin: ["cancelled", "refunded"] },
    })
    .toArray();

  const availableSlots: Array<{ start: string; end: string; practitionerName: string }> = [];

  for (const rule of rules) {
    const startWindow = parseTimeToMinutes(rule.startTime);
    const endWindow = parseTimeToMinutes(rule.endTime);
    const serviceDuration = service.durationMinutes;
    const step = rule.slotInterval;

    for (let current = startWindow; current + serviceDuration <= endWindow; current += step) {
      const slotStart = current;
      const slotEnd = current + serviceDuration;
      const slotStartTime = minutesToTime(slotStart);
      const slotEndTime = minutesToTime(slotEnd);

      const blockedForSlot = blocked.some((item) => {
        const blockedDate = new Date(item.startDateTime).toISOString().slice(0, 10);
        if (blockedDate !== dateString) {
          return false;
        }

        const blockedStart = parseTimeToMinutes(new Date(item.startDateTime).toISOString().slice(11, 16));
        const blockedEnd = parseTimeToMinutes(new Date(item.endDateTime).toISOString().slice(11, 16));
        return overlaps(slotStart, slotEnd, blockedStart, blockedEnd);
      });

      if (blockedForSlot) {
        continue;
      }

      const conflictingBooking = existing.some((booking) => {
        if ((booking.practitionerName ?? "Primary therapist") !== (rule.practitionerName ?? "Primary therapist")) {
          return false;
        }
        const bookingStart = parseTimeToMinutes(booking.bookingStart);
        const bookingEnd = parseTimeToMinutes(booking.bookingEnd);
        return overlaps(
          slotStart - rule.bufferBefore,
          slotEnd + rule.bufferAfter,
          bookingStart,
          bookingEnd,
        );
      });

      if (!conflictingBooking) {
        availableSlots.push({ start: slotStartTime, end: slotEndTime, practitionerName: rule.practitionerName ?? "Primary therapist" });
      }
    }
  }

  return availableSlots;
}

export async function isSlotAvailable(service: ServiceDocument, dateString: string, start: string, end: string, practitionerName?: string) {
  const bookingRuleCheck = await validateBookingRules(dateString, start);

  if (!bookingRuleCheck.ok) {
    return false;
  }

  const slots = await getAvailableSlots(service, dateString);
  return slots.some((slot) => slot.start === start && slot.end === end && (!practitionerName || slot.practitionerName === practitionerName));
}

export async function getUpcomingAndPastBookingsForUser(userId: string) {
  await ensureDatabaseSeeded();
  const { bookings } = await getCollections();
  const items = await bookings.find({ userId: { $exists: true } }).sort({ bookingDate: 1, bookingStart: 1 }).toArray();
  const userItems = items.filter((item) => item.userId?.toHexString() === userId);
  const today = new Date().toISOString().slice(0, 10);

  return {
    upcoming: userItems.filter((item) => item.bookingDate >= today && !["completed", "cancelled", "refunded"].includes(item.status)),
    past: userItems.filter((item) => item.bookingDate < today || ["completed", "cancelled", "refunded"].includes(item.status)),
  };
}
