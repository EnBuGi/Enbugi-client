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

// ────────────────────────────────────────────
// Confirm Dialog
// ────────────────────────────────────────────
function ConfirmDialog({
  mode,
  onConfirm,
  onCancel,
}: {
  mode: 'create' | 'edit';
  onConfirm: () => void;
  onCancel: () => void;
}) {
  const isEdit = mode === 'edit';
  return (
    /* backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onCancel}
    >
      {/* panel */}
      <div
        className="relative mx-4 w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* icon */}
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
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="border-none bg-red-900 font-bold text-white hover:bg-red-800"
            onClick={onConfirm}
          >
            {isEdit ? '수정 완료' : '등록하기'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────
// ProjectForm
// ────────────────────────────────────────────
export function ProjectForm({
  initialData,
  mode = 'create',
}: {
  initialData?: AssignmentFormState;
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

  const [errors, setErrors] = useState<
    Partial<Record<keyof AssignmentFormState, string>>
  >({});

  const [showConfirm, setShowConfirm] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step 1: validate → open confirm dialog
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setShowConfirm(true);
  };

  // Step 2: user confirmed → actually submit
  const handleConfirm = () => {
    setShowConfirm(false);
    console.log('Submitted:', formData);
    router.push('/mentor/projects');
  };

  const handleCancel = () => {
    router.push('/mentor/projects');
  };

  return (
    <>
      {showConfirm && (
        <ConfirmDialog
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={() => setShowConfirm(false)}
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

          <GradingSettings />

          <div className="flex items-center justify-between pt-2">
            <Button type="button" variant="secondary" onClick={handleCancel}>
              취소
            </Button>

            <Button
              type="submit"
              variant="destructive"
              className="border-none bg-red-900 px-12 font-bold text-white shadow-md hover:bg-red-800"
            >
              {mode === 'edit' ? '수정 완료' : '최종 등록'}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}