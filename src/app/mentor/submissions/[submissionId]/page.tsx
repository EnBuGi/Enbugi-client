'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminSubmissionDetail } from '@/features/mentor-projects/hooks/useAdminSubmissionDetail';
import { AdminSubmissionDetailView } from '@/features/mentor-projects/ui/components/AdminSubmissionDetailView';
import { Text } from '@/shared/components/ui/Text';
import { Button } from '@/shared/components/ui/Button';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function MentorSubmissionDetailPage() {
  const router = useRouter();
  const { submissionId } = useParams<{ submissionId: string }>();
  const { detail, isLoading, error } = useAdminSubmissionDetail(submissionId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (error || !detail) {
    return (
      <div className="p-8 text-center flex flex-col items-center gap-4">
        <Text variant="large" className="text-rose-400">{error || '제출 내용을 찾을 수 없습니다.'}</Text>
        <Button onClick={() => router.back()} variant="outline">
          뒤로 가기
        </Button>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[1200px] mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
        variant="secondary"
        size="sm"
        onClick={() => router.back()}
        leftIcon={<ArrowLeft size={16} />}
      >
        뒤로 가기
      </Button>
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight">제출 상세 정보</h1>
            <Text variant="small" className="text-sub">제출 ID: {submissionId}</Text>
        </div>
      </div>
      
      <AdminSubmissionDetailView detail={detail} />
    </div>
  );
}
