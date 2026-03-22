'use client';

import { Modal } from '@/shared/components/ui/Modal';
import { Text } from '@/shared/components/ui/Text';
import { cn } from '@/shared/utils/cn';
import { Activity, CheckCircle2, Clock, Database, ExternalLink, Loader2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { AdminSubmissionDetailResponse, mentorProjectApi } from '../../api/projects';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';

interface AdminSubmissionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string | null;
}

export function AdminSubmissionDetailModal({ isOpen, onClose, submissionId }: AdminSubmissionDetailModalProps) {
  const [detail, setDetail] = useState<AdminSubmissionDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && submissionId) {
      const fetchDetail = async () => {
        try {
          setIsLoading(true);
          const data = await mentorProjectApi.getAdminSubmissionDetail(submissionId);
          setDetail(data);
        } catch (err) {
          setError('제출 정보를 불러오는 중 오류가 발생했습니다.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetail();
    } else {
      setDetail(null);
    }
  }, [isOpen, submissionId]);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`제출 상세 정보 ${detail ? `- ${detail.userName}` : ''}`}
      size="lg"
    >
      {isLoading ? (
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
          
          {/* Dashboard Stats Grid (Option 3) */}
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
            <StatCard 
              label="실행 시간" 
              value={detail.timeExecution ? `${detail.timeExecution}ms` : '-'}
              icon={<Clock size={16} className="text-amber-400" />}
            />
            <StatCard 
              label="메모리" 
              value={detail.memoryUsage ? `${detail.memoryUsage.toFixed(1)}MB` : '-'}
              icon={<Database size={16} className="text-indigo-400" />}
            />
          </div>

          {/* GitHub Repository Link */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-primary/30 transition-colors">
            <div className="space-y-1">
              <Text variant="tiny" className="text-sub uppercase tracking-widest font-bold">소스 코드 레포지토리</Text>
              <Text className="text-sm font-mono truncate max-w-[400px] text-white/80">{detail.repoUrl}</Text>
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
                총 {detail.testDetails?.length || 0}개 케이스
              </Text>
            </div>

            <div className="space-y-3">
              {detail.testDetails?.map((test, idx) => (
                <div key={idx} className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                  <div className="p-4 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        {test.status === 'COMPLETED' ? (
                          <CheckCircle2 size={18} className="text-emerald-400" />
                        ) : (
                          <XCircle size={18} className="text-rose-400" />
                        )}
                        <div>
                          <Text className="font-bold text-white/90">{test.methodName}</Text>
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
                  {test.message && (
                    <div className="px-4 pb-4 pt-0">
                      <div className="bg-black/40 p-3 rounded-lg border border-white/5">
                        <pre className="text-xs font-mono text-rose-400 whitespace-pre-wrap break-all leading-relaxed">
                          {test.message}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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
