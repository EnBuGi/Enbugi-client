import React from "react";
import { cn } from "@/shared/utils/cn";
import { Header } from "./Header";

type AppShellProps = {
    headerNav?: React.ReactNode;
    sidebarNav?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
};

export function AppShell({ headerNav, sidebarNav, children, className }: AppShellProps) {
    const hasSidebar = !!sidebarNav;

    return (
        <div className={cn("relative min-h-screen", className)}>
            <Header centerSlot={headerNav} />
            <div className="relative flex w-full">
                {hasSidebar && (
                    <aside className="fixed left-0 top-16 w-[200px] h-[calc(100vh-64px)] overflow-y-auto z-10 border-r border-white/5 bg-background">
                        <div className="p-3 h-full">
                            {sidebarNav}
                        </div>
                    </aside>
                )}
                <main className={cn("relative flex-1", hasSidebar && "ml-[220px]")}>
                    <div className="mx-auto w-full px-6 py-8 max-w-6xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
