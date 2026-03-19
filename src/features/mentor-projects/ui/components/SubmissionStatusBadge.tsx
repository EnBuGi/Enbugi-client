import * as React from 'react';
import { Badge, BadgeIntent, BadgeTone } from '@/shared/components/ui/badge/Badge';
import { SubmissionStatus } from '../../api/projects';

interface SubmissionStatusBadgeProps {
  status: SubmissionStatus;
  className?: string;
}

const statusMap: Record<SubmissionStatus, { intent: BadgeIntent; tone: BadgeTone; label: string }> = {
  PENDING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
  RUNNING: { intent: 'warning', tone: 'soft', label: '채점 중' },
  SUCCESS: { intent: 'success', tone: 'soft', label: '성공' },
  FAILURE: { intent: 'danger', tone: 'soft', label: '실패' },
  CANCELLED: { intent: 'neutral', tone: 'outline', label: '취소됨' },
  ERROR: { intent: 'danger', tone: 'outline', label: '에러' },
};

export function SubmissionStatusBadge({ status, className }: SubmissionStatusBadgeProps) {
  const config = statusMap[status] || statusMap.PENDING;

  return (
    <Badge intent={config.intent} tone={config.tone} className={className}>
      {config.label}
    </Badge>
  );
}
