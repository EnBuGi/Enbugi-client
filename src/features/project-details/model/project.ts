export type ProjectType = "SPRING" | "REACT" | "JAVA";
export type SubmissionStatus = "ENQUEUING" | "QUEUED" | "PROCESSING" | "COMPLETED" | "SYSTEM_ERROR" | "CANCELLED";

export interface ScorePolicy {
  // Add specific fields if needed
  [key: string]: any;
}

export interface ProjectDetail {
  id: string;
  title: string;
  type: ProjectType;
  description: string;
  startDate: string;
  dueDate: string;
  skeletonUrl: string;
  scorePolicy: ScorePolicy;
}

export interface SubmissionHistory {
  submissionId: string;
  repoUrl: string;
  status: SubmissionStatus;
  score: number;
  submittedAt: string;
}

export interface SubmitResponse {
  submissionId: string;
}

export interface TestDetailResult {
  methodName: string;
  status: string;
  durationMs: number;
  message: string | null;
  isHidden: boolean;
  score: number | null;
}

export interface SubmissionDetail {
  submissionId: string;
  repoUrl: string;
  status: SubmissionStatus;
  score: number | null;
  totalTests: number | null;
  passedTests: number | null;
  submittedAt: string;
  details: TestDetailResult[];
}
