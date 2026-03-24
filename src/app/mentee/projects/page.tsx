import React from 'react';
import { ProjectList } from '@/features/mentee-projects/ui/ProjectList';
import { Text } from '@/shared/components/ui/Text';

export default function MenteeProjectsPage() {
  return (
    <main className="flex flex-col gap-8 w-full max-w-[1200px] mx-auto px-8 py-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-white">나의 스터디</h1>
        <Text variant="large" className="font-medium text-zinc-400">
          진행 중인 프로젝트와 과거 제출 내역을 관리합니다.
        </Text>
      </div>
      
      <ProjectList />
    </main>
  );
}
