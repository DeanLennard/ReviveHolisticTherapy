import { PolicyPageContent } from "@/components/policy-page-content";
import { getPolicyPage } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Cookie Policy | Revive Holistic Therapies",
  description: "Read the cookie policy for Revive Holistic Therapies.",
  path: "/cookie-policy",
});

export default async function CookiePolicyPage() {
  const page = await getPolicyPage("cookie-policy");

  return (
    <PolicyPageContent
      slug="cookie-policy"
      title={page?.title ?? "Cookie Policy"}
      description={page?.description ?? "Read the cookie policy for Revive Holistic Therapies."}
      content={page?.content ?? []}
    />
  );
}
