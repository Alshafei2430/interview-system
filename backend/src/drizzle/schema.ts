import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  smallint,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username").notNull().unique(),
  hashedPassword: varchar("hashed_password").notNull().unique(),
  role: smallint("role").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
