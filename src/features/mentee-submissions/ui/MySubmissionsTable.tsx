import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

import { Text } from '@/shared/components/ui/Text';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Badge } from '@/shared/components/ui/badge/Badge';
import { Pagination } from '@/shared/components/ui/pagination/Pagination';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/components/ui/Table';
import { SubmissionDetailModal } from '@/features/project-details/ui/SubmissionDetailModal';
import { PageResponse } from '@/shared/api/types';
import { formatDateTime } from '@/shared/utils/date';

import type { GlobalSubmission, SubmissionStatus } from '@/features/mentor-projects/model/submission';

// ── 상대 시간 변환 ────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  if (!dateStr || typeof dateStr !== 'string') return '-';
  const past = new Date(dateStr.replace(' ', 'T'));
  if (isNaN(past.getTime())) return '-';
  const now = new Date();
  const diff = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

// ── 결과 배지 ────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: SubmissionStatus }) {
  if (status === 'PASS' || status === 'COMPLETED') { // Backend might return COMPLETED
    return (
      <Badge
        intent="success"
        tone="soft"
        size="sm"
        className="text-emerald-400 border-emerald-400/30 font-bold tracking-wider px-3"
      >
        PASS
      </Badge>
    );
  }
  if (status === 'FAIL' || status === 'SYSTEM_ERROR') {
    return (
      <Badge
        intent="danger"
        tone="soft"
        size="sm"
        className="text-red-400 border-red-400/30 font-bold tracking-wider px-3"
      >
        FAIL
      </Badge>
    );
  }
  return (
    <Badge
      intent="neutral"
      tone="soft"
      size="sm"
      className="text-zinc-500 border-white/10 font-bold tracking-wider px-3"
    >
      {status || 'PENDING'}
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
                <TableCell className="text-center font-mono text-zinc-400 text-xs">
                  {formatDateTime(s.submittedAt)}
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
