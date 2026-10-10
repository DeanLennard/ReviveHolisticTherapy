import { NextResponse } from "next/server";

import { writeAuditLog } from "@/lib/audit-log";
import { consumeMagicLinkToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

function invalidLinkResponse(request: Request) {
  return NextResponse.redirect(new URL("/portal/magic-link", request.url));
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token") ?? "";

  // Magic links use a 24-byte token encoded as hexadecimal. Reject malformed
  // requests before querying the database.
  if (!/^[a-f0-9]{48}$/i.test(token)) {
    return invalidLinkResponse(request);
  }

  const user = await consumeMagicLinkToken(token);

  if (!user) {
    return invalidLinkResponse(request);
  }

  await writeAuditLog({
    action: "auth.magic_link_consumed",
    actorUserId: user._id,
    actorEmail: user.email,
  }).catch(() => undefined);

  return NextResponse.redirect(new URL(user.role === "customer" ? "/portal/account" : "/admin", request.url));
}
