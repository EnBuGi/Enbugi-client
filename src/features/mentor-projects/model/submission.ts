export type SubmissionStatus = 'PASS' | 'FAIL' | '미제출';

export interface Submission {
  id: number;
  name: string;
  gitId: string;
  status: SubmissionStatus;
  score: number | null;
  lastSubmittedAt: string | null;
}

// 전체 제출 현황 페이지用 확장 타입
export interface GlobalSubmission {
  submissionNo: number;    // 제출번호
  submittedAt: string;     // 제출 시간 (ISO 또는 'YYYY-MM-DD HH:mm')
  gitId: string;           // Github Id
  name: string;            // 이름
  problemTitle: string;    // 문제(프로젝트) 이름
  status: SubmissionStatus;// 결과
  memoryKb: number | null; // 메모리 (KB)
  timeMs: number | null;   // 시간 (ms)
  language: string | null; // 언어
}
