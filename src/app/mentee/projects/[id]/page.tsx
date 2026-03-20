"use client";

import React, { use } from "react";
import { useProject } from "../../../../features/project-details/hooks/useProject";
import { ProjectContent } from "../../../../features/project-details/ui/ProjectContent";
import { ScoringList } from "../../../../features/project-details/ui/ScoringList";
import { SubmissionForm } from "../../../../features/project-details/ui/SubmissionForm";
import { SubmissionHistoryList } from "../../../../features/project-details/ui/SubmissionHistoryList";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../../../../shared/components/ui/Button";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id: projectId } = use(params);
  const { projectDetail, history, isLoading, error, refetch } = useProject(projectId);

  if (error) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-white/50 space-y-4">
        <div>데이터를 불러오는 중 오류가 발생했습니다.</div>
        <button 
          onClick={refetch} 
          className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md transition-colors text-white text-sm"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-[1400px] py-6 flex flex-col gap-4">
      {/* Top Header: Back Button */}
      <div className="flex items-center px-2">
        <Link href="/mentee/projects">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-white/50 hover:text-white group"
            leftIcon={<ChevronLeft className="group-hover:-translate-x-1 transition-transform" />}
          >
            목록으로 돌아가기
          </Button>
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Project Description & Scoring (70%) */}
        <div className="lg:w-[70%] flex flex-col gap-6 pr-2">
          <ProjectContent projectDetail={projectDetail} isLoading={isLoading} />
          {projectDetail && !isLoading && (
            <ScoringList scorePolicy={projectDetail.scorePolicy} />
          )}
        </div>

        {/* Right Side: Submission & History (30%) */}
        <div className="lg:w-[30%] flex flex-col gap-6 pr-2">
          <SubmissionForm projectId={projectId} />
          <SubmissionHistoryList projectId={projectId} history={history} isLoading={isLoading} onRefetch={refetch} />
        </div>
      </div>
    </div>
  );
}
