import "server-only";

import type { BookingDocument, PaymentDocument, SettingsDocument } from "@/lib/db-types";

type EnquiryNotificationInput = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  recipientEmail: string;
};

type PasswordResetEmailInput = {
  recipientEmail: string;
  resetUrl: string;
};

type BookingEmailInput = {
  recipientEmail: string | string[];
  subject: string;
  text: string;
  replyTo?: string;
};

type ResendPayload = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  reply_to?: string;
};

function getResendConfig(settings?: SettingsDocument | null) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = settings?.emailSettings?.senderEmail || process.env.RESEND_FROM_EMAIL || settings?.contactEmail || "";
  const fromName = settings?.emailSettings?.senderName || settings?.siteName || "Revive Holistic Therapies";

  if (!apiKey || !fromEmail) {
    return null;
  }

  return {
    apiKey,
    from: `${fromName} <${fromEmail}>`,
  };
}

async function sendResendEmail(payload: ResendPayload, settings?: SettingsDocument | null) {
  const config = getResendConfig(settings);

  if (!config) {
    return { sent: false, reason: "Resend not configured" as const };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: payload.to,
      subject: payload.subject,
      text: payload.text,
      ...(payload.reply_to ? { reply_to: payload.reply_to } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Resend request failed: ${errorText}`);
  }

  return { sent: true as const };
}

function applyTemplate(template: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce((output, [key, value]) => output.replaceAll(`{{${key}}}`, value), template);
}

async function sendBookingEmail(input: BookingEmailInput, settings?: SettingsDocument | null) {
  return sendResendEmail(
    {
      from: "",
      to: input.recipientEmail,
      subject: input.subject,
      text: input.text,
      reply_to: input.replyTo,
    },
    settings,
  );
}

export async function sendEnquiryNotification(input: EnquiryNotificationInput, settings?: SettingsDocument | null) {
  return sendResendEmail(
    {
      from: "",
      to: input.recipientEmail,
      subject: `New enquiry: ${input.subject}`,
      text: [
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone}`,
        "",
        "Message:",
        input.message,
      ].join("\n"),
      reply_to: input.email,
    },
    settings,
  );
}

export async function sendPasswordResetEmail(input: PasswordResetEmailInput, settings?: SettingsDocument | null) {
  return sendBookingEmail(
    {
      recipientEmail: input.recipientEmail,
      subject: "Reset your Revive Holistic Therapies password",
      text: [
        "A request was made to reset your client portal password.",
        "",
        `Reset your password using this link: ${input.resetUrl}`,
        "",
        "If you did not request this, you can ignore this email.",
      ].join("\n"),
    },
    settings,
  );
}

export async function sendBookingConfirmationEmail(booking: BookingDocument, settings?: SettingsDocument | null) {
  if (settings?.emailSettings?.bookingConfirmationEnabled === false) {
    return { sent: false, reason: "Booking confirmations disabled" as const };
  }

  const template =
    settings?.emailSettings?.bookingConfirmationTemplate ||
    "Hello {{customerName}},\n\nYour booking for {{serviceTitle}} on {{bookingDate}} at {{bookingStart}} has been received.\n\nReference: {{reference}}";

  return sendBookingEmail(
    {
      recipientEmail: booking.customerEmail,
      subject: "Your Revive Holistic Therapies booking confirmation",
      text: applyTemplate(template, {
        customerName: booking.customerName,
        serviceTitle: booking.serviceTitle,
        bookingDate: booking.bookingDate,
        bookingStart: booking.bookingStart,
        reference: booking._id?.toHexString() ?? "Pending",
      }),
    },
    settings,
  );
}

export async function sendPaymentConfirmationEmail(
  booking: BookingDocument,
  payment: PaymentDocument,
  settings?: SettingsDocument | null,
) {
  if (settings?.emailSettings?.paymentEmailsEnabled === false) {
    return { sent: false, reason: "Payment emails disabled" as const };
  }

  const template =
    settings?.emailSettings?.paymentConfirmationTemplate ||
    "Hello {{customerName}},\n\nWe have recorded a {{paymentType}} payment of GBP {{amount}} for {{serviceTitle}}.\n\nReceipt: {{receiptNumber}}";

  return sendBookingEmail(
    {
      recipientEmail: booking.customerEmail,
      subject: "Your Revive Holistic Therapies payment confirmation",
      text: applyTemplate(template, {
        customerName: booking.customerName,
        serviceTitle: booking.serviceTitle,
        paymentType: payment.type,
        amount: payment.amount.toFixed(2),
        receiptNumber: payment.receiptNumber,
      }),
    },
    settings,
  );
}

export async function sendAdminEventNotification(event: string, booking: BookingDocument, settings?: SettingsDocument | null) {
  const recipients = settings?.emailSettings?.notificationRecipients ?? [];

  if (!recipients.length) {
    return { sent: false, reason: "No notification recipients configured" as const };
  }

  const template =
    settings?.emailSettings?.adminNotificationTemplate ||
    "Event: {{event}}\nBooking: {{reference}}\nCustomer: {{customerName}}\nService: {{serviceTitle}}\nDate: {{bookingDate}} {{bookingStart}}";

  return sendBookingEmail(
    {
      recipientEmail: recipients,
      subject: `Clinic admin event: ${event}`,
      text: applyTemplate(template, {
        event,
        reference: booking._id?.toHexString() ?? "Pending",
        customerName: booking.customerName,
        serviceTitle: booking.serviceTitle,
        bookingDate: booking.bookingDate,
        bookingStart: booking.bookingStart,
      }),
    },
    settings,
  );
}
