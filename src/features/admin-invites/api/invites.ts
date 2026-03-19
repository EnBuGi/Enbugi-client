import { InviteRequest, InviteResponse } from '../model/invite';

// Default to localhost when the environment variable isn't provided (e.g., running in local dev).
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080';

const getAuthHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  } as HeadersInit;
};

export const adminInvitesApi = {
  /**
   * 초대 코드 생성 (관리자 권한 필요)
   * @param request 역할과 유효기간 정보
   * @returns 생성된 초대 코드 정보
   */
  createInviteCode: async (request: InviteRequest): Promise<InviteResponse> => {
    const response = await fetch(`${API_URL}/api/v1/admin/invites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request),
      cache: 'no-store',
      credentials: 'include',
    });

    if (!response.ok) {
      const text = await response.text();
      let message: string;
      try {
        const parsed = JSON.parse(text);
        message = parsed?.message ?? text;
      } catch {
        message = text;
      }
      throw new Error(message || '초대 코드 생성에 실패했습니다.');
    }

    return response.json();
  },

  /**
   * 초대 코드 검증
   * @param token 검증할 초대 토큰
   * @returns 초대 코드 정보
   */
  validateInviteCode: async (token: string): Promise<InviteResponse> => {
    const response = await fetch(
      `${API_URL}/api/v1/invites/validate?token=${encodeURIComponent(token)}`,
      {
        method: 'GET',
        headers: getAuthHeaders(),
        cache: 'no-store',
        credentials: 'include',
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.message || '유효하지 않거나 만료된 초대 토큰입니다.');
    }

    return response.json();
  },
};
