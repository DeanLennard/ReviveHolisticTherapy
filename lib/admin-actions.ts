"use server";

import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { writeAuditLog } from "@/lib/audit-log";
import { canCancelBooking, canRescheduleBooking, isSlotAvailable } from "@/lib/booking";
import { getCollections } from "@/lib/collections";
import { getSiteSettings } from "@/lib/content";
import { requireRole, requireUser } from "@/lib/auth";
import { sendAdminEventNotification, sendBookingConfirmationEmail, sendPaymentConfirmationEmail } from "@/lib/mailer";
import { createPaymentLog } from "@/lib/payments";
import { executeProviderRefund } from "@/lib/refunds";
import { profileSchema } from "@/lib/validators";

const bookingStatusSchema = z.enum(["pending", "confirmed", "paid", "deposit paid", "cancelled", "completed", "no show", "refunded"]);

const serviceFormSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(2),
  shortDescription: z.string().min(10),
  fullDescription: z.string().min(20),
  benefits: z.string().default(""),
  idealFor: z.string().default(""),
  durationMinutes: z.coerce.number().min(15),
  price: z.coerce.number().min(1),
  depositType: z.enum(["percentage", "fixed", "none"]),
  depositValue: z.coerce.number().min(0),
  paymentMode: z.enum(["full-online", "deposit", "pay-later"]),
  acceptedPaymentMethods: z.string().default(""),
  fullPaymentRequired: z.boolean(),
  payLaterEnabled: z.boolean(),
  featuredImage: z.string().default(""),
  featuredImageAlt: z.string().default(""),
  galleryImages: z.string().default(""),
  seoTitle: z.string().min(2),
  metaDescription: z.string().min(10),
  isActive: z.boolean(),
  displayOrder: z.coerce.number().min(1),
});

const slideFormSchema = z.object({
  id: z.string().optional(),
  eyebrow: z.string().min(2),
  title: z.string().min(2),
  subtitle: z.string().min(10),
  primaryCtaText: z.string().min(2),
  primaryCtaLink: z.string().min(1),
  secondaryCtaText: z.string().min(2),
  secondaryCtaLink: z.string().min(1),
  imageUrl: z.string().default(""),
  imageAlt: z.string().default(""),
  displayOrder: z.coerce.number().min(1),
  isActive: z.boolean(),
});

const faqFormSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(5),
  answer: z.string().min(10),
  category: z.string().min(2),
  displayOrder: z.coerce.number().min(1),
  isActive: z.boolean(),
});

const testimonialFormSchema = z.object({
  id: z.string().optional(),
  customerName: z.string().min(2),
  source: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(10),
  approved: z.boolean(),
  displayOrder: z.coerce.number().min(1),
});

const blockedDateFormSchema = z.object({
  id: z.string().optional(),
  startDateTime: z.string().min(1),
  endDateTime: z.string().min(1),
  reason: z.string().min(2),
});

const availabilityFormSchema = z.object({
  id: z.string().optional(),
  practitionerName: z.string().min(2),
  dayOfWeek: z.coerce.number().min(0).max(6),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  slotInterval: z.coerce.number().min(5),
  bufferBefore: z.coerce.number().min(0),
  bufferAfter: z.coerce.number().min(0),
  isActive: z.boolean(),
});

const bookingAdminEditSchema = z.object({
  bookingId: z.string().min(1),
  customerName: z.string().min(2).trim(),
  customerEmail: z.email().trim().toLowerCase(),
  customerPhone: z.string().min(7).trim(),
  bookingDate: z.string().min(1),
  bookingStart: z.string().min(1),
  bookingEnd: z.string().min(1),
  practitionerName: z.string().default(""),
  status: bookingStatusSchema,
  paymentStatus: z.enum(["unpaid", "pending", "deposit paid", "paid", "failed", "refunded", "partially refunded"]),
  paymentProvider: z.enum(["stripe", "gocardless", "clinic", "none"]),
  notes: z.string().default(""),
  adminNotes: z.string().default(""),
  paymentReference: z.string().default(""),
});

const paymentLogSchema = z.object({
  bookingId: z.string().min(1),
  amount: z.coerce.number().min(0),
  provider: z.enum(["stripe", "gocardless", "clinic", "none"]),
  type: z.enum(["deposit", "full", "manual", "refund"]),
  status: z.enum(["unpaid", "pending", "deposit paid", "paid", "failed", "refunded", "partially refunded"]),
  providerTransactionId: z.string().default(""),
  notes: z.string().default(""),
});

const refundSchema = z.object({
  paymentId: z.string().min(1),
  amount: z.coerce.number().min(0).optional(),
});

const enquiryStatusSchema = z.enum(["new", "read", "responded", "archived"]);
const policySlugSchema = z.enum(["privacy-policy", "cookie-policy", "terms-and-conditions"]);
const policyFormSchema = z.object({
  slug: policySlugSchema,
  title: z.string().min(2),
  description: z.string().min(10),
  content: z.string().min(20),
});

const manualBookingSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.email(),
  customerPhone: z.string().min(7),
  serviceId: z.string().min(1),
  bookingDate: z.string().min(1),
  bookingStart: z.string().min(1),
  bookingEnd: z.string().min(1),
  practitionerName: z.string().default(""),
  status: bookingStatusSchema,
  paymentProvider: z.enum(["stripe", "gocardless", "clinic", "none"]),
  paymentStatus: z.enum(["unpaid", "pending", "deposit paid", "paid", "failed", "refunded", "partially refunded"]),
  notes: z.string().default(""),
  adminNotes: z.string().default(""),
});

async function requireAdminAccess() {
  return requireRole(["super_admin", "admin", "content_editor", "bookings_manager"]);
}

export async function updateSettings(formData: FormData) {
  const admin = await requireAdminAccess();
  const { settings } = await getCollections();

  const stripeEnabled = formData.get("stripeEnabled") === "on";
  const goCardlessEnabled = formData.get("goCardlessEnabled") === "on";
  const payLaterEnabled = formData.get("payLaterEnabled") === "on";
  const refundSupport = formData.get("refundSupport") === "on";
  const localAreas = String(formData.get("localAreas") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const depositCollectionModeValue = String(formData.get("depositCollectionMode") ?? "service");
  const depositCollectionMode =
    depositCollectionModeValue === "fixed" || depositCollectionModeValue === "percentage" || depositCollectionModeValue === "service"
      ? depositCollectionModeValue
      : "service";
  const notificationRecipients = String(formData.get("notificationRecipients") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  await settings.updateOne(
    {},
    {
      $set: {
        siteName: String(formData.get("siteName") ?? ""),
        contactEmail: String(formData.get("contactEmail") ?? ""),
        contactPhone: String(formData.get("contactPhone") ?? ""),
        address: [
          String(formData.get("addressLine1") ?? ""),
          String(formData.get("addressLine2") ?? ""),
          String(formData.get("addressLine3") ?? ""),
        ].filter(Boolean),
        paymentSettings: {
          stripeEnabled,
          goCardlessEnabled,
          defaultMethod: String(formData.get("defaultMethod") ?? "Stripe"),
          payLaterEnabled,
          refundSupport,
          depositCollectionMode,
          defaultDepositValue: Number(formData.get("defaultDepositValue") ?? 25),
        },
        contactOptions: {
          whatsappNumber: String(formData.get("whatsappNumber") ?? ""),
          whatsappEnabled: formData.get("whatsappEnabled") === "on",
        },
        footerCta: {
          title: String(formData.get("footerCtaTitle") ?? ""),
          body: String(formData.get("footerCtaBody") ?? ""),
          buttonText: String(formData.get("footerCtaButtonText") ?? ""),
          buttonLink: String(formData.get("footerCtaButtonLink") ?? "/contact"),
        },
        homepageCta: {
          title: String(formData.get("homepageCtaTitle") ?? ""),
          body: String(formData.get("homepageCtaBody") ?? ""),
          primaryText: String(formData.get("homepageCtaPrimaryText") ?? "Book now"),
          primaryLink: String(formData.get("homepageCtaPrimaryLink") ?? "/booking"),
          secondaryText: String(formData.get("homepageCtaSecondaryText") ?? "View treatments"),
          secondaryLink: String(formData.get("homepageCtaSecondaryLink") ?? "/treatments"),
        },
        emailSettings: {
          senderName: String(formData.get("senderName") ?? ""),
          senderEmail: String(formData.get("senderEmail") ?? ""),
          notificationRecipients,
          reminderLeadHours: Number(formData.get("reminderLeadHours") ?? 24),
          bookingConfirmationEnabled: formData.get("bookingConfirmationEnabled") === "on",
          paymentEmailsEnabled: formData.get("paymentEmailsEnabled") === "on",
          adminCancelledBookingNotifications: formData.get("adminCancelledBookingNotifications") === "on",
          adminFailedPaymentNotifications: formData.get("adminFailedPaymentNotifications") === "on",
          bookingConfirmationTemplate: String(formData.get("bookingConfirmationTemplate") ?? ""),
          paymentConfirmationTemplate: String(formData.get("paymentConfirmationTemplate") ?? ""),
          adminNotificationTemplate: String(formData.get("adminNotificationTemplate") ?? ""),
        },
        bookingSettings: {
          maximumBookingHorizonDays: Number(formData.get("maximumBookingHorizonDays") ?? 90),
          minimumNoticeHours: Number(formData.get("minimumNoticeHours") ?? 12),
          cancellationWindowHours: Number(formData.get("cancellationWindowHours") ?? 24),
          rescheduleWindowHours: Number(formData.get("rescheduleWindowHours") ?? 24),
        },
        seoDefaults: {
          titleTemplate: String(formData.get("titleTemplate") ?? "%s | Revive Holistic Therapies"),
          defaultDescription: String(formData.get("defaultDescription") ?? ""),
          localAreas,
        },
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin");
  revalidatePath("/booking");

  await writeAuditLog({
    action: "settings.updated",
    actorUserId: admin._id,
    actorEmail: admin.email,
    targetCollection: "settings",
  });
}

export async function upsertBlockedDate(formData: FormData) {
  const admin = await requireAdminAccess();
  const parsed = blockedDateFormSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    startDateTime: String(formData.get("startDateTime") ?? ""),
    endDateTime: String(formData.get("endDateTime") ?? ""),
    reason: String(formData.get("reason") ?? ""),
  });

  if (!parsed.success) {
    return;
  }

  const startDateTime = new Date(parsed.data.startDateTime);
  const endDateTime = new Date(parsed.data.endDateTime);

  if (Number.isNaN(startDateTime.getTime()) || Number.isNaN(endDateTime.getTime()) || endDateTime <= startDateTime) {
    return;
  }

  const { blockedDates } = await getCollections();
  const payload = {
    startDateTime,
    endDateTime,
    reason: parsed.data.reason,
    createdBy: admin._id,
    createdAt: new Date(),
  };

  if (parsed.data.id) {
    await blockedDates.updateOne(
      { _id: new ObjectId(parsed.data.id) },
      {
        $set: {
          startDateTime,
          endDateTime,
          reason: parsed.data.reason,
          createdBy: admin._id,
        },
      },
    );
  } else {
    await blockedDates.insertOne(payload);
  }

  revalidatePath("/admin");
  revalidatePath("/booking");
}

export async function deleteBlockedDate(formData: FormData) {
  await requireAdminAccess();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { blockedDates } = await getCollections();
  await blockedDates.deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/admin");
  revalidatePath("/booking");
}

export async function upsertAvailability(formData: FormData) {
  await requireAdminAccess();
  const parsed = availabilityFormSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    practitionerName: String(formData.get("practitionerName") ?? ""),
    dayOfWeek: formData.get("dayOfWeek"),
    startTime: String(formData.get("startTime") ?? ""),
    endTime: String(formData.get("endTime") ?? ""),
    slotInterval: formData.get("slotInterval"),
    bufferBefore: formData.get("bufferBefore"),
    bufferAfter: formData.get("bufferAfter"),
    isActive: parseBoolean(formData.get("isActive")),
  });

  if (!parsed.success) {
    return;
  }

  const { availability } = await getCollections();
  const payload = {
    practitionerName: parsed.data.practitionerName,
    dayOfWeek: parsed.data.dayOfWeek,
    startTime: parsed.data.startTime,
    endTime: parsed.data.endTime,
    slotInterval: parsed.data.slotInterval,
    bufferBefore: parsed.data.bufferBefore,
    bufferAfter: parsed.data.bufferAfter,
    isActive: parsed.data.isActive,
    updatedAt: new Date(),
  };

  if (parsed.data.id) {
    await availability.updateOne({ _id: new ObjectId(parsed.data.id) }, { $set: payload });
  } else {
    await availability.insertOne({ ...payload, createdAt: new Date() });
  }

  revalidatePath("/admin");
  revalidatePath("/booking");
}

export async function deleteAvailability(formData: FormData) {
  await requireAdminAccess();
  const id = String(formData.get("id") ?? "");

  if (!id) {
    return;
  }

  const { availability } = await getCollections();
  await availability.deleteOne({ _id: new ObjectId(id) });

  revalidatePath("/admin");
  revalidatePath("/booking");
}

export async function updateEnquiryStatus(formData: FormData) {
  await requireAdminAccess();
  const id = String(formData.get("enquiryId") ?? "");
  const statusResult = enquiryStatusSchema.safeParse(String(formData.get("status") ?? ""));

  if (!id || !statusResult.success) {
    return;
  }

  const { enquiries } = await getCollections();
  await enquiries.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: statusResult.data,
        updatedAt: new Date(),
      },
    },
  );

  revalidatePath("/admin");
  revalidatePath("/contact");
}

export async function upsertPolicyPage(formData: FormData) {
  const admin = await requireAdminAccess();
  const parsed = policyFormSchema.safeParse({
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    content: String(formData.get("content") ?? ""),
  });

  if (!parsed.success) {
    return;
  }

  const { policyPages } = await getCollections();
  await policyPages.updateOne(
    { slug: parsed.data.slug },
    {
      $set: {
        title: parsed.data.title,
        description: parsed.data.description,
        content: parsed.data.content.split("\n\n").map((item) => item.trim()).filter(Boolean),
        updatedAt: new Date(),
      },
    },
    { upsert: true },
  );

  await writeAuditLog({
    action: "policy.updated",
    actorUserId: admin._id,
    actorEmail: admin.email,
    targetCollection: "policyPages",
    targetId: parsed.data.slug,
  });

  revalidatePath(`/${parsed.data.slug}`);
  revalidatePath("/admin");
}

export async function updateBookingStatus(formData: FormData) {
  await requireAdminAccess();
  const id = String(formData.get("bookingId") ?? "");
  const parsedStatus = bookingStatusSchema.safeParse(String(formData.get("status") ?? ""));
  const { bookings } = await getCollections();

  if (!parsedStatus.success) {
    return;
  }

  await bookings.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        status: parsedStatus.data,
        updatedAt: new Date(),
      },
    },
  );

  revalidatePath("/admin");
  revalidatePath("/portal/account");
}

export async function updateBookingDetails(formData: FormData) {
  const admin = await requireAdminAccess();
  const parsed = bookingAdminEditSchema.safeParse({
    bookingId: String(formData.get("bookingId") ?? ""),
    customerName: String(formData.get("customerName") ?? ""),
    customerEmail: String(formData.get("customerEmail") ?? ""),
    customerPhone: String(formData.get("customerPhone") ?? ""),
    bookingDate: String(formData.get("bookingDate") ?? ""),
    bookingStart: String(formData.get("bookingStart") ?? ""),
    bookingEnd: String(formData.get("bookingEnd") ?? ""),
    practitionerName: String(formData.get("practitionerName") ?? ""),
    status: String(formData.get("status") ?? "pending"),
    paymentStatus: String(formData.get("paymentStatus") ?? "unpaid"),
    paymentProvider: String(formData.get("paymentProvider") ?? "none"),
    notes: String(formData.get("notes") ?? ""),
    adminNotes: String(formData.get("adminNotes") ?? ""),
    paymentReference: String(formData.get("paymentReference") ?? ""),
  });

  if (!parsed.success) {
    return;
  }

  const { bookings, services } = await getCollections();
  const booking = await bookings.findOne({ _id: new ObjectId(parsed.data.bookingId) });

  if (!booking || !booking.serviceId) {
    return;
  }

  const service = await services.findOne({ _id: booking.serviceId });
  if (!service) {
    return;
  }

  const slotAvailable =
    booking.bookingDate === parsed.data.bookingDate &&
    booking.bookingStart === parsed.data.bookingStart &&
    booking.bookingEnd === parsed.data.bookingEnd
      ? true
      : await isSlotAvailable(service, parsed.data.bookingDate, parsed.data.bookingStart, parsed.data.bookingEnd);
  
  const slotAvailableWithPractitioner =
    booking.bookingDate === parsed.data.bookingDate &&
    booking.bookingStart === parsed.data.bookingStart &&
    booking.bookingEnd === parsed.data.bookingEnd &&
    (booking.practitionerName ?? "") === parsed.data.practitionerName
      ? true
      : await isSlotAvailable(service, parsed.data.bookingDate, parsed.data.bookingStart, parsed.data.bookingEnd, parsed.data.practitionerName || undefined);
  if (!slotAvailable || !slotAvailableWithPractitioner) {
    return;
  }

  await bookings.updateOne(
    { _id: booking._id },
    {
      $set: {
        customerName: parsed.data.customerName,
        customerEmail: parsed.data.customerEmail,
        customerPhone: parsed.data.customerPhone,
        bookingDate: parsed.data.bookingDate,
        bookingStart: parsed.data.bookingStart,
        bookingEnd: parsed.data.bookingEnd,
        practitionerName: parsed.data.practitionerName || null,
        status: parsed.data.status,
        paymentStatus: parsed.data.paymentStatus,
        paymentProvider: parsed.data.paymentProvider,
        paymentReference: parsed.data.paymentReference || null,
        notes: parsed.data.notes,
        adminNotes: parsed.data.adminNotes,
        updatedAt: new Date(),
      },
    },
  );

  await writeAuditLog({
    action: "booking.updated",
    actorUserId: admin._id,
    actorEmail: admin.email,
    targetCollection: "bookings",
    targetId: parsed.data.bookingId,
  });

  revalidatePath("/admin");
  revalidatePath("/portal/account");
}

export async function createManualBooking(formData: FormData) {
  const admin = await requireAdminAccess();
  const parsed = manualBookingSchema.safeParse({
    customerName: String(formData.get("customerName") ?? ""),
    customerEmail: String(formData.get("customerEmail") ?? ""),
    customerPhone: String(formData.get("customerPhone") ?? ""),
    serviceId: String(formData.get("serviceId") ?? ""),
    bookingDate: String(formData.get("bookingDate") ?? ""),
    bookingStart: String(formData.get("bookingStart") ?? ""),
    bookingEnd: String(formData.get("bookingEnd") ?? ""),
    practitionerName: String(formData.get("practitionerName") ?? ""),
    status: String(formData.get("status") ?? "pending"),
    paymentProvider: String(formData.get("paymentProvider") ?? "none"),
    paymentStatus: String(formData.get("paymentStatus") ?? "unpaid"),
    notes: String(formData.get("notes") ?? ""),
    adminNotes: String(formData.get("adminNotes") ?? ""),
  });

  if (!parsed.success) {
    return;
  }

  const { services, bookings } = await getCollections();
  const service = await services.findOne({ _id: new ObjectId(parsed.data.serviceId) });

  if (!service) {
    return;
  }

  const slotAvailable = await isSlotAvailable(
    service,
    parsed.data.bookingDate,
    parsed.data.bookingStart,
    parsed.data.bookingEnd,
    parsed.data.practitionerName || undefined,
  );

  if (!slotAvailable) {
    return;
  }

  const now = new Date();
  const result = await bookings.insertOne({
    userId: null,
    serviceId: service._id ?? null,
    customerName: parsed.data.customerName,
    customerEmail: parsed.data.customerEmail,
    customerPhone: parsed.data.customerPhone,
    serviceTitle: service.title,
    practitionerName: parsed.data.practitionerName || null,
    bookingDate: parsed.data.bookingDate,
    bookingStart: parsed.data.bookingStart,
    bookingEnd: parsed.data.bookingEnd,
    status: parsed.data.status,
    paymentStatus: parsed.data.paymentStatus,
    paymentProvider: parsed.data.paymentProvider,
    paymentReference: null,
    depositAmount: service.depositType === "fixed" ? service.depositValue : 0,
    totalAmount: service.price,
    notes: parsed.data.notes,
    adminNotes: parsed.data.adminNotes,
    createdAt: now,
    updatedAt: now,
  });

  const settings = await getSiteSettings();
  const createdBooking = await bookings.findOne({ _id: result.insertedId });

  if (createdBooking) {
    await sendBookingConfirmationEmail(createdBooking, settings).catch(() => undefined);
    await sendAdminEventNotification("manual booking created", createdBooking, settings).catch(() => undefined);
  }

  await writeAuditLog({
    action: "booking.created.manual",
    actorUserId: admin._id,
    actorEmail: admin.email,
    targetCollection: "bookings",
    targetId: result.insertedId.toHexString(),
  });

  revalidatePath("/admin");
  revalidatePath("/booking");
}

export async function createManualPayment(formData: FormData) {
  const admin = await requireAdminAccess();
  const parsed = paymentLogSchema.safeParse({
    bookingId: String(formData.get("bookingId") ?? ""),
    amount: formData.get("amount"),
    provider: String(formData.get("provider") ?? "clinic"),
    type: String(formData.get("type") ?? "manual"),
    status: String(formData.get("status") ?? "paid"),
    providerTransactionId: String(formData.get("providerTransactionId") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });

  if (!parsed.success) {
    return;
  }

  const { bookings } = await getCollections();
  const booking = await bookings.findOne({ _id: new ObjectId(parsed.data.bookingId) });

  if (!booking) {
    return;
  }

  const payment = await createPaymentLog({
    bookingId: booking._id ?? null,
    userId: booking.userId ?? null,
    provider: parsed.data.provider,
    amount: parsed.data.amount,
    type: parsed.data.type,
    status: parsed.data.status,
    providerTransactionId: parsed.data.providerTransactionId || null,
    notes: parsed.data.notes,
  });

  await bookings.updateOne(
    { _id: booking._id },
    {
      $set: {
        paymentStatus: parsed.data.status === "paid" || parsed.data.status === "deposit paid" ? parsed.data.status : booking.paymentStatus,
        paymentProvider: parsed.data.provider,
        paymentReference: parsed.data.providerTransactionId || payment.receiptNumber,
        updatedAt: new Date(),
      },
    },
  );

  const settings = await getSiteSettings();
  await sendPaymentConfirmationEmail(booking, payment, settings).catch(() => undefined);

  await writeAuditLog({
    action: "payment.logged.manual",
    actorUserId: admin._id,
    actorEmail: admin.email,
    targetCollection: "payments",
    targetId: payment._id?.toHexString(),
  });

  revalidatePath("/admin");
  revalidatePath("/portal/account");
}

export async function refundPayment(formData: FormData) {
  const admin = await requireAdminAccess();
  const parsed = refundSchema.safeParse({
    paymentId: String(formData.get("paymentId") ?? ""),
    amount: formData.get("amount") ? Number(formData.get("amount")) : undefined,
  });

  if (!parsed.success) {
    return;
  }

  const result = await executeProviderRefund({
    paymentId: parsed.data.paymentId,
    amount: parsed.data.amount,
  });

  if (!result) {
    return;
  }

  await writeAuditLog({
    action: "payment.refunded",
    actorUserId: admin._id,
    actorEmail: admin.email,
    targetCollection: "payments",
    targetId: parsed.data.paymentId,
    metadata: result,
  });

  revalidatePath("/admin");
  revalidatePath("/portal/account");
}

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on";
}

export async function upsertService(formData: FormData) {
  await requireAdminAccess();
  const parsed = serviceFormSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    title: formData.get("title"),
    slug: formData.get("slug"),
    category: formData.get("category"),
    shortDescription: formData.get("shortDescription"),
    fullDescription: formData.get("fullDescription"),
    benefits: String(formData.get("benefits") ?? ""),
    idealFor: String(formData.get("idealFor") ?? ""),
    durationMinutes: formData.get("durationMinutes"),
    price: formData.get("price"),
    depositType: formData.get("depositType"),
    depositValue: formData.get("depositValue"),
    paymentMode: formData.get("paymentMode"),
    acceptedPaymentMethods: String(formData.get("acceptedPaymentMethods") ?? ""),
    fullPaymentRequired: parseBoolean(formData.get("fullPaymentRequired")),
    payLaterEnabled: parseBoolean(formData.get("payLaterEnabled")),
    featuredImage: String(formData.get("featuredImage") ?? ""),
    featuredImageAlt: String(formData.get("featuredImageAlt") ?? ""),
    galleryImages: String(formData.get("galleryImages") ?? ""),
    seoTitle: formData.get("seoTitle"),
    metaDescription: formData.get("metaDescription"),
    isActive: parseBoolean(formData.get("isActive")),
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) return;

  const { services } = await getCollections();
  const payload = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    category: parsed.data.category,
    shortDescription: parsed.data.shortDescription,
    fullDescription: parsed.data.fullDescription,
    benefits: parsed.data.benefits.split("\n").map((item) => item.trim()).filter(Boolean),
    idealFor: parsed.data.idealFor.split("\n").map((item) => item.trim()).filter(Boolean),
    durationMinutes: parsed.data.durationMinutes,
    price: parsed.data.price,
    depositType: parsed.data.depositType,
    depositValue: parsed.data.depositValue,
    paymentMode: parsed.data.paymentMode,
    acceptedPaymentMethods: parsed.data.acceptedPaymentMethods
      .split(",")
      .map((item) => item.trim())
      .filter((item): item is "stripe" | "gocardless" | "clinic" => ["stripe", "gocardless", "clinic"].includes(item)),
    fullPaymentRequired: parsed.data.fullPaymentRequired,
    payLaterEnabled: parsed.data.payLaterEnabled,
    featuredImage: parsed.data.featuredImage,
    featuredImageAlt: parsed.data.featuredImageAlt || parsed.data.title,
    galleryImages: parsed.data.galleryImages
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
      .map((item) => {
        const [url, alt] = item.split("|").map((part) => part.trim());

        return {
          url,
          alt: alt || parsed.data.title,
        };
      }),
    seoTitle: parsed.data.seoTitle,
    metaDescription: parsed.data.metaDescription,
    faqs: [],
    isActive: parsed.data.isActive,
    displayOrder: parsed.data.displayOrder,
    updatedAt: new Date(),
  };

  if (parsed.data.id) {
    await services.updateOne({ _id: new ObjectId(parsed.data.id) }, { $set: payload });
  } else {
    await services.insertOne({ ...payload, createdAt: new Date() });
  }

  revalidatePath("/admin");
  revalidatePath("/treatments");
  revalidatePath("/");
}

export async function upsertHeroSlide(formData: FormData) {
  await requireAdminAccess();
  const parsed = slideFormSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    eyebrow: formData.get("eyebrow"),
    title: formData.get("title"),
    subtitle: formData.get("subtitle"),
    primaryCtaText: formData.get("primaryCtaText"),
    primaryCtaLink: formData.get("primaryCtaLink"),
    secondaryCtaText: formData.get("secondaryCtaText"),
    secondaryCtaLink: formData.get("secondaryCtaLink"),
    imageUrl: String(formData.get("imageUrl") ?? ""),
    imageAlt: String(formData.get("imageAlt") ?? ""),
    displayOrder: formData.get("displayOrder"),
    isActive: parseBoolean(formData.get("isActive")),
  });

  if (!parsed.success) return;

  const { heroSlides } = await getCollections();
  const payload = {
    eyebrow: parsed.data.eyebrow,
    title: parsed.data.title,
    subtitle: parsed.data.subtitle,
    primaryCtaText: parsed.data.primaryCtaText,
    primaryCtaLink: parsed.data.primaryCtaLink,
    secondaryCtaText: parsed.data.secondaryCtaText,
    secondaryCtaLink: parsed.data.secondaryCtaLink,
    imageUrl: parsed.data.imageUrl,
    imageAlt: parsed.data.imageAlt,
    displayOrder: parsed.data.displayOrder,
    isActive: parsed.data.isActive,
    updatedAt: new Date(),
  };

  if (parsed.data.id) {
    await heroSlides.updateOne({ _id: new ObjectId(parsed.data.id) }, { $set: payload });
  } else {
    await heroSlides.insertOne({ ...payload, createdAt: new Date() });
  }

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function moveHeroSlide(formData: FormData) {
  await requireAdminAccess();
  const id = String(formData.get("id") ?? "");
  const direction = String(formData.get("direction") ?? "");

  if (!id || !["up", "down"].includes(direction)) {
    return;
  }

  const { heroSlides } = await getCollections();
  const current = await heroSlides.findOne({ _id: new ObjectId(id) });

  if (!current) {
    return;
  }

  const target = await heroSlides.findOne(
    direction === "up"
      ? { displayOrder: { $lt: current.displayOrder } }
      : { displayOrder: { $gt: current.displayOrder } },
    {
      sort: { displayOrder: direction === "up" ? -1 : 1 },
    },
  );

  if (!target?._id) {
    return;
  }

  await heroSlides.updateOne({ _id: current._id }, { $set: { displayOrder: target.displayOrder, updatedAt: new Date() } });
  await heroSlides.updateOne({ _id: target._id }, { $set: { displayOrder: current.displayOrder, updatedAt: new Date() } });

  revalidatePath("/admin");
  revalidatePath("/");
}

export async function upsertFaq(formData: FormData) {
  await requireAdminAccess();
  const parsed = faqFormSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category"),
    displayOrder: formData.get("displayOrder"),
    isActive: parseBoolean(formData.get("isActive")),
  });

  if (!parsed.success) return;

  const { faqs } = await getCollections();
  const payload = {
    question: parsed.data.question,
    answer: parsed.data.answer,
    category: parsed.data.category,
    displayOrder: parsed.data.displayOrder,
    isActive: parsed.data.isActive,
    updatedAt: new Date(),
  };

  if (parsed.data.id) {
    await faqs.updateOne({ _id: new ObjectId(parsed.data.id) }, { $set: payload });
  } else {
    await faqs.insertOne({ ...payload, createdAt: new Date() });
  }

  revalidatePath("/admin");
  revalidatePath("/faqs");
  revalidatePath("/");
}

export async function upsertTestimonial(formData: FormData) {
  await requireAdminAccess();
  const parsed = testimonialFormSchema.safeParse({
    id: String(formData.get("id") ?? "") || undefined,
    customerName: formData.get("customerName"),
    source: formData.get("source"),
    rating: formData.get("rating"),
    content: formData.get("content"),
    approved: parseBoolean(formData.get("approved")),
    displayOrder: formData.get("displayOrder"),
  });

  if (!parsed.success) return;

  const { testimonials } = await getCollections();
  const payload = {
    customerName: parsed.data.customerName,
    source: parsed.data.source,
    rating: parsed.data.rating,
    content: parsed.data.content,
    approved: parsed.data.approved,
    displayOrder: parsed.data.displayOrder,
    updatedAt: new Date(),
  };

  if (parsed.data.id) {
    await testimonials.updateOne({ _id: new ObjectId(parsed.data.id) }, { $set: payload });
  } else {
    await testimonials.insertOne({ ...payload, createdAt: new Date() });
  }

  revalidatePath("/admin");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function deleteContentItem(formData: FormData) {
  await requireAdminAccess();
  const collection = String(formData.get("collection") ?? "");
  const id = String(formData.get("id") ?? "");
  const { services, heroSlides, faqs, testimonials } = await getCollections();
  const target = { services, heroSlides, faqs, testimonials }[collection as "services" | "heroSlides" | "faqs" | "testimonials"];

  if (!target || !id) return;

  await target.deleteOne({ _id: new ObjectId(id) });
  revalidatePath("/admin");
  revalidatePath("/");
  revalidatePath("/treatments");
  revalidatePath("/faqs");
  revalidatePath("/reviews");
}

export async function cancelBookingForUser(formData: FormData) {
  const user = await requireUser();
  const bookingId = String(formData.get("bookingId") ?? "");
  const { bookings } = await getCollections();
  const booking = await bookings.findOne({ _id: new ObjectId(bookingId), userId: user._id });

  if (!booking) {
    return;
  }

  const cancellationCheck = await canCancelBooking(booking.bookingDate, booking.bookingStart);

  if (!cancellationCheck.ok) {
    return;
  }

  await bookings.updateOne(
    { _id: new ObjectId(bookingId), userId: user._id },
    { $set: { status: "cancelled", updatedAt: new Date() } },
  );
  const settings = await getSiteSettings();
  await sendAdminEventNotification("booking cancelled", { ...booking, _id: booking._id }, settings).catch(() => undefined);
  revalidatePath("/portal/account");
  revalidatePath("/admin");
}

export async function rescheduleBookingForUser(formData: FormData) {
  const user = await requireUser();
  const bookingId = String(formData.get("bookingId") ?? "");
  const bookingDate = String(formData.get("bookingDate") ?? "");
  const bookingStart = String(formData.get("bookingStart") ?? "");
  const bookingEnd = String(formData.get("bookingEnd") ?? "");
  const { bookings, services } = await getCollections();
  const booking = await bookings.findOne({ _id: new ObjectId(bookingId), userId: user._id });
  if (!booking?.serviceId) return;

  const rescheduleCheck = await canRescheduleBooking(booking.bookingDate, booking.bookingStart);

  if (!rescheduleCheck.ok) {
    return;
  }

  const service = await services.findOne({ _id: booking.serviceId });
  if (!service) return;

  const slotAvailable = await isSlotAvailable(service, bookingDate, bookingStart, bookingEnd);
  if (!slotAvailable) return;

  await bookings.updateOne(
    { _id: booking._id, userId: user._id },
    {
      $set: {
        bookingDate,
        bookingStart,
        bookingEnd,
        status: "pending",
        updatedAt: new Date(),
      },
    },
  );

  const settings = await getSiteSettings();
  const updatedBooking = { ...booking, bookingDate, bookingStart, bookingEnd };
  await sendAdminEventNotification("booking rescheduled", updatedBooking, settings).catch(() => undefined);

  revalidatePath("/portal/account");
  revalidatePath("/admin");
}

export async function updateProfile(formData: FormData) {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({
    firstName: String(formData.get("firstName") ?? ""),
    lastName: String(formData.get("lastName") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    marketingConsent: formData.get("marketingConsent") === "on",
  });

  if (!parsed.success) {
    return;
  }

  const { users } = await getCollections();
  await users.updateOne(
    { _id: user._id },
    {
      $set: {
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        phone: parsed.data.phone,
        marketingConsent: parsed.data.marketingConsent,
        updatedAt: new Date(),
      },
    },
  );

  revalidatePath("/portal/account");
  revalidatePath("/admin");
}
