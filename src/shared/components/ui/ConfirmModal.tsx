'use client';

import React from 'react';

import { AlertCircle } from 'lucide-react';

import { Button } from './Button';
import { Text } from './Text';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDanger?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = '확인',
  cancelLabel = '취소',
  isDanger = false,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md px-4">
        <div className="bg-zinc-900 rounded-2xl shadow-2xl border border-white/10 p-8 transition-transform">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30">
            <AlertCircle size={22} className="text-red-400" />
          </div>

          <Text variant="h3" weight="semibold" className="text-white mb-2">
            {title}
          </Text>
          <p className="mb-8 text-sm text-zinc-400 whitespace-pre-wrap leading-relaxed">
            {message}
          </p>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="bg-zinc-800 hover:bg-zinc-700 border-none"
            >
              {cancelLabel}
            </Button>
            <Button
              type="button"
              variant={isDanger ? 'destructive' : 'primary'}
              className={`font-bold ${
                isDanger
                  ? 'bg-red-700 hover:bg-red-600'
                  : 'bg-primary hover:bg-primary-hover'
              } border-none px-6`}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
