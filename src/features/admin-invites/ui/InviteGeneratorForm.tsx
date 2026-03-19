'use client';

import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Select } from '@/shared/components/ui/select/Select';
import { Text } from '@/shared/components/ui/Text';
import { useAdminInvites } from '../hooks/useAdminInvites';
import { Role } from '../model/invite';
import { InviteCodeDisplay } from './InviteCodeDisplay';

const DURATION_OPTIONS = [
  { label: '10분', value: '600000' },
  { label: '30분', value: '1800000' },
  { label: '60분', value: '3600000' },
];

type DurationValue = typeof DURATION_OPTIONS[number]['value'];

/**
 * 초대 코드 생성 폼
 * 관리자(멘토)가 새로운 초대 코드를 생성하는 폼
 */
export function InviteGeneratorForm() {
  const [role, setRole] = useState<Role>('MENTEE');
  const [durationValue, setDurationValue] = useState<DurationValue>('600000');

  const { isLoading, error, createdCode, createInvite, clearCreatedCode } = useAdminInvites();

  const handleCreateInvite = async () => {
    try {
      await createInvite(role, Number(durationValue));
    } catch (err) {
      // Error is handled in the hook
      console.error('Failed to create invite:', err);
    }
  };

  const handleCreateAnother = () => {
    clearCreatedCode();
  };

  // 성공적으로 생성된 후 표시
  if (createdCode) {
    return (
      <div className="flex flex-col gap-6">


        <InviteCodeDisplay code={createdCode} />

        <div className="flex gap-3">
          <Button variant="primary" onClick={handleCreateAnother} className="flex-1">
            초대 링크 재생성
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">


      <div className="flex flex-col gap-5">
        {/* 역할 선택 */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider px-0.5">
            권한 선택
          </label>
          <Select
            value={role}
            onChange={(val: any) => setRole(val as Role)}
            items={[
              { label: '멘토', value: 'MENTOR' },
              { label: '멘티', value: 'MENTEE' },
            ]}
            placeholder="역할을 선택해주세요"
            className="bg-white/[0.03] border-white/5 rounded-xl h-11"
          />
        </div>

        {/* 유효기간 선택 */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-bold text-muted uppercase tracking-wider px-0.5">
            코드 유효기간
          </label>
          <Select
            value={durationValue}
            onChange={(val: any) => setDurationValue(val as DurationValue)}
            items={DURATION_OPTIONS}
            placeholder="유효기간을 선택해주세요"
            className="bg-white/[0.03] border-white/5 rounded-xl h-11"
          />
        </div>
      </div>

      {/* 에러 표시 */}
      {error && (
        <div className="flex gap-3 bg-danger-50 border border-danger-200 rounded-lg px-4 py-3">
          <AlertCircle size={20} className="text-danger flex-shrink-0 mt-0.5" />
          <Text variant="small" className="text-danger">
            {error}
          </Text>
        </div>
      )}

      {/* 생성 버튼 */}
      <Button
        variant="primary"
        onClick={handleCreateInvite}
        isLoading={isLoading}
        className="w-full"
      >
        {isLoading ? '발급 중...' : '코드 발급'}
      </Button>
    </div>
  );
}
