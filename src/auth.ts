import { lucia } from 'lucia';
import { sqliteDB } from './db/';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { elysia } from 'lucia/middleware';

export const auth = lucia({
  adapter: libsql(sqliteDB, {
    user: 'user',
    key: 'user_key',
    session: 'user_session'
  }),
  env: 'DEV',
  middleware: elysia()
});
