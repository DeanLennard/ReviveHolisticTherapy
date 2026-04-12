import "server-only";

import bcrypt from "bcryptjs";
import { ObjectId } from "mongodb";
import { cache } from "react";
import { redirect } from "next/navigation";

import { getCollections } from "@/lib/collections";
import type { Role, UserDocument } from "@/lib/db-types";
import { clearSessionCookie, createSession, getSession, setSessionCookie } from "@/lib/session";

type PublicUser = Omit<UserDocument, "passwordHash"> & { _id: ObjectId };

function omitPassword(user: UserDocument & { _id: ObjectId }): PublicUser {
  const { passwordHash, ...safeUser } = user;
  void passwordHash;
  return safeUser;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}

export async function signInWithCredentials(email: string, password: string) {
  const { users } = await getCollections();
  const user = await users.findOne({ email });

  if (!user?._id) {
    return null;
  }

  const isValid = await verifyPassword(password, user.passwordHash);

  if (!isValid) {
    return null;
  }

  const token = await createSession({
    userId: user._id.toHexString(),
    email: user.email,
    role: user.role,
  });

  await setSessionCookie(token);
  await users.updateOne({ _id: user._id }, { $set: { lastLoginAt: new Date(), updatedAt: new Date() } });

  return omitPassword(user as UserDocument & { _id: ObjectId });
}

export async function signOut() {
  await clearSessionCookie();
}

export const getCurrentUser = cache(async () => {
  const session = await getSession();

  if (!session?.userId) {
    return null;
  }

  const { users } = await getCollections();
  const user = await users.findOne({ _id: new ObjectId(session.userId) });

  if (!user?._id) {
    return null;
  }

  return omitPassword(user as UserDocument & { _id: ObjectId });
});

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/portal/login");
  }

  return user;
}

export async function requireRole(roles: Role[]) {
  const user = await requireUser();

  if (!roles.includes(user.role)) {
    redirect("/portal/login");
  }

  return user;
}
