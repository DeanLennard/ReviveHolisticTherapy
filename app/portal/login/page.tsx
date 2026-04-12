import { LoginForm } from "@/components/auth/login-form";
import { PageHero } from "@/components/page-hero";
import { getCurrentUser } from "@/lib/auth";
import { buildMetadata } from "@/lib/seo";
import { redirect } from "next/navigation";

export const metadata = buildMetadata({
  title: "Client Portal Login | Revive Holistic Therapies",
  description: "Access the client portal for bookings, profile management, and payment history.",
  path: "/portal/login",
});

export default async function PortalLoginPage() {
  const user = await getCurrentUser();

  if (user) {
    redirect(user.role === "customer" ? "/portal/account" : "/admin");
  }

  return (
    <div className="shell py-8 sm:py-10">
      <PageHero
        eyebrow="Client portal"
        title="Sign in to manage your bookings online"
        description="Returning clients can sign in to view upcoming appointments, update profile details, and review payment history in one secure place."
      />

      <section className="mt-14">
        <LoginForm />
      </section>

      <section className="mt-8">
        <div className="rounded-[2rem] bg-[linear-gradient(160deg,#1f2a2e,#2ba3ac)] p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">Portal features</p>
          <ul className="prose-list mt-5 text-white/78">
            <li>View upcoming and past bookings</li>
            <li>Cancel or reschedule within clinic rules</li>
            <li>Review payment history and receipts</li>
            <li>Manage saved profile details securely</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
