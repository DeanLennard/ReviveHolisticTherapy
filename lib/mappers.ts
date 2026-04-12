import type { FaqDocument, HeroSlideDocument, ServiceDocument, TestimonialDocument } from "@/lib/db-types";
import type { FaqItem, HeroSlide, Service, Testimonial } from "@/lib/site-data";

export function mapSlide(doc: HeroSlideDocument & { _id?: unknown }): HeroSlide {
  return {
    id: String(doc._id ?? doc.title),
    title: doc.title,
    subtitle: doc.subtitle,
    imageUrl: doc.imageUrl,
    imageAlt: doc.imageAlt,
    primaryCtaText: doc.primaryCtaText,
    primaryCtaLink: doc.primaryCtaLink,
    secondaryCtaText: doc.secondaryCtaText,
    secondaryCtaLink: doc.secondaryCtaLink,
    displayOrder: doc.displayOrder,
    isActive: doc.isActive,
    eyebrow: doc.eyebrow,
  };
}

export function mapService(doc: ServiceDocument & { _id?: unknown }): Service {
  return {
    id: String(doc._id ?? doc.slug),
    title: doc.title,
    slug: doc.slug,
    category: doc.category,
    shortDescription: doc.shortDescription,
    fullDescription: doc.fullDescription,
    benefits: doc.benefits,
    idealFor: doc.idealFor,
    durationMinutes: doc.durationMinutes,
    price: doc.price,
    depositType: doc.depositType,
    depositValue: doc.depositValue,
    paymentMode: doc.paymentMode,
    acceptedPaymentMethods: doc.acceptedPaymentMethods,
    fullPaymentRequired: doc.fullPaymentRequired,
    payLaterEnabled: doc.payLaterEnabled,
    featuredImage: doc.featuredImage,
    featuredImageAlt: doc.featuredImageAlt,
    galleryImages: doc.galleryImages.map((item) => item.url),
    seoTitle: doc.seoTitle,
    metaDescription: doc.metaDescription,
    faqs: doc.faqs,
    isActive: doc.isActive,
    displayOrder: doc.displayOrder,
  };
}

export function mapTestimonial(doc: TestimonialDocument & { _id?: unknown }): Testimonial {
  return {
    id: String(doc._id ?? doc.customerName),
    customerName: doc.customerName,
    rating: doc.rating,
    source: doc.source,
    content: doc.content,
    approved: doc.approved,
    displayOrder: doc.displayOrder,
  };
}

export function mapFaq(doc: FaqDocument & { _id?: unknown }): FaqItem {
  return {
    id: String(doc._id ?? doc.question),
    question: doc.question,
    answer: doc.answer,
    category: doc.category,
    displayOrder: doc.displayOrder,
    isActive: doc.isActive,
  };
}
