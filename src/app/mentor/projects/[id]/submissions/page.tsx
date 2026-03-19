'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useProjectSubmissions } from '@/features/mentor-projects/hooks/useProjectSubmissions';
import { ProjectSubmissionStatusTable } from '@/features/mentor-projects/ui/components/ProjectSubmissionStatusTable';
import { Text } from '@/shared/components/ui/Text';
import { Loader2 } from 'lucide-react';

export default function MentorProjectSubmissionsPage() {
  const { id } = useParams<{ id: string }>();
  const { submissions, isLoading, error } = useProjectSubmissions(id);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <Text className="text-rose-400">{error}</Text>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">제출 현황</h1>
        <Text className="text-sub">이 프로젝트에 대한 모든 수강생의 최종 제출 상태입니다.</Text>
      </div>
      <ProjectSubmissionStatusTable submissions={submissions} projectId={id} />
    </div>
  );
}
