'use client';

import React from 'react';
import { Select } from '@/shared/components/ui/select/Select';
import { DropdownItem } from '@/shared/types/ui';

interface GenerationFilterProps {
  value: string;
  onChange: (value: string) => void;
  generations?: number[];
}

export function GenerationFilter({
  value,
  onChange,
  generations = [19, 20, 21, 22, 23, 24, 25, 26], // Mock data for generations
}: GenerationFilterProps) {
  const items: DropdownItem[] = [
    { label: '전체 기수', value: '' },
    ...generations.map((g) => ({
      label: `${g}기`,
      value: g.toString(),
    })),
  ];

  return (
    <div className="w-[150px]">
      <Select
        value={value}
        onChange={(val) => onChange(val || '')}
        items={items}
        placeholder="기수 선택"
      />
    </div>
  );
}
