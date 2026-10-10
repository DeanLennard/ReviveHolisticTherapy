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

type MagicLinkEmailInput = {
  recipientEmail: string;
  magicUrl: string;
};

type BookingEmailInput = {
  recipientEmail: string | string[];
  subject: string;
  text: string;
  html?: string;
  replyTo?: string;
};

type ResendPayload = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  reply_to?: string;
};

type BrandedEmailInput = {
  eyebrow: string;
  title: string;
  intro: string;
  content?: string;
  button?: { label: string; href: string };
  details?: Array<[string, string]>;
  settings?: SettingsDocument | null;
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
      ...(payload.html ? { html: payload.html } : {}),
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

function formatAppointmentDate(dateKey: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);
  if (!match) {
    return dateKey;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][month - 1];

  if (!monthName || day < 1 || day > 31) {
    return dateKey;
  }

  const lastTwoDigits = day % 100;
  const suffix = lastTwoDigits >= 11 && lastTwoDigits <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" }[day % 10] ?? "th");
  return `${day}${suffix} ${monthName} ${year}`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character] ?? character);
}

function formatTextAsHtml(value: string) {
  return value
    .trim()
    .split(/\n{2,}/)
    .filter(Boolean)
    .map((paragraph) => `<p style="margin:0 0 16px;color:#41546f;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;">${escapeHtml(paragraph).replaceAll("\n", "<br />")}</p>`)
    .join("");
}

function renderBrandedEmail({ eyebrow, title, intro, content, button, details = [], settings }: BrandedEmailInput) {
  const siteName = settings?.siteName || "Revive Holistic Therapies";
  const contactEmail = settings?.contactEmail || settings?.emailSettings?.senderEmail || "info@reviveholistictherapies.com";
  const detailRows = details
    .filter(([, value]) => Boolean(value))
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:13px;font-weight:700;letter-spacing:.04em;text-transform:uppercase;vertical-align:top;width:42%;">${escapeHtml(label)}</td>
          <td style="padding:10px 0;color:#0d3371;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:22px;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
  const buttonHtml = button
    ? `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0;"><tr><td style="border-radius:999px;background:#0d3371;"><a href="${escapeHtml(button.href)}" style="display:inline-block;padding:14px 24px;color:#ffffff;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;line-height:20px;text-decoration:none;">${escapeHtml(button.label)}</a></td></tr></table>`
    : "";

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f1f5f9;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f1f5f9;">
      <tr><td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:640px;background:#ffffff;border-radius:24px;overflow:hidden;">
          <tr><td style="padding:30px 36px;background:#0d3371;">
            <p style="margin:0;color:#b9d3f1;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;">Revive Holistic Therapies</p>
            <p style="margin:10px 0 0;color:#ffffff;font-family:Georgia,'Times New Roman',serif;font-size:27px;font-weight:700;line-height:34px;">Care that keeps you moving forward.</p>
          </td></tr>
          <tr><td style="padding:36px;">
            <p style="margin:0 0 10px;color:#0d3371;font-family:Arial,Helvetica,sans-serif;font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;">${escapeHtml(eyebrow)}</p>
            <h1 style="margin:0 0 16px;color:#10294c;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:700;line-height:38px;">${escapeHtml(title)}</h1>
            <p style="margin:0;color:#41546f;font-family:Arial,Helvetica,sans-serif;font-size:16px;line-height:25px;">${escapeHtml(intro)}</p>
            ${buttonHtml}
            ${content ? `<div style="margin-top:20px;">${formatTextAsHtml(content)}</div>` : ""}
            ${detailRows ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:24px;border-top:1px solid #dbe5f0;">${detailRows}</table>` : ""}
          </td></tr>
          <tr><td style="padding:24px 36px;background:#eef4f8;border-top:1px solid #dbe5f0;">
            <p style="margin:0;color:#64748b;font-family:Arial,Helvetica,sans-serif;font-size:13px;line-height:20px;">Questions? Reply to this email or contact <a href="mailto:${escapeHtml(contactEmail)}" style="color:#0d3371;font-weight:700;text-decoration:none;">${escapeHtml(contactEmail)}</a>.</p>
            <p style="margin:10px 0 0;color:#94a3b8;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:18px;">${escapeHtml(siteName)} &middot; Hednesford, Staffordshire</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

async function sendBookingEmail(input: BookingEmailInput, settings?: SettingsDocument | null) {
  return sendResendEmail(
    {
      from: "",
      to: input.recipientEmail,
      subject: input.subject,
      text: input.text,
      html: input.html,
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
      html: renderBrandedEmail({
        eyebrow: "New enquiry",
        title: input.subject,
        intro: "A new contact enquiry has been received through the website.",
        content: input.message,
        details: [["Name", input.name], ["Email", input.email], ["Phone", input.phone]],
        settings,
      }),
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
      html: renderBrandedEmail({
        eyebrow: "Client portal",
        title: "Reset your password",
        intro: "A request was made to reset your client portal password.",
        content: "If you did not request this, you can safely ignore this email.",
        button: { label: "Reset my password", href: input.resetUrl },
        settings,
      }),
    },
    settings,
  );
}

export async function sendMagicLinkEmail(input: MagicLinkEmailInput, settings?: SettingsDocument | null) {
  return sendBookingEmail(
    {
      recipientEmail: input.recipientEmail,
      subject: "Your Revive Holistic Therapies sign-in link",
      text: [
        "Use the secure link below to access your portal account.",
        "",
        input.magicUrl,
        "",
        "This link will expire soon and can only be used once.",
      ].join("\n"),
      html: renderBrandedEmail({
        eyebrow: "Client portal",
        title: "Your secure sign-in link",
        intro: "Use the button below to access your Revive Holistic Therapies portal account.",
        content: "For your security, this link expires soon and can only be used once.",
        button: { label: "Open my portal", href: input.magicUrl },
        settings,
      }),
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
  const bookingDate = formatAppointmentDate(booking.bookingDate);

  const text = applyTemplate(template, {
    customerName: booking.customerName,
    serviceTitle: booking.serviceTitle,
    bookingDate,
    bookingStart: booking.bookingStart,
    reference: booking._id?.toHexString() ?? "Pending",
  });

  return sendBookingEmail(
    {
      recipientEmail: booking.customerEmail,
      subject: "Your Revive Holistic Therapies booking confirmation",
      text,
      html: renderBrandedEmail({
        eyebrow: "Booking confirmed",
        title: "Your appointment is booked",
        intro: `Hello ${booking.customerName}, your booking has been received and is now with the clinic.`,
        content: text,
        details: [["Treatment", booking.serviceTitle], ["Date", bookingDate], ["Time", booking.bookingStart], ["Reference", booking._id?.toHexString() ?? "Pending"]],
        settings,
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

  const text = applyTemplate(template, {
    customerName: booking.customerName,
    serviceTitle: booking.serviceTitle,
    paymentType: payment.type,
    amount: payment.amount.toFixed(2),
    receiptNumber: payment.receiptNumber,
  });

  return sendBookingEmail(
    {
      recipientEmail: booking.customerEmail,
      subject: "Your Revive Holistic Therapies payment confirmation",
      text,
      html: renderBrandedEmail({
        eyebrow: "Payment received",
        title: "Thank you for your payment",
        intro: `Hello ${booking.customerName}, we have recorded your payment.`,
        content: text,
        details: [["Treatment", booking.serviceTitle], ["Payment type", payment.type], ["Amount", `GBP ${payment.amount.toFixed(2)}`], ["Receipt", payment.receiptNumber]],
        settings,
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
  const bookingDate = formatAppointmentDate(booking.bookingDate);

  const text = applyTemplate(template, {
    event,
    reference: booking._id?.toHexString() ?? "Pending",
    customerName: booking.customerName,
    serviceTitle: booking.serviceTitle,
    bookingDate,
    bookingStart: booking.bookingStart,
  });

  return sendBookingEmail(
    {
      recipientEmail: recipients,
      subject: `Clinic admin event: ${event}`,
      text,
      html: renderBrandedEmail({
        eyebrow: "Clinic update",
        title: event,
        intro: "A booking event requires your awareness.",
        content: text,
        details: [["Customer", booking.customerName], ["Treatment", booking.serviceTitle], ["Appointment", `${bookingDate} at ${booking.bookingStart}`], ["Reference", booking._id?.toHexString() ?? "Pending"]],
        settings,
      }),
    },
    settings,
  );
}
