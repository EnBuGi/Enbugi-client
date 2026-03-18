"use client";

import React from "react";
import { AuthCard } from "@/features/auth/ui/AuthCard";
import type { SubmissionHistory } from "../model/project";

interface Props {
  history: SubmissionHistory[];
  isLoading: boolean;
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'COMPLETED':
      return <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded text-xs font-semibold">채점완료</span>;
    case 'PROCESSING':
      return <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-xs font-semibold">진행중</span>;
    case 'ENQUEUING':
    case 'QUEUED':
      return <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded text-xs font-semibold">대기중</span>;
    case 'SYSTEM_ERROR':
    default:
      return <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-xs font-semibold">에러</span>;
  }
};

export function SubmissionHistoryList({ history, isLoading }: Props) {
  return (
    <AuthCard>
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-4">채점 기록</h2>
        
        {isLoading ? (
          <div className="animate-pulse space-y-3">
            <div className="h-14 bg-white/10 rounded w-full"></div>
            <div className="h-14 bg-white/10 rounded w-full"></div>
            <div className="h-14 bg-white/10 rounded w-full"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-white/50 text-center py-8 text-sm border-t border-white/10 mt-2">
            제출된 프로젝트가 없습니다.<br />우측 폼을 통해 제출해주세요.
          </div>
        ) : (
          <div className="space-y-3 mt-2">
            {history.map((item) => (
              <div key={item.submissionId} className="flex justify-between items-center bg-white/5 hover:bg-white/10 border border-white/10 p-4 rounded-xl transition-colors">
                <div className="flex flex-col gap-1.5 overflow-hidden pr-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(item.status)}
                    <span className="text-white/40 text-xs">
                      {new Date(item.submittedAt).toLocaleString('ko-KR', {
                        year: 'numeric', month: '2-digit', day: '2-digit', 
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <a 
                    href={item.repoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-white/80 hover:text-white text-sm text-ellipsis overflow-hidden whitespace-nowrap"
                  >
                    {item.repoUrl}
                  </a>
                </div>
                
                <div className="text-right flex-shrink-0 flex items-center justify-center bg-black/30 rounded-lg p-2 min-w-[60px] border border-white/5">
                  <div className="text-white font-bold text-lg leading-none">
                    {item.score ?? 0}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AuthCard>
  );
}
