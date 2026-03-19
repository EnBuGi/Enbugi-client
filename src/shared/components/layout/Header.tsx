'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { LogOut, Sun, User } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';

type HeaderProps = {
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export function Header({ centerSlot, rightSlot }: HeaderProps) {
  const pathname = usePathname();
  const isMentor = pathname?.startsWith('/mentor');
  const { logout } = useAuth();

  return (
    <header className="relative z-20 border-b border-white/5 bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center overflow-hidden">
              <img src="/favicon.svg" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="font-display font-bold text-main">En#</div>
          </Link>

          {/* Center: (mentee) header nav slot */}
          <div className="hidden md:block">{centerSlot}</div>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-4">
          {rightSlot}

          {/* Workspace Toggle */}
          <div className="flex bg-surfaceHighlight/30 p-1 rounded-lg border border-white/10 mr-4">
            <Link
              href="/mentor/projects"
              className={`px-4 py-1.5 text-xs font-bold tracking-wider rounded-md transition-all ${isMentor ? 'bg-primary text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              MENTOR
            </Link>
            <Link
              href="/projects"
              className={`px-4 py-1.5 text-xs font-bold tracking-wider rounded-md transition-all ${!isMentor ? 'bg-primary text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'
                }`}
            >
              MENTEE
            </Link>

          </div>

          {/* Dark mode button */}
          <button
            type="button"
            className="p-2 text-sub hover:text-white transition rounded-md hover:bg-surface/50"
            aria-label="Toggle dark mode"
          >
            <Sun size={18} />
          </button>

          {/* User button */}
          <button
            type="button"
            className="w-9 h-9 rounded-full border border-white/10 bg-surface flex items-center justify-center text-sm font-medium text-sub hover:text-white hover:border-primary transition"
            aria-label="User profile"
          >
            U
          </button>

          {/* Logout button */}
          <button
            type="button"
            className="p-2 text-sub hover:text-white transition rounded-md hover:bg-surface/50"
            aria-label="Logout"
            onClick={logout}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {/* Mobile: centerSlot 아래로 내려주기 */}
      {centerSlot && (
        <div className="md:hidden border-t border-white/5 px-6 py-3">
          {centerSlot}
        </div>
      )}
    </header>
  );
}
