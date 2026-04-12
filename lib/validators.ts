import { z } from "zod";

export const loginSchema = z.object({
  email: z.email().trim().toLowerCase(),
  password: z.string().min(8),
});

export const signupSchema = z.object({
  firstName: z.string().min(2).trim(),
  lastName: z.string().min(2).trim(),
  email: z.email().trim().toLowerCase(),
  phone: z.string().min(7).trim(),
  password: z.string().min(8),
  marketingConsent: z.boolean().default(false),
});

export const bookingSchema = z.object({
  serviceId: z.string().min(1),
  bookingDate: z.string().min(1),
  bookingStart: z.string().min(1),
  bookingEnd: z.string().min(1),
  customerName: z.string().min(2).trim(),
  customerEmail: z.email().trim().toLowerCase(),
  customerPhone: z.string().min(7).trim(),
  practitionerName: z.string().trim().optional(),
  notes: z.string().trim().default(""),
  paymentMode: z.enum(["full-online", "deposit", "pay-later"]),
  paymentProvider: z.enum(["stripe", "gocardless", "clinic"]).default("clinic"),
});

export const enquirySchema = z.object({
  name: z.string().min(2).trim(),
  email: z.email().trim().toLowerCase(),
  phone: z.string().min(7).trim(),
  subject: z.string().min(2).trim(),
  message: z.string().min(10).trim(),
  consent: z.literal(true),
  website: z.string().trim().max(0).default(""),
});

export const profileSchema = z.object({
  firstName: z.string().min(2).trim(),
  lastName: z.string().min(2).trim(),
  phone: z.string().min(7).trim(),
  marketingConsent: z.boolean().default(false),
});

export const passwordResetRequestSchema = z.object({
  email: z.email().trim().toLowerCase(),
});

export const passwordResetSchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((value) => value.password === value.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});
