import React from 'react';
import { notFound } from 'next/navigation';
import { ProjectForm } from '@/features/mentor-projects/ui/ProjectForm';
import { mentorProjectApi } from '@/features/mentor-projects/api/projects';

export default async function EditMentorProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let project;
  try {
    project = await mentorProjectApi.getAdminProjectDetail(id);
  } catch (error) {
    console.error('Failed to fetch project detail:', error);
    notFound();
  }
  
  if (!project) {
    notFound();
  }

  // Map backend format to AssignmentFormState & Props format
  const initialData = {
    generation: String(project.generation), 
    type: project.type,
    title: project.title,
    description: project.description || '',
    skeletonUrl: project.skeletonUrl || '',
    startDate: project.startDate.split('T')[0],
    endDate: project.dueDate.split('T')[0],
    
    // Add grading policy data
    timeLimit: project.timeLimit,
    memoryLimit: project.memoryLimit,
    testCases: project.testCases || [],
    testCodeKey: project.testCodeKey || ''
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-8">
      <ProjectForm mode="edit" initialId={id} initialData={initialData} />
    </div>
  );
}
