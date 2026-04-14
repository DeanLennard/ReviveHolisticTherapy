import { PageHero } from "@/components/page-hero";
import { PasswordResetRequestForm } from "@/components/auth/password-reset-request-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Email Login Link | Revive Holistic Therapies",
  description: "Request a secure sign-in link for your Revive Holistic Therapies client portal account.",
  path: "/portal/forgot-password",
});

export default function ForgotPasswordPage() {
  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Client portal"
        title="Request a secure sign-in link"
        description="Password access has been replaced with magic links. Enter your email address and we will send you a secure sign-in link if an account exists."
      />
      <section className="mt-14">
        <PasswordResetRequestForm />
      </section>
    </div>
  );
}
