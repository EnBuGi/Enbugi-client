import React from 'react';

import { BoxesIcon, CheckSquare2, Grid3X3, MessageSquare } from 'lucide-react';

import { AppShell } from '@/shared/components/layout/AppShell';
import { Gnb } from '@/shared/components/layout/Gnb';

import { AuthGuard } from '@/shared/components/AuthGuard';

const MENTEE_NAV = [
  { label: 'Projects', href: '/mentee/projects', icon: <BoxesIcon size={18} /> },
  { label: 'My Submissions', href: '/mentee/submissions', icon: <CheckSquare2 size={18} /> },
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
