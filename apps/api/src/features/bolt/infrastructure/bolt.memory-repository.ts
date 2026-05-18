import type { BoltEntity, NewBolt } from "../domain/entities";
import type { BoltRepository } from "../domain/ports";

let counter = 0;
const bolts: BoltEntity[] = [];

export const memoryBoltRepository: BoltRepository = {
  async create(input: NewBolt): Promise<BoltEntity> {
    counter += 1;
    const row: BoltEntity = {
      id: `mem-bolt-${counter}`,
      userId: input.userId,
      seconds: input.seconds,
      recordedAt: new Date(),
      notes: input.notes,
    };
    bolts.push(row);
    return row;
  },
  async listForUser(userId, limit) {
    return bolts
      .filter((b) => b.userId === userId)
      .sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime())
      .slice(0, limit);
  },
};
