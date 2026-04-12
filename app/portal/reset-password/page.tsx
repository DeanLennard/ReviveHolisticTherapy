import { PageHero } from "@/components/page-hero";
import { PasswordResetForm } from "@/components/auth/password-reset-form";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Choose New Password | Revive Holistic Therapies",
  description: "Choose a new password for your Revive Holistic Therapies portal account.",
  path: "/portal/reset-password",
});

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = searchParams ? await searchParams : {};
  const token = Array.isArray(params.token) ? params.token[0] ?? "" : params.token ?? "";

  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Client portal"
        title="Choose a new password"
        description="Enter and confirm your new password to finish the reset process."
      />
      <section className="mt-14">
        <PasswordResetForm token={token} />
      </section>
    </div>
  );
}
