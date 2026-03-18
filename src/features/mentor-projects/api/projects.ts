import type { MentorProject } from '@/features/mentor-projects/model/project';
import type { Submission } from '@/features/mentor-projects/model/submission';

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
