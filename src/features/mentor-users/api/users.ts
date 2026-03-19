import { fetchWithAuth } from '@/shared/api/client';

export type UserRole = 'MENTEE' | 'MENTOR';

export interface User {
  id: string;
  githubId: string;
  name: string;
  generation: number;
  role: UserRole;
  profileImageUrl: string;
}

export async function fetchUsers(): Promise<User[]> {
  return await fetchWithAuth('/api/v1/admin/users');
}

export async function updateUserRole(
  userId: string,
  role: UserRole,
): Promise<void> {
  await fetchWithAuth(`/api/v1/admin/users/${userId}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
}
