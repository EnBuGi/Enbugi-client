import React from 'react';
import { SubmissionList } from '@/features/mentor-projects/ui/SubmissionList';
import { mentorProjectApi } from '@/features/mentor-projects/api/projects';

export default async function MentorProjectSubmissionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = await mentorProjectApi.getAdminProjectDetail(resolvedParams.id);
  const projectTitle = project ? project.title : '알 수 없는 프로젝트';

  return (
    <div className="w-full max-w-[1200px] mx-auto p-8">
      <SubmissionList projectId={resolvedParams.id} projectTitle={projectTitle} />
    </div>
  );
}
