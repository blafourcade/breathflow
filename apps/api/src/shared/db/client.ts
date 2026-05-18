import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

type DBType = NeonHttpDatabase<typeof schema>;

let _sql: NeonQueryFunction<false, false> | null = null;
let _db: DBType | null = null;

function init(): { sql: NeonQueryFunction<false, false>; db: DBType } {
  if (_sql && _db) return { sql: _sql, db: _db };
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is required at runtime. Set it in Vercel env or your local .env.",
    );
  }
  _sql = neon(url);
  _db = drizzle(_sql, { schema });
  return { sql: _sql, db: _db };
}

export const sql = new Proxy({} as NeonQueryFunction<false, false>, {
  get(_t, prop) {
    return Reflect.get(init().sql as object, prop);
  },
  apply(_t, _self, args) {
    return (init().sql as unknown as (...a: unknown[]) => unknown).apply(
      init().sql,
      args as unknown[],
    );
  },
}) as unknown as NeonQueryFunction<false, false>;

export const db = new Proxy({} as DBType, {
  get(_t, prop) {
    return Reflect.get(init().db as object, prop);
  },
}) as DBType;

export type DB = typeof db;
