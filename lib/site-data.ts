export type HeroSlide = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
  imageAlt?: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  displayOrder: number;
  isActive: boolean;
  eyebrow: string;
};

export type Service = {
  id: string;
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
  featuredImageAlt?: string;
  galleryImages: string[];
  seoTitle: string;
  metaDescription: string;
  faqs: Array<{ question: string; answer: string }>;
  isActive: boolean;
  displayOrder: number;
};

export type Testimonial = {
  id: string;
  customerName: string;
  rating: number;
  source: string;
  content: string;
  approved: boolean;
  displayOrder: number;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
  isActive: boolean;
};

export type Booking = {
  id: string;
  customerName: string;
  serviceTitle: string;
  bookingDate: string;
  bookingStart: string;
  bookingEnd: string;
  status:
    | "pending"
    | "confirmed"
    | "paid"
    | "deposit paid"
    | "cancelled"
    | "completed"
    | "no show"
    | "refunded";
  paymentStatus:
    | "unpaid"
    | "pending"
    | "deposit paid"
    | "paid"
    | "failed"
    | "refunded"
    | "partially refunded";
  paymentProvider: "stripe" | "gocardless" | "clinic" | "none";
  notes: string;
};

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  marketingConsent: boolean;
  upcomingBookings: number;
  lifetimeVisits: number;
  lastVisit: string;
};

export type NavLinkItem = {
  href: string;
  label: string;
  badge?: string;
};

export type NavGroup = {
  title: string;
  href?: string;
  links: NavLinkItem[];
};

export type NavItem = NavLinkItem & {
  children?: NavLinkItem[];
  groups?: NavGroup[];
};

export const site = {
  name: "Revive Holistic Therapies",
  domain: "https://reviveholistictherapies.com",
  accent: "#2ba3ac",
  phone: "07730282309",
  whatsappNumber: "+447730282309",
  email: "info@reviveholistictherapies.com",
  address: [
    "Revive Holistic Therapies",
    "Littleworth Hill",
    "Hednesford",
    "WS12 1NS",
  ],
  openingHours: [
    { day: "Monday", hours: "9:00am - 6:00pm" },
    { day: "Tuesday", hours: "9:00am - 7:00pm" },
    { day: "Wednesday", hours: "9:00am - 7:00pm" },
    { day: "Thursday", hours: "9:00am - 8:00pm" },
    { day: "Friday", hours: "9:00am - 6:00pm" },
    { day: "Saturday", hours: "9:00am - 3:00pm" },
    { day: "Sunday", hours: "Closed" },
  ],
  primaryNav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    {
      href: "/massage-treatments",
      label: "Massage Treatments",
      children: [
        { href: "/massage-treatments", label: "Massage Overview" },
        { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
        { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
        { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
        { href: "/massage-treatments/indian-head-massage", label: "Indian Head Massage" },
        { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
        { href: "/massage-treatments/aqua-massage", label: "Aqua Massage" },
        { href: "/massage-treatments/hot-stone-massage", label: "Hot Stone Massage" },
        { href: "/massage-treatments/warm-bamboo-massage", label: "Warm Bamboo Massage" },
        { href: "/massage-treatments/lomi-lomi-massage", label: "Lomi Lomi Massage" },
      ],
    },
    { href: "/reflexology", label: "Reflexology" },
    {
      href: "/womens-wellbeing",
      label: "Women’s Wellbeing",
      children: [
        { href: "/womens-wellbeing", label: "Women’s Wellbeing Overview" },
        { href: "/womens-wellbeing/pregnancy-massage", label: "Pregnancy Massage" },
        { href: "/womens-wellbeing/peri-menopause-massage", label: "Peri / Menopause Massage" },
        { href: "/womens-wellbeing/oncology-massage", label: "Oncology Massage" },
        { href: "/womens-wellbeing/reiki", label: "Reiki" },
      ],
    },
    {
      href: "/mens-wellbeing",
      label: "Men’s Wellbeing",
      children: [
        { href: "/mens-wellbeing", label: "Men’s Wellbeing Overview" },
        { href: "/mens-wellbeing/de-stress-body-massage", label: "De-Stress Body Massage" },
        { href: "/mens-wellbeing/deep-tissue-massage", label: "Deep Tissue Massage" },
        { href: "/mens-wellbeing/recharge-facial", label: "Recharge Facial" },
        { href: "/mens-wellbeing/andropause-treatment", label: "Andropause Treatment" },
      ],
    },
    {
      href: "/facials",
      label: "Facials",
      children: [
        { href: "/facials", label: "Facials Overview" },
        { href: "/facials/gua-sha-facial", label: "Gua Sha Facial" },
        { href: "/facials/rose-facial", label: "Rose Facial" },
        { href: "/facials/neroli-facial", label: "Neroli Facial" },
        { href: "/facials/mini-facial", label: "Mini Facial" },
        { href: "/facials/recharge-facial", label: "Recharge Facial" },
      ],
    },
    {
      href: "/holistic-therapies",
      label: "Holistic Therapies",
      children: [
        { href: "/holistic-therapies", label: "Holistic Therapies Overview" },
        { href: "/holistic-therapies/crystal-therapy", label: "Crystal Therapy" },
        { href: "/holistic-therapies/hopi-ear-candles", label: "Hopi Ear Candles" },
      ],
    },
    { href: "/contact", label: "Contact" },
  ] satisfies NavItem[],
  utilityNav: [
    { href: "/portal/login", label: "Customer Portal" },
    { href: "/faqs", label: "FAQs" },
    { href: "/reviews", label: "Reviews" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/cookie-policy", label: "Cookie Policy" },
  ] satisfies NavLinkItem[],
  trustSignals: [
    "Qualified and insured therapist",
    "Tailored treatments for each client",
    "Hednesford clinic serving Cannock and nearby areas",
    "Easy online booking and follow-up care",
  ],
  localAreas: ["Cannock", "Hednesford", "Heath Hayes", "Great Wyrley", "Staffordshire"],
  businessSummary:
    "A calm, professional massage and holistic therapy clinic helping clients in Cannock, Hednesford, and surrounding Staffordshire areas feel better, move more freely, and carve out restorative time.",
};

export const localAreaPages = [
  {
    slug: "cannock",
    title: "Massage Therapy in Cannock",
    shortTitle: "Cannock",
    description:
      "Professional massage and holistic therapy for clients in Cannock, with clear treatment information, direct online booking, and a calm clinic setting nearby in Hednesford.",
    intro:
      "Revive Holistic Therapies supports clients from Cannock who want a clean, professional, and reassuring treatment experience without the noise and vagueness that often come with generic wellness sites.",
    points: [
      "Straightforward treatment information and pricing",
      "Easy online booking for local clients",
      "A Hednesford clinic location convenient for Cannock and nearby areas",
    ],
  },
  {
    slug: "hednesford",
    title: "Massage Therapy in Hednesford",
    shortTitle: "Hednesford",
    description:
      "Revive Holistic Therapies is based in Hednesford, offering massage and holistic treatments in a calm, professional clinic environment with direct online booking.",
    intro:
      "For Hednesford clients, the clinic combines local convenience with a more premium and clinical feel, making it easier to book with confidence and know what to expect before you arrive.",
    points: [
      "Local clinic location on Littleworth Hill",
      "Personalised treatments with clear next steps",
      "Simple online booking and secure account access",
    ],
  },
];

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    eyebrow: "Massage therapy in Cannock",
    title: "Targeted treatments for busy bodies and busy minds",
    subtitle:
      "Clinical care with a calm atmosphere, tailored to relieve tension, reduce stress, and support your wellbeing.",
    primaryCtaText: "Book a treatment",
    primaryCtaLink: "/booking",
    secondaryCtaText: "Explore treatments",
    secondaryCtaLink: "/massage-treatments",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "slide-2",
    eyebrow: "Deep relaxation, delivered professionally",
    title: "Restore balance with personalised holistic therapy",
    subtitle:
      "From deep tissue massage to lighter restorative sessions, every appointment is shaped around your needs.",
    primaryCtaText: "See prices",
    primaryCtaLink: "/massage-treatments",
    secondaryCtaText: "Meet your therapist",
    secondaryCtaLink: "/about",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "slide-3",
    eyebrow: "Local care for Cannock and Hednesford",
    title: "Book online in minutes and arrive knowing exactly what to expect",
    subtitle:
      "Clear treatment information, transparent pricing, and a smooth booking journey designed to build confidence.",
    primaryCtaText: "Start booking",
    primaryCtaLink: "/booking",
    secondaryCtaText: "Contact the clinic",
    secondaryCtaLink: "/contact",
    displayOrder: 3,
    isActive: true,
  },
];

export const services: Service[] = [
  {
    id: "deep-tissue",
    title: "Deep Tissue Massage",
    slug: "deep-tissue-massage",
    category: "Massage Therapy",
    shortDescription:
      "Focused massage work for persistent tension, tight shoulders, and postural strain.",
    fullDescription:
      "Deep tissue massage is designed for clients who want focused pressure and a practical, outcome-led treatment. Sessions are tailored to the areas that feel overworked, restricted, or chronically tight, with a calm pace and clear communication throughout.",
    benefits: [
      "Eases muscular tension and stiffness",
      "Supports recovery from desk posture and training load",
      "Improves comfort through the shoulders, back, and legs",
      "Helps you feel looser, more mobile, and more settled afterward",
    ],
    idealFor: [
      "Clients with desk-related upper back tension",
      "Gym-goers and active clients",
      "Persistent shoulder, neck, or lower back tightness",
    ],
    durationMinutes: 60,
    price: 58,
    depositType: "percentage",
    depositValue: 25,
    paymentMode: "deposit",
    featuredImage: "Deep tissue massage room",
    galleryImages: ["Treatment bed", "Warm towel setup"],
    seoTitle: "Deep Tissue Massage in Cannock | Revive Holistic Therapies",
    metaDescription:
      "Book deep tissue massage in Cannock for targeted relief, reduced tension, and personalised treatment in a calm professional clinic.",
    faqs: [
      {
        question: "Will deep tissue massage be painful?",
        answer:
          "Pressure is tailored carefully. You should feel purposeful work rather than something overwhelming, and pressure can be adjusted during the treatment.",
      },
      {
        question: "How often should I book?",
        answer:
          "That depends on your goals. Some clients come monthly for maintenance, while others book more regularly during higher-stress periods.",
      },
    ],
    isActive: true,
    displayOrder: 1,
  },
  {
    id: "warm-bamboo",
    title: "Warm Bamboo Massage",
    slug: "warm-bamboo-massage",
    category: "Holistic Therapy",
    shortDescription:
      "A soothing, warming treatment combining smooth bamboo tools with restorative massage techniques.",
    fullDescription:
      "Warm bamboo massage offers a deeply calming experience while still allowing effective pressure through broad flowing movements. The warmth helps muscles settle quickly, making it a popular choice for stress relief and full-body reset appointments.",
    benefits: [
      "Promotes deep relaxation",
      "Helps soften general body tension",
      "Creates a warming, comforting treatment experience",
      "Leaves clients feeling restored and rebalanced",
    ],
    idealFor: [
      "Clients looking for stress reduction",
      "People who prefer flowing massage work",
      "Anyone seeking a premium wellbeing treatment",
    ],
    durationMinutes: 75,
    price: 70,
    depositType: "fixed",
    depositValue: 15,
    paymentMode: "deposit",
    featuredImage: "Warm bamboo therapy setup",
    galleryImages: ["Bamboo tools", "Spa towels"],
    seoTitle: "Warm Bamboo Massage Cannock | Revive Holistic Therapies",
    metaDescription:
      "Discover warm bamboo massage in Cannock for a premium, deeply relaxing treatment designed to soothe body and mind.",
    faqs: [
      {
        question: "What does the bamboo massage feel like?",
        answer:
          "It feels smooth, warming, and flowing. The bamboo allows broad pressure that can be deeply relaxing without feeling abrupt.",
      },
      {
        question: "Is this suitable as a first treatment?",
        answer:
          "Yes. It is a lovely introductory treatment for clients who want to unwind and enjoy a calm, full-body experience.",
      },
    ],
    isActive: true,
    displayOrder: 2,
  },
  {
    id: "pregnancy",
    title: "Pregnancy Massage",
    slug: "pregnancy-massage",
    category: "Specialist Massage",
    shortDescription:
      "Gentle, supportive treatment tailored to comfort, relaxation, and the changing needs of pregnancy.",
    fullDescription:
      "Pregnancy massage sessions are thoughtfully adapted to support comfort and reassurance. Positioning, pacing, and pressure are all adjusted to create a treatment that helps reduce physical tension while offering valuable time to rest and reconnect.",
    benefits: [
      "Encourages calm and relaxation",
      "Helps ease tired shoulders, hips, and lower back",
      "Supports comfort during later stages of pregnancy",
      "Provides a reassuring, personalised treatment setting",
    ],
    idealFor: [
      "Expectant mothers seeking gentle tension relief",
      "Clients wanting dedicated time to relax and recharge",
      "Pregnancy-related back, hip, or shoulder discomfort",
    ],
    durationMinutes: 60,
    price: 62,
    depositType: "none",
    depositValue: 0,
    paymentMode: "pay-later",
    featuredImage: "Pregnancy treatment room",
    galleryImages: ["Pregnancy support cushions", "Soft linens"],
    seoTitle: "Pregnancy Massage in Cannock | Revive Holistic Therapies",
    metaDescription:
      "Professional pregnancy massage in Cannock with gentle, personalised care in a calm and welcoming clinic environment.",
    faqs: [
      {
        question: "Do I need to bring anything?",
        answer:
          "No special preparation is required. Comfortable clothing and any information your therapist should know about your pregnancy is helpful.",
      },
      {
        question: "Can I book online?",
        answer:
          "Yes. You can reserve your appointment online and add notes if there is anything important to mention before your session.",
      },
    ],
    isActive: true,
    displayOrder: 3,
  },
  {
    id: "reflexology",
    title: "Reflexology",
    slug: "reflexology",
    category: "Holistic Therapy",
    shortDescription:
      "A grounded, calming therapy focused on restoring balance and helping you slow down.",
    fullDescription:
      "Reflexology is ideal for clients who want a treatment that feels both calming and restorative. Sessions provide quiet space to decompress while supporting general wellbeing through a gentle, attentive approach.",
    benefits: [
      "Supports overall relaxation",
      "Creates a sense of calm and balance",
      "A gentle option for clients who prefer lighter touch",
      "Complements a wider wellbeing routine",
    ],
    idealFor: [
      "Stress-heavy routines",
      "Clients wanting a gentler therapy option",
      "People looking to prioritise regular wellbeing care",
    ],
    durationMinutes: 50,
    price: 48,
    depositType: "none",
    depositValue: 0,
    paymentMode: "pay-later",
    featuredImage: "Reflexology setting",
    galleryImages: ["Foot treatment setup", "Calming room detail"],
    seoTitle: "Reflexology Cannock | Revive Holistic Therapies",
    metaDescription:
      "Book reflexology in Cannock for a calm, professional wellbeing treatment designed to help you unwind and reset.",
    faqs: [
      {
        question: "Is reflexology suitable if I feel stressed and exhausted?",
        answer:
          "Yes. Many clients choose reflexology when they want a treatment that feels calming, grounding, and less physically intense.",
      },
      {
        question: "Can reflexology be combined with massage later?",
        answer:
          "Absolutely. It works well as part of an ongoing wellbeing plan and can complement other treatments over time.",
      },
    ],
    isActive: true,
    displayOrder: 4,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    customerName: "Sophie M.",
    rating: 5,
    source: "Google",
    content:
      "The whole experience felt calm, professional, and genuinely tailored to what I needed. I left feeling lighter and slept brilliantly that night.",
    approved: true,
    displayOrder: 1,
  },
  {
    id: "t2",
    customerName: "Laura T.",
    rating: 5,
    source: "Clinic feedback",
    content:
      "Booking was simple, the room felt spotless and welcoming, and the treatment made such a difference to the tension in my shoulders.",
    approved: true,
    displayOrder: 2,
  },
  {
    id: "t3",
    customerName: "Daniel R.",
    rating: 5,
    source: "Google",
    content:
      "A premium service without any fuss. Clear advice, excellent treatment, and a really reassuring approach from start to finish.",
    approved: true,
    displayOrder: 3,
  },
];

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "Do I need to know which treatment is right before booking?",
    answer:
      "Not necessarily. The booking flow helps guide you, and you can add notes if you are unsure. Treatments can be refined based on your needs.",
    category: "Booking",
    displayOrder: 1,
    isActive: true,
  },
  {
    id: "faq-2",
    question: "Is there parking nearby?",
    answer:
      "Yes. The clinic location in Cannock has nearby parking options, and directions are provided after booking.",
    category: "Clinic",
    displayOrder: 2,
    isActive: true,
  },
  {
    id: "faq-3",
    question: "Can I reschedule online?",
    answer:
      "Yes. Returning clients can log into the portal to review upcoming appointments and request a reschedule within the booking rules.",
    category: "Portal",
    displayOrder: 3,
    isActive: true,
  },
  {
    id: "faq-4",
    question: "Do you take deposits?",
    answer:
      "Deposit and payment rules can vary by treatment. Some appointments allow pay-on-arrival, while others can take a fixed or percentage deposit.",
    category: "Payments",
    displayOrder: 4,
    isActive: true,
  },
];

export const bookings: Booking[] = [
  {
    id: "BK-1041",
    customerName: "Emma Foster",
    serviceTitle: "Deep Tissue Massage",
    bookingDate: "2026-04-13",
    bookingStart: "09:30",
    bookingEnd: "10:30",
    status: "confirmed",
    paymentStatus: "deposit paid",
    paymentProvider: "stripe",
    notes: "Focus on neck and shoulders.",
  },
  {
    id: "BK-1042",
    customerName: "Hannah Dale",
    serviceTitle: "Warm Bamboo Massage",
    bookingDate: "2026-04-13",
    bookingStart: "11:15",
    bookingEnd: "12:30",
    status: "paid",
    paymentStatus: "paid",
    paymentProvider: "stripe",
    notes: "First visit.",
  },
  {
    id: "BK-1043",
    customerName: "Ruth Collins",
    serviceTitle: "Pregnancy Massage",
    bookingDate: "2026-04-14",
    bookingStart: "14:00",
    bookingEnd: "15:00",
    status: "confirmed",
    paymentStatus: "unpaid",
    paymentProvider: "clinic",
    notes: "28 weeks pregnant.",
  },
  {
    id: "BK-1044",
    customerName: "Lucy Price",
    serviceTitle: "Reflexology",
    bookingDate: "2026-04-15",
    bookingStart: "17:15",
    bookingEnd: "18:05",
    status: "pending",
    paymentStatus: "pending",
    paymentProvider: "gocardless",
    notes: "Portal self-booking.",
  },
];

export const customers: Customer[] = [
  {
    id: "CUS-201",
    firstName: "Emma",
    lastName: "Foster",
    email: "emma@example.com",
    phone: "07700 900100",
    marketingConsent: true,
    upcomingBookings: 1,
    lifetimeVisits: 9,
    lastVisit: "2026-03-12",
  },
  {
    id: "CUS-202",
    firstName: "Hannah",
    lastName: "Dale",
    email: "hannah@example.com",
    phone: "07700 900101",
    marketingConsent: false,
    upcomingBookings: 1,
    lifetimeVisits: 4,
    lastVisit: "2026-02-19",
  },
  {
    id: "CUS-203",
    firstName: "Ruth",
    lastName: "Collins",
    email: "ruth@example.com",
    phone: "07700 900102",
    marketingConsent: true,
    upcomingBookings: 1,
    lifetimeVisits: 2,
    lastVisit: "2026-01-27",
  },
];

export const paymentSettings = {
  stripeEnabled: true,
  goCardlessEnabled: true,
  defaultMethod: "Stripe",
  payLaterEnabled: true,
  refundSupport: true,
  recurringReady: true,
};

export function getAllServices() {
  return [...services].filter((service) => service.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug && service.isActive);
}

export function getActiveSlides() {
  return [...heroSlides].filter((slide) => slide.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getApprovedTestimonials() {
  return [...testimonials]
    .filter((testimonial) => testimonial.approved)
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getActiveFaqs() {
  return [...faqs].filter((faq) => faq.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
}
