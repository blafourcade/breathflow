import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { db } from "../../shared/db/client";
import { users } from "../../shared/db/schema";
import { NotFoundError, UnauthorizedError } from "../../shared/http/index";

export interface AuthenticatedUser {
  id: string;
  clerkId: string;
  username: string;
  displayName: string;
}

export async function requireUser(): Promise<AuthenticatedUser> {
  const { userId } = await auth();
  if (!userId) throw new UnauthorizedError();
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
