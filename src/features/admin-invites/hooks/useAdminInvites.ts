import { useState, useEffect } from 'react';
import { adminInvitesApi } from '../api/invites';
import { InviteRequest, InviteResponse, Role, CreatedInviteCode } from '../model/invite';

const INVITE_URL_BASE = `${typeof window !== 'undefined' ? window.location.origin : ''}/signup`;

/**
 * 초대코드 생성 관리
 */
export function useAdminInvites() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCode, setCreatedCode] = useState<CreatedInviteCode | null>(null);

  const createInvite = async (role: Role, durationInMillis: number = 7 * 24 * 60 * 60 * 1000) => {
    setIsLoading(true);
    setError(null);

    try {
      /**
       * TODO: 백엔드 API 연동 필요
       * 현재는 UI 수정을 위해 로컬에서 랜덤하게 발급된 상태를 반환합니다.
       */
      // API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 800));

      const randomToken = Math.random().toString(36).substring(2, 10).toUpperCase();
      const generation = 26; // 26기로 고정

      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + durationInMillis);

      const newCode: CreatedInviteCode = {
        token: randomToken,
        role: role,
        generation: generation,
        createdAt,
        expiresAt,
        inviteUrl: `${INVITE_URL_BASE}?token=${encodeURIComponent(randomToken)}&code=${generation}`,
      };

      setCreatedCode(newCode);
      return newCode;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '초대 코드 생성에 실패했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createdCode,
    createInvite,
    clearCreatedCode: () => setCreatedCode(null),
  };
}

/**
 * 초대코드 검증 (회원가입 시 사용)
 */
export function useValidateInvite(initialToken?: string) {
  const [inviteInfo, setInviteInfo] = useState<InviteResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateToken = async (token: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await adminInvitesApi.validateInviteCode(token);
      setInviteInfo(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '초대 토큰 검증에 실패했습니다.';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // 초기 토큰이 있으면 자동 검증
  useEffect(() => {
    if (initialToken) {
      validateToken(initialToken);
    }
  }, [initialToken]);

  return {
    inviteInfo,
    isLoading,
    error,
    validateToken,
  };
}
