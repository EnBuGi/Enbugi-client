'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ChevronDown, LogOut, Sun, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useUser } from '@/shared/hooks/useUser';

type HeaderProps = {
  centerSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
};

export function Header({ centerSlot, rightSlot }: HeaderProps) {
  const pathname = usePathname();
  const isMentor = pathname?.startsWith('/mentor');
  const { logout } = useAuth();
  const { user } = useUser();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

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

          {/* User button / Dropdown */}
          <div className="relative profile-dropdown-container">
            <button
              type="button"
              className="group flex items-center gap-1 p-0.5 rounded-full hover:bg-white/5 transition"
              aria-label="User profile"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-9 h-9 rounded-full border border-white/10 overflow-hidden bg-surface flex items-center justify-center text-sm font-medium text-sub group-hover:border-primary transition">
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  'U'
                )}
              </div>
              <ChevronDown size={14} className="text-sub group-hover:text-white transition" />
            </button>

            {/* Dropdown Menu */}
            {isProfileOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2">
                  {/* User Info Section */}
                  <div className="p-4 border-b border-white/5">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-white text-sm">
                        {user ? `${user.name} (${user.role === 'MENTOR' ? '멘토' : '멘티'})` : 'Loading...'}
                      </span>
                    </div>
                    <div className="text-xs text-zinc-400">
                      {user?.generation}기
                    </div>
                  </div>

                  {/* Links Section */}
                  <div className="p-2">
                    <Link
                      href="/profile/edit"
                      className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <UserIcon size={16} />
                      <span>내 정보 수정</span>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>

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
