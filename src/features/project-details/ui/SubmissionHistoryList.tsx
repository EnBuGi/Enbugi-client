"use client";

import React from "react";
import { Card } from "@/shared/components/ui/Card/Card";
import { Text } from "@/shared/components/ui/Text";
import { Badge, type BadgeIntent } from "@/shared/components/ui/badge/Badge";
import type { SubmissionHistory } from "../model/project";

interface Props {
  history: SubmissionHistory[];
  isLoading: boolean;
}

const statusConfig: Record<string, { intent: BadgeIntent; label: string }> = {
  COMPLETED: { intent: "success", label: "채점완료" },
  PROCESSING: { intent: "neutral", label: "진행중" },
  ENQUEUING: { intent: "warning", label: "대기중" },
  QUEUED: { intent: "warning", label: "대기중" },
  SYSTEM_ERROR: { intent: "danger", label: "에러" },
};

export function SubmissionHistoryList({ history, isLoading }: Props) {
  return (
    <Card title="제출 이력">
      {isLoading ? (
        <div className="animate-pulse space-y-2">
          <div className="h-12 bg-white/10 rounded w-full" />
          <div className="h-12 bg-white/10 rounded w-full" />
          <div className="h-12 bg-white/10 rounded w-full" />
        </div>
      ) : history.length === 0 ? (
        <Text variant="small" className="text-center py-6 block">
          제출된 프로젝트가 없습니다.
        </Text>
      ) : (
        <div className="flex flex-col gap-2">
          {history.map((item) => {
            const config = statusConfig[item.status] ?? statusConfig.SYSTEM_ERROR;

            return (
              <div
                key={item.submissionId}
                className="flex items-center justify-between gap-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-lg px-3 py-2.5 transition-colors"
              >
                {/* Left: status + date + repo */}
                <div className="flex flex-col gap-1 overflow-hidden min-w-0">
                  <div className="flex items-center gap-2">
                    <Badge intent={config.intent} tone="soft" size="sm" shape="pill" className="h-6 px-2 text-[11px]">
                      {config.label}
                    </Badge>
                    <Text variant="tiny" className="shrink-0">
                      {new Date(item.submittedAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </div>
                  <a
                    href={item.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-white/60 hover:text-white text-xs truncate transition-colors"
                  >
                    {item.repoUrl}
                  </a>
                </div>

                {/* Right: score */}
                <div className="flex-shrink-0 flex items-center justify-center bg-black/30 rounded-md px-2.5 py-1.5 min-w-[50px] border border-white/5">
                  <Text variant="h4" weight="bold" className="!text-white leading-none">
                    {item.score ?? 0}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </Card>
  );
}
