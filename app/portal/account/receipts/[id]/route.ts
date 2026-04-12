import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { getPaymentReceiptData } from "@/lib/payments";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await props.params;
  const receiptData = await getPaymentReceiptData(id);

  if (!receiptData || receiptData.payment.userId?.toHexString() !== user._id.toHexString()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { payment, booking } = receiptData;
  const filename = `${payment.receiptNumber}.txt`;
  const body = [
    "Revive Holistic Therapies Receipt",
    `Receipt: ${payment.receiptNumber}`,
    `Date: ${payment.createdAt.toISOString()}`,
    `Amount: GBP ${payment.amount.toFixed(2)}`,
    `Status: ${payment.status}`,
    `Provider: ${payment.provider}`,
    booking ? `Booking: ${booking.serviceTitle} on ${booking.bookingDate} at ${booking.bookingStart}` : "Booking: Manual payment",
  ].join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
