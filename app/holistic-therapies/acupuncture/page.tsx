import Link from "next/link";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Acupuncture in Cannock | Coming Soon | Revive Holistic Therapies",
  description: "Acupuncture is coming soon to Revive Holistic Therapies in Cannock. Register your interest today.",
  path: "/holistic-therapies/acupuncture",
  index: false,
});

export default function AcupuncturePage() {
  return (
    <div className="shell py-8 sm:py-10">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Holistic Therapies", href: "/holistic-therapies" }, { label: "Acupuncture" }]} />
      <PageHero
        eyebrow="Coming soon"
        title="Acupuncture is coming to Revive"
        description="We are preparing to introduce acupuncture to our holistic treatment offering. Details, availability and booking information will be shared once confirmed."
      />
      <Link href="/contact" className="mt-10 inline-flex rounded-full bg-[color:var(--color-accent)] px-5 py-3 font-semibold text-white">
        Register your interest
      </Link>
    </div>
  );
}
