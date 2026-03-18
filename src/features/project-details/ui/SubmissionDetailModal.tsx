"use client";

import React, { useEffect, useState } from "react";
import { X, RotateCcw, CheckCircle, XCircle, AlertCircle, EyeOff } from "lucide-react";
import { Card } from "@/shared/components/ui/Card/Card";
import { Text } from "@/shared/components/ui/Text";
import { Badge } from "@/shared/components/ui/badge/Badge";
import { Button } from "@/shared/components/ui/Button";
import { projectApi } from "../api/project";
import type { SubmissionDetail, TestDetailResult } from "../model/project";

interface Props {
  projectId: string;
  submissionId: string;
  onClose: () => void;
  onRetry?: (repoUrl: string) => void;
}

function TestIcon({ status, isHidden }: { status: string; isHidden: boolean }) {
  if (isHidden)
    return <EyeOff size={16} className="text-[var(--color-tertiary)] shrink-0" />;
  if (status === "PASSED")
    return <CheckCircle size={16} className="text-[var(--color-success)] shrink-0" />;
  if (status === "FAILED" || status === "ERROR")
    return <XCircle size={16} className="text-[var(--color-error)] shrink-0" />;
  return <AlertCircle size={16} className="text-[var(--color-muted)] shrink-0" />;
}

export function SubmissionDetailModal({ projectId, submissionId, onClose, onRetry }: Props) {
  const [detail, setDetail] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await projectApi.getSubmissionDetail(projectId, submissionId);
        setDetail(data);
      } catch (e: any) {
        setError(e.message || "상세 정보를 불러올 수 없습니다.");
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId, submissionId]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="w-full max-w-lg mx-4 animate-in fade-in zoom-in-95 duration-200">
        <Card className="!bg-[var(--color-surface)] border border-[var(--color-border)] shadow-2xl">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <Text variant="h4" weight="bold">채점 결과 상세</Text>
              {detail && (
                <Badge
                  intent={detail.status === "COMPLETED" ? "success" : detail.status === "SYSTEM_ERROR" ? "danger" : "warning"}
                  tone="soft"
                  size="sm"
                  shape="pill"
                >
                  {detail.status === "COMPLETED" ? "완료" : detail.status === "SYSTEM_ERROR" ? "에러" : "진행중"}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              {detail && (
                <Text variant="h3" weight="bold" className="!text-[var(--color-primary)]">
                  {detail.score ?? "—"}
                  <Text as="span" variant="small" className="!text-[var(--color-muted)] ml-0.5">/100</Text>
                </Text>
              )}
              <button onClick={onClose} className="text-[var(--color-muted)] hover:text-[var(--color-main)] transition-colors p-1">
                <X size={18} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="animate-pulse space-y-3 py-4">
              <div className="h-8 bg-white/10 rounded w-3/4" />
              <div className="h-8 bg-white/10 rounded w-full" />
              <div className="h-8 bg-white/10 rounded w-full" />
            </div>
          ) : error ? (
            <Text variant="small" className="text-[var(--color-error)] py-6 text-center block">
              {error}
            </Text>
          ) : detail ? (
            <>
              {/* Submitted at */}
              <Text variant="tiny" className="!text-[var(--color-muted)] mb-3 block">
                제출일: {new Date(detail.submittedAt).toLocaleString("ko-KR")}
              </Text>

              {/* Test case results */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 mb-2">
                  <Text variant="small" weight="bold">🧪 테스트 케이스 결과</Text>
                </div>
                <div className="flex flex-col gap-1.5">
                  {detail.details.length === 0 ? (
                    <Text variant="tiny" className="!text-[var(--color-muted)] py-3 text-center block">
                      상세 테스트 케이스 정보가 없습니다.
                    </Text>
                  ) : (
                    detail.details.map((tc: TestDetailResult, i: number) => {
                      const isPassed = tc.status === "PASSED";
                      const displayScore = tc.score ?? 0;

                      return (
                        <div
                          key={i}
                          className="flex items-center justify-between px-3 py-2 rounded-lg border transition-colors"
                          style={{
                            backgroundColor: tc.isHidden
                              ? "rgba(82, 82, 91, 0.08)"
                              : isPassed
                                ? "rgba(46, 159, 116, 0.05)"
                                : "rgba(225, 29, 72, 0.05)",
                            borderColor: tc.isHidden
                              ? "rgba(82, 82, 91, 0.2)"
                              : isPassed
                                ? "rgba(46, 159, 116, 0.15)"
                                : "rgba(225, 29, 72, 0.15)",
                          }}
                        >
                          <div className="flex items-center gap-2 min-w-0">
                            <TestIcon status={tc.status} isHidden={tc.isHidden} />
                            <Text
                              variant="small"
                              className={`truncate ${tc.isHidden ? "!text-[var(--color-tertiary)] italic" : ""}`}
                            >
                              {tc.methodName}
                            </Text>
                          </div>
                          <Text
                            variant="small"
                            weight="bold"
                            className={
                              isPassed
                                ? "!text-[var(--color-success)] shrink-0"
                                : "!text-[var(--color-error)] shrink-0"
                            }
                          >
                            {isPassed ? `+${displayScore}점` : "0점"}
                          </Text>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Hidden test case notice */}
              {detail.details.some((d) => d.isHidden) && (
                <div className="flex items-center gap-1.5 mb-4 px-3 py-2 rounded-lg bg-[var(--color-primaryLight)] border border-[var(--color-primaryBorder)]">
                  <EyeOff size={14} className="text-[var(--color-primary)] shrink-0" />
                  <Text variant="tiny" className="!text-[var(--color-muted)]">
                    히든 테스트 케이스는 메소드 이름이 숨겨집니다.
                  </Text>
                </div>
              )}

              {/* Repo info */}
              <div className="flex gap-3 mb-4">
                <div className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-background)] border border-[var(--color-border)]">
                  <Text variant="tiny" className="!text-[var(--color-muted)] mb-0.5 block">저장소 링크</Text>
                  <a
                    href={detail.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-[var(--color-sub)] hover:text-[var(--color-main)] transition-colors truncate block"
                  >
                    🔗 {detail.repoUrl.replace("https://github.com/", "")}
                  </a>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" size="md" onClick={onClose}>
                  닫기
                </Button>
                {onRetry && detail.repoUrl && (
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() => onRetry(detail.repoUrl)}
                    className="gap-1.5"
                  >
                    <RotateCcw size={14} />
                    이 코드로 재도전
                  </Button>
                )}
              </div>
            </>
          ) : null}
        </Card>
      </div>
    </div>
  );
}
