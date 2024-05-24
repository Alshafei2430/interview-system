import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
  smallint,
  pgEnum,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: varchar("username").notNull().unique(),
  hashedPassword: varchar("hashed_password").notNull().unique(),
  role: smallint("role").notNull(),
  leaderId: uuid("leader"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const usersRelations = relations(user, ({ one, many }) => ({
  secretary: one(user, {
    fields: [user.leaderId],
    references: [user.id],
  }),
  appointments: many(appointments),
}));

export const statusEnum = pgEnum("status", [
  "accept",
  "reject",
  "suspend",
  "default",
]);

export const appointments = pgTable("appointments", {
  id: uuid("id").primaryKey().defaultRandom(),
  guestName: varchar("guest_name").notNull(),
  arriveDate: timestamp("arrive_date").defaultNow(),
  enterDate: timestamp("enter_date"),
  status: statusEnum("status").default("default"),
  leaderId: uuid("leader_id").notNull(),
  secretaryId: uuid("secretary_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const appointmentsRelations = relations(appointments, ({ one }) => ({
  leaderSecretaryAppointments: one(user, {
    fields: [appointments.leaderId, appointments.secretaryId],
    references: [user.id, user.id],
  }),
}));
