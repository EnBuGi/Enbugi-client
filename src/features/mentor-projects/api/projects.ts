import { fetchWithAuth } from "@/shared/api/client";
import { ProjectType } from "../model/project";
import { PageResponse, PageableParams } from "@/shared/api/types";

export interface TestCaseDto {
  id?: string;
  name: string;
  score: number;
  isHidden: boolean;
}

export interface ScorePolicyDto {
  timeLimit: number;
  memoryLimit: number;
  cases: TestCaseDto[];
}

export interface ProjectCreateRequest {
  title: string;
  type: ProjectType;
  generation: number;
  startDate: string;
  dueDate: string;
  description?: string;
  skeletonUrl?: string;
  testCodeKey?: string;
  scorePolicy: ScorePolicyDto;
  canSubmit: boolean;
}

export interface TestCodeParseResponse {
  methodNames: string[];
  testCodeKey: string;
  testCodeUrl: string;
}

import { SubmissionStatus } from "../../../shared/model/submission";
export type { SubmissionStatus };

export interface AdminProjectSubmissionSummaryResponse {
  userId: string;
  submissionId: string | null;
  name: string;
  githubId: string;
  status: SubmissionStatus;
  score: number | null;
  lastSubmittedAt: string | null;
}

export interface AdminGlobalSubmissionResponse {
  submissionId: string;
  projectId: string;
  name: string;
  problemTitle: string;
  projectType: string;
  status: SubmissionStatus;
  score: number | null;
  submittedAt: string;
  githubId: string;
}

export type TestStatus = 'PASSED' | 'FAILED' | 'ERROR' | 'SKIPPED';

export interface TestDetailResponse {
  methodName: string;
  status: TestStatus;
  durationMs: number | null;
  message: string | null;
  isHidden: boolean;
  score: number | null;
}

export interface AdminSubmissionDetailResponse {
  submissionId: string;
  userName: string;
  githubId: string;
  repoUrl: string;
  status: SubmissionStatus;
  score: number | null;
  projectType: string;
  submittedAt: string;
  sourceCode: string;
  testDetails: TestDetailResponse[];
}

export interface AdminUserProjectSubmissionResponse {
  submissionId: string;
  status: SubmissionStatus;
  score: number | null;
  memoryUsage: number | null;
  timeExecution: number | null;
  projectType: string;
  submittedAt: string;
}

export const mentorProjectApi = {
  /** 프로젝트 생성 */
  createProject: (data: ProjectCreateRequest) =>
    fetchWithAuth("/api/v1/admin/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  /** 프로젝트 수정 */
  updateProject: (id: string, data: ProjectCreateRequest) =>
    fetchWithAuth(`/api/v1/admin/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  /** 테스트 코드 파싱 */
  parseTestCode: (file: File): Promise<TestCodeParseResponse> => {
    const formData = new FormData();
    formData.append("file", file);
    return fetchWithAuth("/api/v1/admin/projects/test-code/parse", {
      method: "POST",
      body: formData,
    });
  },

  /** 관리자용 프로젝트 목록 조회 */
  getAdminProjects: () => fetchWithAuth("/api/v1/admin/projects"),

  /** 관리자용 프로젝트 상세 조회 */
  getAdminProjectDetail: (id: string) => fetchWithAuth(`/api/v1/admin/projects/${id}`),

  /** 프로젝트별 제출 목록 조회 (관리자용) */
  getAdminSubmissions: (projectId: string) => 
    fetchWithAuth(`/api/v1/admin/projects/${projectId}/submissions`),

  /** 프로젝트별 제출 요약 정보 조회 (관리자용) */
  getProjectSubmissionSummary: (projectId: string): Promise<AdminProjectSubmissionSummaryResponse[]> =>
    fetchWithAuth(`/api/v1/admin/projects/${projectId}/submissions/summary`),

  /** 특정 유저의 프로젝트 제출 현황 조회 (관리자용) */
  getUserProjectSubmissions: (projectId: string, userId: string, params?: PageableParams): Promise<PageResponse<AdminUserProjectSubmissionResponse>> => {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.append("page", params.page.toString());
    if (params?.size !== undefined) searchParams.append("size", params.size.toString());
    
    const queryString = searchParams.toString();
    const endpoint = `/api/v1/admin/projects/${projectId}/users/${userId}/submissions${queryString ? `?${queryString}` : ""}`;
    return fetchWithAuth(endpoint);
  },

  /** 제출 상세 조회 (관리자용) */
  getAdminSubmissionDetail: async (submissionId: string): Promise<AdminSubmissionDetailResponse> => {
    return fetchWithAuth(`/api/v1/admin/submissions/${submissionId}`);
  },

  /** 모든 프로젝트의 모든 제출 내역 조회 (전역 관리용) */
  getAllSubmissions: (params?: PageableParams): Promise<PageResponse<AdminGlobalSubmissionResponse>> => {
    const searchParams = new URLSearchParams();
    if (params?.page !== undefined) searchParams.append("page", params.page.toString());
    if (params?.size !== undefined) searchParams.append("size", params.size.toString());

    const queryString = searchParams.toString();
    const endpoint = `/api/v1/admin/submissions${queryString ? `?${queryString}` : ""}`;
    return fetchWithAuth(endpoint);
  },

  /** 프로젝트 삭제 */
  deleteProject: (id: string) =>
    fetchWithAuth(`/api/v1/admin/projects/${id}`, {
      method: "DELETE",
    }),
};
