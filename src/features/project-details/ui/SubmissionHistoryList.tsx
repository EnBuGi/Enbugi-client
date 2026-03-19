"use client";

import React, { useState } from "react";
import { Ban } from "lucide-react";
import { Card } from "../../../shared/components/ui/Card/Card";
import { Text } from "../../../shared/components/ui/Text";
import { Button } from "../../../shared/components/ui/Button";
import { SubmissionStatusBadge } from "../../../shared/components/ui/submission/SubmissionStatusBadge";
import { projectApi } from "../api/project";
import { SubmissionDetailModal } from "./SubmissionDetailModal";
import type { SubmissionHistory } from "../model/project";

interface Props {
  projectId: string;
  history: SubmissionHistory[];
  isLoading: boolean;
  onRefetch: () => void;
}

const statusConfig: Record<string, { intent: BadgeIntent; label: string }> = {
  COMPLETED: { intent: "success", label: "채점완료" },
  PROCESSING: { intent: "neutral", label: "진행중" },
  ENQUEUING: { intent: "warning", label: "대기중" },
  QUEUED: { intent: "warning", label: "대기중" },
  SYSTEM_ERROR: { intent: "danger", label: "에러" },
  CANCELLED: { intent: "neutral", label: "취소됨" },
};

const inProgressStatuses = ["ENQUEUING", "QUEUED", "PROCESSING"];

export function SubmissionHistoryList({ projectId, history, isLoading, onRefetch }: Props) {
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const handleCancel = async (e: React.MouseEvent, submissionId: string) => {
    e.stopPropagation();
    setCancellingId(submissionId);
    try {
      await projectApi.cancelSubmission(projectId, submissionId);
      onRefetch();
    } catch (err) {
      console.error("Failed to cancel:", err);
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <>
      <Card title="제출 이력">
        {isLoading ? (
          <div className="animate-pulse space-y-2">
            <div className="h-12 bg-white/10 rounded w-full" />
            <div className="h-12 bg-white/10 rounded w-full" />
            <div className="h-12 bg-white/10 rounded w-full" />
          </div>
        ) : history.length === 0 ? (
          <Text variant="small" className="text-center py-6 block !text-[var(--color-muted)]">
            제출된 프로젝트가 없습니다.
          </Text>
        ) : (
          <div className="flex flex-col gap-2">
            {history.map((item) => {
              const config = statusConfig[item.status] ?? statusConfig.SYSTEM_ERROR;
              const isInProgress = inProgressStatuses.includes(item.status);

              return (
                <div
                  key={item.submissionId}
                  onClick={() => setSelectedSubmissionId(item.submissionId)}
                  className="flex items-center justify-between gap-3 bg-[var(--color-background)] hover:bg-[var(--color-surfaceHighlight)] border border-[var(--color-border)] rounded-lg px-3 py-2.5 transition-colors cursor-pointer"
                >
                  {/* Left: status + date */}
                  <div className="flex items-center gap-2 min-w-0">
                    <Badge intent={config.intent} tone="soft" size="sm" shape="pill">
                      {config.label}
                    </Badge>
                    <Text variant="tiny" className="!text-[var(--color-muted)] shrink-0">
                      {new Date(item.submittedAt).toLocaleString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Text>
                  </div>

                  {/* Right: cancel button or score */}
                  <div className="flex items-center gap-2 shrink-0">
                    {isInProgress ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => handleCancel(e, item.submissionId)}
                        isLoading={cancellingId === item.submissionId}
                        disabled={cancellingId === item.submissionId}
                        className="!py-1 !px-2 !text-xs gap-1"
                      >
                        <Ban size={12} />
                        취소
                      </Button>
                    ) : (
                      <div className="flex items-center justify-center bg-black/30 rounded-md px-2.5 py-1 min-w-[42px] border border-[var(--color-border)]">
                        <Text variant="small" weight="bold" className="!text-[var(--color-main)] leading-none">
                          {item.score ?? "—"}
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Detail Modal */}
      <SubmissionDetailModal
        projectId={projectId}
        submissionId={selectedSubmissionId ?? ""}
        isOpen={!!selectedSubmissionId}
        onClose={() => setSelectedSubmissionId(null)}
      />

    </>
  );
}
