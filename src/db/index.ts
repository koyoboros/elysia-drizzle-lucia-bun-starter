import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { user, InsertUser } from "./schema/user";

export const sqliteDB = createClient({url:"file:example.db"});
export const db: LibSQLDatabase = drizzle(sqliteDB);

export const readUsers = () => {
  return db.select().from(user).all();
};

export const insertUser = (newUser: InsertUser) => {
  return db.insert(user).values(newUser).run();
};