import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { getCollections } from "@/lib/collections";
import { getSiteSettings } from "@/lib/content";
import { sendBookingConfirmationEmail } from "@/lib/mailer";

function getHoursUntil(date: Date) {
  return (date.getTime() - Date.now()) / (1000 * 60 * 60);
}

export async function POST(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const settings = await getSiteSettings();
  const reminderLeadHours = settings?.emailSettings?.reminderLeadHours ?? 24;
  const { bookings } = await getCollections();
  const items = await bookings.find({ status: { $in: ["pending", "confirmed", "paid", "deposit paid"] } }).toArray();

  let sent = 0;

  for (const booking of items) {
    if (booking.reminderSentAt) {
      continue;
    }

    const appointment = new Date(`${booking.bookingDate}T${booking.bookingStart}:00`);
    const hoursUntil = getHoursUntil(appointment);

    if (hoursUntil <= reminderLeadHours && hoursUntil > reminderLeadHours - 1.5) {
      await sendBookingConfirmationEmail(booking, settings).catch(() => undefined);
      await bookings.updateOne(
        { _id: booking._id },
        { $set: { reminderSentAt: new Date(), updatedAt: new Date() } },
      );
      sent += 1;
    }
  }

  await writeAuditLog({
    action: "cron.reminders.run",
    targetCollection: "bookings",
    metadata: { sent },
  });

  return NextResponse.json({ sent });
}
