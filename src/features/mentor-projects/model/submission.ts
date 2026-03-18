export type SubmissionStatus = 'PASS' | 'FAIL' | '미제출';

export interface Submission {
  id: number;
  name: string;
  gitId: string;
  status: SubmissionStatus;
  score: number | null;
  lastSubmittedAt: string | null;
}
