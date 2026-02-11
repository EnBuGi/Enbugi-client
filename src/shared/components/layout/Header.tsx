import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Sun, LogOut } from "lucide-react";
import logoSrc from "@/assets/Logo.svg";

export function Header({ centerSlot, rightSlot }: { centerSlot?: React.ReactNode; rightSlot?: React.ReactNode }) {
    return (
        <header className="relative z-20 border-b border-white/5 bg-background">
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-3 shrink-0">

                        <Image src={logoSrc} alt="EN# Logo" width={30} height={30} priority />

                        <div className="font-display font-bold text-main">EN# OJ</div>
                    </Link>

                    <div className="hidden md:block">{centerSlot}</div>
                </div>

                <div className="flex items-center gap-4">
                    {rightSlot}
                    <button type="button" className="p-2 text-sub hover:text-white transition rounded-md hover:bg-surface/50" aria-label="Toggle dark mode">
                        <Sun size={18} />
                    </button>
                    <button type="button" className="p-2 text-sub hover:text-white transition rounded-md hover:bg-surface/50" aria-label="Logout">
                        <LogOut size={18} />
                    </button>
                </div>
            </div>

            {centerSlot && <div className="md:hidden border-t border-white/5 px-6 py-3">{centerSlot}</div>}
        </header>
    );
}
