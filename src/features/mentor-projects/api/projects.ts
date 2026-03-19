import { fetchWithAuth } from "@/shared/api/client";
import { ProjectType } from "../model/project";

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
  testCodeUrl?: string;
  testCodeKey?: string;
  scorePolicy: ScorePolicyDto;
}

export interface TestCodeParseResponse {
  methodNames: string[];
  testCodeKey: string;
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

  /** 특정 유저의 프로젝트 제출 현황 조회 (관리자용) */
  getUserProjectSubmissions: (projectId: string, userId: string) =>
    fetchWithAuth(`/api/v1/admin/projects/${projectId}/users/${userId}/submissions`),

  /** 제출 상세 조회 (관리자용) */
  getAdminSubmissionDetail: (submissionId: string) =>
    fetchWithAuth(`/api/v1/admin/submissions/${submissionId}`),

  /** 모든 프로젝트의 모든 제출 내역 조회 (전역 관리용) */
  getAllSubmissions: () => fetchWithAuth("/api/v1/admin/submissions"),
};
