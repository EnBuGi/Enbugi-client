"use client";

import React, { useEffect, useState } from "react";
import { X, RotateCcw, CheckCircle2, XCircle, Activity, Clock, Database, ExternalLink, Loader2 } from "lucide-react";
import { Modal } from "../../../shared/components/ui/Modal";
import { Text } from "../../../shared/components/ui/Text";
import { Button } from "../../../shared/components/ui/Button";
import { projectApi } from "../api/project";
import type { SubmissionDetail, TestDetailResult } from "../model/project";
import { cn } from "../../../shared/utils/cn";
import { SubmissionStatusBadge } from "../../../shared/components/ui/submission/SubmissionStatusBadge";

interface Props {
  projectId: string;
  submissionId: string;
  isOpen: boolean;
  onClose: () => void;
  onRetry?: (repoUrl: string) => void;
}

export function SubmissionDetailModal({ projectId, submissionId, isOpen, onClose, onRetry }: Props) {
  const [detail, setDetail] = useState<SubmissionDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && submissionId) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await projectApi.getSubmissionDetail(projectId, submissionId);
          setDetail(data);
        } catch (e: any) {
          setError(e.message || "상세 정보를 불러올 수 없습니다.");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    } else {
      setDetail(null);
    }
  }, [projectId, submissionId, isOpen]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="제출 상세 결과"
      size="lg"
    >
      {loading ? (
        <div className="flex flex-col items-center justify-center p-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <Text className="text-sub">정보를 불러오는 중입니다...</Text>
        </div>
      ) : error ? (
        <div className="p-20 text-center text-rose-400">
          <Text>{error}</Text>
        </div>
      ) : detail ? (
        <div className="p-6 space-y-8 bg-surfaceStrong">
          
          {/* Dashboard Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard 
              label="상태" 
              value={<SubmissionStatusBadge status={detail.status} />}
              icon={<Activity size={16} className="text-primary" />}
            />
            <StatCard 
              label="점수" 
              value={detail.score !== null ? `${detail.score} / 100` : '-'}
              icon={<CheckCircle2 size={16} className="text-emerald-400" />}
              highlight={detail.score === 100}
            />
            {/* Note: In mentee API, duration is not explicitly in top level sometimes, but available in details. 
                Using the first test's duration or similar if needed, or just showing score for now.
                Actually, Mentee SubmissionDetail has score, totalTests, passedTests. 
            */}
            <StatCard 
              label="패스 여부" 
              value={`${detail.passedTests ?? 0} / ${detail.totalTests ?? 0}`}
              icon={<CheckCircle2 size={16} className="text-emerald-400" />}
            />
            <StatCard 
              label="제출일" 
              value={new Date(detail.submittedAt).toLocaleDateString()}
              icon={<Clock size={16} className="text-amber-400" />}
            />
          </div>

          {/* Repository Info */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors">
            <div className="space-y-1">
              <Text variant="tiny" className="text-sub uppercase tracking-widest font-bold">제출 저장소</Text>
              <Text className="text-sm font-mono truncate max-w-[400px] text-white/80">
                {detail.repoUrl.replace("https://github.com/", "")}
              </Text>
            </div>
            <a 
              href={detail.repoUrl} 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-surfaceHighlight text-white text-xs font-bold flex items-center gap-2 hover:bg-primary transition-colors"
            >
              GitHub 열기 <ExternalLink size={14} />
            </a>
          </div>

          {/* Test Results Header */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Text variant="h4" className="font-bold">테스트 상세 결과</Text>
              <Text variant="small" className="text-sub">
                총 {detail.details.length}개 케이스
              </Text>
            </div>

            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
              {detail.details.map((test, idx) => {
                const isPassed = test.status === "PASSED";
                return (
                  <div key={idx} className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                    <div className="p-4 flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          {isPassed ? (
                            <CheckCircle2 size={18} className="text-emerald-400" />
                          ) : (
                            <XCircle size={18} className="text-rose-400" />
                          )}
                          <div>
                            <Text className={cn("font-bold", test.isHidden ? "text-white/40 italic" : "text-white/90")}>
                              {test.methodName}
                            </Text>
                            {test.isHidden && (
                              <span className="text-[10px] bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded ml-2 border border-amber-500/20">Hidden</span>
                            )}
                          </div>
                       </div>
                       <div className="flex items-center gap-6">
                          <div className="text-right">
                             <Text variant="tiny" className="text-sub block uppercase">점수</Text>
                             <Text variant="small" className="font-bold">{test.score}점</Text>
                          </div>
                          <div className="text-right">
                             <Text variant="tiny" className="text-sub block uppercase">시간</Text>
                             <Text variant="small" className="font-mono">{test.durationMs}ms</Text>
                          </div>
                       </div>
                    </div>
                    {test.message && !test.isHidden && (
                      <div className="px-4 pb-4 pt-0">
                        <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                          <pre className="text-xs font-mono text-rose-400 whitespace-pre-wrap break-all leading-relaxed">
                            {test.message}
                          </pre>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/5">
            <Button variant="secondary" size="md" onClick={onClose}>
              닫기
            </Button>
            {onRetry && detail.repoUrl && (
              <Button
                variant="primary"
                size="md"
                onClick={() => onRetry(detail.repoUrl)}
                className="gap-2"
              >
                <RotateCcw size={14} />
                재도전하기
              </Button>
            )}
          </div>
        </div>
      ) : null}
    </Modal>
  );
}

function StatCard({ label, value, icon, highlight = false }: { label: string, value: React.ReactNode, icon: React.ReactNode, highlight?: boolean }) {
  return (
    <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <Text variant="tiny" className="text-sub uppercase font-bold tracking-wider">{label}</Text>
      </div>
      <div className={cn("text-xl font-bold font-mono", highlight ? "text-emerald-400" : "text-white")}>
        {value}
      </div>
    </div>
  );
}

