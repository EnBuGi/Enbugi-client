import { fetchWithAuth } from "@/shared/api/client";
import { GlobalSubmission } from "@/features/mentor-projects/model/submission";

export const menteeSubmissionApi = {
  getMySubmissions: async (): Promise<GlobalSubmission[]> => {
    return fetchWithAuth("/api/v1/submissions/me", {
      method: "GET",
      cache: "no-store",
    });
  },
};
