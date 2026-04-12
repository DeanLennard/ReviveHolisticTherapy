import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api-auth";
import { getCollections } from "@/lib/collections";

const roles = ["super_admin", "admin", "content_editor"] as const;

export async function GET() {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { settings } = await getCollections();
  const item = await settings.findOne({}, { sort: { updatedAt: -1 } });
  return NextResponse.json({ settings: item });
}

export async function PATCH(request: Request) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const body = await request.json();
  const { settings } = await getCollections();

  await settings.updateOne({}, { $set: { ...body, updatedAt: new Date() } }, { upsert: true });
  const item = await settings.findOne({}, { sort: { updatedAt: -1 } });
  return NextResponse.json({ settings: item });
}
