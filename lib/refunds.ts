import "server-only";

import { getCollections } from "@/lib/collections";
import { getGoCardlessBaseUrl, getGoCardlessAccessToken } from "@/lib/gocardless";
import { getStripeClient } from "@/lib/stripe";

export async function executeProviderRefund(input: {
  paymentId: string;
  amount?: number;
}) {
  const { ObjectId } = await import("mongodb");
  const { payments } = await getCollections();
  const payment = await payments.findOne({ _id: new ObjectId(input.paymentId) });

  if (!payment) {
    return null;
  }

  if (payment.provider === "stripe" && payment.providerTransactionId) {
    const stripe = getStripeClient();
    if (!stripe) {
      return null;
    }

    const refund = await stripe.refunds.create({
      payment_intent: payment.providerTransactionId,
      amount: input.amount ? Math.round(input.amount * 100) : undefined,
    });

    await payments.updateOne(
      { _id: payment._id },
      {
        $set: {
          status: refund.status === "succeeded" ? "refunded" : payment.status,
          rawResponse: {
            ...(payment.rawResponse ?? {}),
            refundId: refund.id,
            refundStatus: refund.status,
          },
          updatedAt: new Date(),
        },
      },
    );

    return { provider: "stripe", success: refund.status === "succeeded", reference: refund.id };
  }

  if (payment.provider === "gocardless" && payment.providerTransactionId) {
    const accessToken = getGoCardlessAccessToken();
    if (!accessToken) {
      return null;
    }

    const response = await fetch(`${getGoCardlessBaseUrl()}/refunds`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "GoCardless-Version": "2015-07-06",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refunds: {
          amount: Math.round((input.amount ?? payment.amount) * 100),
          total_amount_confirmation: Math.round((input.amount ?? payment.amount) * 100),
          links: {
            payment: payment.providerTransactionId,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const payload = (await response.json()) as { refunds: { id: string } };
    await payments.updateOne(
      { _id: payment._id },
      {
        $set: {
          status: "refunded",
          rawResponse: {
            ...(payment.rawResponse ?? {}),
            refundId: payload.refunds.id,
          },
          updatedAt: new Date(),
        },
      },
    );

    return { provider: "gocardless", success: true, reference: payload.refunds.id };
  }

  await payments.updateOne(
    { _id: payment._id },
    {
      $set: {
        status: "refunded",
        updatedAt: new Date(),
      },
    },
  );

  return { provider: payment.provider, success: true, reference: payment.receiptNumber };
}
