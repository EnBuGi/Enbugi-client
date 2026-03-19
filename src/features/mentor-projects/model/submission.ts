export type SubmissionStatus = 'ENQUEUING' | 'QUEUED' | 'PROCESSING' | 'COMPLETED' | 'SYSTEM_ERROR' | 'CANCELLED' | 'PASS' | 'FAIL';

// 프로젝트별 제출 현황 요약 (Mentor Dashboard)
export interface Submission {
  userId: string;
  name: string;
  githubId: string;
  status: SubmissionStatus | null;
  score: number | null;
  lastSubmittedAt: string | null;
}

// 전체 제출 현황 페이지용 확장 타입 (Admin Global History)
export interface GlobalSubmission {
  submissionId: string;
  submittedAt: string;
  githubId: string;
  name: string;
  problemTitle: string;
  status: SubmissionStatus;
  score: number | null;
  memoryUsage: number | null;
  timeUsage: number | null;
  language?: string;
}

// 특정 유저의 프로젝트 제출 이력
export interface UserProjectSubmission {
  submissionId: string;
  status: SubmissionStatus;
  score: number | null;
  memoryUsage: number | null;
  timeExecution: number | null;
  language: string;
  submittedAt: string;
}

// 제출 상세 조회 (Admin Detail)
export interface TestDetail {
  methodName: string;
  status: 'PASS' | 'FAIL' | SubmissionStatus;
  durationMs: number | null;
  message: string | null;
  isHidden: boolean;
  score: number | null;
}

export interface AdminSubmissionDetail {
  submissionId: string;
  userName: string;
  githubId: string;
  repoUrl: string;
  status: SubmissionStatus;
  score: number | null;
  memoryUsage: number | null;
  timeExecution: number | null;
  submittedAt: string;
  sourceCode: string;
  testDetails: TestDetail[];
}
