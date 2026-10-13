import "server-only";

import { ObjectId } from "mongodb";

import { ensureDatabaseSeeded } from "@/lib/bootstrap";
import { getCollections } from "@/lib/collections";
import { isServiceAvailable } from "@/lib/service-availability";

export async function getSiteSettings() {
  await ensureDatabaseSeeded();
  const { settings } = await getCollections();
  return settings.findOne({}, { sort: { updatedAt: -1 } });
}

export async function getHeroSlidesFromDb() {
  await ensureDatabaseSeeded();
  const { heroSlides } = await getCollections();
  return heroSlides.find({ isActive: true }).sort({ displayOrder: 1 }).toArray();
}

export async function getServicesFromDb() {
  await ensureDatabaseSeeded();
  const { services } = await getCollections();
  return (await services.find({ isActive: true }).sort({ displayOrder: 1 }).toArray()).filter((service) =>
    isServiceAvailable(service.slug),
  );
}

export async function getServiceBySlugFromDb(slug: string) {
  if (!isServiceAvailable(slug)) {
    return null;
  }

  await ensureDatabaseSeeded();
  const { services } = await getCollections();
  return services.findOne({ slug, isActive: true });
}

export async function getTestimonialsFromDb() {
  await ensureDatabaseSeeded();
  const { testimonials } = await getCollections();
  return testimonials.find({ approved: true }).sort({ displayOrder: 1 }).toArray();
}

export async function getFaqsFromDb() {
  await ensureDatabaseSeeded();
  const { faqs } = await getCollections();
  return faqs.find({ isActive: true }).sort({ displayOrder: 1 }).toArray();
}

export async function getBookingsForAdmin() {
  await ensureDatabaseSeeded();
  const { bookings } = await getCollections();
  return bookings.find({}).sort({ bookingDate: 1, bookingStart: 1 }).toArray();
}

export async function getBookingsForUser(userId: string) {
  await ensureDatabaseSeeded();
  const { bookings } = await getCollections();
  return bookings.find({ userId: new ObjectId(userId) }).sort({ bookingDate: 1, bookingStart: 1 }).toArray();
}

export async function getCustomersForAdmin() {
  await ensureDatabaseSeeded();
  const { users } = await getCollections();
  return users.find({ role: "customer" }).sort({ createdAt: -1 }).toArray();
}

export async function getAllHeroSlidesFromDb() {
  await ensureDatabaseSeeded();
  const { heroSlides } = await getCollections();
  return heroSlides.find({}).sort({ displayOrder: 1 }).toArray();
}

export async function getAllServicesForAdmin() {
  await ensureDatabaseSeeded();
  const { services } = await getCollections();
  return services.find({}).sort({ displayOrder: 1 }).toArray();
}

export async function getAllTestimonialsForAdmin() {
  await ensureDatabaseSeeded();
  const { testimonials } = await getCollections();
  return testimonials.find({}).sort({ displayOrder: 1 }).toArray();
}

export async function getAllFaqsForAdmin() {
  await ensureDatabaseSeeded();
  const { faqs } = await getCollections();
  return faqs.find({}).sort({ displayOrder: 1 }).toArray();
}

export async function getBlockedDatesForAdmin() {
  await ensureDatabaseSeeded();
  const { blockedDates } = await getCollections();
  return blockedDates.find({}).sort({ startDateTime: 1 }).toArray();
}

export async function getAvailabilityForAdmin() {
  await ensureDatabaseSeeded();
  const { availability } = await getCollections();
  return availability.find({}).sort({ practitionerName: 1, dayOfWeek: 1, startTime: 1 }).toArray();
}

export async function getEnquiriesForAdmin() {
  await ensureDatabaseSeeded();
  const { enquiries } = await getCollections();
  return enquiries.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getPaymentsForAdmin() {
  await ensureDatabaseSeeded();
  const { payments } = await getCollections();
  return payments.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getPaymentsForUser(userId: string) {
  await ensureDatabaseSeeded();
  const { payments } = await getCollections();
  return payments.find({ userId: new ObjectId(userId) }).sort({ createdAt: -1 }).toArray();
}

export async function getPolicyPage(slug: "privacy-policy" | "cookie-policy" | "terms-and-conditions") {
  await ensureDatabaseSeeded();
  const { policyPages } = await getCollections();
  return policyPages.findOne({ slug });
}

export async function getPolicyPagesForAdmin() {
  await ensureDatabaseSeeded();
  const { policyPages } = await getCollections();
  return policyPages.find({}).sort({ slug: 1 }).toArray();
}
