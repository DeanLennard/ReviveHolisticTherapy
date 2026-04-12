import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const sessionCookie = "revive_session";
const protectedPortalPaths = ["/portal/account"];
const adminPaths = ["/admin"];

async function getSessionPayload(request: NextRequest) {
  const token = request.cookies.get(sessionCookie)?.value;

  if (!token || !process.env.SESSION_SECRET) {
    return null;
  }

  try {
    const secret = new TextEncoder().encode(process.env.SESSION_SECRET);
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    return payload as { role?: string };
  } catch {
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = await getSessionPayload(request);

  if (protectedPortalPaths.some((path) => pathname.startsWith(path)) && !session) {
    return NextResponse.redirect(new URL("/portal/login", request.url));
  }

  if (adminPaths.some((path) => pathname.startsWith(path))) {
    const allowedRoles = new Set(["super_admin", "admin", "content_editor", "bookings_manager"]);

    if (!session?.role || !allowedRoles.has(session.role)) {
      return NextResponse.redirect(new URL("/portal/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/portal/account/:path*"],
};
