export type StorageMode = "postgres" | "memory";

export function storageMode(): StorageMode {
  if (process.env.DATABASE_URL && process.env.DATABASE_URL.length > 0) return "postgres";
  return "memory";
}

export function isAuthRequired(): boolean {
  return Boolean(
    process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  );
}

const DEMO_USER_ID = "00000000-0000-0000-0000-000000000001";

export function demoUserId(): string {
  return DEMO_USER_ID;
}
