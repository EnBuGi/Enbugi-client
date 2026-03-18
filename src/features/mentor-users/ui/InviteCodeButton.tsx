'use client';

import React, { useState } from 'react';
import { Plus, Check, CopyIcon } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';

export function InviteCodeButton() {
  const [loading, setLoading] = useState(false);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerateCode = async () => {
    setLoading(true);
    // TODO: 백엔드 API 연동 위치
    await new Promise((resolve) => setTimeout(resolve, 600)); // 모의 지연
    
    // 예시용 초대 코드 생성 로직
    const generatedCode = `ENBUGI-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setInviteCode(generatedCode);
    setLoading(false);
  };

  const handleCopy = () => {
    if (inviteCode) {
      navigator.clipboard.writeText(inviteCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-3">
      {inviteCode ? (
        <div className="flex items-center gap-2 bg-surfaceHighlight/50 border border-border px-3 py-1.5 rounded-lg">
          <span className="font-mono text-primary font-bold">{inviteCode}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="text-zinc-400 hover:text-white transition-colors ml-2"
            title="초대코드 복사"
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <CopyIcon size={16} />}
          </button>
        </div>
      ) : null}
      <Button
        variant="primary"
        onClick={handleGenerateCode}
        isLoading={loading}
        leftIcon={<Plus size={16} />}
      >
        초대코드 발급
      </Button>
    </div>
  );
}
