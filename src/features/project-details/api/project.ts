import { fetchWithAuth } from "../../../shared/api/client";
import { PageResponse, PageableParams } from "../../../shared/api/types";
import type { 
  ProjectDetail, 
  SubmitResponse, 
  SubmissionHistory,
  SubmissionDetail
} from "../model/project";

export const projectApi = {
  // 프로젝트 상세 내역 조회
  getProjectDetail: async (projectId: string): Promise<ProjectDetail> => {
    return fetchWithAuth(`/api/v1/projects/${projectId}`, {
      method: "GET",
      cache: "no-store",
    });
  },

  // 과제 제출 (GitHub Repo URL)
  submitSubmission: async (projectId: string, repoUrl: string): Promise<SubmitResponse> => {
    return fetchWithAuth(`/api/v1/projects/${projectId}/submissions`, {
      method: "POST",
      body: JSON.stringify({ repoUrl }),
      cache: "no-store",
    });
  },

  // 채점 기록 조회
  getSubmissionHistory: async (projectId: string, params?: PageableParams): Promise<PageResponse<SubmissionHistory>> => {
    const query = new URLSearchParams();
    if (params?.page !== undefined) query.append("page", params.page.toString());
    if (params?.size !== undefined) query.append("size", params.size.toString());
    if (params?.sort) params.sort.forEach(s => query.append("sort", s));
    
    const queryString = query.toString();
    const url = `/api/v1/projects/${projectId}/submissions${queryString ? `?${queryString}` : ""}`;

    return fetchWithAuth(url, {
      method: "GET",
      cache: "no-store",
    });
  },

  // 제출 상세 조회
  getSubmissionDetail: async (projectId: string, submissionId: string): Promise<SubmissionDetail> => {
    return fetchWithAuth(`/api/v1/projects/${projectId}/submissions/${submissionId}`, {
      method: "GET",
      cache: "no-store",
    });
  },

  // 채점 취소
  cancelSubmission: async (projectId: string, submissionId: string): Promise<void> => {
    await fetchWithAuth(`/api/v1/projects/${projectId}/submissions/${submissionId}/cancel`, {
      method: "POST",
      cache: "no-store",
    });
  },
};
