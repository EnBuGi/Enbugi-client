import * as React from 'react';
import { Card } from '@/shared/components/ui/Card/Card';
import { Text } from '@/shared/components/ui/Text';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/shared/components/ui/Table';
import { AdminSubmissionDetailResponse } from '../../api/projects';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';
import { cn } from '@/shared/utils/cn';

interface AdminSubmissionDetailViewProps {
  detail: AdminSubmissionDetailResponse;
}

export function AdminSubmissionDetailView({ detail }: AdminSubmissionDetailViewProps) {
  return (
    <div className="space-y-6">
      {/* Overview Head */}
      <div className="flex items-center justify-between bg-surfaceStrong/30 p-4 rounded-xl border border-white/5">
        <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Text variant="large" className="font-bold text-primary">{detail.userName[0]}</Text>
            </div>
            <div>
                <Text variant="large" className="font-bold">{detail.userName}</Text>
            </div>
        </div>
        <div className="flex gap-10 items-center">
            <div className="text-right">
                <Text variant="tiny" className="text-sub block uppercase tracking-wider mb-1">Status</Text>
                <SubmissionStatusBadge status={detail.status} />
            </div>
            <div className="text-right">
                <Text variant="tiny" className="text-sub block uppercase tracking-wider mb-1">Score</Text>
                <Text variant="h2" className={cn("font-bold", detail.score === 100 ? "text-emerald-400" : "text-white")}>
                    {detail.score}점
                </Text>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Execution Info */}
        <Card className="p-6 space-y-4">
            <Text variant="h4" className="font-bold">실행 정보</Text>
            <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <Text variant="small" className="text-sub">제출 시간</Text>
                    <Text variant="small">{new Date(detail.submittedAt).toLocaleString()}</Text>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <Text variant="small" className="text-sub">메모리 사용량</Text>
                    <Text variant="small">{detail.memoryUsage ? `${detail.memoryUsage.toFixed(2)} MB` : '-'}</Text>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <Text variant="small" className="text-sub">실행 시간</Text>
                    <Text variant="small">{detail.timeExecution ? `${detail.timeExecution} ms` : '-'}</Text>
                </div>
                <div className="py-2">
                    <Text variant="small" className="text-sub block mb-1">레포지토리</Text>
                    <a href={detail.repoUrl} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline break-all">
                        {detail.repoUrl}
                    </a>
                </div>
            </div>
        </Card>

        {/* Right: Test Results */}
        <Card className="lg:col-span-2 p-0 overflow-hidden">
            <div className="p-6 border-b border-white/5">
                 <Text variant="h4" className="font-bold">테스트 상세 결과</Text>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>메소드</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead>점수</TableHead>
                        <TableHead>시간</TableHead>
                        <TableHead>메시지</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {detail.testDetails.map((test, idx) => (
                        <TableRow key={idx}>
                            <TableCell className="font-mono text-xs">
                                {test.methodName}
                                {test.isHidden && <span className="ml-2 px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[10px] border border-amber-500/20">Hidden</span>}
                            </TableCell>
                            <TableCell>
                                <SubmissionStatusBadge status={test.status} className="h-7 text-[11px]" />
                            </TableCell>
                            <TableCell>
                                <Text variant="small" className={cn("font-medium", test.status === 'SUCCESS' ? "text-emerald-400" : "text-white")}>
                                    {test.score}점
                                </Text>
                            </TableCell>
                            <TableCell className="text-sub text-xs">{test.durationMs}ms</TableCell>
                            <TableCell className="max-w-[200px] truncate text-sub text-xs">
                                {test.message || '-'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
      </div>

      {/* Code Section */}
      <Card className="p-0 overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
             <Text variant="h4" className="font-bold">제출 소스 코드</Text>
             <Text variant="tiny" className="text-sub uppercase font-mono tracking-widest">JAVA</Text>
        </div>
        <div className="bg-[#0D1117] p-6 overflow-auto max-h-[600px]">
            <pre className="font-mono text-sm text-emerald-300 leading-relaxed whitespace-pre">
                <code>{detail.sourceCode}</code>
            </pre>
        </div>
      </Card>
    </div>
  );
}
