import type { BoltEntity, NewBolt } from "./entities";

export interface BoltRepository {
  create(input: NewBolt): Promise<BoltEntity>;
  listForUser(userId: string, limit: number): Promise<BoltEntity[]>;
}
