# BreathFlow — Deployment

## Backend (Vercel)

```bash
# one-time
vercel link --cwd apps/api
vercel env add DATABASE_URL              # paste Neon connection string
vercel env add CLERK_SECRET_KEY          # paste from Clerk dashboard
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# every push to main triggers a preview; promote to production with:
vercel --prod --cwd apps/api
```

The build command (set in `apps/api/vercel.json`) installs the whole workspace and builds only `@breathflow/api`.

### Database (Neon)

1. Create a Neon project at https://console.neon.tech.
2. Copy the pooled connection string.
3. Set it as `DATABASE_URL` on Vercel and locally in `.env.local`.
4. Generate + push schema:

```bash
pnpm --filter @breathflow/api db:generate
DATABASE_URL=postgres://... pnpm --filter @breathflow/api db:migrate
```

### Auth (Clerk)

1. Create a Clerk app, enable Apple + Google + email/password.
2. Add the publishable key to Vercel and to EAS env (`EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`).
3. Configure a webhook → `https://<your-api>.vercel.app/api/clerk/webhook` (provision user on signup — handler is a follow-up story E7.S2).

## Mobile (Expo + EAS Build)

```bash
# one-time
npm i -g eas-cli
eas login
cd apps/mobile
eas init                         # links to expo.dev project
eas build:configure              # writes eas.json (already present)

# preview build (iOS Simulator + Android APK)
eas build --profile preview --platform all

# production submission
eas build --profile production --platform all
eas submit --platform ios
eas submit --platform android
```

### Local dev

```bash
pnpm install
cd apps/mobile
pnpm dev          # opens Expo Dev Tools; scan QR with Expo Go
```

For the API:

```bash
cd apps/api
DATABASE_URL=... pnpm dev
```

## CI

GitHub Actions (see `.github/workflows/ci.yml`):

- `packages` — typecheck + test for `breath-engine`, `ui`, `types`.
- `api` — typecheck for `@breathflow/api`.
- `mobile` — typecheck for `@breathflow/mobile`.

## Secrets required

| Secret                          | Where    |
| ------------------------------- | -------- |
| `DATABASE_URL`                  | Vercel   |
| `CLERK_SECRET_KEY`              | Vercel   |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Vercel + EAS |
| `EXPO_PUBLIC_API_URL`           | EAS      |
| `EXPO_TOKEN`                    | GitHub Actions (for EAS triggers) |
