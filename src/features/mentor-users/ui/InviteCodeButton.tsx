'use client';

import React from 'react';
import { InviteCodeButton as AdminInviteCodeButton } from '@/features/admin-invites';

/**
 * 멘토 사용자 관리 페이지에서 사용하는 초대 코드 생성 버튼
 * admin-invites 기능을 래핑합니다
 */
export function InviteCodeButton() {
  return <AdminInviteCodeButton />;
}
