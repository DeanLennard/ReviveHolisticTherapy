import "server-only";

import nodemailer from "nodemailer";

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
  recipientEmail: string;
  subject: string;
  text: string;
};

function getMailerConfig() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM;

  if (!host || !user || !pass || !from) {
    return null;
  }

  return {
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
    from,
  };
}

export async function sendEnquiryNotification(input: EnquiryNotificationInput) {
  const config = getMailerConfig();

  if (!config) {
    return { sent: false, reason: "SMTP not configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  await transporter.sendMail({
    from: config.from,
    to: input.recipientEmail,
    replyTo: input.email,
    subject: `New enquiry: ${input.subject}`,
    text: [
      `Name: ${input.name}`,
      `Email: ${input.email}`,
      `Phone: ${input.phone}`,
      "",
      "Message:",
      input.message,
    ].join("\n"),
  });

  return { sent: true as const };
}

export async function sendPasswordResetEmail(input: PasswordResetEmailInput) {
  const config = getMailerConfig();

  if (!config) {
    return { sent: false, reason: "SMTP not configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  await transporter.sendMail({
    from: config.from,
    to: input.recipientEmail,
    subject: "Reset your Revive Holistic Therapies password",
    text: [
      "A request was made to reset your client portal password.",
      "",
      `Reset your password using this link: ${input.resetUrl}`,
      "",
      "If you did not request this, you can ignore this email.",
    ].join("\n"),
  });

  return { sent: true as const };
}

function applyTemplate(template: string, replacements: Record<string, string>) {
  return Object.entries(replacements).reduce(
    (output, [key, value]) => output.replaceAll(`{{${key}}}`, value),
    template,
  );
}

function resolveSender(settings?: SettingsDocument | null) {
  return settings?.emailSettings?.senderEmail || process.env.SMTP_FROM || settings?.contactEmail || "no-reply@reviveholistictherapies.com";
}

async function sendBookingEmail(input: BookingEmailInput, settings?: SettingsDocument | null) {
  const config = getMailerConfig();

  if (!config) {
    return { sent: false, reason: "SMTP not configured" as const };
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  await transporter.sendMail({
    from: resolveSender(settings),
    to: input.recipientEmail,
    subject: input.subject,
    text: input.text,
  });

  return { sent: true as const };
}

export async function sendBookingConfirmationEmail(
  booking: BookingDocument,
  settings?: SettingsDocument | null,
) {
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

export async function sendAdminEventNotification(
  event: string,
  booking: BookingDocument,
  settings?: SettingsDocument | null,
) {
  const config = getMailerConfig();
  const recipients = settings?.emailSettings?.notificationRecipients ?? [];

  if (!config || !recipients.length) {
    return { sent: false, reason: "SMTP or recipients not configured" as const };
  }

  const template =
    settings?.emailSettings?.adminNotificationTemplate ||
    "Event: {{event}}\nBooking: {{reference}}\nCustomer: {{customerName}}\nService: {{serviceTitle}}\nDate: {{bookingDate}} {{bookingStart}}";

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  await transporter.sendMail({
    from: resolveSender(settings),
    to: recipients.join(", "),
    subject: `Clinic admin event: ${event}`,
    text: applyTemplate(template, {
      event,
      reference: booking._id?.toHexString() ?? "Pending",
      customerName: booking.customerName,
      serviceTitle: booking.serviceTitle,
      bookingDate: booking.bookingDate,
      bookingStart: booking.bookingStart,
    }),
  });

  return { sent: true as const };
}
