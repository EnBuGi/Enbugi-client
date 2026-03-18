import { fetchWithAuth } from "@/shared/api/client";
import type { MentorProject } from '@/features/mentor-projects/model/project';
import type { 
  Submission, 
  GlobalSubmission, 
  AdminSubmissionDetail, 
  UserProjectSubmission 
} from '@/features/mentor-projects/model/submission';

// 프로젝트 목록 조회 (Mentor/Admin용)
export async function fetchMentorProjects(): Promise<MentorProject[]> {
  return fetchWithAuth('/api/v1/admin/projects', {
    method: "GET",
    cache: "no-store",
  });
}

// 특정 프로젝트 상세 조회 (Admin용)
export async function fetchAdminProjectDetail(projectId: string): Promise<MentorProject> {
  return fetchWithAuth(`/api/v1/admin/projects/${projectId}`, {
    method: "GET",
    cache: "no-store",
  });
}

// 특정 프로젝트의 제출 현황 요약 조회 (Admin Dashboard)
export async function fetchMentorSubmissions(projectId: string): Promise<Submission[]> {
  return fetchWithAuth(`/api/v1/admin/projects/${projectId}/submissions/summary`, {
    method: "GET",
    cache: "no-store",
  });
}

// 특정 유저의 해당 프로젝트 제출 이력 조회
export async function fetchUserProjectSubmissions(projectId: string, userId: string): Promise<UserProjectSubmission[]> {
  return fetchWithAuth(`/api/v1/admin/projects/${projectId}/users/${userId}/submissions`, {
    method: "GET",
    cache: "no-store",
  });
}

// 전체 제출 이력 조회 (Admin Global History)
export async function fetchAllSubmissions(): Promise<GlobalSubmission[]> {
  return fetchWithAuth('/api/v1/admin/submissions', {
    method: "GET",
    cache: "no-store",
  });
}

// 제출 상세 조회 (Admin용 - 히든 케이스 포함)
export async function fetchAdminSubmissionDetail(submissionId: string): Promise<AdminSubmissionDetail> {
  return fetchWithAuth(`/api/v1/admin/submissions/${submissionId}`, {
    method: "GET",
    cache: "no-store",
  });
}

// 모든 유저 목록 조회 (Admin)
export async function fetchAdminUsers(generation?: number): Promise<any[]> {
  const url = generation 
    ? `/api/v1/admin/users?generation=${generation}`
    : `/api/v1/admin/users`;
    
  return fetchWithAuth(url, {
    method: "GET",
    cache: "no-store",
  });
}

// 테스트 코드 파싱
export async function parseTestCode(file: File): Promise<{ methodNames: string[] }> {
  const formData = new FormData();
  formData.append("file", file);

  return fetchWithAuth('/api/v1/admin/projects/test-code/parse', {
    method: "POST",
    body: formData,
  });
}
