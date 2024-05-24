import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { user } from "./schema";

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(sql);

const main = async () => {
  try {
    await db.insert(user).values([
      {
        username: "admin",
        hashedPassword: "admin",
        role: 0,
      },
      {
        username: "leader2",
        hashedPassword: "leader2",
        role: 1,
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
