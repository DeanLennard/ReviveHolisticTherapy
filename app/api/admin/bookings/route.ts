import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api-auth";
import { getCollections } from "@/lib/collections";

const roles = ["super_admin", "admin", "bookings_manager"] as const;

export async function GET(request: Request) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { bookings } = await getCollections();
  const items = await bookings.find({}).sort({ bookingDate: 1, bookingStart: 1 }).toArray();

  const { searchParams } = new URL(request.url);

  if (searchParams.get("format") === "csv") {
    const header = ["bookingId", "customerName", "customerEmail", "serviceTitle", "bookingDate", "bookingStart", "bookingEnd", "status", "paymentStatus", "paymentProvider"];
    const rows = items.map((booking) => [
      booking._id?.toHexString() ?? "",
      booking.customerName,
      booking.customerEmail,
      booking.serviceTitle,
      booking.bookingDate,
      booking.bookingStart,
      booking.bookingEnd,
      booking.status,
      booking.paymentStatus,
      booking.paymentProvider,
    ]);
    const csv = [header, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replaceAll('"', '""')}"`)
          .join(","),
      )
      .join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="bookings.csv"',
      },
    });
  }

  return NextResponse.json({ bookings: items });
}
