"use client";

import React from "react";
import type { ProjectDetail } from "../model/project";

interface Props {
  projectDetail: ProjectDetail | null;
  isLoading: boolean;
}

export function ProjectContent({ projectDetail, isLoading }: Props) {
  if (isLoading || !projectDetail) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/10 rounded w-1/3"></div>
        <div className="h-4 bg-white/10 rounded w-full"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
      </div>
    );
  }

  const renderMarkdown = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      const boldFormatted = paragraph.split(/(\*\*.*?\*\*)/).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-bold text-white">{part.slice(2, -2)}</strong>;
        }
        return part;
      });

      return (
        <p key={index} className="mb-4 leading-relaxed whitespace-pre-wrap">
          {boldFormatted}
        </p>
      );
    });
  };

  return (
    <div className="text-white/80 p-6 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md h-full overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4 text-white">{projectDetail.title}</h1>
      <div className="flex gap-2 mb-8 text-sm text-white/50 border-b border-white/10 pb-4">
        <span className="bg-white/10 px-2 py-1 rounded text-white">{projectDetail.type}</span>
        <span className="py-1">기간: {projectDetail.startDate} ~ {projectDetail.dueDate}</span>
      </div>
      
      <div className="prose prose-invert max-w-none">
        {renderMarkdown(projectDetail.description)}

        <div className="mt-8 p-4 bg-black/20 rounded-lg border border-white/5">
          <h3 className="text-sm font-semibold text-white/50 mb-2 uppercase tracking-wider">프로젝트 스켈레톤 저장소</h3>
          <a 
            href={projectDetail.skeletonUrl} 
            target="_blank" 
            rel="noreferrer" 
            className="text-white hover:text-blue-400 break-all transition-colors underline decoration-white/30 underline-offset-4"
          >
            {projectDetail.skeletonUrl}
          </a>
        </div>
      </div>
    </div>
  );
}
