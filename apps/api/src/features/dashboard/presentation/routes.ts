import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { getDashboardUseCase } from "../application/get-dashboard";
import { getDashboardRepository } from "../infrastructure/index";

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return getDashboardUseCase(getDashboardRepository())(user.id);
  });
}
