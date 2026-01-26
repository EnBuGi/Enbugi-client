import { Text } from "@/shared/components/ui/Text";
import { Terminal } from "lucide-react";

export function AuthBackground() {
    return (
        <>
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
        </>
    );
}
