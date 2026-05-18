import type { BoltEntity, NewBolt } from "./entities.js";

export interface BoltRepository {
  create(input: NewBolt): Promise<BoltEntity>;
  listForUser(userId: string, limit: number): Promise<BoltEntity[]>;
}
