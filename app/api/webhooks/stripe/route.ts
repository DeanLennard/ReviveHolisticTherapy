import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { getCollections } from "@/lib/collections";
import { getSiteSettings } from "@/lib/content";
import { sendAdminEventNotification } from "@/lib/mailer";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const stripe = getStripeClient();
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 400 });
  }

  const payload = await request.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid webhook signature." }, { status: 400 });
  }

  const { bookings, payments } = await getCollections();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const { ObjectId } = await import("mongodb");
      const bookingObjectId = new ObjectId(bookingId);
      await bookings.updateOne(
        { _id: bookingObjectId },
        {
          $set: {
            status: "confirmed",
            paymentStatus: "paid",
            paymentProvider: "stripe",
            paymentReference: session.id,
            updatedAt: new Date(),
          },
        },
      );

      await payments.updateMany(
        { bookingId: bookingObjectId },
        {
          $set: {
            status: "paid",
            provider: "stripe",
            providerTransactionId: typeof session.payment_intent === "string" ? session.payment_intent : session.id,
            rawResponse: {
              id: session.id,
              paymentStatus: session.payment_status,
              paymentIntent: session.payment_intent ? String(session.payment_intent) : null,
            },
            updatedAt: new Date(),
          },
        },
      );

      const booking = await bookings.findOne({ _id: bookingObjectId });
      if (booking) {
        const settings = await getSiteSettings();
        await sendAdminEventNotification("stripe checkout completed", booking, settings).catch(() => undefined);
      }
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;

    if (bookingId) {
      const { ObjectId } = await import("mongodb");
      const bookingObjectId = new ObjectId(bookingId);
      await bookings.updateOne(
        { _id: bookingObjectId },
        {
          $set: {
            paymentStatus: "failed",
            updatedAt: new Date(),
          },
        },
      );

      await payments.updateMany(
        { bookingId: bookingObjectId },
        {
          $set: {
            status: "failed",
            rawResponse: {
              id: session.id,
              status: "expired",
            },
            updatedAt: new Date(),
          },
        },
      );

      const booking = await bookings.findOne({ _id: bookingObjectId });
      if (booking) {
        const settings = await getSiteSettings();
        await sendAdminEventNotification("stripe checkout expired", booking, settings).catch(() => undefined);
      }
    }
  }

  await writeAuditLog({
    action: "webhook.stripe.received",
    targetCollection: "webhooks",
    targetId: event.id,
    metadata: { type: event.type },
  });

  return NextResponse.json({ received: true });
}
