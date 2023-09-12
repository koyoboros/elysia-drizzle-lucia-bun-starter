import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const user_key = sqliteTable("user_key", {
  id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	hashedPassword: text("hashed_password")
});

export type UserKey = typeof user_key.$inferSelect; // return type when queried
export type InsertUserKey = typeof user_key.$inferInsert; // insert type