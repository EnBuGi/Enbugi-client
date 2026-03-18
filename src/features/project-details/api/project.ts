import type { 
  ProjectDetail, 
  SubmitResponse, 
  SubmissionHistory,
  SubmissionDetail
} from "../model/project";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  return {
    "Content-Type": "application/json",
    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
  } as HeadersInit;
};

export const projectApi = {
  // 프로젝트 상세 내역 조회
  getProjectDetail: async (projectId: string): Promise<ProjectDetail> => {
    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("프로젝트 상세 정보를 불러오는데 실패했습니다.");
    }
    return response.json();
  },

  // 과제 제출 (GitHub Repo URL)
  submitSubmission: async (projectId: string, repoUrl: string): Promise<SubmitResponse> => {
    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/submissions`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ repoUrl }),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "제출에 실패했습니다.");
    }
    return response.json();
  },

  // 채점 기록 조회
  getSubmissionHistory: async (projectId: string): Promise<SubmissionHistory[]> => {
    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/submissions`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "제출 기록을 불러오는데 실패했습니다.");
    }
    return response.json();
  },

  // 제출 상세 조회
  getSubmissionDetail: async (projectId: string, submissionId: string): Promise<SubmissionDetail> => {
    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/submissions/${submissionId}`, {
      method: "GET",
      headers: getAuthHeaders(),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("제출 상세 정보를 불러오는데 실패했습니다.");
    }
    return response.json();
  },

  // 채점 취소
  cancelSubmission: async (projectId: string, submissionId: string): Promise<void> => {
    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/submissions/${submissionId}/cancel`, {
      method: "POST",
      headers: getAuthHeaders(),
      cache: "no-store",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "채점 취소에 실패했습니다.");
    }
  },
};
