import { X } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { Text } from '@/shared/components/ui/Text';
import { InviteGeneratorForm } from './InviteGeneratorForm';

interface InviteModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

/**
 * 초대 코드 생성 모달
 * 팝업 형식으로 초대 코드를 생성할 수 있는 모달
 */
export function InviteModal({
  isOpen,
  onClose,
  title = 'En# 초대 코드 생성',
}: InviteModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 배경 오버레이 (블러 제거) */}
      <div
        className="fixed inset-0 bg-black/60 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* 모달 (얹어진 느낌) */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4">
        <div className="bg-surface rounded-2xl shadow-2xl border border-white/5 p-8 transition-transform">
          {/* 헤더 */}
          <div className="flex items-center justify-between mb-8">
            <Text variant="h3" weight="semibold" className="text-sub">
              {title}
            </Text>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-tertiary hover:text-sub"
            >
              <X size={20} />
            </Button>
          </div>

          {/* 콘텐츠 */}
          <InviteGeneratorForm />
        </div>
      </div>
    </>
  );
}
