import { Text } from "@/shared/components/ui/Text";

export function AuthHeader() {
    return (
        <div className="text-center space-y-3">
            <div className="flex h-12 w-12 items-center justify-center mx-auto mb-2">
                <img src="/assets/Logo.svg" alt="Logo" className="w-full h-full object-contain" />
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
