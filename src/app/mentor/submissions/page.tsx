'use client';

import { useState } from 'react';
import { AllSubmissionsTable } from '@/features/mentor-projects/ui/AllSubmissionsTable';
import { Text } from '@/shared/components/ui/Text';
import { useAllSubmissions } from '@/features/mentor-projects/hooks/useSubmissions';

export default function SubmissionsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const { data: submissions, totalElements, isLoading } = useAllSubmissions(currentPage - 1, pageSize);

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
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <Text className="text-zinc-500">불러오는 중...</Text>
        </div>
      ) : (
        <AllSubmissionsTable 
          submissions={submissions || []} 
          totalElements={totalElements}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
