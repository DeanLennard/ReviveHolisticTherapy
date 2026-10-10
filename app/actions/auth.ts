"use server";

import crypto from "node:crypto";

import { redirect } from "next/navigation";

import { getCollections } from "@/lib/collections";
import { writeAuditLog } from "@/lib/audit-log";
import { signOut } from "@/lib/auth";
import { getSiteSettings } from "@/lib/content";
import { sendMagicLinkEmail } from "@/lib/mailer";
import { magicLinkRequestSchema } from "@/lib/validators";

export type AuthActionState = {
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function loginAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const validated = magicLinkRequestSchema.safeParse({
    email: String(formData.get("email") ?? ""),
  });

  if (!validated.success) {
    return {
      message: "Enter a valid email address.",
    };
  }

  const { users, passwordResetTokens } = await getCollections();
  const user = await users.findOne({ email: validated.data.email });
  const settings = await getSiteSettings();

  if (user?._id) {
    const rawToken = crypto.randomBytes(24).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);
    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const magicUrl = `${appUrl}/api/auth/magic-link?token=${rawToken}`;

    await passwordResetTokens.insertOne({
      userId: user._id,
      email: user.email,
      tokenHash,
      purpose: "magic-link",
      expiresAt,
      usedAt: null,
      createdAt: new Date(),
    });

    await sendMagicLinkEmail({
      recipientEmail: user.email,
      magicUrl,
    }, settings);

    await writeAuditLog({
      action: "auth.magic_link_requested",
      actorUserId: user._id,
      actorEmail: user.email,
      targetCollection: "passwordResetTokens",
      metadata: { expiresAt: expiresAt.toISOString() },
    });
  }

  return {
    message: "If an account exists for that email, a secure sign-in link has been sent.",
  };
}

export async function logoutAction() {
  await signOut();
  redirect("/portal/login");
}

export async function requestPasswordResetAction(state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  return loginAction(state, formData);
}

export async function resetPasswordAction(): Promise<AuthActionState> {
  return {
    message: "Password sign-in is no longer used. Request a magic link instead.",
  };
}
