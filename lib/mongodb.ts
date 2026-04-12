import "server-only";

import { MongoClient } from "mongodb";

import { env } from "@/lib/env";

declare global {
  var __reviveMongoClientPromise: Promise<MongoClient> | undefined;
}

const client = new MongoClient(env.MONGODB_URI);

const clientPromise = global.__reviveMongoClientPromise ?? client.connect();

if (process.env.NODE_ENV !== "production") {
  global.__reviveMongoClientPromise = clientPromise;
}

export async function getDatabase() {
  const connectedClient = await clientPromise;
  return connectedClient.db(env.MONGODB_DB_NAME);
}
