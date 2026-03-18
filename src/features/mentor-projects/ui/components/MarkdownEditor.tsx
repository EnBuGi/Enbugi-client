'use client';

import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Text } from '@/shared/components/ui/Text';
import { cn } from '@/shared/utils/cn';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  error,
}: MarkdownEditorProps) {
  const [tab, setTab] = useState<'write' | 'preview'>('write');
  const hasError = !!error;

  return (
    <div className="flex w-full flex-col gap-2" data-color-mode="dark">
      <Text variant="label" className="text-zinc-300">
        프로젝트 설명
      </Text>

      <div className={cn('markdown-editor-shell', hasError && 'error')}>
        <div className="markdown-editor-tabbar">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setTab('write')}
              className={cn('markdown-editor-tab', tab === 'write' && 'active')}
            >
              Write
            </button>
            <button
              type="button"
              onClick={() => setTab('preview')}
              className={cn('markdown-editor-tab', tab === 'preview' && 'active')}
            >
              Preview
            </button>
          </div>
        </div>

        {tab === 'write' ? (
          <MDEditor
            value={value}
            onChange={(next) => onChange(next ?? '')}
            preview="edit"
            hideToolbar={false}
            visibleDragbar={false}
            textareaProps={{
              placeholder: '프로젝트 요구사항을 상세히 입력하세요',
            }}
            height={320}
          />
        ) : (
          <div className="markdown-editor-preview-wrap">
            {value.trim() ? (
              <div data-color-mode="dark">
                <MDEditor.Markdown
                  source={value}
                  className="wmde-markdown !bg-transparent"
                />
              </div>
            ) : (
              <div className="markdown-editor-empty">
                미리 볼 내용이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>

      {error ? (
        <Text variant="tiny" className="font-medium text-red-500">
          {error}
        </Text>
      ) : null}
    </div>
  );
}