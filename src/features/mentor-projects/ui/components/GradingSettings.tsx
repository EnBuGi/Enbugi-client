'use client';

import React from 'react';
import { Upload } from 'lucide-react';
import { Text } from '@/shared/components/ui/Text';

export function GradingSettings() {
  return (
    <div className="rounded-2xl border border-white/10 bg-surface/50 p-6 flex flex-col gap-4">
      <Text variant="label" className="text-white font-semibold">
        채점 설정
      </Text>

      <div className="flex flex-col gap-2">
        <Text variant="small" className="text-zinc-400">
          채점용 테스트 파일 (.java)
        </Text>

        <div className="group flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-surfaceHighlight/30 p-12 text-zinc-400 transition-all hover:border-zinc-600 hover:bg-white/5 hover:text-white">
          <Upload
            className="mb-4 text-zinc-500 transition-colors group-hover:text-white"
            size={28}
          />
          <Text
            variant="small"
            className="text-center transition-colors group-hover:text-white"
          >
            테스트 파일을 선택하면 자동으로 메소드를 추출합니다
          </Text>
        </div>
      </div>
    </div>
  );
}