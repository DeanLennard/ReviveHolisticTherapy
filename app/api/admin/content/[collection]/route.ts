import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api-auth";
import { getCollections } from "@/lib/collections";

const roles = ["super_admin", "admin", "content_editor"] as const;
const allowedCollections = new Set(["services", "heroSlides", "faqs", "testimonials"]);

export async function GET(_request: Request, props: { params: Promise<{ collection: string }> }) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { collection } = await props.params;

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const collections = await getCollections();
  const target = collections[collection as keyof typeof collections];
  const items = await target.find({}).toArray();
  return NextResponse.json({ items });
}

export async function POST(request: Request, props: { params: Promise<{ collection: string }> }) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { collection } = await props.params;

  if (!allowedCollections.has(collection)) {
    return NextResponse.json({ error: "Unknown collection" }, { status: 404 });
  }

  const body = await request.json();
  const collections = await getCollections();
  const target = collections[collection as keyof typeof collections];
  const now = new Date();
  const result = await target.insertOne({ ...body, createdAt: now, updatedAt: now });

  return NextResponse.json({ id: result.insertedId.toHexString() }, { status: 201 });
}
