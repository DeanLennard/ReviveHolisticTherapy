import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Password Access Retired | Revive Holistic Therapies",
  description: "Password-based portal access has been replaced with secure magic links.",
  path: "/portal/reset-password",
});

export default function ResetPasswordPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Client portal"
        title="Password sign-in is no longer used"
        description="Portal accounts now use secure magic links sent by email. Request a fresh sign-in link to access your account."
      />
      <section className="mt-14">
        <div className="max-w-xl rounded-[2rem] border border-[color:var(--color-border)] bg-white p-8 shadow-[var(--shadow-soft)]">
          <p className="text-[color:var(--color-text-muted)]">
            If you need to access your account, request a new sign-in link and use the email we send you.
          </p>
          <Link href="/portal/login" className="mt-6 inline-flex rounded-full bg-[color:var(--color-accent)] px-6 py-3 font-semibold text-white">
            Request sign-in link
          </Link>
        </div>
      </section>
    </div>
  );
}
