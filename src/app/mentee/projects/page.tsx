import React from 'react';
import { ProjectList } from '@/features/mentee-projects/ui/ProjectList';
import { Text } from '@/shared/components/ui/Text';

export default function MenteeProjectsPage() {
  return (
    <main className="p-8 md:p-12 max-w-7xl mx-auto">
      <header className="mb-12">
        <Text variant="display-xl" className="mb-2">
          나의 스터디
        </Text>
        <Text variant="body" className="text-white/60">
          진행 중인 프로젝트와 과거 제출 내역을 관리합니다.
        </Text>
      </header>
      
      <ProjectList />
    </main>
  );
}
