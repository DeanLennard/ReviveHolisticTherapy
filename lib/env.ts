import "server-only";

import { z } from "zod";

const envSchema = z.object({
  MONGODB_URI: z.string().min(1, "Missing MONGODB_URI"),
  MONGODB_DB_NAME: z.string().min(1, "Missing MONGODB_DB_NAME"),
  SESSION_SECRET: z.string().min(32, "SESSION_SECRET must be at least 32 characters"),
  APP_URL: z.string().url().default("https://www.reviveholistictherapies.com"),
});

export const env = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  APP_URL: process.env.APP_URL ?? "https://www.reviveholistictherapies.com",
});
