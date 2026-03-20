import { fetchWithAuth } from "@/shared/api/client";
import { GlobalSubmission } from "@/features/mentor-projects/model/submission";
import { PageResponse, PageableParams } from "@/shared/api/types";

export const menteeSubmissionApi = {
  getMySubmissions: async (params?: PageableParams): Promise<PageResponse<GlobalSubmission>> => {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.append("page", params.page.toString());
    if (params?.size !== undefined) searchParams.append("size", params.size.toString());
    if (params?.sort) {
      params.sort.forEach(s => searchParams.append("sort", s));
    }

    const queryString = searchParams.toString();
    const endpoint = `/api/v1/submissions/me${queryString ? `?${queryString}` : ""}`;

    return fetchWithAuth(endpoint, {
      method: "GET",
      cache: "no-store",
    });
  },
};
