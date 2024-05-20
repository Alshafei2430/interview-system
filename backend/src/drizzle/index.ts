import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";
import postgres from "postgres";

const sql = postgres({
  username: Bun.env.POSTGRES_USERNAME,
  password: Bun.env.POSTGRES_PASSWORD,
  database: Bun.env.POSTGRES_DATABASE_NAME,
});

export const db = drizzle(sql, {
  schema,
});
