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
    startDate: project.startDate, // Keep full ISO format for datetime-local
    endDate: project.dueDate,     // Keep full ISO format for datetime-local
    
    // Add grading policy data from scorePolicy object
    timeLimit: project.scorePolicy?.timeLimit,
    memoryLimit: project.scorePolicy?.memoryLimit,
    testCases: project.scorePolicy?.cases || [],
    testCodeKey: project.testCodeKey || '',
    testCodeUrl: project.testCodeUrl || ''
  };

  return (
    <div className="w-full max-w-[1000px] mx-auto p-8">
      <ProjectForm mode="edit" initialId={id} initialData={initialData} />
    </div>
  );
}
