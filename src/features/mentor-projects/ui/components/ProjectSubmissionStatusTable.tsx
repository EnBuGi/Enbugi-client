import React, { useState } from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/shared/components/ui/Table';
import { Card } from '@/shared/components/ui/Card/Card';
import { Text } from '@/shared/components/ui/Text';
import { cn } from '@/shared/utils/cn';
import { AdminProjectSubmissionSummaryResponse } from '../../api/projects';
import { SubmissionStatusBadge } from './SubmissionStatusBadge';
import { AdminSubmissionDetailModal } from './AdminSubmissionDetailModal';
import Link from 'next/link';

interface ProjectSubmissionStatusTableProps {
  submissions: AdminProjectSubmissionSummaryResponse[];
  projectId: string;
}

export function ProjectSubmissionStatusTable({ submissions, projectId }: ProjectSubmissionStatusTableProps) {
  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (userId: string) => {
    // Current data doesn't have submissionId in the summary response, 
    // but the backend uses the latest submission. 
    // However, the summary response should probably include the latest submissionId.
    // Let's check the API response type. 
  };

  return (
    <>
      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>이름</TableHead>
              <TableHead>최종 상태</TableHead>
              <TableHead>최종 점수</TableHead>
              <TableHead>마지막 제출</TableHead>
              <TableHead className="text-right">조작</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-sub">
                  제출 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((sub) => (
                <TableRow 
                  key={sub.userId} 
                  className="group cursor-pointer hover:bg-white/5"
                  onClick={() => {
                    if (sub.submissionId) {
                      setSelectedSubId(sub.submissionId);
                      setIsModalOpen(true);
                    }
                  }}
                >
                  <TableCell className="font-medium text-white">{sub.name}</TableCell>
                  <TableCell>
                    <SubmissionStatusBadge status={sub.status} />
                  </TableCell>
                  <TableCell>
                    <Text className={cn("font-bold", sub.score === 100 ? "text-emerald-400" : "text-white")}>
                      {sub.score !== null ? `${sub.score}점` : '-'}
                    </Text>
                  </TableCell>
                  <TableCell className="text-sub text-xs">
                    {sub.lastSubmittedAt ? new Date(sub.lastSubmittedAt).toLocaleString() : '-'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-4">
                      <Link 
                        href={`/mentor/projects/${projectId}/users/${sub.userId}/submissions`}
                        className="text-xs text-primary hover:underline font-medium"
                      >
                        제출 이력
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
      
      <AdminSubmissionDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        submissionId={selectedSubId} 
      />
    </>
  );
}
