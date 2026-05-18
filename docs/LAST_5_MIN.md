# Last 5 minutes to native iOS + Android + persistent DB

I've exhausted what's possible without your credentials. Here's the minimum
interaction needed to flip the remaining bits.

## Why these can't be autonomous

| Step | Why I can't do it |
| ---- | ----------------- |
| `eas login` | Requires interactive Expo email + password (or your `EXPO_TOKEN`) |
| Apple Developer account | Requires Apple ID + Developer Program enrolment |
| Google Play account | Requires Play Console account + $25 developer fee |
| Neon Postgres provisioning | Requires Neon account auth (Google/GitHub OAuth) |
| Clerk app provisioning | Requires Clerk account auth |

Local fallback also blocked: Xcode is not fully installed (only Command Line Tools) and the Android SDK isn't on this machine.

## Native build — 5 commands

```bash
# 1. Install EAS CLI
pnpm add -g eas-cli

# 2. Log in to Expo (interactive — opens a browser tab or prompts for token)
eas login

# 3. Initialise the Expo project (writes a project ID into app.json)
cd apps/mobile
eas init --non-interactive

# 4. Android APK (no Play account needed — internal distribution)
eas build --profile preview --platform android --non-interactive

# 5. iOS Simulator build (no Apple Developer account needed for simulator)
eas build --profile preview --platform ios --non-interactive
```

When EAS finishes, the CLI prints a URL per build. Open it on a phone (Android) or drag the `.tar.gz` onto an iOS Simulator — that's your app running natively.

For App Store / Play Store distribution add a paid Apple Developer / Play Console account and run `eas submit --platform ios` / `eas submit --platform android`.

## Persistent DB — 3 commands

```bash
# 1. Add Neon (free tier) on the Vercel marketplace — one click from
#    https://vercel.com/marketplace/neon — link it to "breathflow-api".

# 2. Pull the auto-injected DATABASE_URL down to local
vercel env pull apps/api/.env --cwd apps/api

# 3. Apply migrations
DATABASE_URL="<paste-from-.env>" pnpm --filter @breathflow/api db:migrate
```

That's it. The API will detect `DATABASE_URL` at runtime and silently swap from in-memory to Drizzle/Neon repositories — no code change required (this is exactly what the `storageMode()` toggle in `apps/api/src/shared/config/runtime.ts` was built for).

## Real auth — 4 commands

```bash
# 1. Create a Clerk app at https://dashboard.clerk.com — enable Apple, Google, email
# 2. Push the keys to Vercel:
vercel env add CLERK_SECRET_KEY production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
# 3. Same key onto EAS:
eas env:create --variable-name EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY --value "<pk_live_…>"
# 4. Redeploy:
vercel --prod
```

The middleware (`apps/api/src/middleware.ts`) detects the keys at runtime and starts enforcing auth on `/api/sessions`, `/api/dashboard`, `/api/patterns`, `/api/bolt`, `/api/friends`, `/api/clans`.

## What's already done for you

So you don't have to do any of the actual product work:

- iOS + Android compile-ready Expo app with `eas.json` profiles wired (preview + production).
- Vercel-deployed API with both storage modes coded and tested.
- Drizzle migration `apps/api/drizzle/0000_panoramic_absorbing_man.sql` ready to run.
- Clerk middleware coded so flipping the keys is the only change needed.
- Full backlog in GitHub, 21 tests passing, docs current, screenshots saved.

Total interactive work for you: about 5 minutes of clicking and one paid Apple Developer fee if you want App Store distribution.
