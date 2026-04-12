import { NextResponse } from "next/server";

import { requireUser } from "@/lib/auth";
import { buildInvoicePdf, getPaymentReceiptData } from "@/lib/payments";

export async function GET(_: Request, props: { params: Promise<{ id: string }> }) {
  const user = await requireUser();
  const { id } = await props.params;
  const receiptData = await getPaymentReceiptData(id);

  if (!receiptData || receiptData.payment.userId?.toHexString() !== user._id.toHexString()) {
    return new NextResponse("Not found", { status: 404 });
  }

  const invoice = await buildInvoicePdf(id);

  if (!invoice) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(Buffer.from(invoice.bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${invoice.filename}"`,
    },
  });
}
