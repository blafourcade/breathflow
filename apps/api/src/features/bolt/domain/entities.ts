export interface BoltEntity {
  id: string;
  userId: string;
  seconds: number;
  recordedAt: Date;
  notes: string | null;
}

export interface NewBolt {
  userId: string;
  seconds: number;
  notes: string | null;
}
