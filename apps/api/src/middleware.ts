import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtected = createRouteMatcher([
  "/api/sessions(.*)",
  "/api/dashboard(.*)",
  "/api/patterns(.*)",
  "/api/bolt(.*)",
  "/api/friends(.*)",
  "/api/clans(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtected(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
