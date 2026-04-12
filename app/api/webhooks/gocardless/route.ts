import { createHmac, timingSafeEqual } from "node:crypto";

import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { getCollections } from "@/lib/collections";
import { getSiteSettings } from "@/lib/content";
import { sendAdminEventNotification } from "@/lib/mailer";

function verifySignature(payload: string, signature: string, secret: string) {
  const expected = createHmac("sha256", secret).update(payload).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const actualBuffer = Buffer.from(signature, "hex");

  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }

  return timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.GOCARDLESS_WEBHOOK_SECRET;
  const payload = await request.text();
  const signature = request.headers.get("Webhook-Signature");

  if (webhookSecret && signature && !verifySignature(payload, signature, webhookSecret)) {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const body = JSON.parse(payload) as {
    events?: Array<{
      action: string;
      links?: { billing_request?: string };
    }>;
  };

  const { bookings, payments } = await getCollections();

  for (const event of body.events ?? []) {
    const billingRequestId = event.links?.billing_request;

    if (!billingRequestId) {
      continue;
    }

    const booking = await bookings.findOne({ paymentReference: billingRequestId });

    if (!booking?._id) {
      continue;
    }

    if (["fulfilled", "confirmed", "submitted"].includes(event.action)) {
      await bookings.updateOne(
        { _id: booking._id },
        {
          $set: {
            status: "confirmed",
            paymentStatus: booking.depositAmount > 0 && booking.totalAmount > booking.depositAmount ? "deposit paid" : "paid",
            paymentProvider: "gocardless",
            updatedAt: new Date(),
          },
        },
      );
      await payments.updateMany(
        { bookingId: booking._id },
        {
          $set: {
            provider: "gocardless",
            status: booking.depositAmount > 0 && booking.totalAmount > booking.depositAmount ? "deposit paid" : "paid",
            updatedAt: new Date(),
          },
        },
      );
    }

    if (["failed", "cancelled"].includes(event.action)) {
      await bookings.updateOne(
        { _id: booking._id },
        {
          $set: {
            paymentStatus: "failed",
            updatedAt: new Date(),
          },
        },
      );
      await payments.updateMany(
        { bookingId: booking._id },
        {
          $set: {
            provider: "gocardless",
            status: "failed",
            updatedAt: new Date(),
          },
        },
      );
    }

    const updatedBooking = await bookings.findOne({ _id: new ObjectId(booking._id) });
    if (updatedBooking) {
      const settings = await getSiteSettings();
      await sendAdminEventNotification(`gocardless ${event.action}`, updatedBooking, settings).catch(() => undefined);
    }
  }

  await writeAuditLog({
    action: "webhook.gocardless.received",
    targetCollection: "webhooks",
    metadata: { events: body.events?.length ?? 0 },
  });

  return NextResponse.json({ received: true });
}
