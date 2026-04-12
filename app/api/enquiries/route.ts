import { NextResponse } from "next/server";

import { getCollections } from "@/lib/collections";
import { getSiteSettings } from "@/lib/content";
import { writeAuditLog } from "@/lib/audit-log";
import { sendEnquiryNotification } from "@/lib/mailer";
import { checkRateLimit } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/validators";

function getClientKey(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  const rateLimit = checkRateLimit(`enquiry:${clientKey}`, 5, 15 * 60 * 1000);

  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: "Too many enquiries sent recently. Please try again shortly." },
      { status: 429 },
    );
  }

  const body = await request.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid enquiry details", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const [{ enquiries }, settings] = await Promise.all([getCollections(), getSiteSettings()]);
  const now = new Date();

  await enquiries.insertOne({
    name: parsed.data.name,
    email: parsed.data.email,
    phone: parsed.data.phone,
    subject: parsed.data.subject,
    message: parsed.data.message,
    consent: parsed.data.consent,
    source: "contact-form",
    spam: false,
    status: "new",
    createdAt: now,
    updatedAt: now,
  });

  await writeAuditLog({
    action: "enquiry.created",
    actorEmail: parsed.data.email,
    targetCollection: "enquiries",
    metadata: { subject: parsed.data.subject },
  });

  const recipientEmail = settings?.contactEmail || process.env.RESEND_NOTIFICATION_TO;

  if (recipientEmail) {
    try {
      await sendEnquiryNotification({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone,
        subject: parsed.data.subject,
        message: parsed.data.message,
        recipientEmail,
      }, settings);
    } catch (error) {
      console.error("Failed to send enquiry notification", error);
    }
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
