import React from 'react';
import { ProjectForm } from '@/features/mentor-projects/ui/ProjectForm';
import { fetchAdminProjectDetail } from '@/features/mentor-projects/api/projects';
import { notFound } from 'next/navigation';

export default async function EditMentorProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const project = await fetchAdminProjectDetail(resolvedParams.id);
  
  if (!project) {
    notFound();
  }

  // Map backend format to AssignmentFormState format
  const initialData = {
    generation: String(project.generation), 
    type: project.type,
    title: project.title,
    description: project.description || '여기에 마크다운 형식으로 프로젝트 설명을 작성하세요.',
    skeletonUrl: project.skeletonUrl || '',
    startDate: project.startDate.split('T')[0], // Extract YYYY-MM-DD
    endDate: project.dueDate.split('T')[0],   // Extract YYYY-MM-DD
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-8">
      <ProjectForm mode="edit" initialData={initialData} />
    </div>
  );
}
