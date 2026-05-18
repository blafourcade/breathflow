import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  integer,
  timestamp,
  boolean,
  uuid,
  jsonb,
  primaryKey,
  pgEnum,
  index,
  uniqueIndex,
  real,
} from "drizzle-orm/pg-core";

export const visibilityEnum = pgEnum("visibility", [
  "private",
  "friends",
  "public",
]);

export const clanVisibilityEnum = pgEnum("clan_visibility", [
  "open",
  "request",
  "invite",
]);

export const friendStatusEnum = pgEnum("friend_status", [
  "pending",
  "accepted",
  "blocked",
]);

export const memberRoleEnum = pgEnum("member_role", [
  "owner",
  "admin",
  "member",
]);

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    clerkId: text("clerk_id").notNull(),
    username: text("username").notNull(),
    displayName: text("display_name").notNull(),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    uniqueIndex("users_clerk_id_idx").on(t.clerkId),
    uniqueIndex("users_username_idx").on(t.username),
  ],
);

export const patterns = pgTable(
  "patterns",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    ownerId: uuid("owner_id").references(() => users.id, { onDelete: "cascade" }),
    presetId: text("preset_id"),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description"),
    inhaleSec: real("inhale_sec").notNull(),
    holdFullSec: real("hold_full_sec").notNull(),
    exhaleSec: real("exhale_sec").notNull(),
    holdEmptySec: real("hold_empty_sec").notNull(),
    rounds: integer("rounds").notNull(),
    category: text("category").notNull(),
    visibility: visibilityEnum("visibility").default("private").notNull(),
    likes: integer("likes").default(0).notNull(),
    shareCode: text("share_code"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [
    index("patterns_owner_idx").on(t.ownerId),
    uniqueIndex("patterns_share_code_idx").on(t.shareCode),
  ],
);

export const sessions = pgTable(
  "sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    patternId: uuid("pattern_id").references(() => patterns.id, {
      onDelete: "set null",
    }),
    patternSnapshot: jsonb("pattern_snapshot").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull(),
    endedAt: timestamp("ended_at", { withTimezone: true }).notNull(),
    durationSec: integer("duration_sec").notNull(),
    completedRounds: integer("completed_rounds").notNull(),
    totalRounds: integer("total_rounds").notNull(),
    completedFully: boolean("completed_fully").notNull(),
    longestHoldSec: real("longest_hold_sec"),
    mood: integer("mood"),
    energy: integer("energy"),
    notes: text("notes"),
  },
  (t) => [
    index("sessions_user_idx").on(t.userId),
    index("sessions_user_started_idx").on(t.userId, t.startedAt),
  ],
);

export const boltMeasurements = pgTable(
  "bolt_measurements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    seconds: real("seconds").notNull(),
    recordedAt: timestamp("recorded_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    notes: text("notes"),
  },
  (t) => [index("bolt_user_recorded_idx").on(t.userId, t.recordedAt)],
);

export const friends = pgTable(
  "friends",
  {
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    friendId: uuid("friend_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    status: friendStatusEnum("status").default("pending").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.friendId] })],
);

export const clans = pgTable(
  "clans",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: text("name").notNull(),
    slug: text("slug").notNull(),
    description: text("description").notNull(),
    iconUrl: text("icon_url"),
    ownerId: uuid("owner_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    memberCount: integer("member_count").default(1).notNull(),
    visibility: clanVisibilityEnum("visibility").default("open").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [uniqueIndex("clans_slug_idx").on(t.slug)],
);

export const clanMembers = pgTable(
  "clan_members",
  {
    clanId: uuid("clan_id")
      .references(() => clans.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    role: memberRoleEnum("role").default("member").notNull(),
    joinedAt: timestamp("joined_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.clanId, t.userId] })],
);

export const patternLikes = pgTable(
  "pattern_likes",
  {
    patternId: uuid("pattern_id")
      .references(() => patterns.id, { onDelete: "cascade" })
      .notNull(),
    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (t) => [primaryKey({ columns: [t.patternId, t.userId] })],
);

export const streaks = pgTable("streaks", {
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .primaryKey(),
  current: integer("current").default(0).notNull(),
  longest: integer("longest").default(0).notNull(),
  lastSessionDay: text("last_session_day"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});
