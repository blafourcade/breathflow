import { handle } from "../../../shared/http/index";
import { requireUser } from "../../auth/require-user";
import { getDashboardUseCase } from "../application/get-dashboard";
import { dashboardRepository } from "../infrastructure/dashboard.repository";

const get = getDashboardUseCase(dashboardRepository);

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return get(user.id);
  });
}
