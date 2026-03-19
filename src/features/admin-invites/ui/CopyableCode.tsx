import { useState } from 'react';
import { Copy, CheckCircle2 } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Text } from '@/shared/components/ui/Text';

interface CopyableCodeProps {
  code: string;
  label?: string;
  className?: string;
}

/**
 * 복사 가능한 코드 표시 컴포넌트
 */
export function CopyableCode({ code, label, className = '' }: CopyableCodeProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <div className={`flex flex-col gap-2.5 ${className}`}>
      {label && (
        <Text variant="tiny" weight="bold" className="text-muted uppercase tracking-wider px-1">
          {label}
        </Text>
      )}
      <div className="flex items-center gap-2 bg-white/[0.03] rounded-xl px-4 py-2 border border-white/5 transition-all focus-within:border-white/10">
        <code className="flex-1 font-mono text-xs break-all text-sub truncate">{code}</code>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className={`h-8 w-8 transition-colors ${isCopied ? 'text-success' : 'text-tertiary hover:text-sub'}`}
        >
          {isCopied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
        </Button>
      </div>
    </div>
  );
}
