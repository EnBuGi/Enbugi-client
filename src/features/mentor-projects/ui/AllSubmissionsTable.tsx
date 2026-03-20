import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';

import { Text } from '@/shared/components/ui/Text';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Badge, type BadgeIntent, type BadgeTone } from '@/shared/components/ui/badge/Badge';
import { formatDate, timeAgo } from '@/shared/utils/date';
import { Pagination } from '@/shared/components/ui/pagination/Pagination';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/components/ui/Table';
import { AdminSubmissionDetailModal } from './components/AdminSubmissionDetailModal';

import type { GlobalSubmission, SubmissionStatus } from "../model/submission";


// ── 결과 배지 ────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: SubmissionStatus }) {
  const statusMap: Record<SubmissionStatus, { intent: BadgeIntent; tone: BadgeTone; label: string }> = {
    PENDING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
    ENQUEUING: { intent: 'neutral', tone: 'soft', label: '대기 중' },
    QUEUED: { intent: 'neutral', tone: 'soft', label: '대기 중' },
    RUNNING: { intent: 'warning', tone: 'soft', label: '채점 중' },
    PROCESSING: { intent: 'warning', tone: 'soft', label: '채점 중' },
    SUCCESS: { intent: 'success', tone: 'soft', label: '성공' },
    COMPLETED: { intent: 'success', tone: 'soft', label: '성공' },
    FAILURE: { intent: 'danger', tone: 'soft', label: '실패' },
    ERROR: { intent: 'danger', tone: 'soft', label: '에러' },
    SYSTEM_ERROR: { intent: 'danger', tone: 'soft', label: '시스템 에러' },
    CANCELLED: { intent: 'neutral', tone: 'soft', label: '취소됨' },
    PASS: { intent: 'success', tone: 'soft', label: 'PASS' },
    FAIL: { intent: 'danger', tone: 'soft', label: 'FAIL' },
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
interface AllSubmissionsTableProps {
  submissions: GlobalSubmission[];
  totalElements: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export function AllSubmissionsTable({ 
  submissions, 
  totalElements, 
  currentPage, 
  pageSize, 
  onPageChange 
}: AllSubmissionsTableProps) {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (submissionId: string) => {
    setSelectedSubId(submissionId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── 테이블 ── */}
      <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-center">제출번호</TableHead>
              <TableHead className="w-[150px] text-center">제출 시각</TableHead>
              <TableHead className="w-[115px] text-center">제출 시간</TableHead>
              <TableHead className="w-[100px]">이름</TableHead>
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
                onClick={() => handleRowClick(s.submissionId)}
              >
                {/* 제출번호 */}
                <TableCell className="text-center font-mono text-zinc-500 text-xs">
                  {totalElements - ((currentPage - 1) * pageSize + index)}
                </TableCell>

                {/* 제출 시간 */}
                <TableCell className="text-center font-mono text-zinc-400 text-xs text-nowrap">
                  {formatDate(s.submittedAt)}
                </TableCell>


                {/* 제출한 시간 (상대) */}
                <TableCell className="text-center text-xs text-zinc-500">
                  {timeAgo(s.submittedAt)}
                </TableCell>


                {/* 이름 */}
                <TableCell>
                  <span className="font-semibold text-white">{s.name}</span>
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

            {(!submissions || submissions.length === 0) && (
              <TableRow>
                <TableCell colSpan={10} className="h-32 text-center text-zinc-500">
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
          currentPage={currentPage}
          pageSize={pageSize}
          onPageChange={onPageChange}
        />
      </div>

      <AdminSubmissionDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submissionId={selectedSubId}
      />
    </div>
  );
}
