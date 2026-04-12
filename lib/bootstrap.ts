import "server-only";

import { ObjectId } from "mongodb";
import type { Collection, Document } from "mongodb";

import { getCollections } from "@/lib/collections";
import { hashPassword } from "@/lib/auth";
import {
  buildSeedAdmin,
  buildSeedAvailability,
  buildSeedFaqs,
  buildSeedPolicyPages,
  buildSeedServices,
  buildSeedSettings,
  buildSeedSlides,
  buildSeedTestimonials,
} from "@/lib/seed-data";

let bootstrapped = false;

async function dedupeCollection<TSchema extends Document>(collection: Collection<TSchema>, fields: string[]) {
  const duplicates = await collection
    .aggregate([
      {
        $group: {
          _id: fields.reduce<Record<string, string>>((accumulator, field) => {
            accumulator[field] = `$${field}`;
            return accumulator;
          }, {}),
          ids: { $push: "$_id" },
          count: { $sum: 1 },
        },
      },
      {
        $match: {
          count: { $gt: 1 },
        },
      },
    ])
    .toArray();

  for (const duplicate of duplicates) {
    const [, ...extraIds] = duplicate.ids as ObjectId[];

    if (extraIds.length) {
      await (collection as unknown as Collection<Document>).deleteMany({
        _id: { $in: extraIds },
      });
    }
  }
}

export async function ensureDatabaseSeeded() {
  if (bootstrapped) {
    return;
  }

  const { users, services, heroSlides, testimonials, faqs, settings, availability, policyPages, passwordResetTokens, auditLogs, payments } = await getCollections();

  await dedupeCollection(services, ["slug"]);
  await dedupeCollection(heroSlides, ["displayOrder"]);
  await dedupeCollection(testimonials, ["customerName", "source", "displayOrder"]);
  await dedupeCollection(faqs, ["question"]);
  await dedupeCollection(users, ["email"]);
  await dedupeCollection(settings, ["siteName"]);
  await dedupeCollection(availability, ["practitionerName", "dayOfWeek", "startTime", "endTime"]);
  await dedupeCollection(policyPages, ["slug"]);

  await Promise.all([
    services.createIndex({ slug: 1 }, { unique: true }),
    heroSlides.createIndex({ displayOrder: 1 }, { unique: true }),
    testimonials.createIndex({ customerName: 1, source: 1, displayOrder: 1 }, { unique: true }),
    faqs.createIndex({ question: 1 }, { unique: true }),
    users.createIndex({ email: 1 }, { unique: true }),
    settings.createIndex({ siteName: 1 }, { unique: true }),
    availability.createIndex({ practitionerName: 1, dayOfWeek: 1, startTime: 1, endTime: 1 }, { unique: true }),
    policyPages.createIndex({ slug: 1 }, { unique: true }),
    passwordResetTokens.createIndex({ expiresAt: 1 }, { expireAfterSeconds: 0 }),
    passwordResetTokens.createIndex({ tokenHash: 1 }, { unique: true }),
    auditLogs.createIndex({ createdAt: -1 }),
    payments.createIndex({ bookingId: 1, createdAt: -1 }),
    payments.createIndex({ userId: 1, createdAt: -1 }),
    payments.createIndex({ receiptNumber: 1 }, { unique: true }),
  ]);

  if ((await services.estimatedDocumentCount()) === 0) {
    await services.insertMany(buildSeedServices());
  }

  if ((await heroSlides.estimatedDocumentCount()) === 0) {
    await heroSlides.insertMany(buildSeedSlides());
  }

  if ((await testimonials.estimatedDocumentCount()) === 0) {
    await testimonials.insertMany(buildSeedTestimonials());
  }

  if ((await faqs.estimatedDocumentCount()) === 0) {
    await faqs.insertMany(buildSeedFaqs());
  }

  if ((await policyPages.estimatedDocumentCount()) === 0) {
    await policyPages.insertMany(buildSeedPolicyPages());
  }

  const seededSettings = buildSeedSettings();
  await settings.updateOne(
    { siteName: seededSettings.siteName },
    {
      $setOnInsert: seededSettings,
    },
    { upsert: true },
  );

  const passwordHash = await hashPassword("ChangeMe123!");
  const adminUser = buildSeedAdmin(passwordHash);
  await users.updateOne(
    { email: adminUser.email },
    {
      $setOnInsert: adminUser,
    },
    { upsert: true },
  );

  if ((await availability.estimatedDocumentCount()) === 0) {
    await availability.insertMany(buildSeedAvailability());
  }

  bootstrapped = true;
}
