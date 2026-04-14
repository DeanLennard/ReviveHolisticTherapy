import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { requireApiUser } from "@/lib/api-auth";
import { writeAuditLog } from "@/lib/audit-log";
import { hashPassword } from "@/lib/auth";
import { isSlotAvailable, validateBookingRules } from "@/lib/booking";
import { getCollections } from "@/lib/collections";
import { getCurrentUser } from "@/lib/auth";
import { getServiceBySlugFromDb, getServicesFromDb, getSiteSettings } from "@/lib/content";
import { sendAdminEventNotification, sendBookingConfirmationEmail, sendPaymentConfirmationEmail } from "@/lib/mailer";
import { createPaymentCheckoutForBooking } from "@/lib/payment-checkout";
import { calculateExpectedPayment, createPaymentLog } from "@/lib/payments";
import { checkRateLimit } from "@/lib/rate-limit";
import { bookingSchema } from "@/lib/validators";

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

function splitCustomerName(customerName: string) {
  const [firstName, ...rest] = customerName.trim().split(/\s+/);

  return {
    firstName: firstName || "Guest",
    lastName: rest.join(" ") || "Client",
  };
}

export async function GET() {
  const auth = await requireApiUser();

  if (!auth.ok) {
    return auth.response;
  }

  const { bookings } = await getCollections();
  const items = await bookings.find({ userId: auth.user._id }).sort({ bookingDate: 1, bookingStart: 1 }).toArray();
  return NextResponse.json({ bookings: items });
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(`booking:${clientKey}`, 8, 15 * 60 * 1000);

  if (!rateLimit.ok) {
    return NextResponse.json({ error: "Too many booking attempts. Please try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  const parsed = bookingSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid booking payload", details: parsed.error.flatten() }, { status: 400 });
  }

  const serviceIdOrSlug = parsed.data.serviceId;
  const services = await getServicesFromDb();
  const service =
    services.find((item) => item._id?.toHexString() === serviceIdOrSlug) ??
    (await getServiceBySlugFromDb(serviceIdOrSlug));

  if (!service?._id) {
    return NextResponse.json({ error: "Service not found" }, { status: 404 });
  }

  const ruleValidation = await validateBookingRules(parsed.data.bookingDate, parsed.data.bookingStart);

  if (!ruleValidation.ok) {
    return NextResponse.json({ error: ruleValidation.error }, { status: 400 });
  }

  const slotAvailable = await isSlotAvailable(service, parsed.data.bookingDate, parsed.data.bookingStart, parsed.data.bookingEnd);

  if (!slotAvailable) {
    return NextResponse.json({ error: "Selected time is no longer available" }, { status: 409 });
  }

  const currentUser = await getCurrentUser();
  const { bookings, users, payments } = await getCollections();
  const now = new Date();
  const expectedPayment = calculateExpectedPayment(service, parsed.data.paymentMode);
  const normalizedEmail = parsed.data.customerEmail.trim().toLowerCase();
  let bookingUserId = currentUser?._id ?? null;

  if (!bookingUserId) {
    const existingUser = await users.findOne({ email: normalizedEmail });

    if (existingUser?._id) {
      bookingUserId = existingUser._id;

      const nameParts = splitCustomerName(parsed.data.customerName);
      await users.updateOne(
        { _id: existingUser._id },
        {
          $set: {
            firstName: existingUser.firstName || nameParts.firstName,
            lastName: existingUser.lastName || nameParts.lastName,
            phone: existingUser.phone || parsed.data.customerPhone,
            updatedAt: now,
          },
        },
      );
    } else {
      const nameParts = splitCustomerName(parsed.data.customerName);
      const createdUser = await users.insertOne({
        firstName: nameParts.firstName,
        lastName: nameParts.lastName,
        email: normalizedEmail,
        phone: parsed.data.customerPhone,
        passwordHash: await hashPassword(crypto.randomUUID()),
        role: "customer",
        marketingConsent: false,
        createdAt: now,
        updatedAt: now,
        lastLoginAt: null,
      });
      bookingUserId = createdUser.insertedId;
    }

    if (bookingUserId) {
      const orphanBookings = await bookings.find({ customerEmail: normalizedEmail, userId: null }, { projection: { _id: 1 } }).toArray();
      const orphanBookingIds = orphanBookings.map((booking) => booking._id).filter((value): value is ObjectId => Boolean(value));

      if (orphanBookingIds.length) {
        await bookings.updateMany(
          { _id: { $in: orphanBookingIds } },
          {
            $set: {
              userId: bookingUserId,
              updatedAt: now,
            },
          },
        );
        await payments.updateMany(
          { bookingId: { $in: orphanBookingIds }, userId: null },
          {
            $set: {
              userId: bookingUserId,
              updatedAt: now,
            },
          },
        );
      }
    }
  }

  const result = await bookings.insertOne({
    userId: bookingUserId,
    serviceId: service._id instanceof ObjectId ? service._id : new ObjectId(service._id),
    customerName: parsed.data.customerName,
    customerEmail: normalizedEmail,
    customerPhone: parsed.data.customerPhone,
    serviceTitle: service.title,
    practitionerName: parsed.data.practitionerName ?? null,
    bookingDate: parsed.data.bookingDate,
    bookingStart: parsed.data.bookingStart,
    bookingEnd: parsed.data.bookingEnd,
    status: "pending",
    paymentStatus: expectedPayment.status,
    paymentProvider: parsed.data.paymentMode === "pay-later" ? "clinic" : parsed.data.paymentProvider,
    paymentReference: null,
    paymentMode: parsed.data.paymentMode,
    reminderSentAt: null,
    depositAmount: expectedPayment.type === "deposit" ? expectedPayment.amount : 0,
    totalAmount: service.price,
    notes: parsed.data.notes,
    adminNotes: "",
    createdAt: now,
    updatedAt: now,
  });

  const booking = await bookings.findOne({ _id: result.insertedId });
  const settings = await getSiteSettings();

  let redirectUrl: string | null = null;

  if (booking) {
    await sendBookingConfirmationEmail(booking, settings).catch(() => undefined);

    if (expectedPayment.amount > 0) {
      const payment = await createPaymentLog({
        bookingId: booking._id ?? null,
        userId: booking.userId ?? null,
        provider: parsed.data.paymentMode === "pay-later" ? "clinic" : parsed.data.paymentProvider,
        amount: expectedPayment.amount,
        type: expectedPayment.type,
        status: expectedPayment.status,
        notes: "Awaiting live provider completion",
      });

      await sendPaymentConfirmationEmail(booking, payment, settings).catch(() => undefined);
    }

    if (parsed.data.paymentMode !== "pay-later") {
      const checkout = await createPaymentCheckoutForBooking({
        booking,
        service,
        provider: parsed.data.paymentProvider === "clinic" ? "stripe" : parsed.data.paymentProvider,
      }).catch(() => null);

      redirectUrl = checkout?.url ?? null;
    }

    await sendAdminEventNotification("new booking created", booking, settings).catch(() => undefined);
    await writeAuditLog({
      action: "booking.created.public",
      actorUserId: currentUser?._id ?? null,
      actorEmail: currentUser?.email ?? booking.customerEmail,
      targetCollection: "bookings",
      targetId: result.insertedId.toHexString(),
    });
  }

  return NextResponse.json({ bookingId: result.insertedId.toHexString(), redirectUrl }, { status: 201 });
}
