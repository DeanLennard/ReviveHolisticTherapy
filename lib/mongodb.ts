import "server-only";

import { MongoClient } from "mongodb";
import type { Db } from "mongodb";

import { env } from "@/lib/env";

declare global {
  var __reviveMongoClient: MongoClient | undefined;
  var __reviveMongoClientPromise: Promise<MongoClient> | undefined;
  var __reviveMongoDatabasePromise: Promise<Db> | undefined;
}

function createMongoClient() {
  return new MongoClient(env.MONGODB_URI, {
    maxPoolSize: 10,
    minPoolSize: 1,
  });
}

function getClientPromise() {
  if (global.__reviveMongoClientPromise) {
    return global.__reviveMongoClientPromise;
  }

  const client = global.__reviveMongoClient ?? createMongoClient();
  global.__reviveMongoClient = client;
  global.__reviveMongoClientPromise = client.connect();

  return global.__reviveMongoClientPromise;
}

export function getDatabase() {
  if (global.__reviveMongoDatabasePromise) {
    return global.__reviveMongoDatabasePromise;
  }

  global.__reviveMongoDatabasePromise = getClientPromise().then((connectedClient) => connectedClient.db(env.MONGODB_DB_NAME));

  return global.__reviveMongoDatabasePromise;
}
