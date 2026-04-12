import type {
  AvailabilityDocument,
  PolicyPageDocument,
  FaqDocument,
  HeroSlideDocument,
  ServiceDocument,
  SettingsDocument,
  TestimonialDocument,
  UserDocument,
} from "@/lib/db-types";
import { faqs, heroSlides, services, site, testimonials } from "@/lib/site-data";

const now = new Date();

export function buildSeedSettings(): SettingsDocument {
  return {
    siteName: site.name,
    brandPrimaryColor: site.accent,
    contactPhone: site.phone,
    contactEmail: site.email,
    address: site.address,
    openingHours: site.openingHours,
    socialLinks: [],
    bookingSettings: {
      maximumBookingHorizonDays: 90,
      minimumNoticeHours: 12,
      cancellationWindowHours: 24,
      rescheduleWindowHours: 24,
    },
    paymentSettings: {
      stripeEnabled: true,
      goCardlessEnabled: true,
      defaultMethod: "Stripe",
      payLaterEnabled: true,
      refundSupport: true,
      depositCollectionMode: "service",
      defaultDepositValue: 25,
    },
    contactOptions: {
      whatsappNumber: site.phone,
      whatsappEnabled: true,
    },
    footerCta: {
      title: "Need help choosing a treatment?",
      body: "Get in touch for clear advice, direct booking support, or a quick question before you book.",
      buttonText: "Contact the clinic",
      buttonLink: "/contact",
    },
    homepageCta: {
      title: "Book your next treatment with clarity and confidence",
      body: "Choose your treatment, review timings and pricing, and move straight into the booking flow.",
      primaryText: "Book now",
      primaryLink: "/booking",
      secondaryText: "View treatments",
      secondaryLink: "/treatments",
    },
    emailSettings: {
      senderName: site.name,
      senderEmail: site.email,
      notificationRecipients: [site.email],
      reminderLeadHours: 24,
      bookingConfirmationEnabled: true,
      paymentEmailsEnabled: true,
      adminCancelledBookingNotifications: true,
      adminFailedPaymentNotifications: true,
      bookingConfirmationTemplate:
        "Hello {{customerName}},\n\nYour booking for {{serviceTitle}} on {{bookingDate}} at {{bookingStart}} has been received.\n\nReference: {{reference}}\n\nRevive Holistic Therapies",
      paymentConfirmationTemplate:
        "Hello {{customerName}},\n\nWe have recorded a {{paymentType}} payment of GBP {{amount}} for {{serviceTitle}}.\n\nReceipt: {{receiptNumber}}\n\nRevive Holistic Therapies",
      adminNotificationTemplate:
        "Event: {{event}}\nBooking: {{reference}}\nCustomer: {{customerName}}\nService: {{serviceTitle}}\nDate: {{bookingDate}} {{bookingStart}}",
    },
    seoDefaults: {
      titleTemplate: "%s | Revive Holistic Therapies",
      defaultDescription: site.businessSummary,
      localAreas: site.localAreas,
    },
    schemaData: {},
    updatedAt: now,
  };
}

export function buildSeedSlides(): HeroSlideDocument[] {
  return heroSlides.map((slide) => ({
    title: slide.title,
    subtitle: slide.subtitle,
    imageUrl: "",
    imageAlt: slide.title,
    primaryCtaText: slide.primaryCtaText,
    primaryCtaLink: slide.primaryCtaLink,
    secondaryCtaText: slide.secondaryCtaText,
    secondaryCtaLink: slide.secondaryCtaLink,
    displayOrder: slide.displayOrder,
    isActive: slide.isActive,
    eyebrow: slide.eyebrow,
    createdAt: now,
    updatedAt: now,
  }));
}

export function buildSeedServices(): ServiceDocument[] {
  return services.map((service) => ({
    title: service.title,
    slug: service.slug,
    category: service.category,
    shortDescription: service.shortDescription,
    fullDescription: service.fullDescription,
    benefits: service.benefits,
    idealFor: service.idealFor,
    durationMinutes: service.durationMinutes,
    price: service.price,
    depositType: service.depositType,
    depositValue: service.depositValue,
    paymentMode: service.paymentMode,
    acceptedPaymentMethods: service.paymentMode === "pay-later" ? ["clinic"] : ["stripe", "gocardless", "clinic"],
    fullPaymentRequired: service.paymentMode === "full-online",
    payLaterEnabled: service.paymentMode !== "full-online",
    featuredImage: "",
    featuredImageAlt: service.title,
    galleryImages: [],
    seoTitle: service.seoTitle,
    metaDescription: service.metaDescription,
    faqs: service.faqs,
    isActive: service.isActive,
    displayOrder: service.displayOrder,
    createdAt: now,
    updatedAt: now,
  }));
}

export function buildSeedTestimonials(): TestimonialDocument[] {
  return testimonials.map((item) => ({
    customerName: item.customerName,
    rating: item.rating,
    source: item.source,
    content: item.content,
    approved: item.approved,
    displayOrder: item.displayOrder,
    createdAt: now,
    updatedAt: now,
  }));
}

export function buildSeedFaqs(): FaqDocument[] {
  return faqs.map((item) => ({
    question: item.question,
    answer: item.answer,
    category: item.category,
    displayOrder: item.displayOrder,
    isActive: item.isActive,
    createdAt: now,
    updatedAt: now,
  }));
}

export function buildSeedAdmin(passwordHash: string): UserDocument {
  return {
    firstName: "Dean",
    lastName: "Admin",
    email: site.email,
    phone: site.phone,
    passwordHash,
    role: "super_admin",
    marketingConsent: false,
    createdAt: now,
    updatedAt: now,
    lastLoginAt: null,
  };
}

export function buildSeedAvailability(): AvailabilityDocument[] {
  return [
    { practitionerName: "Primary therapist", dayOfWeek: 1, startTime: "09:00", endTime: "18:00", slotInterval: 15, bufferBefore: 0, bufferAfter: 15, isActive: true, createdAt: now, updatedAt: now },
    { practitionerName: "Primary therapist", dayOfWeek: 2, startTime: "09:00", endTime: "19:00", slotInterval: 15, bufferBefore: 0, bufferAfter: 15, isActive: true, createdAt: now, updatedAt: now },
    { practitionerName: "Primary therapist", dayOfWeek: 3, startTime: "09:00", endTime: "19:00", slotInterval: 15, bufferBefore: 0, bufferAfter: 15, isActive: true, createdAt: now, updatedAt: now },
    { practitionerName: "Primary therapist", dayOfWeek: 4, startTime: "09:00", endTime: "20:00", slotInterval: 15, bufferBefore: 0, bufferAfter: 15, isActive: true, createdAt: now, updatedAt: now },
    { practitionerName: "Primary therapist", dayOfWeek: 5, startTime: "09:00", endTime: "18:00", slotInterval: 15, bufferBefore: 0, bufferAfter: 15, isActive: true, createdAt: now, updatedAt: now },
    { practitionerName: "Primary therapist", dayOfWeek: 6, startTime: "09:00", endTime: "15:00", slotInterval: 15, bufferBefore: 0, bufferAfter: 15, isActive: true, createdAt: now, updatedAt: now },
  ];
}

export function buildSeedPolicyPages(): PolicyPageDocument[] {
  return [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      description: "How Revive Holistic Therapies collects, uses, stores, and protects personal information.",
      content: [
        "Revive Holistic Therapies collects the information needed to respond to enquiries, manage bookings, maintain client records, and fulfil operational and legal obligations.",
        "Personal data may include contact details, booking notes, payment references, and account information where a portal account is created.",
        "Information is stored securely and should only be retained for as long as necessary for service delivery, legal compliance, and legitimate business administration.",
        "Clients may request access to or correction of their personal data by contacting the clinic directly.",
      ],
      updatedAt: now,
    },
    {
      slug: "cookie-policy",
      title: "Cookie Policy",
      description: "How cookies and similar technologies are used on the Revive Holistic Therapies website.",
      content: [
        "This website may use essential cookies for security, session handling, and core site functionality.",
        "Analytics and other non-essential cookies should only be activated after valid consent is given through the cookie preferences banner.",
        "Cookie choices can be updated at any time using the cookie preferences control on the site.",
      ],
      updatedAt: now,
    },
    {
      slug: "terms-and-conditions",
      title: "Terms & Conditions",
      description: "The booking, cancellation, payment, and treatment terms for Revive Holistic Therapies.",
      content: [
        "Appointments are subject to availability and are only considered confirmed once accepted by the clinic or completed through the online booking flow.",
        "Cancellation and rescheduling windows apply according to the clinic's current booking settings and may affect deposits or payments already taken.",
        "Clients are responsible for providing accurate information relevant to treatment suitability and for informing the clinic of any important health or booking changes.",
        "Late arrival, missed appointments, refunds, and payment timing are all governed by the clinic's active booking and payment policies.",
      ],
      updatedAt: now,
    },
  ];
}
