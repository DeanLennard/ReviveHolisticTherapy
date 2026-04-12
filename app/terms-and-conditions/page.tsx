import { PolicyPageContent } from "@/components/policy-page-content";
import { getPolicyPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Terms and Conditions | Revive Holistic Therapies",
  description: "Read the terms and conditions for Revive Holistic Therapies.",
  path: "/terms-and-conditions",
});

export default async function TermsPage() {
  const page = await getPolicyPage("terms-and-conditions");

  return (
    <PolicyPageContent
      slug="terms-and-conditions"
      title={page?.title ?? "Terms & Conditions"}
      description={page?.description ?? "Read the terms and conditions for Revive Holistic Therapies."}
      content={page?.content ?? []}
    />
  );
}
