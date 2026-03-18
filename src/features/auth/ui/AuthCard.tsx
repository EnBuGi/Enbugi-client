import type { ReactNode } from "react";

export function AuthCard({ children }: { children: ReactNode }) {
    return (
        <div className="relative z-10 w-full max-w-[420px] p-4">
            {/* Card Container with Glass Effect */}
            <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-2xl shadow-black/80 p-8 md:p-10 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="relative z-20 flex flex-col gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
}
