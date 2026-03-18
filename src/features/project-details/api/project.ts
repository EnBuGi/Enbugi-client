import type { 
  ProjectDetail, 
  SubmitResponse, 
  SubmissionHistory 
} from "../model/project";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const projectApi = {
  // 프로젝트 상세 내역 조회
  getProjectDetail: async (projectId: string): Promise<ProjectDetail> => {
    const response = await fetch(`${API_URL}/api/v1/projects/${projectId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ repoUrl }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "제출에 실패했습니다.");
    }
    return response.json();
  },

  // 채점 기록 조회
  getSubmissionHistory: async (projectId: string): Promise<SubmissionHistory[]> => {
    try {
      const response = await fetch(`${API_URL}/api/v1/projects/${projectId}/submissions`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    } catch {
      // Mock data fallback
      return [
        {
          submissionId: "mock-1",
          repoUrl: "https://github.com/vvineey/example1",
          status: "COMPLETED",
          score: 100,
          submittedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
        },
        {
          submissionId: "mock-2",
          repoUrl: "https://github.com/vvineey/example2",
          status: "SYSTEM_ERROR",
          score: 0,
          submittedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        }
      ];
    }
  }
};
