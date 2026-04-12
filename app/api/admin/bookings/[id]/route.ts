import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

import { requireApiRole } from "@/lib/api-auth";
import { getCollections } from "@/lib/collections";

const roles = ["super_admin", "admin", "bookings_manager"] as const;

export async function PATCH(request: Request, props: { params: Promise<{ id: string }> }) {
  const auth = await requireApiRole([...roles]);

  if (!auth.ok) {
    return auth.response;
  }

  const { id } = await props.params;
  const body = await request.json();
  const { bookings } = await getCollections();

  await bookings.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...body,
        updatedAt: new Date(),
      },
    },
  );

  return NextResponse.json({ ok: true });
}
