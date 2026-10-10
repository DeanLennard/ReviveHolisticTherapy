import Link from "next/link";
import { redirect } from "next/navigation";

import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Signing You In | Revive Holistic Therapies",
  description: "Use your secure email link to access your Revive Holistic Therapies portal account.",
  path: "/portal/magic-link",
});

export default async function PortalMagicLinkPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const token = Array.isArray(params.token) ? params.token[0] ?? "" : params.token ?? "";

  if (token) {
    redirect(`/api/auth/magic-link?token=${encodeURIComponent(token)}`);
  }

  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Client portal"
        title="This sign-in link is invalid or has expired"
        description="Request a fresh magic link and we will send you a new secure email if an account exists."
      />
      <section className="mt-14">
        <div className="max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <Link href="/portal/login" className="inline-flex rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white">
            Request a new link
          </Link>
        </div>
      </section>
    </div>
  );
}
