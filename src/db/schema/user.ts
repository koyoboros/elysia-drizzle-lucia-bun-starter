import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  fullName: text("full_name").notNull(),
  phone: text("phone")
});

export type User = typeof user.$inferSelect; // return type when queried
export type InsertUser = typeof user.$inferInsert; // insert type