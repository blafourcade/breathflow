export type Visibility = "private" | "friends" | "public";

export interface PatternEntity {
  id: string;
  ownerId: string | null;
  presetId: string | null;
  name: string;
  slug: string;
  description: string | null;
  inhaleSec: number;
  holdFullSec: number;
  exhaleSec: number;
  holdEmptySec: number;
  rounds: number;
  category: string;
  visibility: Visibility;
  likes: number;
  shareCode: string | null;
  createdAt: Date;
}

export interface NewPattern {
  ownerId: string;
  name: string;
  slug: string;
  description: string | null;
  inhaleSec: number;
  holdFullSec: number;
  exhaleSec: number;
  holdEmptySec: number;
  rounds: number;
  category: string;
  visibility: Visibility;
}
