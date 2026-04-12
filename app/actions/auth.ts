"use server";

import crypto from "node:crypto";

import { redirect } from "next/navigation";

import { getCollections } from "@/lib/collections";
import { writeAuditLog } from "@/lib/audit-log";
import { hashPassword, signInWithCredentials, signOut } from "@/lib/auth";
import { sendPasswordResetEmail } from "@/lib/mailer";
import { passwordResetRequestSchema, passwordResetSchema, signupSchema } from "@/lib/validators";

export type AuthActionState = {
  message?: string;
  errors?: Record<string, string[] | undefined>;
};

export async function loginAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  const user = await signInWithCredentials(email, password);

  if (!user) {
    await writeAuditLog({
      action: "auth.login_failed",
      actorEmail: email,
      metadata: { reason: "invalid_credentials" },
    });
    return {
      message: "Incorrect email or password.",
    };
  }

  await writeAuditLog({
    action: "auth.login_success",
    actorUserId: user._id,
    actorEmail: user.email,
  });

  if (user.role === "super_admin" || user.role === "admin" || user.role === "content_editor" || user.role === "bookings_manager") {
    redirect("/admin");
  }

  redirect("/portal/account");
}

export async function signupAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const validated = signupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    password: formData.get("password"),
    marketingConsent: formData.get("marketingConsent") === "on",
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const { users } = await getCollections();
  const existing = await users.findOne({ email: validated.data.email });

  if (existing) {
    return {
      message: "An account with this email already exists.",
    };
  }

  await users.insertOne({
    firstName: validated.data.firstName,
    lastName: validated.data.lastName,
    email: validated.data.email,
    phone: validated.data.phone,
    passwordHash: await hashPassword(validated.data.password),
    role: "customer",
    marketingConsent: validated.data.marketingConsent,
    createdAt: new Date(),
    updatedAt: new Date(),
    lastLoginAt: null,
  });

  const created = await users.findOne({ email: validated.data.email });

  if (created?._id) {
    await writeAuditLog({
      action: "auth.signup_success",
      actorUserId: created._id,
      actorEmail: created.email,
      targetCollection: "users",
      targetId: created._id.toHexString(),
    });
  }

  const user = await signInWithCredentials(validated.data.email, validated.data.password);

  if (!user) {
    return {
      message: "Your account was created, but automatic sign-in failed.",
    };
  }

  redirect("/portal/account");
}

export async function logoutAction() {
  await signOut();
  redirect("/portal/login");
}

export async function requestPasswordResetAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const validated = passwordResetRequestSchema.safeParse({
    email: String(formData.get("email") ?? ""),
  });

  if (!validated.success) {
    return {
      message: "Enter a valid email address.",
    };
  }

  const { users, passwordResetTokens } = await getCollections();
  const user = await users.findOne({ email: validated.data.email });

  if (user?._id) {
    const rawToken = crypto.randomBytes(24).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60);

    await passwordResetTokens.insertOne({
      userId: user._id,
      email: user.email,
      tokenHash,
      expiresAt,
      usedAt: null,
      createdAt: new Date(),
    });

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const resetUrl = `${appUrl}/portal/reset-password?token=${rawToken}`;
    await sendPasswordResetEmail({
      recipientEmail: user.email,
      resetUrl,
    });

    await writeAuditLog({
      action: "auth.password_reset_requested",
      actorUserId: user._id,
      actorEmail: user.email,
      targetCollection: "passwordResetTokens",
      metadata: { expiresAt: expiresAt.toISOString() },
    });
  }

  return {
    message: "If an account exists for that email, a password reset link has been sent.",
  };
}

export async function resetPasswordAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const validated = passwordResetSchema.safeParse({
    token: String(formData.get("token") ?? ""),
    password: String(formData.get("password") ?? ""),
    confirmPassword: String(formData.get("confirmPassword") ?? ""),
  });

  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: "Please correct the highlighted fields.",
    };
  }

  const tokenHash = crypto.createHash("sha256").update(validated.data.token).digest("hex");
  const { passwordResetTokens, users } = await getCollections();
  const token = await passwordResetTokens.findOne({
    tokenHash,
    usedAt: null,
    expiresAt: { $gt: new Date() },
  });

  if (!token?._id) {
    return {
      message: "This reset link is invalid or has expired.",
    };
  }

  const passwordHash = await hashPassword(validated.data.password);
  await users.updateOne(
    { _id: token.userId },
    {
      $set: {
        passwordHash,
        updatedAt: new Date(),
      },
    },
  );

  await passwordResetTokens.updateOne(
    { _id: token._id },
    {
      $set: {
        usedAt: new Date(),
      },
    },
  );

  await writeAuditLog({
    action: "auth.password_reset_completed",
    actorUserId: token.userId,
    actorEmail: token.email,
    targetCollection: "users",
    targetId: token.userId.toHexString(),
  });

  return {
    message: "Your password has been reset. You can now sign in.",
  };
}
