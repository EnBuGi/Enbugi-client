import type { MentorProject } from '@/features/mentor-projects/model/project';
import type { Submission, GlobalSubmission } from '@/features/mentor-projects/model/submission';

export const MOCK_PROJECTS: MentorProject[] = [
  {
    id: 'p12',
    type: 'JAVA',
    title: 'Star Pattern',
    generation: '26기',
    startDate: '2025-08-01',
    endDate: '2025-08-15',
    status: '진행',
  },
  {
    id: 'p11',
    type: 'JAVA',
    title: 'Tic-Tac-Toe',
    generation: '26기',
    startDate: '2025-09-01',
    endDate: '2025-09-15',
    status: '예정',
  },
  {
    id: 'p10',
    type: 'JAVA',
    title: 'Library',
    generation: '26기',
    startDate: '2025-10-01',
    endDate: '2025-10-20',
    status: '예정',
  },
  {
    id: 'p9',
    type: 'JAVA',
    title: 'CMD',
    generation: '26기',
    startDate: '2025-11-01',
    endDate: '2025-11-15',
    status: '예정',
  },
  {
    id: 'p8',
    type: 'REACT',
    title: 'SignUp Client',
    generation: '26기',
    startDate: '2025-12-01',
    endDate: '2025-12-20',
    status: '예정',
  },
  {
    id: 'p7',
    type: 'SPRING',
    title: 'SignUp Server',
    generation: '26기',
    startDate: '2026-02-01',
    endDate: '2026-03-15',
    status: '예정',
  },
  {
    id: 'p6',
    type: 'JAVA',
    title: 'Star Pattern',
    generation: '25기',
    startDate: '2024-08-01',
    endDate: '2024-08-15',
    status: '종료',
  },
  {
    id: 'p5',
    type: 'JAVA',
    title: 'Tic-Tac-Toe',
    generation: '25기',
    startDate: '2024-09-01',
    endDate: '2024-09-15',
    status: '종료',
  },
  {
    id: 'p4',
    type: 'JAVA',
    title: 'Library',
    generation: '25기',
    startDate: '2024-10-01',
    endDate: '2024-10-20',
    status: '종료',
  },
  {
    id: 'p3',
    type: 'JAVA',
    title: 'CMD',
    generation: '25기',
    startDate: '2024-11-01',
    endDate: '2024-11-15',
    status: '종료',
  },
  {
    id: 'p2',
    type: 'REACT',
    title: 'SignUp Client',
    generation: '25기',
    startDate: '2024-12-01',
    endDate: '2024-12-20',
    status: '종료',
  },
  {
    id: 'p1',
    type: 'SPRING',
    title: 'SignUp Server',
    generation: '25기',
    startDate: '2025-02-01',
    endDate: '2025-03-15',
    status: '종료',
  },
];

export const MOCK_SUBMISSIONS: Submission[] = [
  { id: 1, name: '김준호', gitId: 'junho-kim', status: 'PASS', score: 100, lastSubmittedAt: '2024-03-10 14:00' },
  { id: 2, name: '박준서', gitId: 'junseo-park', status: 'FAIL', score: 60, lastSubmittedAt: '2024-03-11 09:30' },
  { id: 3, name: '최건우', gitId: 'geonu-choi', status: 'PASS', score: 100, lastSubmittedAt: '2024-03-10 16:45' },
  { id: 4, name: '김보빈', gitId: 'bobin-kim', status: '미제출', score: null, lastSubmittedAt: null },
  { id: 5, name: '유혁상', gitId: 'hyeoksang-yoo', status: 'PASS', score: 80, lastSubmittedAt: '2024-03-12 11:20' },
  { id: 6, name: '이다혜', gitId: 'dahye-lee', status: 'FAIL', score: 40, lastSubmittedAt: '2024-03-13 15:10' },
  { id: 7, name: '홍길동', gitId: 'gildong-hong', status: '미제출', score: null, lastSubmittedAt: null },
];

export async function fetchMentorProjects(): Promise<MentorProject[]> {
  await new Promise((r) => setTimeout(r, 10));
  return MOCK_PROJECTS;
}

export async function fetchMentorSubmissions(projectId: string): Promise<Submission[]> {
  await new Promise((r) => setTimeout(r, 10));
  return MOCK_SUBMISSIONS;
}

export const MOCK_GLOBAL_SUBMISSIONS: GlobalSubmission[] = [
  { submissionNo: 1026, submittedAt: '2026-03-18 23:10', gitId: 'dahye-lee', name: '이다혜', problemTitle: 'SignUp Server', status: 'FAIL', memoryKb: 14240, timeMs: 320, language: 'SPRING' },
  { submissionNo: 1025, submittedAt: '2026-03-18 22:50', gitId: 'hyeoksang-yoo', name: '유혁상', problemTitle: 'SignUp Server', status: 'PASS', memoryKb: 13800, timeMs: 280, language: 'SPRING' },
  { submissionNo: 1024, submittedAt: '2026-03-18 22:30', gitId: 'junseo-park', name: '박준서', problemTitle: 'SignUp Client', status: 'FAIL', memoryKb: null, timeMs: null, language: 'REACT' },
  { submissionNo: 1023, submittedAt: '2026-03-18 22:45', gitId: 'geonu-choi', name: '최건우', problemTitle: 'SignUp Server', status: 'PASS', memoryKb: 13520, timeMs: 260, language: 'Java' },
  { submissionNo: 1022, submittedAt: '2026-03-10 14:00', gitId: 'junho-kim', name: '김준호', problemTitle: 'SignUp Server', status: 'PASS', memoryKb: 13200, timeMs: 245, language: 'Java' },
  { submissionNo: 1021, submittedAt: '2024-03-09 18:00', gitId: 'bobin-kim', name: '김보빈', problemTitle: 'Tic-Tac-Toe', status: 'PASS', memoryKb: 12900, timeMs: 210, language: 'Java' },
  { submissionNo: 1020, submittedAt: '2024-03-09 10:30', gitId: 'gildong-hong', name: '홍길동', problemTitle: 'Tic-Tac-Toe', status: 'FAIL', memoryKb: null, timeMs: null, language: 'Java' },
  { submissionNo: 1019, submittedAt: '2024-03-08 22:15', gitId: 'junho-kim', name: '김준호', problemTitle: 'Tic-Tac-Toe', status: 'PASS', memoryKb: 12500, timeMs: 195, language: 'Java' },
  { submissionNo: 1018, submittedAt: '2024-03-07 14:00', gitId: 'dahye-lee', name: '이다혜', problemTitle: 'Star Pattern', status: 'PASS', memoryKb: 11200, timeMs: 150, language: 'SPRING' },
  { submissionNo: 1017, submittedAt: '2024-03-06 09:00', gitId: 'hyeoksang-yoo', name: '유혁상', problemTitle: 'Star Pattern', status: 'PASS', memoryKb: 11000, timeMs: 140, language: 'Java' },
  { submissionNo: 1016, submittedAt: '2024-03-05 19:45', gitId: 'junseo-park', name: '박준서', problemTitle: 'Library', status: 'FAIL', memoryKb: null, timeMs: null, language: 'Java' },
  { submissionNo: 1015, submittedAt: '2024-03-04 13:30', gitId: 'geonu-choi', name: '최건우', problemTitle: 'Library', status: 'PASS', memoryKb: 14800, timeMs: 410, language: 'Java' },
  { submissionNo: 1014, submittedAt: '2024-03-03 11:00', gitId: 'gildong-hong', name: '홍길동', problemTitle: 'CMD', status: 'PASS', memoryKb: 13100, timeMs: 300, language: 'Java' },
  { submissionNo: 1013, submittedAt: '2024-03-02 08:55', gitId: 'bobin-kim', name: '김보빈', problemTitle: 'CMD', status: 'FAIL', memoryKb: null, timeMs: null, language: 'Java' },
];

export async function fetchAllSubmissions(): Promise<GlobalSubmission[]> {
  await new Promise((r) => setTimeout(r, 10));
  return MOCK_GLOBAL_SUBMISSIONS;
}
