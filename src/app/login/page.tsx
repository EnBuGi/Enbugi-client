import { LoginForm } from "@/features/auth/ui/LoginForm";
import { AuthBackground } from "@/features/auth/ui/AuthBackground";
import { AuthCard } from "@/features/auth/ui/AuthCard";
import { AuthHeader } from "@/features/auth/ui/AuthHeader";
import { Text } from "@/shared/components/ui/Text";

export default function LoginPage() {
    return (
        <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden selection:bg-primary/30">
            {/* Background Decorative Elements */}
            <AuthBackground />

            {/* Main Login Card */}
            <AuthCard>
                <AuthHeader />
                <LoginForm />
            </AuthCard>

            {/* Footer */}
            <div className="absolute bottom-6 w-full text-center">
                <Text variant="tiny" className="text-zinc-600 font-mono">
                    En# Online Judge Platform v1.0.0
                </Text>
            </div>
        </main>
    );
}
