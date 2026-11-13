import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

/**
 * Neon's HTTP driver in production. For a plain local Postgres
 * (DATABASE_DRIVER=pg) we fall back to node-postgres.
 */
function create() {
  if (process.env.DATABASE_DRIVER === "pg") {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { Pool } = require("pg") as typeof import("pg");
    return drizzlePg(new Pool({ connectionString: url }), { schema });
  }
  return drizzleNeon(neon(url!), { schema });
}

export const db = create() as unknown as ReturnType<typeof drizzleNeon<typeof schema>>;
export { schema };
