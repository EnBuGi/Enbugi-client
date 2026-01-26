import { Text } from "@/shared/components/ui/Text";

export function AuthHeader() {
    return (
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
    );
}
