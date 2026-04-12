import "server-only";

import { ObjectId } from "mongodb";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

import type { BookingDocument, PaymentDocument, PaymentStatus, ServiceDocument } from "@/lib/db-types";
import { getCollections } from "@/lib/collections";

function buildReceiptNumber() {
  return `RHT-${Date.now()}`;
}

export function calculateExpectedPayment(service: ServiceDocument, paymentMode: "full-online" | "deposit" | "pay-later") {
  if (paymentMode === "pay-later") {
    return { amount: 0, type: "manual" as const, status: "unpaid" as PaymentStatus };
  }

  if (paymentMode === "deposit") {
    const amount =
      service.depositType === "fixed"
        ? service.depositValue
        : service.depositType === "percentage"
          ? Number(((service.price * service.depositValue) / 100).toFixed(2))
          : 0;

    return {
      amount,
      type: "deposit" as const,
      status: amount > 0 ? ("pending" as PaymentStatus) : ("unpaid" as PaymentStatus),
    };
  }

  return {
    amount: service.price,
    type: "full" as const,
    status: "pending" as PaymentStatus,
  };
}

export async function createPaymentLog(input: {
  bookingId?: ObjectId | null;
  userId?: ObjectId | null;
  provider: PaymentDocument["provider"];
  amount: number;
  type: PaymentDocument["type"];
  status: PaymentStatus;
  providerTransactionId?: string | null;
  notes?: string;
  rawResponse?: Record<string, unknown> | null;
}) {
  const { payments } = await getCollections();
  const now = new Date();

  const payment: PaymentDocument = {
    bookingId: input.bookingId ?? null,
    userId: input.userId ?? null,
    provider: input.provider,
    providerTransactionId: input.providerTransactionId ?? null,
    amount: input.amount,
    currency: "GBP",
    type: input.type,
    status: input.status,
    receiptNumber: buildReceiptNumber(),
    notes: input.notes ?? "",
    rawResponse: input.rawResponse ?? null,
    createdAt: now,
    updatedAt: now,
  };

  const result = await payments.insertOne(payment);
  return { ...payment, _id: result.insertedId };
}

export async function getPaymentsForBooking(bookingId: ObjectId) {
  const { payments } = await getCollections();
  return payments.find({ bookingId }).sort({ createdAt: -1 }).toArray();
}

export async function getPaymentReceiptData(paymentId: string) {
  const { payments, bookings } = await getCollections();
  const payment = await payments.findOne({ _id: new ObjectId(paymentId) });

  if (!payment) {
    return null;
  }

  const booking = payment.bookingId ? await bookings.findOne({ _id: payment.bookingId }) : null;

  return {
    payment,
    booking,
  };
}

export async function buildInvoicePdf(paymentId: string) {
  const receiptData = await getPaymentReceiptData(paymentId);

  if (!receiptData) {
    return null;
  }

  const { payment, booking } = receiptData;
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595, 842]);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText("Revive Holistic Therapies Invoice", {
    x: 50,
    y: 790,
    size: 20,
    font: bold,
    color: rgb(0.12, 0.16, 0.18),
  });

  const lines = [
    `Invoice / receipt number: ${payment.receiptNumber}`,
    `Created: ${payment.createdAt.toISOString()}`,
    `Provider: ${payment.provider}`,
    `Status: ${payment.status}`,
    `Amount: GBP ${payment.amount.toFixed(2)}`,
    booking ? `Service: ${booking.serviceTitle}` : "Service: Manual payment",
    booking ? `Appointment: ${booking.bookingDate} ${booking.bookingStart}` : "",
    booking ? `Customer: ${booking.customerName}` : "",
  ].filter(Boolean);

  let y = 740;
  for (const line of lines) {
    page.drawText(line, { x: 50, y, size: 12, font, color: rgb(0.2, 0.26, 0.28) });
    y -= 24;
  }

  return {
    filename: `${payment.receiptNumber}.pdf`,
    bytes: await pdf.save(),
    payment,
  };
}

export function getPaymentLabel(payment: Pick<PaymentDocument, "type" | "amount" | "status">) {
  return `${payment.type} payment of GBP ${payment.amount.toFixed(2)} (${payment.status})`;
}

export function getBookingPaymentSummary(booking: BookingDocument) {
  return {
    provider: booking.paymentProvider,
    status: booking.paymentStatus,
    reference: booking.paymentReference ?? "Pending",
    totalAmount: booking.totalAmount,
    depositAmount: booking.depositAmount,
  };
}
