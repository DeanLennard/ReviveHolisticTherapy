import "server-only";

import { ObjectId } from "mongodb";

import type { BookingDocument, ServiceDocument } from "@/lib/db-types";
import { getCollections } from "@/lib/collections";
import { createGoCardlessBillingRequest, getGoCardlessBillingRequest } from "@/lib/gocardless";
import { calculateExpectedPayment } from "@/lib/payments";
import { getStripeClient } from "@/lib/stripe";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function createPaymentCheckoutForBooking(input: {
  booking: BookingDocument & { _id: ObjectId };
  service: ServiceDocument;
  provider: "stripe" | "gocardless";
}) {
  const expectedPayment = calculateExpectedPayment(input.service, input.booking.paymentMode ?? input.service.paymentMode);

  if (expectedPayment.amount <= 0) {
    return null;
  }

  const successUrl = `${getBaseUrl()}/booking/success?bookingId=${input.booking._id.toHexString()}&provider=${input.provider}`;
  const cancelUrl = `${getBaseUrl()}/booking/cancelled?bookingId=${input.booking._id.toHexString()}&provider=${input.provider}`;
  const { bookings, payments } = await getCollections();

  if (input.provider === "stripe") {
    const stripe = getStripeClient();

    if (!stripe) {
      return null;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl,
      customer_email: input.booking.customerEmail,
      metadata: {
        bookingId: input.booking._id.toHexString(),
        paymentType: expectedPayment.type,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "gbp",
            unit_amount: Math.round(expectedPayment.amount * 100),
            product_data: {
              name: `${input.service.title} (${expectedPayment.type})`,
              description: `${input.booking.bookingDate} at ${input.booking.bookingStart}`,
            },
          },
        },
      ],
    });

    await bookings.updateOne(
      { _id: input.booking._id },
      {
        $set: {
          paymentProvider: "stripe",
          paymentReference: session.id,
          updatedAt: new Date(),
        },
      },
    );
    await payments.updateMany(
      { bookingId: input.booking._id },
      {
        $set: {
          provider: "stripe",
          providerTransactionId: session.id,
          rawResponse: { checkoutUrl: session.url },
          updatedAt: new Date(),
        },
      },
    );

    return { url: session.url, reference: session.id };
  }

  const [givenName, ...rest] = input.booking.customerName.split(" ");
  const flow = await createGoCardlessBillingRequest({
    bookingId: input.booking._id.toHexString(),
    amount: expectedPayment.amount,
    description: `${input.service.title} booking payment`,
    successRedirectUrl: successUrl,
    customer: {
      givenName: givenName || input.booking.customerName,
      familyName: rest.join(" ") || "Client",
      email: input.booking.customerEmail,
    },
  });

  if (!flow) {
    return null;
  }

  await bookings.updateOne(
    { _id: input.booking._id },
    {
      $set: {
        paymentProvider: "gocardless",
        paymentReference: flow.billingRequestId,
        updatedAt: new Date(),
      },
    },
  );
  await payments.updateMany(
    { bookingId: input.booking._id },
    {
      $set: {
        provider: "gocardless",
        providerTransactionId: flow.billingRequestFlowId,
        rawResponse: { billingRequestId: flow.billingRequestId, billingRequestFlowId: flow.billingRequestFlowId },
        updatedAt: new Date(),
      },
    },
  );

  return { url: flow.url, reference: flow.billingRequestId };
}

export async function syncBookingPaymentFromSuccess(input: {
  bookingId: string;
  provider: string;
  sessionId?: string | null;
}) {
  const { bookings, payments } = await getCollections();
  const booking = await bookings.findOne({ _id: new ObjectId(input.bookingId) });

  if (!booking?._id) {
    return null;
  }

  if (input.provider === "stripe" && input.sessionId) {
    const stripe = getStripeClient();

    if (!stripe) {
      return booking;
    }

    const session = await stripe.checkout.sessions.retrieve(input.sessionId);
    const succeeded = session.payment_status === "paid";
    const paymentStatus = booking.depositAmount > 0 && booking.totalAmount > booking.depositAmount ? "deposit paid" : "paid";

    await bookings.updateOne(
      { _id: booking._id },
      {
        $set: {
          paymentProvider: "stripe",
          paymentReference: session.id,
          paymentStatus: succeeded ? paymentStatus : "pending",
          status: succeeded ? "confirmed" : booking.status,
          updatedAt: new Date(),
        },
      },
    );
    await payments.updateMany(
      { bookingId: booking._id },
      {
        $set: {
          provider: "stripe",
          providerTransactionId: session.payment_intent ? String(session.payment_intent) : session.id,
          status: succeeded ? paymentStatus : "pending",
          rawResponse: { sessionId: session.id, paymentIntent: session.payment_intent },
          updatedAt: new Date(),
        },
      },
    );

    return bookings.findOne({ _id: booking._id });
  }

  if (input.provider === "gocardless" && booking.paymentReference) {
    const response = await getGoCardlessBillingRequest(booking.paymentReference);
    const status = response?.billing_requests.status ?? "pending";
    const succeeded = ["fulfilled", "paid", "pending_approval", "submitted"].includes(status);
    const paymentStatus = booking.depositAmount > 0 && booking.totalAmount > booking.depositAmount ? "deposit paid" : "paid";

    await bookings.updateOne(
      { _id: booking._id },
      {
        $set: {
          paymentProvider: "gocardless",
          paymentStatus: succeeded ? paymentStatus : "pending",
          status: succeeded ? "confirmed" : booking.status,
          updatedAt: new Date(),
        },
      },
    );
    await payments.updateMany(
      { bookingId: booking._id },
      {
        $set: {
          provider: "gocardless",
          status: succeeded ? paymentStatus : "pending",
          rawResponse: { billingRequestStatus: status },
          updatedAt: new Date(),
        },
      },
    );

    return bookings.findOne({ _id: booking._id });
  }

  return booking;
}
