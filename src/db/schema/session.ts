import { sqliteTable, text, blob } from "drizzle-orm/sqlite-core";
import { user } from "./user";

export const user_session = sqliteTable("user_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	activeExpires: blob("active_expires", {
		mode: "bigint"
	}).notNull(),
	idleExpires: blob("idle_expires", {
		mode: "bigint"
	}).notNull()
});

export type UserSession = typeof user_session.$inferSelect; // return type when queried
export type InsertUserSession = typeof user_session.$inferInsert; // insert type