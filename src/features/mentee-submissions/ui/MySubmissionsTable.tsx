import { ChevronRight, Search } from 'lucide-react';
import React, { useState } from 'react';

import { SubmissionDetailModal } from '@/features/project-details/ui/SubmissionDetailModal';
import { PageResponse } from '@/shared/api/types';
import { Badge, type BadgeIntent, type BadgeTone } from '@/shared/components/ui/badge/Badge';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Pagination } from '@/shared/components/ui/pagination/Pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/Table';
import { formatDate, timeAgo } from '@/shared/utils/date';

import type { GlobalSubmission, SubmissionStatus } from '@/features/mentor-projects/model/submission';

// ── 결과 배지 ────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: SubmissionStatus }) {
  const statusMap: Record<SubmissionStatus, { intent: BadgeIntent; tone: BadgeTone; label: string }> = {
    PENDING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
    ENQUEUING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
    QUEUED: { intent: 'neutral', tone: 'soft', label: '대기 중' },
    RUNNING: { intent: 'warning', tone: 'soft', label: '채점 중' },
    PROCESSING: { intent: 'warning', tone: 'soft', label: '채점 중' },
    COMPLETED: { intent: 'success', tone: 'soft', label: '성공' },
    WRONG_ANSWER: { intent: 'danger', tone: 'soft', label: '오답' },
    SYSTEM_ERROR: { intent: 'danger', tone: 'soft', label: '시스템 에러' },
    CANCELLED: { intent: 'neutral', tone: 'soft', label: '취소됨' },
    COMPILE_ERROR: { intent: 'danger', tone: 'soft', label: '컴파일 에러' },
    RUNTIME_ERROR: { intent: 'danger', tone: 'soft', label: '런타임 에러' },
    TIME_LIMIT_EXCEEDED: { intent: 'warning', tone: 'soft', label: '시간 초과' },
    MEMORY_LIMIT_EXCEEDED: { intent: 'warning', tone: 'soft', label: '메모리 초과' },
  };

  const config = statusMap[status] || statusMap.PENDING;

  return (
    <Badge
      intent={config.intent}
      tone={config.tone}
      size="sm"
      className="font-bold tracking-wider px-3"
    >
      {config.label}
    </Badge>
  );
}


// ── 필터 탭 ──────────────────────────────────────────────────────────
const FILTER_OPTIONS = ['ALL', 'PASS', 'FAIL'] as const;
type FilterOption = typeof FILTER_OPTIONS[number];

// ── 메인 컴포넌트 ─────────────────────────────────────────────────────
interface MySubmissionsTableProps {
  data?: PageResponse<GlobalSubmission>;
  page: number;
  onPageChange: (page: number) => void;
  pageSize: number;
}

export function MySubmissionsTable({ 
  data, 
  page, 
  onPageChange, 
  pageSize 
}: MySubmissionsTableProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('ALL');
  const [selectedSubmission, setSelectedSubmission] = useState<{ subId: string; projectId: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submissions = data?.content || [];
  const totalElements = data?.totalElements || 0;

  // NOTE: Server-side filtering is not implemented in the backend yet for this endpoint, 
  // but we should at least handle the pagination correctly.
  // For now, we use the server-side pagination data.
  
  const handleRowClick = (submissionId: string, projectId: string) => {
    setSelectedSubmission({ subId: submissionId, projectId });
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── 필터 바 ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-[320px]">
          <InputBox
            placeholder="프로젝트 제목 검색..."
            icon={<Search size={18} />}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex p-1 bg-surface ring-1 ring-white/10 rounded-lg">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setFilter(opt)}
              className={`px-5 py-1.5 rounded-md text-sm font-semibold transition-all ${filter === opt
                ? 'bg-red-950 text-red-400 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* ── 테이블 ── */}
      <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">제출번호</TableHead>
              <TableHead className="w-[150px] text-center">제출 시각</TableHead>
              <TableHead className="w-[115px] text-center">제출 시간</TableHead>
              <TableHead className="w-[300px]">프로젝트 제목</TableHead>
              <TableHead className="w-[100px] text-center">결과</TableHead>
              <TableHead className="w-[110px] text-center">메모리</TableHead>
              <TableHead className="w-[90px]  text-center">시간</TableHead>
              <TableHead className="w-[110px] text-center">언어</TableHead>
              <TableHead className="w-[100px] text-center">상세보기</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {submissions.map((s, index) => (
              <TableRow
                key={s.submissionId}
                className="group cursor-pointer hover:bg-white/5"
                onClick={() => handleRowClick(s.submissionId, s.projectId)}
              >
                {/* 제출번호 */}
                <TableCell className="text-center font-mono text-zinc-500 text-xs">
                  {totalElements - (page * pageSize + index)}
                </TableCell>

                {/* 제출 시간 */}
                <TableCell className="text-center font-mono text-zinc-400 text-xs text-nowrap">
                  {formatDate(s.submittedAt)}
                </TableCell>


                {/* 제출한 시간 (상대) */}
                <TableCell className="text-center text-xs text-zinc-500">
                  {timeAgo(s.submittedAt)}
                </TableCell>

                {/* 문제 이름 */}
                <TableCell>
                  <span className="text-zinc-200 text-sm">{s.problemTitle}</span>
                </TableCell>

                {/* 결과 */}
                <TableCell className="text-center">
                  <StatusBadge status={s.status} />
                </TableCell>

                {/* 메모리 */}
                <TableCell className="text-center text-sm text-zinc-400">
                  {s.memoryUsage !== null ? (
                    <>{s.memoryUsage.toLocaleString()} <span className="text-zinc-600 text-xs">KB</span></>
                  ) : (
                    <span className="text-zinc-600">-</span>
                  )}
                </TableCell>

                {/* 시간 */}
                <TableCell className="text-center text-sm text-zinc-400">
                  {s.timeUsage !== null ? (
                    <>{s.timeUsage} <span className="text-zinc-600 text-xs">ms</span></>
                  ) : (
                    <span className="text-zinc-600">-</span>
                  )}
                </TableCell>

                {/* 언어 */}
                <TableCell className="text-center">
                  {s.language ? (
                    <span className="text-zinc-400 text-sm font-mono">
                      {s.language}
                    </span>
                  ) : (
                    <span className="text-zinc-600">-</span>
                  )}
                </TableCell>

                {/* 상세보기 */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-0.5 text-sm text-zinc-400 group-hover:text-primary transition-colors">
                    상세 보기 <ChevronRight size={15} />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {submissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="h-32 text-center text-zinc-500">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* 총 건수 및 페이지네이션 */}
      <div className="flex justify-center mt-4 pt-4">
        <Pagination
          total={totalElements}
          currentPage={page + 1}
          pageSize={pageSize}
          onPageChange={(p) => onPageChange(p - 1)}
        />
      </div>

      {isModalOpen && selectedSubmission && (
        <SubmissionDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          submissionId={selectedSubmission.subId}
          projectId={selectedSubmission.projectId}
        />
      )}
    </div>
  );
}
