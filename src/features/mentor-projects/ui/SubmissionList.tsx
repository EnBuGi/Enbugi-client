'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ArrowLeft, Users, Clock, CheckCircle2, XCircle, ChevronRight } from 'lucide-react';

import { Text } from '@/shared/components/ui/Text';
import { Button } from '@/shared/components/ui/Button';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Card } from '@/shared/components/ui/Card/Card';
import { Badge } from '@/shared/components/ui/badge/Badge';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/components/ui/Table';

import { useMentorSubmissions } from '@/features/mentor-projects/hooks/useSubmissions';

export function SubmissionList({ projectId, projectTitle }: { projectId: string; projectTitle: string }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'PASS' | 'FAIL' | '미제출'>('ALL');

  const { data: submissions = [], isLoading } = useMentorSubmissions(projectId);

  const stats = {
    total: submissions.length,
    submitted: submissions.filter(s => s.status !== null).length,
    pass: submissions.filter(s => s.status === 'COMPLETED' && s.score !== null && s.score === 100).length,
    fail: submissions.filter(s => s.status !== null && (s.status !== 'COMPLETED' || (s.score !== null && s.score < 100)) && !['PENDING', 'ENQUEUING', 'QUEUED', 'RUNNING', 'PROCESSING'].includes(s.status)).length,
  };

  const filteredSubmissions = (submissions || []).filter(sub => {
    const name = sub.name || '';
    const githubId = sub.githubId || '';
    const matchesSearch = name.includes(search) || githubId.includes(search);
    
    const isSubmitted = sub.status !== null;
    const isPass = sub.status === 'COMPLETED' && sub.score !== null && sub.score === 100;
    const isFail = sub.status !== null && (sub.status !== 'COMPLETED' || (sub.score !== null && sub.score < 100)) && !['PENDING', 'ENQUEUING', 'QUEUED', 'RUNNING', 'PROCESSING'].includes(sub.status);
    
    if (filterType === 'PASS') return matchesSearch && isPass;
    if (filterType === 'FAIL') return matchesSearch && isFail;
    if (filterType === '미제출') return matchesSearch && !isSubmitted;
    return matchesSearch;
  }).sort((a, b) => {
    const dateA = a.lastSubmittedAt || '';
    const dateB = b.lastSubmittedAt || '';
    return dateB.localeCompare(dateA);
  });

  const getStatusBadgeOptions = (status: string | null) => {
    switch (status) {
      case 'COMPLETED': return { intent: 'success' as const, tone: 'soft' as const, text: 'PASS', colorClass: 'text-emerald-400 border-emerald-400/30' };
      case 'SYSTEM_ERROR': return { intent: 'danger' as const, tone: 'soft' as const, text: 'FAIL', colorClass: 'text-red-400 border-red-400/30' };
      case 'PROCESSING': return { intent: 'neutral' as const, tone: 'soft' as const, text: '채점 중', colorClass: 'text-blue-400 border-blue-400/30' };
      default: return { intent: 'neutral' as const, tone: 'soft' as const, text: '미제출', colorClass: 'text-zinc-500 border-white/10' };
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-start gap-4">
        <button
          onClick={() => router.push('/mentor/projects')}
          className="mt-1 p-2 bg-surfaceHighlight/30 hover:bg-surfaceHighlight/60 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white mb-4">
            제출 현황
          </h1>
          <Text variant="large" className="text-zinc-400 font-medium">
            {projectTitle}
          </Text>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 flex flex-col gap-3 justify-between">
          <div className="flex justify-between items-center text-zinc-400">
            <Text variant="small" className="font-semibold">전체 인원</Text>
            <Users size={18} />
          </div>
          <Text variant="display-xl" className="text-white font-bold">{stats.total}</Text>
        </Card>
        <Card className="p-5 flex flex-col gap-3 justify-between">
          <div className="flex justify-between items-center text-zinc-400">
            <Text variant="small" className="font-semibold">제출 인원</Text>
            <Clock size={18} />
          </div>
          <Text variant="display-xl" className="text-white font-bold">{stats.submitted}</Text>
        </Card>
        <Card className="p-5 flex flex-col gap-3 justify-between border-emerald-900/30">
          <div className="flex justify-between items-center text-emerald-500">
            <Text variant="small" className="font-semibold tracking-widest">PASS</Text>
            <CheckCircle2 size={18} />
          </div>
          <Text variant="display-xl" className="text-white font-bold">{stats.pass}</Text>
        </Card>
        <Card className="p-5 flex flex-col gap-3 justify-between border-red-900/30">
          <div className="flex justify-between items-center text-red-500">
            <Text variant="small" className="font-semibold tracking-widest">FAIL</Text>
            <XCircle size={18} />
          </div>
          <Text variant="display-xl" className="text-white font-bold">{stats.fail}</Text>
        </Card>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="w-full sm:w-[320px]">
          <InputBox
            placeholder="이름 검색..."
            icon={<Search size={18} />}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex p-1 bg-surface ring-1 ring-white/10 rounded-lg">
          {(['ALL', 'PASS', 'FAIL', '미제출'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-5 py-1.5 rounded-md text-sm font-semibold transition-all ${filterType === type
                ? 'bg-red-950 text-red-400 shadow-sm'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">이름</TableHead>
              <TableHead className="w-[120px] text-center">상태</TableHead>
              <TableHead className="w-[150px] text-center">최고 점수</TableHead>
              <TableHead className="w-[250px] text-center">마지막 제출 시각</TableHead>
              <TableHead className="w-[150px] text-center">상세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSubmissions.map((sub) => {
              const bgBadge = getStatusBadgeOptions(sub.status);

              return (
                <TableRow 
                  key={sub.userId} 
                  className="group cursor-pointer hover:bg-white/5" 
                  onClick={() => router.push(`/mentor/projects/${projectId}/users/${sub.userId}/submissions`)}
                >
                  <TableCell>
                    <div className="flex flex-col gap-1 pl-4">
                      <span className="font-semibold text-white tracking-wide">{sub.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      intent={bgBadge.intent}
                      tone={bgBadge.tone}
                      size="sm"
                      className={bgBadge.colorClass}
                    >
                      {bgBadge.text}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {sub.score !== null ? (
                      <span className="text-white font-bold tracking-widest text-base">
                        {sub.score} <span className="text-xs text-zinc-500 font-normal tracking-wide">/ 100</span>
                      </span>
                    ) : (
                      <span className="text-zinc-500">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center text-zinc-400 text-sm font-mono">
                    {sub.lastSubmittedAt ? new Date(sub.lastSubmittedAt).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1 text-sm text-zinc-400 group-hover:text-primary transition-colors">
                      상세 보기 <ChevronRight size={16} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredSubmissions.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-zinc-500">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
}
