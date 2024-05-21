import { user } from "./schema";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

console.log(".env", process.env.DATABASE_URL);

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(sql);

const main = async () => {
  try {
    await db.insert(user).values([
      {
        username: "shafei",
        hashedPassword: "password",
        role: "leader",
      },
      {
        username: "shafei2",
        hashedPassword: "password2",
        role: "secretary",
      },
    ]);

    console.log("Seeding successful");
    await sql.end();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
