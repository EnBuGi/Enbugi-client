'use client';

import * as React from 'react';
import { Badge, type BadgeIntent, type BadgeTone } from '../badge/Badge';
import type { SubmissionStatus } from '../../../model/submission';

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

const statusMap: Record<SubmissionStatus, { intent: BadgeIntent; tone: BadgeTone; label: string }> = {
  PENDING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
  ENQUEUING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
  QUEUED: { intent: 'neutral', tone: 'soft', label: '대기 중' },
  RUNNING: { intent: 'warning', tone: 'soft', label: '채점 중' },
  PROCESSING: { intent: 'warning', tone: 'soft', label: '채점 중' },
  COMPLETED: { intent: 'success', tone: 'soft', label: '성공' },
  WRONG_ANSWER: { intent: 'danger', tone: 'soft', label: '실패' },
  SYSTEM_ERROR: { intent: 'danger', tone: 'outline', label: '시스템 에러' },
  CANCELLED: { intent: 'neutral', tone: 'outline', label: '취소됨' },
  COMPILE_ERROR: { intent: 'danger', tone: 'soft', label: '컴파일 에러' },
  RUNTIME_ERROR: { intent: 'danger', tone: 'soft', label: '런타임 에러' },
  TIME_LIMIT_EXCEEDED: { intent: 'warning', tone: 'soft', label: '시간 초과' },
  MEMORY_LIMIT_EXCEEDED: { intent: 'warning', tone: 'soft', label: '메모리 초과' },
};

export function SubmissionStatusBadge({ status, className }: SubmissionStatusBadgeProps) {
  const config = statusMap[status] || statusMap.PENDING;

  return (
    <Badge intent={config.intent} tone={config.tone} className={className}>
      {config.label}
    </Badge>
  );
}
