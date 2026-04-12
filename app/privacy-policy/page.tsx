import { PolicyPageContent } from "@/components/policy-page-content";
import { getPolicyPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Privacy Policy | Revive Holistic Therapies",
  description: "Read the privacy policy for Revive Holistic Therapies.",
  path: "/privacy-policy",
});

export default async function PrivacyPolicyPage() {
  const page = await getPolicyPage("privacy-policy");

  return (
    <PolicyPageContent
      slug="privacy-policy"
      title={page?.title ?? "Privacy Policy"}
      description={page?.description ?? "Read the privacy policy for Revive Holistic Therapies."}
      content={page?.content ?? []}
    />
  );
}
