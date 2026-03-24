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
    COMPLETED: { intent: 'success', tone: 'soft', label: '성공' },
    WRONG_ANSWER: { intent: 'danger', tone: 'soft', label: '실패' },
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
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('ALL');
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 로컬 필터링 로직
  const filteredSubmissions = (submissions || []).filter(s => {
    const matchesSearch = 
      s.problemTitle.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = 
      filter === 'ALL' || 
      (filter === 'PASS' && s.status === 'COMPLETED') || 
      (filter === 'FAIL' && s.status !== 'COMPLETED' && !['PENDING', 'RUNNING', 'ENQUEUING', 'QUEUED', 'PROCESSING'].includes(s.status));
    
    return matchesSearch && matchesFilter;
  });

  const handleRowClick = (submissionId: string) => {
    setSelectedSubId(submissionId);
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ── 필터 바 ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-[320px]">
          <InputBox
            placeholder="이름 또는 제목 검색..."
            icon={<Search size={18} />}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex p-1 bg-surface ring-1 ring-white/10 rounded-lg">
          {FILTER_OPTIONS.map((opt) => {
            const isActive = filter === opt;
            const activeColors = {
              ALL: 'bg-white/15 text-white shadow-sm ring-1 ring-white/20',
              PASS: 'bg-emerald-500/20 text-emerald-400 shadow-sm ring-1 ring-emerald-500/30',
              FAIL: 'bg-rose-500/20 text-rose-400 shadow-sm ring-1 ring-rose-500/30'
            };

            return (
              <button
                key={opt}
                type="button"
                onClick={() => setFilter(opt)}
                className={`px-5 py-1.5 rounded-md text-sm font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? activeColors[opt] 
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 테이블 ── */}
      <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest">No</TableHead>
              <TableHead className="w-[180px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest">제출 시각</TableHead>
              <TableHead className="w-[115px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest">제출 시간</TableHead>
              <TableHead className="w-[100px] text-zinc-500 font-bold uppercase text-[11px] tracking-widest pl-4">이름</TableHead>
              <TableHead className="w-[350px] text-left text-zinc-500 font-bold uppercase text-[11px] tracking-widest pl-8">프로젝트 제목</TableHead>
              <TableHead className="w-[100px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest">결과</TableHead>
              <TableHead className="w-[100px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest">점수</TableHead>
              <TableHead className="w-[110px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest">유형</TableHead>
              <TableHead className="w-[50px] text-center text-zinc-500 font-bold uppercase text-[11px] tracking-widest"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredSubmissions.map((s, index) => (
              <TableRow
                key={s.submissionId}
                className="group cursor-pointer hover:bg-white/5"
                onClick={() => handleRowClick(s.submissionId)}
              >
                {/* No */}
                <TableCell className="text-center font-mono text-zinc-500 text-xs">
                  {totalElements - ((currentPage - 1) * pageSize + index)}
                </TableCell>

                {/* 제출 시각 (1줄 표시) */}
                <TableCell className="text-center font-mono text-zinc-400 text-xs text-nowrap">
                  {formatDate(s.submittedAt)}
                </TableCell>


                {/* 제출한 시간 (상대) */}
                <TableCell className="text-center text-xs text-zinc-500">
                  {timeAgo(s.submittedAt)}
                </TableCell>


                {/* 이름 */}
                <TableCell className="pl-4">
                  <span className="font-semibold text-white">{s.name}</span>
                </TableCell>

                {/* 프로젝트 제목 */}
                <TableCell className="pl-8 text-left">
                  <span className="text-zinc-200 text-sm">{s.problemTitle}</span>
                </TableCell>

                {/* 결과 */}
                <TableCell className="text-center">
                  <StatusBadge status={s.status} />
                </TableCell>

                {/* 점수 */}
                <TableCell className="text-center">
                  <span className={`text-sm font-mono ${s.score === 100 ? 'text-emerald-400' : 'text-zinc-200'}`}>
                    {s.score ?? 0}<span className="text-zinc-500 text-xs">/100</span>
                  </span>
                </TableCell>

                {/* 유형 */}
                <TableCell className="text-center">
                  <span className="text-zinc-400 text-sm font-mono">
                    {s.projectType}
                  </span>
                </TableCell>

                {/* 상세보기 아이콘 */}
                <TableCell className="text-center px-0">
                  <div className="flex items-center justify-center text-zinc-400 group-hover:text-primary transition-colors pr-4">
                    <ChevronRight size={18} />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {(!filteredSubmissions || filteredSubmissions.length === 0) && (
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
