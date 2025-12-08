import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_95oiPxTScCze@ep-young-sound-ahxvofzu-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  },
});
