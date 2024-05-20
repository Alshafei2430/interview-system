import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL as string, { max: 1 });

const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/drizzle/migrations",
    });

    console.log("Migration successful");
    await sql.end();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();
