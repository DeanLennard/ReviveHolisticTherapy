import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/contact/contact-form";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";

export const metadata = buildMetadata({
  title: "Contact Revive Holistic Therapies Cannock | Book Massage & Treatments",
  description:
    "Contact Revive Holistic Therapies in Cannock to book massage, reflexology or wellbeing treatments. Easy booking and enquiries available.",
  path: "/contact",
});

export default function ContactPage() {
  const whatsappNumber = "447730282309";
  const mapSrc = "https://maps.google.com/maps?q=Littleworth%20Hill%2C%20Hednesford%2C%20WS12%201NS&z=15&output=embed";
  const schema = [
    {
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
      name: site.name,
      telephone: site.phone,
      email: site.email,
      url: `${site.domain}/contact`,
      areaServed: ["Cannock", "Hednesford", "Staffordshire"],
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
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: site.phone,
      email: site.email,
      areaServed: "GB",
      availableLanguage: "en-GB",
    },
  ];

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        eyebrow="Contact"
        title="Book Your Treatment or Get in Touch"
        description="If you would like to book a treatment or have any questions, we are here to help. Revive Holistic Therapies welcomes clients from Cannock, Hednesford and surrounding areas for massage, reflexology, facials and holistic wellbeing treatments. You can book online, contact us directly or send a message using the form below."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <a href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Now
        </a>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Quick ways to get in touch"
          title="Quick ways to get in touch"
          description="Choose the easiest option for booking or asking a question."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Book Online",
              copy: "Book your treatment quickly and easily using our online booking system.",
              href: "/booking",
              label: "Book Now",
            },
            {
              title: "Call Us",
              copy: "Speak directly to discuss treatments or availability.",
              href: `tel:${site.phone}`,
              label: site.phone,
            },
            {
              title: "Email Us",
              copy: "Send us a message and we will get back to you as soon as possible.",
              href: `mailto:${site.email}`,
              label: site.email,
            },
            {
              title: "WhatsApp",
              copy: "Message us for quick enquiries and responses.",
              href: `https://wa.me/${whatsappNumber}`,
              label: "Message on WhatsApp",
            },
          ].map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("https://wa.me") ? "_blank" : undefined}
              rel={item.href.startsWith("https://wa.me") ? "noreferrer" : undefined}
              className="surface-card-strong rounded-[1.8rem] p-6 transition hover:-translate-y-0.5"
            >
              <p className="eyebrow">{item.title}</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-[color:var(--color-heading)]">{item.title}</h2>
              <p className="mt-3 text-base leading-7 text-[color:var(--color-text-muted)]">{item.copy}</p>
              <span className="mt-5 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)]">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-[2rem] bg-[color:var(--color-heading)] p-8 text-white">
          <p className="eyebrow text-white/70">Contact details</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-white">Contact details</h2>
          <div className="mt-8 space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Business name</p>
              <p className="mt-2 text-lg text-white/90">{site.name}</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Location</p>
              <p className="mt-2 text-lg text-white/90">Cannock / Hednesford, Staffordshire</p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Address</p>
              <div className="mt-2 space-y-1 text-white/90">
                {site.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Phone</p>
              <a href={`tel:${site.phone}`} className="mt-2 inline-block text-lg text-white underline-offset-4 hover:underline">
                {site.phone}
              </a>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/60">Email</p>
              <a href={`mailto:${site.email}`} className="mt-2 inline-block text-lg text-white underline-offset-4 hover:underline">
                {site.email}
              </a>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Opening hours</p>
          <h2 className="mt-5 font-display text-3xl font-semibold">Opening hours</h2>
          <div className="mt-8 space-y-3 text-[color:var(--color-text-muted)]">
            {site.openingHours.map((row) => (
              <div key={row.day} className="flex items-center justify-between gap-6 rounded-[1rem] bg-[color:var(--color-surface)] px-4 py-3">
                <span className="font-medium text-[color:var(--color-heading)]">{row.day}</span>
                <span>{row.hours}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Find us</p>
          <h2 className="mt-5 font-display text-3xl font-semibold">Find us</h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Revive Holistic Therapies is conveniently located for clients in Cannock, Hednesford and surrounding Staffordshire areas.
          </p>
          <div className="mt-8 overflow-hidden rounded-[1.75rem] border border-[color:var(--color-border)]">
            <iframe
              title="Revive Holistic Therapies map"
              src={mapSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full border-0"
            />
          </div>
        </div>

        <div className="surface-card-strong rounded-[2rem] p-8">
          <p className="eyebrow">Booking made simple</p>
          <h2 className="mt-5 font-display text-3xl font-semibold text-[color:var(--color-heading)]">Booking made simple</h2>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We aim to make booking your treatment as easy as possible. You can book online at a time that suits you, or get in touch if you would like guidance on choosing the right treatment.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
              Book Now
            </a>
            <a href={`tel:${site.phone}`} className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
              Call Us
            </a>
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <ContactForm />

        <aside className="space-y-6">
          <div className="surface-card-strong rounded-[2rem] p-8">
            <p className="eyebrow">Massage and wellbeing treatments in Cannock</p>
            <h2 className="mt-5 font-display text-3xl font-semibold text-[color:var(--color-heading)]">Massage and wellbeing treatments in Cannock</h2>
            <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
              If you are looking for massage therapy in Cannock, Revive Holistic Therapies offers a range of treatments including massage, reflexology, facials and holistic therapies.
            </p>
            <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
              We welcome clients from Cannock, Hednesford and nearby Staffordshire areas who are looking for a professional and relaxing treatment experience.
            </p>
          </div>

          <div className="surface-card-strong rounded-[2rem] p-8">
            <p className="eyebrow">Helpful links</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {[
                { href: "/booking", label: "Book Now" },
                { href: "/massage-treatments", label: "Massage Treatments" },
                { href: "/reflexology", label: "Reflexology" },
                { href: "/facials", label: "Facials" },
                { href: "/holistic-therapies", label: "Holistic Therapies" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-full border border-[color:var(--color-border)] bg-white px-4 py-2 text-sm font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Ready to book?</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Ready to book your treatment?</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">Choose your treatment and book your appointment online today.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/booking" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#0A234D]">
            Book Now
          </a>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <a
          href="/booking"
          className="block rounded-full bg-[color:var(--color-accent)] px-5 py-4 text-center font-semibold text-white shadow-[0_20px_45px_-25px_rgba(13,51,113,0.85)]"
        >
          Book Now
        </a>
      </div>
    </div>
  );
}
