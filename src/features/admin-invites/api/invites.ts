import { fetchWithAuth } from "@/shared/api/client";
import { InviteRequest, InviteResponse } from '../model/invite';

export const adminInvitesApi = {
  /**
   * 초대 코드 생성 (관리자 권한 필요)
   * @param request 역할과 유효기간 정보
   * @returns 생성된 초대 코드 정보
   */
  createInviteCode: async (request: InviteRequest): Promise<InviteResponse> => {
    return fetchWithAuth('/api/v1/admin/invites', {
      method: 'POST',
      body: JSON.stringify(request),
      cache: 'no-store',
    });
  },

  /**
   * 초대 코드 검증
   * @param token 검증할 초대 토큰
   * @returns 초대 코드 정보
   */
  validateInviteCode: async (token: string): Promise<InviteResponse> => {
    return fetchWithAuth(`/api/v1/invites/validate?token=${encodeURIComponent(token)}`, {
      method: 'GET',
      cache: 'no-store',
    });
  },
};
