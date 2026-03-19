'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/shared/components/ui/Button';
import { InviteModal } from './InviteModal';

/**
 * 초대 코드 생성 버튼
 * 클릭하면 모달을 열어 초대 코드를 생성할 수 있음
 */
export function InviteCodeButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="primary"
        leftIcon={<Plus size={16} />}
        onClick={() => setIsModalOpen(true)}
      >
        초대 코드 생성
      </Button>

      <InviteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="En# 초대 코드 생성"
      />
    </>
  );
}
