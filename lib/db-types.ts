import { ObjectId } from "mongodb";

export type Role = "super_admin" | "admin" | "staff" | "content_editor" | "bookings_manager" | "customer";

export type UserDocument = {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  passwordHash: string;
  role: Role;
  marketingConsent: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
};

export type HeroSlideDocument = {
  _id?: ObjectId;
  title: string;
  subtitle: string;
  imageUrl: string;
  imageAlt: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  displayOrder: number;
  isActive: boolean;
  eyebrow: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ServiceDocument = {
  _id?: ObjectId;
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  idealFor: string[];
  durationMinutes: number;
  price: number;
  depositType: "percentage" | "fixed" | "none";
  depositValue: number;
  paymentMode: "full-online" | "deposit" | "pay-later";
  acceptedPaymentMethods?: Array<"stripe" | "gocardless" | "clinic">;
  fullPaymentRequired?: boolean;
  payLaterEnabled?: boolean;
  featuredImage: string;
  featuredImageAlt: string;
  galleryImages: Array<{ url: string; alt: string }>;
  seoTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  isActive: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type TestimonialDocument = {
  _id?: ObjectId;
  customerName: string;
  rating: number;
  source: string;
  content: string;
  approved: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
};

export type FaqDocument = {
  _id?: ObjectId;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BookingStatus =
  | "pending"
  | "confirmed"
  | "paid"
  | "deposit paid"
  | "cancelled"
  | "completed"
  | "no show"
  | "refunded";

export type PaymentStatus =
  | "unpaid"
  | "pending"
  | "deposit paid"
  | "paid"
  | "failed"
  | "refunded"
  | "partially refunded";

export type BookingDocument = {
  _id?: ObjectId;
  userId?: ObjectId | null;
  serviceId?: ObjectId | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  serviceTitle: string;
  practitionerName?: string | null;
  bookingDate: string;
  bookingStart: string;
  bookingEnd: string;
  status: BookingStatus;
  paymentStatus: PaymentStatus;
  paymentProvider: "stripe" | "gocardless" | "clinic" | "none";
  paymentReference?: string | null;
  paymentMode?: "full-online" | "deposit" | "pay-later";
  reminderSentAt?: Date | null;
  depositAmount: number;
  totalAmount: number;
  notes: string;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AvailabilityDocument = {
  _id?: ObjectId;
  practitionerId?: ObjectId | null;
  practitionerName?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  slotInterval: number;
  bufferBefore: number;
  bufferAfter: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BlockedDateDocument = {
  _id?: ObjectId;
  startDateTime: Date;
  endDateTime: Date;
  reason: string;
  createdBy?: ObjectId | null;
  createdAt: Date;
};

export type SettingsDocument = {
  _id?: ObjectId;
  siteName: string;
  brandPrimaryColor: string;
  contactPhone: string;
  contactEmail: string;
  address: string[];
  openingHours: Array<{ day: string; hours: string }>;
  socialLinks: Array<{ label: string; href: string }>;
  bookingSettings: {
    maximumBookingHorizonDays: number;
    minimumNoticeHours: number;
    cancellationWindowHours: number;
    rescheduleWindowHours: number;
  };
  paymentSettings: {
    stripeEnabled: boolean;
    goCardlessEnabled: boolean;
    defaultMethod: string;
    payLaterEnabled: boolean;
    refundSupport: boolean;
    depositCollectionMode?: "fixed" | "percentage" | "service";
    defaultDepositValue?: number;
  };
  contactOptions?: {
    whatsappNumber?: string;
    whatsappEnabled?: boolean;
  };
  footerCta?: {
    title: string;
    body: string;
    buttonText: string;
    buttonLink: string;
  };
  homepageCta?: {
    title: string;
    body: string;
    primaryText: string;
    primaryLink: string;
    secondaryText: string;
    secondaryLink: string;
  };
  emailSettings?: {
    senderName: string;
    senderEmail: string;
    notificationRecipients: string[];
    reminderLeadHours: number;
    bookingConfirmationEnabled: boolean;
    paymentEmailsEnabled: boolean;
    adminCancelledBookingNotifications: boolean;
    adminFailedPaymentNotifications: boolean;
    bookingConfirmationTemplate: string;
    paymentConfirmationTemplate: string;
    adminNotificationTemplate: string;
  };
  seoDefaults: {
    titleTemplate: string;
    defaultDescription: string;
    localAreas: string[];
  };
  schemaData: Record<string, unknown>;
  updatedAt: Date;
};

export type EnquiryDocument = {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  consent: boolean;
  source: "contact-form";
  spam: boolean;
  status: "new" | "read" | "responded" | "archived";
  createdAt: Date;
  updatedAt: Date;
};

export type PasswordResetTokenDocument = {
  _id?: ObjectId;
  userId: ObjectId;
  email: string;
  tokenHash: string;
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt: Date;
};

export type PolicyPageDocument = {
  _id?: ObjectId;
  slug: "privacy-policy" | "cookie-policy" | "terms-and-conditions";
  title: string;
  description: string;
  content: string[];
  updatedAt: Date;
};

export type PaymentDocument = {
  _id?: ObjectId;
  bookingId?: ObjectId | null;
  userId?: ObjectId | null;
  provider: "stripe" | "gocardless" | "clinic" | "none";
  providerTransactionId?: string | null;
  amount: number;
  currency: string;
  type: "deposit" | "full" | "manual" | "refund";
  status: PaymentStatus;
  receiptNumber: string;
  notes?: string;
  rawResponse?: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AuditLogDocument = {
  _id?: ObjectId;
  action: string;
  actorUserId?: ObjectId | null;
  actorEmail?: string | null;
  targetCollection?: string | null;
  targetId?: string | null;
  metadata?: Record<string, unknown>;
  createdAt: Date;
};
