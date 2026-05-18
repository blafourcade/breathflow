import { z } from "zod";
import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import {
  listFriendsUseCase,
  sendFriendRequestUseCase,
} from "../application/use-cases";
import { getFriendRepository, getUserDirectory } from "../infrastructure/index";

const Body = z.object({ username: z.string().min(2).max(40) });

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return listFriendsUseCase(getFriendRepository())(user.id);
  });
}

export function POST(req: Request) {
  return handle(async () => {
    const user = await requireUser();
    const body = Body.parse(await req.json());
    return sendFriendRequestUseCase({
      friends: getFriendRepository(),
      users: getUserDirectory(),
    })(user.id, body.username);
  });
}
