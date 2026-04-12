import { PageHero } from "@/components/page-hero";
import { PasswordResetRequestForm } from "@/components/auth/password-reset-request-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Forgot Password | Revive Holistic Therapies",
  description: "Request a password reset link for your Revive Holistic Therapies client portal account.",
  path: "/portal/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Client portal"
        title="Reset your password securely"
        description="Request a time-limited password reset link for your portal account."
      />
      <section className="mt-14">
        <PasswordResetRequestForm />
      </section>
    </div>
  );
}
