import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { buildMetadata } from "@/lib/seo";
import { isServiceAvailable } from "@/lib/service-availability";

export const metadata = buildMetadata({
  title: "Massage Treatments Cannock | Relaxing & Deep Tissue Massage | Revive Holistic Therapies",
  description:
    "Discover professional massage treatments in Cannock at Revive Holistic Therapies, including deep tissue, aromatherapy, remedial, Indian head and heat therapy massage.",
  path: "/massage-treatments",
});

const massageTreatments = [
  {
    title: "Deep Tissue Massage",
    body:
      "A more focused massage designed to work into deeper layers of muscle and connective tissue. Ideal for areas of tension, tightness and discomfort, this treatment can be tailored to target specific concerns while supporting improved movement and reduced muscular stress.",
    href: "/massage-treatments/deep-tissue-massage",
  },
  {
    title: "Remedial Massage",
    body:
      "Remedial massage is designed to address problem areas in the body where tension, strain or postural discomfort may be affecting your day-to-day comfort. This treatment is more targeted and can be adapted according to your needs.",
    href: "/massage-treatments/remedial-massage",
  },
  {
    title: "Aromatherapy Massage",
    body:
      "A relaxing massage using carefully selected aromatherapy oils to calm the mind and soothe the body. Ideal if you are looking to unwind, reduce stress and enjoy a more restorative treatment experience.",
    href: "/massage-treatments/aromatherapy-massage",
  },
  {
    title: "Indian Head Massage",
    body:
      "A treatment focused on the scalp, head, neck and shoulders, helping to ease built-up tension and promote a sense of calm. This is a great option for clients who carry stress in the upper body or simply want a deeply relaxing treatment.",
    href: "/massage-treatments/indian-head-massage",
  },
  {
    title: "Heat Therapy Massage",
    body:
      "Heat therapy massage combines massage techniques with the comforting effects of warmth, helping muscles soften more easily and allowing the body to relax more deeply. This category includes several warming massage experiences.",
    href: "/massage-treatments/heat-therapy-massage",
  },
];

const heatTherapyOptions = [
  {
    title: "Aqua Massage",
    body:
      "Aqua massage offers a unique full body treatment experience while you are supported on warm water cushions. The body is comfortably aligned, making it a great option for those experiencing muscular discomfort, tension or stiffness.",
    href: "/massage-treatments/aqua-massage",
  },
  {
    title: "Hot Stone Massage",
    body:
      "Hot stone massage uses smooth heated stones to warm the muscles and enhance relaxation. The warmth helps encourage a deeply soothing experience while supporting the release of tension.",
    href: "/massage-treatments/hot-stone-massage",
  },
  {
    title: "Warm Bamboo Massage",
    body:
      "Warm bamboo massage uses heated bamboo tools alongside massage techniques to provide a deeply warming and revitalising treatment, helping to ease tension and leave the body feeling refreshed.",
    href: "/massage-treatments/warm-bamboo-massage",
  },
  {
    title: "Lomi Lomi Massage",
    body:
      "Inspired by traditional Hawaiian massage, Lomi Lomi uses flowing movements across the body to create a rhythmic, deeply nurturing treatment experience that encourages relaxation and emotional release.",
    href: "/massage-treatments/lomi-lomi-massage",
  },
].filter((option) => option.href !== "/massage-treatments/lomi-lomi-massage" || isServiceAvailable("lomi-lomi-massage"));

const benefits = [
  "Reduced muscular tension and tightness",
  "Improved relaxation",
  "Relief from everyday stress",
  "Better circulation",
  "A greater sense of balance and wellbeing",
  "Support for recovery from physical strain",
  "Time to rest and reconnect with your body",
];

export default function MassageTreatmentsPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Massage Treatments" }]} />

      <PageHero
        eyebrow="Massage Treatments"
        title="Massage Treatments in Cannock Tailored to Your Needs"
        description="At Revive Holistic Therapies, we offer a range of professional massage treatments in Cannock designed to help you relax, ease muscular tension, and support your overall wellbeing. Whether you are looking for a deeply soothing treatment, targeted work for tight muscles, or a more specialist massage experience, each session is tailored to your individual needs."
      />

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/booking" className="rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
          Book Now
        </Link>
        <Link href="/price-list" className="rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)]">
          View Price List
        </Link>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Massage therapy Cannock"
            title="Professional massage therapy for relaxation, recovery and wellbeing"
            description="Massage therapy can be an effective way to reduce tension, support recovery, improve circulation and create time for your body and mind to reset."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            At Revive Holistic Therapies, treatments are designed to offer more than just an hour of relaxation. Each appointment is personalised to help you get the most from your treatment, whether your priority is relieving muscular tightness, reducing stress, or simply taking time out to feel restored.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We welcome clients from Cannock, Hednesford and the surrounding areas who are looking for professional massage treatments in a calm, comfortable setting.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-[2.1rem] border border-[color:var(--color-border)] bg-[color:var(--color-border)] sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div key={benefit} className="bg-white px-6 py-6">
              <p className="font-semibold text-[color:var(--color-heading)]">{benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Massage Cannock"
          title="Our massage treatments"
          description="Explore our range of massage treatments available in Cannock. Whether you prefer a gentle, calming treatment or a more focused massage for areas of tension, there is an option to suit your needs."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {massageTreatments.map((treatment) => (
            <article key={treatment.title} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-3xl font-semibold text-[color:var(--color-heading)]">{treatment.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{treatment.body}</p>
              <Link
                href={treatment.href}
                className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white"
              >
                {treatment.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <SectionHeading
          eyebrow="Heat therapy massage"
          title="Heat therapy massage options"
          description="Warming massage treatments can help muscles soften more easily and support a deeper sense of physical relaxation."
        />

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {heatTherapyOptions.map((treatment) => (
            <article key={treatment.title} className="surface-card-strong rounded-[1.8rem] p-6">
              <h2 className="font-display text-3xl font-semibold text-[color:var(--color-heading)]">{treatment.title}</h2>
              <p className="mt-4 text-base leading-8 text-[color:var(--color-text-muted)]">{treatment.body}</p>
              <Link
                href={treatment.href}
                className="mt-6 inline-flex rounded-full border border-[color:var(--color-border)] bg-white px-5 py-3 font-semibold text-[color:var(--color-heading)] transition hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-accent)]"
              >
                {treatment.title}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24 grid gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Why choose Revive"
            title="Why choose Revive Holistic Therapies for massage in Cannock?"
            description="At Revive Holistic Therapies, massage treatments are never one-size-fits-all."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We take the time to understand what you want from your appointment and tailor your treatment accordingly. Whether you are booking for relaxation, support with muscular tension, or part of a longer-term wellbeing plan, you can expect a professional and personalised approach in a calm and welcoming setting.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            Clients visit us from Cannock, Hednesford and surrounding areas for treatments that combine care, experience and attention to detail.
          </p>
        </div>

        <div className="surface-card-strong rounded-[2.1rem] p-8 lg:p-10">
          <SectionHeading
            eyebrow="Massage Hednesford"
            title="Looking for massage in Cannock or Hednesford?"
            description="If you are searching for massage treatments in Cannock, Revive Holistic Therapies offers a range of tailored options to help you relax, restore and feel your best."
          />
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-text-muted)]">
            We also welcome clients from Hednesford and nearby Staffordshire areas who want professional massage therapy in a peaceful environment.
          </p>
          <p className="mt-5 text-lg leading-8 text-[color:var(--color-text-muted)]">
            From deep tissue massage and remedial massage to aromatherapy and hot stone treatments, every appointment is designed around your needs and comfort.
          </p>
        </div>
      </section>

      <section className="mt-24 rounded-[2.1rem] bg-[linear-gradient(180deg,#0D3371_0%,#061D43_100%)] px-8 py-10 text-white shadow-[0_30px_75px_-45px_rgba(15,25,28,0.6)]">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#DCE8FA]">Book your massage treatment</p>
        <h2 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-white">
          Find the right massage treatment for you
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#EEF4FD]">
          Whether you know exactly which treatment you want or need help choosing the most suitable option, we are here to help. Explore our massage treatments or book your appointment online today.
        </p>
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
          { href: "/massage-treatments/deep-tissue-massage", label: "Deep Tissue Massage" },
          { href: "/massage-treatments/remedial-massage", label: "Remedial Massage" },
          { href: "/massage-treatments/aromatherapy-massage", label: "Aromatherapy Massage" },
          { href: "/massage-treatments/indian-head-massage", label: "Indian Head Massage" },
          { href: "/massage-treatments/heat-therapy-massage", label: "Heat Therapy Massage" },
          { href: "/massage-treatments/aqua-massage", label: "Aqua Massage" },
          { href: "/massage-treatments/hot-stone-massage", label: "Hot Stone Massage" },
          { href: "/massage-treatments/warm-bamboo-massage", label: "Warm Bamboo Massage" },
          { href: "/massage-treatments/lomi-lomi-massage", label: "Lomi Lomi Massage" },
          { href: "/price-list", label: "Price List" },
          { href: "/contact", label: "Contact" },
        ]
          .filter((item) => item.href !== "/massage-treatments/lomi-lomi-massage" || isServiceAvailable("lomi-lomi-massage"))
          .map((item) => (
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
