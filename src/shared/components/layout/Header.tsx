import Link from "next/link";
import React from "react";
import { Sun, LogOut, User } from "lucide-react";

type HeaderProps = {
    centerSlot?: React.ReactNode;
    rightSlot?: React.ReactNode;
};

export function Header({ centerSlot, rightSlot }: HeaderProps) {
    return (
        <header className="relative z-20 border-b border-white/5 bg-background/70 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-6">

                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 shrink-0">
                        <div className="grid h-9 w-9 place-items-center rounded-md border border-white/10 bg-surface shadow-sm ring-1 ring-white/5">
                            <span className="text-sm font-bold">E</span>
                        </div>
                        <div className="font-display font-bold text-main">EN# OJ</div>
                    </Link>

                    {/* Center: (mentee) header nav slot */}
                    <div className="hidden md:block">{centerSlot}</div>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-4">
                    {rightSlot}

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
