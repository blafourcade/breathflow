import { handle } from "../../../shared/http/index.js";
import { requireUser } from "../../auth/require-user.js";
import { getDashboardUseCase } from "../application/get-dashboard.js";
import { dashboardRepository } from "../infrastructure/dashboard.repository.js";

const get = getDashboardUseCase(dashboardRepository);

export function GET() {
  return handle(async () => {
    const user = await requireUser();
    return get(user.id);
  });
}
