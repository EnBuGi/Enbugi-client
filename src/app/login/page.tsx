import { LoginForm } from "@/features/auth/ui/LoginForm";
import { Text } from "@/shared/components/ui/Text";
import { Terminal } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden selection:bg-primary/30">

            {/* Glow 효과 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none animate-pulse duration-[4000ms]" />

            {/* Decorative Elements (Top Left) */}
            <div className="absolute top-10 left-10 opacity-30 hidden md:block select-none">
                <Terminal className="text-sub w-8 h-8 mb-2" />
                <Text variant="mono" className="text-sub text-xs tracking-wider">
                    SYSTEM_READY<br />
                    INIT_SEQUENCE_START
                </Text>
            </div>

            {/* 메인 로그인 카드 */}
            <div className="relative z-10 w-full max-w-[420px] p-4">
                {/* Card Container with Glass Effect */}
                <div className="relative bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-2xl shadow-2xl shadow-black/80 p-8 md:p-10 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                    <div className="relative z-20 flex flex-col gap-8">
                        {/* Header Section */}
                        <div className="text-center space-y-3">
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-zinc-800 to-black border border-white/10 shadow-lg mb-2 group">
                                <span className="font-display font-bold text-xl text-primary group-hover:text-white transition-colors">En#</span>
                            </div>
                            <div>
                                <Text variant="h3" className="text-white">En# Online Judge</Text>
                                <Text variant="body" className="text-muted text-sm mt-1">
                                    환영합니다!
                                </Text>
                            </div>
                        </div>

                        {/* Login Form */}
                        <LoginForm />
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="absolute bottom-6 w-full text-center">
                <Text variant="tiny" className="text-zinc-600 font-mono">
                    En# Online Judge Platform v1.0.0
                </Text>
            </div>
        </main>
    );
}
