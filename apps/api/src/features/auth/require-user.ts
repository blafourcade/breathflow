import { eq } from "drizzle-orm";
import { db } from "../../shared/db/client";
import { users } from "../../shared/db/schema";
import { NotFoundError, UnauthorizedError } from "../../shared/http/index";
import { demoUserId, isAuthRequired, storageMode } from "../../shared/config/runtime";

export interface AuthenticatedUser {
  id: string;
  clerkId: string;
  username: string;
  displayName: string;
}

export async function requireUser(): Promise<AuthenticatedUser> {
  if (!isAuthRequired()) {
    return {
      id: demoUserId(),
      clerkId: "demo",
      username: "demo",
      displayName: "Demo User",
    };
  }
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  if (!userId) throw new UnauthorizedError();
  if (storageMode() === "memory") {
    return {
      id: demoUserId(),
      clerkId: userId,
      username: "demo",
      displayName: "Demo User",
    };
  }
  const row = await db.query.users.findFirst({
    where: eq(users.clerkId, userId),
  });
  if (!row) throw new NotFoundError("User not provisioned");
  return {
    id: row.id,
    clerkId: row.clerkId,
    username: row.username,
    displayName: row.displayName,
  };
}
