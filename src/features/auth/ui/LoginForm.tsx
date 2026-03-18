"use client";

import { Button } from "@/shared/components/ui/Button";
import { Text } from "@/shared/components/ui/Text";
import { Github } from "lucide-react";
import { useGithubLogin } from "../hooks/useGithubLogin";

export const LoginForm = () => {
    const { handleLogin, isLoading, error } = useGithubLogin();

    return (
        <div className="w-full space-y-6">
            <Button
                type="button"
                variant="secondary"
                size="lg"
                className="w-full gap-2 relative overflow-hidden bg-[#24292f] hover:bg-[#24292f]/90 border-transparent text-white"
                onClick={handleLogin}
                isLoading={isLoading}
                leftIcon={<Github size={20} />}
            >
                GitHub로 로그인
            </Button>
            
            {error && (
                <Text variant="small" className="text-red-500 text-center">
                    {error}
                </Text>
            )}

            <div className="text-center">
                 <Text variant="tiny" className="text-muted text-xs leading-relaxed">
                    로그인 시 <span className="font-semibold text-primary/80">GitHub 프로필(이름, 이메일)</span> 정보가 제공되며,<br />
                    이용약관 및 개인정보처리방침에 동의하게 됩니다.
                </Text>
            </div>
        </div>
    );
};
