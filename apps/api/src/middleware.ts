import { NextResponse, type NextRequest } from "next/server";

const HAS_CLERK = Boolean(
  process.env.CLERK_SECRET_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);

async function clerkMw(req: NextRequest) {
  const { clerkMiddleware, createRouteMatcher } = await import(
    "@clerk/nextjs/server"
  );
  const isProtected = createRouteMatcher([
    "/api/sessions(.*)",
    "/api/dashboard(.*)",
    "/api/patterns(.*)",
    "/api/bolt(.*)",
    "/api/friends(.*)",
    "/api/clans(.*)",
  ]);
  return clerkMiddleware(async (auth, request) => {
    if (isProtected(request)) await auth.protect();
  })(req, { waitUntil: () => undefined } as never);
}

export default function middleware(req: NextRequest) {
  if (!HAS_CLERK) return NextResponse.next();
  return clerkMw(req);
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
