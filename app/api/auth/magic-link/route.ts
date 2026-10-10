import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { consumeMagicLinkToken } from "@/lib/auth";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

function redirectTo(path: string) {
  return NextResponse.redirect(new URL(path, env.APP_URL));
}

function invalidLinkResponse() {
  return redirectTo("/portal/magic-link");
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";

  // Magic links use a 24-byte token encoded as hexadecimal. Reject malformed
  // requests before querying the database.
  if (!/^[a-f0-9]{48}$/i.test(token)) {
    return invalidLinkResponse();
  }

  const user = await consumeMagicLinkToken(token);

  if (!user) {
    return invalidLinkResponse();
  }

  await writeAuditLog({
    action: "auth.magic_link_consumed",
    actorUserId: user._id,
    actorEmail: user.email,
  }).catch(() => undefined);

  return redirectTo(user.role === "customer" ? "/portal/account" : "/admin");
}
