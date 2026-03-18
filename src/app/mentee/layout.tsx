import React from 'react';

import { Grid3X3, MessageSquare } from 'lucide-react';

import { AppShell } from '@/shared/components/layout/AppShell';
import { Gnb } from '@/shared/components/layout/Gnb';

import { AuthGuard } from '@/shared/components/AuthGuard';

const MENTEE_NAV = [
  { label: 'Problems', href: '/problems', icon: <Grid3X3 size={18} /> },
  { label: 'Q&A', href: '/qna', icon: <MessageSquare size={18} /> },
];

export default function MenteeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <AppShell headerNav={<Gnb variant="header" items={MENTEE_NAV} />}>
        {children}
      </AppShell>
    </AuthGuard>
  );
}
