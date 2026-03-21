'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, PencilLine, Trash2, FileText, Plus } from 'lucide-react';

import { Button } from '@/shared/components/ui/Button';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Select } from '@/shared/components/ui/select/Select';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/shared/components/ui/Table';
import { Badge } from '@/shared/components/ui/badge/Badge';
import { Text } from '@/shared/components/ui/Text';
import { Pagination } from '@/shared/components/ui/pagination/Pagination';
import { useRouter } from 'next/navigation';
import { useMentorProjects } from '@/features/mentor-projects/hooks/useProjects';
import { ConfirmModal } from '@/shared/components/ui/ConfirmModal';
import type { MentorProject } from '@/features/mentor-projects/model/project';

export function ProjectList() {
  const router = useRouter();
  const { data: projects = [], isLoading, deleteProject } = useMentorProjects();
  const [search, setSearch] = useState('');
  const [generationFilter, setGenerationFilter] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Deletion state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<MentorProject | null>(null);

  const handleDeleteClick = (project: MentorProject) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (projectToDelete) {
      const success = await deleteProject(projectToDelete.id);
      if (success) {
        setIsDeleteModalOpen(false);
        setProjectToDelete(null);
      }
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-white mb-4">
            프로젝트 관리
          </h1>
          <Text variant="large" className="text-zinc-400 font-medium">
            기수별 프로젝트를 관리하고 채점 현황을 확인하세요
          </Text>
        </div>
      </div>

      {/* Filter Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-[300px]">
            <InputBox
              placeholder="프로젝트 제목 또는 유형 검색..."
              icon={<Search size={18} />}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-[180px]">
            <Select
              placeholder="전체 기수"
              items={[
                { label: '전체 기수', value: 'ALL' },
                { label: '25기', value: '25' },
                { label: '26기', value: '26' },
              ]}
              value={generationFilter}
              onChange={(val) => setGenerationFilter(String(val))}
            />
          </div>
        </div>
        <Button asChild leftIcon={<Plus size={16} />}>
          <Link href="/mentor/projects/new">+  새 프로젝트</Link>
        </Button>
      </div>

      {/* Table Section */}
      <div className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>프로젝트 제목</TableHead>
              <TableHead className="w-[100px] text-center">기수</TableHead>
              <TableHead className="w-[120px] text-center">유형</TableHead>
              <TableHead className="w-[120px] text-center">상태</TableHead>
              <TableHead className="w-[250px] text-center">기간</TableHead>
              <TableHead className="w-[250px] text-center">관리</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(() => {
              const filteredProjects = (projects || [])
                .filter(project => {
                  const title = project.title || '';
                  const matchesSearch = title.toLowerCase().includes(search.toLowerCase());
                  const matchesGeneration = !generationFilter || generationFilter === 'ALL' || String(project.generation) === generationFilter;
                  return matchesSearch && matchesGeneration;
                });

              const getProjectStatus = (startDate: string, dueDate: string) => {
                const now = new Date();
                const start = new Date(startDate.replace(' ', 'T'));
                const end = new Date(dueDate.replace(' ', 'T'));
                if (now < start) return '예정';
                if (now > end) return '종료';
                return '진행';
              };

              const pageSize = 8;
              const paginatedProjects = filteredProjects.slice((currentPage - 1) * pageSize, currentPage * pageSize);

              return paginatedProjects.map((project) => {
                const status = getProjectStatus(project.startDate, project.dueDate);
                const getStatusBadgeOptions = (s: string) => {
                  switch (s) {
                    case '진행': return { intent: 'neutral' as const, tone: 'soft' as const, colorClass: 'text-blue-400 border-blue-400/30' };
                    case '예정': return { intent: 'warning' as const, tone: 'soft' as const };
                    case '종료': return { intent: 'neutral' as const, tone: 'soft' as const };
                    default: return { intent: 'neutral' as const, tone: 'soft' as const };
                  }
                };
                const statusBadge = getStatusBadgeOptions(status);

                return (
                  <TableRow key={project.id}>
                    <TableCell className="font-semibold text-white pl-4">
                      {project.title}
                    </TableCell>
                    <TableCell className="text-center text-zinc-300">
                      {project.generation}기
                    </TableCell>
                    <TableCell className="text-center text-zinc-300 font-medium">
                      {project.type}
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge
                        intent={statusBadge.intent as any}
                        tone={statusBadge.tone as any}
                        size="sm"
                        className={statusBadge.colorClass}
                      >
                        {status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-zinc-400 text-sm">
                      {project.startDate.split('T')[0]} ~ {project.dueDate.split('T')[0]}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2 pr-2">
                        {status !== '예정' && (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="whitespace-nowrap"
                            onClick={() => router.push(`/mentor/projects/${project.id}/submissions`)}
                          >
                            제출 현황
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          aria-label="Edit"
                          onClick={() => router.push(`/mentor/projects/${project.id}/edit`)}
                        >
                          <PencilLine size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-400 hover:text-red-300 hover:bg-red-950/30"
                          aria-label="Delete"
                          onClick={() => handleDeleteClick(project)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              });
            })()}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center mt-4">
        {(() => {
          const filteredProjects = projects.filter(project => {
            const matchesSearch = project.title.toLowerCase().includes(search.toLowerCase());
            const matchesGeneration = !generationFilter || generationFilter === 'ALL' || String(project.generation) === generationFilter;
            return matchesSearch && matchesGeneration;
          });
          return (
            <Pagination
              total={filteredProjects.length}
              currentPage={currentPage}
              pageSize={8}
              onPageChange={setCurrentPage}
            />
          );
        })()}
      </div>

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="프로젝트 삭제"
        message={`"${projectToDelete?.title}" 프로젝트를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없으며 모든 제출 내역이 사라집니다.`}
        confirmLabel="삭제"
        cancelLabel="취소"
        isDanger={true}
      />
    </div>
  );
}
