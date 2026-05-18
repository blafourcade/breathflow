import { z } from "zod";
import { handle } from "../../../shared/http/index.js";
import { requireUser } from "../../auth/require-user.js";
import {
  listFriendsUseCase,
  sendFriendRequestUseCase,
} from "../application/use-cases.js";
import {
  friendRepository,
  userDirectory,
} from "../infrastructure/friend.repository.js";

const list = listFriendsUseCase(friendRepository);
const send = sendFriendRequestUseCase({
  friends: friendRepository,
  users: userDirectory,
});

const Body = z.object({ username: z.string().min(2).max(40) });

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return list(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    return send(user.id, body.username);
  });
}
