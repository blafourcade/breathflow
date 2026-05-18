# ADR 0001 — Monorepo and stack

## Status

Accepted · 2026-05-18

## Context

BreathFlow ships a mobile app (iOS + Android), a backend API, and shared logic that has to run on both (the breath state machine, type contracts, design tokens).

## Decision

- **Monorepo** with pnpm workspaces + Turborepo.
- **Mobile**: Expo + React Native (TypeScript). Expo-router for navigation. Reanimated + Skia for the breathing visual.
- **Backend**: Next.js App Router on Vercel Fluid Compute.
- **Database**: Neon Postgres (serverless driver) via Drizzle ORM.
- **Auth**: Clerk.
- **Domain core**: `packages/breath-engine` — pure-TS, framework-free.

## Consequences

- Shared types and engine logic compile once and are imported by both apps.
- Mobile and API can deploy independently (EAS for mobile, Vercel for API).
- Drizzle keeps the schema in code; migrations are generated and committed.
- Clerk takes auth off the critical path.
- Trade-off: monorepo complexity (Metro config for workspace resolution, Turbo cache configuration). Acceptable for the speed gains.

## Alternatives considered

- **Tamagui** for cross-platform UI primitives: deferred. Tokens-first approach is simpler and avoids a heavy dependency in week one.
- **Supabase** instead of Neon + Clerk: tempting (all-in-one) but ties us harder to one vendor. Clerk's mobile SDK + Neon's serverless driver are best-of-breed for this stack.
- **Firebase**: rejected. Vendor lock, less flexible auth, dated UX patterns.
