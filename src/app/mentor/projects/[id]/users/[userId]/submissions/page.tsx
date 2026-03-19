'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mentorProjectApi, AdminUserProjectSubmissionResponse } from '@/features/mentor-projects/api/projects';
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
import { Button } from '@/shared/components/ui/Button';
import { SubmissionStatusBadge } from '@/features/mentor-projects/ui/components/SubmissionStatusBadge';
import { AdminSubmissionDetailModal } from '@/features/mentor-projects/ui/components/AdminSubmissionDetailModal';
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils/cn';

export default function UserProjectSubmissionsPage() {
  const router = useRouter();
  const { id: projectId, userId } = useParams<{ id: string; userId: string }>();
  
  const [submissions, setSubmissions] = useState<AdminUserProjectSubmissionResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSubId, setSelectedSubId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        setIsLoading(true);
        const data = await mentorProjectApi.getUserProjectSubmissions(projectId, userId);
        setSubmissions(data);
      } catch (err) {
        setError('제출 이력을 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchSubmissions();
  }, [projectId, userId]);

  const handleRowClick = (submissionId: string) => {
    setSelectedSubId(submissionId);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-[800px] mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button 
            variant="ghost" 
            size="sm" 
            className="p-2 rounded-full h-10 w-10"
            onClick={() => router.back()}
        >
            <ArrowLeft size={20} />
        </Button>
        <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-white tracking-tight">제출 이력</h1>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>제출 일시</TableHead>
              <TableHead>상태</TableHead>
              <TableHead>점수</TableHead>
              <TableHead className="text-right">상세</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {submissions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-sub">
                  제출 내역이 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              submissions.map((sub) => (
                <TableRow 
                  key={sub.submissionId} 
                  className="cursor-pointer group hover:bg-white/5 transition-colors"
                  onClick={() => handleRowClick(sub.submissionId)}
                >
                  <TableCell className="text-sm">
                    {new Date(sub.submittedAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <SubmissionStatusBadge status={sub.status} />
                  </TableCell>
                  <TableCell>
                    <Text className={cn("font-bold", sub.score === 100 ? "text-emerald-400" : "text-white")}>
                      {sub.score !== null ? `${sub.score}점` : '-'}
                    </Text>
                  </TableCell>
                  <TableCell className="text-right">
                     <ChevronRight size={18} className="inline text-sub group-hover:text-primary transition-colors" />
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
    </div>
  );
}
