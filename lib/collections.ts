import "server-only";

import type {
  AvailabilityDocument,
  BlockedDateDocument,
  BookingDocument,
  AuditLogDocument,
  EnquiryDocument,
  FaqDocument,
  HeroSlideDocument,
  PasswordResetTokenDocument,
  PaymentDocument,
  PolicyPageDocument,
  ServiceDocument,
  SettingsDocument,
  TestimonialDocument,
  UserDocument,
} from "@/lib/db-types";
import { getDatabase } from "@/lib/mongodb";

export async function getCollections() {
  const db = await getDatabase();

  return {
    users: db.collection<UserDocument>("users"),
    services: db.collection<ServiceDocument>("services"),
    bookings: db.collection<BookingDocument>("bookings"),
    availability: db.collection<AvailabilityDocument>("availability"),
    blockedDates: db.collection<BlockedDateDocument>("blockedDates"),
    heroSlides: db.collection<HeroSlideDocument>("heroSlides"),
    testimonials: db.collection<TestimonialDocument>("testimonials"),
    faqs: db.collection<FaqDocument>("faqs"),
    settings: db.collection<SettingsDocument>("settings"),
    enquiries: db.collection<EnquiryDocument>("enquiries"),
    payments: db.collection<PaymentDocument>("payments"),
    passwordResetTokens: db.collection<PasswordResetTokenDocument>("passwordResetTokens"),
    policyPages: db.collection<PolicyPageDocument>("policyPages"),
    auditLogs: db.collection<AuditLogDocument>("auditLogs"),
  };
}
