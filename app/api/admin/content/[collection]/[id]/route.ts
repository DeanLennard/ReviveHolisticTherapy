import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api-auth";
import { getCollections } from "@/lib/collections";

const roles = ["super_admin", "admin", "content_editor"] as const;
const allowedCollections = new Set(["services", "heroSlides", "faqs", "testimonials"]);

export async function GET(_request: Request, props: { params: Promise<{ collection: string; id: string }> }) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { collection, id } = await props.params;

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const collections = await getCollections();
  const target = collections[collection as keyof typeof collections];
  const item = await target.findOne({ _id: new ObjectId(id) });
  return NextResponse.json({ item });
}

export async function PATCH(request: Request, props: { params: Promise<{ collection: string; id: string }> }) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { collection, id } = await props.params;

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const body = await request.json();
  const collections = await getCollections();
  const target = collections[collection as keyof typeof collections];

  await target.updateOne({ _id: new ObjectId(id) }, { $set: { ...body, updatedAt: new Date() } });
  const item = await target.findOne({ _id: new ObjectId(id) });

  return NextResponse.json({ item });
}

export async function DELETE(_request: Request, props: { params: Promise<{ collection: string; id: string }> }) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { collection, id } = await props.params;

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const collections = await getCollections();
  const target = collections[collection as keyof typeof collections];

  await target.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ ok: true });
}
