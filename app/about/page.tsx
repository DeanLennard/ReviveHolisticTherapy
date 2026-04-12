import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { getTestimonialsFromDb } from "@/lib/content";
import { mapTestimonial } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "About Revive Holistic Therapies | Massage Therapist in Cannock",
  description:
    "Learn about Revive Holistic Therapies in Cannock. Professional massage and holistic treatments tailored to support your wellbeing.",
  path: "/about",
});

export default async function AboutPage() {
  const testimonials = (await getTestimonialsFromDb()).map(mapTestimonial);
  const featuredTestimonial = testimonials[0];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
      name: site.name,
      areaServed: ["Cannock", "Hednesford", "Staffordshire"],
      telephone: site.phone,
      email: site.email,
      url: `${site.domain}/about`,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Littleworth Hill",
        addressLocality: "Hednesford",
        addressRegion: "Staffordshire",
        postalCode: "WS12 1NS",
        addressCountry: "GB",
      },
    },
  ];

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} />
      <PageHero
        eyebrow="About Revive"
        title="Professional Massage and Holistic Therapy in Cannock"
        description="Revive Holistic Therapies is dedicated to providing personalised treatments that support your wellbeing. Based in Cannock, we offer a range of massage, holistic and facial treatments designed to help you relax, recover and feel more balanced. Our approach is simple: every treatment is tailored to you."
      />

      <section className="mt-16 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <article className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="A personalised approach"
            title="A personalised approach to your treatment"
            description="At Revive Holistic Therapies, we understand that no two people are the same."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Whether you are dealing with muscle tension, stress, fatigue or simply need time to relax, your treatment will always be adapted to your individual needs.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We take time to listen and understand what you are looking for, ensuring your experience is both effective and comfortable.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Our focus is on helping you feel better not just during your appointment, but afterwards too.
          </p>
        </article>

        <aside className="rounded-[2rem] bg-[linear-gradient(160deg,#1f2a2e,#2b4a4e)] p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/65">Why clients choose Revive</p>
          <div className="mt-6 grid gap-4">
            {[
              "Personalised treatments tailored to your needs",
              "Professional and welcoming environment",
              "Focus on both relaxation and results",
              "Wide range of treatments available",
              "Convenient location for Cannock and Hednesford",
            ].map((value) => (
              <div key={value} className="rounded-[1.25rem] border border-white/10 bg-white/6 p-4 font-semibold">
                {value}
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Experience and expertise"
            title="Professional, tailored treatments"
            description="We specialise in working with muscular tension, everyday aches and the effects of modern lifestyles, including back discomfort and stress-related tension."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments range from more focused approaches such as deep tissue and remedial massage to calming and restorative options such as aromatherapy, reflexology and holistic therapies.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            This allows us to provide a treatment that suits you, whether your goal is relaxation, recovery or ongoing wellbeing.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Treatment philosophy"
            title="More than just a treatment"
            description="At Revive Holistic Therapies, treatments are not one-size-fits-all."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We believe that real results come from understanding your needs and adapting each session accordingly.
          </p>
          <div className="mt-6 grid gap-px overflow-hidden rounded-[1.5rem] border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
            {[
              "More relaxed",
              "More comfortable in your body",
              "Less tense",
              "More balanced",
            ].map((item) => (
              <div key={item} className="bg-white px-5 py-5 font-semibold text-[color:var(--color-heading)]">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also encourage a long-term approach to wellbeing, where regular treatments can help you maintain how you feel over time.
          </p>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Who we help"
            title="Who we work with"
            description="We welcome a wide range of clients."
          />
          <ul className="prose-list mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            {[
              "Those experiencing muscle tension or discomfort",
              "People with busy or stressful lifestyles",
              "Clients looking for relaxation and self-care",
              "Expectant mothers",
              "Those going through hormonal changes",
              "Anyone wanting to improve their overall wellbeing",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Treatments are suitable for both men and women and are always adapted to your needs.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Based locally"
            title="Based in Cannock, welcoming clients from across the area"
            description="Revive Holistic Therapies is based in Cannock and welcomes clients from Hednesford and surrounding Staffordshire areas."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We are proud to offer a calm, professional space where clients can take time out from busy lives and focus on their wellbeing.
          </p>
          <div className="mt-8 rounded-[1.5rem] border border-[color:var(--color-border)] bg-white p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[color:var(--color-accent)]">Contact details</p>
            <p className="mt-3 font-semibold text-[color:var(--color-heading)]">{site.name}</p>
            <p className="mt-2 text-[color:var(--color-text-muted)]">{site.address.join(", ")}</p>
            <p className="mt-2 text-[color:var(--color-text-muted)]">{site.phone}</p>
            <p className="mt-1 text-[color:var(--color-text-muted)]">{site.email}</p>
          </div>
        </div>
      </section>

      {featuredTestimonial ? (
        <section className="mt-24 rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Client feedback</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-lg leading-8 text-[color:var(--color-text-muted)]">&quot;{featuredTestimonial.content}&quot;</p>
              <p className="mt-5 font-semibold text-[color:var(--color-heading)]">{featuredTestimonial.customerName}</p>
              <p className="text-sm text-[color:var(--color-text-muted)]">{featuredTestimonial.source}</p>
            </div>
            <Link
              href="/reviews"
              className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 text-center font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
            >
              Read More Reviews
            </Link>
          </div>
        </section>
      ) : null}

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#2b4348_0%,#1e3135_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#e3f4f5]">Start your wellbeing journey</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Start your wellbeing journey</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#f2fbfc]">
          If you are looking for massage or holistic treatments in Cannock, we are here to help. Book your appointment today and experience a treatment tailored to you.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#162124]">
            Book Now
          </Link>
          <Link href="/contact" className="rounded-full border border-[#c4e5e7] bg-[#345157] px-6 py-3 text-center font-semibold text-white">
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-16 flex flex-wrap gap-3">
        {[
          { href: "/massage-treatments", label: "Massage Treatments" },
          { href: "/reflexology", label: "Reflexology" },
          { href: "/womens-wellbeing", label: "Women's Wellbeing" },
          { href: "/mens-wellbeing", label: "Men's Wellbeing" },
          { href: "/facials", label: "Facials" },
          { href: "/holistic-therapies", label: "Holistic Therapies" },
          { href: "/contact", label: "Contact" },
          { href: "/booking", label: "Booking" },
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
          >
            {item.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
