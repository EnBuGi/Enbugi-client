"use client";

import React, { use } from "react";
import { useProject } from "@/features/project-details/hooks/useProject";
import { ProjectContent } from "@/features/project-details/ui/ProjectContent";
import { SubmissionForm } from "@/features/project-details/ui/SubmissionForm";
import { SubmissionHistoryList } from "@/features/project-details/ui/SubmissionHistoryList";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id: projectId } = use(params);
  const { projectDetail, history, isLoading, error } = useProject(projectId);

  if (error) {
    return (
      <div className="flex h-full items-center justify-center text-white/50">
        데이터를 불러오는 중 오류가 발생했습니다.
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1400px] h-[calc(100vh-80px)] overflow-hidden py-6">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left Side: Project Description (60%) */}
        <div className="lg:w-[60%] h-full overflow-y-auto pr-2 scrollbar-hide">
          <ProjectContent projectDetail={projectDetail} isLoading={isLoading} />
        </div>

        {/* Right Side: Submission & History (40%) */}
        <div className="lg:w-[40%] flex flex-col gap-6 h-full overflow-y-auto pr-2 scrollbar-hide">
          <SubmissionForm projectId={projectId} />
          <SubmissionHistoryList history={history} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
