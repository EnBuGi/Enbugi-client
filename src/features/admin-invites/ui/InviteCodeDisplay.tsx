'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users } from 'lucide-react';
import { Text } from '@/shared/components/ui/Text';
import { Badge } from '@/shared/components/ui/badge/Badge';
import { CopyableCode } from './CopyableCode';
import { CreatedInviteCode } from '../model/invite';

interface InviteCodeDisplayProps {
  code: CreatedInviteCode;
  className?: string;
}

/**
 * 생성된 초대 코드 정보 표시 컴포넌트
 */
export function InviteCodeDisplay({ code, className = '' }: InviteCodeDisplayProps) {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const roleLabel = code.role === 'MENTOR' ? '멘토' : '멘티';

  useEffect(() => {
    const updateTimer = () => {
      const diff = code.expiresAt.getTime() - new Date().getTime();

      if (diff <= 0) {
        setTimeLeft('만료됨');
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / (3600 * 24));
      const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      if (days > 0) {
        setTimeLeft(`만료까지 ${days}일`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      } else {
        setTimeLeft(`${minutes}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [code.expiresAt]);

  return (
    <div className={`bg-white/[0.03] rounded-2xl border border-white/5 p-7 flex flex-col gap-8 ${className}`}>
      {/* 헤더 */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <Text variant="body" weight="semibold" className="text-sub mb-1">
            초대 코드 정보
          </Text>
          <Text variant="tiny" className="text-muted leading-relaxed">
            생성되었습니다. 아래의 코드를 공유하세요.
          </Text>
        </div>
      </div>

      {/* 상세 정보 (뱃지 및 타이머 가로 배치) */}
      <div className="flex items-center gap-5 py-4 border-y border-white/[0.03]">
        <div className="flex items-center gap-3">
          <Badge
            intent={code.role === 'MENTOR' ? 'warning' : 'success'}
            tone="solid"
            shape="pill"
            size="sm"
          >
            {roleLabel}
          </Badge>
        </div>
        <div className="w-px h-4 bg-white/[0.05]" />
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-muted" />
          <Text variant="body" weight="semibold" className="text-sub tabular-nums">
            코드 만료 {timeLeft}
          </Text>
        </div>
      </div>

      {/* 토큰 및 링크 표시 (구분선 제거) */}
      <div className="flex flex-col gap-6">
        <CopyableCode
          code={code.token}
          label="Token"
        />
        <CopyableCode
          code={code.inviteUrl}
          label="Invite URL"
        />
      </div>
    </div>
  );
}
