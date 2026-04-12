import "server-only";

import type { ObjectId } from "mongodb";

import { getCollections } from "@/lib/collections";

type AuditInput = {
  action: string;
  actorUserId?: ObjectId | null;
  actorEmail?: string | null;
  targetCollection?: string | null;
  targetId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function writeAuditLog(input: AuditInput) {
  const { auditLogs } = await getCollections();

  await auditLogs.insertOne({
    action: input.action,
    actorUserId: input.actorUserId ?? null,
    actorEmail: input.actorEmail ?? null,
    targetCollection: input.targetCollection ?? null,
    targetId: input.targetId ?? null,
    metadata: input.metadata ?? {},
    createdAt: new Date(),
  });
}
