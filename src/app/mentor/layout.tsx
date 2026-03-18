import React from 'react';

import {
  BoxesIcon,
  CheckSquare2,
  MessageSquare,
  Settings,
  Users,
} from 'lucide-react';

import { AppShell } from '@/shared/components/layout/AppShell';
import { Gnb } from '@/shared/components/layout/Gnb';

const MENTOR_SECTIONS = [
  {
    title: 'Projects',
    items: [
      {
        label: 'Projects',
        href: '/mentor/projects',
        icon: <BoxesIcon size={18} />,
      },
      { label: 'Q&A', href: '/mentor/qna', icon: <MessageSquare size={18} /> },
      {
        label: 'Submissions',
        href: '/mentor/submissions',
        icon: <CheckSquare2 size={18} />,
      },
    ],
  },
  {
    title: 'Users',
    items: [
      { label: 'Users', href: '/mentor/users', icon: <Users size={18} /> },
      {
        label: 'Settings / Roles',
        href: '/mentor/settings',
        icon: <Settings size={18} />,
      },
    ],
  },
];

export default function MentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell
      sidebarNav={
        <Gnb variant="sidebar" sections={MENTOR_SECTIONS} items={[]} />
      }
    >
      {children}
    </AppShell>
  );
}
