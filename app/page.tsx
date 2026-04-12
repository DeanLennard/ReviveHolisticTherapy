import Link from "next/link";

import { FaqAccordion } from "@/components/faq-accordion";
import { HeroCarousel } from "@/components/hero-carousel";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { ServiceCard } from "@/components/service-card";
import { getFaqsFromDb, getHeroSlidesFromDb, getServicesFromDb, getSiteSettings, getTestimonialsFromDb } from "@/lib/content";
import { mapFaq, mapService, mapSlide, mapTestimonial } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Massage Therapy Cannock | Holistic Treatments & Wellbeing | Revive Holistic Therapies",
  description:
    "Revive Holistic Therapies offers massage therapy, reflexology, facials and wellbeing treatments in Cannock. Book relaxing, professional treatments tailored to your needs.",
  path: "/",
});

export default async function HomePage() {
  const [serviceDocs, slideDocs, testimonialDocs, faqDocs, settings] = await Promise.all([
    getServicesFromDb(),
    getHeroSlidesFromDb(),
    getTestimonialsFromDb(),
    getFaqsFromDb(),
    getSiteSettings(),
  ]);

  const services = serviceDocs.map(mapService);
  const slides = slideDocs.map(mapSlide);
  const testimonials = testimonialDocs.map(mapTestimonial);
  const homepageFaqs = faqDocs.map(mapFaq).slice(0, 3);
  const featuredSlugs = [
    "deep-tissue-massage",
    "reflexology",
    "pregnancy-massage",
    "warm-bamboo-massage",
  ];
  const featuredServices = featuredSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is NonNullable<(typeof services)[number]> => Boolean(service));
  const homepageCta = settings?.homepageCta;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
      name: site.name,
      areaServed: ["Cannock", "Hednesford", "Staffordshire"],
      telephone: site.phone,
      email: site.email,
      url: site.domain,
      description:
        "Professional massage therapy, reflexology, facials, and holistic wellbeing treatments for clients in Cannock, Hednesford, and surrounding Staffordshire areas.",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Littleworth Hill",
        addressLocality: "Hednesford",
        addressRegion: "Staffordshire",
        postalCode: "WS12 1NS",
        addressCountry: "GB",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Organisation",
      name: site.name,
      url: site.domain,
      telephone: site.phone,
      email: site.email,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: site.domain,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: homepageFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />

      <HeroCarousel
        slides={slides}
        heading="Massage Therapy in Cannock for Relaxation, Recovery and Wellbeing"
        description="At Revive Holistic Therapies, we offer professional massage and holistic treatments in Cannock designed to ease tension, support recovery, and help you feel more balanced in body and mind. Every treatment is tailored to your individual needs, whether you are looking for deep relaxation, relief from muscular discomfort, or ongoing wellbeing support."
        primaryCtaText="Book Now"
        primaryCtaLink="/booking"
        secondaryCtaText="Explore Treatments"
        secondaryCtaLink="/massage-treatments"
        trustLine="Professional, personalised treatments in Cannock and Hednesford"
      />

      <section className="mt-8 grid gap-px overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-[color:var(--color-border)] md:grid-cols-[1.15fr_1fr_1fr_1fr]">
        <div className="bg-white px-6 py-6">
          <p className="eyebrow">Why choose Revive</p>
          <p className="mt-4 text-lg font-semibold leading-8 text-[color:var(--color-heading)]">
            Tailored treatments, a calm professional setting, and a welcoming experience for clients from Cannock, Hednesford, and nearby areas.
          </p>
        </div>
        {[
          "Tailored treatments based on your needs",
          "Support for relaxation, muscular tension and wellbeing",
          "Easy online booking with a clear, simple process",
        ].map((signal) => (
          <div key={signal} className="bg-[color:var(--color-surface)] px-6 py-6">
            <p className="text-sm font-semibold leading-7 text-[color:var(--color-heading)]">{signal}</p>
          </div>
        ))}
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Massage and holistic therapy in Cannock"
            title="A calm, professional space for massage and holistic therapy in Cannock"
            description="Revive Holistic Therapies provides tailored treatments for clients across Cannock, Hednesford and the surrounding area."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Whether you are dealing with stress, muscular tension, fatigue, hormonal changes or simply need time to reset, treatments are designed to support your wellbeing in a calm and welcoming environment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            From massage therapy and reflexology to facials and specialist wellbeing treatments, each appointment is shaped around your needs, helping you leave feeling restored, cared for and more like yourself again.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2.1rem] border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
          {[
            ["Tailored treatments", "Based on your needs, comfort and goals for the session."],
            ["Professional setting", "Calm, welcoming and thoughtfully prepared for each appointment."],
            ["Wellbeing support", "Ideal for relaxation, muscular tension, recovery and regular self-care."],
            ["Easy booking", "Convenient for clients in Cannock and Hednesford with online booking available."],
          ].map(([title, copy]) => (
            <div key={title} className="bg-white px-6 py-7">
              <p className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">{title}</p>
              <p className="mt-3 text-base leading-7 text-[color:var(--color-text-muted)]">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Popular treatments"
            title="Popular Treatments"
            description="Explore some of our most popular massage and wellbeing treatments, all delivered with a personalised approach to help you feel relaxed, rebalanced and restored."
          />
          <Link href="/massage-treatments" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
            View All Treatments
          </Link>
        </div>

        <section className="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </section>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="eyebrow">About Revive</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] text-[color:var(--color-heading)] sm:text-4xl">
            Personalised care, professional treatment
          </h2>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            At Revive Holistic Therapies, every client is treated as an individual. We take time to understand what you need from your appointment, whether that is help with muscular tension, stress relief, relaxation or support through a particular stage of life.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Our approach is professional, caring and tailored, with treatments designed not only to help you feel better on the day, but to support your longer-term wellbeing too.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
              Learn More About Revive
            </Link>
          </div>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="eyebrow">Wellbeing treatments</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] text-[color:var(--color-heading)] sm:text-4xl">
            Specialist wellbeing treatments for men and women
          </h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-6">
              <p className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">Women’s Wellbeing</p>
              <p className="mt-3 text-base leading-7 text-[color:var(--color-text-muted)]">
                Our women’s wellbeing treatments are designed to provide support at different stages of life, including pregnancy massage, peri and menopause massage, oncology massage, Reiki and tailored holistic therapies.
              </p>
              <Link href="/womens-wellbeing" className="mt-5 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2.5 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
                Explore Women’s Wellbeing
              </Link>
            </div>
            <div className="rounded-[1.5rem] bg-[color:var(--color-surface)] p-6">
              <p className="font-display text-2xl font-semibold text-[color:var(--color-heading)]">Men’s Wellbeing</p>
              <p className="mt-3 text-base leading-7 text-[color:var(--color-text-muted)]">
                Our men’s wellbeing treatments are ideal for stress relief, muscle tension, back discomfort and general wellbeing, with options including de-stress body massage, deep tissue massage and recharge facials.
              </p>
              <Link href="/mens-wellbeing" className="mt-5 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2.5 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
                Explore Men’s Wellbeing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Reviews"
          title="Helping clients across Cannock feel relaxed, supported and restored"
          description="Clients visit Revive Holistic Therapies for a wide range of reasons, from easing tension and improving relaxation to creating regular time for self-care and wellbeing. Our aim is always to provide a professional, welcoming experience that leaves you feeling better in both body and mind."
        />
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.id} className="surface-card-strong rounded-[1.75rem] p-6">
              <p aria-label={`${testimonial.rating} out of 5 rating`} className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">
                {Array.from({ length: testimonial.rating }, () => "*").join("")}
              </p>
              <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">&quot;{testimonial.content}&quot;</p>
              <div className="mt-6 border-t border-[color:var(--color-hairline)] pt-5">
                <p className="font-semibold text-[color:var(--color-heading)]">{testimonial.customerName}</p>
                <p className="text-sm text-[color:var(--color-text-muted)]">{testimonial.source}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local Cannock content"
            title="Massage and holistic treatments in Cannock, Hednesford and nearby areas"
            description="If you are looking for massage therapy in Cannock, Revive Holistic Therapies offers a range of professional treatments designed to support relaxation, recovery and overall wellbeing."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We welcome clients from Cannock, Hednesford and surrounding Staffordshire areas who want a calm, personalised treatment experience.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Whether you are booking a deep tissue massage, reflexology session, facial or specialist wellbeing treatment, our focus is always on providing care that feels personal, professional and results-led.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
              About
            </Link>
            <Link href="/massage-treatments" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
              Massage Treatments
            </Link>
            <Link href="/reflexology" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
              Reflexology
            </Link>
            <Link href="/facials" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
              Facials
            </Link>
            <Link href="/holistic-therapies" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
              Holistic Therapies
            </Link>
          </div>
        </div>

        <div className="rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Book your treatment</p>
          <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">
            {homepageCta?.title || "Ready to book your treatment?"}
          </h2>
          <p className="mt-6 text-lg leading-8 text-[#f2fbfc]">
            {homepageCta?.body ||
              "Whether you are looking to unwind, reduce muscular tension or invest in your wellbeing, we are here to help. Choose from a range of massage, holistic and facial treatments and book your appointment online at a time that suits you."}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={homepageCta?.primaryLink || "/booking"}
              className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#162124] shadow-[0_14px_30px_-20px_rgba(0,0,0,0.45)]"
            >
              {homepageCta?.primaryText || "Book Your Appointment"}
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-[#c4e5e7] bg-[#345157] px-6 py-3 text-center font-semibold text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {homepageFaqs.length ? (
        <section className="mt-24">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Helpful answers before you book"
            description="A few common questions to make choosing and booking your treatment feel clearer."
          />
          <FaqAccordion items={homepageFaqs} className="mt-8 space-y-4" />
        </section>
      ) : null}

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <p className="eyebrow">Visit Revive Holistic Therapies</p>
          <h2 className="mt-5 font-display text-3xl font-semibold leading-[1.08] text-[color:var(--color-heading)]">
            Visit Revive Holistic Therapies
          </h2>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Revive Holistic Therapies welcomes clients from Cannock, Hednesford and the surrounding area for massage, reflexology, facials and holistic wellbeing treatments.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Link href="/booking" className="rounded-[1.4rem] bg-[color:var(--color-surface)] px-5 py-5 transition hover:bg-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Book online</p>
              <p className="mt-2 font-semibold text-[color:var(--color-heading)]">Choose your treatment and appointment time</p>
            </Link>
            <a href={`tel:${site.phone.replace(/\s+/g, "")}`} className="rounded-[1.4rem] bg-[color:var(--color-surface)] px-5 py-5 transition hover:bg-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Call</p>
              <p className="mt-2 font-semibold text-[color:var(--color-heading)]">{site.phone}</p>
            </a>
            <a href={`mailto:${site.email}`} className="min-w-0 rounded-[1.4rem] bg-[color:var(--color-surface)] px-5 py-5 transition hover:bg-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Email</p>
              <p className="mt-2 break-words text-[overflow-wrap:anywhere] font-semibold text-[color:var(--color-heading)]">{site.email}</p>
            </a>
            <Link href="/contact" className="rounded-[1.4rem] bg-[color:var(--color-surface)] px-5 py-5 transition hover:bg-white">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">Find us</p>
              <p className="mt-2 font-semibold text-[color:var(--color-heading)]">Littleworth Hill, Hednesford, WS12 1NS</p>
            </Link>
          </div>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8">
          <p className="font-semibold text-[color:var(--color-heading)]">Hednesford clinic</p>
          <p className="mt-2 text-[color:var(--color-text-muted)]">Littleworth Hill, Hednesford, WS12 1NS</p>
          <div className="mt-4 overflow-hidden rounded-[1.25rem] border border-[color:var(--color-border)]">
            <iframe
              title="Revive Holistic Therapies map"
              src="https://maps.google.com/maps?q=Littleworth%20Hill%2C%20Hednesford%2C%20WS12%201NS&z=15&output=embed"
              className="h-72 w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {site.localAreas.map((area) => (
              <Link
                key={area}
                href={area === "Cannock" ? "/areas/cannock" : area === "Hednesford" ? "/areas/hednesford" : "/contact"}
                className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              >
                {area}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
