import { NextResponse } from "next/server";

import { getAvailableSlots, validateBookingRules } from "@/lib/booking";
import { getServicesFromDb, getServiceBySlugFromDb } from "@/lib/content";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const serviceId = searchParams.get("serviceId");
  const date = searchParams.get("date");

  if (!serviceId || !date) {
    return NextResponse.json({ error: "Missing serviceId or date" }, { status: 400 });
  }

  const services = await getServicesFromDb();
  const service =
    services.find((item) => item._id?.toHexString() === serviceId) ??
    (await getServiceBySlugFromDb(serviceId));

  if (!service) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const ruleValidation = await validateBookingRules(date, "12:00");
  const ruleError = ruleValidation.ok ? null : ruleValidation.error ?? "This date is not available for online booking.";

  if (!ruleValidation.ok && ruleError && !ruleError.includes("hours notice")) {
    return NextResponse.json({ slots: [], error: ruleError, bookingSettings: ruleValidation.bookingSettings });
  }

  const slots = await getAvailableSlots(service, date);
  return NextResponse.json({ slots, bookingSettings: ruleValidation.bookingSettings });
}
