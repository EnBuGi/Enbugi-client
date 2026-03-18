import React from 'react';
import { AllSubmissionsTable } from '@/features/mentor-projects/ui/AllSubmissionsTable';
import { MOCK_GLOBAL_SUBMISSIONS } from '@/features/mentor-projects/api/projects';
import { Text } from '@/shared/components/ui/Text';

export default function SubmissionsPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto px-8 py-8">
      {/* 페이지 헤더 */}
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">제출 현황</h1>
        <Text variant="large" className="font-medium text-zinc-400">
          전체 프로젝트의 제출 기록을 확인하고 결과를 검토하세요
        </Text>
      </div>

      {/* 테이블 */}
      <AllSubmissionsTable submissions={MOCK_GLOBAL_SUBMISSIONS} />
    </div>
  );
}
