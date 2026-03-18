import React from 'react';
import { ProjectForm } from '@/features/mentor-projects/ui/ProjectForm';
import { MOCK_PROJECTS } from '@/features/mentor-projects/api/projects';
import { notFound } from 'next/navigation';

export default async function EditMentorProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = MOCK_PROJECTS.find(p => p.id === resolvedParams.id);
  
  if (!project) {
    notFound();
  }

  // Mock mapping to AssignmentFormState format
  const initialData = {
    generation: project.generation.replace('기', ''), 
    type: project.type,
    title: project.title,
    description: '여기에 마크다운 형식으로 프로젝트 설명을 작성하세요.',
    skeletonUrl: 'https://github.com/Enbugi/' + project.title.toLowerCase().replace(/\s+/g, '-'),
    startDate: project.startDate,
    endDate: project.endDate,
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-8">
      <ProjectForm mode="edit" initialData={initialData} />
    </div>
  );
}
