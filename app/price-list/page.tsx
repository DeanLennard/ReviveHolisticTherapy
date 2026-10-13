import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SchemaScript } from "@/components/schema-script";
import { SectionHeading } from "@/components/section-heading";
import { getServicesFromDb } from "@/lib/content";
import { mapService } from "@/lib/mappers";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site-data";
import { isServiceAvailable } from "@/lib/service-availability";

export const metadata = buildMetadata({
  title: "Massage & Treatment Prices Cannock | Revive Holistic Therapies",
  description:
    "View massage, reflexology, facial and holistic therapy prices in Cannock. Transparent pricing for all treatments at Revive Holistic Therapies.",
  path: "/price-list",
});

type PriceRow = {
  name: string;
  duration: string;
  price: string;
  href: string;
  slug?: string;
};

const massageRows: PriceRow[] = [
  { name: "Deep Tissue Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/deep-tissue-massage", slug: "deep-tissue-massage" },
  { name: "Remedial Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/remedial-massage", slug: "remedial-massage" },
  { name: "Aromatherapy Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/aromatherapy-massage", slug: "aromatherapy-massage" },
  { name: "Indian Head Massage", duration: "30 min / 60 min", price: "£30 / £60", href: "/massage-treatments/indian-head-massage", slug: "indian-head-massage" },
  { name: "Heat Therapy Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/heat-therapy-massage", slug: "heat-therapy-massage" },
  { name: "Aqua Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/aqua-massage", slug: "aqua-massage" },
  { name: "Hot Stone Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/hot-stone-massage", slug: "hot-stone-massage" },
  { name: "Warm Bamboo Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/warm-bamboo-massage", slug: "warm-bamboo-massage" },
  { name: "Lomi Lomi Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/lomi-lomi-massage", slug: "lomi-lomi-massage" },
].filter((row) => !row.slug || isServiceAvailable(row.slug));

const mensRows: PriceRow[] = [
  { name: "De-Stress Body Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/mens-wellbeing/de-stress-body-massage", slug: "de-stress-body-massage" },
  { name: "Deep Tissue Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/massage-treatments/deep-tissue-massage", slug: "deep-tissue-massage" },
  { name: "Recharge Facial", duration: "60 min", price: "£60", href: "/mens-wellbeing/recharge-facial", slug: "recharge-facial" },
  { name: "Andropause Treatment", duration: "60 min", price: "£60", href: "/mens-wellbeing/andropause-treatment", slug: "andropause-treatment" },
];

const womensRows: PriceRow[] = [
  { name: "Pregnancy Massage", duration: "60 min", price: "£60", href: "/womens-wellbeing/pregnancy-massage", slug: "pregnancy-massage" },
  { name: "Peri / Menopause Massage", duration: "60 min / 90 min / 120 min", price: "£60 / £75 / £95", href: "/womens-wellbeing/peri-menopause-massage", slug: "peri-menopause-massage" },
  { name: "Oncology Massage", duration: "60 min", price: "£60", href: "/womens-wellbeing/oncology-massage", slug: "oncology-massage" },
  { name: "Reiki", duration: "60 min", price: "£60", href: "/womens-wellbeing/reiki", slug: "reiki" },
];

const reflexologyRows: PriceRow[] = [
  { name: "Foot Reflexology", duration: "45 min", price: "£45", href: "/reflexology", slug: "reflexology" },
];

const facialRows: PriceRow[] = [
  { name: "Gua Sha Facial", duration: "60 min", price: "£60", href: "/facials/gua-sha-facial", slug: "gua-sha-facial" },
  { name: "Rose Facial", duration: "60 min", price: "£60", href: "/facials/rose-facial", slug: "rose-facial" },
  { name: "Neroli Facial", duration: "60 min", price: "£60", href: "/facials/neroli-facial", slug: "neroli-facial" },
  { name: "Mini Facial", duration: "30 min", price: "£30", href: "/facials/mini-facial", slug: "mini-facial" },
  { name: "Recharge Facial", duration: "60 min", price: "£60", href: "/facials/recharge-facial", slug: "recharge-facial" },
  { name: "Facial Reflexology", duration: "Please enquire", price: "Coming soon", href: "/facials/facial-reflexology" },
];

const holisticRows: PriceRow[] = [
  { name: "Crystal Therapy", duration: "60 min", price: "£60", href: "/holistic-therapies/crystal-therapy", slug: "crystal-therapy" },
  { name: "Hopi Ear Candles", duration: "45 min", price: "£45", href: "/holistic-therapies/hopi-ear-candles", slug: "hopi-ear-candles" },
  { name: "Auriculotherapy", duration: "Please enquire", price: "Coming soon", href: "/holistic-therapies/auriculotherapy" },
];

function PaymentBadge({
  slug,
  serviceMap,
}: {
  slug: string | undefined;
  serviceMap: Map<string, ReturnType<typeof mapService>>;
}) {
  if (!slug) {
    return null;
  }

  const service = serviceMap.get(slug);
  if (!service) {
    return null;
  }

  const labels: string[] = [];

  if (service.paymentMode === "deposit") {
    labels.push("Deposit available");
  }

  if (service.paymentMode === "full-online" || service.fullPaymentRequired) {
    labels.push("Pay online");
  }

  if (service.paymentMode === "pay-later" || service.payLaterEnabled) {
    labels.push("Pay in clinic");
  }

  if (service.acceptedPaymentMethods?.includes("stripe")) {
    labels.push("Stripe");
  }

  if (service.acceptedPaymentMethods?.includes("gocardless")) {
    labels.push("GoCardless");
  }

  if (labels.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {labels.map((label) => (
        <span
          key={label}
          className="rounded-full border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--color-heading)]"
        >
          {label}
        </span>
      ))}
    </div>
  );
}

function PricingTable({
  title,
  rows,
  serviceMap,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  rows: PriceRow[];
  serviceMap: Map<string, ReturnType<typeof mapService>>;
  ctaLabel: string;
  ctaHref: string;
}) {
  return (
    <section className="mt-24">
      <SectionHeading eyebrow="Prices" title={title} />
      <div className="mt-8 overflow-hidden rounded-[2rem] border border-[color:var(--color-border)] bg-white shadow-[var(--shadow-soft)]">
        <div className="hidden grid-cols-[1.4fr_1fr_0.8fr] gap-4 border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-4 text-sm font-semibold text-[color:var(--color-heading)] md:grid">
          <span>Treatment</span>
          <span>Duration</span>
          <span>Price</span>
        </div>
        <div className="divide-y divide-[color:var(--color-border)]">
          {rows.map((row) => (
            <div key={`${row.name}-${row.duration}`} className="px-6 py-6">
              <div className="grid gap-4 md:grid-cols-[1.4fr_1fr_0.8fr] md:items-start">
                <div>
                  <Link href={row.href} className="font-display text-2xl font-semibold text-[color:var(--color-heading)] transition hover:text-[color:var(--color-accent)]">
                    {row.name}
                  </Link>
                  <PaymentBadge slug={row.slug} serviceMap={serviceMap} />
                </div>
                <div className="flex flex-wrap items-center gap-2 text-[color:var(--color-text-muted)]">
                  {row.duration.includes("60 min") ? (
                    <span className="rounded-full bg-[color:var(--color-surface)] px-3 py-1 text-xs font-semibold text-[color:var(--color-heading)]">
                      Most popular
                    </span>
                  ) : null}
                  {row.duration.includes("90 min") ? (
                    <span className="rounded-full bg-[color:var(--color-accent-soft)] px-3 py-1 text-xs font-semibold text-[color:var(--color-heading)]">
                      Best value
                    </span>
                  ) : null}
                  <span className="text-base">{row.duration}</span>
                </div>
                <div className="text-2xl font-semibold text-[color:var(--color-heading)]">{row.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6">
        <Link href={ctaHref} className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}

export default async function PriceListPage() {
  const serviceDocs = await getServicesFromDb();
  const services = serviceDocs.map(mapService);
  const serviceMap = new Map(services.map((service) => [service.slug, service] as const));

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Treatment Prices",
      description:
        "Massage, reflexology, facial and holistic therapy prices in Cannock for Revive Holistic Therapies.",
      url: `${site.domain}/price-list`,
    },
  ];

  return (
    <div className="shell py-8 sm:py-10">
      <SchemaScript data={schema} />
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Price List" }]} />
      <PageHero
        eyebrow="Price list"
        title="Massage and Treatment Prices in Cannock"
        description="Pricing is really easy: choose the time that suits you, then choose the treatment that feels right."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Now
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Simple, clear pricing"
            title="Simple, clear pricing"
            description="It is really easy: £60 for 60 minutes, £75 for 90 minutes and £95 for 120 minutes."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Our standard treatment pricing is based on time, so you can choose the session length that works best for you.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            If you are unsure which treatment is right for you, feel free to get in touch and we will be happy to guide you.
          </p>
        </div>

        <div className="rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="eyebrow">Payment options</p>
          <h2 className="mt-5 font-display text-3xl font-semibold">Pay your way</h2>
          <div className="mt-6 space-y-3 text-[color:var(--color-text-muted)]">
            <p>Pay by cash or bank transfer.</p>
          </div>
          <div className="mt-6 rounded-[1.5rem] bg-[color:var(--color-surface)] p-5 text-sm leading-7 text-[color:var(--color-text-muted)]">
            Payment is collected at the clinic unless a different arrangement has been agreed with your therapist.
          </div>
        </div>
      </section>

      <PricingTable title="Massage Treatments" rows={massageRows} serviceMap={serviceMap} ctaLabel="Book Massage" ctaHref="/booking" />
      <PricingTable title="Men's Wellbeing Treatments" rows={mensRows} serviceMap={serviceMap} ctaLabel="Book Men's Treatment" ctaHref="/booking" />
      <PricingTable title="Women's Wellbeing Treatments" rows={womensRows} serviceMap={serviceMap} ctaLabel="Book Women's Treatment" ctaHref="/booking" />
      <PricingTable title="Reflexology" rows={reflexologyRows} serviceMap={serviceMap} ctaLabel="Book Reflexology" ctaHref="/booking" />
      <PricingTable title="Facials" rows={facialRows} serviceMap={serviceMap} ctaLabel="Book a Facial" ctaHref="/booking" />
      <PricingTable title="Holistic Therapies" rows={holisticRows} serviceMap={serviceMap} ctaLabel="Book a Treatment" ctaHref="/booking" />

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_0.95fr]">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Packages"
            title="Packages"
            description="Our treatment packages combine multiple therapies to provide a more complete and relaxing experience."
          />
          <div className="mt-6">
            <Link href="/offers" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]">
              View Packages
            </Link>
          </div>
        </div>

        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Booking made easy"
            title="Easy booking, flexible options"
            description="You can book your treatment online quickly and easily."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Choose a time that suits you and enjoy a personalised experience tailored to your needs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
              Book Now
            </Link>
            <Link href="/contact" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
              Get Guidance
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Local pricing"
            title="Affordable massage and wellbeing treatments in Cannock"
            description="If you are looking for massage prices in Cannock, Revive Holistic Therapies offers a range of treatments at clear and competitive prices."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We welcome clients from Cannock, Hednesford and nearby Staffordshire areas.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Frequently asked questions"
            title="Price list FAQs"
            description="A few helpful answers before you book."
          />
          <div className="mt-8 space-y-4">
            {[
              {
                question: "Do you offer packages?",
                answer: "Yes, packages are available for longer or combined treatments.",
              },
              {
                question: "Do I need to pay in advance?",
                answer: "You can book online and choose your preferred payment option.",
              },
              {
                question: "Can I get help choosing a treatment?",
                answer: "Yes, feel free to contact us for guidance.",
              },
            ].map((faq) => (
              <details key={faq.question} className="rounded-[1.25rem] border border-[color:var(--color-border)] bg-white px-5 py-4">
                <summary className="cursor-pointer font-semibold text-[color:var(--color-heading)]">{faq.question}</summary>
                <p className="mt-3 text-[color:var(--color-text-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Ready to book?</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">Ready to book your treatment?</h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">Choose your treatment and book your appointment today.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/booking" className="rounded-full bg-white px-6 py-3 text-center font-semibold text-[#0A234D]">
            Book Now
          </Link>
          <Link href="/contact" className="rounded-full border border-[#AFC8ED] bg-[#174A91] px-6 py-3 text-center font-semibold text-white">
            Contact Us
          </Link>
        </div>
      </section>

      <section className="mt-16 flex flex-wrap gap-3">
        {[
          { href: "/", label: "Home" },
          { href: "/massage-treatments", label: "Massage Treatments" },
          { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
          { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
          { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
          { href: "/reflexology", label: "Reflexology" },
          { href: "/womens-wellbeing", label: "Women's Wellbeing" },
          { href: "/mens-wellbeing", label: "Men's Wellbeing" },
          { href: "/facials", label: "Facials" },
          { href: "/holistic-therapies", label: "Holistic Therapies" },
          { href: "/booking", label: "Booking" },
          { href: "/contact", label: "Contact" },
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

      <div className="fixed inset-x-0 bottom-4 z-40 px-4 sm:hidden">
        <Link
          href="/booking"
          className="block rounded-full bg-[color:var(--color-accent)] px-5 py-4 text-center font-semibold text-white shadow-[0_20px_45px_-25px_rgba(13,51,113,0.85)]"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
