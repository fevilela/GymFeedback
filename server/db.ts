import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";

const connectionString =
  "postgresql://neondb_owner:npg_95oiPxTScCze@ep-young-sound-ahxvofzu-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require";

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });
