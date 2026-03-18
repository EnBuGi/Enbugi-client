import React from 'react';
import { ProjectList } from '@/features/mentor-projects/ui/ProjectList';

export default function MentorProjectsPage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto p-8">
      <ProjectList />
    </div>
  );
}
