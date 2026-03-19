'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw, AlertTriangle } from 'lucide-react';

import { Text } from '@/shared/components/ui/Text';
import { Button } from '@/shared/components/ui/Button';

import {
  BasicSettings,
  AssignmentFormState,
} from './components/BasicSettings';
import { GradingSettings } from './components/GradingSettings';
import { mentorProjectApi, TestCaseDto, ProjectCreateRequest } from '../api/projects';
import { ProjectType } from '../model/project';

// Confirm Dialog Component
function ConfirmDialog({
  mode,
  onConfirm,
  onCancel,
  isSubmitting,
}: {
  mode: 'create' | 'edit';
  onConfirm: () => void;
  onCancel: () => void;
  isSubmitting: boolean;
}) {
  const isEdit = mode === 'edit';
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30">
          <AlertTriangle size={22} className="text-red-400" />
        </div>

        <h2 className="mb-2 text-lg font-bold text-white">
          {isEdit ? '정말 수정하시겠습니까?' : '정말 등록하시겠습니까?'}
        </h2>
        <p className="mb-8 text-sm text-zinc-400">
          {isEdit
            ? '입력하신 내용으로 프로젝트가 수정됩니다. 계속하시겠습니까?'
            : '입력하신 내용으로 새 프로젝트가 등록됩니다. 계속하시겠습니까?'}
        </p>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            취소
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="border-none bg-red-900 font-bold text-white hover:bg-red-800"
            onClick={onConfirm}
            isLoading={isSubmitting}
          >
            {isEdit ? '수정 완료' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ProjectForm Component
export function ProjectForm({
  initialData,
  initialId,
  mode = 'create',
}: {
  initialData?: AssignmentFormState & { 
    testCases?: TestCaseDto[], 
    timeLimit?: number, 
    memoryLimit?: number,
    testCodeKey?: string 
  };
  initialId?: string;
  mode?: 'create' | 'edit';
}) {
  const router = useRouter();

  const [formData, setFormData] = useState<AssignmentFormState>(
    initialData || {
      generation: '',
      type: '',
      title: '',
      description: '',
      skeletonUrl: '',
      startDate: '',
      endDate: '',
    }
  );

  const [testCases, setTestCases] = useState<TestCaseDto[]>(initialData?.testCases || []);
  const [timeLimit, setTimeLimit] = useState<number>(initialData?.timeLimit || 2000);
  const [memoryLimit, setMemoryLimit] = useState<number>(initialData?.memoryLimit || 256);
  const [testCodeKey, setTestCodeKey] = useState<string>(initialData?.testCodeKey || '');

  const [errors, setErrors] = useState<
    Partial<Record<keyof AssignmentFormState, string>>
  >({});

  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof AssignmentFormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = () => {
    const newErrors: Partial<Record<keyof AssignmentFormState, string>> = {};

    if (!formData.generation) newErrors.generation = '기수를 선택해주세요.';
    if (!formData.type) newErrors.type = '유형을 선택해주세요.';
    if (!formData.title.trim()) newErrors.title = '프로젝트 제목을 입력해주세요.';
    if (!formData.description.trim()) newErrors.description = '프로젝트 설명을 입력해주세요.';
    if (!formData.skeletonUrl.trim()) newErrors.skeletonUrl = 'Skeleton Repository URL을 입력해주세요.';
    if (!formData.startDate) newErrors.startDate = '시작일을 선택해주세요.';
    if (!formData.endDate) newErrors.endDate = '마감일을 선택해주세요.';

    const totalScore = testCases.reduce((sum, c) => sum + (Number(c.score) || 0), 0);
    if (testCases.length === 0) {
      alert('테스트 코드를 업로드하여 테스트 케이스를 생성해주세요.');
      return false;
    }
    if (totalScore !== 100) {
      alert(`총점이 100점이어야 합니다. (현재: ${totalScore}점)`);
      return false;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    setIsSubmitting(true);
    try {
      const payload: ProjectCreateRequest = {
        title: formData.title,
        type: formData.type as ProjectType,
        generation: Number(formData.generation),
        startDate: formData.startDate,
        dueDate: formData.endDate,
        description: formData.description,
        skeletonUrl: formData.skeletonUrl,
        testCodeKey: testCodeKey,
        scorePolicy: {
          timeLimit,
          memoryLimit,
          cases: testCases,
        },
      };

      if (mode === 'create') {
        await mentorProjectApi.createProject(payload);
        alert('프로젝트가 성공적으로 등록되었습니다.');
      } else if (initialId) {
        await mentorProjectApi.updateProject(initialId, payload);
        alert('프로젝트가 성공적으로 수정되었습니다.');
      }
      
      router.push('/mentor/projects');
      router.refresh();
    } catch (error) {
      console.error('Failed to submit project:', error);
      alert('저장 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    } finally {
      setIsSubmitting(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
          isSubmitting={isSubmitting}
        />
      )}

      <div className="form-stack">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-white">
              {mode === 'edit' ? '프로젝트 수정' : '새 프로젝트 등록'}
            </h1>
            <Text variant="large" className="font-medium text-zinc-400">
              {mode === 'edit'
                ? '기존 프로젝트의 정보를 수정하고 채점 기준을 재설정하세요'
                : '기수별 새로운 프로젝트를 생성하고 채점 기준을 설정하세요'}
            </Text>
          </div>

          {mode === 'create' && (
            <Button variant="secondary" leftIcon={<RotateCcw size={16} />}>
              이전 프로젝트 불러오기
            </Button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="form-stack">
          <BasicSettings
            formData={formData}
            onChange={handleChange}
            errors={errors}
          />

          <GradingSettings 
            timeLimit={timeLimit}
            memoryLimit={memoryLimit}
            testCases={testCases}
            onCasesChange={setTestCases}
            onLimitChange={(field, val) => field === 'timeLimit' ? setTimeLimit(val) : setMemoryLimit(val)}
            onTestCodeKeyChange={setTestCodeKey}
          />

          <div className="flex items-center justify-between pt-2">
            <Button type="button" variant="secondary" onClick={() => router.push('/mentor/projects')} disabled={isSubmitting}>
              취소
            </Button>

            <Button
              type="submit"
              variant="destructive"
              className="border-none bg-red-900 px-12 font-bold text-white shadow-md hover:bg-red-800"
              isLoading={isSubmitting}
            >
              {mode === 'edit' ? '수정 완료' : '최종 등록'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
