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
  SUCCESS: { intent: 'success', tone: 'soft', label: '성공' },
  COMPLETED: { intent: 'success', tone: 'soft', label: '성공' },
  FAILURE: { intent: 'danger', tone: 'soft', label: '실패' },
  ERROR: { intent: 'danger', tone: 'outline', label: '에러' },
  SYSTEM_ERROR: { intent: 'danger', tone: 'outline', label: '시스템 에러' },
  CANCELLED: { intent: 'neutral', tone: 'outline', label: '취소됨' },
  PASS: { intent: 'success', tone: 'soft', label: '통과' },
  FAIL: { intent: 'danger', tone: 'soft', label: '실패' },
};

export function SubmissionStatusBadge({ status, className }: SubmissionStatusBadgeProps) {
  const config = statusMap[status] || statusMap.PENDING;

  return (
    <Badge intent={config.intent} tone={config.tone} className={className}>
      {config.label}
    </Badge>
  );
}
