export type UserRole = 'MENTEE' | 'MENTOR';

export interface User {
  githubId: string;
  name: string;
  generation: number;
  role: UserRole;
  profileImageUrl: string;
}

const MOCK_USERS: User[] = [
  {
    githubId: 'junho-kim',
    name: '김준호',
    generation: 13,
    role: 'MENTEE',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100001',
  },
  {
    githubId: 'junseo-park',
    name: '박준서',
    generation: 13,
    role: 'MENTOR',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100002',
  },
  {
    githubId: 'geonu-choi',
    name: '최건우',
    generation: 12,
    role: 'MENTEE',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100003',
  },
  {
    githubId: 'bobin-kim',
    name: '김보빈',
    generation: 13,
    role: 'MENTEE',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100004',
  },
  {
    githubId: 'hyeoksang-yoo',
    name: '유혁상',
    generation: 12,
    role: 'MENTOR',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100005',
  },
  {
    githubId: 'dahye-lee',
    name: '이다혜',
    generation: 14,
    role: 'MENTEE',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100006',
  },
  {
    githubId: 'gildong-hong',
    name: '홍길동',
    generation: 14,
    role: 'MENTEE',
    profileImageUrl: 'https://avatars.githubusercontent.com/u/100007',
  },
];

export async function fetchUsers(): Promise<User[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return MOCK_USERS;
}
