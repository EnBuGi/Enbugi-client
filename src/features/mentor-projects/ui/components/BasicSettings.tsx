'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { InputBox } from '@/shared/components/ui/InputBox/InputBox';
import { Select } from '@/shared/components/ui/select/Select';
import { MarkdownEditor } from './MarkdownEditor';

// Types for form state
export type AssignmentFormState = {
  generation: string;
  type: string;
  title: string;
  description: string;
  skeletonUrl: string;
  startDate: string;
  endDate: string;
};

type BasicSettingsProps = {
  formData: AssignmentFormState;
  onChange: (field: keyof AssignmentFormState, value: string) => void;
  errors: Partial<Record<keyof AssignmentFormState, string>>;
};

export function BasicSettings({
  formData,
  onChange,
  errors,
}: BasicSettingsProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 flex flex-col gap-6">
      {/* Generation & Type */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Select
          label="기수"
          value={formData.generation}
          onChange={(val) => onChange('generation', String(val))}
          placeholder="기수 선택"
          error={errors.generation}
          items={[
            { label: '14기', value: '14' },
            { label: '15기', value: '15' },
          ]}
        />

        <Select
          label="유형"
          value={formData.type}
          onChange={(val) => onChange('type', String(val))}
          placeholder="유형 선택"
          error={errors.type}
          items={[
            { label: 'JAVA', value: 'JAVA' },
            { label: 'SPRING', value: 'SPRING' },
            { label: 'REACT', value: 'REACT' },
          ]}
        />
      </div>

      {/* Title */}
      <InputBox
        label="프로젝트 제목"
        placeholder="예) Java 기초 문법 연습"
        value={formData.title}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange('title', e.target.value)
        }
        error={errors.title}
      />

      {/* Description */}
      <MarkdownEditor
        value={formData.description}
        onChange={(value) => onChange('description', value)}
        error={errors.description}
      />

      {/* Skeleton URL */}
      <InputBox
        label="Skeleton Repository URL"
        placeholder="https://github.com/..."
        value={formData.skeletonUrl}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange('skeletonUrl', e.target.value)
        }
        error={errors.skeletonUrl}
      />

      {/* Dates */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <InputBox
          label="시작일"
          type="datetime-local"
          icon={<Calendar size={18} />}
          value={formData.startDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange('startDate', e.target.value)
          }
          error={errors.startDate}
        />

        <InputBox
          label="마감일"
          type="datetime-local"
          icon={<Calendar size={18} />}
          value={formData.endDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange('endDate', e.target.value)
          }
          error={errors.endDate}
        />
      </div>
    </div>
  );
}